import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

export function QuantityCounter({ quantity, onIncrement, onDecrement}) {

  return (
    <div className="flex items-center px-4 space-x-6">
      <Button size="icon" variant="ghost" className="rounded-full bg-gray-100 p-5" onClick={onDecrement}>
        <Minus/>
      </Button>
      <span className="text-lg font-semibold">{quantity}</span>
      <Button size="icon" variant="ghost" className="rounded-full bg-gray-100 p-5" onClick={onIncrement}>
        <Plus/>
      </Button>
    </div>
  );
}

export function QuantityCounterPill({ quantity, onIncrement, onDecrement}) {

  return (
    <div className="flex items-center space-x-3 bg-muted px-2 py-1 rounded-full mr-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onDecrement}
        className="h-6 w-5 p-0 text-base"
      >
        −
      </Button>
      <span className="text-sm font-medium text-gray-800">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={onIncrement}
        className="h-6 w-5 p-0 text-base"
      >
        +
      </Button>
    </div>
  );
}