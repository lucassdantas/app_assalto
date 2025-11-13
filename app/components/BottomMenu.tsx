// app/components/BottomMenu.tsx
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontsFamilies, fontSizes } from '../theme/fonts';
import { spacing } from '../theme/spacing';

export default function BottomMenu() {
  const router = useRouter();
  const pathname = usePathname(); // identifica a tela atual

// app/components/BottomMenu.tsx
const handleNavigate = (path: '/home' | '/map' ) => {
  if (pathname !== path) router.push(path as any);
};


  return (
    <View style={styles.bottomMenu}>
      {/* 🏠 Home */}
      <TouchableOpacity onPress={() => handleNavigate('/home')}>
        <View
          style={[
            styles.menuItem,
            pathname === '/home' && styles.menuItemActive,
          ]}
        >
          <Ionicons
            name="home"
            size={24}
            color={pathname === '/home' ? '#fff' : colors.primary}
          />
        </View>
      </TouchableOpacity>

      {/* 🗺️ Mapa */}
      <TouchableOpacity onPress={() => handleNavigate('/map')}>
        <View
          style={[
            styles.menuItem,
            pathname === '/map' && styles.menuItemActive,
          ]}
        >
          <Ionicons
            name="map"
            size={24}
            color={pathname === '/map' ? '#fff' : colors.primary}
          />
        </View>
      </TouchableOpacity>

      {/* 🔔 Notificações */}
      <TouchableOpacity onPress={() => handleNavigate('/notifications')}>
        <View
          style={[
            styles.menuItem,
            pathname === '/notifications' && styles.menuItemActive,
          ]}
        >
          <Ionicons
            name="notifications"
            size={24}
            color={pathname === '/notifications' ? '#fff' : colors.primary}
          />
        </View>
      </TouchableOpacity>

      {/* ⚠️ Reportar ocorrência */}
      <TouchableOpacity onPress={() => handleNavigate('/report')}>
        <View style={styles.reportButton}>
          <View style={{ backgroundColor: '#fff', borderRadius: 100 }}>
            <Ionicons name="warning" size={96} color={colors.danger} />
          </View>
          <Text style={styles.reportText}>Reportar{'\n'}ocorrência</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginTop: -96,
  },

  reportText: {
    fontFamily: fontsFamilies.bold,
    fontSize: fontSizes.sm,
    color: colors.danger,
    marginTop: -8,
    textAlign: 'center',
  },
});
