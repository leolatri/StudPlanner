import { useCallback, useState } from "react";
import { observer } from 'mobx-react-lite';
import { colors, generalStyles } from "../../../GeneralStyles";
import Cross from '../../../../assets/cross.svg';
import Button from "../../../components/button/Button";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../../../stores/StoreContext";
import EmptyPage from "../../empty/EmptyPage";

type Nav = NativeStackNavigationProp<RootStackParamList, "filterTimetable">;

interface GroupProps {
    id: string;
    name: string;
    isActive: boolean;
    setActive: (val: string) => void;
    onRemove: (val: string) => void;
}

const GroupItem = ({ id, name, setActive, isActive, onRemove }: GroupProps) => {
    const handleRemovePress = (id: string) => {
        console.log(id);
        onRemove(id);
    }
    return (
        <TouchableOpacity
            onPress={() => setActive(id)}
            style={[st.groupItem, isActive && st["groupItem--active"]]}
        >
            <Text style={generalStyles.text}>{name}</Text>
            <TouchableOpacity
                onPress={() => handleRemovePress(id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Cross width={20} height={20} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const TimetableFilter = observer(() => {
    const { groupsStors } = useStore();

    const navigation = useNavigation<Nav>();

    const removeGroup = useCallback((id: string) => {
        if (groupsStors) groupsStors.toggleGroupSelection(id);
    }, [groupsStors]);

    const handleActivity = (id: string) => {
        groupsStors.setActiveGroup(id);
        console.log(groupsStors.selectedGroups);
    }

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={st.filter}>
            <Text style={[generalStyles.text, { fontSize: 12, alignSelf: 'flex-start' }]}>ГРУППЫ</Text>
            {groupsStors.selectedGroups.length > 0 ? groupsStors.selectedGroups.map((el) => (
                <GroupItem
                    id={el.id}
                    key={el.id}
                    name={el.name}
                    isActive={el.isActive}
                    setActive={handleActivity}
                    onRemove={removeGroup}
                />
            )) : 
                <EmptyPage type="file" text="Здесь пока пусто.   Добавьте группу"/>
            }
                   
            <Button
                label="Добавить группу"
                func={() => navigation.navigate('groupSearchPage')}
                style={st.filter__button}
            />

        </ScrollView>
    )
});

const st = StyleSheet.create({
    groupItem: {
        width: '100%',
        minHeight: 50,

        padding: 15,

        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: colors.formBack,
        borderRadius: 10,
    },
    "groupItem--active": {
        borderWidth: 1,
        borderColor: colors.textWhite,
    },
    groupItem__cross: {
        width: 15,
        height: 15,
    },
    filter: {
        flex: 1,
        padding: 20,

        alignItems: 'center',

        gap: 15,
    },
    filter__button: {
        width: 200,
        height: 50,

        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default TimetableFilter;