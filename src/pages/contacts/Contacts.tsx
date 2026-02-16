import { ScrollView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SearchInput from "../../components/input/SearchInput";

const Contacts = () => {
    return (
        <View style={st.contacts}>
            <SearchInput/>
            <ScrollView style={{ flex: 1, alignSelf: 'stretch' }} contentContainerStyle={st.contacts_list} showsVerticalScrollIndicator={false}>
                
            </ScrollView>
        </View>
    )
};

const st = StyleSheet.create({
    contacts: {
        flex: 1,
        padding: 20,
    },
    contacts_list: {
        flex: 1,
    },
});

export default Contacts;