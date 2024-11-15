import APITOKEN from "@/config/http-common"; 
import { type ApiCategoryResponse } from "@/interfaces/CategoryInterface";

class EnrollmentsService {
    
    getAllCategory(): Promise<ApiCategoryResponse> {
        return APITOKEN.get('/categories').then(response => response.data);
    }

}
export default new EnrollmentsService();
