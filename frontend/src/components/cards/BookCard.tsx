import { useState } from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import download from '../../imgs/download.png';
import { BookModel } from "../../models/types";
import pdf from '../../imgs/pdf.png';
import { colors, generalStyles } from "../../GeneralStyles";
import File from '../../../assets/pdf.svg';
import Dowload from '../../../assets/download.svg';
import ConfirmDialog from '../modalView/ConfirmDialog';

const BookCard = ({ name, autors, url, owner_id }: BookModel) => {
    const [dialog, setDialog] = useState<{
        title: string;
        message?: string;
        buttons: { text: string; onPress: () => void; style?: 'default' | 'cancel' | 'destructive' }[];
    } | null>(null);

    const closeDialog = () => setDialog(null);
    const showAlert = (title: string, message?: string) =>
        setDialog({ title, message, buttons: [{ text: 'ОК', onPress: closeDialog }] });

    const handleDownload = async () => {
        if (!url) {
            showAlert('Ошибка', 'Ссылка на материал отсутствует');
            return;
        }
        try {
            await Linking.openURL(url);
        } catch (error) {
            showAlert('Ошибка', 'Не удалось открыть ссылку');
        }
    };

    return (
        <>
            <View style={st.bookCard}>
                <File width={50} height={50} fill={colors.generalBlue} />
                <View style={st.bookCard__textBlock}>
                    <Text
                        style={[generalStyles.text, { fontSize: 13 }]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {name}
                    </Text>
                    <Text
                        style={st.bookCard__text}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {autors.join(' , ')}
                    </Text>
                </View>
                <TouchableOpacity onPress={handleDownload}>
                    <Dowload width={25} height={25} stroke={colors.textWhite} />
                </TouchableOpacity>
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
        </>
    );
};

const st = StyleSheet.create({
    bookCard: {
        width: '100%',
        height: 90,

        padding: 15,

        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,

        backgroundColor: colors.formBack,
        borderRadius: 10,
        elevation: 7,
    },
    bookCard__textBlock: {
        width: '65%',
        minWidth: 0,
        gap: 10,
    },
    bookCard__text: {
        fontSize: 12,
        color: colors.gray,
        fontFamily: 'Montserrat-Regular',
        includeFontPadding: false,
    }
});

export default BookCard;
