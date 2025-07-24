import { firestore } from "@/config/firebase";
import { TransactionListType, TransactionType, WalletType } from "@/types";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";
import { createOrUpdateWallet } from "./walletService";
import { getLast10Years, getLast12Months, getLast7Days } from "./common";
import { scale } from "react-native-size-matters";
import { colors } from "@/constants/theme";

export const createOrUpdateTransaction = async (
    transactionData: Partial<TransactionType>
) => {
    try {
        const { id, type, walletId, amount, image } = transactionData;
        if (!amount || amount <= 0 || !walletId || !type) {
            return { success: false, msg: ' Invalid transaction data! ' };
        }

        if (id) {
            const oldTransactionSnapshot = await getDoc(
                doc(firestore, "transactions", id)
            );
            const oldTransaction = oldTransactionSnapshot.data() as TransactionType;
            const shouldRevertOriginal =
                oldTransaction.type != type ||
                oldTransaction.amount != amount ||
                oldTransaction.walletId != walletId;

            if (shouldRevertOriginal) {
                let res = await revertAndUpdateWallets(
                    oldTransaction,
                    Number(amount),
                    type,
                    walletId
                );
                if (!res.success) return res;
            }

        }
        else {
            let res = await updateWallletForNewTransaction(
                walletId!,
                Number(amount!),
                type
            );
            if (!res.success) return res

        }

        if (image) {
            const imageUploadRes = await uploadFileToCloudinary(image, "transactions");

            if (!imageUploadRes.success) {
                return { success: false, msg: imageUploadRes.msg || "Failed to upload reciept" };
            }

            transactionData.image = imageUploadRes.data; // update image URL after successful upload
        }

        const transactionRef = id
            ? doc(firestore, "transactions", id)
            : doc(collection(firestore, "transactions"));

        await setDoc(transactionRef, transactionData, { merge: true });


        return { success: true, data: { ...transactionData, id: transactionRef.id }, };
    } catch (err: any) {
        console.error('Error creating or Updating tranaction:', err);
        return { success: false, msg: err.msg };

    }
};





const updateWallletForNewTransaction = async (
    walletId: string,
    amount: number,
    type: string,
) => {

    try {

        const walletRef = doc(firestore, "wallets", walletId);
        const walletSnapshot = await getDoc(walletRef);

        if (!walletSnapshot.exists()) {
            return { success: false, msg: "wallet not found " };
        }

        const walletData = walletSnapshot.data() as WalletType;

        if (type == "expense" && walletData.amount! - amount < 0) {
            return { success: false, msg: "Selected wallet don,t have enough balance" };
        }
        const updateType = type === "income" ? 'totalIncome' : 'totalExpenses';

        const updateWalletAmount = type === "income"
            ? Number(walletData.amount) + amount
            : Number(walletData.amount) - amount;

        const updateTotals = type === "income" ? Number(walletData.totalIncome) + amount : Number(walletData.totalExpenses) + amount;

        await updateDoc(walletRef, {
            amount: updateWalletAmount,
            [updateType]: updateTotals
        });
        return { success: true };
    }
    catch (err: any) {
        console.error('Error creating or Updating tranaction:', err);
        return { success: false, msg: err.msg };
    }
}


const revertAndUpdateWallets = async (
    oldTransaction: TransactionType,
    newTransactionAmount: number,
    newTransactionType: string,
    newWalletId: string
) => {
    try {
        const originalWalletSnap = await getDoc(
            doc(firestore, "wallets", oldTransaction.walletId)
        );

        if (!originalWalletSnap.exists()) {
            return { success: false, msg: "Original wallet not found" };
        }

        let newWalletSnapshot = await getDoc(doc(firestore, "wallets", newWalletId));

        if (!newWalletSnapshot.exists()) {
            return { success: false, msg: "New wallet not found" };
        }

        const originalWallet = originalWalletSnap.data() as WalletType;
        let newWallet = newWalletSnapshot.data() as WalletType;


        const revertType =
            oldTransaction.type === "income" ? "totalIncome" : "totalExpenses";

        const revertIncomeExpense =
            oldTransaction.type === "income"
                ? -Number(oldTransaction.amount)
                : Number(oldTransaction.amount);

        const revertedWalletAmount = Number(originalWallet.amount)
            + revertIncomeExpense;


        const revertedIncomeExpenseAmount =
            Number(originalWallet[revertType] || 0) - Number(oldTransaction.amount);



        if (newTransactionType === "expense") {
            if (oldTransaction.walletId == newWalletId && revertedWalletAmount < newTransactionAmount) {
                return {
                    success: false,
                    msg: "The selected wallet doesn’t have enough balance",
                };
            }

            if (newWallet.amount! < newTransactionAmount) {
                return {
                    success: false,
                    msg: "The selected wallet doesn’t have enough balance",
                };
            }

        }

        // Revert from original wallet
        await createOrUpdateWallet({
            id: oldTransaction.walletId,
            amount: revertedWalletAmount,
            [revertType]: revertedIncomeExpenseAmount,
        });


        ///////////////////////////////////////////////////////////////////////////

        // Apply new transaction to new wallet
        newWalletSnapshot = await getDoc
            (doc(firestore, "wallets", newWalletId)
            );

        newWallet = newWalletSnapshot.data() as WalletType;

        const updateType =
            newTransactionType === "income" ? "totalIncome" : "totalExpenses";

        const updatedTransactionAmount: number =
            newTransactionType === "income"
                ? Number(newTransactionAmount)
                : -Number(newTransactionAmount);

        const newWalletAmount = Number(newWallet.amount) + updatedTransactionAmount;

        const updatedNewWalletIncomeExpense =
            Number(newWallet[updateType] || 0) + newTransactionAmount;

        await createOrUpdateWallet({
            id: newWalletId,
            amount: newWalletAmount,
            [updateType]: updatedNewWalletIncomeExpense,
        });

        return { success: true };
    } catch (err: any) {
        console.error("Error reverting and updating wallets:", err);
        return { success: false, msg: err.message || "Unknown error" };
    }
};

export const deleteTransaction = async (
    transactionId: string,
    walletId: string
) => {
    try {
        const transactionRef = doc(firestore, "transactions", transactionId);
        const transactionSnap = await getDoc(transactionRef);

        if (!transactionSnap.exists()) {
            return { success: false, msg: "Transaction not found." };
        }

        const transactionData = transactionSnap.data() as TransactionType;
        const transactionType = transactionData.type;
        const transactionAmount = transactionData.amount;

        const walletRef = doc(firestore, "wallets", walletId);
        const walletSnap = await getDoc(walletRef);

        if (!walletSnap.exists()) {
            return { success: false, msg: "Related wallet not found." };
        }

        const walletData = walletSnap.data() as WalletType;

        const updateType = transactionType === "income" ? "totalIncome" : "totalExpenses";

        const newWalletAmount = walletData?.amount! -
            (transactionType === "income" ? transactionAmount : -transactionAmount);

        const newIncomeExpenseAmount = walletData[updateType]! - transactionAmount


        if (transactionType == "expense" && newWalletAmount < 0) {
            return { success: false, msg: "You can not delete the transaction " };
        }

        await createOrUpdateWallet({
            id: walletId,
            amount: newWalletAmount,
            [updateType]: newIncomeExpenseAmount
        });

        await deleteDoc(transactionRef);

        return { success: true, msg: "Transaction deleted successfully." };
    } catch (err: any) {
        console.error("Error deleting transaction:", err);
        return { success: false, msg: err.message || "Failed to delete transaction." };
    }
};


export const fetchWeeklyStats = async (
    uid: string
) => {
    try {
        const db = firestore;
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 6); // include today as well

        const transactionsQuery = query(
            collection(db, "transactions"),
            where("date", ">=", Timestamp.fromDate(sevenDaysAgo)),
            where("date", "<=", Timestamp.fromDate(today)),
            where("uid", "==", uid),
            orderBy("date", "desc")
        );

        const querySnapshot = await getDocs(transactionsQuery);

        // Initialize days with 0 values
        const weeklyData = getLast7Days(); // helper below
        const transactions: TransactionType[] = [];

        // Mapping each transaction into the correct day
        querySnapshot.forEach((doc) => {
            const transaction = doc.data() as TransactionType;
            transaction.id = doc.id;
            transactions.push(transaction);

            const transactionDate = (transaction.date as Timestamp)
                .toDate()
                .toISOString()
                .split("T")[0]; // Extract date in YYYY-MM-DD format

            const dayData = weeklyData.find((day) => day.date === transactionDate);

            if (dayData) {
                if (transaction.type === "income") {
                    dayData.income += transaction.amount;
                } else if (transaction.type === "expense") {
                    dayData.expense += transaction.amount;
                }
            }
        });

        const stats = weeklyData.flatMap((day) => [
            {
                value: day.income,
                label: day.day,
                spacing: scale(4),
                labelWidth: scale(30),
                frontColor: colors.primary,
            },
            {
                value: day.expense,
                frontColor: colors.rose,
            },
        ]);

        return {
            success: true,
            data: {
                stats,
                transactions,
            },
        };



    } catch (err: any) {
        console.error("Error deleting transaction:", err);
        return { success: false };
    }
};



export const fetchMonthlyStats = async (
    uid: string
) => {
    try {
        const db = firestore;
        const today = new Date();
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setDate(today.getMonth() - 12); // include today as well

        const transactionsQuery = query(
            collection(db, "transactions"),
            where("date", ">=", Timestamp.fromDate(twelveMonthsAgo)),
            where("date", "<=", Timestamp.fromDate(today)),
            where("uid", "==", uid),
            orderBy("date", "desc")
        );

        const querySnapshot = await getDocs(transactionsQuery);

        // Initialize days with 0 values
        const monthlyData = getLast12Months(); // helper below
        const transactions: TransactionType[] = [];

        // Mapping each transaction into the correct day
        querySnapshot.forEach((doc) => {
            const transaction = doc.data() as TransactionType;
            transaction.id = doc.id;
            transactions.push(transaction);

            const transactionDate = (transaction.date as Timestamp).toDate();

            const monthName = transactionDate.toLocaleString("default", {
                month: 'short',
            });

            const shortYear = transactionDate.getFullYear().toString().slice(-2);
            const monthData = monthlyData.find((month) => month.month === `${monthName} ${shortYear}`);


            if (monthData) {
                if (transaction.type === "income") {
                    monthData.income += transaction.amount;
                } else if (transaction.type === "expense") {
                    monthData.expense += transaction.amount;
                }
            }
        });

        const stats = monthlyData.flatMap((month) => [
            {
                value: month.income,
                label: month.month,
                spacing: scale(4),
                labelWidth: scale(40),
                frontColor: colors.primary,
            },
            {
                value: month.expense,
                frontColor: colors.rose,
            },
        ]);

        return {
            success: true,
            data: {
                stats,
                transactions,
            },
        };



    } catch (err: any) {
        console.error("Error deleting transaction:", err);
        return { success: false };
    }
};



export const fetchYearlyStats = async (uid: string) => {
    try {
        const db = firestore;
        const today = new Date();
        const tenYearsAgo = new Date();
        tenYearsAgo.setFullYear(today.getFullYear() - 9); // 10 years including current

        const transactionsQuery = query(
            collection(db, "transactions"),
            where("date", ">=", Timestamp.fromDate(tenYearsAgo)),
            where("date", "<=", Timestamp.fromDate(today)),
            where("uid", "==", uid),
            orderBy("date", "desc")
        );

        const querySnapshot = await getDocs(transactionsQuery);

        // Initialize years with 0 values
        const yearlyData = getLast10Years();
        const transactions: TransactionType[] = [];

        querySnapshot.forEach((doc) => {
            const transaction = doc.data() as TransactionType;
            transaction.id = doc.id;
            transactions.push(transaction);

            const transactionDate = (transaction.date as Timestamp).toDate();
            const year = transactionDate.getFullYear().toString();

            const yearData = yearlyData.find((y) => y.year === year);

            if (yearData) {
                if (transaction.type === "income") {
                    yearData.income += transaction.amount;
                } else if (transaction.type === "expense") {
                    yearData.expense += transaction.amount;
                }
            }
        });

        const stats = yearlyData.flatMap((year) => [
            {
                value: year.income,
                label: year.year, // only show label on income bar to avoid clutter
                spacing: scale(4),
                labelWidth: scale(30),
                frontColor: colors.primary,
            },
            {
                value: year.expense,
                frontColor: colors.rose,
            },
        ]);


        return {
            success: true,
            data: {
                stats,
                transactions,
            },
        };
    } catch (err: any) {
        console.error("Error fetching yearly stats:", err);
        return { success: false };
    }
};
