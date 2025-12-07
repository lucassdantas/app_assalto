import { colors } from "@/app/theme/colors";
import { fontsFamilies, fontSizes } from "@/app/theme/fonts";
import Slider from "@react-native-community/slider";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  distance: number;
  setDistance: (v: number) => void;
};

export default function FilterModal({
  visible,
  onClose,
  distance,
  setDistance,
}: Props) {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={onClose} />

        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.modalTitle}>Filtrar</Text>

          <Text style={styles.modalLabel}>Tipo de ocorrência</Text>
          <View style={styles.selectBox}>
            <Text style={styles.selectPlaceholder}>Selecione...</Text>
          </View>

          <Text style={styles.modalLabel}>Período</Text>
          <View style={styles.selectBox}>
            <Text style={styles.selectPlaceholder}>Selecione...</Text>
          </View>

          <Text style={styles.modalLabel}>
            Distância de mim: {distance} km
          </Text>

          <Slider
            minimumValue={1}
            maximumValue={50}
            value={distance}
            onValueChange={setDistance}
            style={{ width: "100%" }}
            minimumTrackTintColor={colors.primary}
          />

          <TouchableOpacity style={styles.applyButton} onPress={onClose}>
            <Text style={styles.applyButtonText}>Aplicar</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },

  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0007",
  },

  modalContent: {
    backgroundColor: "#fff",
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
    justifyContent: "center",
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
    alignItems: "center",
  },

  applyButtonText: {
    color: "#fff",
    fontSize: fontSizes.md,
    fontFamily: fontsFamilies.bold,
  },
});
