import { FlatList, StyleSheet, View } from "react-native";
import SubjectCard from "../../components/cards/SubjectCard";
import Calendar from "../../components/timetable/Calendar";
import { useStore } from "../../stores/StoreContext";

const Timetable = () => {
    const { timetableStore } = useStore();
    // console.log('log1:', timetableStore);
    return (
        <View style={st.timetable}>
            <FlatList
                style={{ flex: 1, alignSelf: 'stretch' }}
                contentContainerStyle={st.timetable__list}
                showsVerticalScrollIndicator={false}
                data={timetableStore.subjects}
                ListHeaderComponent={Calendar}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <SubjectCard
                        id={item.id}
                        type={item.type}
                        name={item.name}
                        room={item.room}
                        index={item.index}
                        professor={item.professor}
                        startTime={item.startTime}
                        endTime={item.endTime}
                        date={item.date}
                    />
                )}
            />
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