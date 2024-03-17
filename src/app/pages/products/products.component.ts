import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { Product }            from 'src/app/interfaces/products';
import { ProductsService }    from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public showLoading: boolean = true;
  constructor(
    private _productService: ProductsService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProduct().subscribe((response) => {
      this.products = response;
      this.showLoading = false;
    });
  }
}
