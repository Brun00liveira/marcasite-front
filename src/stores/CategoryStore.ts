import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import CategoryService from "@/services/CategoryService";
import { type Category } from "@/interfaces/CategoryInterface";
import router from "@/router";

export const useCategoryStore= defineStore('categoryStore', () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const category = ref<Category[]>([]);
  const categorie = ref<Category | null>(null);
  
  
  async function findAllCategory(): Promise<void> {
    try {
      const response = await CategoryService.getAllCategory();

      category.value = response.data;
      
 
    } catch (error) {
      showErrorAlert('Failed to fetch courses');
    }
  }

  async function createCategory(categoryData: Category): Promise<void> {
    try {
    
      await CategoryService.create(categoryData);
  
      showSuccessAlert("Curso criado com sucesso!", "/admin/categories");
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
      
        const response = await CategoryService.findById(id);
        categorie.value = response.data;

      } else {
        showErrorAlert('Erro ao buscar usuário: Usuário não autenticado');
      }
    } catch (error) {
      showErrorAlert('Erro ao buscar usuário');
    }
  }

  async function updateCategory(id: number,updateData: Category): Promise<void> {
      try {
      
          await CategoryService.update(id, updateData);

          showSuccessAlert("Perfil atualizado com sucesso!", "/home");
          setTimeout(() => {
          router.go(0);
        }, 1000);
      
      } catch (error) {
        showErrorAlert('Ocorreu um erro inesperado.');
      }
    }
    async function deleteCategory(categoryId: number): Promise<void> {
      try {
        if (categoryId) {
          const response = await CategoryService.delete(categoryId);
          
          if (response) {
            // Exibe o alerta de sucesso
            showSuccessAlert("Curso deletado com sucesso!", "/admin/Category");
          } else {
            showErrorAlert('Erro ao deletar o curso. Tente novamente mais tarde.');
          }
        } else {
          showErrorAlert('Erro: ID do curso não fornecido');
        }
      } catch (error) {
        console.error('Erro ao tentar deletar o curso:', error);
        showErrorAlert('Erro ao deletar o curso');
      }
  }
     
  return {
    category,
    categorie,
    findAllCategory,
    createCategory,
    findById,
    deleteCategory,
    updateCategory,
  };
});
