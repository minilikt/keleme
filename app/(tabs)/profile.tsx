import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { useColorScheme } from 'nativewind';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  HelpCircle, 
  Info, 
  LogOut, 
  ChevronRight,
  Edit3,
  Moon,
  Volume2,
  Wifi,
  Lock,
  Mail,
  Smartphone
} from 'lucide-react-native';

const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const user = {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    joinDate: "January 2023",
    streak: 15,
    achievements: 8
  };

  const settingsSections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Edit Profile", value: "", hasArrow: true },
        { icon: Mail, label: "Email", value: user.email, hasArrow: true },
        { icon: Lock, label: "Password", value: "••••••••", hasArrow: true },
        { icon: Smartphone, label: "Phone Number", value: "+1 (555) 123-4567", hasArrow: true }
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", value: "", hasSwitch: true, switchValue: notificationsEnabled, onToggle: () => setNotificationsEnabled(!notificationsEnabled) },
        { icon: Moon, label: "Dark Mode", value: "", hasSwitch: true, switchValue: isDarkMode, onToggle: toggleColorScheme },
        { icon: Volume2, label: "Sound Effects", value: "", hasSwitch: true, switchValue: soundEnabled, onToggle: () => setSoundEnabled(!soundEnabled) },
        { icon: Wifi, label: "Wi-Fi Only", value: "", hasSwitch: true, switchValue: wifiOnly, onToggle: () => setWifiOnly(!wifiOnly) }
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", value: "", hasArrow: true },
        { icon: Shield, label: "Privacy Policy", value: "", hasArrow: true },
        { icon: Info, label: "About", value: "", hasArrow: true }
      ]
    }
  ];

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive" }
      ]
    );
  };

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-[#18181b]' : 'bg-[#F0F4F8]'}`}>
      {/* Header */}
      <View className={`${isDarkMode ? 'bg-[#23272f]' : 'bg-[#3B7FBF]'} pt-12 pb-6 px-4 rounded-b-3xl`}>
        <View className="items-center">
          <View className={`w-24 h-24 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-white/20'} items-center justify-center mb-4`}>
            <Image 
              source={{ uri: user.avatar }} 
              className="w-20 h-20 rounded-full"
            />
          </View>
          <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>{user.name}</Text>
          <Text className={`${isDarkMode ? 'text-gray-400' : 'text-white/80'} mt-1`}>Member since {user.joinDate}</Text>
          <View className="flex-row justify-center mt-4">
            <View className={`p-3 rounded-xl items-center mx-2 ${isDarkMode ? 'bg-white/10' : 'bg-white/20'}`}> 
              <Text className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>{user.streak}</Text>
              <Text className={`${isDarkMode ? 'text-gray-400' : 'text-white'} text-sm`}>Day Streak</Text>
            </View>
            <View className={`p-3 rounded-xl items-center mx-2 ${isDarkMode ? 'bg-white/10' : 'bg-white/20'}`}> 
              <Text className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>{user.achievements}</Text>
              <Text className={`${isDarkMode ? 'text-gray-400' : 'text-white'} text-sm`}>Achievements</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} className="mb-6">
            <Text className={`${isDarkMode ? 'text-gray-200' : 'text-[#2C3E50]'} text-lg font-bold mb-3`}>{section.title}</Text>
            <View className={`${isDarkMode ? 'bg-[#23272f]' : 'bg-white'} rounded-2xl overflow-hidden ${isDarkMode ? '' : 'shadow-sm'}`}> 
              {section.items.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity 
                    className={`flex-row items-center p-4 ${index !== section.items.length - 1 ? (isDarkMode ? 'border-b border-[#23272f]' : 'border-b border-[#E0E7EE]') : ''}`}
                    onPress={() => {
                      if ('onToggle' in item && typeof item.onToggle === 'function') {
                        item.onToggle();
                      }
                    }}
                  >
                    <View className={`p-3 rounded-xl mr-4 ${isDarkMode ? 'bg-[#23272f]' : 'bg-[#3B7FBF]/10'}`}>
                      <item.icon color={isDarkMode ? '#a5b4fc' : '#3B7FBF'} size={20} />
                    </View>
                    <View className="flex-1">
                      <Text className={`${isDarkMode ? 'text-gray-200' : 'text-[#2C3E50]'} font-medium`}>{item.label}</Text>
                      {item.value ? (
                        <Text className={`${isDarkMode ? 'text-gray-400' : 'text-[#607D8B]'} text-sm`}>{item.value}</Text>
                      ) : null}
                    </View>
                    {'hasSwitch' in item && item.hasSwitch ? (
                      <Switch
                        trackColor={{ false: isDarkMode ? '#23272f' : '#E0E7EE', true: isDarkMode ? '#a5b4fc' : '#3B7FBF' }}
                        thumbColor={item.switchValue ? '#FFFFFF' : '#F4F4F5'}
                        ios_backgroundColor={isDarkMode ? '#23272f' : '#E0E7EE'}
                        onValueChange={item.onToggle}
                        value={item.switchValue}
                      />
                    ) : ('hasArrow' in item && item.hasArrow) ? (
                      <ChevronRight color={isDarkMode ? '#a5b4fc' : '#607D8B'} size={20} />
                    ) : null}
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity 
          className={`${isDarkMode ? 'bg-[#23272f]' : 'bg-white'} rounded-2xl p-4 flex-row items-center justify-center border border-[#F44336]/30`}
          onPress={handleLogout}
        >
          <LogOut color="#F44336" size={20} />
          <Text className={`font-bold ml-2 ${isDarkMode ? 'text-red-400' : 'text-[#F44336]'}`}>Logout</Text>
        </TouchableOpacity>

        {/* Version Info */}
        <View className="mt-6 items-center">
          <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-[#607D8B]'}`}>StudyFlow Pro v1.2.0</Text>
          <Text className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-[#607D8B]'}`}>© 2023 StudyFlow Inc. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;