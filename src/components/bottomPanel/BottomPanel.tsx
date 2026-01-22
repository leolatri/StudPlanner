import { useEffect } from "react";
import { View } from "react-native";
import Button from "../button/Button";
import st from './bottomPanelStyles';

interface Props {
  position: number;
  setPosition: (position: number) => void;
}
const BottomPanel = ({ setPosition, position }: Props) => {
  const clickToNext = () => (
    position < 3 ? setPosition(position + 1) : console.log('stop')
  );
  useEffect(() => {
    console.log(position);
  }, [position]);
  return (
    <View style={st.panel}>
      {/* <Pressable
        onPress={() => console.log('skip')}
      >
        <Text style={st.skip}>Пропустить</Text>
      </Pressable> */}
      <View style={st.panel__bubbles}>
        <View style={[st.bubble, position === 0 && st.active]}/>
        <View style={[st.bubble, position === 1 && st.active]}/>
        <View style={[st.bubble, position === 2 && st.active]}/>
        <View style={[st.bubble, position === 3 && st.active]}/>
      </View>
      <Button
        label={position != 3 ? 'Далее' : 'Начать!'}
        func={clickToNext}
      />
    </View>
  )
}

export default BottomPanel;