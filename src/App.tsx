import { Montserrat_400Regular, Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat';
import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import Welcome from "./welcome/WelcomeBlock";

const App = () => {
    const { width: screenWidth } = useWindowDimensions();

    let [fontsLoaded] = useFonts({
        'Montserrat-Regular': Montserrat_400Regular,
        'Montserrat-Bold': Montserrat_700Bold,
    });

    if (!fontsLoaded) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(25, 26, 31, 1)'
            }}>
                <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
        );
    }

    return (
        <View style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(25, 26, 31, 1)',

                justifyContent: 'center',
                alignSelf: 'center',
            }}>
            <View style={{
                width: screenWidth > 450 ? '50%' : '100%',
                height: '100%',
                backgroundColor: 'rgba(25, 26, 31, 1)',

                justifyContent: 'center',
                alignSelf: 'center',
            }}>
                <Welcome />
            </View>
        </View>
    );
};

export default App;