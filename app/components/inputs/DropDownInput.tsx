import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = require('@/app/style');

type Props = {
  label?: string;
  data: string[];
  placeholder?: string;
  onSelect: (value: string) => void;
};

export default function DropdownInput({ label, data, placeholder, onSelect }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const openDropdown = () => {
    setOpen(true);
    setFilteredData(data);
  };

  const closeDropdown = () => {
    setOpen(false);
    setFilteredData([]);
  };

  const filterItems = (value: string) => {
    setInputValue(value);

    if (value.trim() === '') {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    closeDropdown();
    onSelect(value);
  };

  return (
    <View style={{ marginBottom: 20 }}>
      {label && <Text style={styles.label}>{label}</Text>}

      {/* INPUT ROW */}
      <TouchableOpacity onPress={openDropdown} activeOpacity={1}>
        <View style={[styles.inputRow, { zIndex: 30 }]}>
          <TouchableOpacity onPress={openDropdown}>
            <Ionicons name="chevron-down" size={20} color="#777" style={{ marginRight: 6 }} />
          </TouchableOpacity>

          <TextInput
            value={inputValue}
            onFocus={openDropdown}
            onChangeText={filterItems}
            placeholder={placeholder}
            placeholderTextColor="#aaa"
            style={[styles.input, { paddingVertical: 8 }]}
          />
        </View>
      </TouchableOpacity>

      {/* DROPDOWN */}
      {open && (
        <View
          style={{
            position: 'absolute',
            top: 65,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            maxHeight: 180,
            zIndex: 50,
            overflow: 'hidden',
            elevation: 6,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
        >
          <FlatList
            data={filteredData}
            nestedScrollEnabled
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <Text style={styles.dropdownItem}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* OVERLAY — AGORA ELE VEM POR ÚLTIMO! */}
      {open && (
        <Pressable
          onPress={closeDropdown}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: -1000,
            zIndex: 10,
          }}
        />
      )}
    </View>
  );
}
