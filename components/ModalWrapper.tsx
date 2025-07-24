<<<<<<< HEAD
import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { ModalWrapperProps } from '@/types'


const isAndroid = Platform.OS == 'android';
=======
import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { spacingY } from '@/constants/theme';
import { ModalWrapperProps } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';

const isAndroid = Platform.OS === 'android';
>>>>>>> 940d709 (Update Code)

const ModalWrapper = ({
    style,
    children,
<<<<<<< HEAD
    bg = colors.neutral800
}: ModalWrapperProps) => {
    return (
        <View style={[styles.container, { backgroundColor: bg }, style && style]}>
            {children}
        </View>
    )
}

export default ModalWrapper

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        paddingTop: isAndroid ? spacingY._50 : 15,
        paddingBottom: isAndroid ? spacingY._20 : spacingY._10


    }
})
=======
    bg,
}: ModalWrapperProps) => {
    const { theme } = useTheme();

    const backgroundColor = bg || theme.background; // fallback to theme background

    return (
        <View style={[styles.container, { backgroundColor }, style]}>
            {children}
        </View>
    );
};

export default ModalWrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: isAndroid ? spacingY._50 : spacingY._15,
        paddingBottom: isAndroid ? spacingY._20 : spacingY._10,
    } as ViewStyle,
});
>>>>>>> 940d709 (Update Code)
