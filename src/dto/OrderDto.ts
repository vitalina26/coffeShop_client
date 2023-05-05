export interface OrderDto {
    items: CoffeIdAndQuantity[];
  }
  export interface CoffeIdAndQuantity {
    coffe_id: string;
    quantity: number;
  }
  