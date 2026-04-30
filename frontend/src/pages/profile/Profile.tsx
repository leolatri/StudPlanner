import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/StoreContext';
import Form, { Field } from '../../components/form/Form';
import { colors } from '../../GeneralStyles';
import Button from '../../components/button/Button';
import ConfirmDialog from '../../components/modalView/ConfirmDialog';

const Profile = observer(() => {
    const { userStore } = useStore();
    const user = userStore.user?.user;

    const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || '');
    const [telegram, setTelegram] = useState(user?.telegram || '');
    const [dialog, setDialog] = useState<{
        title: string;
        message?: string;
        buttons: { text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive' }[];
    } | null>(null);

    const closeDialog = () => setDialog(null);
    const showAlert = (title: string, message?: string) =>
        setDialog({ title, message, buttons: [{ text: 'ОК', onPress: closeDialog }] });

    const genFields: Field[] = [
        { name: 'Фамилия', value: user?.second_name || '', disable: true },
        { name: 'Имя', value: user?.first_name || '', disable: true },
        { name: 'Отчество', value: user?.middle_name || '', disable: true },
        { name: 'Почта', value: user?.email || '', disable: true },
    ];

    const addFields: Field[] = [
        {
            name: 'Номер телефона',
            value: phoneNumber || '',
            disable: false,
            placeholder: 'Введите номер телефона',
            setValue: setPhoneNumber,
        },
        {
            name: 'Телеграм (без @)',
            value: telegram || '',
            disable: false,
            placeholder: 'Введите ваш username',
            setValue: setTelegram,
        },
    ];

    const handleSave = async () => {
        try {
            await userStore.updateUser({
                phone_number: phoneNumber || null,
                telegram: telegram || null,
            });
            showAlert('Успех', 'Данные обновлены');
        } catch (error: any) {
            showAlert('Ошибка', error.message);
        }
    };

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
                alignItems: 'center',
                padding: 25,
                gap: 20,
                paddingBottom: 100,
            }}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            extraScrollHeight={100}
        >
            <Form
                fields={genFields}
                initialValues={[]}
                sectionName={{ label: 'Обязательные поля', style: st.label }}
            />
            <Form
                fields={addFields}
                initialValues={[user?.phone_number || '', user?.telegram || '']}
                sectionName={{ label: 'Дополнительная информация', style: st.label }}
                button={{
                    label:'Сохранить',
                    func: handleSave
                }}
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
    label: { fontSize: 12, color: colors.textWhite },
});

export default Profile;
