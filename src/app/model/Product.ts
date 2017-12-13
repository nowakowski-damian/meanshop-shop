
import {Category} from "./Category";
import {Promotion} from "./Promotion";

export class Product {
  _id: string;
  name: String;
  img: String;
  description: String;
  longDescription: String;
  price: number;
  category: Category;
  quantity: number;
  promotion: Promotion;
}
