import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListOrder, Order } from '../interfaces/order';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(private http: HttpClient) { }

    getOrder(orderId?: string): Observable<ListOrder> {
        let URL = `${environment.apiUrl}/orders/${orderId}`

        if(!orderId)
          URL = `${environment.apiUrl}/orders`
        return new Observable<ListOrder>(observer => {
            this.http
              .get<ListOrder>(
                URL
              )
              .subscribe(
                (response) => {
                  observer.next(response);
                  observer.complete();
                },
                () => {
                  observer.error('error_on_get_orders');
                  observer.complete();
                }
              );
        });
      }


    createProduct(order: Order): Observable<Order> {
        return new Observable<Order>((observer) => {
            this.http.post<Order>(`${environment.apiUrl}/orders`, order).subscribe(
                (order) => {
                    observer.next(order);
                    observer.complete();
                },
                () => {
                    observer.error('error_on_create_order');
                    observer.complete();
                }
            );
        });
    }
}

