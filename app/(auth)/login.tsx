import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { verticalScale } from '@/utils/styling';
import { spacingX, spacingY } from '@/constants/theme';
import BackButton from '@/components/BackButton';
import Input from '@/components/Input';
import * as Icons from 'phosphor-react-native';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import { useTheme } from '@/contexts/ThemeContext';

const Login = () => {
    const router = useRouter();
    const { login: loginUser } = useAuth();
    const { theme } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        setError(null);

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        const res = await loginUser(email, password);
        setLoading(false);

        if (!res.success) {
            setError(res.msg || 'Something went wrong. Please try again.');
        }
    };

    return (
        <ScreenWrapper>
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <BackButton iconSize={28} style={{ margin: 18 }} />

                <View style={{ gap: 5, marginTop: spacingY._20 }}>
                    <Typo size={30} fontWeight="800" color={theme.text}>Hey,</Typo>
                    <Typo size={30} fontWeight="800" color={theme.primary}>Welcome Back</Typo>
                </View>

                <View style={styles.form}>
                    <Typo size={16} color={theme.textLight}>Login now to track your expenses</Typo>

                    <Input
                        placeholder="Enter Your Email"
                        icon={<Icons.Envelope size={verticalScale(26)} color={theme.placeholder} />}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Input
                        placeholder="Enter your Password"
                        icon={<Icons.Lock size={verticalScale(26)} color={theme.placeholder} />}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        rightIcon={
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                    <Icons.EyeSlash size={verticalScale(24)} color={theme.placeholder} />
                                ) : (
                                    <Icons.Eye size={verticalScale(24)} color={theme.placeholder} />
                                )}
                            </TouchableOpacity>
                        }
                    />

                    <TouchableOpacity
                        style={styles.forgotPassword}
                        onPress={() => router.navigate('/(auth)/forgetPassword')}
                    >
                        <Typo size={14} fontWeight="500" color={theme.link}>Forgot Password?</Typo>
                    </TouchableOpacity>
                </View>

                {error && (
                    <Typo size={14} color="red" style={styles.errorMessage}>
                        {error}
                    </Typo>
                )}

                <Button
                    onPress={handleLogin}
                    loading={loading}
                    disabled={loading || !email || !password}
                >
                    <Typo size={18} fontWeight="600" color={theme.buttonText}>Login</Typo>
                </Button>

                <View style={styles.footer}>
                    <Typo size={14} color={theme.textLight}>Don’t have an account? </Typo>
                    <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                        <Typo size={14} fontWeight="600" color={theme.primary}>Sign up</Typo>
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center', marginTop: spacingY._10 }}>
                    <Typo size={12} color={theme.textLight}>Inspired by your financial future 💸</Typo>
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._30,
        paddingHorizontal: spacingX._20,
    },
    form: {
        gap: spacingY._20,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: -spacingY._10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginTop: spacingY._10,
    },
    errorMessage: {
        textAlign: 'center',
        marginVertical: spacingY._10,
    },
});
