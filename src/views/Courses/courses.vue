<template>
    <div class="row">
      <div class="col-8">
        <h1 class="text topic">Cursos</h1>
        <div class="row mt-5">
          <!-- Usando v-for para iterar sobre os cursos -->
          <div
            v-for="course in filteredCourses"
            :key="course.id"
            class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4"
          >
            <div class="card" style="width: 100%;">
              <img
                src="/images/Home/notebook.png"
                class="card-img-top"
                alt="Curso imagem"
              />
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
  
          <!-- Filtro de preço -->
          <!-- Filtro de preço -->
            <h5 class="text-dark mt-4">Preço</h5>
            <div>
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
                />
                <div class="d-flex justify-content-between">
                <span id="priceMin" class="text">R$ 0</span>
                <span id="currentPrice" class="text">R$ {{ selectedPrice }}</span>
                <span id="priceMax" class="text">R$ 1000</span>
                </div>
            </div>
            </div>

        </form>
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue';
  import { useCourseStore } from '@/stores/CourseStore';
  import { useCategoryStore } from '@/stores/CategoryStore';
  import { useRoute } from 'vue-router';

  const selectedPrice = ref(500);
  const selectedCategories = ref<number[]>([]);
  const userCourse = useCourseStore();
  const categoryStore = useCategoryStore();
  const route = useRoute();
  
  onMounted(async () => {
    await userCourse.findAllCourses();
    await categoryStore.findAllCategory();
  });
  
  
  const filteredCourses = computed(() => {
  const searchTerm = route.query.search?.toString().toLowerCase() || '';
  return userCourse.courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm);

    const matchesCategory = selectedCategories.value.length
      ? selectedCategories.value.includes(course.category_id)
      : true;

    const matchesPrice = course.price <= selectedPrice.value;

    return matchesSearch && matchesCategory && matchesPrice;
  });
});

  </script>
  