import { ScrollView, StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Timetable = () => {
    return (
        <ScrollView>
            <Text>Timetable</Text>

        </ScrollView>
    )
};

const st = StyleSheet.create({
    profile: {
        // width: '100%',
        flex: 1,


    }
});

export default Timetable;