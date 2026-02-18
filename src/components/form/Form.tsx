import {
    Text,
    View, 
    TextStyle,
    StyleProp,
    StyleSheet,
    DimensionValue,
} from "react-native";
import Input from "../input/Input";
import Button from "../button/Button";
import {colors, generalStyles} from "../../GeneralStyles";

interface FormProps {
    fields: string[];
    indexPasswordField?: number;
    sectionName?: {
        label: string;
        style?: StyleProp<TextStyle>,
    };
    button?: {
        label: string;
        func: () => void;
    };
    additionButton?: {
        label: string,
        func: () => void;
    };
}

const Form = ({ fields, button, sectionName, additionButton, indexPasswordField }: FormProps) => {
    return (
        <View style={st('10%').form}>
            {sectionName && <Text style={[generalStyles.title, sectionName.style]}>{sectionName.label}</Text>}
            <View style={st().form__block}>
                {fields.map((el, index) => (
                    <Input label={el} key={el} isPassword={indexPasswordField === index} />
                ))}
                {button &&
                    <Button
                        label={button.label}
                        func={button.func}
                        style={st().form__button}
                    />
                }
                {additionButton &&
                    <Button
                        label={additionButton.label}
                        func={additionButton.func}
                        style={st().form__addButton}
                        textStyle={st().form__addButton}
                    />
                }

            </View>
        </View>
    )
};


const st = (heightForm?: DimensionValue) => StyleSheet.create({
    form: {
        width: '100%',
        minHeight: heightForm || 'auto',

        justifyContent: 'center',
        gap: 10,
    },
    form__block: {
        width: '100%',
        // minHeight: '100%',

        padding: 20,

        gap: 10,
        alignItems: 'center',

        backgroundColor: colors.formBack,
        borderRadius: 10,
        elevation: 7,
    },
    form__button: {
        width: 200,

        marginBottom: -20,
        marginTop: 10,
    },
    form__addButton: {
        justifyContent: 'flex-end',

        backgroundColor: 'none',
        fontSize: 12,
        color: colors.gray,
    },

});

export default Form;