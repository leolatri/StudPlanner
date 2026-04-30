import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View, ScrollView } from "react-native";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { colors } from "../../GeneralStyles";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../../stores/StoreContext";
import { useState } from "react";
import { BookDTO } from "../../services/types";
import ConfirmDialog from "../../components/modalView/ConfirmDialog";

const AddMaterial = () => {
    const navigation = useNavigation();
    const { userStore } = useStore();
    const [name, setName] = useState('');
    const [authors, setAuthors] = useState('');
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const { libraryStore } = useStore();
    const [dialog, setDialog] = useState<{
        title: string;
        message?: string;
        buttons: { text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive' }[];
    } | null>(null);

    const closeDialog = () => setDialog(null);
    const showAlert = (title: string, message?: string) =>
        setDialog({ title, message, buttons: [{ text: 'ОК', onPress: closeDialog }] });

    const handleAdd = async () => {
        if (!name.trim() || !url.trim()) {
            showAlert('Ошибка', 'Название и ссылка обязательны');
            return;
        }

        const authorsList = authors.split(',').map(a => a.trim()).filter(a => a);
        const payload: Omit<BookDTO, "id"> = {
            name: name.trim(),
            autors: authorsList,
            owner_id: userStore.user?.user.id || '',
            url: url.trim(),
        };

        setLoading(true);
        try {
            await libraryStore.addBook(payload);
            showAlert('Успех', 'Материал добавлен в библиотеку');
            navigation.goBack();
        } catch (error: any) {
            showAlert('Ошибка', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={st.container}>
                <KeyboardAvoidingView
                    style={st.keyboardAvoid}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <ScrollView
                        contentContainerStyle={st.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={st.container__block}>
                            <Input label="Краткое название" value={name} setValue={setName} />
                            <Input label="Авторы (через запятую)" value={authors} setValue={setAuthors} />
                            <Input label="Ссылка на PDF" value={url} setValue={setUrl} />
                            <Button
                                label={loading ? "Сохранение..." : "Сохранить"}
                                func={handleAdd}
                                style={st.container__button}
                                disable={loading}
                            />
                        </View>
                    </ScrollView>
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
        </TouchableWithoutFeedback>
    );
};

const st = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgraund,
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    container__block: {
        width: '100%',
        padding: 20,
        gap: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.formBack,
    },
    container__button: {
        width: 200,
    },
});

export default AddMaterial;
