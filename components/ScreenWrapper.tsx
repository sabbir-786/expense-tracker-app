import {
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    View,
    SafeAreaView,
} from 'react-native';
import React from 'react';
import { ScreenWrapperProps } from '@/types';
<<<<<<< HEAD
import { colors } from '@/constants/theme';
=======
import { useTheme } from '@/contexts/ThemeContext';
>>>>>>> 940d709 (Update Code)

const { height } = Dimensions.get('window');

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
    const androidPaddingTop = Platform.OS === 'android'
        ? StatusBar.currentHeight || height * 0.03
        : 0;

<<<<<<< HEAD
    return (
        <View style={styles.root}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <SafeAreaView style={[styles.wrapper, { paddingTop: androidPaddingTop }, style]}>
=======
    const { mode, theme } = useTheme();

    return (
        <View style={[styles.root, { backgroundColor: theme.background }]}>
            <StatusBar
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={theme.background}
                translucent
            />
            <SafeAreaView
                style={[
                    styles.wrapper,
                    { paddingTop: androidPaddingTop, backgroundColor: theme.background },
                    style,
                ]}
            >
>>>>>>> 940d709 (Update Code)
                {children}
            </SafeAreaView>
        </View>
    );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
    root: {
        flex: 1,
<<<<<<< HEAD
        backgroundColor: colors.neutral900, // Set background outside SafeArea too
    },
    wrapper: {
        flex: 1,
        backgroundColor: colors.neutral900, // Ensures no flicker/white flash
=======
    },
    wrapper: {
        flex: 1,
>>>>>>> 940d709 (Update Code)
    },
});
