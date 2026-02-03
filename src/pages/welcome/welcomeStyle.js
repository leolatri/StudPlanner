import { StyleSheet } from "react-native";

const st = StyleSheet.create({
    welcome: {
        width: '100%',
        height: '100%',

        justifyContent: 'center',
        flexDirection: 'column',
        marginVertical: 10,

        color: 'wihte',
        fontSize: 15,
    },
    block: {
        width: '100%',
        height: '90%',

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    block__text: {
        minHeight: '50%',
        width: '100%',

        justifyContent: 'center',
    },
    
})

export default st;