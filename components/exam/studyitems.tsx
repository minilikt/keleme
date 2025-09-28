import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Bookmark, StickyNote, Zap, Calendar } from 'lucide-react-native';
import { SavedQuestion, Note, Flashcard } from '@/app/(tabs)/exam';
import { useColorScheme } from 'nativewind';

interface StudyItemsListProps {
  type: 'saved' | 'notes' | 'flashcards';
  items: SavedQuestion[] | Note[] | Flashcard[];
  onItemPress: (item: any) => void;
}

export default function StudyItemsList({
  type,
  items,
  onItemPress,
}: StudyItemsListProps) {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const getIcon = () => {
    switch (type) {
      case 'saved':
        return <Bookmark size={20} color={isDarkMode ? '#a5b4fc' : '#8B5CF6'} />;
      case 'notes':
        return <StickyNote size={20} color={isDarkMode ? '#10B981' : '#10B981'} />;
      case 'flashcards':
        return <Zap size={20} color={isDarkMode ? '#F59E0B' : '#F59E0B'} />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'saved':
        return 'Saved Questions';
      case 'notes':
        return 'Your Notes';
      case 'flashcards':
        return 'Your Flashcards';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = (item: any, index: number) => {
    switch (type) {
      case 'saved':
        const savedItem = item as SavedQuestion;
        return (
          <TouchableOpacity
            key={savedItem.id}
            className={`${isDarkMode ? 'bg-[#23272f] border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-4 border shadow-sm`}
            onPress={() => onItemPress(item)}
          >
            <View className="flex-row items-center mb-2">
              <View className="mr-2">
                <Bookmark size={16} color={isDarkMode ? '#a5b4fc' : '#8B5CF6'} />
              </View>
              <Text className={`text-sm font-semibold flex-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Question {savedItem.id}</Text>
            </View>
            <Text className={`text-sm leading-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} numberOfLines={2}>
              {savedItem.questionText}
            </Text>
          </TouchableOpacity>
        );

      case 'notes':
        const noteItem = item as Note;
        return (
          <TouchableOpacity
            key={noteItem.id}
            className={`${isDarkMode ? 'bg-[#23272f] border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-4 border shadow-sm`}
            onPress={() => onItemPress(item)}
          >
            <View className="flex-row items-center mb-2">
              <View className="mr-2">
                <StickyNote size={16} color={isDarkMode ? '#10B981' : '#10B981'} />
              </View>
              <Text className={`text-sm font-semibold flex-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Question {noteItem.questionId}</Text>
              <View className="flex-row items-center gap-1">
                <Calendar size={12} color={isDarkMode ? '#a5b4fc' : '#9CA3AF'} />
                <Text className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>{formatDate(noteItem.createdAt)}</Text>
              </View>
            </View>
            <Text className={`text-sm leading-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} numberOfLines={3}>
              {noteItem.content}
            </Text>
          </TouchableOpacity>
        );

      case 'flashcards':
        const flashcardItem = item as Flashcard;
        return (
          <TouchableOpacity
            key={flashcardItem.id}
            className={`${isDarkMode ? 'bg-[#23272f] border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-4 border shadow-sm`}
            onPress={() => onItemPress(item)}
          >
            <View className="flex-row items-center mb-2">
              <View className="mr-2">
                <Zap size={16} color={isDarkMode ? '#F59E0B' : '#F59E0B'} />
              </View>
              <Text className={`text-sm font-semibold flex-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Question {flashcardItem.questionId}</Text>
              <View className="flex-row items-center gap-1">
                <Calendar size={12} color={isDarkMode ? '#a5b4fc' : '#9CA3AF'} />
                <Text className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>{formatDate(flashcardItem.createdAt)}</Text>
              </View>
            </View>
            <View className="mt-1">
              <Text className={`text-xs font-semibold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Front:</Text>
              <Text className={`text-sm leading-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} numberOfLines={2}>
                {flashcardItem.front}
              </Text>
            </View>
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  if (items.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-8">
        {getIcon()}
        <Text className={`text-lg font-semibold mt-4 mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>No {getTitle().toLowerCase()} yet</Text>
        <Text className={`text-base text-center leading-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {type === 'saved' && 'Save questions to review them later'}
          {type === 'notes' && 'Take notes on questions to remember key points'}
          {type === 'flashcards' && 'Create flashcards to study important concepts'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
      <View className={`flex-row items-center mb-4 pb-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}> 
        {getIcon()}
        <Text className={`text-lg font-semibold ml-2 flex-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{getTitle()}</Text>
        <Text className={`text-base font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>({items.length})</Text>
      </View>
      <View className="gap-3">
        {items.map((item, index) => renderItem(item, index))}
      </View>
    </ScrollView>
  );
}

// Tailwind styles applied via className