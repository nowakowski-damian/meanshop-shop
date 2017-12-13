import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {Observable} from "rxjs/Observable";
import * as io from 'socket.io-client'
import {ProductOrder} from "./model/ProductOrder";
import {Promotion} from "./model/Promotion";


@Injectable()
export class WebSocketService {

  private socket;

  constructor() {
    this.socket = io.connect(environment.BASE_URL);
  }

  getNewOrders(): Observable<[ProductOrder]> {
    return new Observable(observer => {
      this.socket.on(environment.ORDER_EVENT_KEY, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  getPromotions(): Observable<Promotion> {
    return new Observable(observer => {
      this.socket.on(environment.PROMOTION_EVENT_KEY, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

}
