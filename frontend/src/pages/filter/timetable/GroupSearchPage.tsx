import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SearchInput from "../../../components/input/SearchInput";
import { colors, generalStyles } from "../../../GeneralStyles";
import { memo } from "react";
import { useStore } from "../../../stores/StoreContext";
import { observer } from "mobx-react-lite";

const GroupItem = ({ groupName }: { groupName: string }) => (
    <TouchableOpacity style={st.groupItem}>
        <Text style={generalStyles.text}>{groupName}</Text>
    </TouchableOpacity>
)

const GroupSearchPage = observer(() => {
    const { groupsStors }  = useStore();
    console.log(groupsStors);

    return (
        <View style={st.container}>
            <SearchInput />
            <FlatList
                data={groupsStors.groups}
                style={{ flex: 1 }}
                keyExtractor={(item) => item + "123"}
                renderItem={({ item }) => (
                    <GroupItem groupName={item.name} />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={st.container__list}
            />
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

export default memo(GroupSearchPage);