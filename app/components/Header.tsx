import { colors } from '@/app/theme/colors';
import { fontsFamilies, fontSizes } from '@/app/theme/fonts';
import { spacing } from '@/app/theme/spacing';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type HeaderProps = {
  hasSearchBar?: boolean;
}

export default function Header({ hasSearchBar = true }: Readonly<HeaderProps>) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        {/* Ícone hambúrguer */}
        <TouchableOpacity style={styles.menuButton} onPress={() => setMenuOpen(true)}>
          <Ionicons name="menu" size={32} color={colors.primary} />
        </TouchableOpacity>

        {/* Título */}
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

      {/* MENU LATERAL */}
      {menuOpen && (
        <View style={styles.overlay}>
          {/* Fundo clicável para fechar */}
          <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)} />

          {/* Drawer */}
          <View style={styles.drawer}>
            {/* Ícone fechar */}
            <TouchableOpacity onPress={() => setMenuOpen(false)} style={styles.closeButton}>
              <Ionicons name="close" size={32} color={colors.primary} />
            </TouchableOpacity>

            <Text style={styles.drawerItem}>Configurações</Text>
            <Text style={styles.drawerItem}>Relatar um problema</Text>
            <Text style={styles.drawerItem}>Contatos de emergência</Text>

            <View style={styles.versionBox}>
              <Text style={styles.versionText}>Versão 1.0.0</Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 15,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    position: 'relative',
  },

  menuButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1000
  },

  header: {
    fontSize: fontSizes.xl,
    lineHeight: 24,
    fontFamily: fontsFamilies.bold,
    color: colors.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
    textTransform: 'uppercase'
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    marginBottom: spacing.lg,
    borderColor: colors.primary,
    borderWidth: 1
  },

  iconRight: {
    marginHorizontal: 6,
  },

  headerSearchInput: {
    flex: 1,
    fontFamily: fontsFamilies.regular,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
    height: 30,
  },

  /* MENU LATERAL */

overlay: {
  ...StyleSheet.absoluteFillObject, // OCUPA A TELA TODA
  flexDirection: 'row',
  zIndex: 99999,
  elevation: 99999, // Android
},

backdrop: {
  flex: 1,
  backgroundColor: '#0008',
},

drawer: {
  width: '70%',
  backgroundColor: '#fff',
  padding: 20,
  paddingTop: 40,
  elevation: 100000, // Android
  zIndex: 100000,
},

  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },

  drawerItem: {
    fontSize: fontSizes.lg,
    fontFamily: fontsFamilies.regular,
    marginBottom: 20,
    color: colors.textPrimary,
  },

  versionBox: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },

  versionText: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  }
});
