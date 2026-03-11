import { StyleSheet, View } from "react-native";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { colors } from "../../GeneralStyles";

const AddMaterial = () => {
    return (
        <View style={st.container}>
            <View style={st.container__block}>
                <Input label="Краткое название"/>
                <Input label="Автор"/>
                <Button
                    label="Загрузить PDF"
                    func={() => console.log('add material')}
                    style={st.container__button}
                />
            </View>
        </View>
    )
};

const st = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,

        justifyContent: 'center',
        alignItems: 'center'
    },
    container__block: {
        width: '100%',
        minHeight: 100,
        padding: 20,

        gap: 10, 
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: colors.formBack,
    },
    container__button: {
        width: 200,
    },
});

export default AddMaterial;