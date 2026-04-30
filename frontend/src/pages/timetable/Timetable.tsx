import React, { useState, useMemo } from 'react';
import { FlatList, StyleSheet, View } from "react-native";
import SubjectCard from "../../components/cards/SubjectCard";
import Calendar from "../../components/timetable/Calendar";
import { useStore } from "../../stores/StoreContext";
import { toJS } from 'mobx';
import EmptyPage from '../empty/EmptyPage';

const Timetable = () => {
    const { timetableStore, groupsStors } = useStore();
    const today = new Date()
    const [selectedDate, setSelectedDate] = useState<Date | null>(today);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const normalizeTimestamp = (timestamp: number): number => {
        return timestamp < 1000000000000 ? timestamp * 1000 : timestamp;
    };

    const filteredSubjects = useMemo(() => {
        let subjects = toJS(timetableStore.subjects);

        if (selectedDate) {
            const startTimestamp = new Date(selectedDate).setHours(0, 0, 0, 0);
            const endTimestamp = new Date(selectedDate).setHours(23, 59, 59, 999);

            subjects = subjects.filter(subject => {
                const normalized = normalizeTimestamp(subject.timeAndDate);
                return normalized >= startTimestamp && normalized <= endTimestamp;
            });
        }

        const activeGroup = groupsStors.selectedGroups.find(g => g.isActive === true);
        if (activeGroup) {
            const activeGroupName = activeGroup.name.toLowerCase().trim();
            subjects = subjects.filter(subject => {
                if (!subject.groups || subject.groups.length === 0) return false;
                return subject.groups.some(groupName =>
                    groupName.toLowerCase().trim() === activeGroupName
                );
            });
        }

        return subjects;
    }, [timetableStore.subjects, selectedDate, groupsStors.selectedGroups]);

    return (
        <View style={st.timetable}>
            <FlatList
                style={{ flex: 1, alignSelf: 'stretch' }}
                contentContainerStyle={st.timetable__list}
                showsVerticalScrollIndicator={false}
                data={filteredSubjects}
                ListHeaderComponent={
                    <Calendar onDateSelect={handleDateSelect} />
                }
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <EmptyPage type='' text='Сегодня, похоже, выходной :)' top={70}/>
                }
                renderItem={({ item }) => (
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
                        groups={item.groups}
                        timeAndDate={item.timeAndDate}
                    />
                )}
            />
        </View>
    );
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
    },
});

export default Timetable;

