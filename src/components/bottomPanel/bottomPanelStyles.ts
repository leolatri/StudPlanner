import { StyleSheet } from "react-native";

const st = StyleSheet.create({
    panel: {
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
    },
    panel__arrow: {
        fontSize: 33,
        color: 'rgb(255, 255, 255)',
        textAlign: 'center',
    },
    panel__bubbles: {
        width: '45%',
        height: '100%',

        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',

    },
    bubble: {
        width: 20,
        height: 20,

        borderRadius: 100,
        backgroundColor: 'rgba(195, 195, 195, 1)',
    },
    active: {
        backgroundColor: 'rgb(255, 255, 255)',
    },
})

export default st;