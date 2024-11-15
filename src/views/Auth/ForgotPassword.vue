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
import { useAuthStore } from '@/stores/AuthStore';

const forgotPasswordData = ref({
  email: ""
});

const authStore = useAuthStore();

const handleForgotPasswordSubmit = async () => {
 
  await authStore.forgotPassword(forgotPasswordData.value);

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
