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
import { type TextStyle, View } from 'react-native';

const RESEND_CODE_INTERVAL_SECONDS = 30;

const TABULAR_NUMBERS_STYLE: TextStyle = { fontVariant: ['tabular-nums'] };


import { supabase } from '@/lib/supabase';

export function VerifyEmailForm({ email }: { email: string }) {
  const { countdown, restartCountdown } = useCountdown(RESEND_CODE_INTERVAL_SECONDS);
  const [otp, setOtp] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  async function onSubmit() {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      // TODO: Navigate to protected screen or set auth state
    }
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border pb-4 shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Verify your email</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Enter the verification code sent to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="code">Verification code</Label>
              <Input
                id="code"
                autoCapitalize="none"
                returnKeyType="send"
                keyboardType="numeric"
                autoComplete="sms-otp"
                textContentType="oneTimeCode"
                value={otp}
                onChangeText={setOtp}
                onSubmitEditing={onSubmit}
              />
              <Button
                variant="link"
                size="sm"
                disabled={countdown > 0}
                onPress={async () => {
                  setError(null);
                  // Resend code
                  const { error } = await supabase.auth.resend({ type: 'signup', email });
                  if (error) setError(error.message);
                  restartCountdown();
                }}>
                <Text className="text-center text-xs">
                  Didn&apos;t receive the code? Resend{' '}
                  {countdown > 0 ? (
                    <Text className="text-xs" style={TABULAR_NUMBERS_STYLE}>
                      ({countdown})
                    </Text>
                  ) : null}
                </Text>
              </Button>
            </View>
            <View className="gap-3">
              <Button className="w-full" onPress={onSubmit} disabled={loading}>
                <Text>{loading ? 'Verifying...' : 'Continue'}</Text>
              </Button>
              {error ? (
                <Text className="text-red-500 text-center mt-2">{error}</Text>
              ) : null}
              {success ? (
                <Text className="text-green-600 text-center mt-2">Email verified! You can now sign in.</Text>
              ) : null}
              <Button
                variant="link"
                className="mx-auto"
                onPress={() => {
                  // TODO: Navigate to sign up screen
                }}>
                <Text>Cancel</Text>
              </Button>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}

function useCountdown(seconds = 30) {
  const [countdown, setCountdown] = React.useState(seconds);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = React.useCallback(() => {
    setCountdown(seconds);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [seconds]);

  React.useEffect(() => {
    startCountdown();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startCountdown]);

  return { countdown, restartCountdown: startCountdown };
}
