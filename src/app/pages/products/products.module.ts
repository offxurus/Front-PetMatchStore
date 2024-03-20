import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { ProductsRoutingModule }      from './products-routing.module';
import { ProductsComponent }          from './products.component';
import { MatListModule }              from '@angular/material/list';
import { MatProgressSpinnerModule }   from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatListModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatIconModule
  ],
})
export class ProductsModule {}
