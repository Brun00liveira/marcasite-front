import type { User } from "./UserInterface";

export interface Register {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    token?: string;
    user?: User;    
}

export interface Login {
    email: string;
    password: string;
    token?: string; 
    user?: User;    
}


export interface ForgotPassword {
    email: string;
}

export interface ResetPassword {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
    message?: string;
  }
  



  
  