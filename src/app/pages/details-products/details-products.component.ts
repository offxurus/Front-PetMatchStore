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

  public product: Product | any;
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

  getStarRating(): string {
    const fullStars = Math.floor(this.product?.rating);
    const halfStars = Math.ceil(this.product?.rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;

    let starRating = '';
    for (let i = 0; i < fullStars; i++) {
      starRating += '★';
    }
    for (let i = 0; i < halfStars; i++) {
      starRating += '½';
    }
    for (let i = 0; i < emptyStars; i++) {
      starRating += '☆';
    }

    return starRating;
  }
  

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

  }
}
