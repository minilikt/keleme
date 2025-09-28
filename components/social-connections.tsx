import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useColorScheme } from 'nativewind';
import { supabase } from '@/lib/supabase';
import { Image, Platform, View } from 'react-native';

const SOCIAL_CONNECTION_STRATEGIES = [
  {
    type: 'oauth_apple',
    source: { uri: 'https://img.clerk.com/static/apple.png?width=160' },
    useTint: true,
  },
  {
    type: 'oauth_google',
    source: { uri: 'https://img.clerk.com/static/google.png?width=160' },
    useTint: false,
  },
  {
    type: 'oauth_github',
    source: { uri: 'https://img.clerk.com/static/github.png?width=160' },
    useTint: true,
  },
];

export function SocialConnections() {
  const { colorScheme } = useColorScheme();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
    // You may want to handle error or redirect after login
  };

  const googleStrategy = SOCIAL_CONNECTION_STRATEGIES.find(s => s.type === 'oauth_google');
  if (!googleStrategy) return null;
  return (
    <View className="gap-2 sm:flex-row sm:gap-3">
      <Button
        key={googleStrategy.type}
        variant="outline"
        size="sm"
        className="sm:flex-1"
        onPress={handleGoogleLogin}
      >
        <Image
          className={cn('size-4', googleStrategy.useTint && Platform.select({ web: 'dark:invert' }))}
          tintColor={Platform.select({
            native: googleStrategy.useTint ? (colorScheme === 'dark' ? 'white' : 'black') : undefined,
          })}
          source={googleStrategy.source}
        />
      </Button>
    </View>
  );
}
