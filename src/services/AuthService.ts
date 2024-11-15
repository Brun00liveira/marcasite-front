import API from "@/config/http-auth";

import { 
    type Register,
    type Login,
    type ForgotPassword
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
}

export default new AuthService();
