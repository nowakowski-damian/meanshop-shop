import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CartComponent} from "./cart/cart.component";
import {OfferComponent} from "./offer/offer.component";
import {OrderComponent} from "./order/order.component";

const routes: Routes = [
  { path: '', redirectTo: '/offer', pathMatch: 'full' },
  { path: 'offer', component: OfferComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
