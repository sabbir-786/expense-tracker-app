<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'

const wallet = () => {
    return (
        <ScreenWrapper>
            <Text>wallet</Text>
        </ScreenWrapper>
    )
}

export default wallet

const styles = StyleSheet.create({})
=======
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import { radius, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from 'react-native-size-matters';
import Typo from '@/components/Typo';
import * as Icons from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import useFetchData from '@/hooks/useFetchData';
import { WalletType } from '@/types';
import { orderBy, where } from 'firebase/firestore';
import { useAuth } from '@/contexts/authContext';
import Loading from '@/components/Loading';
import WalletListItem from '@/components/WalletListItem';
import { useTheme } from '@/contexts/ThemeContext';

const WalletScreen = () => {
    const { user } = useAuth();
    const router = useRouter();
    const { theme } = useTheme(); // ✅ Theme support

    const { data: wallets, error, loading } = useFetchData<WalletType>('wallets', [
        where('uid', '==', user?.uid),
        orderBy('created', 'desc'),
    ]);

    const getTotalBalance = () =>
        wallets.reduce((total, item) => total + (item.amount || 0), 0);

    if (error) {
        return <Text style={[styles.errorText, { color: theme.errorText }]}>Error: {error}</Text>;
    }

    return (
        <ScreenWrapper style={{ backgroundColor: theme.background }}>
            <View style={styles.container}>
                <View style={[styles.balanceView, { backgroundColor: theme.background }]}>
                    <View style={{ alignItems: 'center' }}>
                        <Typo size={45} fontWeight="500" color={theme.text}>
                            ₹{getTotalBalance().toFixed(2)}
                        </Typo>
                        <Typo size={16} color={theme.mutedText}>
                            Total Balance
                        </Typo>
                    </View>
                </View>

                <View style={[styles.wallets, { backgroundColor: theme.card }]}>
                    <View style={styles.flexRow}>
                        <Typo size={20} fontWeight="500" color={theme.text}>
                            My Wallets
                        </Typo>
                        <TouchableOpacity onPress={() => router.push('/(modals)/walletModal')}>
                            <Icons.PlusCircle weight="fill" color={theme.textLight} size={verticalScale(33)} />
                        </TouchableOpacity>
                    </View>

                    {loading && <Loading />}

                    <FlatList
                        data={wallets}
                        renderItem={({ item, index }) => (
                            <WalletListItem item={item} index={index} router={router} />
                        )}
                        contentContainerStyle={styles.listStyle}
                        ListEmptyComponent={
                            <Text style={[styles.emptyText, { color: theme.mutedText }]}>
                                No wallets found.
                            </Text>
                        }
                    />
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default WalletScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    balanceView: {
        height: verticalScale(160),
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacingY._10,
    },
    wallets: {
        flex: 1,
        borderTopRightRadius: radius._30,
        borderTopLeftRadius: radius._30,
        padding: spacingX._20,
        paddingTop: spacingX._25,
    },
    listStyle: {
        paddingVertical: spacingY._25,
        paddingTop: spacingY._15,
    },
    errorText: {
        textAlign: 'center',
        marginTop: spacingY._20,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: spacingY._20,
    },
});
>>>>>>> 940d709 (Update Code)
