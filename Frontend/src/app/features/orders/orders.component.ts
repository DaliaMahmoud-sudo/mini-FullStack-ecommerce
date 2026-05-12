import { Component, inject, OnInit, signal } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {

  private ordersService = inject(OrdersService);

  orders = signal<any[]>([]);
  selectedOrder: any = null;

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.ordersService.getAllOrders().subscribe({
      next: (data) => this.orders.set(data),
      error: (err) => console.log(err)
    });
  }

  selectOrder(order: any) {
    this.selectedOrder = order;
  }

  closeDetails() {
    this.selectedOrder = null;
  }
}