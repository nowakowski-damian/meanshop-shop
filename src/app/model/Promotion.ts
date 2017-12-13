import {Product} from "./Product";

export class Promotion {
  product: Product;
  discountPerentage: number;
  durationMin: number;
  active: boolean;

  newPrice:number;
}
