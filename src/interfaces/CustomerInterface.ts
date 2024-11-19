import type { User } from "./UserInterface";

export interface Customer {
    id: number;
    asaas_id: string;
    user_id: number;
    created_at?: string;
    updated_at?: string;
    user?: User;
  }
  