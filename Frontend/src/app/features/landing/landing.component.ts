import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {

  private productsService = inject(ProductsService);
  private fb = inject(FormBuilder);

  products = signal<Product[]>([]);

  addProductForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.min(1)]],
    quantity: ['', [Validators.required, Validators.min(0)]],
  });

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (data) => this.products.set(data.slice(0, 6)),
      error: (err) => console.log(err)
    });
  }

  submitProduct() {

    if (this.addProductForm.invalid) {
      this.addProductForm.markAllAsTouched();
      return;
    }

    const product: Product = this.addProductForm.value;

    this.productsService.addProduct(product).subscribe({
      next: () => {
        alert('Product added successfully');
        this.addProductForm.reset();
        this.loadProducts();
      },
      error: (err) => console.log(err)
    });
  }
}