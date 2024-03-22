import { Component, Inject, OnInit } from '@angular/core';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<DialogGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if(!this._userService.getCurrentUser()){
      this._router.navigate(['/']);
    }
    this.newProduct =this.data
    this.productId = this.newProduct.id;
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
            if (response && response['path']){
              if (!this.newProduct.images)
                this.newProduct.images = []
              this.newProduct.images?.push(response['path'])
            }
          }
        );
      }
    }
  }
  setImageDefault(image_default: string){
    if (this.productId) {
      this.newProduct.image_default = image_default
      this.updateReq(false)
    }
  }
  deleteImage(image: string){
    if(this.productId){
      let newlist: string[] = []
      this.newProduct.images?.find(img => {
        if(image != img){
          newlist.push(img)
        }
      })
      if(newlist){
        this.newProduct.images = newlist
        this.updateReq(true)
      }  
    }
  }
  updateReq(isDelete : boolean){
    this._productService.UpdateProduct(this.newProduct).subscribe(
      () => {
        if(isDelete){
          alert('Imagem excluida');
        } else {
          alert('Imagem padrão atualizada');
        }
      },
      () => {
        alert('Erro ao atualizar imagem principal');
      }
    );
  }
  closeModal(): void {
    this.dialogRef.close();
    this._router.navigate(['/products']);
  }
}
