import { NgModule } from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { AppRoutingModule }             from './app-routing.module';
import { AppComponent }                 from './app.component';
import { BrowserAnimationsModule }      from '@angular/platform-browser/animations';
import { MatFormFieldModule }           from '@angular/material/form-field';
import { MatInputModule }               from '@angular/material/input';
import { MatRippleModule }              from '@angular/material/core';
import { MatIconModule }                from '@angular/material/icon';
import { UserService }                  from './services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatListModule }                from '@angular/material/list';
import { MatProgressSpinnerModule }     from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { LoginModule } from './pages/login/login.module';
import { LoginClientComponent } from './pages/login-client/login-client.component';
import { HomeComponent } from './pages/home/home.component';
import { DialogGalleryComponent } from './components/dialog-gallery/dialog-gallery.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogPreviewComponent } from './components/dialog-preview/dialog-preview.component';
import { CarrosselComponent } from './components/carrossel/carrossel.component';
import { HeaderClienteComponent } from './components/header-cliente/header-cliente.component';
import { MatCardModule } from '@angular/material/card';
import { DetailsProductsComponent } from './pages/details-products/details-products.component'; 

@NgModule({
  declarations: [AppComponent, DashboardComponent, LoginClientComponent, HomeComponent, DialogGalleryComponent, DialogPreviewComponent, CarrosselComponent, HeaderClienteComponent, DetailsProductsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    HttpClientModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule, 
    SharedModule,
    FormsModule, 
    LoginModule,
    MatToolbarModule, 
    MatCardModule,
    MatCardModule
  ],
  providers: [UserService, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
