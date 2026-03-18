import { FlatList, StyleSheet, View } from "react-native";
import SearchInput from "../../components/input/SearchInput";
import Button from "../../components/button/Button";
import BookCard from "../../components/cards/BookCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../../stores/StoreContext";

type Nav = NativeStackNavigationProp<RootStackParamList, "filterLibrary">;

const Library = () => {
    const navigation = useNavigation<Nav>();
    const {libraryStore} = useStore();

    return (
        <View style={st.library}>
            <SearchInput query={libraryStore.searchQuery} onChange={libraryStore.setSearchQuery}/>
            <FlatList
                style={{ flex: 1, alignSelf: 'stretch' }}
                contentContainerStyle={st.library__list}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                data={libraryStore.filteredBooks}
                // ListEmptyComponent={}
                ListHeaderComponent={
                    <Button
                        label="Добавить материал"
                        func={() => navigation.navigate('addMaterial')}
                        style={st.library__button}
                    />
                }
                renderItem={({ item }) => (
                    <BookCard
                        id={item.id}
                        name={item.name}
                        autors={item.autors}
                        isPersonal={item.isPersonal}
                    />
                )}
            />
        </View >
    )
};

const st = StyleSheet.create({
    library: {
        flex: 1,
        padding: 20,

        alignItems: 'center',
        gap: 20,
    },
    library__button: {
        width: '90%',

        textAlign: 'center',
        alignSelf: 'center',
    },
    library__list: {
        paddingBottom: 70,

        flexGrow: 1,
        flexDirection: 'column',
        gap: 15,
    },
});

export default Library;