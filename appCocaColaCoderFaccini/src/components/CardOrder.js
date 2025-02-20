import { StyleSheet, Text, View, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../globals/colors';
import { useRef } from 'react';

const CardOrder = ({ order }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.content}>
        <Text style={styles.date}>{order.createdAt}</Text>
        <Text style={styles.total}>Total: {order.total ? `${order.total.toFixed(2)} ARS` : "N/A"}</Text>
      </View>
      <MaterialIcons name="receipt-long" size={32} color={colors.lightGray} />
    </Animated.View>
  );
};

export default CardOrder;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.accent,
    marginHorizontal: 10,
    marginVertical: 8,
    paddingVertical: 18, 
    paddingHorizontal: 18,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    gap: 8,
  },
  date: {
    color: colors.lightGray,
    fontSize: 16, 
  },
  total: {
    color: "#27ae60",
    fontSize: 20, 
    fontWeight: "bold",
  },
});
