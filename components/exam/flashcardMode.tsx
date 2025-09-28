import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { X, Save } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

interface FlashcardModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (front: string, back: string) => void;
  questionText: string;
}

export default function FlashcardModal({
  visible,
  onClose,
  onSave,
  questionText,
}: FlashcardModalProps) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleSave = () => {
    if (front.trim() && back.trim()) {
      onSave(front.trim(), back.trim());
      setFront('');
      setBack('');
    }
  };

  const handleClose = () => {
    setFront('');
    setBack('');
    onClose();
  };

  const canSave = front.trim() && back.trim();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className={`${isDarkMode ? 'bg-[#23272f]' : 'bg-white'} rounded-2xl w-[90%] max-h-[80%] shadow-lg`}>
          <View className={`flex-row justify-between items-center p-5 border-b ${isDarkMode ? 'border-[#23272f]' : 'border-gray-200'}`}>
            <Text className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Create Flashcard</Text>
            <TouchableOpacity className="p-1" onPress={handleClose}>
              <X size={24} color={isDarkMode ? '#a5b4fc' : '#374151'} />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 p-5">
            <View className="mb-5">
              <Text className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Question:</Text>
              <Text className={`text-base leading-6 p-3 rounded-lg ${isDarkMode ? 'text-gray-400 bg-[#18181b]' : 'text-gray-500 bg-gray-50'}`}>{questionText}</Text>
            </View>

            <View className="mb-5">
              <Text className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Front of Card:</Text>
              <TextInput
                className={`rounded-lg p-3 text-base min-h-[80px] ${isDarkMode ? 'border border-gray-700 text-gray-200 bg-[#18181b]' : 'border border-gray-300 text-gray-900 bg-white'}`}
                multiline
                numberOfLines={4}
                placeholder="What will be shown on the front of the flashcard?"
                value={front}
                onChangeText={setFront}
                textAlignVertical="top"
                placeholderTextColor={isDarkMode ? '#6B7280' : undefined}
              />
            </View>

            <View className="mb-5">
              <Text className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Back of Card:</Text>
              <TextInput
                className={`rounded-lg p-3 text-base min-h-[80px] ${isDarkMode ? 'border border-gray-700 text-gray-200 bg-[#18181b]' : 'border border-gray-300 text-gray-900 bg-white'}`}
                multiline
                numberOfLines={4}
                placeholder="What will be shown on the back of the flashcard?"
                value={back}
                onChangeText={setBack}
                textAlignVertical="top"
                placeholderTextColor={isDarkMode ? '#6B7280' : undefined}
              />
            </View>
          </ScrollView>

          <View className={`flex-row justify-between p-5 border-t ${isDarkMode ? 'border-[#23272f]' : 'border-gray-200'}`}>
            <TouchableOpacity className={`py-3 px-6 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} onPress={handleClose}>
              <Text className={`text-base font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-row items-center py-3 px-6 rounded-lg bg-yellow-500 ${!canSave ? 'opacity-50' : ''}`}
              onPress={handleSave}
              disabled={!canSave}
            >
              <Save size={20} color="#FFFFFF" />
              <Text className="text-base font-semibold text-white ml-2">Create Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
