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
} from 'react-native';
import { apiClient } from '../../services/api/client';
import * as DocumentPicker from 'expo-document-picker';
import { SubjectDTO } from '../../services/types';
import { useStore } from '../../stores/StoreContext';
import { SubjectModel } from '../../models/types';
import ConfirmDialog from '../../components/modalView/ConfirmDialog';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


type Nav = NativeStackNavigationProp<RootStackParamList, 'adminSchedule'>;


const AdminScheduleScreen = () => {
    const navigation = useNavigation<Nav>()
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        type: '',
        name: '',
        room: '',
        duration: '',
        professor: '',
        timeAndDate: '',
        groups: '',
    });
    const [deleteId, setDeleteId] = useState('');
    const [deleteDate, setDeleteDate] = useState('');
    const { timetableStore } = useStore();
    const [subjects, setSubjects] = useState<SubjectModel[]>(timetableStore.subjects);
    const [dialog, setDialog] = useState<{
        title: string;
        message?: string;
        buttons: { text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive' }[];
    } | null>(null);

    const closeDialog = () => setDialog(null);
    const showAlert = (title: string, message?: string) =>
        setDialog({ title, message, buttons: [{ text: 'ОК', onPress: closeDialog }] });

    useEffect(() => {
        setSubjects(timetableStore.subjects);
    }, [timetableStore.subjects]);

    const handleAddSubject = async () => {
        const groupsArray = form.groups.split(',').map(g => g.trim()).filter(g => g);
        const payload: Omit<SubjectDTO, 'id'> = {
            type: form.type,
            name: form.name,
            room: form.room,
            index: 0,
            duration: parseInt(form.duration),
            professor: form.professor,
            timeAndDate: parseInt(form.timeAndDate),
            groups: groupsArray,
        };
        if (!payload.name || !payload.professor || !payload.timeAndDate) {
            showAlert('Ошибка', 'Заполните обязательные поля');
            return;
        }
        setLoading(true);
        try {
            await timetableStore.addSubject(payload);
            showAlert('Успех', 'Предмет добавлен');
            setForm({ type: '', name: '', room: '', duration: '', professor: '', timeAndDate: '', groups: '' });
        } catch (error: any) {
            showAlert('Ошибка', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSubject = async () => {
        if (!deleteId) return;
        setLoading(true);
        try {
            await timetableStore.deleteSubject(deleteId);
            showAlert('Успех', 'Предмет удалён');
            setDeleteId('');
        } catch (error: any) {
            showAlert('Ошибка', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteByDate = async () => {
        if (!deleteDate) return;
        setLoading(true);
        try {
            await timetableStore.deleteDay(parseInt(deleteDate));
            showAlert('Успех', 'Предметы за день удалены');
            setDeleteDate('');
        } catch (error: any) {
            showAlert('Ошибка', error.message);
        } finally {
            setLoading(false);
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
                        setLoading(true);
                        try {
                            await apiClient.delete('/admin/subjects/all');
                            showAlert('Успех', 'Всё расписание удалено');
                            await timetableStore.loadSubjects();
                        } catch (error: any) {
                            showAlert('Ошибка', error.message);
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ],
        });
    };

    const handleUploadFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: ['application/json', 'text/csv'] });
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const asset = result.assets[0];
                const formData = new FormData();
                formData.append('file', {
                    uri: asset.uri,
                    name: asset.name || 'schedule.json',
                    type: asset.mimeType || 'application/json',
                } as any);
                setUploading(true);
                const response = await apiClient.postFormData<{ message: string; created_count: number }>('/admin/upload-schedule', formData);
                showAlert('Успех', response.message);
                await timetableStore.loadSubjects();
            }
        } catch (error: any) {
            showAlert('Ошибка', error.message);
        } finally {
            setUploading(false);
        }
    };

    const renderSubject = ({ item }: { item: SubjectModel }) => (
        <View style={styles.itemCard}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text>Тип: {item.type}</Text>
            <Text>Аудитория: {item.room}</Text>
            <Text>Преподаватель: {item.professor}</Text>
            <Text>Время (timestamp): {item.timeAndDate}</Text>
            <Text>Группы: {item.groups?.length ? item.groups.join(', ') : 'нет'}</Text>
            <Text style={styles.itemId}>ID: {item.id}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Управление расписанием</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#9003a3', marginBottom: 10 }]} onPress={() => navigation.navigate('adminPanel')}>
                <Text style={styles.buttonText}>Выйти в главное меню</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton} onPress={handleUploadFile} disabled={uploading}>
                {uploading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.buttonText}>📁 Загрузить файл (JSON/CSV)</Text>}
                {uploading && <Text style={styles.uploadingText}> Загрузка...</Text>}
            </TouchableOpacity>

            <View style={styles.section}>
                <Text style={styles.label}>➕ Добавить предмет</Text>
                <TextInput placeholder="Тип (лекция/семинар)" value={form.type} onChangeText={t => setForm({ ...form, type: t })} style={styles.input} />
                <TextInput placeholder="Название *" value={form.name} onChangeText={t => setForm({ ...form, name: t })} style={styles.input} />
                <TextInput placeholder="Аудитория" value={form.room} onChangeText={t => setForm({ ...form, room: t })} style={styles.input} />
                <TextInput placeholder="Длительность (мин)" value={form.duration} onChangeText={t => setForm({ ...form, duration: t })} style={styles.input} keyboardType="numeric" />
                <TextInput placeholder="Преподаватель *" value={form.professor} onChangeText={t => setForm({ ...form, professor: t })} style={styles.input} />
                <TextInput placeholder="Время (timestamp ms) *" value={form.timeAndDate} onChangeText={t => setForm({ ...form, timeAndDate: t })} style={styles.input} keyboardType="numeric" />
                <TextInput placeholder="Группы (через запятую)" value={form.groups} onChangeText={t => setForm({ ...form, groups: t })} style={styles.input} />
                <TouchableOpacity style={styles.button} onPress={handleAddSubject}>
                    <Text style={styles.buttonText}>Добавить</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>🗑 Удалить по ID</Text>
                <TextInput placeholder="ID предмета" value={deleteId} onChangeText={setDeleteId} style={styles.input} />
                <TouchableOpacity style={[styles.button, styles.danger]} onPress={handleDeleteSubject}>
                    <Text style={styles.buttonText}>Удалить</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>📅 Удалить за день (timestamp начала дня)</Text>
                <TextInput placeholder="Timestamp (мс)" value={deleteDate} onChangeText={setDeleteDate} style={styles.input} keyboardType="numeric" />
                <TouchableOpacity style={[styles.button, styles.danger]} onPress={handleDeleteByDate}>
                    <Text style={styles.buttonText}>Удалить день</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>⚠️ Опасная зона</Text>
                <TouchableOpacity style={[styles.button, styles.danger]} onPress={handleClearAll}>
                    <Text style={styles.buttonText}>🗑 Удалить ВСЁ расписание</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>📖 Текущие предметы</Text>
                {loading && <ActivityIndicator size="large" color="#007AFF" />}
                <FlatList
                    data={subjects}
                    keyExtractor={item => item.id}
                    renderItem={renderSubject}
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
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginVertical: 30 },
    uploadButton: { backgroundColor: '#28a745', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 20, flexDirection: 'row', justifyContent: 'center' },
    uploadingText: { color: '#fff', marginLeft: 8 },
    section: { marginBottom: 25, borderBottomWidth: 1, borderColor: '#ddd', paddingBottom: 15 },
    label: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
    button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 5 },
    danger: { backgroundColor: '#dc3545' },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    itemCard: { backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8, marginBottom: 10 },
    itemTitle: { fontWeight: 'bold', fontSize: 16 },
    itemId: { fontSize: 12, color: '#6c757d', marginTop: 5 },
});

export default AdminScheduleScreen;
