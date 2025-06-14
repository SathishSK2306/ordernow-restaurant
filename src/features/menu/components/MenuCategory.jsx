// src/features/menu/components/MenuCategory.jsx
import MenuItemCard from './MenuItemCard';

const MenuCategory = ({ category }) => (
  <div className="mb-6 ">
    <h3 className="text-xl font-medium text-gray-800 mb-2">{category.name}</h3>
    {category.description && (
      <p className="text-sm text-gray-500 mb-2">{category.description}</p>
    )}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {category.menu_items.map(item => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  </div>
);

export default MenuCategory;
