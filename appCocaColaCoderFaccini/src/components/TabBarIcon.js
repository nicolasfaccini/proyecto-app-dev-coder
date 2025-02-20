import { StyleSheet, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { colors } from '../globals/colors';

const TabBarIcon = ({ text, icon, focused }) => {
  return (
    <View style={styles.container}>
      <Entypo 
        name={icon} 
        size={28} 
        color={focused ? colors.accent : colors.lightGray} 
        style={styles.icon} 
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default TabBarIcon;

const styles = StyleSheet.create({
  container: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  icon: {
    marginBottom: 2, 
  },
  text: {
    color: "#FFFFFF", 
    fontSize: 12,
    fontFamily: "Poppins",
  },
});
