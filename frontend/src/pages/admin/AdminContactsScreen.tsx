import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    FlatList,
    Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/StoreContext';
import { API_BASE } from '../../services/api/client';
import { ContactDTO } from '../../services/types';
import { ContactModel } from '../../models/types';
import { toJS } from 'mobx';
import ConfirmDialog from '../../components/modalView/ConfirmDialog';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'adminContacts'>;

const AdminContactsScreen = observer(() => {
    const navigation = useNavigation<Nav>()
    const { contactsStore } = useStore();
    const [form, setForm] = useState({ fio: '', email: '', uniSubjects: '' });
    const [deleteId, setDeleteId] = useState('');
    const [uploadingId, setUploadingId] = useState<string | null>(null);
    const [editingEmail, setEditingEmail] = useState<{ id: string; value: string } | null>(null);
    const [dialog, setDialog] = useState<{
        title: string;
        message?: string;
        buttons: { text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive' }[];
    } | null>(null);

    const closeDialog = () => setDialog(null);
    const showAlert = (title: string, message?: string) =>
        setDialog({ title, message, buttons: [{ text: 'ОК', onPress: closeDialog }] });

    useEffect(() => {
        contactsStore.loadContacts();
    }, []);

    const handleAddContact = async () => {
        if (!form.fio || !form.email) {
            showAlert('Ошибка', 'ФИО и email обязательны');
            return;
        }
        const payload: Omit<ContactDTO, "id"> = {
            fio: form.fio,
            email: form.email,
            img: '',
            feedbacks: [],
            feedbackIsLeaved: false,
            uniSubjects: form.uniSubjects.split(',').map(s => s.trim()),
        };
        try {
            await contactsStore.addContact(payload);
            showAlert('Успех', 'Контакт добавлен');
            setForm({ fio: '', email: '', uniSubjects: '' });
        } catch (error: any) {
            showAlert('Ошибка', error.message);
        }
    };

    const handleClearAll = () => {
        setDialog({
            title: 'Подтверждение',
            message: 'Вы уверены, что хотите удалить ВСЁ расписание? Это действие необратимо.',
            buttons: [
                { text: 'Отмена', style: 'cancel', onPress: closeDialog },
                {
                    text: 'Удалить всё',
                    style: 'destructive',
                    onPress: async () => {
                        closeDialog();
                        try {
                            await contactsStore.deleteAllContacts();
                            showAlert('Успех', 'Всё расписание удалено');
                            await contactsStore.loadContacts();
                        } catch (error: any) {
                            showAlert('Ошибка', error.message);
                        }
                    },
                },
            ],
        });
    };

    const handleDeleteContact = async () => {
        if (!deleteId) return;
        try {
            await contactsStore.deleteContact(deleteId);
            showAlert('Успех', 'Контакт удалён');
            setDeleteId('');
        } catch (error: any) {
            showAlert('Ошибка', error.message);
        }
    };

    const handleUpdateEmail = async (contactId: string) => {
        if (!editingEmail) return;
        try {
            await contactsStore.updateContact(contactId, { email: editingEmail.value });
            setEditingEmail(null);
            showAlert('Успех', 'Email обновлён');
        } catch (error: any) {
            showAlert('Ошибка', error.message);
        }
    };

    const handleUploadPhoto = async (contactId: string) => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            showAlert('Ошибка', 'Нет доступа к галерее');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            const formData = new FormData();
            formData.append('file', {
                uri: asset.uri,
                name: asset.fileName || 'photo.jpg',
                type: asset.mimeType || 'image/jpeg',
            } as any);

            setUploadingId(contactId);
            try {
                const { apiClient } = await import('../../services/api/client');
                await apiClient.postFormData(`/admin/contacts/${contactId}/photo`, formData);
                showAlert('Успех', 'Фото загружено');
                await contactsStore.reloadContact(contactId);
            } catch (error: any) {
                showAlert('Ошибка', error.message);
            } finally {
                setUploadingId(null);
            }
        }
    };

    const renderContact = ({ item }: { item: ContactModel }) => (
        <View style={styles.itemCard}>
            <View style={styles.block}>
                {item.img ? (
                    <Image source={item.img} style={styles.contactImage} />
                ) : (
                    <View style={styles.placeholderImage} />
                )}
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemTitle}>{item.fio}</Text>
                    <Text>Email: {item.email}</Text>
                    <Text>Предметы: {item.uniSubjects.join(', ')}</Text>
                    <Text style={styles.itemId}>ID: {item.id}</Text>
                </View>
            </View>

            {editingEmail?.id === item.id ? (
                <View style={styles.editEmailRow}>
                    <TextInput
                        value={editingEmail.value}
                        onChangeText={v => setEditingEmail({ id: item.id, value: v })}
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={() => handleUpdateEmail(item.id)}>
                        <Text style={styles.buttonText}>Сохранить</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.saveButton, { backgroundColor: '#6c757d' }]} onPress={() => setEditingEmail(null)}>
                        <Text style={styles.buttonText}>Отмена</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={[styles.uploadButton, { backgroundColor: '#007AFF' }]}
                    onPress={() => setEditingEmail({ id: item.id, value: item.email })}
                >
                    <Text style={styles.buttonText}>Изменить email</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={[styles.uploadButton, uploadingId === item.id && styles.disabledButton]}
                onPress={() => handleUploadPhoto(item.id)}
                disabled={uploadingId === item.id}
            >
                <Text style={styles.buttonText}>
                    {uploadingId === item.id ? 'Загрузка...' : 'Загрузить фото'}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Управление преподавателями</Text>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#9003a3', marginBottom: 10}]} onPress={() => navigation.navigate('adminPanel')}>
                <Text style={styles.buttonText}>Выйти в главное меню</Text>
            </TouchableOpacity>
            <View style={styles.section}>
                <Text style={styles.label}>➕ Добавить преподавателя</Text>
                <TextInput placeholder="ФИО *" value={form.fio} onChangeText={t => setForm({ ...form, fio: t })} style={styles.input} />
                <TextInput placeholder="Email *" value={form.email} onChangeText={t => setForm({ ...form, email: t })} style={styles.input} keyboardType="email-address" />
                <TextInput placeholder="Предметы (через запятую)" value={form.uniSubjects} onChangeText={t => setForm({ ...form, uniSubjects: t })} style={styles.input} />
                <TouchableOpacity style={styles.button} onPress={handleAddContact}>
                    <Text style={styles.buttonText}>Добавить</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>🗑 Удалить по ID</Text>
                <TextInput placeholder="ID контакта" value={deleteId} onChangeText={setDeleteId} style={styles.input} />
                <TouchableOpacity style={[styles.button, styles.danger]} onPress={handleDeleteContact}>
                    <Text style={styles.buttonText}>Удалить</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>⚠️ Опасная зона</Text>
                <TouchableOpacity style={[styles.button, styles.danger]} onPress={handleClearAll}>
                    <Text style={styles.buttonText}>🗑 Удалить ВСЕ контакты</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>👥 Список преподавателей</Text>
                {contactsStore.loading && <ActivityIndicator size="large" color="#007AFF" />}
                <FlatList
                    data={toJS(contactsStore.contacts)}
                    keyExtractor={item => item.id}
                    renderItem={renderContact}
                    scrollEnabled={false}
                />
            </View>
            {dialog && (
                <ConfirmDialog
                    visible
                    title={dialog.title}
                    message={dialog.message}
                    buttons={dialog.buttons}
                    onDismiss={closeDialog}
                />
            )}
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginVertical: 30 },
    section: {
        marginBottom: 25,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingBottom: 15,
        gap: 10
    },
    label: { fontSize: 18, fontWeight: '600', marginVertical: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
    button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 5 },
    danger: { backgroundColor: '#dc3545' },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 12, textAlign: 'center' },
    uploadButton: {
        height: 50,
        backgroundColor: '#28a745',
        padding: 8,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    disabledButton: { backgroundColor: '#9e9e9e' },
    itemCard: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'column',
        alignItems: 'center'
    },
    contactImage: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
    placeholderImage: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#ccc', marginRight: 12 },
    itemTextContainer: {
        flex: 1,
        gap: 7
    },
    itemTitle: { fontWeight: 'bold', fontSize: 16 },
    itemId: { fontSize: 12, color: '#6c757d', marginTop: 5 },
    block: {
        width: '100%',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    editEmailRow: {
        width: '100%',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AdminContactsScreen;
