import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import SubscriptionService from "@/services/SubscriptionService";
import { type Subscription } from "@/interfaces/SubscriptionInterface";
import { useRouter } from "vue-router";
import router from "@/router";

export const useSubscriptionStore = defineStore('subscriptionStore', () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const subscriptions = ref<Subscription[]>([]);
  const currentPage = ref<number>(1);
  const lastPage = ref<number>(1);
  const total = ref<number>(1);
  const last_page = ref<number>(1);
  const from = ref<number>(1);
  const to = ref<number>(1);

  async function findAllSubscription(
    page: number = 1,
    perPage: number = 6,
  ): Promise<void> {
    try {
     
      const queryFilters: any = {
        page,
        perPage
      };

      const response = await SubscriptionService.findAll(queryFilters);
   
      subscriptions.value = response.data.data;
      lastPage.value = response.data.last_page;
      last_page.value = response.data.last_page;
      total.value = response.data.total;
      from.value = response.data.from;
      to.value = response.data.to;
      
    } catch (error) {
      showErrorAlert('Failed to fetch courses');
    }
  }
  return {
    subscriptions,
    total,
    currentPage,
    lastPage,
    last_page,
    from,
    to,
    findAllSubscription
  };
});