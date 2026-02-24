import { ScrollView, StyleSheet, Text, View } from "react-native";
import { subjectsTest } from "../../models/subjects/test";
import SubjectCard from "../../components/cards/SubjectCard";
import SearchInput from "../../components/input/SearchInput";

const Timetable = () => {
    return (
        <View style={st.timetable}>
            <SearchInput/>
            <ScrollView style={{ flex: 1, alignSelf: 'stretch' }} contentContainerStyle={st.timetable__list} showsVerticalScrollIndicator={false}>
                {subjectsTest.map((el) => (
                    <SubjectCard
                        id={el.id}
                        key={el.id}
                        type={el.type}
                        name={el.name}
                        room={el.room}
                        index={el.index}
                        professor={el.professor}
                        startTime={el.startTime}
                        endTime={el.endTime}
                        date={el.date}
                    />
                ))}
            </ScrollView>
        </View>

    )
};

const st = StyleSheet.create({
    timetable: {
        flex: 1,
        padding: 20,
        gap: 20,
    },
    timetable__list: {
        paddingBottom: 60,
        gap: 15,
    }
});

export default Timetable;