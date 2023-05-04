import { OrderItem } from "./OrderItem";

export interface Order {
    id: string;
    date: Date;
    total_price: number;
    status: string;
    items: OrderItem[];
}
