import { useState } from "react";
import { colors, generalStyles } from "../../../GeneralStyles";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";


interface GroupProps {
    id: number;
    label: string;
    isActive: boolean;
    setActive: (val: number) => void;
}

const Item = ({ id, label, setActive, isActive }: GroupProps) => {
    return (
        <TouchableOpacity
            onPress={() => setActive(id)}
            style={[st.groupItem, isActive && st["groupItem--active"]]}
        >
            <Text style={generalStyles.text}>{label}</Text>
        </TouchableOpacity>
    );
};

const LibraryFilter = () => {
    const [activeGroupIndex, setActive] = useState<number | null>(null);
    const filterItems = ['Все', 'Добавленные мной', 'Библиотека университета'];

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={st.filter}>
            <Text style={[generalStyles.text, { fontSize: 12, alignSelf: 'flex-start' }]}>МАТЕРИАЛЫ</Text>
            {filterItems.map((el, index) => (
                <Item
                    id={index}
                    key={index}
                    label={el}
                    isActive={activeGroupIndex === index}
                    setActive={setActive}
                />
            ))}

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
    filter: {
        flex: 1,
        padding: 20,

        alignItems: 'center',

        gap: 15,
    },

})

export default LibraryFilter;