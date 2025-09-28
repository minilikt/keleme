import React from 'react';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';

interface ProgressBarProps {
  progress: number; // 0 to 1
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  return (
    <View className={`px-4 py-2 ${isDarkMode ? 'bg-[#23272f]' : 'bg-white'}`}> 
      <View className={`h-1.5 rounded overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}> 
        <View
          className={`h-full rounded ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'}`}
          style={{ width: `${Math.max(0, Math.min(100, progress * 100))}%` }}
        />
      </View>
    </View>
  );
}

// Tailwind styles applied via className