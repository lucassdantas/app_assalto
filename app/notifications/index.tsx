// app/map.tsx
import BottomMenu from '@/app/components/BottomMenu';
import Header from '@/app/components/Header';
import React from 'react';
import { View } from 'react-native';
const styles = require('@/app/style')

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Header/>
     
      <BottomMenu />
    </View>
  );
}