import { Montserrat_400Regular, Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat';
import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import Welcome from "./pages/welcome/WelcomeBlock";
import DataProvider from './context/DataProvider';
import genStyle from './GeneralStyles';
import SingInPage from './pages/registration/SingIn';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Stack } from './navigation/types';

const App = () => {
    const { width, height } = useWindowDimensions();

    const blockStyle = width >= 450 ? genStyle.bigScreen : genStyle.app__block;

    let [fontsLoaded] = useFonts({
        'Montserrat-Regular': Montserrat_400Regular,
        'Montserrat-Bold': Montserrat_700Bold,
    });

    // if (!fontsLoaded) {
    //     return (
    //         <View style={genStyle.app}>
    //             <ActivityIndicator size="large" color="#ffffff" />
    //         </View>
    //     );
    // }

    return (
        <DataProvider>
            <View style={genStyle.app}>
                <NavigationContainer theme={st.navTheme}>
                    <View style={blockStyle}>
                        <Stack.Navigator initialRouteName='welcome' screenOptions={{ headerShown: false }}>
                            <Stack.Screen name='welcome' component={Welcome} />
                            <Stack.Screen name='singIn' component={SingInPage} />
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