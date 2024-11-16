import APITOKEN from "@/config/http-common";
import { type ApiCoursesResponse } from "@/interfaces/CousesInterface";

class CourseService {
  // Método para buscar todos os cursos com filtros
  findAll(params: any): Promise<ApiCoursesResponse> {
    return APITOKEN.get('/courses', { params })
      .then(response => response.data);
  }
}

export default new CourseService();
