import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useColorScheme } from 'nativewind';

const steps = [
  'Username',
  'Type',
  'Grade',
  'Goal',
  'Status',
  'StudyHistory',
];

const typeOptions = ['Natural', 'Social'];
const gradeOptions = ['9', '10', '11', '12'];
const goalOptions = ['Score High', 'Pass', 'Improve'];
const statusOptions = ['Active', 'Inactive', 'Returning'];
const studyOptions = ['None', 'Some', 'A lot'];

export default function OnboardingScreen() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    username: '',
    type: '',
    grade: '',
    goal: '',
    status: '',
    studyHistory: '',
  });

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // TODO: Save onboarding data and redirect to home
    }
  };

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-[#18181b]' : 'bg-gray-50'} p-6`}>
      <ScrollView>
        <Text className="text-2xl font-bold mb-6" style={{ color: isDarkMode ? '#fff' : '#222' }}>Welcome! Let's get to know you</Text>
        {/* Stepper */}
        <View className="flex-row mb-8 justify-center">
          {steps.map((s, i) => (
            <View key={s} className={`w-3 h-3 mx-1 rounded-full ${i === step ? (isDarkMode ? 'bg-blue-400' : 'bg-blue-600') : (isDarkMode ? 'bg-gray-700' : 'bg-gray-300')}`} />
          ))}
        </View>
        {/* Step Content */}
        {step === 0 && (
          <View className="mb-8">
            <Text className="text-lg mb-2" style={{ color: isDarkMode ? '#a5b4fc' : '#333' }}>What's your username?</Text>
            <TextInput
              className={`p-3 rounded-lg ${isDarkMode ? 'bg-[#23272f] text-white' : 'bg-gray-200 text-black'}`}
              value={form.username}
              onChangeText={v => handleChange('username', v)}
              placeholder="Enter username"
              placeholderTextColor={isDarkMode ? '#a5b4fc' : '#888'}
            />
          </View>
        )}
        {step === 1 && (
          <View className="mb-8">
            <Text className="text-lg mb-2" style={{ color: isDarkMode ? '#a5b4fc' : '#333' }}>Are you Natural or Social?</Text>
            <View className="flex-row">
              {typeOptions.map(opt => (
                <TouchableOpacity
                  key={opt}
                  className={`flex-1 p-3 m-1 rounded-lg ${form.type === opt ? (isDarkMode ? 'bg-blue-700' : 'bg-blue-200') : (isDarkMode ? 'bg-[#23272f]' : 'bg-gray-200')}`}
                  onPress={() => handleChange('type', opt)}
                >
                  <Text className="text-center font-semibold" style={{ color: form.type === opt ? '#fff' : isDarkMode ? '#a5b4fc' : '#333' }}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {step === 2 && (
          <View className="mb-8">
            <Text className="text-lg mb-2" style={{ color: isDarkMode ? '#a5b4fc' : '#333' }}>What grade are you in?</Text>
            <View className="flex-row flex-wrap">
              {gradeOptions.map(opt => (
                <TouchableOpacity
                  key={opt}
                  className={`p-3 m-1 rounded-lg ${form.grade === opt ? (isDarkMode ? 'bg-blue-700' : 'bg-blue-200') : (isDarkMode ? 'bg-[#23272f]' : 'bg-gray-200')}`}
                  onPress={() => handleChange('grade', opt)}
                >
                  <Text className="text-center font-semibold" style={{ color: form.grade === opt ? '#fff' : isDarkMode ? '#a5b4fc' : '#333' }}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {step === 3 && (
          <View className="mb-8">
            <Text className="text-lg mb-2" style={{ color: isDarkMode ? '#a5b4fc' : '#333' }}>What's your main goal?</Text>
            <View className="flex-row flex-wrap">
              {goalOptions.map(opt => (
                <TouchableOpacity
                  key={opt}
                  className={`p-3 m-1 rounded-lg ${form.goal === opt ? (isDarkMode ? 'bg-blue-700' : 'bg-blue-200') : (isDarkMode ? 'bg-[#23272f]' : 'bg-gray-200')}`}
                  onPress={() => handleChange('goal', opt)}
                >
                  <Text className="text-center font-semibold" style={{ color: form.goal === opt ? '#fff' : isDarkMode ? '#a5b4fc' : '#333' }}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {step === 4 && (
          <View className="mb-8">
            <Text className="text-lg mb-2" style={{ color: isDarkMode ? '#a5b4fc' : '#333' }}>What's your current status?</Text>
            <View className="flex-row flex-wrap">
              {statusOptions.map(opt => (
                <TouchableOpacity
                  key={opt}
                  className={`p-3 m-1 rounded-lg ${form.status === opt ? (isDarkMode ? 'bg-blue-700' : 'bg-blue-200') : (isDarkMode ? 'bg-[#23272f]' : 'bg-gray-200')}`}
                  onPress={() => handleChange('status', opt)}
                >
                  <Text className="text-center font-semibold" style={{ color: form.status === opt ? '#fff' : isDarkMode ? '#a5b4fc' : '#333' }}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {step === 5 && (
          <View className="mb-8">
            <Text className="text-lg mb-2" style={{ color: isDarkMode ? '#a5b4fc' : '#333' }}>How much have you studied in the past?</Text>
            <View className="flex-row flex-wrap">
              {studyOptions.map(opt => (
                <TouchableOpacity
                  key={opt}
                  className={`p-3 m-1 rounded-lg ${form.studyHistory === opt ? (isDarkMode ? 'bg-blue-700' : 'bg-blue-200') : (isDarkMode ? 'bg-[#23272f]' : 'bg-gray-200')}`}
                  onPress={() => handleChange('studyHistory', opt)}
                >
                  <Text className="text-center font-semibold" style={{ color: form.studyHistory === opt ? '#fff' : isDarkMode ? '#a5b4fc' : '#333' }}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        <TouchableOpacity
          className={`w-full py-3 rounded-lg mt-4 ${isDarkMode ? 'bg-blue-700' : 'bg-blue-600'}`}
          onPress={handleNext}
        >
          <Text className="text-center text-white font-bold text-lg">{step < steps.length - 1 ? 'Next' : 'Finish'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
