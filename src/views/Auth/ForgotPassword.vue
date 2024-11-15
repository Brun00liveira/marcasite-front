<template>
  <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh; background-color: #f7f7f7;">
    <div class="container col-12">
      <div class="row justify-content-center">
        <div class="col-8 col-md-6 col-lg-4 d-none d-md-block">
          <img src="/images/Login/forgot-password.jpg" alt="Imagem de Esqueceu a Senha" class="img-fluid w-100 h-100 object-fit-cover rounded">
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card shadow-lg border-0">
            <div class="card-body p-4">
              <h5 class="card-title text-center mb-4">Esqueceu a senha?</h5>
              <p class="text-center mb-4">Uma mensagem será disparada para seu Email, clique no botão para disparar</p>
              <form @submit.prevent="handleForgotPasswordSubmit">
                <CustomInput
                  label="Email"
                  id="email"
                  type="email"
                  v-model="forgotPasswordData.email"
                  required
                />
                <button type="submit" class="btn btn-primary btn-block mb-4">Enviar link de recuperação</button>
                <div class="text-center mt-5">
                  <p>Já tem uma conta? <router-link to="/login">Faça login</router-link></p>
                </div>
              </form>
              <p v-if="emailResponse" class="text-center mt-3 text-success">{{ emailResponse }}</p>
              <p v-if="errorMessage" class="text-center mt-3 text-danger">{{ errorMessage }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue';
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import { AxiosError } from "axios";
import authService from "@/services/AuthService";

const forgotPasswordData = ref({
  email: ""
});

const emailResponse = ref<string | null>(null);
const errorMessage = ref<string | null>(null);

const { showSuccessAlert, showErrorAlert } = useAlert();

const handleForgotPasswordSubmit = async () => {
  // Resetando as mensagens antes de enviar a solicitação
  emailResponse.value = null;
  errorMessage.value = null;

  try {
    // Envia a solicitação para o serviço de recuperação de senha
    const response = await authService.forgotPassword(forgotPasswordData.value);

    // Exibe a mensagem de sucesso ao usuário
    emailResponse.value = "Email enviado com sucesso!";
    
    // Exibe a notificação de sucesso
    showSuccessAlert("Email enviado com sucesso!", "/forgot-password");
  } catch (error) {
    // Verifica se o erro é uma instância de AxiosError
    if (error instanceof AxiosError) {
      const errorMessageText = error.response?.data.message || "Erro desconhecido";
      errorMessage.value = errorMessageText;

      const emailErrors = error.response?.data.errors?.email;
      if (emailErrors && emailErrors.length > 0) {
        errorMessage.value = emailErrors[0];
      }

      showErrorAlert("Erro no envio do Email");
    } else {
      // Caso não seja um erro do Axios, exibe erro genérico
      showErrorAlert("Erro no envio do Email");
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
