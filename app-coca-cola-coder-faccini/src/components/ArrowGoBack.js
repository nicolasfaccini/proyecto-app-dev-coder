import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../globals/colors";

const ArrowGoBack = () => {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={colors.lightGray} />
        </Pressable>
    );
};

export default ArrowGoBack;

const styles = StyleSheet.create({
    goBack: {
        padding: 10, 
    },
});
