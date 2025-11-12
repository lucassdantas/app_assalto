import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from './theme';
import { fontsFamilies, fontSizes } from './theme/';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>App do Assalto</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
        <Text style={styles.buttonText}>
          Iniciar <FontAwesome5 name='angle-double-right' size={16} color='#fff' />
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainTitle: {
    color: colors.primary,
    fontSize: fontSizes.xxl,
    fontFamily: fontsFamilies.bold,
    marginBottom: 40,
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight:50
  },

  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: fontSizes.lg,
    fontFamily: fontsFamilies.medium,
  },
});
