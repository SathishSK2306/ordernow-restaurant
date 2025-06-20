// src/features/menu/components/MenuItemDetail.jsx
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Share } from "lucide-react";
import { useState } from "react";
import { useCartMutations } from "@/features/cart/hooks/useCartMutations";

// This is a drawer component that displays detailed information about a menu item.
export default function MenuItemDetail({ item, onClose, restaurantId }) {
  const [note, setNote] = useState("");
  const { add } = useCartMutations(restaurantId, { syncItems: true });

  const handleAddToCart = () =>{
    add(item, note);
    setNote(""); // Clear the note after adding to cart
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
        </div>

        {/* Fixed Add to Cart Button */}
        <DrawerFooter className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4">
          <Button className="w-full flex justify-between text-base font-medium" onClick={handleAddToCart}>
            <span>Add to cart</span>
            <span>₹{item.price}</span>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
} 

// Usage example:
// <MenuItemDetail item={selectedItem} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onAddToCart={handleAddToCart} />
