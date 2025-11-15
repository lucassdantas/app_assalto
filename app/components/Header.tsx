import { colors } from '@/app/theme/colors';
import { fontsFamilies, fontSizes } from '@/app/theme/fonts';
import { spacing } from '@/app/theme/spacing';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

type HeaderProps=  {
  hasSearchBar?:boolean;
}
export default function Header({hasSearchBar = true}:Readonly<HeaderProps>) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>App do  {'\n'}Assalto</Text>
      {hasSearchBar && 
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="."
            placeholderTextColor={colors.textSecondary}
            style={styles.headerSearchInput}
          />
          <Ionicons name="search" size={30} color={colors.primary} />
          <Ionicons name="locate" size={30} color={colors.primary} style={styles.iconRight} />
          <Ionicons name="funnel" size={30} color={colors.primary} />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop:15,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },

  header: {
    fontSize: fontSizes.xl,
    lineHeight:24,
    fontFamily: fontsFamilies.bold,
    color: colors.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
    textTransform:'uppercase'
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    marginBottom: spacing.lg,
    borderColor:colors.primary,
    borderWidth:1 
  },

  iconRight: {
    marginHorizontal: 6,
  },

  headerSearchInput: {
    flex: 1,
    fontFamily: fontsFamilies.regular,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
    height:30,
  },


});
