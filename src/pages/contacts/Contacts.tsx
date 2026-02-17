import { ScrollView, StyleSheet, Text, View } from "react-native";
import SearchInput from "../../components/input/SearchInput";
import { contacts } from "../../models/contacts/test";
import ContactCard from "../../components/cards/ContactCard";

const Contacts = () => {
    return (
        <View style={st.contacts}>
            <SearchInput/>
            <ScrollView style={{ flex: 1, alignSelf: 'stretch' }} contentContainerStyle={st.contacts_list} showsVerticalScrollIndicator={false}>
                {contacts.map((el) => (
                    <ContactCard
                        key={el.id}
                        id={el.id}
                        fio={el.fio}
                        email={el.email}
                        uniSubjects={el.uniSubjects}
                        img={el.img}
                    />
                ))}
            </ScrollView>
        </View>
    )
};

const st = StyleSheet.create({
    contacts: {
        flex: 1,
        padding: 20,
        gap: 20,
    },
    contacts_list: {
        overflow: 'scroll',

        paddingTop: 20,
        paddingBottom: 80,

        gap: 15,
    },
});

export default Contacts;