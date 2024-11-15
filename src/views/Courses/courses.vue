<template>
    <div class="row">
        <div class="col-8">
            <h1 class="text topic">Cursos</h1>
            <div class="row mt-5">
                <!-- Usando v-for para iterar sobre os cursos -->
                <div v-for="course in filteredCourses " :key="course.id" class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
                    <div class="card" style="width: 100%;">
                        <img src="/images/Home/notebook.png" class="card-img-top" alt="Curso imagem">
                        <div class="card-body">
                            <h5 class="card-title">{{ course.title }}</h5>
                            <p class="card-text">{{ course.description }}</p>
                            <a :href="`/courses/${course.id}`" class="btn btn-primary">Saiba mais</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
        <div class="col-3 mt-5">
            <h4 class="text-dark">Filtro de Cursos</h4>

            <form class="mt-4">
                <div class="form-check mt-1">
                    <input class="form-check-input" type="checkbox" value="symfony" id="symfony">
                    <label class="form-check-label text" for="symfony">
                        Symfony
                    </label>
                </div>

                <div class="form-check mt-1">
                    <input class="form-check-input" type="checkbox" value="laravel" id="laravel">
                    <label class="form-check-label text" for="laravel">
                        Laravel
                    </label>
                </div>

                <div class="form-check mt-1">
                    <input class="form-check-input" type="checkbox" value="php" id="php">
                    <label class="form-check-label text" for="php">
                        PHP
                    </label>
                </div>

                <div class="form-check mt-1">
                    <input class="form-check-input" type="checkbox" value="lumen" id="lumen">
                    <label class="form-check-label text" for="lumen">
                        Lumen
                    </label>
                </div>

                <div class="form-check mt-1">
                    <input class="form-check-input" type="checkbox" value="all" id="all">
                    <label class="form-check-label text" for="all">
                        Todos
                    </label>
                </div>
                <h5 class="text-dark mt-4">Preço</h5>

                <div class="">
                    <div class="form-group">
                        <label for="priceRange" class="form-label">Preço</label>
                        <input type="range" class="form-range" id="priceRange" min="0" max="1000" step="10" value="500">
                        <div class="d-flex justify-content-between">
                            <span id="priceMin" class="text">R$ 0</span>
                            <span id="currentPrice" class="text">R$ 500</span>
                            <span id="priceMax" class="text">R$ 1000</span>
                        </div>
                    </div>
                </div>

            </form>

            <h4 class="text-dark mt-4">Professores</h4>

            <div class="mt-4">
            <div class="card mt-3" style="width: 18rem;">
                <div class="d-flex justify-content-center mt-3">
                    <img src="https://via.placeholder.com/50" alt="User" class="img-fluid rounded-circle" style="width: 80px; height: 80px;">
                </div>
                <div class="card-body text-center">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <small class="card-text emphasis">20 cursos</small>
                </div>
            </div>

            <div class="card mt-3" style="width: 18rem;">
                <div class="d-flex justify-content-center mt-3">
                    <img src="https://via.placeholder.com/50" alt="User" class="img-fluid rounded-circle" style="width: 80px; height: 80px;">
                </div>
                <div class="card-body text-center">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <small class="card-text emphasis">20 cursos</small>
                </div>
            </div>

            <div class="card mt-3" style="width: 18rem;">
                <div class="d-flex justify-content-center mt-3">
                    <img src="https://via.placeholder.com/50" alt="User" class="img-fluid rounded-circle" style="width: 80px; height: 80px;">
                </div>
                <div class="card-body text-center">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <small class="card-text emphasis">20 cursos</small>
                </div>
            </div>
        </div>

        </div>

    </div>
 </template>
 
<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useCourseStore } from '@/stores/CourseStore';
import { useRoute } from 'vue-router';

const userCourse = useCourseStore();
const route = useRoute();

onMounted(async () => {
  await userCourse.findAllCourses();
});

// Computed property para filtrar os cursos com base no parâmetro de busca
const filteredCourses = computed(() => {
  const searchTerm = route.query.search?.toString().toLowerCase() || '';
  return userCourse.courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm) || 
    course.description.toLowerCase().includes(searchTerm)
  );
});
</script>