import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  pedido: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    const pedidoId = this.route.snapshot.paramMap.get('id');
    if (pedidoId) {
      this.orderService.getOrder(pedidoId).subscribe(pedido => {
        this.pedido = pedido;
        console.log(this.pedido)
      });
    } else {
      console.error('Pedido ID está null');
    }
  }
}
