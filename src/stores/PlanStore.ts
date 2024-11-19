import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import PlanService from "@/services/PlanService";
import { type Plan } from "@/interfaces/PlanInterface";

export const usePlanStore = defineStore("PlanStore", () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const plans = ref<Plan[]>([]); 
  const selectedPlan = ref<Plan | null>(null); 
  const form = ref({
    name: "",
    email: "",
    paymentMethod: "cartao",
  });

  async function findAll(): Promise<void> {
    try {
      const response = await PlanService.findAll();
      plans.value = response.data;
    } catch (error) {
      showErrorAlert("Failed to fetch plans");
    }
  }

  async function findById(id: number) {

    const response = await PlanService.findById(id);
    selectedPlan.value = response.data;
  }

  function handlePurchase(): void {


    showSuccessAlert("Email enviado com sucesso!", "/login");
    form.value = { name: "", email: "", paymentMethod: "cartao" }; // Reset form after submission
  }

  return {
    findAll,
    plans,
    selectedPlan,
    form,
    findById,
    handlePurchase,
  };
});
