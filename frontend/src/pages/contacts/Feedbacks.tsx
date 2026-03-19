import { StyleSheet, View } from "react-native";
import FeedbackBlock from '../../components/comments/RatingBlock'
import { useStore } from "../../stores/StoreContext";
import { observer } from "mobx-react-lite";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";

type FeedbackRouteProp = RouteProp<RootStackParamList, 'contactFeedback'>;

const Feedbacks = observer(() => {
    const {contactsStore} = useStore();
    const route = useRoute<FeedbackRouteProp>();
    const idContact = route.params?.contactId  || '';
    const contactGrade = contactsStore.getContactGrade(idContact);
    const feedbackCount = contactsStore.getFeedbackCount(idContact);
    const feedbackIsLeaved = contactsStore.getFeedbacks(idContact).some((el) => el.isPersonal === true);

    return (
        <View style={st.container}>
            <FeedbackBlock
                middleGrade={contactGrade}
                feedbackCount={feedbackCount}
                feedbackIsLeaved={feedbackIsLeaved}
            />
        </View>
    )
});

const st = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 100,
    },
    container__block: {

    },  
});

export default Feedbacks;