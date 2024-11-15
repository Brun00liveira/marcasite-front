import { type User} from "@/interfaces/UserInterface";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import UserService from "@/services/UserService";

export const useUserStore = defineStore('userStore', () => {
  const {showErrorAlert } = useAlert();

  const user = ref<User | null>(null);

  async function findById(): Promise<void> {
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
  
  return {
    user,          
    findById
  };
});
