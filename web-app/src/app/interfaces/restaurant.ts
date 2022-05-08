import { Coupon } from "./coupon";

export interface Product {
    name: string; 
    price: number;
    quantity: number;
}

export interface Restaurant {
    name: string;
    products: Product[];
    coupons: Coupon[];
}
