import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import BottomMenu from './components/BottomMenu';
import { colors } from './theme/colors';
import { fontsFamilies, fontSizes } from './theme/fonts';
import { spacing } from './theme/spacing';

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
      <Text style={styles.header}>App do Assalto</Text>

      {/* 🔍 Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar ocorrências..."
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
        />
        <Ionicons
          name="location-outline"
          size={20}
          color={colors.textSecondary}
          style={styles.iconRight}
        />
        <Ionicons name="search" size={20} color={colors.textSecondary} />
      </View>

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

      {/* 📱 Menu inferior */}
      <BottomMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: 50,
  },

  header: {
    fontSize: fontSizes.lg,
    fontFamily: fontsFamilies.bold,
    color: colors.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    marginBottom: spacing.lg,
    elevation: 2,
  },

  iconRight: {
    marginHorizontal: 6,
  },

  input: {
    flex: 1,
    fontFamily: fontsFamilies.regular,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },

  postCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },

  image: {
    width: '100%',
    height: 160,
  },

  postContent: {
    padding: spacing.md,
  },

  postTitle: {
    fontSize: 18,
    fontFamily: fontsFamilies.bold,
    color: colors.primary,
  },

  postAddress: {
    fontSize: 14,
    fontFamily: fontsFamilies.medium,
    color: colors.textSecondary,
    marginTop: 4,
  },

  postDescription: {
    fontSize: 14,
    fontFamily: fontsFamilies.regular,
    color: colors.textPrimary,
    marginTop: 6,
  },
});
