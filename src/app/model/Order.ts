import {ProductOrder} from "./ProductOrder";

export class Order {
  names: String;
  address: String;
  totalAmount: Number;
  products: ProductOrder[];
  done: boolean;

  constructor(names: String, address: String, totalAmount: Number, products: ProductOrder[]) {
    this.names = names;
    this.address = address;
    this.totalAmount = totalAmount;
    this.products = products;
    this.done = false;
  }
}
