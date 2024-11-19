import APITOKEN from "@/config/http-common";
import {type Payment } from "@/interfaces/PaymentInterface";

class PaymentService {
  // Método para buscar todos os cursos com filtros
  payment(registerData: Payment): Promise<Payment> {
    return APITOKEN.post('/payment', registerData).then(response => response.data);
}
 
}
export default new PaymentService();
