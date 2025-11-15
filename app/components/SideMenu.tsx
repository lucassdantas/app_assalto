import { colors } from "@/app/theme/colors";
import { fontsFamilies, fontSizes } from "@/app/theme/fonts";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SideMenu({ visible, onClose }: Props) {
  const slideAnim = React.useRef(new Animated.Value(width)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : width,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <>
      {visible && (
        <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1} />
      )}

      <Animated.View
        style={[
          styles.menu,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        {/* Botão de fechar */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={32} color={colors.primary} />
        </TouchableOpacity>

        {/* Opções */}
        <TouchableOpacity style={styles.item}>
          <Ionicons name="settings-outline" size={24} color={colors.primary} />
          <Text style={styles.itemText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="alert-circle-outline" size={24} color={colors.primary} />
          <Text style={styles.itemText}>Relatar um problema</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="call-outline" size={24} color={colors.primary} />
          <Text style={styles.itemText}>Contatos de emergência</Text>
        </TouchableOpacity>

        {/* Versão no final */}
        <View style={styles.footer}>
          <Text style={styles.version}>v1.0.0</Text>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 10,
  },

  menu: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.95,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 20,
  },

  closeButton: {
    marginBottom: 40,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },

  itemText: {
    marginLeft: 12,
    fontFamily: fontsFamilies.medium,
    fontSize: fontSizes.md,
    color: colors.primary,
  },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },

  version: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
  },
});
