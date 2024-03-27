export interface ShoppingCartItem {
  user_id?: number;
  product_id: number;
  quantity: number;
}

export interface ShoppingCart {
  id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  user_id: number;
  product_id: number;
  Product: {
    name: string;
    price: number;
    sub_title: string;
    Discount: {
      percentage: number;
    };
    ProductImages: Array<{
      image_url: string;
    }>;
  };
}

export interface ErrorResponse {
  error: string;
}
