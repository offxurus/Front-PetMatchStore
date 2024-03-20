import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ListUserRoutingModule }       from './list-user-routing.module';
import { ListUserComponent }           from './list-user.component';
import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatInputModule }           from '@angular/material/input';
import { MatRippleModule }          from '@angular/material/core';
import { MatIconModule }            from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ListUserComponent],
  imports: [
    CommonModule,
    ListUserRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    SharedModule
  ],
})
export class ListUserModule {}
