import { StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Timetable = () => {
    return (
        <KeyboardAwareScrollView>
            <Text>Timetable</Text>

        </KeyboardAwareScrollView>
    )
};

const st = StyleSheet.create({
    profile: {
        // width: '100%',
        flex: 1,


    }
});

export default Timetable;