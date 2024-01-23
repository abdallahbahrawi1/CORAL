// In interfaces/wishlistInterface.ts

export interface WishlistItem {
    id?: number;
    user_id?: number;
    product_id: number;
    comment: string;
    date_updated?: Date;
    date_added?: Date;
  }
  
  export interface ErrorResponse {
    code: number;
    message: string;
  }
  