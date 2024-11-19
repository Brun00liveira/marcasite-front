<template>
  <div class="container">
    <h1 class="text topic mb-5">Cursos</h1>
    <div class="col-4 mt-3">
      <div class="input-group mb-3">
        <!-- Campo de entrada para o filtro de nome -->
        <input 
          type="text" 
          class="form-control" 
          placeholder="Nome" 
          v-model="searchName"
          aria-label="Recipient's username" 
          aria-describedby="button-addon2" 
        />
        <!-- Botão para disparar a busca -->
        <button 
          class="btn btn-outline-secondary" 
          type="button" 
          id="button-addon2" 
          @click="filterCoursesByName"
        >
          <i class="fa-solid fa-magnifying-glass text-dark"></i>
        </button>
        <button 
      class="btn btn-outline-danger ms-2" 
      type="button" 
      @click="clearFilter"
    >
      Limpar
    </button>
      </div>
    </div>

    <div class="row justify">
        <div class="col">
            <p class="text margin-bottom">Exibindo {{ userCourse.from }} até {{ userCourse.to }} de um total de 6 itens encontrados <strong>{{ userCourse.getTotal }}</strong></p>
        </div>
        <div class="col text-end">
          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addCourseModal">
            Adicionar
          </button>
          <button type="button" class="btn btn-danger mx-2 " data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-bars" style="margin-left: 0px;"></i> 
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" @click="extractExcel" href="#">Excel</a></li>
              <li><a class="dropdown-item" @click="extractPDF" href="#">PDF</a></li>
            </ul>
          </button>
        </div>
    </div>

    <table class="table table-hover mt-2">
      <thead>
        <tr style="background-color: #335992FF;">
          <th scope="col">Nome</th>
          <th scope="col">Status</th>
          <th scope="col">Categoria</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      
      <tbody v-for="course in userCourse.courses"
      :key="course.id">
        <tr>
          <td>{{course.title}}</td>
          <td>{{ course.is_active === 1 ? 'Ativo' : 'Inativo' }}</td>


          <td>{{course.category?.name}}</td>
          <td>
            
            <i
              class="fa-solid fa-pencil text-success"
              style="cursor: pointer;"
              @click="editCourse(course.id)"
              data-bs-toggle="modal"
              data-bs-target="#editCourseModal"
            ></i>

            <i class="fa-solid fa-trash text-danger" style="cursor: pointer;" @click="deleteCourse(course.id)"></i>
          </td>
        </tr>
        
      </tbody>
    </table>
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
  <AddCourse/>
  <EditCourse :course="selectedCourse" />

</div>
  


</template>
<style scoped>
th,
td {
background-color: transparent;
}

th {
color: white;
}

i {
margin-left: 10px;
cursor: pointer;
}

.margin-bottom {
margin-bottom: 0px;
}

.justify {
display: flex;
justify-content: space-between;
align-items: center;
}
</style>
<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useCourseStore } from '@/stores/CourseStore';
import { useCategoryStore } from '@/stores/CategoryStore';
import { useRoute, useRouter } from 'vue-router';
import AddCourse from './modal/course/addCourse.vue';
import EditCourse from './modal/course/editCourse.vue';
import type { Courses } from '@/interfaces/CousesInterface';
import type { Category } from '@/interfaces/CategoryInterface';

// Obtenção da instância do roteador e da rota
const route = useRoute();
const router = useRouter();

// Estados para filtros
const searchQuery = ref(route.query.search?.toString() || '');  // Inicializa com o valor de pesquisa da URL, se existir
const selectedCategories = ref<number[]>(route.query.categories ? route.query.categories.toString().split(',').map(Number) : []);  // Pega as categorias da URL, se houver

// Armazenamento de cursos e categorias
const userCourse = useCourseStore();
const categoryStore = useCategoryStore();
const searchName = ref<string>('');
// Computed para total de páginas
const totalPages = computed(() => userCourse.total);

const selectedCourse = ref<Courses>({
  id: 0,
  title: '',
  category_id: 0,
  description: '',
  category: null
});

const fetchCourses = async () => {

  const filters = {
    name: searchQuery.value,

    categories: selectedCategories.value,
  };
  await userCourse.findAllCourses(userCourse.currentPage, 6, filters);
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
  await fetchCourses();  // Carrega os cursos inicialmente
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

const deleteCourse = async (courseId: number) => {
  try {
    await userCourse.deleteCourse(courseId);
    fetchCourses()
  } catch (error) {
    console.error('Erro ao buscar o curso', error);
  }
};

const filterCoursesByName = () => {
  userCourse.findAllCourses(1, 5, { name: searchName.value });
};

const clearFilter = () => {
  searchName.value = '';
  userCourse.findAllCourses(1, 5, { name: searchName.value });
};

const extractPDF = async () => {
    try {
        await userCourse.exportCourses();
      
    } catch (error) {
        console.error('Erro ao exportar o PDF:', error);
    }
  };

  const extractExcel = async () => {
    try {
        await userCourse.exportExcelCourses();
      
    } catch (error) {
        console.error('Erro ao exportar o PDF:', error);
    }
  };

</script>
