import { Injectable } from '@angular/core';
import {Product} from "./model/Product";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Injectable()
export class CartService {

  private orderedProducts: Map<Product,number>;
  private productsById: Map<String,Product>;

  cartSize: number;
  totalAmount: number;

  constructor() {
    this.orderedProducts = new Map<Product,number>();
    this.productsById = new Map<String,Product>();
    this.cartSize = 0;
    this.totalAmount = 0.0;
  }

  addProduct(product: Product) {
    event.stopPropagation();

    let quantityInCart = this.orderedProducts.get(this.productsById.get(product._id));
    if( quantityInCart ) {
      if(quantityInCart>=product.quantity) {
        return;
      }
      const quantity = this.orderedProducts.get(product);
      this.orderedProducts.set(product,quantity+1);
    }
    else {
      this.orderedProducts.set(product,1);
    }
    this.productsById.set(product._id,product);
    if(product.promotion) {
      this.totalAmount += product.promotion.newPrice;
    }
    else {
      this.totalAmount += product.price;
    }
    this.cartSize++;
  }

  removeProduct(product: Product) {
    let quantity = this.orderedProducts.get(this.productsById.get(product._id));
    this.cartSize -= quantity;
    this.totalAmount -= product.price*quantity;
    this.orderedProducts.delete(product);
    this.productsById.delete(product._id);
  }

  getProductsIterator(): IterableIterator<[Product,number]> {
    return this.orderedProducts.entries();
  }

  getProductsMap(): Map<Product,number> {
    return this.orderedProducts;
  }

  clearCart() {
    this.orderedProducts = new Map<Product,number>();
    this.totalAmount = 0;
    this.cartSize = 0;
  }

  notifyProductChange(newProduct: Product) {
    let orderedQuantity = this.orderedProducts.get(this.productsById.get(newProduct._id));
    if(orderedQuantity && orderedQuantity>newProduct.quantity) {
      if(newProduct.quantity==0) {
        this.removeProduct(newProduct);
        alert("Niestety produkt "+newProduct.name+" został wykupiony całkowicie, więc musieliśmy usunąć go z Twojego koszyka.");
      }
      else {
        let oldQuantity = this.orderedProducts.get(this.productsById.get(newProduct._id));
        let newQuantity = newProduct.quantity;
        let diff = oldQuantity-newQuantity;
        this.cartSize -= diff ;
        this.totalAmount -= newProduct.price*diff;
        this.orderedProducts.set(this.productsById.get(newProduct._id),newProduct.quantity);
        alert("Niestety ilość produktu "+newProduct.name+" w magazynie została zmieniona na "+newProduct.quantity+".Twój koszyk został zaaktualizowany o nową dostępną ilość produktu.");
      }
    }
  }

}
