import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  imports: [   CommonModule,
    RouterLink,
    FormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent  implements OnInit {
  newProduct = {
  name: '',
  price: 0,
  quantity: 0
};


  private productsService = inject(ProductsService);

  products = signal<Product[]>([]);

  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: (data) => this.products.set(data.slice(0, 6)), // show preview only
      error: (err) => console.log(err)
    });
  }
  submitProduct(form: any) {

  if (form.invalid) return;

  this.productsService.addProduct(this.newProduct).subscribe({
    next: () => {

      alert('Product added successfully');

      // reset form
      this.newProduct = {
        name: '',
        price: 0,
        quantity: 0
      };

      form.resetForm();
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}
