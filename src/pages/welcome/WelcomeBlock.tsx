import { useState } from "react";
import boy from '../../imgs/boy.png';
import book from '../../imgs/books.png';
import rocket from '../../imgs/rocket.png';
import genStyle from '../../GeneralStyles';
import timetable from '../../imgs/timetable.png';
import BottomPanel from "../../components/bottomPanel/BottomPanel";
import { Image, ImageSourcePropType, StyleSheet, Text, useWindowDimensions, View } from "react-native";


interface Props {
    img: ImageSourcePropType;
    title: string;
    text: string;
}

const blocks = [
    {
        index: 0,
        img: rocket,
        title: "Добро пожаловать!",
        text: "Это приложение разработано специально для студентов, чтобы сделать процесс обучения более простым и эффективным.",
    },
    {
        index: 1,
        img: timetable,
        title: "Смотри расписание!",
        text: "Следи за расписанием прямо в приложении! Это быстро, а главное -удобно",
    },
    {
        index: 2,
        img: book,
        title: "Все учебные материалы здесь!",
        text: "Больше не нужно поджидать библиотекаря или искать материалы в интернете! Ты можешь изучить все материалы в одном месте",
    },
    {
        index: 3,
        img: boy,
        title: "Не ищи способы общения с другими!",
        text: "Не нужно запоминать почты, номера и ники для связи! Все контакты преподавателей и одногруппников собраны в разделе Контакты",
    },
]

const Block = ({ img, title, text }: Props) => {
    const {width: screenWidth} = useWindowDimensions();
    return (
        <View style={st.block}>
            <Image
                style={{
                    width: screenWidth < 451 ? screenWidth * 0.5 : screenWidth * 0.2,
                    height: screenWidth < 451 ? screenWidth * 0.5 : screenWidth * 0.2,
                }}
                source={img}
            />
            <View style={st.block__text}>
                <Text style={genStyle.title}>{title}</Text>
                <Text style={genStyle.text}>{text}</Text>
            </View>
        </View>
    )
}

const Welcome = () => {
    const [position, setPosition] = useState(0);

    const Page = () => {
        const pos = position < 4 ? position : 0;
        return (
            <Block
                img={blocks[pos].img}
                title={blocks[pos].title}
                text={blocks[pos].text}
            />
        )
    }

    return (
        <View style={st.welcome}>
            <Page />
            <BottomPanel
                position={position}
                setPosition={setPosition}
            />
        </View>
    )
};

const st = StyleSheet.create({
    welcome: {
        width: '100%',
        height: '100%',

        padding: 25,

        justifyContent: 'center',
        flexDirection: 'column',
        marginVertical: 10,

        color: 'wihte',
        fontSize: 15,
    },
    block: {
        width: '100%',
        height: '80%',

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

export default Welcome;