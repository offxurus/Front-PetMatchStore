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
  public number: number = 0;
  public searchValue: string = '';
  
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

  realizarPesquisa(): void {
    if (this.searchValue.trim() !== '') {
      // Realizar a pesquisa apenas se o campo de pesquisa não estiver vazio
      // Aqui você pode adicionar a lógica para filtrar a lista de produtos com base no valor de pesquisa
      this.products = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else {
      // Se o campo de pesquisa estiver vazio, exiba todos os produtos novamente
      this.getProducts();
    }
  }

  getProducts() {
    this._productService.getProduct(this.number).subscribe((response) => {
      this.products = response.products;
      this.number = response.cursor;
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
