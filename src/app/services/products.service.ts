import { HttpClient }   from '@angular/common/http';
import { Injectable }   from '@angular/core';
import { Observable }   from 'rxjs';
import { environment }  from 'src/environments/environment';
import { ProductsGetResponse, Product }      from '../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${productId}`);
  }

  getProduct(cursor: number): Observable<ProductsGetResponse> {
    return new Observable<ProductsGetResponse>(observer => {
        this.http
          .get<ProductsGetResponse>(
            `${environment.apiUrl}/products?offset=${cursor}`
          )
          .subscribe(
            (response) => {
              observer.next(response);
              observer.complete();
            },
            () => {
              observer.error('error_on_get_products');
              observer.complete();
            }
          );
    });
  }
  createProduct(newProduct: Product): Observable<Product> {
    return new Observable<Product>((observer) => {
      this.http.post<Product>(`${environment.apiUrl}/products`, newProduct).subscribe(
        (product) => {
          observer.next(product);
          observer.complete();
        },
        () => {
          observer.error('error_on_create_product');
          observer.complete();
        }
      );
    });
  }

  UpdateProduct(newProduct: Product): Observable<Product> {
    return new Observable<Product>((observer) => {
    this.http.post<Product>(`${environment.apiUrl}/products/${newProduct.id}`, newProduct).subscribe(
      (product) => {
        observer.next(product);
        observer.complete();
      },
      (error) => {
        observer.error(error);
        observer.complete();
      }
      );
    });
  }
}
