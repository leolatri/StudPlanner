import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import { StyleSheet } from "react-native";
import Skeleton from "./Skeleton";

interface Props {
    type: string;
    count?: number;
}


const Loader = ({ type, count }: Props) => {
    return (
        <View style={st.loader}>
            {type === 'circle' ? <ActivityIndicator size="large" color="#ffffff" />
                : <Skeleton count={count || 0} />}
        </View>
    )

};

const st = StyleSheet.create({
    loader: {
        width: '100%',
        height: '100%',

        alignItems: 'center',
        justifyContent: 'center',
    },


})

export default Loader;