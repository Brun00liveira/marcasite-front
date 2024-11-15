export interface Courses {
  id: number;
  title: string;
  description: string;
  price: number;
  photo: string;
  is_active: number;
}

export interface ApiCoursesResponse {
  data: {
    data: Courses[],
    //paginação
}       
}


