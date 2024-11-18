import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import DashboardService from "@/services/DashboardService";
import { type Dashboard } from "@/interfaces/DashboardInterface";


export const useDashboardStore= defineStore('dashboardStore', () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const dashboard = ref<Dashboard>({
    paymentReceivedCount: 0,
    paymentPending: 0,
    totalUsers: 0,
    inactiveUsers: 0,
    activeUser: 0,
    coursesQuantity: 0,
    labelsCategory: [],
    seriesCategory: [],
    totalEnrollments: 0,
    labelsEnrollments: [],
    seriesEnrollments: [],
    labelsCourse: [],
    seriesCourse: []
  });
  
  async function findAll(): Promise<void> {
    try {
      const response = await DashboardService.getDashboard();

      dashboard.value = response.data;
    
    } catch (error) {
      showErrorAlert('Failed to fetch courses');
    }
}
return {
    findAll,
    dashboard
  };
});