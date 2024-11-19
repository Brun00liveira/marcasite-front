import { type User, type Register, type UserResponse } from "@/interfaces/UserInterface";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import UserService from "@/services/UserService";
import { AxiosError } from "axios";
import ExportServices from "@/services/ExportServices";
import router from "@/router";

export const useUserStore = defineStore('userStore', () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const users = ref<User[]>([]);
  const currentPage = ref<number>(1);
  const lastPage = ref<number>(1);
  const total = ref<number>(1);
  const last_page = ref<number>(1);
  const from = ref<number>(1);
  const to = ref<number>(1);
  const user = ref<User | null>(null);
  const register = ref<Register | null>(null);
  
  async function findAll(
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
 
      const response = await UserService.findAll(queryFilters);
      console.log(response)
      users.value = response.data.data;
      lastPage.value = response.data.last_page;
      last_page.value = response.data.last_page;
      total.value = response.data.total;
      from.value = response.data.from;
      to.value = response.data.to;
    
    } catch (error) {
      showErrorAlert('Failed to fetch courses');
    }
}

  async function findUserById(): Promise<void> {
    try {
      const authUser =sessionStorage.getItem("auth_user");
      
      if (authUser) {
        const parsedUser = JSON.parse(authUser);
        const id = parsedUser.id;

        const userResponse = await UserService.findById(id);

        if (userResponse && userResponse.data) {
          user.value = userResponse.data;
        } else {
          showErrorAlert('Usuário não encontrado');
        }
      } else {
        showErrorAlert('Erro ao buscar usuário: Usuário não autenticado');
      }
    } catch (error) {
      showErrorAlert('Erro ao buscar usuário');
    }
  }

  async function createUser(registerData: Register): Promise<void> {
    try {
    
      await UserService.create(registerData);
      showSuccessAlert("Curso criado com sucesso!", "/admin/courses");
      setTimeout(() => {
        router.go(0);
      }, 1000);
    } catch (error) {
      showErrorAlert('Failed to fetch courses');
    }
  }

  async function findById(id: number): Promise<void> {
    try {
    
        const userResponse = await UserService.findById(id);

        if (userResponse && userResponse.data) {
          user.value = userResponse.data;
        } else {
          showErrorAlert('Usuário não encontrado');
        }
    
    } catch (error) {
      showErrorAlert('Erro ao buscar usuário');
    }
  }

  async function updateUser(updateData: Register): Promise<void> {
    try {
      const authUser =sessionStorage.getItem("auth_user");
 
      if (authUser) {
        const parsedUser = JSON.parse(authUser);
        const id = parsedUser.id;

        await UserService.update(id, updateData);

        showSuccessAlert("Perfil atualizado com sucesso!", "/home");
      } else {
        showErrorAlert('Erro: Usuário não autenticado');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = error.response?.data.errors || {};
        if (errors.email) {
          showErrorAlert(errors.email[0]);
        } else if (errors.phone) {
          showErrorAlert(errors.phone[0]);
        } else if (errors.password) {
          showErrorAlert(errors.password[0]);
        } else {
          showErrorAlert(error.response?.data?.message || "Erro ao atualizar perfil.");
        }
      } else {
        console.error('Erro desconhecido:', error);
        showErrorAlert('Ocorreu um erro inesperado.');
      }
    }
  }

  async function updateUniqueUser(updateData: Register, id: number): Promise<void> {
    try {
     
        await UserService.update(id, updateData);

        showSuccessAlert("Perfil atualizado com sucesso!", "/admin/users");
        setTimeout(() => {
          router.go(0);
        }, 1000);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = error.response?.data.errors || {};
        if (errors.email) {
          showErrorAlert(errors.email[0]);
        } else if (errors.phone) {
          showErrorAlert(errors.phone[0]);
        } else if (errors.password) {
          showErrorAlert(errors.password[0]);
        } else {
          showErrorAlert(error.response?.data?.message || "Erro ao atualizar perfil.");
        }
      } else {
        console.error('Erro desconhecido:', error);
        showErrorAlert('Ocorreu um erro inesperado.');
      }
    }
  }

  async function exportSubscription() {
    try {
        const pdfBlob = await ExportServices.subscriptionPdf();
        
        const url = window.URL.createObjectURL(pdfBlob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio_inscricao.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Erro ao exportar o PDF:', error);
    }   
  }

  async function exportExcelSubscription() {
    try {
        const excelBlob = await ExportServices.subscriptionExcel();
        
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

  async function deleteUsers(userId: number): Promise<void> {
    try {
      if (userId) {
        await UserService.delete(userId);
      
          showSuccessAlert("Curso deletado com sucesso!", "/admin/users");
      }
     
    } catch (error) {
      console.error('Erro ao tentar deletar o curso:', error);
      showErrorAlert('Erro ao deletar o curso');
    }
  }

  return {
    user,
    register,
    total,
    currentPage,
    lastPage,
    last_page,
    from,
    to,
    users,
    findUserById,
    updateUser,
    findAll,
    exportExcelSubscription,
    exportSubscription,
    createUser,
    updateUniqueUser,
    findById,
    deleteUsers
  };
});
