import { Image, StyleSheet, Text, View } from "react-native";
import download from '../../imgs/download.png';
import pdf from '../../imgs/pdf.png';
import genStyle from '../../GeneralStyles';

interface BookProps {
    name: string;
    autors: string[];
}

const BookCard = ({ name, autors }: BookProps) => {
    return (
        <View style={st.bookCard}>
            <Image source={pdf} style={{ width: 50, height: 50 }} />
            <View style={st.bookCard__textBlock}>
                <Text
                    style={[st.bookCard__text, {color: 'rgb(255,255,255)', fontSize: 13}]}
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
            <Image source={download} style={{ width: 25, height: 25 }} />
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

        backgroundColor: 'rgba(31, 34, 43, 1)',
        borderRadius: 10,
    },
    bookCard__textBlock: {
        width: '65%',
        minWidth: 0,
        gap: 10,
    },
    bookCard__text: {
        fontSize: 12,
        color: 'rgba(101, 101, 101, 1)',
        fontFamily: 'Montserrat-Regular',
        includeFontPadding: false,
    }
});

export default BookCard;

