import { Component, OnInit } from '@angular/core';
import {Product} from "../model/Product";
import {ApiService} from "../model/api.service";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  allProducts: Product[];
  filteredProducts: Product[];

  constructor( private apiService: ApiService ) {
    this.allProducts = [];
    this.filteredProducts = [];
  }

  ngOnInit() {
    this.apiService.getProducts().subscribe(
      result => {
        this.allProducts = result;
      }
    );
  }

  onFilterChanged(products: Product[]) {
    this.filteredProducts = products;
  }
}
