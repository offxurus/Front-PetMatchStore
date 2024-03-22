import { Component, Inject, OnInit } from '@angular/core';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dialog-gallery',
  templateUrl: './dialog-gallery.component.html',
  styleUrls: ['./dialog-gallery.component.scss']
})
export class DialogGalleryComponent implements OnInit {

  public productId: string | undefined = '';
  public newProduct: Product = {name: '', price: 0, quantity: 0, active: true };

  constructor(
    private uploadService: UploadFilesService,
    private _userService: UserService,
    private _router: Router,
    private _productService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if(!this._userService.getCurrentUser()){
      this._router.navigate(['/']);
    }
    this.newProduct =this.data
    console.log("antes",this.newProduct)
    this.productId = this.newProduct.id;
    console.log('productId:', this.productId);

    if(this.newProduct.images && this.newProduct.images.length>0 && !this.newProduct.image_default){
      this.newProduct.image_default = this.newProduct.images[0]
    }
  }


  uploadFiles(event: any) {
    const files: FileList = event?.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        console.log("file_dashboard:", file);
        this.uploadService.uploadFile(file, this.productId).subscribe(
          response => {
            console.log(response);
          }
        );
      }
    }
  }
  setImageDefault(image_default: string){
    if (this.productId) {
      this.newProduct.image_default = image_default
      this._productService.UpdateProduct(this.newProduct).subscribe(
        () => {
          alert('Imagem Principal definida');
        },
        () => {
          alert('Erro ao atualizar imagem principal');
        }
      );
    }
  }
}
