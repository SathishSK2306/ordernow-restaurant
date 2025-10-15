import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

const HomePage = () => {
  // A default restaurant ID to get the user started
  const defaultRestaurantId = '29d4b71d-f585-4a17-88dc-9e227b56d4f1';

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to OrderNow</h1>
      <p className="text-lg text-gray-600 mb-8">
        The easiest way to order your favorite food for pickup.
      </p>
      <Button asChild>
        <Link to={`/restaurant/${defaultRestaurantId}`}>
          View a Demo Restaurant
        </Link>
      </Button>
    </div>
  );
};

export default HomePage;