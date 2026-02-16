import { ScrollView, StyleSheet, Text, View } from "react-native";
import SearchInput from "../../components/input/SearchInput";
import Button from "../../components/button/Button";
import BookCard from "../../components/cards/BookCard";
import { Books } from "../../models/library/test";

const Library = () => {
    return (
        <View style={st.library}>
            <SearchInput />
            <ScrollView style={{ flex: 1, alignSelf: 'stretch' }} contentContainerStyle={st.library__list} showsVerticalScrollIndicator={false}>
                <Button
                    label="Добавить материал"
                    func={() => console.log('add material')}
                    style={st.library__button}
                />
                {Books.map((el, index) => (
                    <BookCard name={el.name} autors={el.autors} key={index} />
                ))}
            </ScrollView>
        </View>
    )
};

const st = StyleSheet.create({
    library: {
        flex: 1,
        padding: 20,

        alignItems: 'center',
        gap: 25,
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