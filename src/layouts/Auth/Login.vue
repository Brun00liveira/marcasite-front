<template>
   <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh; background-color: #f7f7f7;">
        <div class="container col-12">
            <div class="row justify-content-center">
                <div class="col-8 col-md-6 col-lg-4 d-none d-md-block">
                    <img src="/images/Login/login.jpg" alt="Imagem de Login" class="img-fluid w-100 h-100 object-fit-cover rounded">
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card shadow-lg border-0">
                        <div class="card-body p-4">
                            <h5 class="card-title text-center mb-4">Login</h5>
                            <form>
                                <div data-mdb-input-init class="form-outline mb-4">
                                    <label class="form-label" for="form2Example1">Email</label>
                                    <input type="email" id="form2Example1" class="form-control" />
                                </div>
                                <div data-mdb-input-init class="form-outline mb-4">
                                    <label class="form-label" for="form2Example2">Senha</label>
                                    <input type="password" id="form2Example2" class="form-control" />
                                </div>
                                <div class="row mb-4">
                                    <div class="col d-flex justify-content-start">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                                            <label class="form-check-label" for="form2Example31"> Lembrar me </label>
                                        </div>
                                    </div>

                                    <div class="col text-end">
                                        <router-link to="/forgot-password"> <a href="#!">Esqueceu a senha?</a></router-link>
                                    </div>
                                </div>

                                <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Acessar</button>

                                <div class="text-center">
                                    <p>Não é nosso usuário? <router-link to="/create">Crie uma conta</router-link></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</template>
  
  <style scoped>
  .card {
    border-radius: 10px;
  }

  label, p {
    color: black
  }
  </style>