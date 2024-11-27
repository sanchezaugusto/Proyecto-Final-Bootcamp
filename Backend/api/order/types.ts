export interface IOrderProduct {
  product_id: string
  quantity: number
  sub_total: number
}

export interface IOrder {
  _id?: string;
  userId: string;
  products: IOrderProduct[];
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
