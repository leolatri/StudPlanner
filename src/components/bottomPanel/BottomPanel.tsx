import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Button from "../button/Button";


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
      {position !== 0 &&
        <Text
          style={st.panel__arrow}
          onPress={() => setPosition(position - 1)}>
          {'←'}
        </Text>}
      <View style={st.panel__bubbles}>
        {bubbles.map((el) => (
          <View style={[st.bubble, position === el && st.active]} key={el} />
        ))}
      </View>
      {position < 3 ?
        <Text
          style={st.panel__arrow}
          onPress={() => setPosition(position + 1)}
        >
          {'→'}
        </Text>
        : <Button
          label={'Начать!'}
          func={clickToNext}
        />}
    </View>
  )
};

const st = StyleSheet.create({
  panel: {
    width: '100%',

    flexDirection: 'row',
    gap: 40,

    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panel__arrow: {
    paddingBottom: 10,
    fontSize: 40,
    color: 'rgb(255, 255, 255)',
  },
  panel__bubbles: {
    width: '45%',
    height: '100%',

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',

  },
  bubble: {
    width: 20,
    height: 20,

    borderRadius: 100,
    backgroundColor: 'rgba(195, 195, 195, 0.58)',
  },
  active: {
    backgroundColor: 'rgb(255, 255, 255)',
  },
});

export default BottomPanel;