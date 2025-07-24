<<<<<<< HEAD
import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'

const Loading = ({
    size = "large",
    color = colors.primary,

}: ActivityIndicatorProps) => {

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={size} color={color} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({})
=======
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext'; // if using theme context

const Loading = () => {
    const { theme } = useTheme(); // optional, remove if not using theme context

    return (
        <View style={styles.container}>
            <ActivityIndicator
                size="large"
                color={theme.primary}
                style={StyleSheet.absoluteFillObject}
            />
            <ActivityIndicator
                size="small"
                color={theme.rose || '#ff5b5b'}
                style={styles.overlay}
            />
        </View>
    );
};

export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', // optionally make dim: rgba(0,0,0,0.05)
    },
    overlay: {
        transform: [{ scale: 1.5 }],
    },
});
>>>>>>> 940d709 (Update Code)
