interface CreditCard {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  }
  
  interface CreditCardHolderInfo {
    name: string;
    email: string;
    cpfCnpj: string;
    postalCode: string;
    addressNumber: string;
    addressComplement: string | null; // Pode ser nulo
    phone: string;
    mobilePhone: string;
  }
  
  export interface Payment {
    billingType: string; // Este campo parece ser fixo, se for o caso use uma string literal.
    value: number;
    dueDate: string; // Usando string para data (ou você pode usar Date se preferir)
    creditCard: CreditCard;
    creditCardHolderInfo: CreditCardHolderInfo;
    remoteIp: string;
  }