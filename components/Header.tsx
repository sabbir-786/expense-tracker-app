import { StyleSheet, View } from 'react-native';
import React from 'react';
import Typo from './Typo';
import { HeaderProps } from '@/types';
<<<<<<< HEAD

const Header = ({ title = "", leftIcon, style }: HeaderProps) => {
    return (
        <View style={[styles.container, style]}>
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
            <Typo size={22} fontWeight="600" style={styles.title}>
=======
import { useTheme } from '@/contexts/ThemeContext';

const Header = ({ title = "", leftIcon, style }: HeaderProps) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }, style]}>
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
            <Typo
                size={22}
                fontWeight="600"
                style={[styles.title, { color: theme.text }]}
            >
>>>>>>> 940d709 (Update Code)
                {title}
            </Typo>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingVertical: 30,
    },
    leftIcon: {
        position: 'absolute',
        left: 0,
        zIndex: 1,
    },
    title: {
        textAlign: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
    },
});
