
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

const SUBJECTS = [
  { name: 'Math', icon: 'calculator-outline', stream: 'Natural' },
  { name: 'Physics', icon: 'planet-outline', stream: 'Natural' },
  { name: 'Biology', icon: 'leaf-outline', stream: 'Natural' },
  { name: 'Chemistry', icon: 'flask-outline', stream: 'Natural' },
  { name: 'History', icon: 'book-outline', stream: 'Social' },
  { name: 'Geography', icon: 'map-outline', stream: 'Social' },
  { name: 'Civics', icon: 'people-outline', stream: 'Social' },
  { name: 'Economics', icon: 'cash-outline', stream: 'Social' },
];

const YEARS = [2025, 2024, 2023, 2022, 2021];
const TOPICS = {
  Math: ['Algebra', 'Geometry', 'Probability', 'Calculus'],
  Physics: ['Mechanics', 'Waves', 'Electricity', 'Modern Physics'],
  Biology: ['Genetics', 'Ecology', 'Cell Biology', 'Evolution'],
  Chemistry: ['Organic', 'Inorganic', 'Physical', 'Analytical'],
  History: ['Ancient', 'Medieval', 'Modern', 'Ethiopian'],
  Geography: ['Physical', 'Human', 'Maps', 'Climate'],
  Civics: ['Rights', 'Duties', 'Government', 'Law'],
  Economics: ['Micro', 'Macro', 'Development', 'Trade'],
};


export default function SubjectsPage() {
  // TODO: Replace with real user stream
  const userStream = 'Natural';
  const [selectedSubject, setSelectedSubject] = useState<keyof typeof TOPICS | null>(null);
  const [activeTab, setActiveTab] = useState<'years' | 'topics'>('years');
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Color palette from home/profile
  const bgMain = isDarkMode ? 'bg-[#18181b]' : 'bg-[#F0F4F8]';
  const bgCard = isDarkMode ? 'bg-[#23272f]' : 'bg-white';
  const accent = isDarkMode ? '#5CACEE' : '#3B7FBF';
  const accentTab = isDarkMode ? 'bg-[#5CACEE]' : 'bg-[#3B7FBF]';
  const textMain = isDarkMode ? 'text-gray-100' : 'text-[#2C3E50]';
  const textSub = isDarkMode ? 'text-gray-400' : 'text-[#607D8B]';

  return (
    <View className={`flex-1 ${bgMain} p-6`}>
      <Text className={`text-2xl font-bold mb-6 ${textMain}`}>Subjects</Text>
      {!selectedSubject ? (
        <ScrollView>
          <View className="flex-row flex-wrap justify-between">
            {SUBJECTS.filter(s => s.stream === userStream).map((subject) => (
              <TouchableOpacity
                key={subject.name}
                className={`${bgCard} rounded-2xl p-6 m-2 w-[45%] items-center shadow-lg`}
                activeOpacity={0.8}
                onPress={() => setSelectedSubject(subject.name as keyof typeof TOPICS)}
              >
                <Ionicons name={subject.icon as keyof typeof Ionicons.glyphMap} size={32} color={accent} />
                <Text className={`mt-2 text-lg font-bold ${textMain}`}>{subject.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1">
          {/* Tabs */}
          <View className="flex-row mb-4">
            <TouchableOpacity
              className={`flex-1 py-3 rounded-t-xl items-center ${activeTab === 'years' ? accentTab : bgCard}`}
              onPress={() => setActiveTab('years')}
            >
              <Text className={`text-lg font-bold ${activeTab === 'years' ? 'text-white' : textSub}`}>Years</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 rounded-t-xl items-center ${activeTab === 'topics' ? accentTab : bgCard}`}
              onPress={() => setActiveTab('topics')}
            >
              <Text className={`text-lg font-bold ${activeTab === 'topics' ? 'text-white' : textSub}`}>Topics</Text>
            </TouchableOpacity>
          </View>
          {/* Tab Content */}
          {activeTab === 'years' ? (
            <ScrollView>
              <View className="gap-4">
                {YEARS.map((year) => (
                  <TouchableOpacity
                    key={year}
                    className={`${bgCard} rounded-xl p-4 flex-row items-center justify-between mb-2`}
                    activeOpacity={0.8}
                    onPress={() => {/* TODO: Navigate to Exam Page for year */}}
                  >
                    <Text className={`text-lg font-bold ${textMain}`}>{year}</Text>
                    <Ionicons name="arrow-forward" size={22} color={accent} />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          ) : (
            <ScrollView>
              <View className="gap-4">
                {TOPICS[selectedSubject]?.map((topic) => (
                  <TouchableOpacity
                    key={topic}
                    className={`${bgCard} rounded-xl p-4 flex-row items-center justify-between mb-2`}
                    activeOpacity={0.8}
                    onPress={() => {/* TODO: Navigate to Exam Page for topic */}}
                  >
                    <Text className={`text-lg font-bold ${textMain}`}>{topic}</Text>
                    <Ionicons name="arrow-forward" size={22} color={accent} />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}
          {/* Back Button */}
          <TouchableOpacity className="mt-6 items-center" onPress={() => setSelectedSubject(null)}>
            <Text className={`text-base ${textSub}`}>Back to Subjects</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
