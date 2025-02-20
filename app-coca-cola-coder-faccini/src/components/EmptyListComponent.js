import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { colors } from '../globals/colors';
import { useNavigation } from '@react-navigation/native';

const EmptyListComponent = ({ message, type }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <MaterialIcons
        name={type === "cart" ? "remove-shopping-cart" : "playlist-remove"}
        size={60}
        color={type === "cart" ? colors.primary : colors.accent}
      />
      <Text style={[styles.errorMessage, { color: type === "cart" ? colors.primary : colors.accent }]}>
        {message}
      </Text>
      
      {type === "cart" && (
        <Pressable style={styles.button} onPress={() => navigation.navigate("ShopStack", { screen: "Home" })}>
          <Text style={styles.buttonText}>Ir a la Tienda</Text>
        </Pressable>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  errorMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EmptyListComponent;
