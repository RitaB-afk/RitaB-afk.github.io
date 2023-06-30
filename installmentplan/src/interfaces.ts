export interface PaymentDetails {
    principal: number;
    periods: number;
    interest: number;
  }
  
  export interface InstallementPlan {
    period: number;
    paymentDate: Date;
    totalPayment: string;
    principalPayment: string;
    interestPayment: string;
    remainingBalance: string;
  }
  