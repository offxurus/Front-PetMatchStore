import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces/products';

@Component({
  selector: 'app-details-products',
  templateUrl: './details-products.component.html',
  styleUrls: ['./details-products.component.scss']
})
export class DetailsProductsComponent implements OnInit, OnDestroy {

  currentSlide = 0;

  public product: Product | undefined;
  private routeSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.getProductDetails(productId);
      } else {
        console.error('Product ID not found in route parameters.');
      }
    });
  }

  getProductDetails(productId: string): void {
    this.productService.getProductById(productId).subscribe(
      (product) => {
        this.product = product;
      },
      (error) => {
        console.error('Error fetching product details:', error);
        // Aqui você pode adicionar lógica para informar ao usuário sobre o erro.
      }
    );
  }

  prevSlide(): void {
    if (this.product) {
      this.currentSlide = (this.currentSlide - 1 + (this.product.images?.length || 0)) % (this.product.images?.length || 1);
    }
  }

  nextSlide(): void {
    if (this.product) {
      this.currentSlide = (this.currentSlide + 1) % (this.product.images?.length || 1);
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
