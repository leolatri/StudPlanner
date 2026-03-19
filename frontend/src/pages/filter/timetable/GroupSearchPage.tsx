import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SearchInput from "../../../components/input/SearchInput";
import { colors, generalStyles } from "../../../GeneralStyles";
import { useStore } from "../../../stores/StoreContext";
import { observer } from "mobx-react-lite";
import EmptyPage from "../../empty/EmptyPage";

interface Prop {
    id: string;
    groupName: string;
    addGroup: (id: string) => void;
}

const GroupItem = ({ id, groupName, addGroup }: Prop) => (
    <TouchableOpacity style={st.groupItem} onPress={() => addGroup(id)}>
        <Text style={generalStyles.text}>{groupName}</Text>
    </TouchableOpacity>
)

const GroupSearchPage = observer(() => {
    const { groupsStors } = useStore();
    const groups = groupsStors.filteredGroups;

    const addGroup = (id: string) => {
        groupsStors.toggleGroupSelection(id);
        console.log(groups);
    }

    return (
        <View style={st.container}>
            <SearchInput query={groupsStors.searchQuery} onChange={(val) => groupsStors.setSearchQuery(val)} />
            {groupsStors.filteredGroups.length === 0 ?
                <EmptyPage
                    type="loupe"
                    text="Ничего не найдено. Введите название группы"
                /> :
                <FlatList
                    data={groups}
                    style={{ flex: 1 }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <GroupItem groupName={item.name} id={item.id} addGroup={addGroup} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={st.container__list}
                />
            }

        </View>
    )
});

const st = StyleSheet.create({
    groupItem: {
        width: '100%',
        padding: 15,

        backgroundColor: colors.formBack,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        padding: 20,
        gap: 20,
    },
    container__list: {
        paddingBottom: 70,

        flexGrow: 1,
        flexDirection: 'column',
        gap: 15,
    }
});

export default GroupSearchPage;