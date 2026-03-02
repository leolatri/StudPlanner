import { StyleSheet, View } from "react-native"
import Form from "../../components/form/Form";
import Button from "../../components/button/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../GeneralStyles";


interface RegProps {
    paddingBottom?: number
}

const Registration = ({ paddingBottom }: RegProps) => {
    const generalFields = ['Фамилия', 'Имя', 'Отчество', 'Почта', 'Пароль'];
    const addFields = ['Номер телефона', 'Телеграм (без @)'];
    const navigation = useNavigation();

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
                alignItems: "center",
                padding: 25,
                paddingTop: 0,
                gap: 20,
                paddingBottom: paddingBottom || 40,
            }}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            extraScrollHeight={100}
            showsVerticalScrollIndicator={false}
        >
            <Form
                fields={generalFields}
                sectionName={{ label: 'Обязательные поля', style: st.label }}
            />
            <Form
                fields={addFields}
                sectionName={{ label: 'Дополнительная информация', style: st.label }}
            />
            <Button
                label={'Сохранить'}
                func={() => navigation.goBack()}
                style={st.regBlock__button}
            />
        </KeyboardAwareScrollView>
    )
};

const st = StyleSheet.create({
    regBlock: {
        width: '100%',
        flex: 1,
    },
    regBlock__button: {
        width: 200,
        marginBottom: 50,
    },
    label: {
        fontSize: 12,
        color: colors.textWhite,
    }
})

export default Registration;