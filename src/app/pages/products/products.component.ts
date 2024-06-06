import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { DialogPreviewComponent } from 'src/app/components/dialog-preview/dialog-preview.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public showLoading: boolean = true;
  public productParams: Product = { name: '', quantity: 0, price: 0, active: true };
  public currentProductId: string = '';
  public currentUser: User | null = { email: '', password: '', name: '', cpf: '', group: '', active: true };
  public number: number = 0;
  public searchValue: string = '';

  private originalProducts: Product[] = [];

  constructor(
    private _productService: ProductsService,
    private _router: Router,
    private _userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this._userService.getCurrentUser()) {
      this._router.navigate(['/']);
    }
    if (history.state && history.state.user) {
      this.currentUser = history.state.user;
    }
    this.currentUser = this._userService.getCurrentUser();
    this.getProducts();
  }

  openPreview(productId: string | undefined = undefined): void {
    if (productId) {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        const dialogRef = this.dialog.open(DialogPreviewComponent, {
          width: '800px',
          height: '80%',
          data: product
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('O modal foi fechado.');
        });
      }
    }
  }

  search(name: string): void {
    if (!name || name === '') {
      this.products = [...this.originalProducts];
    } else {
      this.products = this.originalProducts.filter(product =>
        product.name && product.name.toLowerCase().includes(name.toLowerCase())
      );
    }
  }

  getProducts(): void {
    this._productService.getProduct(this.number).subscribe((response) => {
      this.products = this.products.concat(response.products);
      this.number = response.cursor;
      this.showLoading = false;
      this.originalProducts = [...this.products];
    });
  }

  updateProduct(product: Product): void {
    this._router.navigate(['/products'], { state: { product: product, id: this.currentProductId } });
  }

  updateProductItem(product: Product): void {
    this._router.navigate(['/create-product'], { state: { product: product, id: this.currentProductId } });
  }

  activeProduct(active: boolean = true, product: Product): void {
    if (confirm("Confirma a alteração de status")) {
      this.productParams = product;
      this.productParams.active = !active;
      this.showLoading = true;
      this._productService.UpdateProduct(this.productParams).subscribe(
        () => {
          this.showLoading = false;
          this.getProducts();
        },
        error => {
          this.showLoading = false;
          console.error('Erro ao atualizar produtos:', error);
        }
      );
    }
  }
}
