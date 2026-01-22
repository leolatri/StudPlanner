import { StyleSheet } from "react-native";

const st = StyleSheet.create({
    panel: {
        width: '100%',

        paddingHorizontal: '10%',
        paddingBottom: '10%',

        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
    },
    panel__bubbles: {
        width: '35%',
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
    // skip: {
    //     fontFamily: 'Montserrat-Regular',
    //     fontSize: 15,
    //     color: 'rgb(255, 255, 255)',
    //     fontWeight: '300',
    // }
})

export default st;