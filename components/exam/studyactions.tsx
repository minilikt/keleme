import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Bookmark, StickyNote, Zap } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

interface StudyActionsProps {
  onSaveQuestion: () => void;
  onTakeNote: () => void;
  onCreateFlashcard: () => void;
}

export default function StudyActions({
  onSaveQuestion,
  onTakeNote,
  onCreateFlashcard,
}: StudyActionsProps) {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  return (
    <View className={`flex-row justify-center py-4 px-4 gap-6 border-t ${isDarkMode ? 'bg-[#23272f] border-[#23272f]' : 'bg-white border-gray-200'}`}> 
      <TouchableOpacity className={`w-14 h-14 rounded-full justify-center items-center border-2 shadow-sm ${isDarkMode ? 'bg-[#18181b] border-gray-700' : 'bg-gray-50 border-gray-200'}`} onPress={onSaveQuestion}>
        <Bookmark size={24} color={isDarkMode ? '#a5b4fc' : '#8B5CF6'} />
      </TouchableOpacity>
      <TouchableOpacity className={`w-14 h-14 rounded-full justify-center items-center border-2 shadow-sm ${isDarkMode ? 'bg-[#18181b] border-gray-700' : 'bg-gray-50 border-gray-200'}`} onPress={onTakeNote}>
        <StickyNote size={24} color={isDarkMode ? '#10B981' : '#10B981'} />
      </TouchableOpacity>
      <TouchableOpacity className={`w-14 h-14 rounded-full justify-center items-center border-2 shadow-sm ${isDarkMode ? 'bg-[#18181b] border-gray-700' : 'bg-gray-50 border-gray-200'}`} onPress={onCreateFlashcard}>
        <Zap size={24} color={isDarkMode ? '#F59E0B' : '#F59E0B'} />
      </TouchableOpacity>
    </View>
  );
}

// Tailwind styles applied via className