import APITOKEN from "@/config/http-common";
import { type ApiSubscribeResponse, type Subscription } from "@/interfaces/SubscriptionInterface";

class SubscriptionService {
  // Método para buscar todos os cursos com filtros
  findAll(params: any): Promise<ApiSubscribeResponse> {
    return APITOKEN.get('/subscription', { params })
      .then(response => response.data);
  }
}
export default new SubscriptionService();
