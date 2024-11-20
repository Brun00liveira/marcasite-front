<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid">
      <!-- Logo ou Brand -->
      <a class="navbar-brand text-white" href="#">Brand</a>

      <!-- Botão para mobile -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu colapsável -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <!-- Campo de Busca -->
         
          <div class="nav-item" v-if="authUser.role == 'user' && subscriptionStore.subscription['0']?.status == 'PAYMENT_RECEIVED'">

                <form @submit.prevent="searchCourses" class="d-flex mx-5" role="search">
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
          <!-- Usuário -->
          <li class="nav-item">
            <div class="dropdown mx-2">
              <div class="dropdown-toggle custom-border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://via.placeholder.com/50" alt="User" class="img-fluid rounded-circle" style="width: 40px; height: 40px;">
              </div>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#perfilModal">Perfil</a></li>
              
              
                 <a href="#" @click="logout" style="text-decoration: none;">
                  <li class="dropdown-item">Sair</li>
                </a>

              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <modalProfile/>
</template>
<script setup lang="ts">
import modalProfile from '@/views/User/modalProfile.vue';
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { onMounted } from "vue";
import { useSubscriptionStore } from "@/stores/SubscriptionStore";

const searchQuery = ref<string>('');
  const authUser = ref(JSON.parse(sessionStorage.getItem("auth_user") || "{}"));
  const subscriptionStore = useSubscriptionStore();
  const router = useRouter();

const searchCourses = async () => {

  await router.replace({ path: '/courses', query: { search: searchQuery.value } });
};
const authStore = useAuthStore();

function logout() {
    authStore.logout();
}

onMounted(() => {
    subscriptionStore.findByUserId(); // Chama o método do store para buscar a assinatura
  });

</script>

