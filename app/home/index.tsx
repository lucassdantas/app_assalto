import BottomMenu from '@/app/components/BottomMenu';
import Header from '@/app/components/Header';
import React from 'react';
import {
  FlatList,
  Image,
  Text,
  View
} from 'react-native';
const styles = require('@/app/style')
// Exemplo de posts
const posts = [
  {
    id: '1',
    title: 'Tentativa de furto em loja',
    address: 'Rua das Flores, Curitiba - PR',
    description: 'Suspeito foi detido por seguranças após tentativa de furto.',
    image: 'https://picsum.photos/401/200',
  },
  {
    id: '2',
    title: 'Furto em residência',
    address: 'Avenida Paulista, São Paulo - SP',
    description: 'Casa invadida durante a madrugada.',
    image: 'https://picsum.photos/402/200',
  },
  {
    id: '3',
    title: 'Roubo de veículo',
    address: 'Centro, Belo Horizonte - MG',
    description: 'Carro roubado próximo à praça principal.',
    image: 'https://picsum.photos/403/200',
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header/>
      {/* 📰 Lista de posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postAddress}>{item.address}</Text>
              <Text style={styles.postDescription}>{item.description}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      <BottomMenu />
    </View>
  );
}