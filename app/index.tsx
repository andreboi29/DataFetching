import PostsList from "@/components/PostsList";
import { DataContext, DataProvider } from "@/context/DataContext";
import { Post } from "@/types/types";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AppContent: React.FC = () => {
  const { setPosts } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setPosts(data.products.slice(0, 30));
    } catch (err) {
      setError("Failed to load posts.");
      Alert.alert("Error", "Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleReload = () => {
    fetchPosts();
  };

  const handleAddToCart = (item: Post) => {
    if (cart.find((p) => p.id === item.id)) {
      Alert.alert("Already in cart", "This item is already in your cart.");
      return;
    }
    setCart([...cart, item]);
    Alert.alert("Added to cart", `"${item.title}" has been added to your cart.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#4CAF50" />}
      <View style={styles.cartBar}>
        <Text style={styles.cartText}>🛒 Cart: {cart.length} item{cart.length !== 1 ? "s" : ""}</Text>
      </View>
      <PostsList cart={cart} onAddToCart={handleAddToCart} />
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.customButton} onPress={handleReload} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Loading..." : "Reload Data"}</Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </SafeAreaView>
  );
};

export default function Index() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 40 },
  buttonWrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  customButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 8,
    marginRight: 16,
  },
  cartText: {
    color: "#2A9D8F",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "#E76F51",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "600",
    padding: 10,
    backgroundColor: "#fdecea",
    borderRadius: 8,
  },
});