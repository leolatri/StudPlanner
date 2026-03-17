import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
    main: undefined;
    singIn: undefined;
    welcome: undefined;
    addMaterial: undefined;
    registration: undefined;
    filterLibrary: undefined;
    filterContacts: undefined;
    filterTimetable?: { selectedGroups: string[] };
    groupSearchPage?: {groupList: string[]};

    Details: { id: number };
};

export const Stack = createNativeStackNavigator<RootStackParamList>();