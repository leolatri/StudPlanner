import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import sub from '../../imgs/books.png';
import email from '../../imgs/email.png';

interface ContactProps {
    id: string;
    img?: ImageSourcePropType;
    fio: string;
    email: string;
    uniSubjects: string[];
}

const subjects = ({arr}: {arr: string[]}) => {
    const count = arr.length - 2;
    const sortArr = arr.sort((a, b) => a.length - b.length);

    return (
        <View>
            <Image source={sub}/>
            <View>
                <Text>{sortArr[0]}</Text>
                <Text>{sortArr[1]}</Text>
                <Text>{`+ ${count}`}</Text>
            </View>
        </View>
    )
}

const BookCard = ({ id, img, fio, email, uniSubjects }: ContactProps) => {
    return (
        <View style={st.contactCard}>
            <Text>{fio}</Text>
            <View>
                <Image source={img}/>
            </View>
        </View>
    )
};

const st = StyleSheet.create({
    contactCard: {
        width: '100%',
        minHeight: 90,
    }
});

export default BookCard;

