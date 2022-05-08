import { PaymentMethod } from  "../features/user/payment-methods/classes/payment-method";
import { Order } from "../features/user/orders/order";

export interface User {
    name: string;
    id: string;
    email: string;
    orders: Order[];
    paymentMethods: PaymentMethod[] // tem que adicionar metodo de pagamento aqui
}