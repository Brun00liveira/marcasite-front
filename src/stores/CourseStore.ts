import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import CourseService from "@/services/CourseService";
import { type Courses } from "@/interfaces/CousesInterface";

export const useCourseStore = defineStore('courseStore', () => {
  const { showSuccessAlert, showErrorAlert } = useAlert();

  const courses = ref<Courses[]>([]);
  
  async function findAllCourses(): Promise<void> {
    try {
      const response = await CourseService.findAll();
    
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
