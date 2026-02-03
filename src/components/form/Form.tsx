import { View } from "react-native";
import st from './formStyle';
import Input from "../input/Input";

interface FormProps {
    fields: string[];
    buttonIsShown: boolean;
    sectionName?: string;
}

const Form = ({fields, buttonIsShown = false, sectionName}: FormProps) => {
    return (
        <View style={st.form}>
            <View style={st.form__block}>
                {fields.map((el) => (
                    <Input label={el} key={el}/>
                ))}
            </View>
        </View>
    )
}

export default Form;