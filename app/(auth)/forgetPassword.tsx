import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    View,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from '@/config/firebase';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import Input from '@/components/Input';
import Button from '@/components/Button';
import BackButton from '@/components/BackButton';
import { verticalScale } from '@/utils/styling';
import { spacingX, spacingY } from '@/constants/theme';
import * as Icons from 'phosphor-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';

const ForgetPassword = () => {
    const router = useRouter();
    const { theme } = useTheme();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleReset = async () => {
        setError(null);

        if (!email) return setError('Please enter your email.');
        if (!/\S+@\S+\.\S+/.test(email)) return setError('Enter a valid email.');

        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert(
                'Email Sent',
                'Password reset email has been sent. Please check your inbox.',
                [{ text: 'OK', onPress: () => router.back() }]
            );
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Header
                        title={'Forgot Password'}
                        leftIcon={<BackButton />}
                        style={{ marginBottom: spacingY._10 }}
                    />

                    <Typo size={16} color={theme.mutedText}>
                        Enter your registered email and we'll send you a reset link.
                    </Typo>

                    <View style={styles.form}>
                        <Input
                            placeholder="Enter Your Email"
                            icon={
                                <Icons.Envelope size={verticalScale(26)} color={theme.neutral300} />
                            }
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Button onPress={handleReset} loading={loading} disabled={!email || loading}>
                            <Typo size={18} fontWeight="600" color={theme.buttonText}>
                                Send Reset Email
                            </Typo>
                        </Button>

                        {error && (
                            <Typo size={14} color={theme.rose} style={styles.errorMessage}>
                                {error}
                            </Typo>
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScreenWrapper>
    );
};

export default ForgetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._20,
        paddingHorizontal: spacingX._20,
        paddingTop: spacingY._20,
    },
    form: {
        marginTop: spacingY._20,
        gap: spacingY._20,
    },
    errorMessage: {
        textAlign: 'center',
        marginTop: spacingY._10,
    },
});
