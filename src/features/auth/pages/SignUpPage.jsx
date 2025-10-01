// src/features/auth/pages/SignUpPage.jsx
import { useState } from 'react';
import { useRequestOtp } from '../hooks/useAuthMutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  const [contact, setContact] = useState('');
  const channel = 'email'; // Assuming email for now
  const { mutate: sendOtp, isPending } = useRequestOtp();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendOtp({ contact, channel, purpose: 'register' });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Enter your email to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                disabled={isPending}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Sending...' : 'Send Verification Code'}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="underline">
                Log In
              </Link>
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
