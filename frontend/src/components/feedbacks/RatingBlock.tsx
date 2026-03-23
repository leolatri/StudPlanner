import one from '../../../assets/rating/one.png';
import two from '../../../assets/rating/two.png';
import three from '../../../assets/rating/three.png';
import four from '../../../assets/rating/four.png';
import five from '../../../assets/rating/five.png';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, generalStyles } from '../../GeneralStyles';
import { useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import { SubjectModel } from '../../models/types';

type Rating = 1 | 2 | 3 | 4 | 5;


interface Props {
    setFeedbackStatus: () => void;
}

interface FeedbakProps {
    feedbackIsLeaved: boolean;
    middleGrade: number,
    feedbackCount: number,
    setFeedbackStatus: () => void;
    subjects: string[];
}

interface RatingProps {
    middleGrade: number,
    feedbackCount: number,
}

const countImgs = [one, two, three, four, five];

const OverallRating = ({ middleGrade, feedbackCount }: RatingProps) => {
    const picture = middleGrade > 0 ? countImgs[Math.floor(middleGrade) - 1 as Rating] : undefined;

    return (
        <View style={st.overallFeedback}>
            <Text style={[generalStyles.title, { fontSize: 70 }]}>{middleGrade}</Text>
            <View style={st.overallFeedback__block}>
                <Image source={picture} style={st.overallFeedback__img} />
                <Text style={[generalStyles.text, { fontSize: 10 }]}>{`Всего ${feedbackCount} отзывов`}</Text>
            </View>
        </View>
    )
};


const FeedbackField = ({ setFeedbackStatus }: Props) => {
    const [activeImg, setActive] = useState<number | null>(null);
    const [showField, setShow] = useState(false);

    const saveComment = () => {
        console.log('save comment');
        setFeedbackStatus();
    }

    return showField ? (
        <View style={st.field}>
            <Text style={[generalStyles.text, { fontSize: 15, fontWeight: '700' }]}>
                Оцените и напишите отзыв
            </Text>
            <View style={st.field__block}>
                {countImgs.map((el, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            st.field__img,
                            index === activeImg ? st['field__img--active'] : null
                        ]}
                        onPress={() => setActive(index)}
                    >
                        <Image source={el} style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                ))}
            </View>
            <Input
                placeholder="Напишите плюсы и минусы"
                style={st.field__textArea}
                type="textarea"
            />
            <Button label="Сохранить" style={st.button} func={saveComment} />
        </View>
    ) : (
        <View style={st.field}>
            <Button label="Оставить отзыв" style={st.button} func={() => setShow(true)} />
        </View>
    );
};

const Subjects = ({ subjects }: { subjects: string[] }) => {
    const sortArr = [...subjects].sort((a, b) => b.length - a.length);
    return (
        <View style={st.subjects}>
            {sortArr.map((el) => (
                <Text style={st.subjects__text} key={el}>{el}</Text>
            ))}
        </View>
    )
}

const FeedbackBlock = ({
    feedbackCount, middleGrade, feedbackIsLeaved, setFeedbackStatus, subjects,
}: FeedbakProps) => {
    return (
        <View style={st.container}>
            <View style={st.container__block}>
                <OverallRating middleGrade={middleGrade} feedbackCount={feedbackCount} />
                {!feedbackIsLeaved && <FeedbackField setFeedbackStatus={setFeedbackStatus} />}
            </View>
            <Subjects subjects={subjects} />
            <Text style={generalStyles.text}>{`${feedbackCount} отзывов`}</Text>
        </View>

    )
}

const st = StyleSheet.create({
    overallFeedback: {
        width: '100%',
        minHeight: 40,

        padding: 20,

        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: 30,
        justifyContent: 'center',
        alignItems: 'center',

        borderBottomWidth: 0.5,
    },
    overallFeedback__block: {
        width: '70%',
        height: 'auto',
        gap: 0,
    },
    overallFeedback__img: {
        width: 45,
        height: 45
    },
    field: {
        width: '100%',
        minHeight: 100,

        padding: 20,

        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    field__block: {
        width: '100%',
        height: 'auto',

        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,

        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    field__img: {
        width: 50,
        height: 50,

        justifyContent: 'center',
        alignItems: 'center',
    },
    'field__img--active': {
        backgroundColor: 'rgba(121, 121, 121, 0.33)',
        borderRadius: 100,
    },
    field__textArea: {
        minHeight: 100,
    },
    button: {
        width: 150
    },
    container: {
        width: '100%',
        minHeight: 100,
        gap: 20
    },
    container__block: {
        width: '100%',
        minHeight: 100,

        backgroundColor: colors.formBack,
        borderRadius: 10,
    },
    subjects: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    subjects__text: {
        paddingHorizontal: 10,
        paddingVertical: 5,

        borderRadius: 8,
        backgroundColor: colors.darkBlue,

        fontFamily: "Montserrat-Regular",
        fontSize: 11,
        color: colors.textWhite,
        alignSelf: "flex-start",
    }
});

export default FeedbackBlock;