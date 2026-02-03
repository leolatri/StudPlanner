import { View, Text } from "react-native";
import st from "./style";
import Form from "../../components/form/Form";

const SingInPage = () => {
    const fields = ['Логин', 'Пароль'];

    return (
        <View style={st.singIn}>
            <Form fields={fields} buttonIsShown={true} />
        </View>
    )
}

export default SingInPage;