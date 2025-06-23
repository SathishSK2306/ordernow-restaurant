import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCartMutations } from '@/features/cart/hooks/useCartMutations';
import { toast } from 'sonner' // Assuming you have a toast component for notifications

const QuickAddButton = ({ item, restaurantId }) => {
    const { add } = useCartMutations(restaurantId, { syncItems: true });

    const handleQuickAdd = (event) => {
        event.stopPropagation(); // Prevent click from bubbling up to parent elements (like item card's click handler)
        
        console.log(`Quick add item: ${item.name}`);
        add(item); 
        toast.success(`${item.name} added to cart!`, {
            duration: 2000,
            position: 'bottom-right',
        });
    };  

    return (
        <Button
        size="icon"
        className="absolute bottom-2 right-2 rounded-full bg-white text-black shadow-lg hover:bg-gray-100 "
        variant="ghost"
        onClick={handleQuickAdd}
        aria-label="Quick Add"
        >
            <Plus strokeWidth={2.7} />
        </Button>
    );
}

export default QuickAddButton;