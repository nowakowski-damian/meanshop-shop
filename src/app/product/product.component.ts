import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../model/Product';
import {CartService} from "../cart.service";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit{

  @Input() product: Product;

  constructor( public cartService: CartService ) { }

  ngOnInit(): void {
    if( !this.product.img ) {
      this.product.img = "assets/img/no-img.jpg";
    }
  }

}
