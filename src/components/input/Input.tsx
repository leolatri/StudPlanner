import { View, Text, TextInput } from "react-native";
import st from "./inputStyle";
import React from "react";

interface InputProps {
    label: string;
}

const Input = ({label}: InputProps) => {
    return (
        <View style={st.inputBlock}>
            <Text style={st.label}>{label}</Text>
            <TextInput style={st.input}/>
        </View>
    )
};

export default React.memo(Input);