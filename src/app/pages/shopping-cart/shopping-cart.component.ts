import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ClientAddress } from 'src/app/interfaces/client';
import { Product } from 'src/app/interfaces/products';
import { User } from 'src/app/interfaces/user';
import { CartService } from 'src/app/services/cart.service';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {


  cartItems: Product[] = [];
  total: number = 0;
  subtotal: number = 0;
  cep: string = '';
  freteSelecionado: number | null = null;
  defaultFrete: boolean = false;
  showNotification: boolean = false;

  public userGroup: string = '';
  public defaultAddress: any = {};
  public currentUser: any = {
    email: '', password: '', name: '', cpf: '',
    group: 'cliente', active: true, birth_date: new Date(), gender: '',
    billing_address: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: ''
    }, delivery_address: []
  };
  

  constructor(
    private cartService: CartService,
    private _userService: UserService,
    private _router: Router,
    private _clientService: ClientService
  ) { 
    
  }

  ngOnInit(): void {
    this.currentUser = this._userService.getCurrentUser();
    console.log(this.currentUser)
    this.cartItems = this.cartService.getCarrinho();
    this.calcularTotal();
    this.subtotal = this.cartService.calcularTotal();
    this.selecionarFrete(13.33);


    if(this.currentUser){
      this.defaultAddress = this.currentUser.delivery_address.find((address: ClientAddress) => address.isDefault === true);
      if(!this.defaultAddress && this.currentUser.delivery_address.length>=0){
        this.defaultAddress = this.currentUser.delivery_address[0]
      }

      console.log(this.defaultAddress);
    }

  }

  calcularTotal(): void {
    this.total = this.cartService.calcularTotal();
  }

  selecionarFrete(valor: number): void {
    this.freteSelecionado = valor;
    this.calcularTotalComFrete();
  }

  calcularTotalComFrete(): void {
    if (this.freteSelecionado !== null) {
      this.total = this.subtotal + this.freteSelecionado;
    }
  }

  removerDoCarrinho(produto: Product): void {
    this.cartService.removerDoCarrinho(produto);
    this.cartItems = this.cartService.getCarrinho();
    this.calcularTotal();
  }

  diminuirQuantidade(item: Product): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.atualizarCarrinho();
      this.calcularTotal();
    }
  }

  aumentarQuantidade(item: Product): void {
    item.quantity++;
    this.cartService.atualizarCarrinho();
    this.calcularTotal();
  }

  calcularFrete(): void {
    this.defaultFrete = true;
    const valoresFrete = [7.24, 13.55, 33.35];
    const indiceAleatorio = Math.floor(Math.random() * valoresFrete.length);
    this.selecionarFrete(valoresFrete[indiceAleatorio]);
  }


  finalizarPedido(): void {
    if (this._userService.getCurrentUser()) {
      this._router.navigate(['/']);
    } else {
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
        this._router.navigate(['/login']);
      }, 3000);
    }
  }
}
