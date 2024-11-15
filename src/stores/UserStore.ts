import { type User, type Register } from "@/interfaces/UserInterface";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import UserService from "@/services/UserService";
import { AxiosError } from "axios";

export const useUserStore = defineStore('userStore', () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const user = ref<User | null>(null);
  const register = ref<Register | null>(null);
  
  async function findUserById(): Promise<void> {
    try {
      const authUser = localStorage.getItem('auth_user');
      
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

  async function updateUser(updateData: Register): Promise<void> {
    try {
      const authUser = localStorage.getItem('auth_user');
      
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

  return {
    user,
    register,
    findUserById,
    updateUser
  };
});
