import { FlatList, StyleSheet, View } from "react-native";
import SearchInput from "../../components/input/SearchInput";
import Button from "../../components/button/Button";
import BookCard from "../../components/cards/BookCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../../stores/StoreContext";
import { observer } from "mobx-react-lite";
import EmptyPage from "../empty/EmptyPage";

type Nav = NativeStackNavigationProp<RootStackParamList, "filterLibrary">;

const Library = observer(() => {
    const navigation = useNavigation<Nav>();
    const { libraryStore } = useStore();

    return (
        <View style={st.library}>
            <SearchInput query={libraryStore.searchQuery} onChange={(val) => libraryStore.setSearchQuery(val)} />
            {libraryStore.filteredBooks.length === 0 ?
                <EmptyPage
                    type="loupe"
                    text="Ничего не найдено. Введите название книги или автора"
                /> :
                <FlatList
                    style={{ flex: 1, alignSelf: 'stretch' }}
                    contentContainerStyle={st.library__list}
                    showsVerticalScrollIndicator={true}
                    indicatorStyle='white'
                    keyExtractor={(item) => item.id}
                    persistentScrollbar={true}
                    data={libraryStore.filteredBooks}
                    ListEmptyComponent={() => {
                        <EmptyPage type="book" text="Здесь пока пусто"/>
                    }}
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
            }

        </View >
    )
})

const st = StyleSheet.create({
    library: {
        flex: 1,

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
        paddingHorizontal: 20,

        flexGrow: 1,
        flexDirection: 'column',
        gap: 15,
    },
});

export default Library;