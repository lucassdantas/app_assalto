import BottomMenu from '@/app/components/BottomMenu';
import Header from '@/app/components/Header';
import getAllCriminalReports from '@/app/services/db/entities/criminalReport/getAll';
import { CriminalReport } from '@/app/services/db/entities/criminalReport/interface';


import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = require('@/app/style');

export default function HomeScreen() {
  const [reports, setReports] = useState<CriminalReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getAllCriminalReports();
        setReports(response);
      } catch (error) {
        console.error("Erro ao carregar reports:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {!loading && (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postCard}>

              {/* Imagem */}
              <Image
                source={{
                  uri: item.image
                    ? item.image
                    : "https://placehold.co/600x400?text=Sem+Imagem",
                }}
                style={styles.image}
              />

              {/* Conteúdo */}
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
      )}

      <BottomMenu />
    </SafeAreaView>
  );
}
