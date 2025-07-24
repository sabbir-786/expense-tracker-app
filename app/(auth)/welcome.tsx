import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
<<<<<<< HEAD
import { colors, spacingX, spacingY } from "@/constants/theme";
=======
import { spacingX, spacingY } from "@/constants/theme";
>>>>>>> 940d709 (Update Code)
import { verticalScale } from "@/utils/styling";
import Button from "@/components/Button";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
<<<<<<< HEAD

const Welcome = () => {
    const router = useRouter();

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/* Sign In Button */}
                <View>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.LoginButton}>
                        <Typo fontWeight="500">Sign in</Typo>
=======
import { useTheme } from "@/contexts/ThemeContext"; // ✅ Theme

const Welcome = () => {
    const router = useRouter();
    const { theme } = useTheme(); // ✅ Theme usage

    return (
        <ScreenWrapper>
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                {/* Sign In Button */}
                <View style={{ margin: 12 }}>
                    <TouchableOpacity
                        onPress={() => router.push("/(auth)/login")}
                        style={styles.LoginButton}
                    >
                        <Typo fontWeight="bold" color={theme.primary}>
                            Sign in
                        </Typo>
>>>>>>> 940d709 (Update Code)
                    </TouchableOpacity>
                </View>

                {/* Image Section */}
                <View style={styles.imageWrapper}>
                    <Animated.Image
                        entering={FadeIn.duration(1000)}
<<<<<<< HEAD
                        source={require('../../assets/images/welcome.png')}
=======
                        source={require("../../assets/images/Welcome2.png")}
>>>>>>> 940d709 (Update Code)
                        style={styles.welcomeImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Footer Section */}
<<<<<<< HEAD
                <View style={styles.footer}>

=======
                <View style={[styles.footer, { backgroundColor: theme.background }]}>
>>>>>>> 940d709 (Update Code)
                    {/* Title */}
                    <Animated.View
                        entering={FadeInDown.duration(1000).springify().damping(12)}
                        style={{ alignItems: "center" }}
                    >
<<<<<<< HEAD
                        <Typo size={30} fontWeight="800">Always take control</Typo>
                        <Typo size={30} fontWeight="800">of your finances</Typo>
=======
                        <Typo size={30} fontWeight="800" color={theme.text}>
                            Always take control
                        </Typo>
                        <Typo size={30} fontWeight="800" color={theme.text}>
                            of your finances
                        </Typo>
>>>>>>> 940d709 (Update Code)
                    </Animated.View>

                    {/* Subtitle */}
                    <Animated.View
                        entering={FadeInDown.duration(1000).delay(100).springify().damping(12)}
                        style={{ alignItems: "center", gap: 2 }}
                    >
<<<<<<< HEAD
                        <Typo size={17} color={colors.textLight}>
                            Finances must be arranged to set a better
                        </Typo>
                        <Typo size={17} color={colors.textLight}>
=======
                        <Typo size={17} color={theme.textLight}>
                            Finances must be arranged to set a better
                        </Typo>
                        <Typo size={17} color={theme.textLight}>
>>>>>>> 940d709 (Update Code)
                            lifestyle in future
                        </Typo>
                    </Animated.View>

                    {/* Get Started Button */}
                    <Animated.View
                        entering={FadeInDown.duration(1000).delay(200).springify().damping(12)}
                        style={[{ alignItems: "center" }, styles.buttonContainer]}
                    >
<<<<<<< HEAD
                        <Button style={{ width: "100%" }} onPress={() => router.push('/(auth)/register')}>
                            <Typo size={22} color={colors.neutral900} fontWeight="600">
=======
                        <Button style={{ width: "100%" }} onPress={() => router.push("/(auth)/register")}>
                            <Typo size={22} color={theme.buttonText} fontWeight="600">
>>>>>>> 940d709 (Update Code)
                                Get Started
                            </Typo>
                        </Button>
                    </Animated.View>
<<<<<<< HEAD

=======
>>>>>>> 940d709 (Update Code)
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flex: 1,
        paddingTop: spacingY._7,
    },
    imageWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    welcomeImage: {
        width: "100%",
        height: verticalScale(300),
        marginTop: verticalScale(100),
    },
    LoginButton: {
        alignSelf: "flex-end",
        marginRight: spacingX._20,
    },
    footer: {
<<<<<<< HEAD
        backgroundColor: colors.neutral900,
=======
>>>>>>> 940d709 (Update Code)
        alignItems: "center",
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(45),
        gap: spacingY._20,
<<<<<<< HEAD
        shadowColor: "white",
        shadowOffset: { width: 0, height: -10 },
        elevation: 10,
        shadowRadius: 25,
        shadowOpacity: 0.15,
=======
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -5 },
        elevation: 10,
        shadowRadius: 25,
        shadowOpacity: 0.1,
>>>>>>> 940d709 (Update Code)
    },
    buttonContainer: {
        width: "100%",
        paddingHorizontal: spacingX._25,
    },
});
