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
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { supabase } from '@/lib/supabase';
import { TextInput, View } from 'react-native';

export function ResetPasswordForm({ email, onSuccess }: { email: string; onSuccess: () => void }) {
  const codeInputRef = React.useRef<TextInput>(null);
  const [password, setPassword] = React.useState('');
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  function onPasswordSubmitEditing() {
    codeInputRef.current?.focus();
  }

  async function onSubmit() {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'recovery' });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      onSuccess();
    }
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Reset password</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Enter the code sent to your email and set a new password
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">New password</Label>
              </View>
              <Input
                id="password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={onPasswordSubmitEditing}
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="code">Verification code</Label>
              <Input
                id="code"
                autoCapitalize="none"
                value={code}
                onChangeText={setCode}
                returnKeyType="send"
                keyboardType="numeric"
                autoComplete="sms-otp"
                textContentType="oneTimeCode"
                onSubmitEditing={onSubmit}
              />
            </View>
            <Button className="w-full" onPress={onSubmit} disabled={loading}>
              <Text>{loading ? 'Resetting...' : 'Reset Password'}</Text>
            </Button>
            {error ? (
              <Text className="text-red-500 text-center mt-2">{error}</Text>
            ) : null}
            {success ? (
              <Text className="text-green-600 text-center mt-2">Password reset! You can now sign in.</Text>
            ) : null}
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
