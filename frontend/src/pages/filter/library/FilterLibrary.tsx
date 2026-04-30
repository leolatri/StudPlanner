import { colors, generalStyles } from "../../../GeneralStyles";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FilterMap, FilterValue } from "../../../models/types";
import { useStore } from "../../../stores/StoreContext";
import { useState } from "react";


interface Props {
    id: FilterValue;
    label: string;
    isActive: boolean;
    setActive: (val: FilterValue) => void;
}

const Item = ({ id, label, setActive, isActive }: Props) => {
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
    const { libraryStore } = useStore();
    const [activeFilter, setActiveFilter] = useState<FilterValue>(libraryStore.filter);

    const filterItems = Object.entries(FilterMap).map(([value, label]) => ({
        value: Number(value) as FilterValue,
        label,
    }));

    const handleFilter = (value: FilterValue) => {
        console.log(libraryStore.filter);
        setActiveFilter(value);
        libraryStore.setFilter(value);
    };

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={st.filter}>
            <Text style={[generalStyles.text, { fontSize: 12, alignSelf: 'flex-start' }]}>МАТЕРИАЛЫ</Text>
            {filterItems.map((el, index) => (
                <Item
                    id={el.value}
                    key={`${index}+${el}`}
                    label={el.label}
                    isActive={el.value === activeFilter}
                    setActive={handleFilter}
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