import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import { colors } from '../globals/colors';
import { useRef } from 'react';

const Counter = ({ quantity, increment, decrement }) => {
  const scaleAnimMinus = useRef(new Animated.Value(1)).current;
  const scaleAnimPlus = useRef(new Animated.Value(1)).current;

  const animatePress = (animation) => {
    Animated.sequence([
      Animated.spring(animation, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnimMinus }] }}>
        <Pressable
          style={styles.button}
          onPress={() => {
            animatePress(scaleAnimMinus);
            decrement();
          }}
        >
          <Text style={styles.textButton}>-</Text>
        </Pressable>
      </Animated.View>

      <Text style={styles.text}>{quantity}</Text>

      <Animated.View style={{ transform: [{ scale: scaleAnimPlus }] }}>
        <Pressable
          style={styles.button}
          onPress={() => {
            animatePress(scaleAnimPlus);
            increment();
          }}
        >
          <Text style={styles.textButton}>+</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    backgroundColor: colors.accent,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: colors.lightGray,
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
});
