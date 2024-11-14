<template>
  <nav class="navbar navbar-expand-lg navbar-light">
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
       
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
          <form class="d-flex mx-5" role="search">
            <input class="form-control me-2" type="search" placeholder="Pesquise por um curso" aria-label="Search">
            <button class="btn btn-outline-light" type="submit">Procurar</button>
          </form>
          </li> 
          <li class="d-flex justify-content-center align-items-center">
            <div class="dropdown mx-2">
              <div class="dropdown-toggle custom-border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-cart-shopping">
                  <!-- Badge de notificação -->
                  <span class="badge rounded-pill bg-danger position-absolute" style="top: -5px; right: -5px; font-size: 10px;">3</span>
                </i>
              </div>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#">Data</a></li>
              </ul>
            </div>
          </li>
          <li class="d-flex justify-content-center align-items-center">
            <div class="dropdown mx-2">
              <div class="dropdown-toggle custom-border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-bell">
                  <!-- Badge de notificação -->
                  <span class="badge rounded-pill bg-danger position-absolute" style="top: -5px; right: -5px; font-size: 10px;">3</span>
                </i>
              </div>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#">Data</a></li>
              </ul>
            </div>
          </li>
          <li class="d-flex justify-content-center align-items-center">
            <div class="dropdown mx-2">
              <div class="dropdown-toggle custom-border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://via.placeholder.com/50" alt="User Image" class="img-fluid rounded-circle" style="width: 40px; height: 40px;">
              </div>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#">Perfil</a></li>
                <li><a class="dropdown-item" href="#">Configuração</a></li>
                <li><a class="dropdown-item" href="#">Sair</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
