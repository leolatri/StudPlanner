import { useState } from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import {generalStyles, colors} from '../../GeneralStyles';

interface Props{
    label?: string;
    func: () => void | Promise<void>;
    icon?: ImageSourcePropType,
    style?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    disable?: boolean,
}

const Button = ({label, func, style, textStyle, icon, disable}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={ disable ? () => {} : func}
      style={[!icon &&  st.button, style, disable && st['button--disable']]}
    > 
      {icon && <Image source={icon} style={st.button__icon}/>}
      {label && <Text style={[generalStyles.usualText, textStyle]}>
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
    backgroundColor: colors.generalBlue,
  },
  'button--disable': {
    opacity: 0.5
  },
  button__icon: {
    width: 30,
    height: 30,
  }
});

export default Button;