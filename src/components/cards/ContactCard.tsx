import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ContactModel } from "../../models/types";
import ChatIcon from '../../../assets/chat.svg';
import Arrow from '../../../assets/arrow.svg';
import { colors } from "../../GeneralStyles";
import EmailImg from '../../../assets/email.svg';
import React from "react";


const Subjects = ({ arr }: { arr: string[] }) => {
    const count = arr.length - 2;
    const sortArr = arr.sort((a, b) => b.length - a.length);

    return (
        <View style={st.subjects}>
            <View style={st.subjects__textBlock}>
                <Text style={st.subjects__text}>{sortArr[0]}</Text>
                <Text style={st.subjects__text}>{sortArr[1]}</Text>
                {count > 0 && <Text style={st.subjects__text}>{ `+ ${count}`}</Text>}
            </View>
        </View>
    );
};

const Email = ({ email }: { email: string }) => {
    return (
        <View style={st.email}>
            <EmailImg width={22} height={22} stroke={colors.generalBlue}/>
            <Text style={st.email__text}>{email}</Text>
        </View>
    );
};

const BottomChat = () => {
    const handlePress = () => {
        console.log("Нажали на BottomChat");
    };

    return (
        <TouchableOpacity style={st.bottomChat} onPress={handlePress}>
            <View style={st.bottomChat__block}>
                <ChatIcon width={22} height={22} stroke={colors.generalBlue}/>
                <Text style={st.bottomChat__text}>Оставить отзыв</Text>
            </View>
            <Arrow width={15} height={15} stroke={colors.generalBlue}/> 
        </TouchableOpacity>
    );
};


const ContactCard = ({ id, img, fio, email, uniSubjects }: ContactModel) => {
    return (
        <View style={st.contactCard}>
            <View style={st.contactCard__container}>
                <Text style={st.contactCard__fio}>{fio}</Text>
                <View style={st.contactCard__block}>
                    <Image style={st.contactCard__img} source={img} />
                    <Subjects arr={uniSubjects} />
                </View>
                <Email email={email} />
            </View>
            <BottomChat />
        </View>
    )
};

const st = StyleSheet.create({
    contactCard: {
        width: "100%",

        backgroundColor: colors.formBack,
        borderRadius: 10,
        overflow: "hidden",
        elevation: 5,
    },
    contactCard__container: {
        width: "100%",
        padding: 20,
        gap: 20,
    },
    contactCard__block: {
        width: "100%",
        flexDirection: "row",
        gap: 20,
    },
    contactCard__img: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    contactCard__fio: {
        fontFamily: "Montserrat-Regular",
        fontSize: 13,
        color: colors.textWhite,
        fontWeight: '600',
    },
    subjects: {
        flex: 1,
        flexDirection: "row",
        gap: 15,
    },
    subjects__textBlock: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
    },
    subjects__text: {
        paddingHorizontal: 8,
        paddingVertical: 4,

        borderRadius: 10,
        backgroundColor: colors.generalBlue,

        fontFamily: "Montserrat-Regular",
        fontSize: 10,
        color: colors.textWhite,
        alignSelf: "flex-start",
    },

    email: {
        flex: 1,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
    },
    email__text: {
        fontFamily: "Montserrat-Regular",
        fontSize: 12,
        color: colors.textWhite,
        flexWrap: 'wrap'
    },
    bottomChat: {
        width: "100%",
        
        paddingHorizontal: 20,
        paddingVertical: 10,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        borderTopWidth: 1,
        borderTopColor: colors.backgraund,
    },
    bottomChat__block: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    bottomChat__icon: {
        width: 22,
        height: 22,
    },
    bottomChat__text: {
        fontFamily: "Montserrat-Regular",
        fontSize: 12,
        color: colors.generalBlue,
    },
    icon: {
        width: 22,
        height: 22,
    },

});

export default React.memo(ContactCard);

