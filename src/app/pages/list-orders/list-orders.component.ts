import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrder().subscribe(
      (response) => {
        this.orders = response.orders;
      },
      (error) => {
        console.error('Erro ao buscar pedidos:', error);
      }
    );
  }

  toggleOrderStatus(order: Order) {
    this.orderService.UpdateOrder(order).subscribe(
      () => {
        this.router.navigate(['/orders'])
      },
      () => {
        alert('Erro ao atualizar pedido');
      }
    );
  }
}