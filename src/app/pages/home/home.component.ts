import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces/products';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public product: Product | null = null; 

  public products: Product[] = [];

  constructor(private productService: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProduct(0).subscribe(response => {
      this.products = response.products;
      if (this.products.length > 0) {
        this.product = this.products[0];
      }
    }, error => {
      console.error('Error getting products:', error);
    });
  }

  navigateToDetails(productId: string): void {
    this.router.navigate(['/details-products', productId]);
  }

}
