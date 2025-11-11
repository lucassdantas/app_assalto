import React from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import PostItem from "./components/PostItem";
import { Post } from "./types/post";

const posts: Post[] = [
  {
    id: "1",
    title: "Assalto na Av. Paulista",
    address: "Av. Paulista, São Paulo - SP",
    image: "https://picsum.photos/400/200",
    description: "Dois suspeitos armados abordaram um pedestre próximo ao MASP.",
  },
  {
    id: "2",
    title: "Roubo de carro",
    address: "Rua XV de Novembro, Curitiba - PR",
    image: "https://picsum.photos/401/200",
    description: "Veículo levado em plena luz do dia. A polícia investiga o caso.",
  },
  {
    id: "3",
    title: "Tentativa de furto frustrada",
    address: "Centro, Salvador - BA",
    image: "https://picsum.photos/402/200",
    description: "Moradores acionaram a PM a tempo e o suspeito foi detido.",
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>App do assalto</Text>

      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={22} color="#777" style={styles.iconLeft} />
        <TextInput placeholder="Pesquisar" style={styles.input} />
        <Icon name="location-outline" size={22} color="#777" style={styles.iconRight} />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem post={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Menu inferior fixo */}
      <View style={styles.bottomMenu}>
        <Icon name="home-outline" size={24} color="#333" />
        <Icon name="search-outline" size={24} color="#333" />
        <Icon name="map-outline" size={24} color="#333" />
        <Icon name="person-outline" size={24} color="#333" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 15,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  iconLeft: {
    marginRight: 5,
  },
  iconRight: {
    marginLeft: 5,
  },
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderTopWidth: 0.3,
    borderColor: "#ccc",
  },
});
