<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="min-height: 100vh; background-color: #f7f7f7;"
  >
    <div class="container col-12">
      <div class="row justify-content-center">
        <div class="col-8 col-md-6 col-lg-4 d-none d-md-block">
          <img
            src="/images/Login/login.jpg"
            alt="Imagem de Login"
            class="img-fluid w-100 h-100 object-fit-cover rounded"
          />
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card shadow-lg border-0">
            <div class="card-body p-4">
              <h5 class="card-title text-center mb-4">Login</h5>
              <form @submit.prevent="handleSubmit">
                <!-- Campo de Email -->
                <CustomInput
                  label="Email"
                  id="email"
                  type="email"
                  v-model="loginData.email"
                  required
                />
                <!-- Campo de Senha -->
                <PasswordInput
                  label="Senha"
                  id="password"
                  v-model="loginData.password"
                  required
                />
                <!-- Checkbox e Link para Recuperação de Senha -->
                <div class="row mb-4">
                  <div class="col d-flex justify-content-start">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="rememberMe"
                        checked
                      />
                      <label class="form-check-label" for="rememberMe">
                        Lembrar-me
                      </label>
                    </div>
                  </div>
                  <div class="col text-end">
                    <router-link to="/forgot-password">
                      <a href="#!">Esqueceu a senha?</a>
                    </router-link>
                  </div>
                </div>
                <!-- Botão de Acessar -->
                <div class="text-end">
                  <button
                    type="submit"
                    class="btn btn-primary btn-block mb-4"
                  >
                    Acessar
                  </button>
                </div>
                <!-- Link para Criar Conta -->
                <div class="text-center">
                  <p>
                    Não é nosso usuário?
                    <router-link to="/create">Crie uma conta</router-link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import { AxiosError } from "axios";
import AuthService from "@/services/AuthService";
import CustomInput from '@/components/CustomInput.vue';
import PasswordInput from '@/components/PasswordInput.vue';

const loginData = ref({
  email: "",
  password: "",
});

const { showSuccessAlert, showErrorAlert } = useAlert();

const handleSubmit = async () => {
  try {
    const response = await AuthService.login(loginData.value);
    localStorage.setItem("auth_token", response.token);
    showSuccessAlert("Conta logada com sucesso!", "/home");
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message || "Erro desconhecido";
      showErrorAlert(errorMessage);

      // Verifica erros específicos de campo
      const emailErrors = error.response?.data.errors?.email;
      if (emailErrors && emailErrors.length > 0) {
        showErrorAlert(emailErrors[0]);
      }

      const passwordErrors = error.response?.data.errors?.password;
      if (passwordErrors && passwordErrors.length > 0) {
        showErrorAlert(passwordErrors[0]);
      }
    } else {
      console.error("Erro desconhecido:", error);
      showErrorAlert("Ocorreu um erro inesperado.");
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 10px;
}
label,
p {
  color: black;
}
</style>
