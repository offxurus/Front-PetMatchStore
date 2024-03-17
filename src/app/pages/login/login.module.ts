import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { LoginRoutingModule }       from './login-routing.module';
import { LoginComponent }           from './login.component';
import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatInputModule }           from '@angular/material/input';
import { MatRippleModule }          from '@angular/material/core';
import { MatIconModule }            from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    SharedModule
  ],
})
export class LoginModule {}
