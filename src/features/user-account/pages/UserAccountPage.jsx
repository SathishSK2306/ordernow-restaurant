// src/features/user-account/pages/UserAccountPage.jsx
import { Link, useParams } from 'react-router-dom';
import { User, ShoppingBag, Star, Heart, HelpCircle, LogOut, Settings, MessageSquare, Info, FileQuestion } from 'lucide-react';

import { useAuth } from '@/features/auth/context/AuthContext';
import { useLogout } from '@/features/auth/hooks/useAuthMutations';
import { useUserAccountHeader } from '../hooks/useUserAccountHeader';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// eslint-disable-next-line no-unused-vars
const AccountOption = ({ icon: Icon, text, to, onClick }) => {
  const content = (
    <div className="flex items-center space-x-4 p-4 w-full">
      <Icon className="h-6 w-6 text-gray-600" />
      <span className="text-lg">{text}</span>
    </div>
  );

  if (to) {
    return <Link to={to} className="hover:bg-gray-100 rounded-lg transition-colors">{content}</Link>;
  }
  return <button onClick={onClick} className="hover:bg-gray-100 rounded-lg transition-colors w-full text-left">{content}</button>;
};

export default function UserAccountPage() {
  const { restaurantId } = useParams();
  // This custom hook sets the specific header for this page
  useUserAccountHeader(restaurantId);
  const { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const accountOptions = [
    { icon: User, text: 'Your profile', to: '/user-account/profile' },
    { icon: ShoppingBag, text: 'Your orders', to: '/user-account/orders' },
    { icon: Star, text: 'Your reviews', to: '/user-account/reviews' },
    { icon: Heart, text: 'Favorites', to: '/user-account/favorites' },
    { icon: HelpCircle, text: 'Help', to: '/help' },
    { icon: LogOut, text: 'Log out', onClick: () => logout(), special: true },
  ];
  
  const moreOptions = [
    { icon: Settings, text: 'Settings', to: '/user-account/settings' },
    { icon: MessageSquare, text: 'Send feedback', to: '/send-feedback' },
    { icon: Info, text: 'About', to: '/about' },
    { icon: FileQuestion, text: 'Frequently Asked Questions', to: '/faq' },
  ]

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            {/* Placeholder for an actual image */}
            <User className="w-12 h-12 text-gray-500" />
        </div>
        <div>
            <h2 className="text-2xl font-bold">{user?.name || 'Guest User'}</h2>
            <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-2">
        {accountOptions.map((option, index) => (
            <AccountOption key={index} {...option} />
        ))}
      </div>

      <Separator className="my-6" />
      
       <div className="space-y-2">
        {moreOptions.map((option, index) => (
            <AccountOption key={index} {...option} />
        ))}
      </div>
    </div>
  );
}
