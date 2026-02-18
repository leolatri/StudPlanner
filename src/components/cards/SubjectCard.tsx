import { StyleSheet, Text, View } from "react-native";
import { SubjectModel } from "../../models/types";

const SubjectCard = ({
    id, type, name, room, index, duration, professor, startTime, endTime, date, 
}: SubjectModel) => {
    <View style={st.subjectCard}>
        <View style={st.subjectCard__block}>
            <View style={st.subjectCard__header}>
                <Text>{index + 1}</Text> // ?
                <Text>{type}</Text>
                <Text></Text>
            </View>
            <Text>{name}</Text>
        </View>
    </View>
}

const st = StyleSheet.create({
    subjectCard: {

    },
    subjectCard__header: {

    },
    subjectCard__block: {

    },
    subjectCard__info: {

    },
    fio: {
    },
    room: {

    }
})