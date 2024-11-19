import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import SubscriptionService from "@/services/SubscriptionService";
import ExportServices from "@/services/ExportServices";
import { type Subscription } from "@/interfaces/SubscriptionInterface";
import { useRouter } from "vue-router";
import router from "@/router";

export const useSubscriptionStore = defineStore('subscriptionStore', () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const subscriptions = ref<Subscription[]>([]);
  const subscription = ref<Subscription[]>([]);
  const currentPage = ref<number>(1);
  const lastPage = ref<number>(1);
  const total = ref<number>(1);
  const last_page = ref<number>(1);
  const from = ref<number>(1);
  const to = ref<number>(1);

  async function findAllSubscription(
    page: number = 1,
    perPage: number = 6,
    filters: {name?: string} = {}
  ): Promise<void> {
    try {
      const queryFilters: any = {
        page,
        perPage,
        name: filters.name
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

  async function exportSubscription() {
    try {
        const pdfBlob = await ExportServices.subscriptionPdf(); // Chama o serviço e obtém o Blob (PDF)
        
        // Cria uma URL temporária para o Blob
        const url = window.URL.createObjectURL(pdfBlob);
        
        // Cria um link (a) para disparar o download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio_inscricao.pdf'; // Nome do arquivo PDF
        document.body.appendChild(a);  // Adiciona o link ao DOM
        a.click();  // Simula o clique para fazer o download
        a.remove();  // Remove o link após o clique

        // Limpa a URL temporária criada
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Erro ao exportar o PDF:', error);
    }   
  }

  async function exportExcelSubscription() {
    try {
        const excelBlob = await ExportServices.subscriptionExcel(); // Chama o serviço e obtém o Blob (Excel)
        
        const url = window.URL.createObjectURL(excelBlob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio_inscricao.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Erro ao exportar o Excel:', error);
    }
  }

  async function findByUserId() {
    try {
      const response = await SubscriptionService.findByUserId();
      subscription.value = response.data;
      console.log(subscription)
    } catch (error) {
      console.error('Erro ao buscar assinatura por usuário:', error);
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
    subscription,
    findAllSubscription,
    exportSubscription,
    exportExcelSubscription,
    findByUserId, // Agora corretamente incluído no retorno
  };
});
