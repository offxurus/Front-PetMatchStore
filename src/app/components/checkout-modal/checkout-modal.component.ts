import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { SuccessMessageModalComponent } from '../sucess-message-modal/sucess-message-modal.component';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.scss']
})
export class CheckoutModalComponent implements OnInit {

  status: { success: boolean, message: string } = { success: false, message: '' };
  public order: Order = {
    id:'',
    total: 0,
    cartItems: [],
    subtotal: 0,
    currentUser: {},
    defaultAddress: {cep: ''},
    installments: 1,
    freteSelecionado: 0,
    is_bolet: false
  };

  constructor(
    private _userService: UserService,
    private _router: Router, 
    private _order: OrderService,
    private dialogRef: MatDialogRef<CheckoutModalComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(!this._userService.getCurrentUser()){
      this._router.navigate(['/']);
    }
    this.order=history.state.order
  }
  closeModal(): void {
    this.dialogRef.close();
  }

  generateNumericId(length: number): string {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  onSubmit() {
    const orderId = this.generateNumericId(8);
    this.order.id = orderId;
    this._order.createProduct(this.order).subscribe(
      () => {
        const dialogRef = this.dialog.open(SuccessMessageModalComponent, {
          width: '400px',
          data: {
            message: `Pedido ${orderId} criado com sucesso. Valor: ${this.order.total.toFixed(2)}.`,  
          }
        });
        this.dialogRef.close();
      },
      () => {
        this.status = {
          success: false,
          message: 'Erro ao criar pedido.'
        };
      }
    );
  }
}
