import { FlatList, StyleSheet, View } from "react-native";
import SearchInput from "../../components/input/SearchInput";
import ContactCard from "../../components/cards/ContactCard";
import { useStore } from "../../stores/StoreContext";
import { observer } from "mobx-react-lite";
import EmptyPage from "../empty/EmptyPage";

const Contacts = observer(() => {
    const { contactsStore } = useStore();
    return (
        <View style={st.contacts}>
            <SearchInput query={contactsStore.searchQuery} onChange={(val) => contactsStore.setSearchQuery(val)} />
            {contactsStore.filteredContacts.length === 0 ?
                <EmptyPage
                    type="loupe"
                    text="Ничего не найдено. Введите ФИО преподавателя"
                /> :
                <FlatList
                    style={{ flex: 1, alignSelf: 'stretch' }}
                    contentContainerStyle={st.contacts_list}
                    showsVerticalScrollIndicator={false}
                    // ListEmptyComponent={}
                    data={contactsStore.filteredContacts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ContactCard
                            id={item.id}
                            fio={item.fio}
                            email={item.email}
                            uniSubjects={item.uniSubjects}
                            feedbacks={item.feedbacks}
                            img={item.img}
                        />
                    )}
                />
            }


        </View>
    )
});

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