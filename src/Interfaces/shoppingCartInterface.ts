export interface ShoppingCartItem {
  user_id: number;
  product_id: number;
  quantity: number;
}

export interface ErrorResponse {
  code: number;
  message: string;
}
