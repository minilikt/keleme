
import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { BarChart, LineChart, StackedBarChart } from 'react-native-chart-kit';
import { Activity, Award, Target, TrendingUp, Zap } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

const screenWidth = Dimensions.get('window').width;

export default function AnalyticsScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  // Mock data for the charts
  const subjectPerformanceData = {
    labels: ['Math', 'Physics', 'Chemistry', 'Biology', 'History'],
    datasets: [
      {
        data: [85, 78, 92, 88, 76],
        colors: [
          (opacity = 1) => `rgba(59, 127, 191, ${opacity})`,
          (opacity = 1) => `rgba(92, 172, 238, ${opacity})`,
          (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
          (opacity = 1) => `rgba(92, 172, 238, ${opacity})`,
          (opacity = 1) => `rgba(59, 127, 191, ${opacity})`,
        ]
      }
    ]
  };

  const performanceTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [65, 72, 68, 80, 75, 85, 90],
        color: (opacity = 1) => `rgba(59, 127, 191, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ['Performance']
  };

  const goalProgressData = [
    { label: 'Daily', percentage: 85, color: '#3B7FBF' },
    { label: 'Weekly', percentage: 72, color: '#5CACEE' },
    { label: 'Monthly', percentage: 68, color: '#FFC107' }
  ];

  const performanceRadarData = {
    labels: ['Speed', 'Accuracy', 'Focus', 'Retention', 'Consistency'],
    data: [0.8, 0.9, 0.7, 0.85, 0.75],
    strokeWidth: 2
  };

  const difficultyData = {
    labels: ['Easy', 'Medium', 'Hard'],
    data: [0.9, 0.7, 0.5],
    colors: [
      (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
      (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
      (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
    ]
  };

  const topStrengths = [
    { subject: 'Chemistry', score: 92, icon: '🧪' },
    { subject: 'Biology', score: 88, icon: '🧬' },
    { subject: 'Math', score: 85, icon: '📊' },
  ];

  const studyRecommendations = [
    { id: 1, text: 'Focus more on History concepts', impact: 'High' },
    { id: 2, text: 'Practice more Physics problems', impact: 'Medium' },
    { id: 3, text: 'Review weekly performance trends', impact: 'Low' },
  ];

  const chartConfig = {
    backgroundColor: isDark ? '#18181b' : '#ffffff',
    backgroundGradientFrom: isDark ? '#18181b' : '#ffffff',
    backgroundGradientTo: isDark ? '#18181b' : '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => isDark ? `rgba(255,255,255,${opacity})` : `rgba(44,62,80,${opacity})`,
    labelColor: (opacity = 1) => isDark ? `rgba(209,213,219,${opacity})` : `rgba(96,125,139,${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: isDark ? '#fff' : '#3B7FBF',
    },
  };

  // Custom Progress Chart Component
  type ProgressDataItem = { label: string; percentage: number; color: string };
  type CustomProgressChartProps = { data: ProgressDataItem[] };

  const CustomProgressChart: React.FC<CustomProgressChartProps> = ({ data }) => {
    return (
      <View className="w-full">
        {data.map((item, index) => (
          <View key={index} className="mb-4">
            <View className="flex-row justify-between mb-1">
              <Text className={isDark ? "text-gray-100 font-medium" : "text-gray-800 font-medium"}>{item.label}</Text>
              <Text className={isDark ? "text-gray-300" : "text-gray-600"}>{item.percentage}%</Text>
            </View>
            <View className={isDark ? "h-3 bg-gray-700 rounded-full overflow-hidden" : "h-3 bg-gray-200 rounded-full overflow-hidden"}>
              <View 
                className="h-full rounded-full"
                style={{ 
                  width: `${item.percentage}%`, 
                  backgroundColor: item.color 
                }}
              />
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView className={isDark ? "flex-1 bg-gray-900" : "flex-1 bg-gray-50"}>
      <View className="p-4">
        {/* Header */}
        <View className="mb-6">
          <Text className={isDark ? "text-3xl font-bold text-gray-100" : "text-3xl font-bold text-gray-800"}>Analytics</Text>
          <Text className={isDark ? "text-gray-300 mt-1" : "text-gray-600 mt-1"}>Your study performance insights</Text>
        </View>

        {/* Subject Performance Comparison */}
        <View className={isDark ? "bg-gray-800 rounded-2xl p-4 mb-5 shadow-sm" : "bg-white rounded-2xl p-4 mb-5 shadow-sm"}>
          <View className="flex-row items-center mb-3">
            <Activity color={isDark ? "#fff" : "#3B7FBF"} size={20} />
            <Text className={isDark ? "text-lg font-bold text-gray-100 ml-2" : "text-lg font-bold text-gray-800 ml-2"}>Subject Performance</Text>
          </View>
          <BarChart
            data={subjectPerformanceData}
            width={screenWidth - 40}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            showValuesOnTopOfBars={true}
            fromZero={true}
          />
        </View>

        {/* Performance Trend */}
        <View className={isDark ? "bg-gray-800 rounded-2xl p-4 mb-5 shadow-sm" : "bg-white rounded-2xl p-4 mb-5 shadow-sm"}>
          <View className="flex-row items-center mb-3">
            <TrendingUp color={isDark ? "#fff" : "#3B7FBF"} size={20} />
            <Text className={isDark ? "text-lg font-bold text-gray-100 ml-2" : "text-lg font-bold text-gray-800 ml-2"}>Performance Trend</Text>
          </View>
          <LineChart
            data={performanceTrendData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
          />
        </View>

        {/* Top Strengths */}
        <View className={isDark ? "bg-gray-800 rounded-2xl p-4 mb-5 shadow-sm" : "bg-white rounded-2xl p-4 mb-5 shadow-sm"}>
          <View className="flex-row items-center mb-3">
            <Zap color={isDark ? "#FFC107" : "#FFC107"} size={20} />
            <Text className={isDark ? "text-lg font-bold text-gray-100 ml-2" : "text-lg font-bold text-gray-800 ml-2"}>Top Strengths</Text>
          </View>
          <View className="flex-row justify-between mt-2">
            {topStrengths.map((strength, index) => (
              <View key={index} className="items-center w-1/3">
                <Text className="text-2xl">{strength.icon}</Text>
                <Text className={isDark ? "font-bold text-gray-100 mt-1" : "font-bold text-gray-800 mt-1"}>{strength.subject}</Text>
                <Text className={isDark ? "text-gray-300" : "text-gray-600"}>{strength.score}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Study Recommendations */}
        <View className={isDark ? "bg-gray-800 rounded-2xl p-4 mb-5 shadow-sm" : "bg-white rounded-2xl p-4 mb-5 shadow-sm"}>
          <View className="flex-row items-center mb-3">
            <Award color={isDark ? "#fff" : "#3B7FBF"} size={20} />
            <Text className={isDark ? "text-lg font-bold text-gray-100 ml-2" : "text-lg font-bold text-gray-800 ml-2"}>Study Recommendations</Text>
          </View>
          <View className="space-y-3">
            {studyRecommendations.map((rec) => (
              <View key={rec.id} className={isDark ? "flex-row items-center bg-blue-900 rounded-lg p-3" : "flex-row items-center bg-blue-50 rounded-lg p-3"}>
                <View className={isDark ? "w-3 h-3 rounded-full bg-blue-400 mr-3" : "w-3 h-3 rounded-full bg-blue-500 mr-3"} />
                <Text className={isDark ? "text-gray-200 flex-1" : "text-gray-700 flex-1"}>{rec.text}</Text>
                <View className={`px-2 py-1 rounded-full ${rec.impact === 'High' ? (isDark ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800') : rec.impact === 'Medium' ? (isDark ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800') : (isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800')}`}> 
                  <Text className="text-xs font-bold">{rec.impact}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Goal Progress */}
        <View className={isDark ? "bg-gray-800 rounded-2xl p-4 mb-5 shadow-sm" : "bg-white rounded-2xl p-4 mb-5 shadow-sm"}>
          <View className="flex-row items-center mb-3">
            <Target color={isDark ? "#fff" : "#3B7FBF"} size={20} />
            <Text className={isDark ? "text-lg font-bold text-gray-100 ml-2" : "text-lg font-bold text-gray-800 ml-2"}>Goal Progress</Text>
          </View>
          <View className="items-center">
            <CustomProgressChart data={goalProgressData} />
          </View>
        </View>

        {/* Performance Radar */}
        <View className={isDark ? "bg-gray-800 rounded-2xl p-4 mb-5 shadow-sm" : "bg-white rounded-2xl p-4 mb-5 shadow-sm"}>
          <Text className={isDark ? "text-lg font-bold text-gray-100 mb-3" : "text-lg font-bold text-gray-800 mb-3"}>Performance Radar</Text>
          <View className="items-center">
            <StackedBarChart
              data={{
                labels: [''],
                legend: performanceRadarData.labels,
                data: [performanceRadarData.data.map(score => score * 100)],
                barColors: isDark ? ['#60a5fa', '#fbbf24', '#a3e635', '#818cf8', '#f472b6'] : ['#3B7FBF', '#5CACEE', '#FFC107', '#4CAF50', '#9C27B0']
              }}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              hideLegend={false}
            />
          </View>
        </View>

        {/* Performance by Difficulty */}
        <View className={isDark ? "bg-gray-800 rounded-2xl p-4 mb-5 shadow-sm" : "bg-white rounded-2xl p-4 mb-5 shadow-sm"}>
          <Text className={isDark ? "text-lg font-bold text-gray-100 mb-3" : "text-lg font-bold text-gray-800 mb-3"}>Performance by Difficulty</Text>
          <View className="flex-row justify-between items-end h-40 mt-4">
            {['Easy', 'Medium', 'Hard'].map((level, index) => (
              <View key={index} className="items-center flex-1">
                <View className="w-full items-center">
                  <View 
                    className="w-4/5 rounded-t-lg"
                    style={{ 
                      height: `${difficultyData.data[index] * 100}%`,
                      backgroundColor: isDark ? ['#22c55e', '#fbbf24', '#ef4444'][index] : ['#4CAF50', '#FFC107', '#F44336'][index]
                    }}
                  />
                </View>
                <Text className={isDark ? "text-gray-300 mt-2" : "text-gray-600 mt-2"}>{level}</Text>
                <Text className={isDark ? "font-bold text-gray-100" : "font-bold text-gray-800"}>{Math.round(difficultyData.data[index] * 100)}%</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}