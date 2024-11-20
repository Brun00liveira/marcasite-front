<template>
  <div class="modal fade modal-lg" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true"
  data-bs-backdrop="static" 
  data-bs-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text" id="addUserModalLabel">Adicionar Usuário</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text">
          <h5 class="modal-title text mb-4 emphasis" id="perfilModalLabel">Dados Pessoais</h5>
          <div class="d-flex justify-content-center align-items-center flex-column">
            <!-- Adicionar campos de entrada para todos os dados do usuário -->
          </div>

          <div class="row mb-3">
            <div class="col-md-4">
              <label for="name" class="form-label">Nome</label>
              <input type="text" class="form-control" id="name" v-model="user.name" placeholder="Nome completo" required />
            </div>
            <div class="col-md-4">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="user.email" placeholder="Email" required />
            </div>
            <div class="col-md-4">
              
              <PhoneInput label="Telefone" v-model="user.phone" />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-4">
   
              <CpfInput label="CPF" v-model="user.cpf" />
            </div>
            <div class="col-md-4">
              <label for="birth_date" class="form-label">Data de Nascimento</label>
              <input type="date" class="form-control" id="birth_date" v-model="user.birth_date" required />
            </div>
            <div class="col-md-4">
              <label for="address" class="form-label">Endereço</label>
              <input type="text" class="form-control" id="address" v-model="user.address" placeholder="Endereço" required />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-4">
              <label for="city" class="form-label">Cidade</label>
              <input type="text" class="form-control" id="city" v-model="user.city" placeholder="Cidade" required />
            </div>
            <div class="col-md-4">
              <label for="state" class="form-label">Estado</label>
              <input type="text" class="form-control" id="state" v-model="user.state" placeholder="Estado" required />
            </div>
            <div class="col-md-4">
    
              <CepInput label="CEP" v-model="user.cep" />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-4">
              <label for="country" class="form-label">País</label>
              <input type="text" class="form-control" id="country" v-model="user.country" placeholder="País" required />
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-primary" @click="saveUser">Salvar alterações</button>
        </div>
      </div>
    </div>
  </div>
</template>


  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useUserStore } from '@/stores/UserStore';
  import CepInput from '@/components/CepInput.vue';
import CpfInput from '@/components/CpfInput.vue';
import PhoneInput from '@/components/PhoneInput.vue';

  
  const userCourse = useUserStore();

  const user = ref({
    id: 0,
    name: "",
    email: "",
    phone: '',
    cpf: '',
    birth_date: '',
    address: '',
    city: '',
    state: '',
    cep: '',
    country: ''
  });
  
  const saveUser = async () => {
  await userCourse.createUser(user.value);
};
  </script>
  