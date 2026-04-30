import { StyleSheet, Text, View } from "react-native";
import { SubjectModel } from "../../models/types";
import Person from '../../../assets/profile.svg';
import { colors } from "../../GeneralStyles";
import Door from '../../../assets/door.svg';
import People from '../../../assets/people.svg';

const Info = ({ icon, text }: { icon: string, text: string }) => (
    <View style={st.info}>
        {icon === "door" ? <Door width={17} height={17} fill={colors.generalBlue} /> 
        : (icon === 'people' ? <People width={18} height={18} stroke={colors.generalBlue} strokeWidth={1}/>
        : <Person width={18} height={18} stroke={colors.generalBlue} strokeWidth={1} />)}
        <Text style={[{fontSize: 12}, st.text]}>{text}</Text>
    </View>
);

const SubjectCard = ({
    id, type, name, room, index, professor, startTime, endTime, date, groups
}: SubjectModel) => {
    return (
        <View style={st.subjectCard}>
            <View style={st.subjectCard__block}>
                <View style={st.subjectCard__header}>
                    <Text style={[st.text, {color: colors.generalBlue, fontSize: 15}]}>{type}</Text>
                    <Text style={[st.text, {color: colors.generalBlue, fontWeight: '600'}]}>{`${startTime} - ${endTime}`}</Text>
                </View>
                <Text style={[st.text, {fontSize: 17, fontWeight: '700'}]}>{name}</Text>
            </View>
            <View style={st.subjectCard__info}>
                <Info icon="door" text={room} />
                <Info icon="professor" text={professor} />
                <Info icon='people' text={groups.join('  ')}/>
            </View>
        </View>
    )
};

const st = StyleSheet.create({
    subjectCard: {
        width: '100%',
        minHeight: 50,

        padding: 20,

        justifyContent: 'center',
        gap: 10,

        backgroundColor: colors.formBack,
        borderRadius: 10,
        elevation: 10,
    },
    subjectCard__header: {
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',

    },
    subjectCard__block: {
        width: '100%',
        gap: 10,

        paddingBottom: 15,

        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
    },
    subjectCard__info: {
        width: '100%',
        gap: 5,
    },
    info: {
        width: '100%',
        flexDirection: 'row',
        gap: 15,
    },
    text: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: colors.textWhite,
        fontWeight: '400',
        textTransform: 'capitalize',
    }
});

export default SubjectCard;