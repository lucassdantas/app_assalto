import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { colors } from '../theme/colors';
import { fontsFamilies, fontSizes } from '../theme/fonts';
import { spacing } from '../theme/spacing';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>App do Assalto</Text>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar ocorrências..."
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
        />
        <Ionicons
          name="location-outline"
          size={20}
          color={colors.textSecondary}
          style={styles.iconRight}
        />
        <Ionicons name="search" size={20} color={colors.textSecondary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: 50,
  },

  header: {
    fontSize: fontSizes.lg,
    fontFamily: fontsFamilies.bold,
    color: colors.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    marginBottom: spacing.lg,
    elevation: 2,
  },

  iconRight: {
    marginHorizontal: 6,
  },

  input: {
    flex: 1,
    fontFamily: fontsFamilies.regular,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },


});
