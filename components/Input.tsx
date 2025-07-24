import { StyleSheet, TextInput, View, TextInputProps } from 'react-native';
import React from 'react';
import { InputProps } from '@/types';
import { colors, radius, spacingX } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import { useTheme } from '@/contexts/ThemeContext';

const Input = (props: InputProps & TextInputProps) => {
    const { theme } = useTheme();

    return (
        <View
            style={[
                styles.container,
                {
                    borderColor: theme.border,
                    backgroundColor: theme.neutral900,
                },
                props.containerStyle,
            ]}
        >
            {props.icon && <View style={styles.iconLeft}>{props.icon}</View>}

            <TextInput
                style={[
                    styles.input,
                    { color: theme.text },
                    props.inputStyle,
                ]}
                ref={props.inputRef}
                placeholderTextColor={theme.text}
                secureTextEntry={props.secureTextEntry}
                autoCorrect={false}
                {...props}
            />

            {props.rightIcon && <View style={styles.iconRight}>{props.rightIcon}</View>}
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: verticalScale(54),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: radius._17,
        borderCurve: 'continuous',
        paddingHorizontal: spacingX._15,
        gap: spacingX._10,
    },
    input: {
        flex: 1,
        fontSize: verticalScale(14),
        paddingVertical: 0,
    },
    iconLeft: {
        marginRight: spacingX._5,
    },
    iconRight: {
        marginLeft: spacingX._5,
    },
});
