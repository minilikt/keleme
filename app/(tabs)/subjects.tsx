

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';



export default function SubjectsPage() {
  const router = useRouter();
  // TODO: Replace with real user stream
  const userStream = 'Natural';
  const [selectedSubject, setSelectedSubject] = useState<{ id: number; name: string; stream: string } | null>(null);
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

  // Real-time data state
  const [subjects, setSubjects] = useState<{ id: number; name: string; stream: string }[]>([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [topics, setTopics] = useState<string[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [years, setYears] = useState<number[]>([]);
  const [exams, setExams] = useState<{ id: number; year_of_exam: number }[]>([]);
  const [loadingYears, setLoadingYears] = useState(false);

  // Fetch subjects from DB
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoadingSubjects(true);
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .eq('stream', userStream)
        .order('name');
      setSubjects(data || []);
      setLoadingSubjects(false);
    };
    fetchSubjects();
  }, [userStream]);

  // Fetch topics and years when subject selected
  useEffect(() => {
    if (!selectedSubject) return;
    setLoadingTopics(true);
    setLoadingYears(true);
    const fetchTopics = async () => {
      const { data, error } = await supabase
        .from('topics')
        .select('name')
        .eq('subject_id', selectedSubject.id)
        .order('name');
      setTopics(data?.map(t => t.name) || []);
      setLoadingTopics(false);
    };
    const fetchYears = async () => {
      const { data, error } = await supabase
        .from('exams')
        .select('id, year_of_exam')
        .eq('subject_id', selectedSubject.id)
        .order('year_of_exam', { ascending: false });
      setYears(data?.map(y => y.year_of_exam) || []);
      setExams(data || []);
      setLoadingYears(false);
    };
    fetchTopics();
    fetchYears();
  }, [selectedSubject]);

  return (
    <View className={`flex-1 ${bgMain} p-6`}>
      <Text className={`text-2xl font-bold mb-6 ${textMain}`}>Subjects</Text>
      {!selectedSubject ? (
        loadingSubjects ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={accent} />
          </View>
        ) : (
          <ScrollView>
            <View className="flex-row flex-wrap justify-between">
              {subjects.map((subject) => (
                <TouchableOpacity
                  key={subject.id}
                  className={`${bgCard} rounded-2xl p-6 m-2 w-[45%] items-center shadow-lg`}
                  activeOpacity={0.8}
                  onPress={() => setSelectedSubject(subject)}
                >
                  <Ionicons name={getSubjectIcon(subject.name)} size={32} color={accent} />
                  <Text className={`mt-2 text-lg font-bold ${textMain}`}>{subject.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )
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
            loadingYears ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color={accent} />
              </View>
            ) : (
              <ScrollView>
                <View className="gap-4">
                  {exams.map((exam) => (
                    <TouchableOpacity
                      key={exam.id}
                      className={`${bgCard} rounded-xl p-4 flex-row items-center justify-between mb-2`}
                      activeOpacity={0.8}
                      onPress={() => router.push({ pathname: '/exam', params: { exam: JSON.stringify({ ...exam, subjects: selectedSubject }) } })}
                    >
                      <Text className={`text-lg font-bold ${textMain}`}>{exam.year_of_exam}</Text>
                      <Ionicons name="arrow-forward" size={22} color={accent} />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            )
          ) : (
            loadingTopics ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color={accent} />
              </View>
            ) : (
              <ScrollView>
                <View className="gap-4">
                  {topics.map((topic) => (
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
            )
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

// Helper to map subject names to Ionicons
function getSubjectIcon(name: string) {
  switch (name.toLowerCase()) {
    case 'math': return 'calculator-outline';
    case 'physics': return 'planet-outline';
    case 'biology': return 'leaf-outline';
    case 'chemistry': return 'flask-outline';
    case 'history': return 'book-outline';
    case 'geography': return 'map-outline';
    case 'civics': return 'people-outline';
    case 'economics': return 'cash-outline';
    case 'english': return 'book-outline';
    case 'sat': return 'school-outline';
    default: return 'ellipse-outline';
  }
}
