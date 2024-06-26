import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent }    from './pages/products/products.component';
import { SignInComponent }      from './pages/sign-in/sign-in.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailsProductsComponent } from './pages/details-products/details-products.component';
import { SignInClientComponent } from './pages/sign-in-client/sign-in-client.component';
import { ClientLoggedComponent } from './pages/client-logged/client-logged.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { OrderPaymentComponent } from './pages/order-payment/order-payment.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { ListOrdersComponent } from './pages/list-orders/list-orders.component';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'sign-in-client',
    component: SignInClientComponent
  },
  {
    path: 'list-user',
    loadChildren: () =>
      import('./pages/list-user/list-user.module').then((mod) => mod.ListUserModule),
    component: ListUserComponent,
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./pages/sign-in/sign-in.module').then((mod) => mod.SignInModule),
    component: SignInComponent,
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/products/products.module').then(
        (mod) => mod.ProductsModule
      ),
    component: ProductsComponent,
  },{
    path: 'create-product',
    loadChildren: () =>
      import('./pages/create-product/create-product.module').then(
        (mod) => mod.CreateProductModule
      ),
    component: CreateProductComponent,
  },
  {
    path: 'details-products/:id', 
    component: DetailsProductsComponent
  },
  {
    path: 'client-logged', 
    component: ClientLoggedComponent
  },
  {
    path: 'shopping-cart', 
    component: ShoppingCartComponent
  },
  {
    path: 'order-payment', 
    component: OrderPaymentComponent
  },
  {
    path: 'my-orders', 
    component: MyOrdersComponent
  },
  {
    path: 'orders/:id', 
    component: OrderDetailsComponent
  },
  {
    path: 'orders', 
    component: ListOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
