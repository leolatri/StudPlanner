import { StyleSheet } from "react-native";


export const colors = {
    generalBlue: 'rgba(82, 152, 239, 1)',
    backgraund: 'rgba(25, 26, 31, 1)',
    textWhite: 'rgb(255, 255, 255)',
    gray: 'rgba(101, 101, 101, 1)',
    textArea: 'rgba(38, 42, 53, 1)',
    formBack: 'rgba(31, 34, 43, 1)',
    tabBack: 'rgba(31, 34, 43, 1)',
    borderForm: 'rgba(101, 101, 101, 1)',
}

export const generalStyles = StyleSheet.create({
    app: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.backgraund,

        justifyContent: 'center',
        alignSelf: 'center',
    },
    app__block: {
        width: '100%',
        height: '100%',
        // backgroundColor: colors.backgraund,

        // padding: 30,

        justifyContent: 'center',
        alignSelf: 'center',
    },
    bigScreen: {
        width: '40%',
        height: '100%',
        // backgroundColor: colors.backgraund,

        // padding: 30,

        justifyContent: 'center',
        alignSelf: 'center',
    },
    back: {
        backgroundColor: colors.backgraund,
    },
    title: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 25,
        color: colors.textWhite,
        fontWeight: '500',
    },
    text: {
        paddingTop: 25,
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: colors.textWhite,
        fontWeight: '300',
        lineHeight: 30,
    },
    usualText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: colors.textWhite,
        fontWeight: '300',
    },
});


