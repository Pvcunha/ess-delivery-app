import { Coupon } from "./coupon";
import { product } from "./restaurants";

export interface Order {
    id: string;
    products: product[];
    amount: number;
    coupon: Coupon;
    restaurant: string;
    address: string
}

export interface User {
    name: string;
    id: string;
    email: string;
    orders: Order[];
}

export interface Admin {
    name: string;
    id: string;
}

