import { View, StyleSheet, Image, KeyboardAvoidingView, Platform } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import Form from "../../components/form/Form";
import welcome from '../../imgs/welcome.png';

type Nav = NativeStackNavigationProp<RootStackParamList, "singIn">;

const SingInPage = () => {
    const fields = ['Логин', 'Пароль'];
    const navigation = useNavigation<Nav>();

    return (
        <View style={st.singIn}>
            <Image
                style={st.sinngIn__img}
                source={welcome}
            />
            <KeyboardAvoidingView style={st.singIn__keyBord} behavior={Platform.OS === "android" ? "padding" : "height"}>
                <Form
                    fields={fields}
                    sectionName={{ label: "Вход" }}
                    button={{ label: 'Войти', func: () => navigation.navigate('main') }}
                    additionButton={{ label: 'Регистрация', func: () => navigation.navigate('registration') }}
                    indexPasswordField={1}
                />
            </KeyboardAvoidingView>
        </View>
    )
};

const st = StyleSheet.create({
    singIn: {
        width: '100%',
        height: '100%',

        padding: 25,

        justifyContent: 'center',
        alignItems: 'center',
    },
    singIn__keyBord: {
        width: '100%',
    },
    sinngIn__img: {
        width: 150,
        height: 150,

        alignSelf: 'flex-end',
        marginBottom: -60
    }
});

export default SingInPage;