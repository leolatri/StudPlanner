import { useState } from "react";
import { Image, ImageSourcePropType, Text, useWindowDimensions, View } from "react-native";
import BottomPanel from "../components/bottomPanel/BottomPanel";
import genStyle from '../GeneralStyles';
import book from '../imgs/books.png';
import boy from '../imgs/boy.png';
import rocket from '../imgs/rocket.png';
import timetable from '../imgs/timetable.png';
import st from "./welcomeStyle";



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
}

export default Welcome;