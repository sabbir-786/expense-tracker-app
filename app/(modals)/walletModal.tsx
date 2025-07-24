import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Alert,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { spacingX, spacingY } from '@/constants/theme';
import { scale, verticalScale } from '@/utils/styling';
import ModalWrapper from '@/components/ModalWrapper';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import * as Icons from 'phosphor-react-native';
import Typo from '@/components/Typo';
import { WalletType } from '@/types';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/authContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ImageUpload from '@/components/imageUpload';
import { createOrUpdateWallet, deleteWallet } from '@/services/walletService';
import Input from '@/components/Input';
import { useTheme } from '@/contexts/ThemeContext';

const WalletModal = () => {
    const { user } = useAuth();
    const router = useRouter();
    const { theme } = useTheme();

    const oldWallet: { name: string; image: string; id: string } = useLocalSearchParams();
    const isEditMode = Boolean(oldWallet?.id);

    const [wallet, setWallet] = useState<WalletType>({
        name: '',
        image: null,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            setWallet({
                name: oldWallet.name,
                image: oldWallet.image,
            });
        }
    }, []);

    const onDelete = async () => {
        if (!oldWallet?.id) return;
        setLoading(true);
        const res = await deleteWallet(oldWallet.id);

        if (res.success) {
            router.back();
        } else {
            Alert.alert('Wallet', res.msg || 'Failed to delete wallet');
        }
        setLoading(false);
    };

    const showDeleteAlert = () => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to delete?\nThis will also delete all related transactions.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: onDelete },
            ]
        );
    };

    const onSubmit = async () => {
        const { name, image } = wallet;

        if (!name.trim() || !image) {
            Alert.alert('Wallet', 'Please fill in all the fields');
            return;
        }

        const data: WalletType = {
            name,
            image,
            uid: user?.uid,
        };

        if (isEditMode) data.id = oldWallet.id;

        setLoading(true);
        try {
            const res = await createOrUpdateWallet(data);
            if (res.success) {
                router.back();
            } else {
                Alert.alert('Wallet', res.msg || 'Failed to update wallet');
            }
        } catch (err) {
            Alert.alert('Error', 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalWrapper>
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <Header
                    title={isEditMode ? 'Update Wallet' : 'New Wallet'}
                    leftIcon={<BackButton />}
                    style={{ marginBottom: spacingY._10 }}
                />

                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.inputContainer}>
                        <Typo color={theme.text}>Wallet Name</Typo>

                        <Input
                            placeholder="Wallet name"
                            icon={<Icons.Wallet size={verticalScale(26)} color={theme.placeholder} />}
                            value={wallet.name}
                            onChangeText={(value) => setWallet({ ...wallet, name: value })}
                            keyboardType="default"
                            autoCapitalize="words"
                        />
                    </View>



                    <View style={styles.inputContainer}>
                        <Typo color={theme.text}>Wallet Icon</Typo>
                        <ImageUpload
                            file={wallet.image}
                            onClear={() => setWallet({ ...wallet, image: null })}
                            onSelect={(file) => setWallet({ ...wallet, image: file })}
                            placeholder={wallet.image ? 'Change Icon' : 'Upload Icon'}
                        />
                    </View>
                </ScrollView>
            </View>

            <View style={[styles.footer, { borderTopColor: theme.border }]}>
                {isEditMode && (
                    <Button
                        onPress={showDeleteAlert}
                        style={{
                            backgroundColor: theme.rose,
                            paddingHorizontal: spacingX._15,
                        }}
                    >
                        {loading ? (
                            <ActivityIndicator color={theme.white} />
                        ) : (
                            <Icons.Trash color={theme.white} size={verticalScale(24)} weight="bold" />
                        )}
                    </Button>
                )}

                <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
                    {loading ? (
                        <ActivityIndicator color={theme.black} />
                    ) : (
                        <Typo color={theme.black} fontWeight="700">
                            {isEditMode ? 'Update Wallet' : 'Create Wallet'}
                        </Typo>
                    )}
                </Button>
            </View>
        </ModalWrapper>
    );
};

export default WalletModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: spacingY._20,
    },
    form: {
        gap: spacingY._30,
        marginTop: spacingY._15,
        paddingBottom: spacingY._20,
    },
    inputContainer: {
        gap: spacingY._10,
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: spacingX._10,
        gap: scale(12),
        paddingTop: spacingX._15,
        borderTopWidth: 1,
        marginBottom: spacingY._5,
    },
});
