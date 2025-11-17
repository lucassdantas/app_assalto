import BottomMenu from '@/app/components/BottomMenu';
import Header from '@/app/components/Header';
import { supabase } from '@/app/services/supabaseClient';
import { colors } from '@/app/theme/colors';
import { fontsFamilies, fontSizes } from '@/app/theme/fonts';
import { spacing } from '@/app/theme/spacing';
import { Report } from '@/app/types/report';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const stylesGlobal = require('@/app/style')

export default function ProfileScreen() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setReports(data);
        console.log("IMAGENS:", data.map(r => r.image));
      }

      setLoading(false);
    }

    loadReports();
  }, []);

  // 🔹 APENAS EXEMPLO — depois você substitui pelas informações do supabase
  const user = {
    name: "Lucas",
    surname: "Dantas",
    age: 24,
    job: "Desenvolvedor",
    address: "São Paulo - SP",
    avatar: null,
  };


  return (
    <SafeAreaView style={stylesGlobal.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.page}>
        
        {/* FOTO DO USUÁRIO */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
            ) : (
              <Ionicons name="person" size={70} color={'#fff'} />
            )}
          </View>
        </View>

        {/* INFORMAÇÕES */}
        <Text style={styles.name}>{user.name} {user.surname}</Text>
        <Text style={styles.info}>{user.age} anos</Text>
        <Text style={styles.info}>{user.job}</Text>
        <Text style={styles.info}>{user.address}</Text>

        {/* BOTÃO EDITAR */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar informações</Text>
        </TouchableOpacity>

        {/* DIVISOR */}
        <View style={styles.divider} />

        {/* TÍTULO */}
        <Text style={styles.sectionTitle}>Minhas últimas denúncias</Text>

       {!loading &&
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={stylesGlobal.postCard}>
              
              {/* Se não tiver imagem, usa uma padrão */}
              <Image
                source={{
                  uri: item.image
                    ? item.image
                    : "https://placehold.co/600x400?text=Sem+Imagem"
                }}
                style={stylesGlobal.image}
              />

              <View style={stylesGlobal.postContent}>
                <Text style={stylesGlobal.postTitle}>{item.title}</Text>
                <Text style={stylesGlobal.postAddress}>{item.address}</Text>
                <Text style={stylesGlobal.postDescription}>{item.description}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />
      }

      </ScrollView>

      <BottomMenu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 120,
  },

  avatarWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: spacing.lg,
  },

  avatarCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },

  name: {
    fontSize: fontSizes.xl,
    fontFamily: fontsFamilies.bold,
    color: colors.primary,
    textAlign: "center",
    marginTop: spacing.md,
  },

  info: {
    fontSize: fontSizes.md,
    fontFamily: fontsFamilies.regular,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
  },

  editButton: {
    marginTop: spacing.lg,
    alignSelf: "center",
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  editButtonText: {
    color: "#fff",
    fontFamily: fontsFamilies.bold,
    fontSize: fontSizes.md,
  },

  divider: {
    height: 2,
    backgroundColor: colors.primary,
    width: "100%",
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },

  sectionTitle: {
    fontSize: fontSizes.lg,
    fontFamily: fontsFamilies.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },

  postItem: {
    backgroundColor: "#fff",
    padding: spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },

  postTitle: {
    fontSize: fontSizes.md,
    fontFamily: fontsFamilies.bold,
    color: colors.textPrimary,
  },

  postDate: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  },
});
