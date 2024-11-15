import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import CourseService from "@/services/CourseService";
import { type Courses } from "@/interfaces/CousesInterface";

export const useCourseStore = defineStore('courseStore', () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const courses = ref<Courses[]>([]);
  
  // Função para buscar cursos com filtro de nome
  async function findAllCourses(page: number = 1, perPage: number = 10, name: string | null = null): Promise<void> {
    try {
      const response = await CourseService.findAll(page, perPage, name); // Passando o nome para o serviço
      courses.value = response.data.data;

    } catch (error) {
      showErrorAlert('Failed to fetch courses');
    }
  }

  return {
    courses,
    findAllCourses,
  };
});
