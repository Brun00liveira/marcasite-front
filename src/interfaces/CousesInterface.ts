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
    data: Courses[],
    //paginação
}       
}


