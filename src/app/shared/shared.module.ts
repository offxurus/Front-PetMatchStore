import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { DialogLoginClientComponent } from '../components/dialog-login-client/dialog-login-client.component';

@NgModule({
  declarations: [HeaderComponent, DialogLoginClientComponent],
  imports: [
    CommonModule,
    RouterModule 
  ],
  exports: [HeaderComponent, DialogLoginClientComponent] 
})
export class SharedModule { }