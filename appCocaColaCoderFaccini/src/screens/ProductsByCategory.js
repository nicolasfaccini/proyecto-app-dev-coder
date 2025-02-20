import { FlatList, StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import CardProduct from "../components/CardProduct";
import { useGetProductsQuery } from "../services/shop";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductsByCategory = ({ route }) => {
  const { category } = route.params;
  const { data, isSuccess, isError, error, isLoading } = useGetProductsQuery(category);
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      const productsArray = Object.entries(data).map(([id, product]) => ({
        id,
        ...product,
      }));
      setProducts(productsArray);
    }
  }, [data]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <View><Text>{error?.message || "Error al cargar productos"}</Text></View>;

  return (
    <View>
      <Search onChangeKeyword={(t) => setKeyword(t)} />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CardProduct product={item} />}
      />
    </View>
  );
};

export default ProductsByCategory;

const styles = StyleSheet.create({});
