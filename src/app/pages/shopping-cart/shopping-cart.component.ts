import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { EnderecoSelecaoModalComponent } from 'src/app/components/endereco-selecao-modal/endereco-selecao-modal.component';
import { ClientAddress } from 'src/app/interfaces/client';
import { Product } from 'src/app/interfaces/products';
import { User } from 'src/app/interfaces/user';
import { CartService } from 'src/app/services/cart.service';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddressService } from 'src/app/services/select-address.service';
import { Order } from 'src/app/interfaces/order';

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
  mostrarNovoFrete: boolean = false;
  opcoesFrete: any[] = [];
  opcoesFreteCEP: any[] = [];
  mostrarOpcoesFrete: boolean = false;

  public userGroup: string = '';
  public order: any = {}
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
    private _clientService: ClientService,
    private dialog: MatDialog,
    private addressService: AddressService
  ) { 
    
  }

  ngOnInit(): void {
    this.currentUser = this._userService.getCurrentUser();
    this.cartItems = this.cartService.getCarrinho();
    this.subtotal = this.cartService.calcularTotal();
    console.log(this.subtotal)
    this.buscarOpcoesFrete()
    this.calcularTotalComFrete();
    this.addressService.selectedAddress$.subscribe(address => {
      this.defaultAddress = address;
      this.buscarOpcoesFrete();
    });

    if(this.currentUser){
      this.defaultAddress = this.currentUser.delivery_address.find((address: ClientAddress) => address.isDefault === true);
      if(!this.defaultAddress && this.currentUser.delivery_address.length>=0){
        this.defaultAddress = this.currentUser.delivery_address[0]
      }

      console.log(this.defaultAddress);
    }
  }

  openModal(): void {
    const dialogRef = this.dialog.open(EnderecoSelecaoModalComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  calcularTotalComFrete(): void {
    if (this.freteSelecionado !== null) {
      this.total = this.subtotal + this.freteSelecionado;
    } else{
      this.total = this.subtotal;
    }
  }

  mostrarConsultaNovoFrete() {
    this.mostrarNovoFrete = true;
  }

  selecionarFrete(valor: number): void {
    this.freteSelecionado = valor;
    this.calcularTotalComFrete();
  }

  buscarOpcoesFrete() {
    this.opcoesFrete = [
      { nome: 'Correios - SEDEX', valor: parseFloat((Math.random() * (100 - 20) + 20).toFixed(2)) },
      { nome: 'Correios - PAC', valor: parseFloat((Math.random() * (100 - 20) + 20).toFixed(2)) },
      { nome: 'JadLog', valor: parseFloat((Math.random() * (100 - 20) + 20).toFixed(2)) }
    ];
  
    this.mostrarOpcoesFrete = true;
  }

  CalcularFrete() {
    if(this.cep){
      this.opcoesFreteCEP = [
        { nome: 'Correios - SEDEX', valor: parseFloat((Math.random() * (100 - 20) + 20).toFixed(2)) },
        { nome: 'Correios - PAC', valor: parseFloat((Math.random() * (100 - 20) + 20).toFixed(2)) },
        { nome: 'JadLog', valor: parseFloat((Math.random() * (100 - 20) + 20).toFixed(2)) }
      ];
    
      this.mostrarOpcoesFrete = true;
    }  else{
      alert("Preencha um cep para calcular o valor")
    }
  }

  removerDoCarrinho(produto: Product): void {
    this.cartService.removerDoCarrinho(produto);
    this.cartItems = this.cartService.getCarrinho();
    this.calcularTotalComFrete();
  }

  diminuirQuantidade(item: Product): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.atualizarCarrinho();
      this.subtotal = this.cartService.calcularTotal();
      this.calcularTotalComFrete();
    }
  }

  aumentarQuantidade(item: Product): void {
    item.quantity++;
    this.cartService.atualizarCarrinho();
    this.subtotal = this.cartService.calcularTotal();
    this.calcularTotalComFrete();
  }


  finalizarPedido() {
    const selectedOption = document.querySelector('input[name="freteOption"]:checked');
    if (!selectedOption) {
      alert('Por favor, selecione uma opção de frete.');
      return;
    }
    if (this._userService.getCurrentUser()) {
      this.order.cartItems = this.cartItems;
      this.order.subtotal = this.subtotal;
      this.order.total = this.total;
      this.order.currentUser = this.currentUser;
      this.order.defaultAddress = this.defaultAddress;
      this.order.freteSelecionado = this.freteSelecionado;
      this._router.navigate(['/order-payment'], { state: { order: this.order } });
    } else {
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
        this._router.navigate(['/login']);
      }, 3000);
    }
  }
}  
