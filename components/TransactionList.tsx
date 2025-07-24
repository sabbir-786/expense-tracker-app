import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FlashList } from '@shopify/flash-list';
import {
    TransactionItemProps,
    TransactionListType,
    TransactionType,
} from '@/types';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import Typo from './Typo';
import Loading from './Loading';
import { expenseCategories, incomeCategory } from '@/constants/data';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Timestamp } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

const TransactionList = ({ data, title, loading, emptyListMessage }: TransactionListType) => {
    const router = useRouter();
    const { theme } = useTheme(); // ✅ use current theme

    const handleClick = (item: TransactionType) => {
        router.push({
            pathname: '/(modals)/transactionModal',
            params: {
                id: item?.id,
                type: item?.type,
                amount: item?.amount.toString(),
                category: item?.category,
                date: (item?.date as Timestamp)?.toDate()?.toISOString(),
                description: item?.description,
                image: item?.image,
                uid: item?.uid,
                walletId: item?.walletId,
            },
        });
    };

    return (
        <View style={styles.container}>
            {title && (
                <Typo size={20} fontWeight="500" color={theme.text}>
                    {title}
                </Typo>
            )}

            <View style={styles.list}>
                <FlashList
                    data={data}
                    renderItem={({ item, index }) => (
                        <TransactionItem
                            item={item}
                            index={index}
                            handleClick={handleClick}
                            theme={theme}
                        />
                    )}
                    estimatedItemSize={60}
                    keyExtractor={(item, index) => item.id || index.toString()}
                />
            </View>

            {!loading && data.length === 0 && (
                <Typo
                    size={15}
                    color={theme.mutedText || colors.neutral400}
                    style={{ textAlign: 'center', marginTop: spacingY._15 }}
                >
                    {emptyListMessage || 'No transactions yet.'}
                </Typo>
            )}

            {loading && (
                <View style={{ top: verticalScale(100) }}>
                    <Loading />
                </View>
            )}
        </View>
    );
};

const TransactionItem = ({
    item,
    index,
    handleClick,
    theme,
}: TransactionItemProps & { theme: any }) => {
    const category =
        item.type === 'income'
            ? incomeCategory
            : expenseCategories[item.category!] || expenseCategories['other'];
    const IconComponent = category.icon;

    const date = (item?.date as Timestamp)?.toDate()?.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
    });

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 70).springify().damping(14)}
        >
            <TouchableOpacity
                style={[styles.row, { backgroundColor: theme.card }]} // ✅ dynamic background
                onPress={() => handleClick(item)}
            >
                <View style={[styles.icon, { backgroundColor: category.bgColor }]}>
                    {IconComponent && (
                        <IconComponent
                            size={verticalScale(25)}
                            weight="fill"
                            color={colors.white}
                            style={styles.iconCompact}
                        />
                    )}
                </View>

                <View style={styles.categoryDes}>
                    <Typo size={17} color={theme.text}>
                        {category.label}
                    </Typo>
                    <Typo
                        size={12}
                        color={theme.mutedText || colors.neutral400}
                        textProps={{ numberOfLines: 1 }}
                    >
                        {item.description || 'No description'}
                    </Typo>
                </View>

                <View style={styles.amountDate}>
                    <Typo
                        fontWeight="500"
                        color={item.type === 'income' ? colors.green : colors.rose}
                    >
                        {item.type === 'income' ? '+ ' : '- '}₹{item.amount?.toFixed(2)}
                    </Typo>
                    <Typo size={13} color={theme.mutedText || colors.neutral400}>
                        {date}
                    </Typo>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default TransactionList;

const styles = StyleSheet.create({
    container: {
        gap: spacingY._17,
    },
    list: {
        minHeight: 3,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacingX._12,
        marginBottom: spacingY._12,
        padding: spacingY._10,
        paddingHorizontal: spacingY._10,
        borderRadius: radius._17,
    },
    icon: {
        height: verticalScale(44),
        aspectRatio: 1,
        alignItems: 'center',
        borderRadius: radius._12,
        borderCurve: 'continuous',
        position: 'relative',
        overflow: 'hidden',
    },
    iconCompact: {
        position: 'absolute',
        top: 8,
        left: 9,
    },
    categoryDes: {
        flex: 1,
        gap: 2.5,
    },
    amountDate: {
        alignItems: 'flex-end',
        gap: 3,
    },
});
