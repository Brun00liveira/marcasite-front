<template>
    <div class="modal fade modal-lg" id="perfilModal" tabindex="-1" aria-labelledby="perfilModalLabel" aria-hidden="true">
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
                            <!-- Atualiza diretamente o store no evento de atualização -->
                            <input type="text" class="form-control" id="name" :value="userStore.user?.name" placeholder="Seu nome">
                        </div>
                        <div class="col-md-4">
                            <label for="email" class="form-label">E-mail</label>
                            <input type="email" class="form-control" id="email" :value="userStore.user?.email"  placeholder="Seu e-mail">
                        </div>
                        <div class="col-md-4">
                            <label for="phone" class="form-label">Telefone</label>
                            <input type="tel" class="form-control" id="phone" :value="userStore.user?.phone"  placeholder="Seu telefone">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="cpf" class="form-label">CPF</label>
                            <input type="text" class="form-control" id="cpf" :value="userStore.user?.cpf" placeholder="Seu CPF">
                        </div>
                        <div class="col-md-6">
                            <label for="birthDay" class="form-label">Data de Nascimento</label>
                            <input type="date" class="form-control" id="birthDay" :value="userStore.user?.birth_date" >
                        </div>
                    </div>

                    <hr>

                    <h5 class="modal-title text mb-4 emphasis" id="perfilModalLabel">Meu Endereço</h5>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="endereco" class="form-label">Endereço</label>
                            <input type="text" class="form-control" id="endereco" :value="userStore.user?.address" placeholder="Seu endereço">
                        </div>
                        <div class="col-md-6">
                            <label for="cidade" class="form-label">Cidade</label>
                            <input type="text" class="form-control" id="cidade" :value="userStore.user?.city" placeholder="Sua cidade">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="estado" class="form-label">Estado</label>
                            <input type="text" class="form-control" id="estado" :value="userStore.user?.state" placeholder="Seu estado">
                        </div>
                        <div class="col-md-6">
                            <label for="cep" class="form-label">CEP</label>
                            <input type="text" class="form-control" id="cep" :value="userStore.user?.cep" placeholder="Seu CEP">
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary">Salvar mudanças</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/UserStore'; // Importe o store

// Acesse o store do usuário
const userStore = useUserStore();

onMounted(async () => {
  await userStore.findById();
});

</script>
