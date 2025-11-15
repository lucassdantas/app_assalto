// app/map.tsx
import BottomMenu from '@/app/components/BottomMenu';
import Header from '@/app/components/Header';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
const styles = require('@/app/style')

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
     
      <BottomMenu />
    </SafeAreaView>
  );
}