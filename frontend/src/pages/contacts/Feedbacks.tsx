import { FlatList, StyleSheet, View } from "react-native";
import FeedbackBlock from '../../components/feedbacks/RatingBlock'
import { useStore } from "../../stores/StoreContext";
import { observer } from "mobx-react-lite";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";
import Comment from "../../components/feedbacks/Comments";

type FeedbackRouteProp = RouteProp<RootStackParamList, 'contactFeedback'>;

const Feedbacks = observer(() => {
    const { contactsStore } = useStore();
    const route = useRoute<FeedbackRouteProp>();
    const idContact = route.params?.contactId || '';
    const contact = contactsStore.getContact(idContact);

    // const feedbacks = contactsStore.getFeedbacks(idContact);
    const contactGrade = contactsStore.getContactGrade(idContact);
    const feedbackCount = contact?.feedbacks.length || 0;
    const feedbackIsLeaved = contact?.feedbackIsLeaved || false;
    const setFeedbackStatus = () => contactsStore.setFeedbackStatus(idContact);

    return (
        <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={st.container}
            showsVerticalScrollIndicator={true}
            data={contact?.feedbacks}
            ListHeaderComponent={
                <FeedbackBlock
                    middleGrade={contactGrade}
                    feedbackCount={feedbackCount}
                    feedbackIsLeaved={feedbackIsLeaved}
                    setFeedbackStatus={setFeedbackStatus}
                    subjects={contact?.uniSubjects || []}
                />
            }
            keyExtractor={(el) => el.id}
            renderItem={({item}) => (
                <Comment
                    id={item.id}
                    isPersonal={item.isPersonal}
                    autor={item.autor}
                    grade={item.grade}
                    text={item.text}
                />
            )}
        />

    )
});

const st = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 100,

        padding: 20,
        paddingBottom: 40,
        gap: 15
    },
    container__block: {

    },
});

export default Feedbacks;