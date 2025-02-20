import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../globals/colors';
import { useDeleteCartProductMutation } from '../services/cart';
import { useSelector } from 'react-redux';

const CardCartProduct = ({ product }) => {
    const { title, description, price, quantity } = product;
    const localId = useSelector(state => state.user.localId);
    const [triggerDeleteItemCart] = useDeleteCartProductMutation();

    const deleteCartProduct = () => {
        triggerDeleteItemCart({ localId, productId: product.id });
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <View style={styles.containerText}>
                    <Text style={[styles.text, { marginRight: 10 }]}>
                        <Text style={styles.price}>{price ? price.toFixed(2) : "0.00"} ARS</Text>
                    </Text>
                    <Text style={styles.text}> {quantity ?? 1} unidades</Text>
                </View>
            </View>
            <Pressable 
                onPress={deleteCartProduct} 
                style={({ pressed }) => [
                    styles.deleteButton, 
                    { opacity: pressed ? 0.7 : 1 }
                ]}
            >
                <MaterialIcons name="delete-outline" size={28} color="white" />
            </Pressable>
        </View>
    );
};

export default CardCartProduct;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1, 
        borderColor: colors.accent,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    content: {
        width: "75%",
        gap: 10,
    },
    containerText: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
    },
    description: {
        fontSize: 15, 
        color: "#d32f2f", 
        fontWeight: "500", 
    },
    text: {
        fontSize: 14,
        color: colors.primary,
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#27ae60",
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 50,
    },
});
