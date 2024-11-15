export interface Register {
    id: number;
    is_active: number;
    name: string;
    email: string;
    cpf: string | null;
    email_verified_at: string | null;
    verification_code: string | null;
    phone: string;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    cep: string | null;
    birth_date: string | null;
    created_at: string;
    updated_at: string;
  }

  export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    is_active: number;
    cpf?: string | null; 
    cep?: string | null; 
    created_at: string;
    updated_at: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    birth_date?: string | null;
    photo?: string | null;
    verification_code?: string | null;
 
}

export interface UserResponse {
  message: string;
  data: User;
}
  
  export interface Photo {
    photo: string;
  }