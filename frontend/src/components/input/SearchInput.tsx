import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Loupe from '../../../assets/loupe.svg';
import Cross from '../../../assets/cross.svg';
import { colors } from "../../GeneralStyles";
import { useState } from "react";

interface SearchInputProps {
    query: string;
    onChange: (val: string) => void;
}

const SearchInput = ({ query, onChange }: SearchInputProps) => {
    const [active, setActive] = useState(false);
    
    const deleteContent = () => {
        onChange('');
        setActive(false);
    }

    return (
        <View
            style={[st.search, active && { borderColor: colors.textWhite }]}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
        >
            <Loupe width={17} height={17} rotate={180} fill={active ? colors.textWhite : colors.gray} />

            <TextInput
                value={query}
                placeholder="Поиск"
                onChangeText={onChange}
                style={st.search__input}
                onBlur={() => setActive(false)}
                placeholderTextColor={'rgba(148, 148, 148, 0.43)'}
            />
            <TouchableOpacity style={st.search__cross} onPress={deleteContent}>
                <Cross width={17} height={17} />
            </TouchableOpacity>
        </View>
    )
};

const st = StyleSheet.create({
    search: {
        width: '100%',
        height: 40,

        padding: 10,

        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,

        backgroundColor: colors.textArea,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray,
    },
    search__input: {
        height: '100%',
        width: '80%',

        borderWidth: 0,
        padding: 0,
        includeFontPadding: false,

        color: colors.textWhite,
        fontFamily: 'Montserrat-Regular',
        fontSize: 13,
        outlineColor: "transparent",
    },
    search__cross: {
        width: 20,
        height: '100%',

        justifyContent: 'center',
        alignItems:'center',
    }
});

export default SearchInput;