import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
    main: undefined;
    singIn: undefined;
    welcome: undefined;
    adminPanel: undefined;
    adminLibrary: undefined;
    adminContacts: undefined;
    adminSchedule: undefined;
    addMaterial: undefined;
    contactsPage: undefined;
    registration: undefined;
    filterLibrary: undefined;
    filterContacts: undefined;
    filterTimetable?: { selectedGroups: string[] };
    groupSearchPage?: { groupList: string[] };
    contactFeedback?: { contactId: string }

    Details: { id: number };
};

export const Stack = createNativeStackNavigator<RootStackParamList>();