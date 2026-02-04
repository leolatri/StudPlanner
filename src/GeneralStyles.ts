import { StyleSheet } from "react-native";

const ganiralStyles = StyleSheet.create({
    app: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(25, 26, 31, 1)',

        justifyContent: 'center',
        alignSelf: 'center',
    },
    app__block: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(25, 26, 31, 1)',

        // padding: 30,

        justifyContent: 'center',
        alignSelf: 'center',
    },
    bigScreen: {
        width: '40%',
        height: '100%',
        backgroundColor: 'rgba(25, 26, 31, 1)',

        // padding: 30,

        justifyContent: 'center',
        alignSelf: 'center',
    },
    back: {
        backgroundColor: 'rgba(25, 26, 31, 1)',
    },
    title: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 25,
        color: 'rgb(255, 255, 255)',
        fontWeight: '500',
    },
    text: {
        paddingTop: 25,
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: 'rgb(255, 255, 255)',
        fontWeight: '300',
        lineHeight: 30,
    },
    usualText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: 'rgb(255, 255, 255)',
        fontWeight: '300',
    },
});


export default ganiralStyles;