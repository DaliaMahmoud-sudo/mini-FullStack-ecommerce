import { Component, inject, signal, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { OrdersService } from '../../core/services/orders.service';
import { Product } from '../../core/models/product.interface';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../layouts/main-layout/components/navbar/navbar.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    NavbarComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {

  private productsService = inject(ProductsService);
  private orderService = inject(OrdersService);
  private router = inject(Router);

  products = signal<Product[]>([]);

  // ORDER
  selectedProduct!: Product;
  customerName: string = '';
  quantity: number = 1;
  showOrderModal: boolean = false;

  // PRODUCT
  newProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0
  };
  showProductModal: boolean = false;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error(err)
    });
  }

  // ================= ORDER =================

  openOrderModal(product: Product) {

    this.productsService.getProductById(product.id).subscribe({
      next: (res) => {
        this.selectedProduct = res;
        this.customerName = '';
        this.quantity = 1;
        this.showOrderModal = true;
      },
      error: (err) => console.log(err)
    });
  }

  closeOrderModal() {
    this.showOrderModal = false;
  }

 submitOrder() {
  // 1. Basic Validation
  if (!this.customerName.trim()) {
    alert('Please enter a customer name.');
    return;
  }

  // 2. Stock Check Alert
  if (this.quantity > this.selectedProduct.quantity) {
    alert(`Not enough stock! Only ${this.selectedProduct.quantity} items left.`);
    return;
  }

  const orderPayload = {
    customerName: this.customerName,
    items: [{
      productId: this.selectedProduct.id,
      quantity: this.quantity
    }]
  };

  this.orderService.addOrder(orderPayload).subscribe({
    next: () => {
      alert('Order Created Successfully');
      this.showOrderModal = false;
      this.loadProducts(); // Refresh products to show updated stock
    },
    error: (err) => alert('Error creating order. Please try again.')
  });
}

  // ================= PRODUCT =================

  openProductModal() {
    this.newProduct = {
      id: 0,
      name: '',
      price: 0,
      quantity: 0
    };

    this.showProductModal = true;
  }

  closeProductModal() {
    this.showProductModal = false;
  }

  submitProduct() {

    this.productsService.addProduct(this.newProduct).subscribe({
      next: () => {
        alert('Product Created Successfully');
        this.showProductModal = false;
        this.loadProducts();
      },
      error: (err) => console.log(err)
    });
  }

  // ================= UTIL =================

  isOrderPage(): boolean {
    return this.router.url.includes('/feed');
  }
}