import BottomMenu from '@/app/components/BottomMenu';
import DropdownInput from '@/app/components/DropDownInput';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

const styles = require('@/app/style');

export default function ReportScreen() {
  const [image, setImage] = useState<string | null>(null);
  const fakeTypes = [
    "Assalto",
    "Furto",
    "Golpe",
    "Vandalismo",
    "Agressão",
    "Sequestro",
  ];

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function takePhoto() {
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.container}>

      <View style={{ padding: 20 }}>

        {/* --------- INPUT 1: Local da ocorrência --------- */}
        <Text style={styles.label}>Local da ocorrência</Text>

        <View style={styles.inputRow}>
          <Ionicons name="search" size={20} color="#999" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Digite o local"
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <Ionicons name="location" size={20} color="#999" style={{ marginLeft: 8 }} />
        </View>

        {/* --------- INPUT 2: Tipo de ocorrência (select fake) --------- */}

       <DropdownInput
          label="Tipo de ocorrência"
          data={fakeTypes}
          placeholder="Digite ou selecione"
          onSelect={(value) => console.log("Selecionado:", value)}
        />

        {/* --------- INPUT 3: Imagem --------- */}
        <Text style={styles.label}>Foto da ocorrência</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Ionicons name="image-outline" size={22} color="#fff" />
            <Text style={styles.imageButtonText}>Galeria</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
            <Ionicons name="camera-outline" size={22} color="#fff" />
            <Text style={styles.imageButtonText}>Tirar foto</Text>
          </TouchableOpacity>
        </View>

        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: '100%', height: 200, marginTop: 10, borderRadius: 8 }}
          />
        )}

        {/* --------- INPUT 4: Descrição --------- */}
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          placeholder="Descreva o que aconteceu..."
          placeholderTextColor="#aaa"
          style={styles.textArea}
          multiline
        />

        {/* --------- BOTÃO ENVIAR --------- */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Enviar Ocorrência</Text>
        </TouchableOpacity>
      </View>

      <BottomMenu />
    </View>
  );
}
