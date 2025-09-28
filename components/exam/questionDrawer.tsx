import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { X, CheckCircle, Flag, Circle, ArrowRight } from 'lucide-react-native';
import { Bookmark, StickyNote, Zap } from 'lucide-react-native';
import { QuestionData, QuestionStatus } from './data';
import StudyItemsList from './studyitems';
import { Flashcard, Note, SavedQuestion } from '@/app/(tabs)/exam';
import { useColorScheme } from 'nativewind';

interface QuestionDrawerProps {
  questions: QuestionData[];
  currentIndex: number;
  getQuestionStatus: (index: number) => QuestionStatus;
  onQuestionSelect: (index: number) => void;
  onClose: () => void;
  savedQuestions: SavedQuestion[];
  notes: Note[];
  flashcards: Flashcard[];
}

export default function QuestionDrawer({
  questions,
  currentIndex,
  getQuestionStatus,
  onQuestionSelect,
  onClose,
  savedQuestions,
  notes,
  flashcards,
}: QuestionDrawerProps) {
  const [activeTab, setActiveTab] = useState<'questions' | 'saved' | 'notes' | 'flashcards'>('questions');
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const getStatusIcon = (status: QuestionStatus) => {
    switch (status) {
      case 'answered':
        return <CheckCircle size={20} color="#10B981" />;
      case 'flagged':
        return <Flag size={20} color="#F59E0B" />;
      case 'current':
        return <ArrowRight size={20} color={isDarkMode ? '#a5b4fc' : '#3B82F6'} />;
      default:
        return <Circle size={20} color={isDarkMode ? '#6B7280' : '#9CA3AF'} />;
    }
  };

  const getStatusColor = (status: QuestionStatus) => {
    switch (status) {
      case 'answered':
        return '#10B981';
      case 'flagged':
        return '#F59E0B';
      case 'current':
        return isDarkMode ? '#a5b4fc' : '#3B82F6';
      default:
        return isDarkMode ? '#6B7280' : '#9CA3AF';
    }
  };

  return (
    <View className="flex-1 bg-black/50">
      <TouchableOpacity className="flex-1" onPress={onClose} />
      <View className={`${isDarkMode ? 'bg-[#23272f]' : 'bg-white'} rounded-t-2xl pt-5 pb-10 max-h-[80%]`}>
        <View className="flex-row justify-between items-center px-5 mb-5">
          <Text className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Study Dashboard</Text>
          <TouchableOpacity className="p-1" onPress={onClose}>
            <X size={24} color={isDarkMode ? '#a5b4fc' : '#374151'} />
          </TouchableOpacity>
        </View>

        <View className={`flex-row ${isDarkMode ? 'bg-[#23272f]' : 'bg-gray-100'} m-4 rounded-lg p-1`}>
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-2 px-3 rounded ${activeTab === 'questions' ? (isDarkMode ? 'bg-blue-950' : 'bg-blue-500') : ''}`}
            onPress={() => setActiveTab('questions')}
          >
            <Text className={`text-xs font-medium ${activeTab === 'questions' ? 'text-white' : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`}>Questions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-2 px-3 rounded gap-1 ${activeTab === 'saved' ? (isDarkMode ? 'bg-blue-950' : 'bg-blue-500') : ''}`}
            onPress={() => setActiveTab('saved')}
          >
            <Bookmark size={16} color={activeTab === 'saved' ? '#FFFFFF' : (isDarkMode ? '#a5b4fc' : '#6B7280')} />
            <Text className={`text-xs font-medium ${activeTab === 'saved' ? 'text-white' : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`}>Saved ({savedQuestions.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-2 px-3 rounded gap-1 ${activeTab === 'notes' ? (isDarkMode ? 'bg-blue-950' : 'bg-blue-500') : ''}`}
            onPress={() => setActiveTab('notes')}
          >
            <StickyNote size={16} color={activeTab === 'notes' ? '#FFFFFF' : (isDarkMode ? '#10B981' : '#6B7280')} />
            <Text className={`text-xs font-medium ${activeTab === 'notes' ? 'text-white' : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`}>Notes ({notes.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-2 px-3 rounded gap-1 ${activeTab === 'flashcards' ? (isDarkMode ? 'bg-blue-950' : 'bg-blue-500') : ''}`}
            onPress={() => setActiveTab('flashcards')}
          >
            <Zap size={16} color={activeTab === 'flashcards' ? '#FFFFFF' : (isDarkMode ? '#F59E0B' : '#6B7280')} />
            <Text className={`text-xs font-medium ${activeTab === 'flashcards' ? 'text-white' : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`}>Cards ({flashcards.length})</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'questions' && (
          <>
            <View className={`flex-row justify-around px-5 mb-5 py-3 ${isDarkMode ? 'bg-[#18181b]' : 'bg-gray-50'} mx-5 rounded-lg`}>
              <View className="flex-row items-center">
                <CheckCircle size={16} color="#10B981" />
                <Text className={`ml-1 text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Answered</Text>
              </View>
              <View className="flex-row items-center">
                <Flag size={16} color="#F59E0B" />
                <Text className={`ml-1 text-xs ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Flagged</Text>
              </View>
              <View className="flex-row items-center">
                <Circle size={16} color={isDarkMode ? '#6B7280' : '#9CA3AF'} />
                <Text className={`ml-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>Unanswered</Text>
              </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              <View className="flex-row flex-wrap px-5 gap-3">
                {questions.map((_, index) => {
                  const status = getQuestionStatus(index);
                  return (
                    <TouchableOpacity
                      key={index}
                      className={`w-[22%] aspect-square border-2 rounded-xl shadow-sm ${isDarkMode ? 'bg-[#23272f]' : 'bg-white'} ${status === 'current' ? (isDarkMode ? 'bg-blue-950' : 'bg-blue-100') : ''}`}
                      style={{ borderColor: getStatusColor(status) }}
                      onPress={() => onQuestionSelect(index)}
                    >
                      <View className="flex-1 justify-center items-center relative">
                        <Text className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : ''}`} style={{ color: getStatusColor(status) }}>{index + 1}</Text>
                        <View className="absolute top-1 right-1">
                          {getStatusIcon(status)}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </>
        )}

        {activeTab === 'saved' && (
          <StudyItemsList
            type="saved"
            items={savedQuestions}
            onItemPress={() => {}}
          />
        )}

        {activeTab === 'notes' && (
          <StudyItemsList
            type="notes"
            items={notes}
            onItemPress={() => {}}
          />
        )}

        {activeTab === 'flashcards' && (
          <StudyItemsList
            type="flashcards"
            items={flashcards}
            onItemPress={() => {}}
          />
        )}
      </View>
    </View>
  );
}

// Tailwind styles applied via className