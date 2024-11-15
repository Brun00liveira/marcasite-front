<template>
    <div class="mx-5">
        <div class="row align-items-center">
            <div class="col-12 col-md-8 col-lg-6">
            <h1 class="text">Garanta seu Futuro com os cursos da <strong class="emphasis">MarcaSite Cursos!</strong> </h1>
            
            <div class="mt-5">
                <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Pesquise por um curso" aria-label="Search">
                <button class="btn btn-outline-primary" type="submit">Search</button>
                </form>
            </div>
            </div>
            <div class="col-12 col-md-4 col-lg-6 d-none d-md-block">
            <img src="/images/Home/notebook.png" alt="Imagem de Login" class="img-fluid w-100 h-100 rounded">
            </div>
        </div>
        <div class="row align-items-center">
            <h1 class="text topic"> Alguns Lançamentos </h1>

            <!-- Cards Responsivos -->
            <div class="row mt-5">
                <!-- Usando v-for para iterar sobre os cursos -->
                <div v-for="course in userCourse.courses" :key="course.id" class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
                    <div class="card" style="width: 100%;">
                        <img :src="course.photo" class="card-img-top" alt="Curso imagem">
                        <div class="card-body">
                            <h5 class="card-title">{{ course.title }}</h5>
                            <p class="card-text">{{ course.description }}</p>
                            <a :href="`/courses/${course.id}`" class="btn btn-primary">Saiba mais</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useCourseStore } from '@/stores/CourseStore';

const userCourse = useCourseStore();

onMounted(async () => {
   await userCourse.findAllCourses();
   console.log(userCourse.courses);
});
</script>
