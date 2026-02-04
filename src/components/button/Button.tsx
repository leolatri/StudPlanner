import { useState } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import generalSt from '../../GeneralStyles';

interface Props{
    label: string;
    func: () => void;
    style?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<ViewStyle>, 
}

const Button = ({label, func, style, textStyle}: Props) => {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <TouchableOpacity
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.7}
      onPress={func}
      style={[st.button, style]}
    >
      <Text style={[generalSt.usualText, textStyle]}>
        {label}
      </Text>
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
    backgroundColor: 'rgb(82, 153, 239)'
  },
});

export default Button;