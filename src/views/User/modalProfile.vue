<template>
    <div class="modal fade modal-lg" id="perfilModal" tabindex="-1" aria-labelledby="perfilModalLabel" aria-hidden="true" data-bs-backdrop="static" 
    data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text" id="perfilModalLabel">Meu Perfil</h5>
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
                            <input type="text" class="form-control" id="name" v-model="registerData.name" placeholder="Seu nome">
                        </div>
                        <div class="col-md-4">
                            <label for="email" class="form-label">E-mail</label>
                            <input type="email" class="form-control" id="email" v-model="registerData.email" placeholder="Seu e-mail">
                        </div>
                        <div class="col-md-4">
                            <label for="phone" class="form-label">Telefone</label>
                            <input type="tel" class="form-control" id="phone" v-model="registerData.phone" placeholder="Seu telefone">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="cpf" class="form-label">CPF</label>
                            <input type="text" class="form-control" id="cpf" v-model="registerData.cpf" placeholder="Seu CPF">
                        </div>
                        <div class="col-md-6">
                            <label for="birthDay" class="form-label">Data de Nascimento</label>
                            <input type="date" class="form-control" id="birthDay" v-model="registerData.birth_date">
                        </div>
                    </div>

                    <hr>

                    <h5 class="modal-title text mb-4 emphasis" id="perfilModalLabel">Meu Endereço</h5>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="endereco" class="form-label">Endereço</label>
                            <input type="text" class="form-control" id="endereco" v-model="registerData.address" placeholder="Seu endereço">
                        </div>
                        <div class="col-md-6">
                            <label for="cidade" class="form-label">Cidade</label>
                            <input type="text" class="form-control" id="cidade" v-model="registerData.city" placeholder="Sua cidade">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="estado" class="form-label">Estado</label>
                            <input type="text" class="form-control" id="estado" v-model="registerData.state" placeholder="Seu estado">
                        </div>
                        <div class="col-md-6">
                            <label for="cep" class="form-label">CEP</label>
                            <input type="text" class="form-control" id="cep" v-model="registerData.cep" placeholder="Seu CEP">
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="country" class="form-label">País</label>
                                <input type="text" class="form-control" id="country" v-model="registerData.country" placeholder="Seu país">
                            </div>
                        </div>

                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" @click="saveChanges">Salvar mudanças</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/UserStore';

const registerData = ref({
  id: 0,
  name: '',
  email: '',
  phone: '',
  cpf: '',
  birth_date: '',
  address: '',
  city: '',
  state: '',
  cep: '',
  country: ''
});

const userStore = useUserStore();

onMounted(async () => {
  await userStore.findUserById();

  const user = userStore.user;
  if (user) {
    registerData.value.name = user.name || '';
    registerData.value.email = user.email || '';
    registerData.value.phone = user.phone || '';
    registerData.value.cpf = user.cpf || '';
    registerData.value.birth_date = user.birth_date || '';
    registerData.value.address = user.address || '';
    registerData.value.city = user.city || '';
    registerData.value.state = user.state || '';
    registerData.value.cep = user.cep || '';
    registerData.value.country = user.country || '';
  }
});

const saveChanges = async () => {
  try {
    const updateData = { ...registerData.value }; 

    await userStore.updateUser(updateData); 
  } catch (error) {
    console.error('Erro ao salvar mudanças:', error);
  }
};
</script>
