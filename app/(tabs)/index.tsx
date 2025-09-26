import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Tab</Text>

      <Link href="/(auth)/sign-in">Go to Sign In</Link>
    </View>
  );
}
