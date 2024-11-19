import { 
    type Register,
    type Login,
    type ForgotPassword,
    type ResetPassword
} from "@/interfaces/AuthInterface";
import { 
    type User
} from "@/interfaces/UserInterface";
import authService from "@/services/AuthService";
import { defineStore } from "pinia";
import { type Ref, ref } from "vue";
import { useAlert } from "@/composables/UseAlert";
import { AxiosError } from "axios";

export const useAuthStore = defineStore('authStore', () => {

    const { showSuccessAlert, showErrorAlert } = useAlert();

    const token: Ref<string | null> = ref(localStorage.getItem("auth_token") || null);
    const user = ref<User | null>(null);

    async function login(loginData: Login): Promise<void> {
        try {
            const response = await authService.login(loginData);
           
            if (response.token) {
                token.value = response.token;
                localStorage.setItem("auth_token", response.token);
              
            }
    
            if (response.user) {
                sessionStorage.setItem("auth_user", JSON.stringify(response.user));
                user.value = response.user
            }
            
            showSuccessAlert("Conta logada com sucesso!", "/home");
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Erro ao logar. Tente novamente.";
                showErrorAlert(errorMessage);
            } else {
                console.error('Erro desconhecido:', error);
                showErrorAlert('Ocorreu um erro inesperado.');
            }
        }
    }

    async function create(registerData: Register): Promise<void> {
        try {
            const response = await authService.create(registerData);

            if (response.token) {
                token.value = response.token;
                localStorage.setItem("auth_token", response.token);
            }

            if (response.user) {
                sessionStorage.setItem("auth_user", JSON.stringify(response.user));
            }
            showSuccessAlert("Conta criada com sucesso!", "/home");
        } catch (error) {
            if (error instanceof AxiosError) {
                const errors = error.response?.data.errors || {};
                if (errors.email) showErrorAlert(errors.email[0]);
                else if (errors.phone) showErrorAlert(errors.phone[0]);
                else if (errors.password) showErrorAlert(errors.password[0]);
                else showErrorAlert(error.response?.data?.message || "Erro ao criar conta.");
            } else {
                console.error('Erro desconhecido:', error);
                showErrorAlert('Ocorreu um erro inesperado.');
            }
        }
    }

    async function forgotPassword(forgotPasswordData: ForgotPassword): Promise<void> {
        try {
            const response = await authService.forgotPassword(forgotPasswordData);
            if (response) {
                showSuccessAlert("Email enviado com sucesso!", "/login");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Email inválido, tente novamente!";
                showErrorAlert(errorMessage);
            } else {
                console.error('Erro desconhecido:', error);
                showErrorAlert('Ocorreu um erro inesperado.');
            }
        }
    }

    async function resetPassword(resetPasswordData: ResetPassword): Promise<void> {
        try {
            const response = await authService.resetPassword(resetPasswordData);
            if (response) {
                showSuccessAlert("Senha redefinida com sucesso!", "/login");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Erro na recuperação de senha!";
                showErrorAlert(errorMessage);
            } else {
                console.error('Erro desconhecido:', error);
                showErrorAlert('Ocorreu um erro inesperado.');
            }
        }
    }

    async function logout(): Promise<void> {
        try {
            await authService.logout();
            token.value = null;
            user.value = null;
            localStorage.removeItem("auth_token");
            window.location.href = '/login';  
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Erro ao fazer logout.";
                showErrorAlert(errorMessage);
            } else {
                console.error('Erro desconhecido:', error);
                showErrorAlert('Ocorreu um erro inesperado.');
            }
        }
    }

    return {
        login,
        create,
        forgotPassword,
        resetPassword,
        logout,
        token,
        user
    };
});
