import { colors, fontSizes } from '@/app/theme';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  ActionSheetIOS,
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const styles = require('@/app/style')

type Props = {
  label?: string;
  value?: string | null;
  onChange: (uri: string | null) => void;
  height?: number;
};

export default function ImagePickerBox({
  label,
  value,
  onChange,
  height = 180,
}: Props) {
  const [internalImage, setInternalImage] = useState(value || null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setInternalImage(result.assets[0].uri);
      onChange(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setInternalImage(result.assets[0].uri);
      onChange(result.assets[0].uri);
    }
  };

  const openOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancelar', 'Escolher da galeria', 'Tirar foto'],
          cancelButtonIndex: 0,
        },
        async (buttonIndex) => {
          if (buttonIndex === 1) pickImage();
          if (buttonIndex === 2) takePhoto();
        }
      );
    } else {
      Alert.alert(
        'Selecionar imagem',
        'Escolha uma opção',
        [
          { text: 'Galeria', onPress: pickImage },
          { text: 'Tirar foto', onPress: takePhoto },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <TouchableOpacity
        style={{
          width: '100%',
          height,
          backgroundColor: '#fff',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
        onPress={openOptions}
        activeOpacity={0.8}
      >
        {internalImage ? (
          <Image
            source={{ uri: internalImage }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        ) : (
          <Text style={{ color: colors.primary, marginTop: 8, fontSize:fontSizes.md }}>
            Clique para enviar ou tirar uma foto
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
