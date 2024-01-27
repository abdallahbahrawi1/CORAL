// In interfaces/wishlistInterface.ts

export interface WishlistItem {
    id?: number;
    user_id?: number;
    product_id: number;
    comment: string;
    date_updated?: Date;
    date_added?: Date;
  }
  
export interface Wishlist {
  id: number;
  comment: string;
  date_added: string;
  date_updated: string;
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
  