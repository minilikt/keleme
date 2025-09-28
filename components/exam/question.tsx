import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Flag, Circle, CheckCircle2 } from 'lucide-react-native';
import { QuestionData } from './data';
import { useColorScheme } from 'nativewind';

interface QuestionProps {
  question: QuestionData;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: number;
  onAnswerSelect: (optionIndex: number) => void;
  onFlag: () => void;
  isFlagged: boolean;
}

export default function Question({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onFlag,
  isFlagged,
}: QuestionProps) {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="flex-row justify-between items-center mb-5">
        <Text className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Question {questionNumber} of {totalQuestions}</Text>
        <TouchableOpacity
          className={`p-2 rounded-lg border-2 ${isFlagged ? 'bg-yellow-500 border-yellow-500' : (isDarkMode ? 'bg-[#23272f] border-yellow-500' : 'bg-white border-yellow-500')}`}
          onPress={onFlag}
        >
          <Flag size={20} color={isFlagged ? '#FFFFFF' : '#F59E0B'} />
        </TouchableOpacity>
      </View>

      <Text className={`text-lg font-medium leading-7 mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{question.text}</Text>

      <View className="gap-3">
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={`border-2 rounded-xl p-4 ${isDarkMode ? 'bg-[#23272f]' : 'bg-white'} ${selectedAnswer === index ? (isDarkMode ? 'border-blue-400 bg-blue-950' : 'border-blue-500 bg-blue-100') : (isDarkMode ? 'border-gray-700' : 'border-gray-200')}`}
            onPress={() => onAnswerSelect(index)}
          >
            <View className="flex-row items-start">
              <View className="mr-3 mt-0.5">
                {selectedAnswer === index ? (
                  <CheckCircle2 size={24} color={isDarkMode ? '#a5b4fc' : '#3B82F6'} />
                ) : (
                  <Circle size={24} color={isDarkMode ? '#6B7280' : '#9CA3AF'} />
                )}
              </View>
              <View className="flex-1 flex-row">
                <Text className={`text-base font-semibold mr-2 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{String.fromCharCode(65 + index)}.</Text>
                <Text className={`text-base leading-6 flex-1 ${selectedAnswer === index ? (isDarkMode ? 'text-blue-400 font-medium' : 'text-blue-800 font-medium') : (isDarkMode ? 'text-gray-200' : 'text-gray-700')}`}>{option}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// Tailwind styles applied via className