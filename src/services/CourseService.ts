import APITOKEN from "@/config/http-common";
import { type ApiCoursesResponse, type Courses, type CourseIdResponse } from "@/interfaces/CousesInterface";

class CourseService {
  // Método para buscar todos os cursos com filtros
  findAll(params: any): Promise<ApiCoursesResponse> {
    return APITOKEN.get('/courses', { params })
      .then(response => response.data);
  }

  create(courseData: Courses): Promise<Courses> {

    return APITOKEN.post('/courses', courseData )
      .then(response => response.data);
  }

  findById(id: number): Promise<CourseIdResponse> {
    return APITOKEN.get(`/courses/${id}`).then(response => response.data);
  }

  update(id: number, updateData: Partial<Courses>): Promise<Courses> {
    return APITOKEN.put(`/courses/${id}`, updateData).then(response => response.data);
  }

  
  delete(id: number): Promise<Courses> {
    return APITOKEN.delete(`/courses/${id}`).then(response => response.data);
  }
}

export default new CourseService();
