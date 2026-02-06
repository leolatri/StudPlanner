import { StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Registration from "../registration/Registration";

const Profile = () => {
    return (
        <Registration/>
    )
};

const st = StyleSheet.create({
    profile: {
        flex: 1,
        padding: 20,


    }
});

export default Profile;