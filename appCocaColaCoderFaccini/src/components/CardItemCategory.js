import { StyleSheet, Pressable, Animated } from 'react-native';
import ShadowCard from './wrappers/ShadowCard';
import { colors } from '../globals/colors';
import TextPrimary from './TextPrimary';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';

const CardItemCategory = ({ item: category }) => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });

    navigation.navigate("ProductsByCategory", { category });
  };

  return (
    <Pressable onPress={handlePress} style={styles.card}>
      <Animated.View style={[styles.animatedContainer, { transform: [{ scale: scaleAnim }] }]}>
        <ShadowCard style={styles.container}>
          <TextPrimary style={styles.text}>{category}</TextPrimary>
        </ShadowCard>
      </Animated.View>
    </Pressable>
  );
};

export default CardItemCategory;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 6,
  },
  animatedContainer: {
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    minWidth: "100%",
  },
  text: {
    color: colors.lightGray,
    fontSize: 16,
    fontWeight: "bold",
  },
});
