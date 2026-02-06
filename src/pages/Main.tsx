import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Timetable from "./timetable/Timetable";
import Contacts from "./contacts/Contacts";
import { StyleSheet } from "react-native";
import Library from "./library/Library";
import Profile from "./profile/Profile";
import React from "react";

const Tab = createBottomTabNavigator();
const titles = {
    timetable: "РАСПИСАНИЕ",
    contacts: "КОНТАКТЫ",
    library: "БИБЛИОТЕКА",
    profile: "ПРОФИЛЬ",
} as const;

const Main = () => (
    <Tab.Navigator
        initialRouteName="timetable"
        screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            title: titles[route.name],
            headerTintColor: "#fff",
            headerShadowVisible: false,
            headerStyle: st.headerStyle,
            tabBarStyle: st.tabBarStyle,
            headerTitleStyle: { fontFamily: "Montserrat-Regular", fontSize: 20, fontWeight: "600", padding: 20 },
            tabBarIconStyle: { marginTop: 10 },
            tabBarIcon: ({ focused, color, size }) => {
                const name = route.name === "timetable"
                    ? focused ? "calendar" : "calendar-outline"
                    : route.name === "contacts"
                        ? focused ? "people" : "people-outline"
                        : route.name === "library"
                            ? focused ? "library" : "library-outline"
                            : focused ? "person" : "person-outline";

                return <Ionicons name={name} size={size} color={color} />;
            }
        })}
    >
        <Tab.Screen name="timetable" component={Timetable} />
        <Tab.Screen name="contacts" component={Contacts} />
        <Tab.Screen name="library" component={Library} />
        <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
);

const st = StyleSheet.create({
    tabBarStyle: {
        position: "absolute",
        // left: 10,
        // right: 10,
        bottom: 20,

        width: 250,
        alignSelf: "center",
        marginHorizontal: 40,

        backgroundColor: "rgba(31, 34, 43, 1)",
        borderRadius: 10,

        borderTopWidth: 0,
        elevation: 0,
    },
    headerStyle: {
        height: 110,
        backgroundColor: 'transparent',
    }
})

export default React.memo(Main);
