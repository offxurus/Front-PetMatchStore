import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent }    from './pages/products/products.component';
import { SignInComponent }      from './pages/sign-in/sign-in.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { LoginClientComponent } from './pages/login-client/login-client.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login-client',
    component: LoginClientComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
