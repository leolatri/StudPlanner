import one from '../../../assets/rating/one.png';
import two from '../../../assets/rating/two.png';
import three from '../../../assets/rating/three.png';
import four from '../../../assets/rating/four.png';
import five from '../../../assets/rating/five.png';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, generalStyles } from '../../GeneralStyles';
import { useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';

type Rating = 1 | 2 | 3 | 4 | 5;


interface Props {
    feedbackIsLeaved: boolean;
}

interface FeedbakProps {
    feedbackIsLeaved: boolean;
    middleGrade: number,
    feedbackCount: number,
}

interface RatingProps {
    middleGrade: number,
    feedbackCount: number,
}

const countImgs = [one, two, three, four, five];

const OverallRating = ({middleGrade, feedbackCount}: RatingProps) => {
    const picture = middleGrade > 0 ? countImgs[Math.floor(middleGrade) - 1 as Rating] : undefined;

    return (
        <View style={st.container}>
            <Text style={generalStyles.text}>{middleGrade}</Text>
            <View style={st.container__block}>
                <Image source={picture}/>
                <Text  style={[generalStyles.text, {fontSize: 8}]}>{`Всего ${feedbackCount} отзывов`}</Text>
            </View>
        </View>
    )
};


const FeedbackField = ({feedbackIsLeaved}: Props) => {
    const [activeImg, setActive] = useState<number | null>(null);
    const saveComment = () => {
        console.log('save comment');
    }

    return (
        <View>
            <Text>Оцените преподавателя и напишите отзыв</Text>
            <View>
                {countImgs.map((el, index) => (
                    <Image source={el} style={[st.img, index === activeImg ? st['img--active'] : null]} onProgress={() => setActive(index)}/>
                ))}
            </View>
            <Input placeholder='Напишите плюсы и минусы'/>
            <Button
                label='Сохранить'
                style={st.button}
                // textStyle={generalStyles.text}
                func={saveComment}
            />
        </View>
    )
};

const FeedbackBlock = ({feedbackCount, middleGrade, feedbackIsLeaved} :FeedbakProps) => {
    return (
        <View>
            <OverallRating middleGrade={middleGrade} feedbackCount={feedbackCount}/>
            <FeedbackField feedbackIsLeaved={feedbackIsLeaved}/>
        </View>
    )
}

const st = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 40,

        padding: 20,

        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',

        borderBottomWidth: 1,
        borderBottomColor: colors.backgraund,
    },
    container__block: {
        width: '90%',
        height: 'auto',
        gap: 5,
    },
    img: {
        width: 15,
        height: 15
    },
    'img--active': {
        backgroundColor: colors.gray,
        borderRadius: 100,
    },
    button: {

    }
});

export default FeedbackBlock;