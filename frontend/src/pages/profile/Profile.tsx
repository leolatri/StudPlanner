import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Registration from "../registration/Registration";
import { useStore } from "../../stores/StoreContext";

const Profile = () => {
    const {userStore} = useStore();
    return (
        <Registration paddingBottom={90} data={userStore.user?.user}/>
    )
};

// const st = StyleSheet.create({
//     profile: {
//         flex: 1,
//         padding: 20,


//     }
// });

export default Profile;