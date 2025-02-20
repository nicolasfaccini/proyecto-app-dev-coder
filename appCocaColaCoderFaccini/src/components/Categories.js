import { FlatList, StyleSheet, View, Text } from "react-native";
import { useGetCategoriesQuery } from "../services/shop";
import CardItemCategory from "./CardItemCategory";

const Categories = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  if (isLoading) return <View><Text>Cargando categorías...</Text></View>;
  if (isError) return <View><Text>Error al cargar categorías</Text></View>;

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <CardItemCategory item={item} />}
        numColumns={2}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
