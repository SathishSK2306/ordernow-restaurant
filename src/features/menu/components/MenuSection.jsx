// src/features/menu/components/MenuSection.jsx
import MenuCategory from './MenuCategory';

const MenuSection = ({ menu }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-semibold mb-1 text-primary">{menu.name}</h2>
    {menu.description && (
      <p className="text-sm text-gray-500 mb-4">{menu.description}</p>
    )}
    {menu.categories.map(category => (
      <MenuCategory key={category.id} category={category} />
    ))}
  </div>
);

export default MenuSection;