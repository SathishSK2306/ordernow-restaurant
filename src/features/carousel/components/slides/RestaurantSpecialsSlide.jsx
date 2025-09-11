import { cn } from "@/lib/utils";
import MenuItemCard from "@/features/menu/components/MenuItemCard";

export function RestaurantSpecialsSlide({ title, items, className, ...props }) {
  const itemsToDisplay = items.slice(0, 3);

  return (
    <div className={cn("relative p-4 md:p-8 h-[50vh]", className)} {...props}>
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">
        {title || 'Restaurant Specials'}
      </h2>
      <div 
        className="grid grid-cols-2 grid-rows-2 gap-3 w-full h-[calc(100%-4rem)]"
        style={{
          gridTemplateAreas: `'top top' 'bottom-left bottom-right'`
        }}
      >
        {itemsToDisplay[0] && (
          <div className="[grid-area:top]">
            <MenuItemCard item={itemsToDisplay[0]} variant="image-center" className="h-full" />
          </div>
        )}
        {itemsToDisplay[1] && (
          <div className="[grid-area:bottom-left]">
            <MenuItemCard item={itemsToDisplay[1]} variant="image-top" className="h-full" />
          </div>
        )}
        {itemsToDisplay[2] && (
          <div className="[grid-area:bottom-right]">
            <MenuItemCard item={itemsToDisplay[2]} variant="image-top" className="h-full" />
          </div>
        )}
      </div>
    </div>
  );
}
