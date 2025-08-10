import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import ScreenWrapper from '@/components/ScreenWrapper'
import { verticalScale } from '@/utils/styling'
import * as Icons from 'phosphor-react-native'
import HomeCard from '@/components/HomeCard'
import TransactionList from '@/components/TransactionList'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'
import { limit, orderBy, where } from 'firebase/firestore'
import useFetchData from '@/hooks/useFetchData'
import { TransactionType } from '@/types'
import { useTheme } from '@/contexts/ThemeContext';


const Home = () => {
    const { user } = useAuth();
    const router = useRouter();
    const { theme, mode } = useTheme();


    const constraints = [
        where("uid", "==", user?.uid),
        orderBy("date", "desc"),
        limit(30)
    ];

    const { data: recentTransactions, loading } = useFetchData<TransactionType>("transactions", constraints);

    return (
        <ScreenWrapper key={mode}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ gap: 4 }}>
                        <Typo size={16} color={theme.neutral400}>Hello,</Typo>
                        <Typo size={20} color={theme.text} fontWeight={"bold"}>{user?.name}</Typo>
                    </View>
                    <TouchableOpacity style={styles.searchIcon} onPress={() => router.push('/(modals)/searchModal')}>
                        <Icons.MagnifyingGlass
                            size={verticalScale(22)}
                            color={theme.neutral200}
                            weight='bold'
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollViewStyle}
                    showsVerticalScrollIndicator={false}
                >
                    <HomeCard />
                    <TransactionList
                        data={recentTransactions}
                        loading={loading}
                        emptyListMessage="No transactions found!"
                        title="Recent Transactions"
                    />
                </ScrollView>

                <Button style={styles.floatingButton} onPress={() => router.push('/(modals)/transactionModal')}>
                    <Icons.Plus color={theme.text} weight="bold" size={verticalScale(24)} />
                </Button>
            </View>
        </ScreenWrapper>
    )
}

export default Home

<<<<<<< HEAD
const styles = StyleSheet.create({})
=======
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacingX._10,
        marginTop: verticalScale(8),
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacingY._10,
    },
    searchIcon: {
        backgroundColor: colors.neutral700,
        padding: spacingX._10,
        borderRadius: 50,
    },
    floatingButton: {
        height: verticalScale(50),
        width: verticalScale(50),
        borderRadius: 100,
        position: "absolute",
        bottom: verticalScale(30),
        right: verticalScale(30),
    },
    scrollViewStyle: {
        marginTop: spacingY._10,
        paddingBottom: verticalScale(100),
        gap: spacingY._25,
    },
});
>>>>>>> 940d709 (Update Code)
