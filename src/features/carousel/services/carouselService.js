//import http from '@lib/http/client';

export async function fetchCarouselData(restaurantId) {
//   const response = await http.get(`/restaurants/${restaurantId}/carousel-data`);
//   console.log('Carousel items fetched:', response.data);
//   return response.data;

    // Mock data for development/testing
    console.log('Fetching carousel items for restaurant:', restaurantId);
    const mockData = {
            "welcome_data": {
                "name": "Namma Oota Restaurant",
                "image_url": "29d4b71d-f585-4a17-88dc-9e227b56d4f1/welcome.avif",
                "logo_url": "29d4b71d-f585-4a17-88dc-9e227b56d4f1/logo.avif",
            },
            "restaurant_specials": [
                {
                "id": "616a8760-cbdc-4d94-8c83-0cfc17f14d65",
                "name": "Mysore Masala Dosa",
                "image_url": "29d4b71d-f585-4a17-88dc-9e227b56d4f1/menu-items/616a8760-cbdc-4d94-8c83-0cfc17f14d65.jpg",
                "orders": "1k+"
                },
                {
                "id": "549909ab-9eb5-4aaa-8eb4-9469a6dc4368",
                "name": "Bisi Bele Bath",
                "image_url": "29d4b71d-f585-4a17-88dc-9e227b56d4f1/menu-items/549909ab-9eb5-4aaa-8eb4-9469a6dc4368.jpg",
                "orders": "1k+"
                },
                {
                "id": "46fc0fdf-97d2-467a-a9ea-e833318265e1",
                "name": "Rava Idli",
                "image_url": "29d4b71d-f585-4a17-88dc-9e227b56d4f1/menu-items/46fc0fdf-97d2-467a-a9ea-e833318265e1.jpg",
                "orders": "1k+"
                }
            ],
            "customer_photos": [
                {username:"John Doe", image_url:"29d4b71d-f585-4a17-88dc-9e227b56d4f1/customer-photos/445af937-84e1-47b5-9149-ab63889b366f.webp"},
                {username:"Jane Smith", image_url:"29d4b71d-f585-4a17-88dc-9e227b56d4f1/customer-photos/840626f5-d7de-499d-a1ca-b92b92e8b8a6.webp"},
                {username:"Alice Johnson", image_url:"29d4b71d-f585-4a17-88dc-9e227b56d4f1/customer-photos/9f69df14-b060-41fa-be17-82806ee8b922.webp"},
            ]
        };

        return mockData;
    }