<template>
    <div
      class="modal fade modal-lg"
      id="editUserModal"
      tabindex="-1"
      aria-labelledby="editUserModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 text" id="editUserModalLabel">Editar Curso</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text">
            <h5 class="modal-title text mb-4 emphasis" id="perfilModalLabel">
              Dados Pessoais
            </h5>
            <div class="d-flex justify-content-center align-items-center flex-column">
              <!-- Placeholder para imagem e upload -->
            </div>
  
            <div class="row mb-3">
              <div class="col-md-4">
                <label for="name" class="form-label">Nome</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="props.user.name"
                  placeholder="Título do curso"
                  required
                />
              </div>
  
              <div class="col-md-4">
                <label for="email" class="form-label">Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  v-model="props.user.email"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
  
            <!-- Campos adicionais -->
            <div class="row mb-3">
              <div class="col-md-4">
                <label for="phone" class="form-label">Telefone</label>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  v-model="props.user.phone"
                  placeholder="Telefone"
                />
              </div>
  
              <div class="col-md-4">
                <label for="cpf" class="form-label">CPF</label>
                <input
                  type="text"
                  class="form-control"
                  id="cpf"
                  v-model="props.user.cpf"
                  placeholder="CPF"
                />
              </div>
  
              <div class="col-md-4">
                <label for="birth_date" class="form-label">Data de Nascimento</label>
                <input
                  type="date"
                  class="form-control"
                  id="birth_date"
                  v-model="props.user.birth_date"
                />
              </div>
            </div>
  
            <div class="row mb-3">
              <div class="col-md-4">
                <label for="address" class="form-label">Endereço</label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  v-model="props.user.address"
                  placeholder="Endereço"
                />
              </div>
  
              <div class="col-md-4">
                <label for="city" class="form-label">Cidade</label>
                <input
                  type="text"
                  class="form-control"
                  id="city"
                  v-model="props.user.city"
                  placeholder="Cidade"
                />
              </div>
  
              <div class="col-md-4">
                <label for="state" class="form-label">Estado</label>
                <input
                  type="text"
                  class="form-control"
                  id="state"
                  v-model="props.user.state"
                  placeholder="Estado"
                />
              </div>
            </div>
  
            <div class="row mb-3">
              <div class="col-md-4">
                <label for="cep" class="form-label">CEP</label>
                <input
                  type="text"
                  class="form-control"
                  id="cep"
                  v-model="props.user.cep"
                  placeholder="CEP"
                />
              </div>
  
              <div class="col-md-4">
                <label for="country" class="form-label">País</label>
                <input
                  type="text"
                  class="form-control"
                  id="country"
                  v-model="props.user.country"
                  placeholder="País"
                />
              </div>
            </div>
  
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-primary" @click="updateUser">Salvar alterações</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  
  import type { Register } from '@/interfaces/UserInterface';
  import { defineProps } from 'vue';
  import { useUserStore } from '@/stores/UserStore';
  
  const props = defineProps<{
    user: Register;
  }>();
  
  
  const userStore = useUserStore();
  
  onMounted(async () => {
    await userStore.findAll();
  });
  
  const updateUser = async () => {
    try {
      if (props.user.id) {
        // Enviar os dados atualizados para o backend
        await userStore.updateUniqueUser(props.user, props.user.id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  </script>
  