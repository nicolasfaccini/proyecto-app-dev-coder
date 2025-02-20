import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../globals/colors";
import ArrowGoBack from "./ArrowGoBack";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import { deleteUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { deleteSesion } from "../config/dbSqlite";

const Header = ({ title }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLogout = () => {
    deleteSesion();
    dispatch(deleteUser());
  };

  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {navigation.canGoBack() && <ArrowGoBack />}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.side}>
        <Pressable onPress={onLogout} style={styles.logout}>
          <MaterialCommunityIcons name="exit-to-app" size={28} color={colors.lightGray} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 60, 
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-between",
    paddingHorizontal: 10, 
  },
  side: {
    width: 50, 
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.lightGray,
    fontSize: 18, 
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  logout: {
    padding: 10,
  },
});
