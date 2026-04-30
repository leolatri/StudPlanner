import { View, StyleSheet, KeyboardAvoidingView, Platform, TextInput, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import Welcome from '../../../assets/welcome.svg';
import { useStore } from "../../stores/StoreContext";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Button from "../../components/button/Button";
import { colors } from "../../GeneralStyles";
import ConfirmDialog from "../../components/modalView/ConfirmDialog";

type Nav = NativeStackNavigationProp<RootStackParamList, "singIn">;

const SingInPage = observer(() => {
    const navigation = useNavigation<Nav>();
    const { userStore } = useStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState<{
        title: string;
        message?: string;
        buttons: { text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive' }[];
    } | null>(null);

    const closeDialog = () => setDialog(null);
    const showAlert = (title: string, message?: string) =>
        setDialog({ title, message, buttons: [{ text: 'ОК', onPress: closeDialog }] });

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            showAlert('Ошибка', 'Введите email и пароль');
            return;
        }
        setLoading(true);
        try {
            await userStore.login(email.trim(), password);
        } catch (error: any) {
            showAlert('Ошибка входа', error.message || 'Неверные учётные данные');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={st.singIn}>
            <Welcome width={150} height={150} style={st.sinngIn__img} />
            <KeyboardAvoidingView
                style={st.singIn__keyBord}
                behavior={Platform.OS === "android" ? "padding" : "height"}
            >
                <View style={st.form}>
                    <Text style={st.label}>Email</Text>
                    <TextInput
                        style={st.input}
                        placeholder="example@mail.ru"
                        placeholderTextColor="#888"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <Text style={st.label}>Пароль</Text>
                    <TextInput
                        style={st.input}
                        placeholder="••••••••"
                        placeholderTextColor="#888"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button
                        label={loading ? "Вход..." : "Войти"}
                        func={handleLogin}
                        style={st.button}
                    />
                    <Button
                        label="Регистрация"
                        func={() => navigation.navigate('registration')}
                        style={[st.button, st.registerButton]}
                    />
                </View>
            </KeyboardAvoidingView>
            {dialog && (
                <ConfirmDialog
                    visible
                    title={dialog.title}
                    message={dialog.message}
                    buttons={dialog.buttons}
                    onDismiss={closeDialog}
                />
            )}
        </View>
    );
});

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
        marginBottom: -60,
    },
    form: {
        width: '100%',
        backgroundColor: colors.formBack,
        borderRadius: 20,
        padding: 20,
        gap: 15,
    },
    label: {
        color: colors.textWhite,
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 10,
        padding: 12,
        color: colors.textWhite,
        fontSize: 16,
    },
    button: {
        marginTop: 10,
        width: '100%',
    },
    registerButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.textWhite,
    },
});

export default SingInPage;
