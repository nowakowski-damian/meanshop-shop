import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../model/Category';
import {ApiService} from '../model/api.service';
import {Product} from "../model/Product";

@Component({
  selector: 'app-filter',
  templateUrl: './app-filter.component.html',
  styleUrls: ['./app-filter.component.css'],
})
export class AppFilterComponent implements OnInit {

  filterMap: Map<String, boolean>;
  wordFilter: string;
  categories: Category[];
  noFilterActive = true;

  @Input() allProducts: Product[];
  @Output() onFilterChange: EventEmitter<Product[]>;

  constructor(private apiService: ApiService) {
    this.filterMap = new Map<string, boolean>();
    this.categories = [];
    this.onFilterChange = new EventEmitter<Product[]>();
    this.wordFilter = "";
  }

  ngOnInit() {
    this.apiService.getCategories().subscribe(
      categories => {
        categories.forEach( category => this.filterMap.set(category.name, false) );
        this.categories = categories;
      },
      error => console.error(error),
      () => this.onFilterChange.emit( this.allProducts )
    );
  }

  onMainPageButton() {
    this.noFilterActive = true;
    this.filterMap.forEach( (value, key) => this.filterMap.set(key, false) );
    this.onFilterChange.emit( this.allProducts );
  }

  onFilterButton(filter: Category) {
    const value = this.filterMap.get(filter.name);
    this.filterMap.set(filter.name, !value);
    this.onFilterChange.emit( this.getFilteredProducts() );
  }

  private getFilteredProducts(): Product[] {

    // count active filters
    let filterCount = 0;
    this.filterMap.forEach( (value) => {
      if(value) {
        filterCount++;
      }
    });

    let filteredProducts = this.allProducts;

    if( filterCount===0 ) {
      this.noFilterActive = true;
    }
    else {
      this.noFilterActive = false;
      filteredProducts = this.allProducts.filter(
        product => this.filterMap.get(product.category.name)
      );
    }

    if( this.wordFilter.length>0 ) {

      //check if range
      if(this.wordFilter.includes("-")) {
        let numbers = this.wordFilter.split('-');
        let start = Number(numbers[0]);
        let end = Number(numbers[1]);
        if(start&&end) {
          if(start>end) {
            let temp = start;
            start = end;
            end = temp;
          }
          return filteredProducts.filter(
            product => product.price>=start && product.price<=end
          );
        }
      }
      // check if single price
      else if(Number(this.wordFilter)) {
        return filteredProducts.filter(
          product => product.price.toString().includes(this.wordFilter.trim().toLowerCase())
        );
      }
      else {
        return filteredProducts.filter(
          product => product.name.toLowerCase().includes(this.wordFilter.trim().toLowerCase())
        );
      }
    }
    else {
      return filteredProducts;
    }
  }

  onFilterWord(event) {
    this.wordFilter = event.target.value;
    this.onFilterChange.emit( this.getFilteredProducts() );
  }

}
