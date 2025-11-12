import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
    title: 'Tentativa de furto em loja',
    address: 'Rua das Flores, Curitiba - PR',
    description: 'Suspeito foi detido por seguranças após tentativa de furto.',
    image: 'https://picsum.photos/401/200',
  },
  {
    id: '3',
    title: 'Tentativa de furto em loja',
    address: 'Rua das Flores, Curitiba - PR',
    description: 'Suspeito foi detido por seguranças após tentativa de furto.',
    image: 'https://picsum.photos/401/200',
  },
  {
    id: '4',
    title: 'Tentativa de furto em loja',
    address: 'Rua das Flores, Curitiba - PR',
    description: 'Suspeito foi detido por seguranças após tentativa de furto.',
    image: 'https://picsum.photos/401/200',
  },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('home');

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
        <Ionicons name="location-outline" size={20} color={colors.textSecondary} style={styles.iconRight} />
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
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* 📱 Menu inferior */}
      <View style={styles.bottomMenu}>
        {/* Home */}
        <TouchableOpacity onPress={() => setActiveTab('home')}>
          <View
            style={[
              styles.menuItem,
              activeTab === 'home' && styles.menuItemActive,
            ]}
          >
            <Ionicons
              name="home"
              size={24}
              color={activeTab === 'home' ? '#fff' : colors.primary}
            />
          </View>
        </TouchableOpacity>

        {/* Mapa */}
        <TouchableOpacity onPress={() => setActiveTab('map')}>
          <View
            style={[
              styles.menuItem,
              activeTab === 'map' && styles.menuItemActive,
            ]}
          >
            <Ionicons
              name="map"
              size={24}
              color={activeTab === 'map' ? '#fff' : colors.primary}
            />
          </View>
        </TouchableOpacity>

        {/* Notificações */}
        <TouchableOpacity onPress={() => setActiveTab('notifications')}>
          <View
            style={[
              styles.menuItem,
              activeTab === 'notifications' && styles.menuItemActive,
            ]}
          >
            <Ionicons
              name="notifications"
              size={24}
              color={activeTab === 'notifications' ? '#fff' : colors.primary}
            />
          </View>
        </TouchableOpacity>

        {/* Reportar ocorrência */}
        <TouchableOpacity onPress={() => setActiveTab('report')}>
          <View style={styles.reportButton}>
            <View style={{backgroundColor:'#fff', borderRadius:100}}>
              <Ionicons name="warning" size={96} color={colors.danger}  />
            </View>
            <Text style={styles.reportText}>Reportar{'\n'}ocorrência</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#fff', // fundo branco
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

  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },

  menuItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuItemActive: {
    backgroundColor: colors.primary,
  },

  reportButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:-96
  },

  reportText: {
    fontFamily: fontsFamilies.bold,
    fontSize: 16,
    color: colors.danger,
    marginTop: -8,
    textAlign: 'center',
  },
});
