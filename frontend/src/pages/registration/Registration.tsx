import { StyleSheet, View } from "react-native"
import Form from "../../components/form/Form";
import Button from "../../components/button/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../GeneralStyles";
import { UserModel } from "../../models/types";
import { observer } from "mobx-react-lite";


interface RegProps {
    paddingBottom?: number;
    data?: UserModel;
}

const Registration = observer(({ paddingBottom, data }: RegProps) => {
    const genFields = [
        {
          name: 'Фамилия',
          value: data?.secondName || '',
        },
        {
          name: 'Имя',
          value: data?.firstName || '',
        },
        {
          name: 'Отчество',
          value: data?.middleName || '',
        },
        {
          name: 'Почта',
          value: data?.email || '',
        },
        {
          name: 'Пароль',
          value: data?.password || '',
        },
    ];
    const addFields = [
        {
          name: 'Номер телефона',
          value: data?.phoneNumber || '',
        },
        {
          name: 'Телеграм (без @)',
          value: data?.telegram || '',
        },
    ];
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
                fields={genFields}
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
});

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