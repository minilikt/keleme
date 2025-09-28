import React from 'react';
import { View, Text } from 'react-native';
import { Clock } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

interface TimerProps {
  timeLeft: number; // in seconds
}

export default function Timer({ timeLeft }: TimerProps) {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const isUrgent = timeLeft <= 300; // Last 5 minutes
  const isCritical = timeLeft <= 60; // Last 1 minute

  const getTimerColor = () => {
    if (isCritical) return '#EF4444';
    if (isUrgent) return '#F59E0B';
    return isDarkMode ? '#a5b4fc' : '#10B981';
  };

  return (
    <View className={`flex-row items-center px-3 py-1.5 rounded-xl ${isDarkMode ? 'bg-[#23272f]' : 'bg-gray-100'}`}> 
      <Clock size={18} color={getTimerColor()} />
      <Text className="ml-1.5 text-base font-semibold" style={{ color: getTimerColor(), fontFamily: 'monospace' }}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </Text>
    </View>
  );
}

