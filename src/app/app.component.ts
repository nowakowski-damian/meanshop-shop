import {Component, OnChanges, OnInit, Output} from '@angular/core';
import {Product} from "./model/Product";
import {Category} from "./model/Category";
import {ApiService} from "./model/api.service";
import {CartService} from "./cart.service";
import {WebSocketService} from "./web-socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  // allProducts: Product[];
  // filteredProducts: Product[];

  constructor(public cartService: CartService ) {
    // this.allProducts = [];
    // this.filteredProducts = [];
  }

  ngOnInit() {

  }



}
