import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { BookOpen, Calendar, BarChart2, Target, Clock, Award, ChevronRight, Play } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

const HomeScreen = () => {
  const [studyStreak, setStudyStreak] = useState(7);
  const [hoursStudied, setHoursStudied] = useState(24);
  const [subjects] = useState([
    { id: 1, name: 'Mathematics', progress: 75, color: '#3B7FBF' },
    { id: 2, name: 'Physics', progress: 60, color: '#5CACEE' },
    { id: 3, name: 'Chemistry', progress: 45, color: '#FFC107' },
    { id: 4, name: 'Biology', progress: 90, color: '#4CAF50' },
  ]);
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const upcomingExams = [
    { id: 1, subject: 'Mathematics', date: 'May 15', time: '10:00 AM' },
    { id: 2, subject: 'Physics', date: 'May 18', time: '2:00 PM' },
  ];

  const studyMaterials = [
    { id: 1, title: 'Algebra Basics', type: 'Flashcards', progress: 80 },
    { id: 2, title: 'Calculus Fundamentals', type: 'Practice Test', progress: 45 },
    { id: 3, title: 'Trigonometry Rules', type: 'Notes', progress: 100 },
  ];

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-[#18181b]' : 'bg-[#F0F4F8]'}`}>
      {/* Header */}
      <View className={`${isDarkMode ? 'bg-[#23272f]' : 'bg-[#3B7FBF]'} pt-12 pb-6 px-4 rounded-b-3xl`}>
        <View className="flex-row justify-between items-center">
          <View>
            <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>Welcome back,</Text>
            <Text className={`text-xl ${isDarkMode ? 'text-white' : 'text-white'}`}>Alex Morgan</Text>
          </View>
          <TouchableOpacity className={`${isDarkMode ? 'bg-[#23272f]' : 'bg-[#5CACEE]'} p-3 rounded-full`}>
            <Award size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* Stats */}
        <View className="flex-row justify-between mt-6">
          <View className={`${isDarkMode ? 'bg-white/10' : 'bg-white/20'} p-3 rounded-xl items-center flex-1 mr-2`}>
            <Text className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>{studyStreak}</Text>
            <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-white'}`}>Day Streak</Text>
          </View>
          <View className={`${isDarkMode ? 'bg-white/10' : 'bg-white/20'} p-3 rounded-xl items-center flex-1 mx-2`}>
            <Text className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>{hoursStudied}</Text>
            <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-white'}`}>Hours Studied</Text>
          </View>
          <View className={`${isDarkMode ? 'bg-white/10' : 'bg-white/20'} p-3 rounded-xl items-center flex-1 ml-2`}>
            <Text className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>4</Text>
            <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-white'}`}>Subjects</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
        {/* Progress Overview */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-[#2C3E50]'}`}>Your Progress</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className={`${isDarkMode ? 'text-[#a5b4fc]' : 'text-[#3B7FBF]'} mr-1`}>View All</Text>
              <ChevronRight color={isDarkMode ? '#a5b4fc' : '#3B7FBF'} size={16} />
            </TouchableOpacity>
          </View>
          <View className={`${isDarkMode ? 'bg-[#23272f]' : 'bg-white'} rounded-2xl p-4 ${isDarkMode ? '' : 'shadow-sm'}`}> 
            {subjects.map((subject) => (
              <View key={subject.id} className="mb-4">
                <View className="flex-row justify-between mb-1">
                  <Text className={`${isDarkMode ? 'text-gray-200' : 'text-[#2C3E50]'} font-medium`}>{subject.name}</Text>
                  <Text className={`${isDarkMode ? 'text-gray-400' : 'text-[#607D8B]'}`}>{subject.progress}%</Text>
                </View>
                <View className={`h-3 ${isDarkMode ? 'bg-[#23272f]' : 'bg-[#E0E7EE]'} rounded-full overflow-hidden`}>
                  <View 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${subject.progress}%`, 
                      backgroundColor: subject.color 
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Exams */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-[#2C3E50]'}`}>Upcoming Exams</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className={`${isDarkMode ? 'text-[#a5b4fc]' : 'text-[#3B7FBF]'} mr-1`}>View All</Text>
              <ChevronRight color={isDarkMode ? '#a5b4fc' : '#3B7FBF'} size={16} />
            </TouchableOpacity>
          </View>
          <View className={`${isDarkMode ? 'bg-[#23272f]' : 'bg-white'} rounded-2xl overflow-hidden ${isDarkMode ? '' : 'shadow-sm'}`}> 
            {upcomingExams.map((exam, index) => (
              <TouchableOpacity 
                key={exam.id} 
                className={`flex-row items-center p-4 ${index !== upcomingExams.length - 1 ? (isDarkMode ? 'border-b border-[#23272f]' : 'border-b border-[#E0E7EE]') : ''}`}
              >
                <View className={`p-3 rounded-xl mr-4 ${isDarkMode ? 'bg-[#23272f]' : 'bg-[#3B7FBF]/10'}`}>
                  <Calendar color={isDarkMode ? '#a5b4fc' : '#3B7FBF'} size={24} />
                </View>
                <View className="flex-1">
                  <Text className={`font-bold text-base ${isDarkMode ? 'text-gray-200' : 'text-[#2C3E50]'}`}>{exam.subject}</Text>
                  <Text className={`${isDarkMode ? 'text-gray-400' : 'text-[#607D8B]'}`}>{exam.date} at {exam.time}</Text>
                </View>
                <TouchableOpacity className={`${isDarkMode ? 'bg-[#23272f]' : 'bg-[#5CACEE]'} p-2 rounded-full`}>
                  <Play size={16} color="white" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Study Materials */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-[#2C3E50]'}`}>Study Materials</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className={`${isDarkMode ? 'text-[#a5b4fc]' : 'text-[#3B7FBF]'} mr-1`}>View All</Text>
              <ChevronRight color={isDarkMode ? '#a5b4fc' : '#3B7FBF'} size={16} />
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap gap-4">
            {studyMaterials.map((material) => (
              <TouchableOpacity 
                key={material.id} 
                className={`${isDarkMode ? 'bg-[#23272f]' : 'bg-white'} rounded-2xl p-4 flex-1 min-w-[45%]`}
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View className="bg-[#FFC107]/10 p-2 rounded-lg">
                    <BookOpen color="#FFC107" size={20} />
                  </View>
                  <Text className={`${isDarkMode ? 'text-[#a5b4fc]' : 'text-[#3B7FBF]'} text-sm font-medium`}>{material.type}</Text>
                </View>
                <Text className={`font-bold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-[#2C3E50]'}`}>{material.title}</Text>
                <View className="flex-row items-center">
                  <View className={`h-2 flex-1 ${isDarkMode ? 'bg-[#23272f]' : 'bg-[#E0E7EE]'} rounded-full overflow-hidden mr-2`}>
                    <View 
                      className={`h-full bg-[#3B7FBF] rounded-full`} 
                      style={{ width: `${material.progress}%` }}
                    />
                  </View>
                  <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-[#607D8B]'}`}>{material.progress}%</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Daily Goal */}
        <View className={`${isDarkMode ? 'bg-[#23272f]' : 'bg-white'} rounded-2xl p-4 mb-6 ${isDarkMode ? '' : 'shadow-sm'}`}> 
          <View className="flex-row justify-between items-center mb-3">
            <Text className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-[#2C3E50]'}`}>Daily Goal</Text>
            <Text className={`font-bold ${isDarkMode ? 'text-[#a5b4fc]' : 'text-[#3B7FBF]'}`}>2/3 completed</Text>
          </View>
          <View className="flex-row items-center">
            <View className="bg-[#4CAF50] p-2 rounded-full mr-3">
              <Target color="white" size={20} />
            </View>
            <View className="flex-1">
              <Text className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-[#2C3E50]'}`}>Study for 3 hours</Text>
              <View className="flex-row items-center mt-1">
                <View className={`h-2 flex-1 ${isDarkMode ? 'bg-[#23272f]' : 'bg-[#E0E7EE]'} rounded-full overflow-hidden mr-2`}>
                  <View className="h-full bg-[#4CAF50] rounded-full" style={{ width: '66%' }} />
                </View>
                <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-[#607D8B]'}`}>2h</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;