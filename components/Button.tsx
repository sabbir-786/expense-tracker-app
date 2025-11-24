import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { CustomButtonProps } from '@/types';
import { colors, radius } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import Loading from './Loading';
import { useTheme } from '@/contexts/ThemeContext';

const Button = ({
    style,
    onPress,
    loading = false,
    children,
}: CustomButtonProps) => {
    const { theme } = useTheme?.() || {};

    if (loading) {
        return (
            <View style={[styles.button, style, { backgroundColor: 'transparent' }]}>
                <Loading />
            </View>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.button,
                { backgroundColor: theme?.primary || colors.primary },
                style,
            ]}
        >
            {children}
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: radius._17,
        borderCurve: 'continuous',
        height: verticalScale(52),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
