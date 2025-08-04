import { useContext, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { DataContext } from "../context/DataContext";
import { Post } from "../types/types";

interface PostsListProps {
  cart: Post[];
  onAddToCart: (item: Post) => void;
}

export default function PostsList({ cart, onAddToCart }: PostsListProps) {
  const { posts } = useContext(DataContext);
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter(
    (item: Post) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const renderPost = ({ item, index }: { item: Post; index: number }) => (
    <View style={styles.card}>
      {item.images && item.images.length > 0 && (
        <Image
          source={{ uri: item.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          {index + 1}. {item.title}
        </Text>
        <Text style={styles.category}>{item.category?.toUpperCase()}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.discount}>-{item.discountPercentage}% OFF</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
          <Text style={styles.stock}>Stock: {item.stock}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.addToCartBtn,
            cart.find((p) => p.id === item.id) && styles.addedBtn,
          ]}
          onPress={() => onAddToCart(item)}
          disabled={!!cart.find((p) => p.id === item.id)}
        >
          <Text style={styles.addToCartBtnText}>
            {cart.find((p) => p.id === item.id) ? "Added" : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒Products</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.noResults}>No products found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#F5F7FB" 
  },
  header: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginTop: 20, 
    color: "#22223B",
    marginBottom: 16,
    alignSelf: "center",
    letterSpacing: 1
  },
  searchBar: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#eee",
  },
  infoContainer: {
    padding: 16,
  },
  title: { 
    fontWeight: "bold", 
    fontSize: 20, 
    color: "#22223B",
    marginBottom: 6,
  },
  category: {
    color: "#9A8C98",
    fontWeight: "600",
    fontSize: 12,
    marginBottom: 8,
    letterSpacing: 1.2,
  },
  description: {
    fontSize: 14,
    color: "#4A4E69",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
  },
  price: {
    color: "#2A9D8F",
    fontWeight: "bold",
    fontSize: 18,
  },
  discount: {
    color: "#E76F51",
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: "#FEECDC",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: "hidden",
  },
  rating: {
    color: "#FFC300",
    fontWeight: "600",
    fontSize: 16,
  },
  stock: {
    color: "#4A4E69",
    fontSize: 14,
    fontWeight: "600",
  },
  addToCartBtn: {
    backgroundColor: "#2A9D8F",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
    elevation: 2,
  },
  addedBtn: {
    backgroundColor: "#B9FBC0",
  },
  addToCartBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  noResults: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 40,
    fontSize: 16,
  },
});