import { 
    type Register,
    type Login,
    type ForgotPassword
} from "@/interfaces/AuthInterface";
import authService from "@/services/AuthService";
import { defineStore } from "pinia";
import { type Ref, ref } from "vue";

export const useAuthStore = defineStore('authStore', () => {

    const register: Ref<Register | null> = ref<Register | null>(null);
    const credentials: Ref<Login | null> = ref<Login | null>(null);
    const forgotPasswordEmail: Ref<ForgotPassword | null> = ref<ForgotPassword | null>(null);


    async function create(registerData: Register): Promise<void> {
        try {
            const response = await authService.create(registerData);
            register.value = response;
        } catch (error) {
            console.error("Erro ao criar o registro", error);
        }
    }

    async function login(loginData: Login): Promise<void> {
        try {
            const response = await authService.login(loginData);
            credentials.value = response;
        } catch (error) {
            console.error("Erro ao logar", error);
        }
    }

    async function forgotPassword(forgotPasswordData: ForgotPassword): Promise<void> {
        try {
            const response = await authService.forgotPassword(forgotPasswordData);
            forgotPasswordEmail.value = response;
        } catch (error) {
            console.error("Erro ao logar", error);
        }
    }

    return {
        create,
        login,
        forgotPassword
    };
});
