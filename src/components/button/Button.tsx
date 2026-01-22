import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import generalSt from '../../GeneralStyles';

interface Props{
    label: string;
    func: () => void;
}

const Button = ({label, func}: Props) => {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <TouchableOpacity
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.7}
      onPress={func}
      style={styles.button}
    >
      <Text style={generalSt.usualText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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