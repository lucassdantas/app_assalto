import BottomMenu from '@/app/components/BottomMenu';
import Header from '@/app/components/Header';
import { supabase } from '@/app/services/supabaseClient';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const styles = require('@/app/style')

export default function ProfileScreen() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      const { data, error } = await supabase.from('reports').select('*');

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (!error && data) setReports(data);
      setLoading(false);
    }

    loadReports();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {
        loading ? 
        (<Text>Carregando...</Text>) :
        (<Text>{JSON.stringify(reports, null, 2)}</Text>)
      }

      <BottomMenu />
    </SafeAreaView>
  );
}
