import { StyleSheet } from "react-native";

const st = StyleSheet.create({
    form: {
        width: '100%',
        minHeight: '50%',

        gap: 10,
    },
    form__block: {
        width: '100%',
        minHeight: '40%',

        padding: 40,
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: 'rgba(31, 34, 43, 1)',
        borderRadius: 10,
    },    
});

export default st;