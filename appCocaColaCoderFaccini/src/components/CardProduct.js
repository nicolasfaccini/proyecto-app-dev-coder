import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../globals/colors';
import { useNavigation } from '@react-navigation/native';

const CardProduct = ({ product }) => {
  const { title, price, stock, thumbnail } = product;
  const navigation = useNavigation();

  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate("ProductDetail", { product })}>
      <Image 
        style={styles.image} 
        source={{ uri: thumbnail }} 
        resizeMode='cover'
      />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.containerText}>
          <Text style={[styles.text, styles.price]}>{price ? `${price.toFixed(2)} ARS` : "N/A"}</Text>
          <Text style={[styles.text, styles.stock]}>Stock: {stock}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CardProduct;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
    backgroundColor: colors.lightGray, 
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: colors.lightGray,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  containerText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B5E20",
  },
  stock: {
    color: colors.lightGray,
  },
});
