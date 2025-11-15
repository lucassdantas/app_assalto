// app/map.tsx
import BottomMenu from '@/app/components/BottomMenu';
import Header from '@/app/components/Header';
import { colors } from '@/app/theme/colors';
import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
const styles = require('@/app/style')

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Header/>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Marcador de exemplo */}
        <Marker
          coordinate={{ latitude: -23.55052, longitude: -46.633308 }}
          title="Assalto relatado"
          description="Ocorrência recente registrada aqui"
          pinColor={colors.danger}
        />
      </MapView>
      <BottomMenu />
    </View>
  );
}