import { Image, StyleSheet, TextInput, View } from "react-native";
import loupe from '../../imgs/loupe/loupe.png';
import loupeActive from '../../imgs/loupe/loupe-active.png';
import React, { useState } from "react";


const SearchInput = () => {
    const [active, setActive] = useState(false);
    return (
        <View
            style={[st.search, active && {borderColor: 'rgb(255, 255, 255)'}]}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
        >
            <Image source={active ? loupeActive : loupe} style={st.search__img}/>
            <TextInput style={st.search__input} onBlur={() => setActive(false)}/>
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

        backgroundColor: 'rgba(38, 42, 53, 1)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(88, 88, 88, 0.43)',
    },
    search__input: {
        height: '100%',
        width: '90%',

        borderWidth: 0,
        padding: 0,
        includeFontPadding: false,

        color: 'rgb(255, 255, 255)',
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