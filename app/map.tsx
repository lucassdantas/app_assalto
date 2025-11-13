// app/map.tsx
import BottomMenu from '@/app/components/BottomMenu';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { colors } from './theme/colors';
import { fontsFamilies, fontSizes } from './theme/fonts';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mapa de Ocorrências</Text>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    fontFamily: fontsFamilies.bold,
    fontSize: fontSizes.lg,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
});
