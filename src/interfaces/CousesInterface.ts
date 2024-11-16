import type { Category } from "./CategoryInterface";

export interface Courses {
  id: number;
  title: string;
  description: string;
  price: number;
  photo: string;
  is_active: number;
  category_id: number

}

export interface ApiCoursesResponse {
  data: {
    data: Courses[];
    last_page: number
    first_page_url: string | null;
    next_page_url: string | null;
    prev_page_url: string | null;
    total: number;
    from: number;
    to: number;
  };
}



