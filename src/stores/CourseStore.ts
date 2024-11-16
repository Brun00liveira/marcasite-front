// store/useCourseStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import CourseService from "@/services/CourseService";
import { type Courses } from "@/interfaces/CousesInterface";

export const useCourseStore = defineStore('courseStore', () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const courses = ref<Courses[]>([]);
  const loading = ref<boolean>(false);

  async function findAllCourses(
    page: number = 1,
    perPage: number = 10,
    filters: { price?: number; categories?: number[] } = {}
  ): Promise<void> {
    try {
      loading.value = true;
  
      const categoryIds = filters.categories?.join(',');
     
      const queryFilters: any = {
        page,
        perPage,
        ...(filters.price && { price: filters.price }),
        ...(categoryIds && { category_id: categoryIds })
      };
      
      const response = await CourseService.findAll(queryFilters);
    
      courses.value = response.data.data;
    } catch (error) {
      showErrorAlert('Failed to fetch courses');
    } finally {
      loading.value = false;
    }
  }

  return {
    courses,
    loading,
    findAllCourses,
  };
});
