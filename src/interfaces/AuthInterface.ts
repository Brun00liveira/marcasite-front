export interface Register {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface ForgotPassword {
    email: string;
}

  
  