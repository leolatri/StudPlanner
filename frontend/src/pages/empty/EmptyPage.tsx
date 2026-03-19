import { StyleSheet, Text, View } from "react-native";
import Loupe from '../../../assets/loupe.svg';
import Folder from '../../../assets/folder.svg';
import { colors } from "../../GeneralStyles";

interface EmptyProps {
    type: string;
    text: string;
}

const EmptyPage = ({ type, text }: EmptyProps) => {
    return (
        <View style={st.container}>
            {type === 'loupe' ? <Loupe width={60} height={60} fill={colors.gray}/> : <Folder width={80} height={80} stroke={colors.gray} />}
            <Text style={st.container__text}>{text}</Text>
        </View>
    )
};

const st = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
    },
    container__text: {
        width: 200,
        textAlign: 'center',

        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: colors.gray,
        fontWeight: '500',
        lineHeight: 20,
    }
});

export default EmptyPage;