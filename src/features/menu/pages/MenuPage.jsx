import {useMenu} from '../hooks/useMenu';

const MenuPage = ()=> {
    const restaurantId = "29d4b71d-f585-4a17-88dc-9e227b56d4f1"
    const {menuData, loading} = useMenu(restaurantId);

    if (loading) {
        return <div>Loading menu...</div>;
    }
    if (!menuData) {
        return <div>No menu data available.</div>;
    }
    return (
        <div>
            <h1>Menu</h1>
            {menuData.map((menu) => (
                <div key={menu.id}>
                    <h2>{menu.name}</h2>
                    {menu.categories.map((category) => (
                        <div key={category.id}>
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                            {category.menu_items.map((item) => (
                                <div key={item.id}>
                                    <h4>{item.name}</h4>
                                    <p>{item.description}</p>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default MenuPage;