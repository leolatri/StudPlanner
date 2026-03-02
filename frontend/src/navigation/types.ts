import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
    welcome: undefined;
    singIn: undefined;
    registration: undefined;
    main: undefined;
    filterLibrary: undefined;
    filterContacts: undefined;
    filterTimetable: undefined;

    Details: { id: number };
};

export const Stack = createNativeStackNavigator<RootStackParamList>();