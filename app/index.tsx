// app/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [search, setSearch] = useState("");

  // 🔹 posts fictícios
  const posts = [
    { id: "1", title: "Treino de Peito e Tríceps", content: "Supino reto, inclinado e mergulho." },
    { id: "2", title: "Corrida matinal", content: "5km todos os dias e alongamento pós-treino." },
    { id: "3", title: "Dieta equilibrada", content: "Frutas, proteínas e hidratação constante." },
  ];

  // 🔹 filtragem simples
  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      {/* 🔸 HEADER com menu */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: "#fff",
          elevation: 2,
        }}
      >
        <TouchableOpacity onPress={() => alert("Menu aberto!")}>
          <Ionicons name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "600", marginLeft: 12 }}>Início</Text>
      </View>

      {/* 🔸 CORPO */}
      <View style={{ flex: 1, alignItems: "center", padding: 16 }}>
        {/* Logotipo */}
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" }}
          style={{ width: 120, height: 120, borderRadius: 60, marginVertical: 20 }}
        />

        {/* Barra de pesquisa */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 8,
            width: "100%",
            elevation: 2,
          }}
        >
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            placeholder="Buscar posts..."
            value={search}
            onChangeText={setSearch}
            style={{ flex: 1, marginLeft: 8 }}
          />
        </View>

        {/* Cards de posts */}
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          style={{ width: "100%" }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 16,
                marginTop: 16,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}>
                {item.title}
              </Text>
              <Text style={{ color: "#555" }}>{item.content}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
