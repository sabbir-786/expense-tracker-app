import { WalletType } from "@/types";
import { uploadFileToCloudinary } from "./imageService";
import { firestore } from "@/config/firebase";
import { collection, setDoc, doc, deleteDoc, query, where, getDocs, writeBatch } from "firebase/firestore";
import { ResponseType } from "@/types"; // Make sure this is imported

export const createOrUpdateWallet = async (
    walletData: Partial<WalletType>
): Promise<ResponseType> => {
    try {
        let walletToSave = { ...walletData };

        if (walletData.image) {
            const imageUploadRes = await uploadFileToCloudinary(walletData.image, "wallets");

            if (!imageUploadRes.success) {
                return {
                    success: false,
                    msg: imageUploadRes.msg || "Failed to upload wallet icons"
                };
            }

            walletToSave.image = imageUploadRes.data;
        }

        if (!walletData.id) {
            walletToSave.amount = 0;
            walletToSave.totalIncome = 0;
            walletToSave.totalExpenses = 0;
            walletToSave.created = new Date();
        }

        const walletRef = walletData.id
            ? doc(firestore, "wallets", walletData.id)
            : doc(collection(firestore, "wallets"));

        await setDoc(walletRef, walletToSave, { merge: true });

        return {
            success: true,
            data: { ...walletToSave, id: walletRef.id }
        };

    } catch (error: any) {
        console.error("Error creating or updating wallet:", error);
        return {
            success: false,
            msg: error.message || "An unexpected error occurred"
        };
    }
}


export const deleteWallet = async (walletId: string): Promise<ResponseType> => {
    try {
        const walletRef = doc(firestore, 'wallets', walletId);
        await deleteDoc(walletRef);

        // Wait for transaction deletions
        await deleteTransactionByWalletId(walletId);

        return { success: true, msg: 'Wallet deleted successfully' };
    } catch (err: any) {
        console.error('Error deleting wallet:', err);
        return { success: false, msg: err.message || "An unexpected error occurred" };
    }
};



export const deleteTransactionByWalletId = async (walletId: string): Promise<ResponseType> => {
    try {
        let hasMoreTransactions = true;

        while (hasMoreTransactions) {
            const transactionsQuery = query(
                collection(firestore, 'transactions'),
                where('walletId', '==', walletId)
            );

            const TransactionSnapshot = await getDocs(transactionsQuery)
            if (TransactionSnapshot.size == 0) {
                hasMoreTransactions = false;
                break;
            }

            const batch = writeBatch(firestore);

            TransactionSnapshot.forEach((transactionDoc) => {
                batch.delete(transactionDoc.ref);

            })

            await batch.commit();


        }

        return { success: true, msg: 'All transaction deleted successfully' };




    } catch (err: any) {
        console.error('Error deleting wallet:', err);
        return { success: false, msg: err.msg };
    }
}