import { useState } from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import generalSt from '../../GeneralStyles';

interface Props{
    label?: string;
    func: () => void;
    icon?: ImageSourcePropType,
    style?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<ViewStyle>,
}

const Button = ({label, func, style, textStyle, icon}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={func}
      style={[!icon &&  st.button, style]}
    > 
      {icon && <Image source={icon} style={st.button__icon}/>}
      {label && <Text style={[generalSt.usualText, textStyle]}>
        {label}
      </Text>}
    </TouchableOpacity>
  );
};

const st = StyleSheet.create({
  button: {
    width: 100,
    height: 50,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 15,
    backgroundColor: '#007aff'
  },
  button__icon: {
    width: 30,
    height: 30,
  }
});

export default Button;