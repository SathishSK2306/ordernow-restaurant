import { useMenu } from '../hooks/useMenu';
import { useMenuHeader } from '../hooks/useMenuHeader';

const MenuPage = () => {

  const restaurantId = '29d4b71d-f585-4a17-88dc-9e227b56d4f1';
  const { menuData, loading } = useMenu(restaurantId);
  useMenuHeader();

  if (loading) return <div className="text-center text-gray-600 py-6">Loading menu...</div>;
  if (!menuData) return <div className="text-center text-red-600 py-6">No menu data available.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">Menu</h1>

      {menuData.map((menu) => (
        <div key={menu.id} className="mb-10">
          <h2 className="text-2xl font-semibold text-secondary mb-4 border-b border-gray-300 pb-1">
            {menu.name}
          </h2>

          {menu.categories.map((category) => (
            <div key={category.id} className="mb-6 pl-2">
              <h3 className="text-xl font-medium text-gray-800">{category.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{category.description}</p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.menu_items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <p className="text-sm font-medium text-green-700">₹{item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
