import { SocialConnections } from '@/components/social-connections';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { supabase } from '@/lib/supabase';
import { VerifyEmailForm } from '@/components/verify-email-form';
import { Pressable, TextInput, View } from 'react-native';

export default function SignUp() {
  const router = require('expo-router').useRouter();
  const passwordInputRef = React.useRef<TextInput>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showVerify, setShowVerify] = React.useState(false);

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }


  async function onSubmit() {
    setLoading(true);
    setError(null);
    setShowVerify(false);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setShowVerify(true); // Show verify email form
    }
  }

  if (showVerify) {
  return <VerifyEmailForm email={email} onSuccess={() => router.push('/onboarding')} />;
  }
  // ...existing code for sign up form...
  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Create your account</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome! Please fill in the details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="your username"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
                returnKeyType="next"
                submitBehavior="submit"
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={onEmailSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
              />
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>
              </View>
              <Input
                ref={passwordInputRef}
                id="password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                returnKeyType="send"
                onSubmitEditing={onSubmit}
              />
            </View>
            <Button className="w-full" onPress={onSubmit} disabled={loading}>
              <Text>{loading ? 'Signing up...' : 'Continue'}</Text>
            </Button>
            {error ? (
              <Text className="text-red-500 text-center mt-2">{error}</Text>
            ) : null}
          </View>
          <Text className="text-center text-sm">
            Already have an account?{' '}
            <Pressable
              onPress={() => {
                // TODO: Navigate to sign in screen
              }}>
              <Text className="text-sm underline underline-offset-4">Sign in</Text>
            </Pressable>
          </Text>
          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="text-muted-foreground px-4 text-sm">or</Text>
            <Separator className="flex-1" />
          </View>
          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  );
}
