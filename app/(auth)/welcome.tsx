import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Button from "@/components/Button";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";

const Welcome = () => {
    const router = useRouter();

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/* Sign In Button */}
                <View>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.LoginButton}>
                        <Typo fontWeight="500">Sign in</Typo>
                    </TouchableOpacity>
                </View>

                {/* Image Section */}
                <View style={styles.imageWrapper}>
                    <Animated.Image
                        entering={FadeIn.duration(1000)}
                        source={require('../../assets/images/welcome.png')}
                        style={styles.welcomeImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Footer Section */}
                <View style={styles.footer}>

                    {/* Title */}
                    <Animated.View
                        entering={FadeInDown.duration(1000).springify().damping(12)}
                        style={{ alignItems: "center" }}
                    >
                        <Typo size={30} fontWeight="800">Always take control</Typo>
                        <Typo size={30} fontWeight="800">of your finances</Typo>
                    </Animated.View>

                    {/* Subtitle */}
                    <Animated.View
                        entering={FadeInDown.duration(1000).delay(100).springify().damping(12)}
                        style={{ alignItems: "center", gap: 2 }}
                    >
                        <Typo size={17} color={colors.textLight}>
                            Finances must be arranged to set a better
                        </Typo>
                        <Typo size={17} color={colors.textLight}>
                            lifestyle in future
                        </Typo>
                    </Animated.View>

                    {/* Get Started Button */}
                    <Animated.View
                        entering={FadeInDown.duration(1000).delay(200).springify().damping(12)}
                        style={[{ alignItems: "center" }, styles.buttonContainer]}
                    >
                        <Button style={{ width: "100%" }} onPress={() => router.push('/(auth)/register')}>
                            <Typo size={22} color={colors.neutral900} fontWeight="600">
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
        backgroundColor: colors.neutral900,
        alignItems: "center",
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(45),
        gap: spacingY._20,
        shadowColor: "white",
        shadowOffset: { width: 0, height: -10 },
        elevation: 10,
        shadowRadius: 25,
        shadowOpacity: 0.15,
    },
    buttonContainer: {
        width: "100%",
        paddingHorizontal: spacingX._25,
    },
});
