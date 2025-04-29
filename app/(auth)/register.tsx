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

const Register: React.FC = () => {
    const router = useRouter();
    const { register: registerUser } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        setError(null);

        if (!name || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        const res = await registerUser(email, password, name);
        setLoading(false);

        if (!res.success) {
            setError(res.msg || "Registration failed. Please try again.");
        }
    };

    return (
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
                        Create Account
                    </Typo>
                    <Typo size={16} color={colors.textLight} style={styles.subtitle}>
                        Start managing your expenses with ease
                    </Typo>
                </View>

                <View style={styles.inputWrapper}>
                    {/* Name */}
                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={20} color={colors.textLight} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Full name"
                            placeholderTextColor={colors.textLight}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    {/* Email */}
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color={colors.textLight} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email address"
                            placeholderTextColor={colors.textLight}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Password */}
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color={colors.textLight}
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor={colors.textLight}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                </View>

                <Button
                    style={styles.button}
                    onPress={handleRegister}
                    loading={loading}
                    disabled={loading || !email || !password || !name}
                >
                    <Typo size={18} fontWeight="600" color={colors.neutral900}>
                        Sign Up
                    </Typo>
                </Button>

                {error && (
                    <Typo size={14} color="red" style={styles.errorMessage}>
                        {error}
                    </Typo>
                )}

                <View style={styles.footer}>
                    <Typo size={14} color={colors.textLight}>
                        Already have an account?{" "}
                    </Typo>
                    <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                        <Typo size={14} fontWeight="600" color={colors.primary}>
                            Login
                        </Typo>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        gap: spacingY._10,
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
    },
});
