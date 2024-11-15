import APITOKEN from "@/config/http-common"; 
import { type ApiCoursesResponse } from "@/interfaces/CousesInterface";

class CourseService {
    
    findAll(): Promise<ApiCoursesResponse> {
        return APITOKEN.get('/courses').then(response => response.data);
    }
}

export default new CourseService();
