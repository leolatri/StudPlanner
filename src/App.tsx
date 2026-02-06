import { Montserrat_400Regular, Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Registration from './pages/registration/Registration';
import { useWindowDimensions, View } from "react-native";
import SingInPage from './pages/registration/SingIn';
import Welcome from "./pages/welcome/WelcomeBlock";
import DataProvider from './context/DataProvider';
import Loader from './components/loader/Loader';
import { Stack } from './navigation/types';
import genStyle from './GeneralStyles';
import Main from './pages/Main';

const App = () => {
    const { width } = useWindowDimensions();

    const blockStyle = width >= 450 ? genStyle.bigScreen : genStyle.app__block;

    let [fontsLoaded] = useFonts({
        'Montserrat-Regular': Montserrat_400Regular,
        'Montserrat-Bold': Montserrat_700Bold,
    });

    if (!fontsLoaded) {
        return (
            <View style={genStyle.app}>
                <Loader type='circle' />
            </View>
        );
    }

    return (
        <DataProvider>
            <View style={genStyle.app}>
                <NavigationContainer theme={st.navTheme}>
                    <View style={blockStyle}>
                        <Stack.Navigator initialRouteName='welcome' screenOptions={{ headerShown: false }}>
                            <Stack.Screen name='welcome' component={Welcome} />
                            <Stack.Screen name='singIn' component={SingInPage} />
                            <Stack.Screen
                                name='registration'
                                component={Registration}
                                options={{
                                    headerShown: true,
                                    headerTintColor: "#fff",
                                    title: "Регистрация",
                                    headerShadowVisible: false,
                                    headerStyle: { backgroundColor: 'transparent' },
                                    headerTitleStyle: genStyle.title
                                }}
                            />
                            <Stack.Screen name='main' component={Main}/>
                        </Stack.Navigator>

                    </View>
                </NavigationContainer>

            </View>
        </DataProvider>
    );
};

const st = {
    navTheme: {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'rgba(25, 26, 31, 1)',
        },
    },

};

export default App;