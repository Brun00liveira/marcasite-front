export interface Dashboard {
    paymentReceivedCount: number
    paymentPending: number
    totalUsers: number
    inactiveUsers: number
    activeUser: number
    coursesQuantity: number
    labelsCategory: string[]
    seriesCategory: number[]
    totalEnrollments: number
    labelsEnrollments: string[]
    seriesEnrollments: number[]
    labelsCourse: string[]
    seriesCourse: number[]
  }

  export interface ApiDashboardResponse {
    
    data: Dashboard
  
} 



