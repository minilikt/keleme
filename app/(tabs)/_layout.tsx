
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const tabBarBg = isDarkMode ? '#23272f' : '#fff';
  const activeColor = isDarkMode ? '#5CACEE' : '#3B7FBF';
  const inactiveColor = isDarkMode ? '#a5b4fc' : '#607D8B';

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: tabBarBg,
          borderRadius: 24,
          height: 70,
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 24,
          shadowColor: isDarkMode ? '#000' : '#3B7FBF',
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 16,
          borderWidth: 0,
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 6,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconLib = Ionicons;
          if (route.name === 'index') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'analysis') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'subjects') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'ellipse';
          }
          return <Ionicons name={iconName as any} size={26} color={color} />;
        },
      })}
    />
  );
}
