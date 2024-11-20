<template>
    <div class="mx-5">
        <div v-if="!subscriptionStore.subscription['0']?.plan" class="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
        <div>
            <strong>Atenção!</strong> Para continuar, é necessário comprar nosso plano pacote com todos os cursos.
        </div>
        <router-link to="/plans">
         <button class="btn btn-outline-danger">Comprar Plano</button>
        </router-link>
    </div>

        <div class="row align-items-center">
            <div class="col-12 col-md-8 col-lg-6">
            <h1 class="text">Garanta seu Futuro com os cursos da <strong class="emphasis">MarcaSite Cursos!</strong> </h1>
            
            <div class="mt-5" v-if="subscriptionStore.subscription['0']?.status == 'PAYMENT_RECEIVED'">
                <form @submit.prevent="searchCourses" class="d-flex" role="search">
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
        </div>
            <div class="col-12 col-md-4 col-lg-6 d-none d-md-block">
            <img src="/images/Home/notebook.png" alt="Imagem de Login" class="img-fluid w-100 h-100 rounded">
            </div>
        </div>
        <div class="row align-items-center" v-if="subscriptionStore.subscription['0']?.status == 'PAYMENT_RECEIVED'">
            <h1 class="text topic">Ultimos Lançamentos </h1>
            <!-- Cards Responsivos -->
            <div class="row mt-5">
                <!-- Usando v-for para iterar sobre os cursos -->
                <div   v-for="course in userCourse.courses.slice(0, 6)" :key="course.id" class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
                    <div class="card" style="width: 100%;">
                        <img src="/images/Home/notebook.png" class="card-img-top" alt="Curso imagem">
                        <div class="card-body">
                            <h5 class="card-title">{{ course.title }}</h5>
                            <p class="card-text">{{ course.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useCourseStore } from '@/stores/CourseStore';
import { useRouter } from 'vue-router';
import { useSubscriptionStore } from "@/stores/SubscriptionStore";

const searchQuery = ref<string>('');
const router = useRouter();
const userCourse = useCourseStore();
const subscriptionStore = useSubscriptionStore();

const searchCourses = async () => {
  router.push({ path: '/courses', query: { search: searchQuery.value } });
};

onMounted(async () => {
  await userCourse.findAllCourses(1, 10);
  subscriptionStore.findByUserId();
});
</script>

