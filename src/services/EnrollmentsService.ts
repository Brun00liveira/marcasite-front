import APITOKEN from "@/config/http-common"; 
import { type ApiEnrollmentResponse } from "@/interfaces/EnrollmentsInterface";

class EnrollmentsService {
    
    enrollmentsByUserId(): Promise<ApiEnrollmentResponse> {
        return APITOKEN.get('/enrollmentsByUserId').then(response => response.data);
    }

}

export default new EnrollmentsService();
