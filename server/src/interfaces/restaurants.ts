import { Coupon } from "../classes/coupon";

export interface product {
    name: string; 
    price: number;
    quantity: number;
}

export interface restaurant {
    name: string;
    products: product[];
    coupons: Coupon[];
}
