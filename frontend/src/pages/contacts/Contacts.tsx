import { FlatList, StyleSheet, View } from "react-native";
import SearchInput from "../../components/input/SearchInput";
import ContactCard from "../../components/cards/ContactCard";
import { useStore } from "../../stores/StoreContext";
import { observer } from "mobx-react-lite";
import EmptyPage from "../empty/EmptyPage";
import { toJS } from 'mobx';

const Contacts = observer(() => {
    const { contactsStore } = useStore();
    const contacts = toJS(contactsStore.filteredContacts);
    return (
        <View style={st.contacts}>
            <SearchInput query={contactsStore.searchQuery} onChange={(val) => contactsStore.setSearchQuery(val)} />

            <FlatList
                style={{ flex: 1, alignSelf: 'stretch' }}
                contentContainerStyle={st.contacts_list}
                showsVerticalScrollIndicator={true}
                data={contacts}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <EmptyPage
                        top={200}
                        type="loupe"
                        text="Ничего не найдено. Введите ФИО преподавателя"
                    />
                }
                renderItem={({ item }) => (
                    <ContactCard
                        id={item.id}
                        img={item.img}
                        fio={item.fio}
                        email={item.email}
                        feedbacks={item.feedbacks}
                        uniSubjects={item.uniSubjects}
                        feedbackIsLeaved={item.feedbackIsLeaved}
                    />
                )}
            />



        </View>
    )
});

const st = StyleSheet.create({
    contacts: {
        flex: 1,
        // padding: 20,
        gap: 20,
    },
    contacts_list: {
        paddingTop: 20,
        paddingBottom: 80,
        paddingHorizontal: 20,

        gap: 15,
    },
});

export default Contacts;