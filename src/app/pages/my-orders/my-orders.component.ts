import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { User } from 'src/app/interfaces/user';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  pedidos: Order[] = [];
  public currentUser: User | null= { email: '', password: '', name: '', cpf: '', group: '', active: true};

  constructor(
    private _router: Router,
    private _userService: UserService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    if(!this._userService.getCurrentUser()){
      this._router.navigate(['/']);
    }
    this.currentUser = this._userService.getCurrentUser();
    this.getOrder();
  }


  getOrder() {
    this.orderService.getOrder().subscribe(
      (response) => {
        this.pedidos = response.orders;
        console.log(this.pedidos)
    });
  }

  verDetalhes(pedidoId: string | undefined): void {
    if (pedidoId) {
      this._router.navigate(['/orders', pedidoId]);
    } else {
      console.error('Pedido ID está undefined');
    }
  }
}
