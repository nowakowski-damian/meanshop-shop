import {of} from 'rxjs/observable/of';
import {Product} from './Product';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Category} from './Category';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Order} from "./Order";
import {environment} from "../../environments/environment";


@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.PRODUCTS).pipe( catchError( this.handleError('getProducts',[]) ) );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.CATEGORIES).pipe( catchError( this.handleError('getCategories',[]) ) );
  }

  postOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(environment.ORDER,order);
  }


  private handleError<T> (operation, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T); // return an empty result
    };
  }
}
