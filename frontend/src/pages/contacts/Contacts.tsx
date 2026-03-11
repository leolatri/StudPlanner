import { FlatList, StyleSheet, View } from "react-native";
import SearchInput from "../../components/input/SearchInput";
import { contacts } from "../../models/contacts/test";
import ContactCard from "../../components/cards/ContactCard";

const Contacts = () => {
    return (
        <View style={st.contacts}>
            <SearchInput />
            <FlatList
                style={{ flex: 1, alignSelf: 'stretch' }}
                contentContainerStyle={st.contacts_list}
                showsVerticalScrollIndicator={false}
                // ListEmptyComponent={}
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ContactCard
                        id={item.id}
                        fio={item.fio}
                        email={item.email}
                        uniSubjects={item.uniSubjects}
                        img={item.img}
                    />
                )}
            />

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
        paddingTop: 20,
        paddingBottom: 80,

        gap: 15,
    },
});

export default Contacts;