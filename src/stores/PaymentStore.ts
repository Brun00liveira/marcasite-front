import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import PaymentService from "@/services/PaymentService";
import { type Payment } from "@/interfaces/PaymentInterface";

export const usePaymentStore = defineStore('paymentStore', () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const courses = ref<Payment[]>([]);

  async function createPayment(paymentData: Payment): Promise<void> {
    try {
    
      await PaymentService.payment(paymentData);
      showSuccessAlert("Curso criado com sucesso!", "/plans-confirmed");
     
    } catch (error) {
      showErrorAlert('Failed to fetch courses');
    }
  }

  return {
    courses,
    createPayment,
  };
});
