import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { SignInRoutingModule }      from './sign-in-routing.module';
import { SignInComponent }          from './sign-in.component';
import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatIconModule }            from '@angular/material/icon';
import { MatInputModule }           from '@angular/material/input';
import { MatRippleModule }          from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
    SharedModule
  ],
})
export class SignInModule {}
