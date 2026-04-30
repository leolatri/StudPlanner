import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import FeedbackBlock from '../../components/feedbacks/RatingBlock';
import Comment from '../../components/feedbacks/Comments';
import { apiClient } from '../../services/api/client';
import EmptyPage from '../empty/EmptyPage';
import ConfirmDialog from '../../components/modalView/ConfirmDialog';

type FeedbackRouteProp = RouteProp<RootStackParamList, 'contactFeedback'>;

interface Feedback {
    id: string;
    text: string;
    grade: number;
    autor: string;
    isPersonal: boolean;
}

interface Contact {
    id: string;
    fio: string;
    email: string;
    uniSubjects: string[];
    feedbacks: Feedback[];
    feedbackIsLeaved: boolean;
    img?: any;
}

const Feedbacks = () => {
    const route = useRoute<FeedbackRouteProp>();
    const contactId = route.params?.contactId || '';

    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [dialog, setDialog] = useState<{
        title: string;
        message?: string;
        buttons: { text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive' }[];
    } | null>(null);

    const closeDialog = () => setDialog(null);
    const showAlert = (title: string, message?: string) =>
        setDialog({ title, message, buttons: [{ text: 'ОК', onPress: closeDialog }] });

    const loadContact = useCallback(async () => {
        if (!contactId) return;
        try {
            const data = await apiClient.get<Contact>(`/contacts/${contactId}`);
            setContact(data);
        } catch (error) {
            console.error('Ошибка загрузки контакта', error);
            showAlert('Ошибка', 'Не удалось загрузить данные преподавателя');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [contactId]);

    useEffect(() => {
        loadContact();
    }, [loadContact]);

    const handleSendFeedback = async (grade: number, text: string) => {
        try {
            await apiClient.post(`/contacts/${contactId}/feedback`, { grade, text });
            await loadContact();
            showAlert('Спасибо', 'Ваш отзыв сохранён');
        } catch (error: any) {
            const msg = error.message || 'Не удалось отправить отзыв';
            showAlert('Ошибка', msg);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadContact();
    };

    const dialogNode = dialog ? (
        <ConfirmDialog
            visible
            title={dialog.title}
            message={dialog.message}
            buttons={dialog.buttons}
            onDismiss={closeDialog}
        />
    ) : null;

    if (loading) {
        return (
            <>
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
                {dialogNode}
            </>
        );
    }

    if (!contact) {
        return (
            <>
                <View style={styles.center}>
                    <Text style={styles.errorText}>Преподаватель не найден</Text>
                </View>
                {dialogNode}
            </>
        );
    }

    const averageGrade = contact.feedbacks.length
        ? Math.floor((contact.feedbacks.reduce((sum, fb) => sum + fb.grade, 0) / contact.feedbacks.length) * 10) / 10
        : 0;

    return (
        <>
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={styles.container}
                data={contact.feedbacks}
                keyExtractor={(item) => item.id}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListEmptyComponent={
                    <EmptyPage
                        type='file'
                        text='Здесь пока пусто'
                        top={50}
                    />
                }
                ListHeaderComponent={
                    <FeedbackBlock
                        middleGrade={averageGrade}
                        feedbackCount={contact.feedbacks.length}
                        feedbackIsLeaved={contact.feedbackIsLeaved}
                        setFeedbackStatus={handleSendFeedback}
                        subjects={contact.uniSubjects}
                        contactId={contactId}
                    />
                }
                renderItem={({ item }) => (
                    <Comment
                        id={item.id}
                        isPersonal={item.isPersonal}
                        autor={item.autor}
                        grade={item.grade}
                        text={item.text}
                    />
                )}
            />
            {dialogNode}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 100,
        padding: 20,
        paddingBottom: 40,
        gap: 15,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});

export default Feedbacks;
