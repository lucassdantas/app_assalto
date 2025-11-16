import BottomMenu from '@/app/components/BottomMenu';
import Header from '@/app/components/Header';
import DropdownInput from '@/app/components/inputs/DropDownInput';
import ImagePickerBox from '@/app/components/inputs/ImagePickerBox';
import { supabase } from '@/app/services/supabaseClient';
import { colors } from '@/app/theme';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = require('@/app/style');

// -------- CONVERTE BASE64 → ARRAYBUFFER (SUPABASE RN OFICIAL) -------- //
function base64ToArrayBuffer(base64: string) {
  const binaryString = global.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// -------- UPLOAD CORRETO PARA SUPABASE STORAGE NO REACT NATIVE -------- //
async function uploadImageRN(uri: string) {
 const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: 'base64'
  });

  const arrayBuffer = base64ToArrayBuffer(base64);

  const fileName = `reports/${Date.now()}.jpg`;

  const { data, error } = await supabase.storage
    .from("reports-images")
    .upload(fileName, arrayBuffer, {
      contentType: "image/jpeg",
      upsert: false,
    });

  if (error) throw error;

  return supabase.storage
    .from("reports-images")
    .getPublicUrl(fileName).data.publicUrl;
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
    let imageUrl = null;

    try {
      // ---- SE TIVER IMAGEM, FAZ UPLOAD ---- //
      if (image) {
        imageUrl = await uploadImageRN(image);
      }

      // ---- INSERE NA TABELA REPORTS ---- //
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
      Alert.alert("Erro ao enviar", err.message || "Tente novamente.");
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
          onChange={(uri) => setImage(uri)}
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
