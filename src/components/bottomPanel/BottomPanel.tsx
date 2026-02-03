import { View, Text } from "react-native";
import Button from "../button/Button";
import st from './bottomPanelStyles';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";


type Nav = NativeStackNavigationProp<RootStackParamList, "welcome">;

interface Props {
  position: number;
  setPosition: (val: number) => void;
};

const BottomPanel = ({ setPosition, position }: Props) => {
  const navigation = useNavigation<Nav>();
  const bubbles = [0, 1, 2, 3];

  const clickToNext = () => (
    position < 3 ? setPosition(position + 1) : navigation.navigate("singIn")
  );

  
  return (
    <View style={st.panel}>
      {position != 0 &&
        <Text
          style={st.panel__arrow}
          onPress={() => setPosition(position - 1)}>
            {'<'}
        </Text>}
      <View style={st.panel__bubbles}>
        {bubbles.map((el) => (
          <View style={[st.bubble, position === el && st.active]} />
        ))}
      </View>
      <Button
        label={position != 3 ? 'Далее' : 'Начать!'}
        func={clickToNext}
      />
    </View>
  )
}

export default BottomPanel;