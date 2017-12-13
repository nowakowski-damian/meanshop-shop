import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ApiService} from "../model/api.service";
import {Order} from "../model/Order";
import {CartService} from "../cart.service";
import {ProductOrder} from "../model/ProductOrder";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  OrderStatus = OrderStatus;
  @Input() names: string;
  @Input() address: string;
  namesValidated: boolean;
  addressValidated: boolean;
  orderStatus: OrderStatus = OrderStatus.idle;

  constructor(private api: ApiService, private cartService: CartService) {
    this.names = "";
    this.address = "";
  }

  ngOnInit() {
  }

  onFinishOrder() {
    if (this.validateData()) {
      let products: ProductOrder[] = [];
      this.cartService.getProductsMap().forEach(
        (quantity, product) => products.push(new ProductOrder(product, quantity))
      );
      let order = new Order(this.names, this.address, this.cartService.totalAmount, products);
      this.api.postOrder(order).subscribe(
        response => {
          this.orderStatus = OrderStatus.success;
          this.cartService.clearCart();
        },
        error => this.orderStatus = OrderStatus.failure,
        () => {}
      );
    }
  }

  validateData(): boolean {
    this.namesValidated = this.names.length >= 3 && this.names.includes(" ");
    this.addressValidated = this.address.length >= 4 && this.address.includes(" ");
    return this.namesValidated && this.addressValidated;
  }

}

export enum OrderStatus {
  idle,
  success,
  failure
}

