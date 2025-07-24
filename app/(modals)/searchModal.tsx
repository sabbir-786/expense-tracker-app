import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';
import { colors as defaultColors, spacingX, spacingY } from '@/constants/theme';
import { scale } from '@/utils/styling';
import ModalWrapper from '@/components/ModalWrapper';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import Input from '@/components/Input';
import TransactionList from '@/components/TransactionList';
import { useAuth } from '@/contexts/authContext';
import { orderBy, where } from 'firebase/firestore';
import useFetchData from '@/hooks/useFetchData';
import { TransactionType } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';

const SearchModal = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState('');
    const { theme } = useTheme();


    const colors = defaultColors; // Optional: replace with theme-based palette if available

    const constraints = [
        where('uid', '==', user?.uid),
        orderBy('date', 'desc'),
    ];

    const {
        data: allTransactions,
        loading: transactionLoading,
    } = useFetchData<TransactionType>('transactions', constraints);

    const filteredTransactions = allTransactions.filter((item) => {
        const keyword = search.toLowerCase().trim();
        if (keyword.length < 2) return true;

        return (
            item.category?.toLowerCase().includes(keyword) ||
            item.type?.toLowerCase().includes(keyword) ||
            item.description?.toLowerCase().includes(keyword)
        );
    });

    return (
        <ModalWrapper>
            <View style={styles.container}>
                <Header
                    title="Search"
                    leftIcon={<BackButton />}
                    style={{ marginBottom: spacingY._10 }}
                />

                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="Search Transaction"
                            value={search}
                            placeholderTextColor={theme.placeholder}
                            containerStyle={{
                                backgroundColor: theme.background,
                            }}
                            onChangeText={setSearch}
                        />
                    </View>

                    <View>
                        <TransactionList
                            loading={transactionLoading}
                            data={filteredTransactions}
                            emptyListMessage="No transactions match your search keywords."
                        />
                    </View>
                </ScrollView>
            </View>
        </ModalWrapper>
    );
};

export default SearchModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: spacingY._20,
    },
    form: {
        gap: spacingY._30,
        marginTop: spacingY._15,
    },
    inputContainer: {
        gap: spacingY._10,
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: spacingX._20,
        gap: scale(12),
        paddingTop: spacingX._15,
        borderTopColor: defaultColors.neutral100,
        marginBottom: spacingY._5,
        borderTopWidth: 1,
    },
});
