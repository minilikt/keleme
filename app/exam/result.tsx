import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function ExamResultScreen() {
  const { examId } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Get user id from auth
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !examId) return setLoading(false);
      // Fetch exam result
      const { data: resultData } = await supabase
        .from('exam_results')
        .select('*')
        .eq('user_id', user.id)
        .eq('exam_id', examId)
        .order('completed_at', { ascending: false })
        .limit(1)
        .single();
      setResult(resultData);
      // Fetch all questions for this exam
      const { data: questionsData } = await supabase
        .from('questions')
        .select('*')
        .eq('exam_id', examId);
      setQuestions(questionsData || []);
      setLoading(false);
    };
    fetchData();
  }, [examId]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <ActivityIndicator size="large" color="#5CACEE" />
      </View>
    );
  }
  if (!result) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <Text className="text-white text-xl">No result found.</Text>
      </View>
    );
  }
  // Prepare filtered questions
  const correctIds = Object.entries(result.answers || {}).filter(([_, status]) => status === 'right').map(([qid]) => Number(qid));
  const wrongIds = Object.entries(result.answers || {}).filter(([_, status]) => status === 'wrong').map(([qid]) => Number(qid));

  let filteredQuestions = questions;
  if (activeTab === 'Correct') {
    filteredQuestions = questions.filter(q => correctIds.includes(q.id));
  } else if (activeTab === 'Wrong') {
    filteredQuestions = questions.filter(q => wrongIds.includes(q.id));
  }

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-[#18181b]' : 'bg-gray-50'}`}>
      <ScrollView className="p-4">
        <Text className="text-2xl font-bold mb-2" style={{ color: isDarkMode ? '#fff' : '#222' }}>Exam Results</Text>
        <Text className="text-base mb-2" style={{ color: isDarkMode ? '#a5b4fc' : '#333' }}>Score: {result.result}%</Text>
        <Text className="text-base mb-2" style={{ color: isDarkMode ? '#a5b4fc' : '#333' }}>Time Taken: {result.time_taken} seconds</Text>
        <Text className="text-base mb-4" style={{ color: isDarkMode ? '#a5b4fc' : '#333' }}>Completed At: {result.completed_at}</Text>
        {/* Tabs */}
        <View className="flex-row mb-4">
          {['All', 'Correct', 'Wrong'].map(tab => (
            <TouchableOpacity
              key={tab}
              className={`flex-1 py-2 rounded-lg mx-1 ${activeTab === tab ? (isDarkMode ? 'bg-blue-700' : 'bg-blue-200') : (isDarkMode ? 'bg-[#23272f]' : 'bg-gray-200')}`}
              onPress={() => setActiveTab(tab)}
            >
              <Text className="text-center font-semibold" style={{ color: activeTab === tab ? '#fff' : isDarkMode ? '#a5b4fc' : '#333' }}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Questions */}
        {filteredQuestions.length === 0 ? (
          <Text className="text-gray-400 text-center">No questions found.</Text>
        ) : (
          filteredQuestions.map((q, idx) => {
            const status = result.answers?.[q.id] || 'unanswered';
            return (
              <View key={q.id} className={`mb-4 p-4 rounded-xl ${isDarkMode ? 'bg-[#23272f]' : 'bg-gray-100'}`}
                style={{ borderLeftWidth: 6, borderLeftColor: status === 'right' ? '#10B981' : status === 'wrong' ? '#EF4444' : '#6B7280' }}>
                <Text className="font-bold mb-1" style={{ color: isDarkMode ? '#fff' : '#222' }}>Q{idx + 1}: {q.question}</Text>
                <View className="mb-2">
                  {[q.choice_a, q.choice_b, q.choice_c, q.choice_d].map((opt, i) => (
                    <Text key={i} className="ml-2" style={{ color: isDarkMode ? '#a5b4fc' : '#333' }}>
                      {String.fromCharCode(65 + i)}. {opt}
                    </Text>
                  ))}
                </View>
                <Text className="font-semibold" style={{ color: status === 'right' ? '#10B981' : status === 'wrong' ? '#EF4444' : '#6B7280' }}>
                  {status === 'right' ? 'Correct' : status === 'wrong' ? 'Wrong' : 'Unanswered'}
                </Text>
                {q.explanation && (
                  <Text className="mt-2 text-sm" style={{ color: isDarkMode ? '#a5b4fc' : '#333' }}>Explanation: {q.explanation}</Text>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
