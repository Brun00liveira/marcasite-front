<template>
  <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh; background-color: #f7f7f7;">
    <div class="container col-12">
      <div class="row justify-content-center">
        <div class="col-8 col-md-6 col-lg-4 d-none d-md-block">
          <img src="/images/Login/register.jpg" alt="Imagem de Login" class="img-fluid w-100 h-100 object-fit-cover rounded" />
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card shadow-lg border-0">
            <div class="card-body p-4">
              <h5 class="card-title text-center mb-4">Criar conta</h5>
              <form @submit.prevent="handleSubmit">
                <CustomInput label="Nome" id="name" v-model="registerData.name" required />

                <PhoneInput label="Telefone" id="phone" v-model="registerData.phone" required />

                <CustomInput label="Email" id="email" type="email" v-model="registerData.email" required />

                <div class="row">
                  <PasswordInput label="Senha" id="password" v-model="registerData.password" class="col-6" />
                  <PasswordInput label="Confirme sua senha" id="password_confirmation" v-model="registerData.password_confirmation" class="col-6" />
                </div>

                <div class="row">
                  <div class="col-6">
                    <router-link to="/login">
                      <button type="button" class="btn btn-success btn-block mb-4">Voltar ao login</button>
                    </router-link>
                  </div>
                  <div class="col-6 text-end">
                    <button type="submit" class="btn btn-primary btn-block mb-4">Salvar</button>
                  </div>
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
import { ref } from 'vue';
import CustomInput from '@/components/CustomInput.vue';
import PhoneInput from '@/components/PhoneInput.vue';
import PasswordInput from '@/components/PasswordInput.vue';

import { useAuthStore } from '@/stores/AuthStore';

const registerData = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
});

const authStore = useAuthStore();

const handleSubmit = async () => {
    await authStore.create(registerData.value);
};
</script>
