import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { colors } from "../GeneralStyles";
import Svg, { Line } from "react-native-svg";

interface Props {
    rotate?: number;
    color?: string;
    func?: () => void;
    style?: StyleProp<ViewStyle>;
    strokeWidth?: number;
}

const Arrow = ({ rotate = 0, color, func, style, strokeWidth = 3 }: Props) => {
    return (
        <TouchableOpacity
            style={[style, { transform: [{ rotate: `${rotate}deg` }] }]}
            onPress={func}
            activeOpacity={0.7}
        >
            <Svg width="100%" height="100%" viewBox="0 0 47 87">
                <Line
                    x1="43.0607"
                    y1="43.0607"
                    x2="1.06068"
                    y2="1.06066"
                    stroke={color || colors.generalBlue}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
                <Line
                    y1="-1.5"
                    x2="57"
                    y2="-2"
                    transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 2.12158 84)"
                    stroke={color || colors.generalBlue}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
            </Svg>
        </TouchableOpacity>
    );
};

export default Arrow;