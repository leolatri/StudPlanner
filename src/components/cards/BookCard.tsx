import { Image, StyleSheet, Text, View } from "react-native";
import download from '../../imgs/download.png';
import { BookModel } from "../../models/types";
import pdf from '../../imgs/pdf.png';
import { colors } from "../../GeneralStyles";
import File from '../../../assets/pdf.svg';
import Dowload from '../../../assets/download.svg';

const BookCard = ({ name, autors }: BookModel) => {
    return (
        <View style={st.bookCard}>
            <File width={50} height={50} fill={colors.generalBlue}/>
            <View style={st.bookCard__textBlock}>
                <Text
                    style={[st.bookCard__text, {color: colors.textWhite, fontSize: 13}]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {name}
                </Text>
                <Text
                    style={st.bookCard__text}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {autors.join(' , ')}
                </Text>
            </View>
            <Dowload  width={25} height={25} stroke={colors.textWhite}/>
        </View>
    )
};

const st = StyleSheet.create({
    bookCard: {
        width: '100%',
        height: 90,

        padding: 15,

        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,

        backgroundColor: colors.formBack,
        borderRadius: 10,
        elevation: 7,
    },
    bookCard__textBlock: {
        width: '65%',
        minWidth: 0,
        gap: 10,
    },
    bookCard__text: {
        fontSize: 12,
        color: colors.gray,
        fontFamily: 'Montserrat-Regular',
        includeFontPadding: false,
    }
});

export default BookCard;

