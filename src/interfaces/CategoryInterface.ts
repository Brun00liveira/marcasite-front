export interface Category {
    id: number,
    name: string;
    slug: string;
    description: string;
    is_active: number;
}

export interface ApiCategoryResponse {
    data: Category[];
} 

export interface CategoryIdResponse {
    message: string;
    data: Category;
  }