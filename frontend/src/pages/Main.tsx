import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Timetable from "./timetable/Timetable";
import Contacts from "./contacts/Contacts";
import { StyleSheet, View } from "react-native";
import Library from "./library/Library";
import Profile from "./profile/Profile";
import Button from "../components/button/Button";
import filter from '../../assets/filter.png';
import logOut from '../../assets/logOut.png';
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { colors } from "../GeneralStyles";
import { useStore } from '../stores/StoreContext';

type TabParamList = {
    timetable: undefined;
    contacts: undefined;
    library: undefined;
    profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const titles = {
    timetable: "РАСПИСАНИЕ",
    contacts: "ПРЕПОДАВАТЕЛИ",
    library: "БИБЛИОТЕКА",
    profile: "ПРОФИЛЬ",
} as const;

function necessaryIcon(routeName: keyof TabParamList): string {
    switch (routeName) {
        case "timetable": return "calendar-outline";
        case "contacts": return "people-outline";
        case "library": return "library-outline";
        case "profile": return "person-outline";
        default: return "help-outline";
    }
}

type Nav = NativeStackNavigationProp<RootStackParamList, "main">;

const Main = () => {
    const navigation = useNavigation<Nav>();
    const { userStore } = useStore()

    const handleLogout = async () => {
        await userStore.logout();
        navigation.replace('singIn');
    };

    return (
        <Tab.Navigator
            initialRouteName="timetable"
            screenOptions={({ route }: { route: RouteProp<TabParamList, keyof TabParamList> }) => ({
                title: titles[route.name],
                headerTintColor: "#fff",
                headerShadowVisible: false,
                headerStyle: st.headerStyle,
                headerTitleStyle: st.headerTitleStyle,
                tabBarStyle: st.tabBarStyle,
                tabBarActiveTintColor: "#ffffff",
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
                    const name = necessaryIcon(route.name);
                    return (
                        <View style={[st.tab, { backgroundColor: focused ? "rgba(0, 123, 255, 0.34)" : "transparent" }]}>
                            <Ionicons name={name} size={size} color={color} />
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen
                name="timetable"
                component={Timetable}
                options={() => ({
                    headerRight: () => (
                        <Button
                            icon={filter}
                            func={() => navigation.navigate("filterTimetable")}
                            style={st.filter}
                        />
                    )
                })}
            />
            <Tab.Screen
                name="contacts"
                component={Contacts}
            />
            <Tab.Screen
                name="library"
                component={Library}
                options={() => ({
                    headerRight: () => (
                        <Button
                            icon={filter}
                            func={() => navigation.navigate("filterLibrary")}
                            style={st.filter}
                        />
                    )
                })}
            />
            <Tab.Screen
                name="profile"
                component={Profile}
                options={() => ({
                    headerRight: () => (
                        <Button
                            icon={logOut}
                            func={() => handleLogout()}
                            style={st.filter}
                        />
                    )
                })}
            />
        </Tab.Navigator>
    );
};

const st = StyleSheet.create({
    tabBarStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        backgroundColor: colors.tabBack,
        borderRadius: 10,
        borderTopWidth: 0,
        elevation: 10,
    },
    headerStyle: {
        height: 110,
        backgroundColor: 'transparent',
    },
    headerTitleStyle: {
        padding: 10,
        fontFamily: "Montserrat-Regular",
        fontSize: 20,
        fontWeight: "600",
    },
    tab: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    filter: {
        width: '100%',
        height: '100%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
    }
});

export default Main;