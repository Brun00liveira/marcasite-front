import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import EnrollmentsService from "@/services/EnrollmentService";
import { type Enrollment } from "@/interfaces/EnrollmentsInterface";
import router from "@/router";

export const useEnrollmentStore= defineStore('enrollmentStore', () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const enrollments = ref<Enrollment[]>([]);
  const enrollment = ref<Enrollment | null>(null);

  async function enrollmentsByUserId(): Promise<void> {
    try {
      const response = await EnrollmentsService.enrollmentsByUserId();
 
      enrollments.value = response.data;
      

    } catch (error) {
      showErrorAlert('Failed to fetch courses');
    }
  }

  async function createEnrollment(enrollmentData: Enrollment): Promise<void> {
    try {
    
      await EnrollmentsService.create(enrollmentData);
      showSuccessAlert("Curso criado com sucesso!", "/");
      setTimeout(() => {
        router.go(0);
      }, 1000);
    } catch (error) {
      showErrorAlert('Failed to fetch courses');
    }
  }

  async function findById(id: number): Promise<void> {
    try {  
      if (id) {
      
        const response = await EnrollmentsService.findById(id);
        enrollment.value = response.data;

      } else {
        showErrorAlert('Erro ao buscar usuário: Usuário não autenticado');
      }
    } catch (error) {
      showErrorAlert('Erro ao buscar usuário');
    }
  }
     
  return {
    enrollments,
    enrollment,
    enrollmentsByUserId,
    createEnrollment,
    findById
  };
});
