export interface PaginatedProductList {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    data: Product[];
  }
  
 export interface Product {
    id: number;
    name: string;
    sub_title: string;
    price: number;
    stock_quantity: number;
    createdAt: string;
    average_rating: number; 
    rating_count: number;
    Discount: {
      percentage: number;
    };
    Brand: {
      id: number;
      name: string;
    };
    Category: {
      id: number;
      name: string;
    };
    ProductImages: Array<{
      image_url: string;
    }>;
  }

  export interface ProductDetails {
    details: {
      id: number;
      name: string;
      sub_title: string;
      model: string;
      price: number;
      stock_quantity: number;
      description: string;
      average_rating: number;
      rating_count: number;
      Discount: {
        percentage: number;
      };
      Brand: {
        name: string;
      };
      Category: {
        name: string;
      };
    };
    reviews: Array<{
      id: number;
      rating: number;
      comment: string;
      date_posted: string;
      date_updated: string;
      user_id: number;
      product_id: number;
      User: {
        username: string;
      };
    }>;
    images: Array<{
      id: number;
      image_url: string;
      is_default: boolean | null;
      createdAt: string;
      updatedAt: string;
      product_id: number;
    }>;
    related_products: Array<{
      id: number;
      name: string;
      sub_title: string;
      model: string;
      description: string;
      price: number;
      stock_quantity: number;
      createdAt: string;
      updatedAt: string;
      discount_id: number;
      brand_id: number;
      category_id: number;
      Discount: {
        percentage: number;
      };
      ProductImages: Array<{
        image_url: string;
      }>;
      Brand: {
        name: string;
      };
      Category: {
        name: string;
      };
    }>;
  }

 export interface ProductQueryOptions {
    brandId: any;
    categoryId: any;
    where?: any;
    group?: string[];
    attributes?: string[];
    include?: any[];
    sortBy?: string;
    page?: number;
    pageSize?: number;
  }

  export interface ErrorResponse {
    error: string;
  }
  

  export interface SuggestionResult {
    products: { name: string }[];
    brands: { name: string }[];
  }