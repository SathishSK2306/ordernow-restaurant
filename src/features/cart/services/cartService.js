import http from '@lib/http/client';

export async function getCartViewData(restaurantId) {
    const response = await http.get(`/restaurants/${restaurantId}/cart-view`);
    console.log('Cart data fetched:', response.data);
    return response.data;
}

export async function addItemToCart(restaurantId, cartItemData) {
    const response = await http.post(`/restaurants/${restaurantId}/cart`, cartItemData);
    console.log('Item added to cart:', response.data);
    return response.data;
}

export async function updateCartItem(cartItemId, cartItemData) {
    const response = await http.patch(`/cart/${cartItemId}`, cartItemData);
    console.log('Cart item updated:', response.data); 
    return response.data;
}

export async function removeCartItem(cartItemId) {
    const response = await http.delete(`/cart/${cartItemId}`);
    console.log('Cart item removed:', response.data);
    return response.data;
}

export async function clearCart(restaurantId) {
    const response = await http.delete(`/restaurants/${restaurantId}/cart`);
    console.log('Cart cleared:', response.data);
    return response.data;
}

export async function getCartTotals(restaurantId) {
    const response = await http.get(`/restaurants/${restaurantId}/cart/totals`);
    console.log('Cart totals fetched:', response.data);
    return response.data;
}