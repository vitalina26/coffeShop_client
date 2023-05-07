import { OrderItem } from "./OrderItem";
import { User } from "./User";

export interface Order {
    id: string;
    date: Date;
    total_price: number;
    status: string;
    user_id: User;
    items: OrderItem[];
}
