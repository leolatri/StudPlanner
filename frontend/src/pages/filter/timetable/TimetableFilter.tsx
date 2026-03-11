import { memo, useCallback, useEffect, useState } from "react";
import { colors, generalStyles } from "../../../GeneralStyles";
import Cross from '../../../../assets/cross.svg';
import Button from "../../../components/button/Button";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";

type Nav = NativeStackNavigationProp<RootStackParamList, "filterTimetable">;

interface GroupProps {
    id: number;
    name: string;
    isActive: boolean;
    setActive: (val: number) => void;
    onRemove: (val: number) => void;
}

const GroupItem = ({ id, name, setActive, isActive, onRemove }: GroupProps) => {
    const handleRemovePress  = (id: number) => {
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

const TimetableFilter = ({selectedGroups}: {selectedGroups: string[]}) => {
    const [activeGroupIndex, setActive] = useState<number | null>(null);
    const [groups, setGroups] = useState<string[]>(selectedGroups);
    const navigation = useNavigation<Nav>();


    const removeGroup = useCallback((index: number) => {
        setGroups((prev: string[]) => {
            const newGroups = prev.filter((_, i) => i !== index);
            if (activeGroupIndex !== null) {
                if (activeGroupIndex === index) {
                    setActive(null);
                } else if (activeGroupIndex > index) {
                    setActive(activeGroupIndex - 1);
                }
            }
            return newGroups;
        });
    }, [activeGroupIndex]);

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={st.filter}>
            <Text style={[generalStyles.text, { fontSize: 12, alignSelf: 'flex-start' }]}>ГРУППЫ</Text>
            {groups.map((el, index) => (
                <GroupItem
                    id={index}
                    key={index}
                    name={el}
                    isActive={activeGroupIndex === index}
                    setActive={setActive}
                    onRemove={removeGroup}
                />
            ))}
            <Button
                label="Добавить группу"
                func={() => navigation.navigate('groupSearchPage')}
                style={st.filter__button}
            />

        </ScrollView>
    )
};

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

export default memo(TimetableFilter);