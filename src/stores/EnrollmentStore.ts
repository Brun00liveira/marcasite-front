import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import EnrollmentsService from "@/services/EnrollmentsService";
import { type Enrollment } from "@/interfaces/EnrollmentsInterface";

export const useEnrollmentStore= defineStore('enrollmentStore', () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const enrollments = ref<Enrollment[]>([]);
  
  async function enrollmentsByUserId(): Promise<void> {
    try {
      const response = await EnrollmentsService.enrollmentsByUserId();

      enrollments.value = response.data;
      

    } catch (error) {
      showErrorAlert('Failed to fetch courses');
    }
  }
     
  return {
    enrollments,
    enrollmentsByUserId,
  };
});
