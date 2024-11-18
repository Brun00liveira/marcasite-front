import APITOKEN from "@/config/http-common"; 
import { type ApiDashboardResponse } from "@/interfaces/DashboardInterface";

class EnrollmentsService {
    
    getDashboard(): Promise<ApiDashboardResponse> {
        return APITOKEN.get('/dashboard').then(response => response.data);
    }

}

export default new EnrollmentsService();
