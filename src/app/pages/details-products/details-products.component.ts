import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces/products';
import { CartService } from 'src/app/services/cart.service';

declare var $: any;

@Component({
  selector: 'app-details-products',
  templateUrl: './details-products.component.html',
  styleUrls: ['./details-products.component.scss']
})
export class DetailsProductsComponent implements OnInit, AfterViewInit, OnDestroy {

  currentSlide = 0;

  public product: Product | undefined;
  private routeSubscription: Subscription | undefined;
  showNotification: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private _router: Router
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

  ngAfterViewInit(): void {
    $('#carouselExampleControls').carousel();
  }

  getProductDetails(productId: string): void {
    this.productService.getProductById(productId).subscribe(
      (product) => {
        this.product = product;
      },
      (error) => {
        console.error('Error fetching product details:', error);
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

  comprar(): void {
    if (this.product) {
      this.cartService.adicionarAoCarrinho(this.product);
      this._router.navigate(['/shopping-cart']);
    }
  }

  adicionarAoCarrinho(): void {
    if (this.product) {
      this.cartService.adicionarAoCarrinho(this.product);
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    }
  }
  

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

  }
}
