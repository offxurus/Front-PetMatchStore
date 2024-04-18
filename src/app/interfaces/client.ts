export interface Client {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    cpf?: string;
    group?: string;
    active?: boolean;
    birth_date?: Date;
    gender?: string;
    billing_address?: ClientAddress;
    delivery_address?: ClientAddress[];
}

export interface ClientSignIn {
    id?: string;
    group?: string;
    active?: boolean;
    name?: string;
  }

  export interface ClientAddress{
    cep: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    isDefault?: boolean;
  }