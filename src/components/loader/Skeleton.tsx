import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

type Props = {
  count: number;
};

const Skeleton = ({ count }: Props) => {
  const { height, width } = useWindowDimensions();

  const safeCount = Math.max(1, count);

  const progress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    progress.setValue(0);

    const anim = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 1100,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== "web",
      })
    );

    anim.start();
    return () => anim.stop();
  }, [progress]);

  const shimmerWidth = Math.min(260, Math.max(140, width * 0.6));

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-shimmerWidth, width + shimmerWidth],
  });

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        skeleton: {
          width: "100%",
          height: height * 0.9,
          justifyContent: "space-between",
          alignItems: "center",
        },
        item: {
          width: "100%",
          height: (height * 0.7) / safeCount,
          backgroundColor: "rgb(57, 58, 63)",
          borderRadius: 10,
          overflow: "hidden", 
        },
        shimmer: {
          position: "absolute",
          top: 0,
          bottom: 0,
          width: shimmerWidth,
        },
      }),
    [height, safeCount, shimmerWidth]
  );

  const arr = React.useMemo(() => Array.from({ length: safeCount }), [safeCount]);

  return (
    <View style={styles.skeleton}>
      {arr.map((_, i) => (
        <View style={styles.item} key={i}>
          <AnimatedLG
            colors={[
              "rgba(255,255,255,0)",
              "rgba(255,255,255,0.18)",
              "rgba(255,255,255,0)",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.shimmer, { transform: [{ translateX }] }]}
          />
        </View>
      ))}
    </View>
  );
};

export default Skeleton;
