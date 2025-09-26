// src/features/auth/pages/VerifyOTPPage.jsx
import { useState } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { useVerifyOtp } from '../hooks/useAuthMutations';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState('');
  const { state } = useLocation();
  const { mutate: verify, isPending } = useVerifyOtp();

  // If the user lands here directly without state from the previous page, redirect them.
  if (!state || !state.contact || !state.otp_id) {
    return <Navigate to="/login" replace />;
  }

  const { contact, channel, purpose, otp_id } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    verify({
      otp_input: otp,
      contact,
      channel,
      purpose,
      otp_id,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Check your {channel === 'email' ? 'Email' : 'Phone'}</CardTitle>
          <CardDescription>We've sent a 6-digit code to {contact}.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <Button type="submit" className="w-full" disabled={isPending || otp.length < 6}>
              {isPending ? 'Verifying...' : 'Verify'}
            </Button>
          </form>
           <p className="mt-4 text-center text-sm">
             Entered the wrong email?{' '}
             <Link to={purpose === 'login' ? '/login' : '/signup'} className="underline" replace>
                Go back
             </Link>
           </p>
        </CardContent>
      </Card>
    </div>
  );
}
