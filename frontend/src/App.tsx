import { Montserrat_400Regular, Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Registration from './pages/registration/Registration';
import { useWindowDimensions, View } from "react-native";
import SingInPage from './pages/registration/SingIn';
import Welcome from "./pages/welcome/WelcomeBlock";
import Loader from './components/loader/Loader';
import { Stack } from './navigation/types';
import { generalStyles, colors } from './GeneralStyles';
import Main from './pages/Main';
import { LinearGradient } from 'expo-linear-gradient';
import TimetableFilter from './pages/filter/timetable/TimetableFilter';
import GroupSearchPage from './pages/filter/timetable/GroupSearchPage';
import LibraryFilter from './pages/filter/library/FilterLibrary';
import AddMaterial from './pages/library/AddMaterial';
import { StoreProvider, useStore } from './stores/StoreContext';
import { observer } from 'mobx-react-lite';
import Feedbacks from './pages/contacts/Feedbacks';
import AdminPanelScreen from './pages/admin/AdminPanelScreen';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminScheduleScreen from './pages/admin/AdminScheduleScreen';
import AdminContactsScreen from './pages/admin/AdminContactsScreen';
import AdminLibraryScreen from './pages/admin/AdminLibraryScreen';

const AppContent = observer(() => {
    const { width } = useWindowDimensions();
    const blockStyle = width >= 450 ? generalStyles.bigScreen : generalStyles.app__block;
    const { userStore } = useStore();

    useEffect(() => {
        const loadUser = async () => {
            const token = await AsyncStorage.getItem('access_token');
            if (token && !userStore.user) {
                await userStore.fetchUser();
            }
        };
        loadUser();
        console.log('ADM-STATUS: ', userStore.user?.user.is_admin)
    }, []);

    if (userStore.loading) {
        return (
            <View style={generalStyles.app}>
                <Loader type='circle' />
            </View>
        );
    }

    return (
        <NavigationContainer theme={st.navTheme}>
            <View style={blockStyle}>
                <Stack.Navigator
                    initialRouteName={userStore.user ? 'main' : 'welcome'}
                    screenOptions={{ headerShown: false }}
                >
                    {!userStore.user ? (
                        <>
                            <Stack.Screen name='welcome' component={Welcome} />
                            <Stack.Screen name='singIn' component={SingInPage} />
                            <Stack.Screen
                                name='registration'
                                component={Registration}
                                options={{
                                    headerShown: true,
                                    headerTintColor: colors.textWhite,
                                    title: "РЕГИСТРАЦИЯ",
                                    headerShadowVisible: false,
                                    headerStyle: { backgroundColor: colors.backgraund },
                                    headerTitleStyle: generalStyles.title,
                                }}
                            />
                        </>
                    ) : userStore.user.user.is_admin ? (
                        <>
                            <Stack.Screen name='adminPanel' component={AdminPanelScreen} />
                            <Stack.Screen name='adminSchedule' component={AdminScheduleScreen} />
                            <Stack.Screen name='adminContacts' component={AdminContactsScreen} />
                            <Stack.Screen name='adminLibrary' component={AdminLibraryScreen} />
                        </>

                    ) : (
                        <>
                            <Stack.Screen name='main' component={Main} />
                            <Stack.Screen
                                name='filterTimetable'
                                component={TimetableFilter}
                                options={{
                                    headerShown: true,
                                    title: 'ФИЛЬТР',
                                    headerTintColor: colors.textWhite,
                                    headerShadowVisible: false,
                                    headerStyle: { backgroundColor: colors.backgraund },
                                    headerTitleStyle: generalStyles.title,
                                }}
                            />
                            <Stack.Screen
                                name='groupSearchPage'
                                component={GroupSearchPage}
                                options={{
                                    headerShown: true,
                                    title: 'ПОИСК ГРУПП',
                                    headerTintColor: colors.textWhite,
                                    headerShadowVisible: false,
                                    headerStyle: { backgroundColor: colors.backgraund },
                                    headerTitleStyle: generalStyles.title,
                                }}
                            />
                            <Stack.Screen
                                name='filterLibrary'
                                component={LibraryFilter}
                                options={{
                                    headerShown: true,
                                    title: 'ФИЛЬТР',
                                    headerTintColor: colors.textWhite,
                                    headerShadowVisible: false,
                                    headerStyle: { backgroundColor: colors.backgraund },
                                    headerTitleStyle: generalStyles.title,
                                }}
                            />
                            <Stack.Screen
                                name='addMaterial'
                                component={AddMaterial}
                                options={{
                                    headerShown: true,
                                    title: 'ДОБАВИТЬ МАТЕРИАЛ',
                                    headerTintColor: colors.textWhite,
                                    headerShadowVisible: false,
                                    headerStyle: { backgroundColor: colors.backgraund },
                                    headerTitleStyle: generalStyles.title,
                                }}
                            />
                            <Stack.Screen
                                name='contactFeedback'
                                component={Feedbacks}
                                options={{
                                    headerShown: true,
                                    title: 'ОТЗЫВЫ',
                                    headerTintColor: colors.textWhite,
                                    headerShadowVisible: false,
                                    headerStyle: { backgroundColor: colors.backgraund },
                                    headerTitleStyle: generalStyles.title,
                                }}
                            />
                        </>
                    )}

                </Stack.Navigator>
            </View>
        </NavigationContainer>
    );
});

const App = observer(() => {
    let [fontsLoaded] = useFonts({
        'Montserrat-Regular': Montserrat_400Regular,
        'Montserrat-Bold': Montserrat_700Bold,
    });

    if (!fontsLoaded) {
        return (
            <View style={generalStyles.app}>
                <Loader type='circle' />
            </View>
        );
    }

    return (
        <StoreProvider>
            <LinearGradient
                colors={['rgba(25, 26, 31, 1)', 'rgba(30, 33, 43, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={generalStyles.app}
            >
                <AppContent />
            </LinearGradient>
        </StoreProvider>
    );
});

const st = {
    navTheme: {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: colors.backgraund,
        },
    },
};

export default App;