<template>
  <div class="container">
    <h1 class="text topic mb-5">Cursos</h1>
    <div class="col-4 mt-3 col-4">
        <div class="input-group mb-3 ">
        <input type="text" class="form-control " placeholder="Nome" aria-label="Recipient's username" aria-describedby="button-addon2">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2"> <i class="fa-solid fa-magnifying-glass text-dark"></i></button>
        </div>
    </div>
      <div class="row justify">
          <div class="col">
              <p class="text margin-bottom">Exibindo 1 até 6 de um total de 6 itens encontrados <strong>(sem filtro 6)</strong></p>
          </div>
          <div class="col text-end">
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addCourseModal">
              Adicionar
            </button>
            <button type="button" class="btn btn-danger mx-2 " data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-bars" style="margin-left: 0px;"></i> 
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Excel</a></li>
                <li><a class="dropdown-item" href="#">PDF</a></li>
              </ul>
            </button>
          </div>
      </div>

    <table class="table table-hover mt-2">
      <thead>
        <tr style="background-color: #335992FF;">
          <th scope="col">Nome</th>
          <th scope="col">Status</th>
          <th scope="col">Valor</th>
          <th scope="col">Período de Inscrição</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark</td>
          <td>Ativo</td>
          <td>R$ 200,00</td>
          <td>01/01/2024 - 30/01/2024</td>
          <td>
            <i class="fa-solid fa-user text-dark"></i>
            <i class="fa-solid fa-pencil text-success" style="cursor: pointer;"  data-bs-toggle="modal" data-bs-target="#addCourseModal "></i>
            <i class="fa-solid fa-trash text-danger" style="cursor: pointer;" @click="deleteCourse"></i>
          </td>
        </tr>
        <tr>
          <td>Maria</td>
          <td>Inativo</td>
          <td>R$ 150,00</td>
          <td>05/02/2024 - 25/02/2024</td>
          <td>
            <i class="fa-solid fa-user text-dark"></i>
            <i class="fa-solid fa-pencil text-success" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#addCourseModal"></i>
            <i class="fa-solid fa-trash text-danger" style="cursor: pointer;" @click="deleteCourse"></i>
          </td>
        </tr>
        <tr>
          <td>João</td>
          <td>Ativo</td>
          <td>R$ 300,00</td>
          <td>15/03/2024 - 10/04/2024</td>
          <td>
            <i class="fa-solid fa-user text-dark"></i>
            <i class="fa-solid fa-pencil text-success" style="cursor: pointer;"  data-bs-toggle="modal" data-bs-target="#addCourseModal"></i>
            <i class="fa-solid fa-trash text-danger" style="cursor: pointer;" @click="deleteCourse"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <!-- Modal de Adicionar Curso -->
  <div class="modal fade modal-lg" id="addCourseModal" tabindex="-1" aria-labelledby="addCourseModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text" id="addCourseModalLabel">Adicionar Curso</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text">
          <h5 class="modal-title text mb-4 emphasis" id="perfilModalLabel">Dados Pessoais</h5>
          <div class="d-flex justify-content-center align-items-center flex-column">
              <img src="https://via.placeholder.com/50" alt="User" class="img-fluid rounded-circle mb-3" style="width: 100px; height: 100px;">
              <div class="col-md-6 mb-4">
                  <input type="file" class="form-control" id="imagem">
              </div>
          </div>

          <div class="row mb-3">
              <div class="col-md-4">
                  <label for="name" class="form-label">Nome</label>
                  <input type="text" class="form-control" id="name" placeholder="Seu nome">
              </div>
              <div class="col-md-4">
                <label for="category" class="form-label">Categoria</label>
                <select class="form-select" id="category" aria-label="Categoria">
                  <option selected>Escolha uma categoria</option>
                  <option value="1">Categoria 1</option>
                  <option value="2">Categoria 2</option>
                  <option value="3">Categoria 3</option>
                  <option value="4">Categoria 4</option>
                </select>
              </div>
              <div class="col-md-4">
                  <label for="phone" class="form-label">Valor</label>
                  <input type="tel" class="form-control" id="phone" placeholder="Seu telefone">
              </div>
          </div>

          <div class="row mb-3">
              <div class="col-md-6">
                  <label for="cpf" class="form-label">Data de Inscrição</label>
                  <input type="text" class="form-control" id="cpf" placeholder="Seu CPF">
              </div>
              <div class="col-md-6">
                  <label for="birthDay" class="form-label">Data de Término</label>
                  <input type="date" class="form-control" id="birthDay">
              </div>
              <div class="col-md-12 mt-2">
                <label for="exampleFormControlTextarea1" class="form-label">Descrição</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
          </div>
      </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-primary">Salvar alterações</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade modal-lg" id="editCourseModal" tabindex="-1" aria-labelledby="editCourseModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text" id="addCourseModalLabel">Adicionar Curso</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text">
          <h5 class="modal-title text mb-4 emphasis" id="perfilModalLabel">Dados Pessoais</h5>
          <div class="d-flex justify-content-center align-items-center flex-column">
              <img src="https://via.placeholder.com/50" alt="User" class="img-fluid rounded-circle mb-3" style="width: 100px; height: 100px;">
              <div class="col-md-6 mb-4">
                  <input type="file" class="form-control" id="imagem">
              </div>
          </div>

          <div class="row mb-3">
              <div class="col-md-4">
                  <label for="name" class="form-label">Nome</label>
                  <input type="text" class="form-control" id="name" placeholder="Seu nome">
              </div>
              <div class="col-md-4">
                <label for="category" class="form-label">Categoria</label>
                <select class="form-select" id="category" aria-label="Categoria">
                  <option selected>Escolha uma categoria</option>
                  <option value="1">Categoria 1</option>
                  <option value="2">Categoria 2</option>
                  <option value="3">Categoria 3</option>
                  <option value="4">Categoria 4</option>
                </select>
              </div>
              <div class="col-md-4">
                  <label for="phone" class="form-label">Valor</label>
                  <input type="tel" class="form-control" id="phone" placeholder="Seu telefone">
              </div>
          </div>

          <div class="row mb-3">
              <div class="col-md-6">
                  <label for="cpf" class="form-label">Data de Inscrição</label>
                  <input type="text" class="form-control" id="cpf" placeholder="Seu CPF">
              </div>
              <div class="col-md-6">
                  <label for="birthDay" class="form-label">Data de Término</label>
                  <input type="date" class="form-control" id="birthDay">
              </div>
              <div class="col-md-12 mt-2">
                <label for="exampleFormControlTextarea1" class="form-label">Descrição</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
          </div>
      </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-primary">Salvar alterações</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
// Funções de manipulação de cursos (exemplo de edição e exclusão)
const editCourse = () => {
console.log('Editar curso');
};

const deleteCourse = () => {
console.log('Excluir curso');
};
</script>

<style scoped>
th,
td {
background-color: transparent;
}

th {
color: white;
}

i {
margin-left: 10px;
cursor: pointer;
}

.margin-bottom {
margin-bottom: 0px;
}

.justify {
display: flex;
justify-content: space-between;
align-items: center;
}
</style>
