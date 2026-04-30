import { DimensionValue, StyleSheet, Text, View, ViewStyle } from "react-native";
import Loupe from '../../../assets/loupe.svg';
import Folder from '../../../assets/folder.svg';
import FileEmpty from '../../../assets/fileEmpty.svg';
import { colors } from "../../GeneralStyles";
import Confetti from '../../../assets/confetti.svg';

interface EmptyProps {
    type: string;
    text: string;
    top?: DimensionValue;
}

const EmptyPage = ({ type, text, top }: EmptyProps) => {
    return (
        <View style={[st.container,  top !== undefined && { marginTop: top }]}>
            {type === 'loupe' ? <Loupe width={60} height={60} fill={colors.gray}/>
            : (type === 'file' ? <FileEmpty width={80} height={80} fill={colors.gray} />
                : <Confetti width={80} height={80} fill={colors.gray}/>
            )}
            <Text style={st.container__text}>{text}</Text>
        </View>
    )
};

const st = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
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