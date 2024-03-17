import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateProductComponent } from './create-product.component';

@NgModule({
  declarations: [CreateProductComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CreateProductModule { }
