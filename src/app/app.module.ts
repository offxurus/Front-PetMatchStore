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
import { HomeComponent } from './pages/home/home.component';
import { DialogGalleryComponent } from './components/dialog-gallery/dialog-gallery.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogPreviewComponent } from './components/dialog-preview/dialog-preview.component';
import { MatCardModule } from '@angular/material/card';
import { DetailsProductsComponent } from './pages/details-products/details-products.component'; 
import { CarrosselComponent } from './components/carrossel/carrossel.component';
import { SignInClientComponent } from './pages/sign-in-client/sign-in-client.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ClientLoggedComponent } from './pages/client-logged/client-logged.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { DialogLogoutComponent } from './components/dialog-logout/dialog-logout.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { EnderecoSelecaoModalComponent } from './components/endereco-selecao-modal/endereco-selecao-modal.component';
import { OrderPaymentComponent } from './pages/order-payment/order-payment.component';
import { CheckoutModalComponent } from './components/checkout-modal/checkout-modal.component';
import { SuccessMessageModalComponent } from './components/sucess-message-modal/sucess-message-modal.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { MatMenuModule } from '@angular/material/menu';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { ListOrdersComponent } from './pages/list-orders/list-orders.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


@NgModule({
  declarations: [AppComponent, DashboardComponent,  HomeComponent, DialogGalleryComponent, DialogPreviewComponent, CarrosselComponent, DetailsProductsComponent, SignInClientComponent, ClientLoggedComponent, DialogLogoutComponent, ShoppingCartComponent, EnderecoSelecaoModalComponent, OrderPaymentComponent, CheckoutModalComponent, SuccessMessageModalComponent, MyOrdersComponent, OrderDetailsComponent, ListOrdersComponent, SidenavComponent],
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
    MatCheckboxModule,
    MatExpansionModule,
    MatMenuModule
  ],
  providers: [UserService, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
