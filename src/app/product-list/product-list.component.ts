import {Component, EventEmitter, Input, OnChanges, OnInit} from '@angular/core';
import {Product} from '../model/Product';
import {CartService} from "../cart.service";
import {WebSocketService} from "../web-socket.service";
export declare let $ :any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent implements OnChanges,OnInit {

  @Input() products: Product[];
  PAGINATION_MAX = 3;

  productsForCurrPage: Product[];
  pages: number[];
  currentPage: number;
  currentProduct: Product;

  constructor(public cartService: CartService, private webSocketService: WebSocketService) {
    this.products = [];
    this.productsForCurrPage = [];
    this.pages = [];
    this.currentPage = 0;
  }

  ngOnInit() {
    this.webSocketService.getNewOrders().subscribe(
      productOrdersArray => {
        productOrdersArray.forEach( productOrder => {
          let product = productOrder.product;
          product.quantity = Math.max(product.quantity-productOrder.quantity,0);
          this.notifyProductChange(product);
        })
      }
    );

     this.webSocketService.getPromotions().subscribe(
       promotion => {
         this.products.forEach( product => {
           if( product._id===promotion.product._id) {
             if(promotion.active) {
               promotion.newPrice = Math.round((product.price*(1-promotion.discountPerentage/100))*100)/100;
               product.promotion = promotion;
             }
             else {
               product.promotion = null;
             }
             return;
           }
         });
       }
     );
  }

  ngOnChanges() {
    this.preparePaginationList(this.products);
    this.currentPage = Math.min(this.pages.length, this.currentPage);
    this.loadProductsForCurrPage();
  }

  onPage(page) {
    this.currentPage = page - 1;
    this.loadProductsForCurrPage();
  }

  onNextPage() {
    if ( this.currentPage < this.pages.length - 1 ) {
      this.currentPage++;
      this.loadProductsForCurrPage();
    }
  }

  onPrevPage() {
    if ( this.currentPage > 0 ) {
      this.currentPage--;
      this.loadProductsForCurrPage();
    }
  }

  preparePaginationList(products: Product[]) {
    let pageCount = Math.floor(products.length / this.PAGINATION_MAX);
    if ( products.length % this.PAGINATION_MAX !== 0 ) {
      pageCount++;
    }
    this.pages = Array(pageCount).fill(1).map((x, i) => i + 1);
  }

  loadProductsForCurrPage() {
    const start = this.currentPage * this.PAGINATION_MAX;
    const end = Math.min(start + this.PAGINATION_MAX, this.products.length );
    this.productsForCurrPage = this.products.slice(start, end);
  }

  onProductClicked(product){
    this.currentProduct = product;
    $('#productModal').modal('toggle');
  }


  private notifyProductChange(newProduct: Product) {
    this.products.forEach( product => {
      if(product._id===newProduct._id) {
        product.quantity = newProduct.quantity;
        this.cartService.notifyProductChange(product);
      }
    } );
  }
}
