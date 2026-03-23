import { StyleSheet, Text, View } from "react-native"
import { colors, generalStyles } from "../../GeneralStyles"
import { FeedbackModel } from "../../models/types";

const Comment = ({isPersonal, autor, text}: FeedbackModel) => {
    return (
        <View style={st.comment}>
            <Text style={[generalStyles.title, {color: isPersonal ? 'rgb(101, 55, 128)' : colors.generalBlue, fontSize: 12}]}>{autor}</Text>
            <Text style={[generalStyles.title, {fontSize: 12}]}>{text}</Text>
        </View>
    );
};


// const Comments = ({comments}: CommentsProps ) => {
//     const commentsCount = comments.length;
//     return (
//         <View style={st.container}>
//             <Text style={[generalStyles.text, {fontWeight: '700'}]}>{`${commentsCount} отзывов`}</Text>
//             {comments.map((el) => (
//                 <Comment
//                     id={el.id}
//                     isPersonal={el.isPersonal}
//                     text={el.text}
//                     autor={el.autor}
//                     grade={el.grade}
//                 />
//             ))}
//         </View>
//     )
// };

const st = StyleSheet.create({
    comment: {
        width: '100%',
        minHeight: 50,
        padding: 10,
        gap: 10,

        backgroundColor: colors.formBack,
        borderRadius: 10,
    },
    container: {
        width: '100%',
        minHeight: 100,
        gap: 15,
    }

});

export default Comment;
