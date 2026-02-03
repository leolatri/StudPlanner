import { StyleSheet } from "react-native";

const st = StyleSheet.create({
    inputBlock: {
        width: '100%',
        minHeight: '10%',

        justifyContent: 'center',
        gap: 10,

        position:'relative',
    },
    label: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        color: 'rgba(101, 101, 101, 1)',
        fontWeight: '400',
    },
    input: {
        width: "100%",
        // height: 100,
        // paddingBottom: ,

        backgroundColor: "rgba(38, 42, 53, 1)",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "rgba(101, 101, 101, 1)",
        padding: 12,
    }
});
export default st;