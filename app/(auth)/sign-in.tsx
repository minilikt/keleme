import { SocialConnections } from '@/components/social-connections';
import { ForgotPasswordForm } from '@/components/forgot-password-form';
import { ResetPasswordForm } from '@/components/reset-password-form';
import { AppModal } from '@/components/ui/modal';
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
import { Pressable, type TextInput, View } from 'react-native';

export default function SignIn() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showForgot, setShowForgot] = React.useState(false);
  const [showReset, setShowReset] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState('');
  const router = require('expo-router').useRouter();

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }


  async function onSubmit() {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push('/'); // Redirect to home page after sign-in
    }
  }

  return (
    <>
      <View className="gap-6">
        <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
          <CardHeader>
            <CardTitle className="text-center text-xl sm:text-left">Sign in to your app</CardTitle>
            <CardDescription className="text-center sm:text-left">
              Welcome back! Please sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-6">
            <View className="gap-6">
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
                  <Button
                    variant="link"
                    size="sm"
                    className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
                    onPress={() => setShowForgot(true)}
                  >
                    <Text className="font-normal leading-4">Forgot your password?</Text>
                  </Button>
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
                <Text>{loading ? 'Signing in...' : 'Continue'}</Text>
              </Button>
              {error ? (
                <Text className="text-red-500 text-center mt-2">{error}</Text>
              ) : null}
            </View>
            <Text className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Pressable
                onPress={() => {
                  // TODO: Navigate to sign up screen
                }}>
                <Text className="text-sm underline underline-offset-4">Sign up</Text>
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
      {/* Forgot Password Modal */}
      <AppModal visible={showForgot} onClose={() => setShowForgot(false)}>
        <ForgotPasswordForm
          onSuccess={(email) => {
            setShowForgot(false);
            setResetEmail(email);
            setShowReset(true);
          }}
        />
      </AppModal>
      {/* Reset Password Modal */}
      <AppModal visible={showReset} onClose={() => setShowReset(false)}>
        <ResetPasswordForm email={resetEmail} onSuccess={() => setShowReset(false)} />
      </AppModal>
    </>
  );
}
