import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useStore } from '../../stores/StoreContext';

type AdminPanelNav = NativeStackNavigationProp<RootStackParamList, 'adminPanel'>;

const AdminPanelScreen = () => {
  const navigation = useNavigation<AdminPanelNav>();
  const { userStore } = useStore();

  const handleLogout = async () => {
    await userStore.logout();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Панель администратора</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('adminSchedule')}>
        <Text style={styles.buttonText}>📅 Расписание</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('adminContacts')}>
        <Text style={styles.buttonText}>👨‍🏫 Преподаватели</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('adminLibrary')}>
        <Text style={styles.buttonText}>📚 Библиотека</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>🚪 Выйти</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginVertical: 30, textAlign: 'center' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, marginBottom: 15, alignItems: 'center' },
  logoutButton: { backgroundColor: '#FF3B30', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default AdminPanelScreen;