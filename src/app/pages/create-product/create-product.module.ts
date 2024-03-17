import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateProductComponent } from './create-product.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CreateProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class CreateProductModule { }
