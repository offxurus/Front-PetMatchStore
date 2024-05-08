import { ClientAddress } from "./client";
import { Product } from "./products";

export interface Order{
    id?: string;
    total: number;
    cartItems?: Product[];
    subtotal?: number;
    freteSelecionado?: number;
    currentUser?:any;
    defaultAddress?: ClientAddress;
    installmentValue?: number;
    installments?: number;
    is_bolet?: boolean,
    dateOrder?: string,
    statusOrder?: string
}

export interface ListOrder {
    orders: Array<Order>;
  }