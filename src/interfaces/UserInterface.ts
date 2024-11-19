import type { Customer } from "./CustomerInterface";

export interface Register {
    id: number;
    name: string;
    email: string;
    phone: string;
    cpf?: string | null;
    birth_date?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    cep?: string | null;
    country?: string | null;
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
    country?: string | null;
    birth_date?: string | null;
    photo?: string | null;
    verification_code?: string | null;
    customer?: Customer
 
}

export interface UserResponse {
  message: string;
  data: User;
}
  
  export interface Photo {
    photo: string;
  }

  export interface ApiUserResponse {
    data: {
      data: User[];
      last_page: number
      first_page_url: string | null;
      next_page_url: string | null;
      prev_page_url: string | null;
      total: number;
      from: number;
      to: number;
    };
  }