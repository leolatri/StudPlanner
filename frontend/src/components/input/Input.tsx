import { View, Text, TextInput, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { useState } from "react";
import { colors } from "../../GeneralStyles";

interface InputProps {
    label?: string;
    isPassword?: boolean;
    placeholder?: string;
    style?: StyleProp<ViewStyle>;
    type?: string;
    value?: string;
}

const Input = ({ label, isPassword, placeholder, style, type, value }: InputProps) => {
    const [focused, setFocused] = useState(false);
    return (
        <View style={st.inputBlock}>
            {label && <Text style={[st.inputBlock__label, focused && { color: colors.textWhite }]}>{label}</Text>}
            <TextInput
                placeholder={placeholder || ""}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                underlineColorAndroid="transparent"
                secureTextEntry={isPassword || false}
                placeholderTextColor={colors.gray}
                textAlignVertical="top"
                scrollEnabled={false}
                value={value}
                multiline={type === 'textarea'}
                style={[st.inputBlock__input, style, focused && { borderColor: colors.textWhite }]}
            />
        </View>
    )
};

const st = StyleSheet.create({
    inputBlock: {
        width: '100%',
        minHeight: '10%',

        paddingBottom: 10,

        justifyContent: 'center',
        gap: 5,

        position: 'relative',
    },
    inputBlock__label: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: colors.gray,
        fontWeight: '400',
    },
    inputBlock__input: {
        width: "100%",
        minHeight: 42,

        backgroundColor: colors.textArea,

        borderRadius: 9,
        borderWidth: 1,
        borderColor: colors.gray,
        padding: 12,

        textAlignVertical: 'top',

        color: colors.textWhite,
        fontFamily: 'Montserrat-Regular',
        fontSize: 13,
        outlineColor: "transparent",

        includeFontPadding: false,

    },
});

export default Input;