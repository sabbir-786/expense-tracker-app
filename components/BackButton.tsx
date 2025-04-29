import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { CaretLeft } from 'phosphor-react-native';
import { verticalScale } from '@/utils/styling';
import { colors, radius, spacingX } from '@/constants/theme';

interface BackButtonProps {
    style?: ViewStyle;
    iconSize?: number;
}

const BackButton = ({
    style,
    iconSize = 26,
}: BackButtonProps) => {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.button, style]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
            <CaretLeft
                size={verticalScale(iconSize)}
                color={colors.white}
                weight="bold"
            />
        </TouchableOpacity>
    );
};

export default BackButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.neutral600,
        padding: 5,
        marginLeft: spacingX._10,
        borderRadius: radius._12,
        borderCurve: 'continuous',
        // Removed alignSelf to allow flexible positioning
    },
});
