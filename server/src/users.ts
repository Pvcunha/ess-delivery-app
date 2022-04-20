import { Coupon } from "./coupon";
import { product } from "./restaurants";

export interface Order {
    id: string;
    products: product[];
    amount: number;
    coupon: Coupon;
    restaurant: string;
}

export interface User {
    name: string;
    id: string;
    orders: Order[];
}
