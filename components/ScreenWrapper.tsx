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
import { colors } from '@/constants/theme';

const { height } = Dimensions.get('window');

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
    const androidPaddingTop = Platform.OS === 'android'
        ? StatusBar.currentHeight || height * 0.03
        : 0;

    return (
        <View style={styles.root}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <SafeAreaView style={[styles.wrapper, { paddingTop: androidPaddingTop }, style]}>
                {children}
            </SafeAreaView>
        </View>
    );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.neutral900, // Set background outside SafeArea too
    },
    wrapper: {
        flex: 1,
        backgroundColor: colors.neutral900, // Ensures no flicker/white flash
    },
});
