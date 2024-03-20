import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogGalleryComponent } from 'src/app/components/dialog-gallery/dialog-gallery.component';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
  public newProduct: Product = {name: '', price: 0, quantity: 0, active: true };
  
  constructor(
    private _productService: ProductsService,
    private uploadService: UploadFilesService,
    private dialog: MatDialog,
    private _router: Router
  ) {}
  
  uploadFile(event: any) {
    const file: File = event?.target.files[0]
    console.log("file_dashboard:",file)
    if(file){
      this.uploadService.uploadFile(file).subscribe(
        response => {
          console.log(response);
        }
      )
    }
  }

  openGaleria(): void {
    const dialogRef = this.dialog.open(DialogGalleryComponent, {
      width: '80%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado.');
    });
  }
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