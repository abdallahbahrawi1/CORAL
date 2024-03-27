export interface ReviewItem {
  id: number;
  user_id: number;
  product_id: number;
  comment: string;
  rating: number;
  date_updated: Date;
  date_added: Date;
}

export interface ErrorResponse {
  error: string;
}
