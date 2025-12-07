import FilterModal from '@/app/components/Header/FilterModal';
import SideMenu from '@/app/components/Header/SideMenu';
import { colors } from '@/app/theme/colors';
import { fontsFamilies, fontSizes } from '@/app/theme/fonts';
import { spacing } from '@/app/theme/spacing';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type HeaderProps = {
  hasSearchBar?: boolean;
};

export default function Header({ hasSearchBar = true }: Readonly<HeaderProps>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const slideAnimFilter = React.useRef(new Animated.Value(0)).current;
  const slideAnimMenu = React.useRef(new Animated.Value(-300)).current;

  const [distance, setDistance] = useState(5);

  /* ------------------ FILTER MODAL ------------------ */
  const openFilter = () => {
    setFilterOpen(true);
    Animated.timing(slideAnimFilter, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeFilter = () => {
    Animated.timing(slideAnimFilter, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setFilterOpen(false));
  };

  /* ------------------ SIDE MENU ------------------ */
  const openMenu = () => {
    setMenuOpen(true);
    Animated.timing(slideAnimMenu, {
      toValue: 0,
      duration: 230,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnimMenu, {
      toValue: -300,
      duration: 230,
      useNativeDriver: true,
    }).start(() => setMenuOpen(false));
  };

  return (
    <>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        {/* Ícone hambúrguer */}
        <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
          <Ionicons name="menu" size={32} color={colors.primary} />
        </TouchableOpacity>

        {/* Título */}
        <Text style={styles.header}>App do {'\n'}Assalto</Text>

        {hasSearchBar && (
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="."
              placeholderTextColor={colors.textSecondary}
              style={styles.headerSearchInput}
            />
            <Ionicons name="search" size={30} color={colors.primary} />
            <Ionicons name="locate" size={30} color={colors.primary} style={styles.iconRight} />
            <Ionicons name="funnel" size={30} color={colors.primary} onPress={openFilter} />
          </View>
        )}
      </View>

      <SideMenu visible={menuOpen} onClose={closeMenu} />
      <FilterModal distance={100} onClose={closeFilter} setDistance={setDistance} visible={filterOpen}  />
    </>
  );
}

const styles = StyleSheet.create({
  /* HEADER */
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
    zIndex: 1000,
  },

  header: {
    fontSize: fontSizes.xl,
    lineHeight: 24,
    fontFamily: fontsFamilies.bold,
    color: colors.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
    textTransform: 'uppercase',
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
    borderWidth: 1,
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
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 99999,
    elevation: 99999,
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
    elevation: 100000,
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
  },

  /* FILTER MODAL */
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0007',
  },

  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalTitle: {
    fontSize: fontSizes.lg,
    fontFamily: fontsFamilies.bold,
    color: colors.primary,
    marginBottom: 20,
  },

  modalLabel: {
    fontSize: fontSizes.md,
    fontFamily: fontsFamilies.regular,
    color: colors.textPrimary,
    marginTop: 15,
    marginBottom: 6,
  },

  selectBox: {
    height: 45,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },

  selectPlaceholder: {
    color: colors.textSecondary,
    fontFamily: fontsFamilies.regular,
  },

  applyButton: {
    marginTop: 25,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  applyButtonText: {
    color: '#fff',
    fontSize: fontSizes.md,
    fontFamily: fontsFamilies.bold,
  },
});
