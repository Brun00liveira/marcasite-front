<template>
  <div class="row">
    <div class="col-8">
      <h1 class="text topic">Cursos</h1>
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
              <a :href="`/courses/${course.id}`" class="btn btn-primary">Saiba mais</a>
            </div>
          </div>
        </div>
      
      </div>
      <div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
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

        <h5 class="text-dark mt-4">Preço</h5>
        <div class="form-group">
          <label for="priceRange" class="form-label">Preço</label>
          <input
            type="range"
            class="form-range"
            id="priceRange"
            min="0"
            max="1000"
            step="10"
            v-model="selectedPrice"
            @mouseup="fetchCourses"
            
          />
          <div class="d-flex justify-content-between">
            <span id="priceMin" class="text">R$ 0</span>
            <span id="currentPrice" class="text">R$ {{ selectedPrice }}</span>
            <span id="priceMax" class="text">R$ 1000</span>
          </div>
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
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useCourseStore } from '@/stores/CourseStore';
import { useCategoryStore } from '@/stores/CategoryStore';

const selectedCategories = ref<number[]>([]);
const selectedPrice = ref(500);

const totalPages = computed(() => userCourse.total); // Ensure this computed property fetches the correct value
const userCourse = useCourseStore();

const categoryStore = useCategoryStore();

const fetchCourses = async () => {
  const filters = {
    price: selectedPrice.value,
    categories: selectedCategories.value,
  };
  await userCourse.findAllCourses(userCourse.currentPage, 6, filters);
};

const changePage = (pageNumber: number) => {
  if (pageNumber >= 1 && pageNumber <= userCourse.lastPage) {
    userCourse.findAllCourses(pageNumber, 6, {
      price: selectedPrice.value,
      categories: selectedCategories.value,
    });
  }
};

onMounted(async () => {
  await categoryStore.findAllCategory();
  await fetchCourses();
});

watch(selectedCategories, fetchCourses);
</script>


