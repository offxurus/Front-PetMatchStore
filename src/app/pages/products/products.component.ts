import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { Product }            from 'src/app/interfaces/products';
import { ProductsService }    from 'src/app/services/products.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public showLoading: boolean = true;
  public productParams: Product = {name: '', quantity: 0, price: 0, active: true };
  public currentProductId: string = '';
  public currentUser: User | null= { email: '', password: '', name: '', cpf: '', group: '', active: true};

  constructor(
    private _productService: ProductsService,
    private _router: Router,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    if(!this._userService.getCurrentUser()){
      this._router.navigate(['/']);
    }
    if(history.state && history.state.user){
      this.currentUser = history.state.user;
    }
    this.currentUser = this._userService.getCurrentUser();
    this.getProducts();
  }

  getProducts() {
    this._productService.getProduct().subscribe((response) => {
      this.products = response;
      this.showLoading = false;
    });
  }

  updateProduct(product: Product): void {
    this._router.navigate(['/products'], {state: {product: product, id: this.currentProductId}})
  }

  activeProduct(active: boolean =true, product: Product): void {
    if(confirm("Confirma a alteração de status")){
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
