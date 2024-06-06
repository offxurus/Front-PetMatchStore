import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogGalleryComponent } from 'src/app/components/dialog-gallery/dialog-gallery.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { DialogPreviewComponent } from 'src/app/components/dialog-preview/dialog-preview.component';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
  public newProduct: Product = {name: '', price: 0, quantity: 0, active: true };
  public currentUser: User | null= { email: '', password: '', name: '', cpf: '', group: '', active: true};
  public isUpdating: boolean = false;
  public productId: string | undefined = undefined;
  
  constructor(
    private _productService: ProductsService,
    private _userService: UserService,
    private dialog: MatDialog,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    if(!this._userService.getCurrentUser()){
      this._router.navigate(['/']);
    }
    if(history.state && history.state.user){
      this.currentUser = history.state.user;
    }
    if(history.state.product){
      this.isUpdating = true;
      this.newProduct = history.state.product
      this.productId = history.state.product.id
    }
    this.currentUser = this._userService.getCurrentUser();
  }

  openGaleria(productId : string | undefined = undefined): void {
    if(productId){
      this.newProduct.id = productId
      const dialogRef = this.dialog.open(DialogGalleryComponent, {
        width: '80%',
        height: '80%',
        panelClass: 'gallery-modal',
        disableClose: true,
        data: this.newProduct
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('O modal foi fechado.');
      });
    }
  }

  openPreview(productId : string | undefined = undefined): void {
    if(productId){
      this.newProduct.id = productId
      const dialogRef = this.dialog.open(DialogPreviewComponent, {
        width: '80%',
        height: '80%',
        data: this.newProduct
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('O modal foi fechado.');
      });
    }
  }
  createProduct() {
    if (this.isUpdating) {
      this._productService.UpdateProduct(this.newProduct).subscribe(
        () => {
          this._router.navigate(['/products'])
        },
        () => {
          alert('Erro ao atualizar produto');
        }
      );
    } else {
      this._productService.createProduct(this.newProduct).subscribe(
        (product) => {
          this.openGaleria(product.id);
        },
        () => {
          alert('Erro ao criar produto');
        }
      );
    }
  }
  cancelCreate(){
    this._router.navigate(['/products']);
  }
}