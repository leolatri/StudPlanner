import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
    welcome: undefined;
    singIn: undefined;
    registration: undefined;
    Details: { id: number };
};

export const Stack = createNativeStackNavigator<RootStackParamList>();