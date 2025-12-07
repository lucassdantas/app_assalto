import BottomMenu from '@/app/components/BottomMenu';
import Header from '@/app/components/Header';
import DropdownInput from '@/app/components/inputs/DropDownInput';
import ImagePickerBox from '@/app/components/inputs/ImagePickerBox';
import { supabase } from '@/app/services/supabaseClient';
import { colors } from '@/app/theme';
import { Ionicons } from '@expo/vector-icons';

import * as FileSystem from 'expo-file-system/legacy';

import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = require('@/app/style');

// -------- BASE64 → ARRAYBUFFER -------- //
function base64ToArrayBuffer(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
}

// -------- UPLOAD SUPABASE (RN OFICIAL) -------- //
async function uploadImageRN(uri: string) {
  // 1️⃣ Lê arquivo como Base64
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // 2️⃣ Converte para ArrayBuffer
  const arrayBuffer = base64ToArrayBuffer(base64);

  // 3️⃣ Nome no bucket
  const fileName = `reports/${Date.now()}.jpg`;

  // 4️⃣ Envio para Supabase
  // const { error } = await supabase.storage
  //   .from("reports_images_bucket")
  //   .upload(fileName, arrayBuffer, {
  //     contentType: "image/jpeg",
  //     upsert: false,
  //   });

  // if (error) throw error;

  // // 5️⃣ Retorna URL pública
  // return supabase.storage
  //   .from("reports_images_bucket")
  //   .getPublicUrl(fileName).data.publicUrl;
}

export default function ReportScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fakeTypes = [
    "Assalto",
    "Furto",
    "Golpe",
    "Vandalismo",
    "Agressão",
    "Sequestro",
  ];

  async function handleSubmit() {
    if (!address || !type || !description) {
      Alert.alert("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;

      if (image) {
        imageUrl = await uploadImageRN(image);
      }

      const { error } = await supabase.from("reports").insert({
        title: type,
        address,
        description,
        image: imageUrl,
      });

      if (error) throw error;

      Alert.alert("Sucesso!", "Ocorrência enviada.");

      setAddress("");
      setType("");
      setDescription("");
      setImage(null);

    } catch (err: any) {
      Alert.alert("Erro ao enviar", err.message);
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header hasSearchBar={false} />

      <View style={{ padding: 20 }}>

        <Text style={styles.label}>Local da ocorrência</Text>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Digite o endereço"
            style={styles.input}
            placeholderTextColor="#aaa"
            value={address}
            onChangeText={setAddress}
          />
          <Ionicons name="search" size={30} color={colors.primary} style={{ marginRight: 8 }} />
          <Ionicons name="locate" size={30} color={colors.primary} style={{ marginRight: 12 }} />
        </View>

        <DropdownInput
          label="Tipo de ocorrência"
          data={fakeTypes}
          placeholder="Selecione"
          onSelect={(value) => setType(value)}
        />

        <ImagePickerBox
          label="Imagem"
          value={image}
          onChange={setImage}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          placeholder="Descreva o ocorrido..."
          placeholderTextColor="#aaa"
          style={styles.inputDescription}
          multiline
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? "Enviando..." : "Enviar Ocorrência"}
          </Text>
        </TouchableOpacity>
      </View>

      <BottomMenu />
    </SafeAreaView>
  );
}
