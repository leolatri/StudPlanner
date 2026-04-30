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
  Switch,
} from 'react-native';
import { apiClient } from '../../services/api/client';
import BooksAPI from '../../services/api/books';
import { BookDTO } from '../../services/types';
import { useStore } from '../../stores/StoreContext';
import { BooksCollection } from '../../models/types';
import ConfirmDialog from '../../components/modalView/ConfirmDialog';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

type Nav = NativeStackNavigationProp<RootStackParamList, 'adminLibrary'>;


const AdminLibraryScreen = () => {
  const navigation = useNavigation<Nav>()
  const [books, setBooks] = useState<BooksCollection>();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', autors: '', owner_id: '', url: '' });
  const [deleteId, setDeleteId] = useState('');
  const { libraryStore } = useStore();
  const [dialog, setDialog] = useState<{
    title: string;
    message?: string;
    buttons: { text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive' }[];
  } | null>(null);

  const closeDialog = () => setDialog(null);
  const showAlert = (title: string, message?: string) =>
    setDialog({ title, message, buttons: [{ text: 'ОК', onPress: closeDialog }] });

  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = libraryStore.books;
      setBooks(data);
    } catch (error: any) {
      showAlert('Ошибка', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleAddBook = async () => {
    if (!form.name) {
      showAlert('Ошибка', 'Название книги обязательно');
      return;
    }
    const payload: Omit<BookDTO, 'id'> = {
      name: form.name,
      autors: form.autors.split(',').map(a => a.trim()),
      owner_id: form.owner_id,
      url: form.url,
    };
    setLoading(true);
    try {
      await libraryStore.addBook(payload);
      showAlert('Успех', 'Книга добавлена');
      setForm({ name: '', autors: '', owner_id: '', url: '' });
      loadBooks();
    } catch (error: any) {
      showAlert('Ошибка', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await BooksAPI.deleteBook(deleteId);
      showAlert('Успех', 'Книга удалена');
      setDeleteId('');
      loadBooks();
    } catch (error: any) {
      showAlert('Ошибка', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderBook = ({ item }: { item: BookDTO }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text>Авторы: {item.autors.join(', ')}</Text>
      {item.url ? <Text>URL: {item.url}</Text> : null}
      <Text style={styles.itemId}>ID: {item.id}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Управление библиотекой</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#9003a3', marginBottom: 15 }]} onPress={() => navigation.navigate('adminPanel')}>
        <Text style={styles.buttonText}>Выйти в главное меню</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <Text style={styles.label}>➕ Добавить книгу</Text>
        <TextInput placeholder="Название *" value={form.name} onChangeText={t => setForm({ ...form, name: t })} style={styles.input} />
        <TextInput placeholder="Авторы (через запятую)" value={form.autors} onChangeText={t => setForm({ ...form, autors: t })} style={styles.input} />
        <TextInput placeholder="Ссылка (URL)" value={form.url} onChangeText={t => setForm({ ...form, url: t })} style={styles.input} />
        <TouchableOpacity style={styles.button} onPress={handleAddBook}>
          <Text style={styles.buttonText}>Добавить</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>🗑 Удалить книгу по ID</Text>
        <TextInput placeholder="ID книги" value={deleteId} onChangeText={setDeleteId} style={styles.input} />
        <TouchableOpacity style={[styles.button, styles.danger]} onPress={handleDeleteBook}>
          <Text style={styles.buttonText}>Удалить</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>📚 Список книг</Text>
        {loading && <ActivityIndicator size="large" color="#007AFF" />}
        <FlatList
          data={books?.allBooks}
          keyExtractor={item => item.id}
          renderItem={renderBook}
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
  section: { marginBottom: 25, borderBottomWidth: 1, borderColor: '#ddd', paddingBottom: 15 },
  label: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 5 },
  danger: { backgroundColor: '#dc3545' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  itemCard: { backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8, marginBottom: 10 },
  itemTitle: { fontWeight: 'bold', fontSize: 16 },
  itemId: { fontSize: 12, color: '#6c757d', marginTop: 5 },
});

export default AdminLibraryScreen;
