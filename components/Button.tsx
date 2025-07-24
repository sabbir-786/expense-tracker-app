import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { CustomButtonProps } from '@/types';
<<<<<<< HEAD
import { colors, radius } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import Loading from './Loading'; // ✅ Capitalized import
=======
import { radius } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import Loading from './Loading';
import { useTheme } from '@/contexts/ThemeContext'; // ✅ Theme hook
>>>>>>> 940d709 (Update Code)

const Button = ({
    style,
    onPress,
    loading = false,
    children,
}: CustomButtonProps) => {
<<<<<<< HEAD
=======
    const { theme } = useTheme(); // ✅ Get theme

>>>>>>> 940d709 (Update Code)
    if (loading) {
        return (
            <View style={[styles.button, style, { backgroundColor: 'transparent' }]}>
                <Loading />
            </View>
        );
    }

    return (
<<<<<<< HEAD
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
=======
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor: theme.primary }, style]} // ✅ Themed background
        >
>>>>>>> 940d709 (Update Code)
            {children}
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
<<<<<<< HEAD
        backgroundColor: colors.primary,
=======
>>>>>>> 940d709 (Update Code)
        borderRadius: radius._17,
        borderCurve: 'continuous',
        height: verticalScale(52),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
