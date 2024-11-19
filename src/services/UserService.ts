import APITOKEN from "@/config/http-common"; 
import { type User, type Register, type UserResponse, type ApiUserResponse } from "@/interfaces/UserInterface"; 

class AuthService {
   
    create(registerData: Register): Promise<User> {
        return APITOKEN.post('/users', registerData).then(response => response.data);
    }

    findAll(params: any): Promise<ApiUserResponse> {
        return APITOKEN.get('/users', { params }).then(response => response.data);
    }

    findById(id: number): Promise<UserResponse> {
        return APITOKEN.get(`/users/${id}`).then(response => response.data);
    }

    update(id: number, updateData: Partial<User>): Promise<User> {
        return APITOKEN.put(`/users/${id}`, updateData).then(response => response.data);
    }

    updatePhoto(id: number, photo: FormData): Promise<User> {
        return APITOKEN.post(`/users/updatePhoto/${id}`, photo, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    }

    delete(id: number): Promise<void> {
        return APITOKEN.delete(`/users/${id}`).then(response => response.data);
    }
}

export default new AuthService();
