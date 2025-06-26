// src/features/menu/components/MenuCategory.jsx
import MenuItemCard from './MenuItemCard';

const MenuCategory = ({ category , onItemClick}) => (
  <div id={`category-${category.id}`} className="mb-6 scroll-mt-24">
    <h3 className="text-xl font-medium text-primary">{category.name}</h3>
    {category.description && (
      <p className="text-sm text-gray-500 mt-1">{category.description}</p>
    )}
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {category.menu_items.map(item => (
        <MenuItemCard key={item.id} item={item} onItemClick={onItemClick} />
      ))}
    </div>
  </div>
);

export default MenuCategory;
