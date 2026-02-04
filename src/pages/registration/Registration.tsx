import { StyleSheet, View } from "react-native"
import Form from "../../components/form/Form";
import Button from "../../components/button/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Registration = () => {
    const generalFields = ['Фамилия', 'Имя', 'Отчество', 'Почта', 'Пароль'];
    const addFields = ['Номер телефона', 'Телеграм (без @)'];

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }} 
            contentContainerStyle={st.contentContainerStyle}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            extraScrollHeight={100}
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
                func={() => console.log('save')}
                style={st.regBlock__button}
            />
            <View style={st.regBlock__add} />
        </KeyboardAwareScrollView>
    )
};

const st = StyleSheet.create({
    regBlock: {
        width: '100%',
        flex: 1,
    },
    contentContainerStyle: {
        alignItems: 'center',
        padding: 25,
        gap: 20,
    },
    regBlock__add: {
        width: '100%',
        height: 100,
    },
    regBlock__button: {
        width: 200,
        marginBottom: 50,
    },
    label: {
        fontSize: 12,
        color: 'rgb(255, 255, 255)',
    }
})

export default Registration;