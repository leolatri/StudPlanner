import { ScrollView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SearchInput from "../../components/input/SearchInput";

const Library = () => {
    return (
        <View style={st.library}>
            <SearchInput/>
            <ScrollView>
            </ScrollView>
        </View>

    )
};

const st = StyleSheet.create({
    library: {
        flex: 1,

        padding: 20,


    }
});

export default Library;