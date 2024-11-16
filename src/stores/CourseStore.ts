import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import CourseService from "@/services/CourseService";
import { type Courses } from "@/interfaces/CousesInterface";
import { useRouter } from "vue-router";
import router from "@/router";

export const useCourseStore = defineStore('courseStore', () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const courses = ref<Courses[]>([]);
  const loading = ref<boolean>(false);
  const currentPage = ref<number>(1);
  const lastPage = ref<number>(1);
  const total = ref<number>(1);
  const getTotal = ref<number>(1);
  const from = ref<number>(1);
  const to = ref<number>(1);

  async function findAllCourses(
    page: number = 1,
    perPage: number = 1,
    filters: {name?: string; price?: number; categories?: number[] } = {}
  ): Promise<void> {
    try {
      loading.value = true;

      const categoryIds = filters.categories?.join(',');

      const queryFilters: any = {
        page,
        perPage,
        ...(filters.name && { name: filters.name }),  
        ...(filters.price && { price: filters.price }),
        ...(categoryIds && { category_id: categoryIds })
      };

      const response = await CourseService.findAll(queryFilters);

      courses.value = response.data.data;
      lastPage.value = response.data.last_page;
      total.value = response.data.last_page;
      getTotal.value = response.data.total;
      from.value = response.data.from;
      to.value = response.data.to;
      
    } catch (error) {
      showErrorAlert('Failed to fetch courses');
    } finally {
      loading.value = false;
    }
  }

  async function createCourse(courseData: Courses): Promise<void> {
    try {
    
      await CourseService.create(courseData);
      showSuccessAlert("Curso criado com sucesso!", "/admin/courses");
      setTimeout(() => {
        router.go(0);
      }, 1000);
    } catch (error) {
      showErrorAlert('Failed to fetch courses');
    }
  }

  async function findUserById(id: number): Promise<void> {
    try {  
      if (id) {
         await CourseService.findById(id);

      } else {
        showErrorAlert('Erro ao buscar usuário: Usuário não autenticado');
      }
    } catch (error) {
      showErrorAlert('Erro ao buscar usuário');
    }
  }

  return {
    courses,
    loading,
    total,
    currentPage,
    lastPage,
    getTotal,
    from,
    to,
    findAllCourses,
    createCourse,
    findUserById
  };
});
