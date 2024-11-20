import type { User } from "./UserInterface";
import type { Courses } from "./CousesInterface";
  
  
  export interface Enrollment {
    id?: number;
    course_id: number;
    user_id: number;
    status: string;
    enrolled_at: string;
    completed_at?: string | null;
    progress: number;
    user?: User | null;
    course?: Courses | null;
  }
  
  export interface ApiEnrollmentResponse {
    
      data: Enrollment[]
    
  } 

  export interface enrollmentResponse {
    
    data: Enrollment
  
} 
  