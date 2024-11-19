import {type Customer } from "./CustomerInterface";
import {type User } from "./UserInterface";

export interface Subscription {
    id: number;
    payment_id: string;
    customer_id: number;
    billing_type: string;
    value: string;
    due_date: string;
    payment_date: string;
    status: string;
    created_at: string;
    updated_at: string;
    customer: Customer;
  }
  
  export interface ApiSubscribeResponse {
    message: string;
    data: {
      current_page: number;
      data: Subscription[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: Array<{
        url: string | null;
        label: string;
        active: boolean;
      }>;
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
    };
  }
  




