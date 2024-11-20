<template>
  <div class="row">
    <div class="col-8">
      <h1 class="text topic">Cursos</h1>
      <div class="mt-5">
        <form @submit.prevent="handleSearch" class="d-flex" role="search">
          <input
            v-model="searchQuery"
            class="form-control me-2"
            type="search"
            placeholder="Pesquise por um curso"
            aria-label="Search"
          />
          <button class="btn btn-outline-primary" type="submit">Search</button>
        </form>
  </div>
      <div class="row mt-5">
        <div
          v-for="course in userCourse.courses"
          :key="course.id"
          class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4"
        >
          <div class="card" style="width: 100%;">
            <img src="/images/Home/notebook.png" class="card-img-top" alt="Curso imagem" />
            <div class="card-body">
              <h5 class="card-title">{{ course.title }}</h5>
              <p class="card-text">{{ course.description }}</p>
              <button 
                v-if="!isCoursePurchased(course.id)" 
                type="button" 
                class="btn btn-success" 
                data-bs-toggle="modal" 
                @click="editCourse(course.id)" 
                data-bs-target="#addEnrollmentModal"
              >
                Adicionar Curso
              </button>
              <button 
                v-else 
                type="button" 
                class="btn btn-secondary" 
                disabled
              >
                Curso já comprado
              </button>

           
            </div>
          </div>
        </div>
      </div>
      <div>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: userCourse.currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="changePage(userCourse.currentPage - 1)">Previous</a>
            </li>
            <li
              v-for="pageNumber in totalPages"
              :key="pageNumber"
              class="page-item"
              :class="{ active: pageNumber === userCourse.currentPage }"
            >
              <a class="page-link" href="#" @click.prevent="changePage(pageNumber)">{{ pageNumber }}</a>
            </li>
            <li class="page-item" :class="{ disabled: userCourse.currentPage === userCourse.lastPage }">
              <a class="page-link" href="#" @click.prevent="changePage(userCourse.currentPage + 1)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="col-3 mt-5">
      <h4 class="text-dark">Filtro de Cursos</h4>
      <form class="mt-4">
        <div
          v-for="category in categoryStore.category"
          :key="category.id"
          class="form-check mt-1"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="category.id"
            v-model="selectedCategories"
          />
          <label class="form-check-label text" :for="category.slug">
            {{ category.name }}
          </label>
        </div>

       
      </form>
      <h4 class="text-dark mt-4">Professores</h4>

      <form class="mt-4">
        <div class="card mt-3">
            <div class="d-flex justify-content-center mt-3">
                <img src="https://via.placeholder.com/50" alt="User" class="img-fluid rounded-circle" style="width: 80px; height: 80px;">
            </div>
            <div class="card-body text-center">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <small class="card-text emphasis">20 cursos</small>
            </div>
        </div>
        <div class="card mt-3">
            <div class="d-flex justify-content-center mt-3">
                <img src="https://via.placeholder.com/50" alt="User" class="img-fluid rounded-circle" style="width: 80px; height: 80px;">
            </div>
            <div class="card-body text-center">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <small class="card-text emphasis">20 cursos</small>
            </div>
        </div>

        <div class="card mt-3">
            <div class="d-flex justify-content-center mt-3">
                <img src="https://via.placeholder.com/50" alt="User" class="img-fluid rounded-circle" style="width: 80px; height: 80px;">
            </div>
            <div class="card-body text-center">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <small class="card-text emphasis">20 cursos</small>
            </div>
        </div>
      </form>
    </div>
  </div>
  <InfoCourse :course="selectedCourse"/>

</template>


<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useEnrollmentStore } from '@/stores/EnrollmentStore';
import { useCategoryStore } from '@/stores/CategoryStore';
import { useRoute, useRouter } from 'vue-router';
import InfoCourse from '../Admin/modal/enrollment/infoCourse.vue';
import type { Enrollment } from '@/interfaces/EnrollmentsInterface';
import { useCourseStore } from '@/stores/CourseStore';
import type { Courses } from '@/interfaces/CousesInterface';

// Obtenção da instância do roteador e da rota
const route = useRoute();
const router = useRouter();
const enrollmentStore = useEnrollmentStore();
console.log(enrollmentStore.enrollments)
const selectedCourse = ref<Courses>({
  id: 0,
  title: '',
  category_id: 0,
  description: '',
  category: null
});

const editCourse = async (courseId: number) => {
  try {
    await userCourse.findById(courseId);

    if (userCourse.course) {
      selectedCourse.value = userCourse.course; 
    }
  } catch (error) {
    console.error('Erro ao buscar o curso', error);
  }
};


// Estados para filtros
const searchQuery = ref(route.query.search?.toString() || '');  // Inicializa com o valor de pesquisa da URL, se existir
const selectedCategories = ref<number[]>(route.query.categories ? route.query.categories.toString().split(',').map(Number) : []);  // Pega as categorias da URL, se houver

// Armazenamento de cursos e categorias
const userCourse = useCourseStore();
const categoryStore = useCategoryStore();

// Computed para total de páginas
const totalPages = computed(() => userCourse.total);

// Função para buscar cursos com os filtros
const fetchCourses = async () => {
  const filters = {
    name: searchQuery.value,  // Filtro por nome
    categories: selectedCategories.value,
  };
  await userCourse.findAllCourses(userCourse.currentPage, 6, filters);
};

const isCoursePurchased = (courseId: number): boolean => {

  return enrollmentStore.enrollments.some(
    (enrollment: Enrollment) => enrollment.course_id === courseId
  );
};


// Função para alterar a página
const changePage = (pageNumber: number) => {
  if (pageNumber >= 1 && pageNumber <= userCourse.lastPage) {
    userCourse.findAllCourses(pageNumber, 6, {
      categories: selectedCategories.value,
      name: searchQuery.value,
    });
  }
};

// Monitoramento dos filtros (sempre que eles mudam, a busca é feita e a URL é atualizada)
watch([selectedCategories, searchQuery], () => {
  fetchCourses();
}, { immediate: true });

// Carregar categorias ao montar o componente
onMounted(async () => {
  await categoryStore.findAllCategory();
  await enrollmentStore.enrollmentsByUserId();
  await fetchCourses();  
});

const handleSearch = async () => {
  const filters = {
    name: searchQuery.value,
  };

  await userCourse.findAllCourses(1, 6, filters);
};
</script>
