import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import CategoryService from "@/services/CategoryService";
import { type Category } from "@/interfaces/CategoryInterface";

export const useCategoryStore= defineStore('categoryStore', () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const category = ref<Category[]>([]);
  
  async function findAllCategory(): Promise<void> {
    try {
      const response = await CategoryService.getAllCategory();

      category.value = response.data;
      
    console.log(category)
    } catch (error) {
      showErrorAlert('Failed to fetch courses');
    }
  }
     
  return {
    category,
    findAllCategory,
  };
});
