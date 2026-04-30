import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../GeneralStyles';

interface DialogButton {
    text: string;
    onPress: () => void;
    style?: 'default' | 'cancel' | 'destructive';
}

interface ConfirmDialogProps {
    visible: boolean;
    title: string;
    message?: string;
    buttons: DialogButton[];
    onDismiss?: () => void;
}

const ConfirmDialog = ({ visible, title, message, buttons, onDismiss }: ConfirmDialogProps) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
            onRequestClose={onDismiss}
        >
            <Pressable style={st.overlay} onPress={onDismiss}>
                <Pressable style={st.dialog} onPress={() => {}}>
                    <Text style={st.title}>{title}</Text>
                    {message && <Text style={st.message}>{message}</Text>}
                    <View style={[st.buttons, buttons.length > 2 && st.buttonsColumn]}>
                        {buttons.map((btn, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[
                                    st.button,
                                    buttons.length <= 2 && i > 0 && st.buttonMarginLeft,
                                    buttons.length > 2 && i > 0 && st.buttonMarginTop,
                                    btn.style === 'cancel' && st.buttonCancel,
                                    btn.style === 'destructive' && st.buttonDestructive,
                                    btn.style !== 'cancel' && btn.style !== 'destructive' && st.buttonDefault,
                                ]}
                                activeOpacity={0.75}
                                onPress={btn.onPress}
                            >
                                <Text style={[
                                    st.buttonText,
                                    btn.style === 'destructive' && st.buttonTextDestructive,
                                    btn.style === 'cancel' && st.buttonTextCancel,
                                ]}>
                                    {btn.text}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const st = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        width: '85%',
        maxWidth: 400,
        backgroundColor: colors.formBack,
        borderRadius: 14,
        padding: 24,
        borderWidth: 1,
        borderColor: colors.borderForm,
    },
    title: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 18,
        fontWeight: '600',
        color: colors.textWhite,
        marginBottom: 8,
    },
    message: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        fontWeight: '300',
        color: colors.gray,
        lineHeight: 22,
        marginBottom: 4,
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 20,
    },
    buttonsColumn: {
        flexDirection: 'column',
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonDefault: {
        backgroundColor: colors.generalBlue,
    },
    buttonCancel: {
        backgroundColor: colors.textArea,
    },
    buttonDestructive: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#e74c3c',
    },
    buttonMarginLeft: {
        marginLeft: 10,
    },
    buttonMarginTop: {
        marginTop: 10,
        flex: 0,
    },
    buttonText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        fontWeight: '500',
        color: colors.textWhite,
    },
    buttonTextCancel: {
        color: colors.gray,
    },
    buttonTextDestructive: {
        color: '#e74c3c',
    },
});

export default ConfirmDialog;
