import { Image, StyleSheet, TextInput, View } from "react-native";
import loupe from '../../imgs/loupe/loupe.png';
import loupeActive from '../../imgs/loupe/loupe-active.png';
import React, { useState } from "react";
import { colors } from "../../GeneralStyles";
import Loupe from '../../../assets/loupe.svg';

const SearchInput = () => {
    const [active, setActive] = useState(false);
    return (
        <View
            style={[st.search, active && {borderColor: colors.textWhite}]}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
        >   
            <Loupe width={17} height={17} rotate={180} fill={active ? colors.textWhite : colors.gray}/>

            <TextInput
                style={st.search__input}
                onBlur={() => setActive(false)}
                placeholder="Поиск"
                placeholderTextColor={'rgba(148, 148, 148, 0.43)'}
            />
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
        width: '90%',

        borderWidth: 0,
        padding: 0,
        includeFontPadding: false,

        color: colors.textWhite,
        fontFamily: 'Montserrat-Regular',
        fontSize: 13,
        outlineColor: "transparent",
    },
    search__img: {
        width: 17,
        height: 17,

        alignItems: 'center'
    }
});

export default React.memo(SearchInput);