import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { scale } from '@/utils/styling';
import { ImageBackground } from 'expo-image';
import Typo from './Typo';
import * as Icons from 'phosphor-react-native'
import { verticalScale } from 'react-native-size-matters';
import useFetchData from '@/hooks/useFetchData';
import { orderBy, where } from 'firebase/firestore';
import { WalletType } from '@/types';
import { useAuth } from '@/contexts/authContext';


const HomeCard = () => {
    const { user } = useAuth()

    const { data: wallets, error, loading: walletLoading } = useFetchData<WalletType>('wallets', [
        where('uid', '==', user?.uid),
        orderBy('created', 'desc'),
    ])

    const getTotals = () => {
        return wallets.reduce(
            (totals: any, item: WalletType) => {
                totals.balance += Number(item.amount || 0);
                totals.income += Number(item.totalIncome || 0);
                totals.expenses += Number(item.totalExpenses || 0);
                return totals; // ✅ Don't forget this
            },
            { balance: 0, income: 0, expenses: 0 }
        );
    };


    return (
        <ImageBackground
            source={require('../assets/images/card.png')}
            contentFit='fill'
            style={styles.bgImage}
        >
            <View style={styles.container}>
                <View>
                    <View style={styles.totalBalanceRow}>
                        <Typo color={colors.neutral800} size={17} fontWeight={'500'}>
                            Total Balance
                        </Typo>

                        <Icons.DotsThreeOutline
                            size={verticalScale(23)}
                            color={colors.black}
                            weight='fill'
                        />
                    </View>
                    <Typo color={colors.black} size={30} fontWeight={'bold'}>
                        ₹ {walletLoading ? <Typo size={16} color={colors.black}>XXXX.XX</Typo> : getTotals()?.balance?.toFixed(2)}
                    </Typo>
                </View>

                <View style={styles.stats}>
                    <View style={{ gap: verticalScale(5) }}>
                        <View style={styles.incomeExpense}>
                            <View style={styles.statsIcon}>
                                <Icons.ArrowDown
                                    size={verticalScale(15)}
                                    color={colors.black}
                                    weight='bold'
                                />
                            </View>
                            <Typo size={16} color={colors.neutral700} fontWeight={'500'}>
                                Income
                            </Typo>
                        </View>
                        <View style={{ alignSelf: "center" }}>
                            <Typo size={17} color={colors.green} fontWeight={'600'}>
                                ₹{walletLoading ? <Typo size={16} color={colors.green}>XXXX.XX</Typo> : getTotals()?.income?.toFixed(2)}
                            </Typo>
                        </View>

                    </View>
                    <View style={{ gap: verticalScale(5) }}>
                        <View style={styles.incomeExpense}>
                            <View style={styles.statsIcon}>
                                <Icons.ArrowUp
                                    size={verticalScale(15)}
                                    color={colors.black}
                                    weight='bold'
                                />
                            </View>
                            <Typo size={16} color={colors.neutral700} fontWeight={'500'}>
                                Expense
                            </Typo>
                        </View>
                        <View style={{ alignSelf: "center" }}>
                            <Typo size={17} color={colors.rose} fontWeight={'600'}>
                                ₹{walletLoading ? <Typo size={16} color={colors.rose}>XXXX.XX</Typo> : getTotals()?.expenses?.toFixed(2)}
                            </Typo>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

export default HomeCard;

const styles = StyleSheet.create({
    bgImage: {
        height: scale(210),
        width: "100%",

    },
    container: {
        padding: spacingX._20,
        paddingHorizontal: scale(23),
        height: "87%",
        width: "100%",
        justifyContent: "space-between",
    },
    totalBalanceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacingY._5,
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    statsIcon: {
        backgroundColor: colors.neutral350,
        padding: spacingY._5,
        borderRadius: 50,
    },
    incomeExpense: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacingY._7,
    },
});
