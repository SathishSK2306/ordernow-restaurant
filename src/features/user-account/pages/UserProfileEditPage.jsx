import { useState } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useUserAccountHeader } from '../hooks/useUserAccountHeader';

export default function UserProfileEditPage() {
  useUserAccountHeader({ title: 'Edit Profile' }); // Set custom title for this page's header
  const { user } = useAuth();
  
  // Prefill form with user data, or empty strings if not available
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
    gender: user?.gender || '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement mutation to save user data
    console.log('Saving profile data:', formData);
    // toast.success("Profile saved!");
  };

  return (
    <div className="flex justify-center py-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
               <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                 {/* Placeholder for an image uploader */}
                 <User className="w-16 h-16 text-gray-500" />
               </div>
               <Button variant="outline" type="button">Change Picture</Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleInputChange} />
            </div>
            {/* Add more fields for address, gender, etc. as needed */}

            <Button type="submit" className="w-full !mt-8">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
