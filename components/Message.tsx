// Message.tsx
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors, spacingY } from "@/constants/theme";

interface MessageProps {
    type: "error" | "success";
    message: string;
}

const Message: React.FC<MessageProps> = ({ type, message }) => {
    const messageStyle = type === "error" ? styles.error : styles.success;

    return (
        <View style={[styles.container, messageStyle]}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacingY._10,
        padding: spacingY._5,
        borderRadius: 4,
    },
    text: {
        color: colors.white,
        fontSize: 14,
    },
    error: {
        backgroundColor: colors.rose,
    },
    success: {
        backgroundColor: colors.green,
    },
});

export default Message;
