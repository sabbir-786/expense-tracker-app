<<<<<<< HEAD
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
=======
import { StyleSheet, TouchableOpacity } from 'react-native';
>>>>>>> 940d709 (Update Code)
import React from 'react';
import { useRouter } from 'expo-router';
import { CaretLeft } from 'phosphor-react-native';
import { verticalScale } from '@/utils/styling';
import { colors, radius, spacingX } from '@/constants/theme';
<<<<<<< HEAD

interface BackButtonProps {
    style?: ViewStyle;
    iconSize?: number;
}
=======
import { BackButtonProps } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
>>>>>>> 940d709 (Update Code)

const BackButton = ({
    style,
    iconSize = 26,
}: BackButtonProps) => {
    const router = useRouter();
<<<<<<< HEAD
=======
    const { theme } = useTheme(); // 👈 use themed colors
>>>>>>> 940d709 (Update Code)

    return (
        <TouchableOpacity
            onPress={() => router.back()}
<<<<<<< HEAD
            style={[styles.button, style]}
=======
            style={[styles.button, { backgroundColor: theme.card }, style]}
>>>>>>> 940d709 (Update Code)
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
            <CaretLeft
                size={verticalScale(iconSize)}
<<<<<<< HEAD
                color={colors.white}
=======
                color={theme.text}
>>>>>>> 940d709 (Update Code)
                weight="bold"
            />
        </TouchableOpacity>
    );
};

export default BackButton;

const styles = StyleSheet.create({
    button: {
<<<<<<< HEAD
        backgroundColor: colors.neutral600,
        padding: 5,
        marginLeft: spacingX._10,
        borderRadius: radius._12,
        borderCurve: 'continuous',
        // Removed alignSelf to allow flexible positioning
=======
        padding: 5,
        marginLeft: spacingX._5,
        alignSelf: 'flex-start',
        borderRadius: radius._12,
        borderCurve: 'continuous',
>>>>>>> 940d709 (Update Code)
    },
});
