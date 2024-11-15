import APITOKEN from "@/config/http-common"; 
import { type ApiCoursesResponse } from "@/interfaces/CousesInterface";

class CourseService {
    
    findAll(page: number = 1, perPage: number = 10, name: string | null = null): Promise<ApiCoursesResponse> {
        return APITOKEN.get('/courses', {
            params: {
                page, 
                perPage,
                name,
            }
        }).then(response => response.data);
    }

}

export default new CourseService();
