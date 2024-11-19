import APITOKEN from "@/config/http-common"; 
import { type Plan, type ApiPlanResponse, type ApiPlanUpdateResponse} from "@/interfaces/PlanInterface"; 

class PlanService {
   
    create(registerData: Plan): Promise<Plan> {
        return APITOKEN.post('/plans', registerData).then(response => response.data);
    }

    findAll(): Promise<ApiPlanResponse> {
        return APITOKEN.get('/plans').then(response => response.data);
    }

    findById(id: number): Promise<ApiPlanUpdateResponse> {
        return APITOKEN.get(`/plans/${id}`).then(response => response.data);
    }

    update(id: number, updateData: Partial<Plan>): Promise<Plan> {
        return APITOKEN.put(`/plans/${id}`, updateData).then(response => response.data);
    }

    delete(id: number): Promise<void> {
        return APITOKEN.delete(`/api/users/${id}`).then(response => response.data);
    }
}

export default new PlanService();
