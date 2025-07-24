<<<<<<< HEAD
import React, { useState } from "react";
import {
    StyleSheet,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/authContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import Button from "@/components/Button";
import { colors, spacingX, spacingY, radius } from "@/constants/theme";

const Login: React.FC = () => {
    const router = useRouter();
    const { login: loginUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
=======
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
import { useTheme } from '@/contexts/ThemeContext'; // 🌙 dynamic theme

const Login = () => {
    const router = useRouter();
    const { login: loginUser } = useAuth();
    const { theme } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
>>>>>>> 940d709 (Update Code)

    const handleLogin = async () => {
        setError(null);

        if (!email || !password) {
<<<<<<< HEAD
            setError("Please fill in all fields.");
=======
            setError('Please fill in all fields.');
>>>>>>> 940d709 (Update Code)
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
<<<<<<< HEAD
            setError("Please enter a valid email address.");
=======
            setError('Please enter a valid email address.');
>>>>>>> 940d709 (Update Code)
            return;
        }

        setLoading(true);
        const res = await loginUser(email, password);
        setLoading(false);

        if (!res.success) {
<<<<<<< HEAD
            setError(res.msg || "Something went wrong. Please try again.");
=======
            setError(res.msg || 'Something went wrong. Please try again.');
>>>>>>> 940d709 (Update Code)
        }
    };

    return (
<<<<<<< HEAD
        <ScreenWrapper style={styles.container}>
            <KeyboardAvoidingView
                style={styles.content}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={colors.white} />
                </TouchableOpacity>

                <View style={styles.titleWrapper}>
                    <Typo size={32} fontWeight="800" color={colors.white}>
                        Welcome Back
                    </Typo>
                    <Typo size={16} color={colors.textLight} style={styles.subtitle}>
                        Login to your account to track expenses
                    </Typo>
                </View>

                <View style={styles.inputWrapper}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color={colors.textLight} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor={colors.textLight}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color={colors.textLight}
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor={colors.textLight}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.forgotPassword}
                        onPress={() => {
                            // Add forgot password logic here
                        }}
                    >
                        <Typo size={14} color={colors.primary}>
                            Forgot Password?
                        </Typo>
                    </TouchableOpacity>
                </View>

                <Button
                    style={styles.button}
                    onPress={handleLogin}
                    loading={loading}
                    disabled={loading || !email || !password}
                >
                    <Typo size={18} fontWeight="600" color={colors.neutral900}>
                        Login
                    </Typo>
                </Button>

=======
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

>>>>>>> 940d709 (Update Code)
                {error && (
                    <Typo size={14} color="red" style={styles.errorMessage}>
                        {error}
                    </Typo>
                )}

<<<<<<< HEAD
                <View style={styles.footer}>
                    <Typo size={14} color={colors.textLight}>
                        Don’t have an account?{" "}
                    </Typo>
                    <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                        <Typo size={14} fontWeight="600" color={colors.primary}>
                            Sign up
                        </Typo>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
=======
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
>>>>>>> 940d709 (Update Code)
        </ScreenWrapper>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
<<<<<<< HEAD
        backgroundColor: colors.neutral900,
        paddingHorizontal: spacingX._20,
    },
    backButton: {
        position: "absolute",
        top: spacingY._5,
        left: spacingX._5,
    },
    content: {
        flex: 1,
        justifyContent: "center",
    },
    titleWrapper: {
        marginBottom: spacingY._5,
    },
    subtitle: {
        marginTop: spacingY._5,
    },
    inputWrapper: {
        gap: spacingY._12,
        marginBottom: spacingY._10,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.neutral800,
        borderRadius: radius._12,
        paddingHorizontal: spacingX._5,
    },
    icon: {
        marginRight: spacingX._3,
    },
    input: {
        flex: 1,
        height: 48,
        color: colors.white,
        fontSize: 16,
    },
    forgotPassword: {
        alignSelf: "flex-end",
        marginTop: spacingY._5,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: radius._12,
        paddingVertical: spacingY._10,
        marginBottom: spacingY._5,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    errorMessage: {
        textAlign: "center",
        marginBottom: spacingY._5,
=======
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
>>>>>>> 940d709 (Update Code)
    },
});
