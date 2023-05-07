import { Coffe } from "./Coffe";

export interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    coffe_id: Coffe;
}
