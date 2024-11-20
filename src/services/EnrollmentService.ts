import APITOKEN from "@/config/http-common"; 
import { type ApiEnrollmentResponse, type Enrollment, type enrollmentResponse } from "@/interfaces/EnrollmentsInterface";

class EnrollmentsService {
    
    enrollmentsByUserId(): Promise<ApiEnrollmentResponse> {
        return APITOKEN.get('/enrollmentsByUserId').then(response => response.data);
    }

    create(registerData: Enrollment): Promise<Enrollment> {
        return APITOKEN.post('/enrollments', registerData).then(response => response.data);
    }

    findById(id: number): Promise<enrollmentResponse> {
        return APITOKEN.get(`/enrollments/${id}`).then(response => response.data);
    }

}

export default new EnrollmentsService();
