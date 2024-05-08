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

  isBolet(valor: boolean = false) {
    this.order.is_bolet = valor;
  }


  finalizarPedido1() {
    const selectedOption = document.querySelector('input[name="payment-method"]:checked');
    if (!selectedOption) {
      alert('Por favor, selecione uma opção de pagamento.');
      return;
    }
    if (this._userService.getCurrentUser()) {
      const stateData = { order: this.order };
      this.modalService.openModal(CheckoutModalComponent, {
        width: '80%',
        height: '80%',
        data: stateData
      });
    } else {
      setTimeout(() => {
        this._router.navigate(['/login']);
      }, 3000);
    }
  }
}
