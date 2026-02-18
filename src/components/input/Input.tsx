import { View, Text, TextInput, StyleSheet} from "react-native";
import React, { useState } from "react";
import { colors } from "../../GeneralStyles";

interface InputProps {
    label?: string;
    isPassword?: boolean;
    placeholder?: string;
}

const Input = ({label, isPassword, placeholder}: InputProps) => {
    const [focused, setFocused] = useState(false);
    return (
        <View style={st.inputBlock}>
            {label && <Text style={[st.inputBlock__label, focused && {color: colors.textWhite}]}>{label}</Text>}
            <TextInput
                placeholder={placeholder || ""}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                underlineColorAndroid="transparent"
                secureTextEntry={isPassword || false}
                placeholderTextColor={colors.gray}
                style={[st.inputBlock__input, focused && {borderColor: colors.textWhite}]}
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

        position:'relative',
    },
    inputBlock__label: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: colors.gray,
        fontWeight: '400',
    },
    inputBlock__input: {
        width: "100%",
        height: 42,

        backgroundColor: colors.textArea,

        borderRadius: 9,
        borderWidth: 1,
        borderColor: colors.gray,
        padding: 12,

        color: colors.textWhite,
        fontFamily: 'Montserrat-Regular',
        fontSize: 13,
        outlineColor: "transparent",

        includeFontPadding: false,

    },
});

export default React.memo(Input);