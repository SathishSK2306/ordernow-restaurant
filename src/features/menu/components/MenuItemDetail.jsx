// src/features/menu/components/MenuItemDetail.jsx
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Share, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartMutations } from "@/features/cart/hooks/useCartMutations";
import { QuantityCounter } from "@/features/cart/components/QuantityCounter";
import { useMenuItemQtyInCart } from "../hooks/useMenuItemQtyInCart";

// This is a drawer component that displays detailed information about a menu item.
export default function MenuItemDetail({ item, onClose, restaurantId }) {
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1); // Local state for quantity
  const quantityInCart = useMenuItemQtyInCart(restaurantId, item?.id);
  const { add } = useCartMutations(restaurantId, { syncItems: true });

  useEffect(()=>{
    // Reset note and quantity when drawer is closed or item changes
    setNote("");
    setQuantity(1);    
  },[item]);

  const handleAddToCart = () =>{
    add(item, note, quantity);    
    onClose(); // Close the drawer after adding to cart   
  }

  if (!item) return null;

  return (
    <Drawer open={!!item} onClose={onClose} direction="bottom">
      <DrawerContent className="h-[80%] rounded-t-xl p-4 [&>div.bg-muted]:hidden">
        <DrawerHeader className="sr-only">
            <DrawerTitle>{item.name}</DrawerTitle>
            <DrawerDescription>{item.description}</DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 overflow-y-auto pb-32 scrollbar-hide">
          {/* Card 1: Image, Name, Buttons, Description */}
          <Card className="p-2">
            <CardContent className="p-0">
              <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover rounded-t-md" />
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost"><Heart className="h-5 w-5" /></Button>
                    <Button size="icon" variant="ghost"><Share className="h-5 w-5" /></Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {quantityInCart>0 && 
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span >{quantityInCart}x in cart</span>
                  </div>
                </div>}
            </div>
            </CardContent>
          </Card>

          {/* Card 2: Cooking request */}
          <Card className="p-0">
            <CardContent className="p-4">
              <label className="block text-sm font-medium mb-2">Add cooking request</label>
              <Textarea
                maxLength={100}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Eg. Make it less spicy..."
              />
              <div className="text-sm text-right text-muted-foreground mt-1">{note.length}/100</div>
            </CardContent>
          </Card>
          
          {/* Item quanity counter */}
          <div className="flex justify-center p-4">
            <QuantityCounter
              quantity={quantity}
              onIncrement={() => {setQuantity(prev => prev + 1)}}
              onDecrement={() => {setQuantity(prev => Math.max(1, prev - 1))}}
          />
          </div>
        </div>

        {/* Fixed Add to Cart Button */}
        <DrawerFooter className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4">
          <Button className="w-full flex justify-between text-base font-medium" onClick={handleAddToCart}>
            <span>Add to cart</span>
            <span>₹{item.price*quantity}</span>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
} 

// Usage example:
// <MenuItemDetail item={selectedItem} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onAddToCart={handleAddToCart} />
