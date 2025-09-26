// src/features/auth/pages/LoginPage.jsx
import { useState } from 'react';
import { useRequestOtp } from '../hooks/useAuthMutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [contact, setContact] = useState('');
  // Assuming email for simplicity, you can add a toggle for phone
  const channel = 'email'; 
  const { mutate: sendOtp, isPending } = useRequestOtp();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendOtp({ contact, channel, purpose: 'login' });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome Back!</CardTitle>
          <CardDescription>Enter your email to receive a login code.</CardDescription>
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
              {isPending ? 'Sending...' : 'Send Login Code'}
            </Button>
          </form>
           <p className="mt-4 text-center text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
