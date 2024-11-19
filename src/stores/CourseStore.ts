import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import CourseService from "@/services/CourseService";
import { type Courses } from "@/interfaces/CousesInterface";
import { useRouter } from "vue-router";
import router from "@/router";
import ExportServices from "@/services/ExportServices";

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
  const course = ref<Courses | null>(null);

  async function findAllCourses(
    page: number = 1,
    perPage: number = 1,
    filters: {name?: string; categories?: number[] } = {}
  ): Promise<void> {
    try {
      loading.value = true;

      const categoryIds = filters.categories?.join(',');

      const queryFilters: any = {
        page,
        perPage,
        ...(filters.name && { name: filters.name }),  
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

  async function findById(id: number): Promise<void> {
    try {  
      if (id) {
      
        const response = await CourseService.findById(id);
        course.value = response.data;

      } else {
        showErrorAlert('Erro ao buscar usuário: Usuário não autenticado');
      }
    } catch (error) {
      showErrorAlert('Erro ao buscar usuário');
    }
  }

  async function updateCourse(id: number,updateData: Courses): Promise<void> {
    try {
     
        await CourseService.update(id, updateData);

        showSuccessAlert("Perfil atualizado com sucesso!", "/home");
         setTimeout(() => {
        router.go(0);
      }, 1000);
    
    } catch (error) {
      showErrorAlert('Ocorreu um erro inesperado.');
    }
  }
  async function deleteCourse(courseId: number): Promise<void> {
    try {
      if (courseId) {
        const response = await CourseService.delete(courseId);
        
        if (response) {
          // Exibe o alerta de sucesso
          showSuccessAlert("Curso deletado com sucesso!", "/admin/courses");
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
  async function exportCourses() {
    try {
        const pdfBlob = await ExportServices.CoursePdf();
        
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

  async function exportExcelCourses() {
    try {
        const excelBlob = await ExportServices.CourseExcel();
        
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

  return {
    courses,
    course,
    loading,
    total,
    currentPage,
    lastPage,
    getTotal,
    from,
    to,
    findAllCourses,
    createCourse,
    findById,
    deleteCourse,
    updateCourse,
    exportCourses,
    exportExcelCourses
  };
});
