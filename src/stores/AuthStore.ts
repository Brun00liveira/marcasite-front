import { 
    type Register,
    type Login,
    type ForgotPassword,
    type ResetPassword
} from "@/interfaces/AuthInterface";
import authService from "@/services/AuthService";
import { defineStore } from "pinia";
import { type Ref, ref } from "vue";

export const useAuthStore = defineStore('authStore', () => {

    const register: Ref<Register | null> = ref<Register | null>(null);
    const credentials: Ref<Login | null> = ref<Login | null>(null);
    const forgotPasswordEmail: Ref<ForgotPassword | null> = ref<ForgotPassword | null>(null);
    const resetPasswordEmail: Ref<ResetPassword | null> = ref<ResetPassword | null>(null);


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

    async function resetPassword(resetPasswordData: ResetPassword): Promise<void> {
        try {
            const response = await authService.resetPassword(resetPasswordData);
            resetPasswordEmail.value = response;
        } catch (error) {
            console.error("Erro ao logar", error);
        }
    }

    async function logout(): Promise<void> {
        try {
            await authService.logout();
           
            window.location.href = '/login';  
        } catch (error) {
            console.error("Erro ao fazer logout", error);
        }
    }

    return {
        create,
        login,
        forgotPassword,
        resetPassword,
        logout
    };
});
