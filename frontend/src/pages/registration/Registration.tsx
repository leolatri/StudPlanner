import { StyleSheet, View, TextInput, Text } from "react-native";
import Button from "../../components/button/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../../GeneralStyles";
import { RootStackParamList } from "../../navigation/types";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/StoreContext";
import { useState } from "react";
import ConfirmDialog from "../../components/modalView/ConfirmDialog";

interface RegProps {
    paddingBottom?: number;
}

type RegistrationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'registration'>;

const Registration = observer(({ paddingBottom }: RegProps) => {
    const { userStore } = useStore();
    const navigation = useNavigation<RegistrationScreenNavigationProp>();
    const [loading, setLoading] = useState(false);

    const [second_name, setsecond_name] = useState('');
    const [first_name, setfirst_name] = useState('');
    const [middle_name, setmiddle_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [phone_number, setPhoneNumber] = useState('');
    const [telegram, setTelegram] = useState('');
    const [is_admin, setAdmin] = useState<boolean>(false);

    const [dialog, setDialog] = useState<{
        title: string;
        message?: string;
        buttons: { text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive' }[];
    } | null>(null);

    const closeDialog = () => setDialog(null);
    const showAlert = (title: string, message?: string) =>
        setDialog({ title, message, buttons: [{ text: 'ОК', onPress: closeDialog }] });

    const handleRegister = async () => {
        if (!second_name.trim() || !first_name.trim() || !email.trim() || !password.trim()) {
            showAlert('Ошибка', 'Заполните все обязательные поля');
            return;
        }

        setLoading(true);
        try {
            await userStore.register({
                email: email.trim(),
                password: password,
                first_name: first_name.trim(),
                middle_name: middle_name.trim(),
                second_name: second_name.trim(),
                telegram: telegram.trim() || null,
                phone_number: phone_number.trim() || null,
                is_admin: is_admin
            });
        } catch (error: any) {
            showAlert('Ошибка регистрации', error.message || 'Что-то пошло не так');
        } finally {
            setLoading(false);
        }
    };

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
            <View style={st.section}>
                <Text style={st.label}>Обязательные поля</Text>
                <TextInput
                    style={st.input}
                    placeholder="Фамилия"
                    placeholderTextColor="#888"
                    value={second_name}
                    onChangeText={setsecond_name}
                />
                <TextInput
                    style={st.input}
                    placeholder="Имя"
                    placeholderTextColor="#888"
                    value={first_name}
                    onChangeText={setfirst_name}
                />
                <TextInput
                    style={st.input}
                    placeholder="Отчество"
                    placeholderTextColor="#888"
                    value={middle_name}
                    onChangeText={setmiddle_name}
                />
                <TextInput
                    style={st.input}
                    placeholder="Почта"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={st.input}
                    placeholder="Пароль"
                    placeholderTextColor="#888"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <View style={st.section}>
                <Text style={st.label}>Дополнительная информация</Text>
                <TextInput
                    style={st.input}
                    placeholder="Номер телефона"
                    placeholderTextColor="#888"
                    value={phone_number}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={st.input}
                    placeholder="Телеграм (без @)"
                    placeholderTextColor="#888"
                    value={telegram}
                    onChangeText={setTelegram}
                />
            </View>

            <Button
                label={loading ? "Регистрация..." : "Сохранить"}
                func={handleRegister}
                style={st.regBlock__button}
            />
            {dialog && (
                <ConfirmDialog
                    visible
                    title={dialog.title}
                    message={dialog.message}
                    buttons={dialog.buttons}
                    onDismiss={closeDialog}
                />
            )}
        </KeyboardAwareScrollView>
    );
});

const st = StyleSheet.create({
    section: {
        width: '100%',
        backgroundColor: colors.formBack,
        borderRadius: 20,
        padding: 20,
        gap: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textWhite,
        marginBottom: 5,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 10,
        padding: 12,
        color: colors.textWhite,
        fontSize: 16,
    },
    regBlock__button: {
        width: 200,
        marginBottom: 50,
    },
});

export default Registration;
