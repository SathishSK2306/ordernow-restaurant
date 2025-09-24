// src/features/categories-grid/components/CategoriesGrid.jsx

import CategoryCard from "./CategoryCard";

const CategoriesGrid = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  const handleCategoryClick = (id) => {
    const el = document.getElementById(`category-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 px-4">Featured Categories</h2>
      <div className="grid grid-cols-3 gap-1 pb-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={() => handleCategoryClick(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;