<template>
    <div class="col-auto px-sm-2 px-0 navbar position-fixed mt-5">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start d-none" id="menu">
                <li class="nav-item">
                    <router-link to="/home" class="nav-link align-middle px-0 mb-2">
                        <i class="fa-solid fa-house" style="margin-right: 10px;"></i>
                        <span class="ms-1 d-none d-sm-inline">Home</span>
                    </router-link>
                </li>

                <li>
                    <router-link to="/my-courses" class="nav-link align-middle px-0 mb-2">
                        <i class="fa-solid fa-chalkboard-user" style="margin-right: 10px;"></i>
                        <span class="d-none d-sm-inline">Meus Cursos</span>
                    </router-link>
                </li>

                <li>
                    <router-link to="/courses" class="nav-link align-middle px-0 mb-2">
                        <i class="fa-solid fa-magnifying-glass" style="margin-right: 8px;"></i>
                        <span class="ms-1 d-none d-sm-inline">Explorar Cursos</span>
                    </router-link>
                </li>

                <li>
                    <a href="https://wa.me/5512991143357" class="nav-link px-0 align-middle mb-2" target="_blank">
                        <i class="fa-solid fa-phone" style="margin-right: 8px;"></i>
                        <span class="ms-1 d-none d-sm-inline">Suporte</span>
                    </a>
                </li>

                <li>
                    <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-middle mb-2">
                        <i class="fa-solid fa-gear" style="margin-right: 8px;"></i>
                        <span class="ms-1 d-none d-sm-inline">Configuração</span>
                    </a>
                </li>

            </ul>
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li class="nav-item">
                    <router-link to="/admin/dashboard" class="nav-link align-middle px-0 mb-2">
                        <i class="fa-solid fa-house" style="margin-right: 10px;"></i>
                        <span class="ms-1 d-none d-sm-inline">Dashboard</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/admin/courses" class="nav-link align-middle px-0 mb-2">
                        <i class="fa-solid fa-chalkboard-user" style="margin-right: 10px;"></i>
                        <span class="d-none d-sm-inline">Cursos</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/admin/users" class="nav-link align-middle px-0 mb-2">
                        <i class="fa-solid fa-user" style="margin-right: 8px;"></i>
                        <span class="ms-1 d-none d-sm-inline">Usuários</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/admin/categories" class="nav-link align-middle px-0 mb-2">
                        <i class="fa-solid fa-layer-group" style="margin-right: 8px;"></i>
                        <span class="ms-1 d-none d-sm-inline">Categorias</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/courses" class="nav-link align-middle px-0 mb-2">
                        <i class="fa-solid fa-gear" style="margin-right: 8px;"></i>
                        <span class="ms-1 d-none d-sm-inline">Configuração</span>
                    </router-link>
                </li>
                <a href="#" @click="logout" class="nav-link px-0 align-middle">
                    <i class="fa-solid fa-door-open"></i> <span class="ms-1 d-none d-sm-inline">Sair</span>
                </a>
                
            </ul>
           
        </div>
    </div>
</template>
<style>
@import '@/assets/paleta.css';

</style>
<script setup lang="ts">
import { useAuthStore } from "@/stores/AuthStore";

const authStore = useAuthStore();

function logout() {
    authStore.logout();
}
</script>


