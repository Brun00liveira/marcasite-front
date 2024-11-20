<template>
    <div class="col-auto px-sm-2 px-0 navbar position-fixed mt-5">
      <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <!-- Menu para Usuários -->
        <ul
          v-if="authUser.role == 'user'"
          class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li class="nav-item">
            <router-link to="/home" class="nav-link align-middle px-0 mb-2">
              <i class="fa-solid fa-house" style="margin-right: 10px;"></i>
              <span class="ms-1 d-sm-inline">Home</span>
            </router-link>
          </li>
  
          <li>
            <router-link to="/my-courses" class="nav-link align-middle px-0 mb-2">
              <i class="fa-solid fa-chalkboard-user" style="margin-right: 10px;"></i>
              <span class=" d-sm-inline">Meus Cursos</span>
            </router-link>
          </li>
  
          <li>
            <router-link to="/courses" class="nav-link align-middle px-0 mb-2">
              <i class="fa-solid fa-magnifying-glass" style="margin-right: 8px;"></i>
              <span class="ms-1 d-sm-inline">Explorar Cursos</span>
            </router-link>
          </li>
  
          <li>
            <a href="https://wa.me/5512991143357" class="nav-link px-0 align-middle mb-2" target="_blank">
              <i class="fa-solid fa-phone" style="margin-right: 8px;"></i>
              <span class="ms-1 d-sm-inline">Suporte</span>
            </a>
          </li>
  
          <li>
            <router-link to="/plans-confirmed" class="nav-link px-0 align-middle mb-2">
              <i class="fa-solid fa-dollar" style="margin-right: 8px;"></i>
              <span class="ms-1 d-sm-inline">Planos</span>
            </router-link>
          </li>
        </ul>
  
        <!-- Menu para Admin -->
        <ul
          v-if="authUser.role == 'admin'"
          class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li class="nav-item">
            <router-link to="/admin/dashboard" class="nav-link align-middle px-0 mb-2">
              <i class="fa-solid fa-house" style="margin-right: 10px;"></i>
              <span class="ms-1 d-sm-inline">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/courses" class="nav-link align-middle px-0 mb-2">
              <i class="fa-solid fa-chalkboard-user" style="margin-right: 10px;"></i>
              <span class=" d-sm-inline">Cursos</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/users" class="nav-link align-middle px-0 mb-2">
              <i class="fa-solid fa-user" style="margin-right: 8px;"></i>
              <span class="ms-1 d-sm-inline">Usuários</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/categories" class="nav-link align-middle px-0 mb-2">
              <i class="fa-solid fa-layer-group" style="margin-right: 8px;"></i>
              <span class="ms-1 d-sm-inline">Categorias</span>
            </router-link>
          </li>
         
          
         
        </ul>
      </div>
      
    </div>
    
  </template>
<script setup lang="ts">
    import { ref } from "vue";

    const authUser = ref(JSON.parse(sessionStorage.getItem("auth_user") || "{}"));

    function logout() {
    sessionStorage.removeItem("auth_user"); // Limpa o auth_user ao sair
    // Redireciona para a página de login ou home, conforme necessário
    window.location.href = "/login"; // Ajuste o caminho conforme seu projeto
    }
</script>


  