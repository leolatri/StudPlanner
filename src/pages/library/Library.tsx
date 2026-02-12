import { ScrollView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SearchInput from "../../components/input/SearchInput";
import Button from "../../components/button/Button";
import BookCard from "../../components/cards/BookCard";


const booksTest = [
    {
        name: "Теория управления часть 1",
        autor: 'Куравский В.Г.',
    },
    {
        name: "Математика 1 класс",
        autor: 'Лукин Ф.Г.',
    },
    {
        name: "Физика и естественные науки",
        autor: 'Семен Ф.Г.',
    },
    {
        name: "Психология на практике",
        autor: 'Угрант Ф.Г.',
    },
    {
        name: "Жизнедеятельность авторов Руси",
        autor: 'Петров Д.Г.',
    },
    {
        name: "Уроки по гриму",
        autor: 'Сидоров Д.Г.',
    },
]

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
                {booksTest.map((el, index) => (
                    <BookCard name={el.name} autor={el.autor} key={index} />
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