<template>
      <div class="col-auto px-sm-2 px-0 navbar position-fixed mt-5">

            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
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
                        <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-middle mb-2">
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

               
                <a href="#submenu3" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                    <i class="fa-solid fa-door-open"></i> <span class="ms-1 d-none d-sm-inline">Sair</span> </a>
            
                <hr>
            </div>
            
        </div>
   
  
</template>
<style>
@import '@/assets/paleta.css';

</style>