import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
  public newProduct: Product = {name: '', price: 0, quantity: 0, active: true };

  constructor(
    private _productService: ProductsService,
    private _router: Router
  ) {}

  createProduct() {
    this._productService.createProduct(this.newProduct).subscribe(
      () => {
        this._router.navigate(['/products']);
      },
      () => {
        alert('Erro ao criar produto');
      }
    );
  }
}