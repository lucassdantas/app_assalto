import BottomMenu from '@/app/components/BottomMenu';
import Header from '@/app/components/Header';
import { supabase } from '@/app/services/supabaseClient';
import { Report } from '@/app/types/report';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const styles = require('@/app/style')

export default function HomeScreen() {
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

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {!loading &&
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              
              {/* Se não tiver imagem, usa uma padrão */}
              <Image
                source={{
                  uri: item.image
                    ? item.image
                    : "https://placehold.co/600x400?text=Sem+Imagem"
                }}
                style={styles.image}
              />

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
      }

      <BottomMenu />
    </SafeAreaView>
  );
}
