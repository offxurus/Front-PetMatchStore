import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutModalComponent } from 'src/app/components/checkout-modal/checkout-modal.component';
import { Order } from 'src/app/interfaces/order';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss']
})
export class OrderPaymentComponent implements OnInit {

  public order: Order = {
    total: 0,
    cartItems: [],
    subtotal: 0,
    currentUser: {},
    defaultAddress: {cep: ''},
    installments: 1,
    freteSelecionado: 0,
    is_bolet: false
  }; 

  constructor(private _userService: UserService, private _router: Router, private modalService: ModalService) { }

  ngOnInit(): void {
    if (!this._userService.getCurrentUser()) {
      this._router.navigate(['/']);
    }
    this.order = history.state.order
    console.log(this.order)
  }
  calculateInstallmentValue(): void {
    if (this.order.total && this.order.installments) {
      this.order.installmentValue = this.order.total / this.order.installments;
    } else {
      this.order.installmentValue = 0;
    }
  }

  isBolet(isBolet: boolean): void {
    this.order.is_bolet = isBolet;
  }
  
  finalizarPedido1() {
    const selectedOption = document.querySelector('input[name="payment-method"]:checked');
    if (!selectedOption) {
      alert('Por favor, selecione uma opção de pagamento.');
      return;
    }
  
    if (this.order.is_bolet) {
      const nameInput = document.getElementById('name') as HTMLInputElement;
      const emailInput = document.getElementById('email') as HTMLInputElement;
  
      if (!nameInput.value.trim() || !emailInput.value.trim()) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
  
      if (!this.validateEmail(emailInput.value.trim())) {
        alert('Por favor, insira um e-mail válido.');
        return;
      }
    } else {
      const cardNumberInput = document.getElementById('card-number') as HTMLInputElement;
      const expiryDateInput = document.getElementById('expiry-date') as HTMLInputElement;
      const cvvInput = document.getElementById('cvv') as HTMLInputElement;
  
      if (cardNumberInput.value.trim().length !== 16 || !expiryDateInput.value.trim() || !cvvInput.value.trim()) {
        alert('Por favor, preencha todos os campos obrigatórios corretamente.');
        return;
      }
    }
  
    if (!this._userService.getCurrentUser()) {
      setTimeout(() => {
        this._router.navigate(['/login']);
      }, 3000);
      return;
    }
  
    const stateData = { order: this.order };
    this.modalService.openModal(CheckoutModalComponent, {
      width: '80%',
      height: '80%',
      data: stateData
    });
  }
  
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }  
}
