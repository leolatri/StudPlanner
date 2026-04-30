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
import ConfirmDialog from '../modalView/ConfirmDialog';

type Rating = 1 | 2 | 3 | 4 | 5;

interface Props {
    setFeedbackStatus: (grade: number, text: string) => Promise<void>;
    contactId: string;
}

interface FeedbakProps {
    feedbackIsLeaved: boolean;
    middleGrade: number;
    feedbackCount: number;
    setFeedbackStatus: (grade: number, text: string) => Promise<void>;
    subjects: string[];
    contactId: string;
}

const countImgs = [one, two, three, four, five];

const OverallRating = ({ middleGrade, feedbackCount }: { middleGrade: number; feedbackCount: number }) => {
    const picture = middleGrade > 0 ? countImgs[Math.floor(middleGrade) - 1] : undefined;
    return (
        <>
            {feedbackCount > 0 ? (
                <View style={st.overallFeedback}>
                    <Text style={[generalStyles.title, { fontSize: 70 }]}>{middleGrade}</Text>
                    <View style={st.overallFeedback__block}>
                        <Image source={picture} style={st.overallFeedback__img} />
                        <Text style={[generalStyles.text, { fontSize: 10 }]}>{`Всего ${feedbackCount} отзывов`}</Text>
                    </View>
                </View>
            ) : (
                <Text style={st.empty}>Пока отзывов о преподавателе нет 🙃 Станьте первым!</Text>
            )}
        </>
    );
};

const FeedbackField = ({ setFeedbackStatus }: Props) => {
    const [selectedRating, setSelectedRating] = useState<Rating | null>(null);
    const [activeImg, setActive] = useState<number | null>(null);
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(false);
    const [showField, setShow] = useState(false);
    const [dialog, setDialog] = useState<{
        title: string;
        message?: string;
        buttons: { text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive' }[];
    } | null>(null);

    const closeDialog = () => setDialog(null);
    const showAlert = (title: string, message?: string) =>
        setDialog({ title, message, buttons: [{ text: 'ОК', onPress: closeDialog }] });

    const saveComment = async () => {
        if (!selectedRating) {
            showAlert('Ошибка', 'Выберите оценку');
            return;
        }
        if (!commentText.trim()) {
            showAlert('Ошибка', 'Напишите текст отзыва');
            return;
        }
        setLoading(true);
        try {
            await setFeedbackStatus(selectedRating, commentText.trim());
            setShow(false);
        } catch (error) {
            console.log(error);
            showAlert('Ошибка', 'Не удалось отправить отзыв');
        } finally {
            setLoading(false);
        }
    };

    const handlePictureSet = (index: number) => {
        setSelectedRating((index + 1) as Rating);
        setActive(index);
    };

    return (
        <>
            {showField ? (
                <View style={st.field}>
                    <Text style={[generalStyles.text, { fontSize: 15, fontWeight: '700' }]}>Оцените и напишите отзыв</Text>
                    <View style={st.field__block}>
                        {countImgs.map((el, index) => (
                            <TouchableOpacity
                                key={`${index}+${el}`}
                                style={[st.field__img, index === activeImg ? st['field__img--active'] : null]}
                                onPress={() => handlePictureSet(index)}
                            >
                                <Image source={el} style={{ width: 40, height: 40 }} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Input placeholder="Напишите плюсы и минусы" style={st.field__textArea} type="textarea" setValue={setCommentText} />
                    <Button label={loading ? 'Отправка...' : 'Сохранить'} style={st.button} func={saveComment} />
                </View>
            ) : (
                <View style={st.field}>
                    <Button label="Оставить отзыв" style={st.button} func={() => setShow(true)} />
                </View>
            )}
            {dialog && (
                <ConfirmDialog
                    visible
                    title={dialog.title}
                    message={dialog.message}
                    buttons={dialog.buttons}
                    onDismiss={closeDialog}
                />
            )}
        </>
    );
};

const Subjects = ({ subjects }: { subjects: string[] }) => {
    const sortArr = [...subjects].sort((a, b) => b.length - a.length);
    return (
        <View style={st.subjects}>
            {sortArr.map((el, index) => (
                <Text style={st.subjects__text} key={`${index}+${el}`}>{el}</Text>
            ))}
        </View>
    );
};

const FeedbackBlock = ({
    feedbackCount,
    middleGrade,
    feedbackIsLeaved,
    setFeedbackStatus,
    subjects,
    contactId,
}: FeedbakProps) => {
    return (
        <View style={st.container}>
            <View style={st.container__block}>
                <OverallRating middleGrade={middleGrade} feedbackCount={feedbackCount} />
                {!feedbackIsLeaved && <FeedbackField setFeedbackStatus={setFeedbackStatus} contactId={contactId} />}
            </View>
            <Subjects subjects={subjects} />
            <Text style={generalStyles.text}>{`${feedbackCount} отзывов`}</Text>
        </View>
    );
};

const st = StyleSheet.create({
    overallFeedback: {
        width: '100%',
        minHeight: 40,
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 0.5,
    },
    overallFeedback__block: {
        width: '50%',
        height: 'auto',
        gap: 5,
        justifyContent: 'flex-end',
    },
    overallFeedback__img: {
        width: 45,
        height: 45,
    },
    field: {
        width: '100%',
        minHeight: 100,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
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
        width: 150,
    },
    container: {
        width: '100%',
        minHeight: 100,
        gap: 20,
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
        paddingHorizontal: 11,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: colors.darkBlue,
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: colors.textWhite,
        alignSelf: 'flex-start',
    },
    empty: {
        padding: 30,
        paddingBottom: 10,
        lineHeight: 30,
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        textAlign: 'center',
        color: colors.textWhite,
    },
});

export default FeedbackBlock;
