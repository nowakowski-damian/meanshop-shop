import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppFilterComponent } from './filter/app-filter.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import {CartService} from "./cart.service";
import {ApiService} from "./model/api.service";
import { CartComponent } from './cart/cart.component';
import { OfferComponent } from './offer/offer.component';
import {AppRoutingModule} from "./app-routing.module";
import { OrderComponent } from './order/order.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {WebSocketService} from "./web-socket.service";

@NgModule({
  declarations: [
    AppComponent,
    AppFilterComponent,
    ProductComponent,
    ProductListComponent,
    CartComponent,
    OfferComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService, CartService, WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
