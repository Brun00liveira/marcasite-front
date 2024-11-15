import API from "@/config/http-common";
import APITOKEN from "@/config/http-common";

import { 
    type Register,
    type Login,
    type ForgotPassword,
    type ResetPassword
} from "@/interfaces/AuthInterface";

class AuthService {

    create(registerData: Register): Promise<Register> {
        return API.post('/create', registerData).then(response => response.data);
    }

    login(loginData: Login): Promise<Login> {
        return API.post('/login', loginData).then(response => response.data);
    }

    forgotPassword(forgotPasswordData: ForgotPassword): Promise<ForgotPassword> {
        return API.post('/password/forgot', forgotPasswordData).then(response => response.data);
    }

    resetPassword(resetPasswordData: ResetPassword): Promise<ResetPassword> {
        return API.post('/password/reset', resetPasswordData).then(response => response.data);
    }

    logout(): Promise<void> {
        return APITOKEN.post('/logout').then(() => {
            localStorage.removeItem('auth_token');
        });
    }
}

export default new AuthService();
