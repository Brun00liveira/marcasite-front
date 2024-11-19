import type { Customer } from "./CustomerInterface";
import type { Subscription } from "./SubscriptionInterface";
import type { User } from "./UserInterface";

export interface Plan {
    id: number;
    name: string;
    description: string;
    price: number;
    created_at?: string;
    updated_at?: string;
    subscriptions: Subscription,
  
  }

export interface ApiPlanResponse {
    message: string;
    data: Plan[];
  }

  export interface ApiPlanUpdateResponse {
    message: string;
    data: Plan;
  }

  