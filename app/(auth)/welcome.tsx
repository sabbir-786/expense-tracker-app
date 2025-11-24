import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Button from "@/components/Button";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";

const Welcome = () => {
    const router = useRouter();
    const { theme } = useTheme();

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
                    </TouchableOpacity>
                </View>

                {/* Image Section */}
                <View style={styles.imageWrapper}>
                    <Animated.Image
                        entering={FadeIn.duration(1000)}
                        source={require("../../assets/images/Welcome2.png")}
                        style={styles.welcomeImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Footer Section */}
                <View style={[styles.footer, { backgroundColor: theme.background }]}>
                    {/* Title */}
                    <Animated.View
                        entering={FadeInDown.duration(1000).springify().damping(12)}
                        style={{ alignItems: "center" }}
                    >
                        <Typo size={30} fontWeight="800" color={theme.text}>
                            Always take control
                        </Typo>
                        <Typo size={30} fontWeight="800" color={theme.text}>
                            of your finances
                        </Typo>
                    </Animated.View>

                    {/* Subtitle */}
                    <Animated.View
                        entering={FadeInDown.duration(1000).delay(100).springify().damping(12)}
                        style={{ alignItems: "center", gap: 2 }}
                    >
                        <Typo size={17} color={theme.textLight}>
                            Finances must be arranged to set a better
                        </Typo>
                        <Typo size={17} color={theme.textLight}>
                            lifestyle in future
                        </Typo>
                    </Animated.View>

                    {/* Get Started Button */}
                    <Animated.View
                        entering={FadeInDown.duration(1000).delay(200).springify().damping(12)}
                        style={[{ alignItems: "center" }, styles.buttonContainer]}
                    >
                        <Button style={{ width: "100%" }} onPress={() => router.push("/(auth)/register")}>
                            <Typo size={22} color={theme.buttonText} fontWeight="600">
                                Get Started
                            </Typo>
                        </Button>
                    </Animated.View>
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
        alignItems: "center",
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(45),
        gap: spacingY._20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -5 },
        elevation: 10,
        shadowRadius: 25,
        shadowOpacity: 0.1,
    },
    buttonContainer: {
        width: "100%",
        paddingHorizontal: spacingX._25,
    },
});
