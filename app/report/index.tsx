import BottomMenu from '@/app/components/BottomMenu';
import Header from '@/app/components/Header';
import DropdownInput from '@/app/components/inputs/DropDownInput';
import ImagePickerBox from '@/app/components/inputs/ImagePickerBox';
import { colors } from '@/app/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  return (
    <SafeAreaView style={styles.container}>
      <Header hasSearchBar={false}/>

      <View style={{ padding: 20 }}>

        {/* --------- INPUT 1: Local da ocorrência --------- */}
        <Text style={styles.label}>Local da ocorrência</Text>

        <View style={styles.inputRow}>
          <TextInput
            placeholder=""
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <Ionicons name="search" size={30} color={colors.primary} style={{ marginRight: 8 }} />
          <Ionicons name="locate" size={30} color={colors.primary} style={{ marginRight: 12 }} />
        </View>

        {/* --------- INPUT 2: Tipo de ocorrência (select fake) --------- */}

       <DropdownInput
          label="Tipo de ocorrência"
          data={fakeTypes}
          placeholder=""
          onSelect={(value) => console.log("Selecionado:", value)}
        />


        <ImagePickerBox
          label="Imagem"
          value={image}
          onChange={(uri) => setImage(uri)}
        />


        {/* --------- INPUT 4: Descrição --------- */}
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          placeholderTextColor="#aaa"
          style={styles.inputDescription}
          multiline
          textAlignVertical='top'
        />

        {/* --------- BOTÃO ENVIAR --------- */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Enviar Ocorrência</Text>
        </TouchableOpacity>
      </View>

      <BottomMenu />
    </SafeAreaView>
  );
}
