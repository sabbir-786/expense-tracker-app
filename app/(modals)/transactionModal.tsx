import React, { useEffect, useMemo, useState } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    ScrollView,
    ActivityIndicator,
    Pressable,
    Platform,
} from 'react-native';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { scale, verticalScale } from '@/utils/styling';
import ModalWrapper from '@/components/ModalWrapper';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import * as Icons from 'phosphor-react-native';
import Typo from '@/components/Typo';
import { ResponseType, TransactionType, WalletType } from '@/types';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/authContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ImageUpload from '@/components/imageUpload';
import { createOrUpdateWallet, deleteWallet } from '@/services/walletService';
import { Dropdown } from 'react-native-element-dropdown';
import { expenseCategories, transactionTypes } from '@/constants/data';
import useFetchData from '@/hooks/useFetchData';
import { orderBy, where } from 'firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Input from '@/components/Input';
import { createOrUpdateTransaction, deleteTransaction } from '@/services/transactionService';

import { useTheme } from '@/contexts/ThemeContext';


const TransactionModal = () => {
    const [initialized, setInitialized] = useState(false);
    const { user } = useAuth();
    const [transaction, setTransaction] = useState<TransactionType>({
        type: 'expense',
        amount: 0,
        description: '',
        category: '',
        date: new Date(),
        walletId: "",
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const router = useRouter();
    const { theme } = useTheme();


    const walletQuery = useMemo(() => [
        where('uid', '==', user?.uid),
        orderBy('created', 'desc')
    ], [user?.uid]);

    const { data: wallets } = useFetchData<WalletType>('wallets', walletQuery);

    type paramType = {
        id: string;
        type: string;
        amount: string;
        category?: string;
        date: string;
        description?: string;
        image?: any;
        uid?: string;
        walletId: string;
    };

    const oldTransaction: paramType = useLocalSearchParams();

    const onSubmit = async () => {
        const { type, amount, description, category, date, walletId, image } = transaction;

        if (!walletId || !date || !amount || (type == "expense" && !category)) {
            Alert.alert("Transaction", "Please fill all the fields");
            return;
        }

        let transactionData: TransactionType = {
            type,
            amount,
            description,
            category,
            date,
            walletId: walletId ?? '',
            image: image ? image : null,
            uid: user?.uid
        };

        if (oldTransaction?.id) transactionData.id = oldTransaction.id;

        setLoading(true);
        const res: ResponseType = await createOrUpdateTransaction(transactionData);
        setLoading(false);
        if (res.success) {
            router.back();
        } else {
            Alert.alert("Transaction", res.msg || "Something went wrong.");
        }
    };

    const onDelete = async () => {
        if (!oldTransaction?.id) return;
        setLoading(true);
        const res = await deleteTransaction(oldTransaction?.id, oldTransaction.walletId);

        if (res.success) {
            router.back();
        } else {
            Alert.alert('Transaction', res.msg || 'Failed to delete wallet');
        }

        setLoading(false);
    };

    const showDeleteAlert = () => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to delete this Transaction?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: onDelete, style: 'destructive' },
            ],
            { cancelable: true }
        );
    };

    const handleConfirmDate = (selectedDate: Date) => {
        setShowDatePicker(false);
        setTransaction({ ...transaction, date: selectedDate });
    };

    useEffect(() => {
        if (oldTransaction?.id && !initialized) {
            try {
                setTransaction({
                    type: oldTransaction?.type as 'income' | 'expense',
                    amount: Number(oldTransaction?.amount || 0),
                    description: oldTransaction?.description || "",
                    category: oldTransaction?.category || "",
                    date: oldTransaction?.date ? new Date(oldTransaction.date) : new Date(),
                    walletId: oldTransaction?.walletId || "",
                    image: oldTransaction?.image || null,
                });
                setInitialized(true);
            } catch (e) {
                console.error('Error initializing transaction from route params:', e);
            }
        }
    }, [oldTransaction, initialized]);


    return (
        <ModalWrapper>
            <View style={styles.container}>
                <Header
                    title={oldTransaction?.id ? 'Update Transaction' : 'New Transaction'}
                    leftIcon={<BackButton />}
                    style={{ marginBottom: spacingY._10 }}
                />

                <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>
                    {/* Transaction Type */}
                    <View style={styles.inputContainer}>
                        <Typo color={theme.text} size={16}>Transaction Type</Typo>
                        <Dropdown
                            style={[styles.dropdownContainer, { borderColor: theme.border, backgroundColor: theme.neutral900 }]}
                            activeColor={theme.primary}
                            selectedTextStyle={[styles.dropdownSelectedText, { color: theme.text }]}
                            iconStyle={[styles.dropdownIcon, { tintColor: theme.text }]}
                            data={transactionTypes}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            itemTextStyle={{ color: theme.text }}
                            itemContainerStyle={styles.dropdownItemContainer}
                            containerStyle={[styles.dropdownListContainer, { backgroundColor: theme.card, borderColor: theme.border }]}
                            value={transaction.type}
                            onChange={item => setTransaction({ ...transaction, type: item.value })}
                        />
                    </View>

                    {/* Wallet Selection */}
                    <View style={styles.inputContainer}>
                        <Typo color={theme.neutral200} size={16}>Select Wallet</Typo>
                        <Dropdown
                            style={[styles.dropdownContainer, { borderColor: theme.border, backgroundColor: theme.neutral900 }]}
                            activeColor={theme.primary}
                            placeholderStyle={{ color: theme.placeholder }}
                            selectedTextStyle={[styles.dropdownSelectedText, { color: theme.text }]}
                            iconStyle={[styles.dropdownIcon, { tintColor: theme.text }]}
                            data={wallets.map(wallet => ({
                                label: `${wallet?.name} (₹${wallet.amount})`,
                                value: wallet?.id,
                            }))}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            itemTextStyle={{ color: theme.text }}
                            itemContainerStyle={styles.dropdownItemContainer}
                            containerStyle={[styles.dropdownListContainer, { backgroundColor: theme.card, borderColor: theme.border }]}
                            placeholder={'Choose a wallet'}
                            value={transaction.walletId || null}
                            onChange={item =>
                                setTransaction({ ...transaction, walletId: item.value || '' })
                            }
                        />
                    </View>

                    {/* Expense Category */}
                    {transaction.type === 'expense' && (
                        <View style={styles.inputContainer}>
                            <Typo color={theme.neutral200} size={16}>Expense Category</Typo>
                            <Dropdown
                                style={[styles.dropdownContainer, { borderColor: theme.border, backgroundColor: theme.neutral900 }]}
                                activeColor={theme.primary}
                                placeholderStyle={{ color: theme.placeholder }}
                                selectedTextStyle={[styles.dropdownSelectedText, { color: theme.text }]}
                                iconStyle={[styles.dropdownIcon, { tintColor: theme.text }]}
                                data={Object.values(expenseCategories)}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                itemTextStyle={{ color: theme.text }}
                                itemContainerStyle={styles.dropdownItemContainer}
                                containerStyle={[styles.dropdownListContainer, { backgroundColor: theme.card, borderColor: theme.border }]}
                                placeholder={'Choose a category'}
                                value={transaction.category}
                                onChange={item =>
                                    setTransaction({ ...transaction, category: item.value || '' })
                                }
                            />
                        </View>
                    )}

                    {/* Date Picker */}
                    <View style={styles.inputContainer}>
                        <Typo color={theme.neutral200} size={16}>Transaction Date</Typo>
                        {!showDatePicker && (
                            <Pressable
                                style={[styles.dateInput, { backgroundColor: theme.neutral900, borderColor: theme.border }]}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Typo size={14} color={theme.text}>
                                    {(transaction.date as Date).toLocaleDateString()}
                                </Typo>
                            </Pressable>
                        )}
                        {showDatePicker && (
                            <View style={Platform.OS === "android" && styles.androidDatePicker}>
                                <DateTimePickerModal
                                    isVisible={showDatePicker}
                                    mode="date"
                                    date={transaction.date as Date}
                                    onConfirm={(date) => {
                                        setTransaction({ ...transaction, date });
                                        setShowDatePicker(false);
                                    }}
                                    onCancel={() => setShowDatePicker(false)}
                                    display='default'
                                    themeVariant={'dark'}
                                />
                            </View>
                        )}
                    </View>

                    {/* Amount */}
                    <View style={styles.inputContainer}>
                        <Typo color={theme.neutral200} size={16}>Amount (₹)</Typo>
                        <Input
                            placeholder="Enter amount"
                            value={transaction.amount?.toString()}
                            keyboardType='numeric'
                            onChangeText={(value) =>
                                setTransaction({
                                    ...transaction,
                                    amount: Number(value.replace(/[^0-9]/g, ""))
                                })
                            }
                        />
                    </View>

                    {/* Description */}
                    <View style={styles.inputContainer}>
                        <View style={styles.flexRow}>
                            <Typo color={theme.neutral200} size={16}>Description</Typo>
                            <Typo color={theme.neutral500} size={14}>(optional)</Typo>
                        </View>
                        <Input
                            placeholder="Add a note (e.g., Uber ride)"
                            value={transaction.description}
                            multiline
                            containerStyle={{
                                flexDirection: 'row',
                                height: verticalScale(100),
                                alignItems: 'flex-start',
                                paddingVertical: 5,
                            }}
                            onChangeText={(value) =>
                                setTransaction({ ...transaction, description: value })
                            }
                        />
                    </View>

                    {/* Image Upload */}
                    <View style={styles.inputContainer}>
                        <View style={styles.flexRow}>
                            <Typo color={theme.neutral200} size={16}>Upload Receipt</Typo>
                            <Typo color={theme.neutral500} size={14}>(optional)</Typo>
                        </View>
                        <ImageUpload
                            file={transaction.image}
                            onClear={() => setTransaction({ ...transaction, image: null })}
                            onSelect={file =>
                                setTransaction({ ...transaction, image: file })
                            }
                            placeholder="Attach receipt or bill"
                        />
                    </View>
                </ScrollView>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                {oldTransaction?.id && (
                    <Button
                        onPress={showDeleteAlert}
                        style={{
                            backgroundColor: theme.rose,
                            paddingHorizontal: spacingX._15,
                        }}
                    >
                        <Icons.Trash color={theme.white} size={verticalScale(24)} weight="bold" />
                    </Button>
                )}
                <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
                    {loading ? (
                        <ActivityIndicator color={theme.black} />
                    ) : (
                        <Typo color={theme.buttonText} fontWeight="700">
                            {oldTransaction?.id ? 'Update ' : 'Submit'}
                        </Typo>
                    )}
                </Button>
            </View>
        </ModalWrapper>
    );
};

export default TransactionModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacingY._20,
    },
    form: {
        gap: spacingY._20,
        marginTop: spacingY._5,
    },
    inputContainer: {
        gap: spacingY._10,
    },
    dropdownContainer: {
        height: verticalScale(54),
        borderWidth: 1,
        paddingHorizontal: spacingX._15,
        borderRadius: radius._15,
        borderCurve: 'continuous',
    },
    dropdownSelectedText: {
        fontSize: verticalScale(16),
    },
    dropdownListContainer: {
        borderRadius: radius._15,
        borderCurve: 'continuous',
        paddingVertical: spacingY._7,
        top: 5,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 5,
    },
    dropdownItemContainer: {
        borderRadius: radius._15,
        marginHorizontal: spacingX._7,
    },
    dropdownIcon: {
        height: verticalScale(30),
    },
    dateInput: {
        paddingVertical: spacingY._7,
        paddingHorizontal: spacingX._15,
        borderRadius: radius._10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: spacingY._10,
        height: verticalScale(54),
        borderWidth: 1,
        borderCurve: 'continuous',
    },
    androidDatePicker: {
        marginTop: spacingY._5,
        borderRadius: radius._15,
        padding: spacingY._10,
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacingX._5
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: spacingY._5,
        paddingHorizontal: spacingX._10,
        gap: spacingX._10,
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        marginTop: spacingY._10,
    },
});
