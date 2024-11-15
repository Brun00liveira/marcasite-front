<template>
  <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh; background-color: #f7f7f7;">
    <div class="container col-12">
      <div class="row justify-content-center">
        <div class="col-8 col-md-6 col-lg-4 d-none d-md-block">
          <img src="/images/Login/reset-password.jpg" alt="Imagem de Esqueceu a Senha" class="img-fluid w-100 h-100 object-fit-cover rounded">
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card shadow-lg border-0">
            <div class="card-body p-4">
              <h5 class="card-title text-center mb-4">Redefinir a senha!</h5>
              <p class="text-center mb-4">Digite sua nova senha, não esqueça que ela deve ter mais de 8 dígitos.</p>
              <form @submit.prevent="handleSubmit">
             
                <CustomInput
                  label="Email"
                  id="email"
                  type="email"
                  v-model="resetData.email"
                  required
                  :error="errors.email"
                  :disabled="true" 
                />
                
              
                <PasswordInput
                  label="Nova Senha"
                  id="password"
                  v-model="resetData.password"
                  required
                  :error="errors.password"
                />

             
                <PasswordInput
                  label="Confirme a Senha"
                  id="password_confirmation"
                  v-model="resetData.password_confirmation"
                  required
                  :error="errors.password_confirmation"
                />

                <!-- Botão de Enviar -->
                <button type="submit" class="btn btn-primary btn-block mb-4">Redefinir senha!</button>
                
                <div class="text-center mt-5">
                  <p>Já tem uma conta? <router-link to="/login">Faça login</router-link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CustomInput from '@/components/CustomInput.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import { useAlert } from '@/composables/UseAlert';
import authService from '@/services/AuthService';
import { AxiosError } from 'axios';

const resetData = ref({
  email: '',
  password: '',
  password_confirmation: '',
  token: '', // Adicionando token
});

const errors = ref({
  email: '',
  password: '',
  password_confirmation: '',
});

const { showSuccessAlert, showErrorAlert } = useAlert();

const route = useRoute();

// Preencher email e token a partir da URL
onMounted(() => {
  const emailParam = route.query.email;
  const tokenParam = route.query.token;
  if (emailParam) {
    resetData.value.email = decodeURIComponent(emailParam);
  }
  if (tokenParam) {
    resetData.value.token = tokenParam;
  }
});

const handleSubmit = async () => {
  try {
    // Validação da confirmação da senha
    if (resetData.value.password !== resetData.value.password_confirmation) {
      errors.value.password_confirmation = 'As senhas não coincidem.';
      return;
    }

    // Limpar erros antes de enviar
    errors.value = {};

    const response = await authService.resetPassword({
      ...resetData.value,  // Enviar email, senha, confirmação de senha e token
    });

    console.log(response);
    showSuccessAlert('Senha redefinida com sucesso!', '/login');
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message || 'Erro desconhecido';
      showErrorAlert(errorMessage);

      // Erros específicos dos campos
      const validationErrors = error.response?.data.errors || {};
      errors.value.email = validationErrors.email ? validationErrors.email[0] : '';
      errors.value.password = validationErrors.password ? validationErrors.password[0] : '';
      errors.value.password_confirmation = validationErrors.password_confirmation
        ? validationErrors.password_confirmation[0]
        : '';
    } else {
      console.error('Erro desconhecido:', error);
      showErrorAlert('Ocorreu um erro inesperado.');
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 10px;
}

label, p {
  color: black;
}
</style>
