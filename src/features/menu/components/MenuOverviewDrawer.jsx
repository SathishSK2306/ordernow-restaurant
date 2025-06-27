// src/features/menu/components/MenuOverviewDrawer.jsx
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

export default function MenuOverviewDrawer({ open, onClose, categories, onSelect }) {
  return (
    <Drawer open={open} onClose={onClose} direction="bottom">
      <DrawerContent className="p-2 pt-0 h-[80%] rounded-t-xl [&>div.bg-muted]:hidden">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-semibold">Full Menu</DrawerTitle>
          <DrawerDescription className="pb-3">Menu categories overview</DrawerDescription>
        </DrawerHeader>
        <div className="space-y-3 overflow-y-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect?.(category.id);
                onClose();
              }}
            >
              <span className="text-md text-gray-600">{category.name}</span>
              <span className="text-md text-gray-600">{category.menu_items?.length || 0}</span>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
