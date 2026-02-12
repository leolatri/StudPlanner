import { View, Text, TextInput, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React, { useState } from "react";

interface InputProps {
    label?: string;
    isPassword?: boolean;
    placeholder?: string;
}

const Input = ({label, isPassword, placeholder}: InputProps) => {
    const [focused, setFocused] = useState(false);
    return (
        <View style={st.inputBlock}>
            {label && <Text style={[st.inputBlock__label, focused && {color: 'rgb(255, 255, 255)'}]}>{label}</Text>}
            <TextInput
                placeholder={placeholder || ""}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                underlineColorAndroid="transparent"
                secureTextEntry={isPassword || false}
                placeholderTextColor={"rgb(88, 88, 88)"}
                style={[st.inputBlock__input, focused && {borderColor: "rgb(255, 255, 255)"}]}
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
        color: 'rgba(97, 97, 97, 0.79)',
        fontWeight: '400',
    },
    inputBlock__input: {
        width: "100%",
        height: 40,

        backgroundColor: "rgba(38, 42, 53, 1)",

        borderRadius: 9,
        borderWidth: 1,
        borderColor: "rgba(88, 88, 88, 0.43)",
        padding: 12,

        color: 'rgb(255, 255, 255)',
        fontFamily: 'Montserrat-Regular',
        fontSize: 13,
        outlineColor: "transparent",
    },
});

export default React.memo(Input);