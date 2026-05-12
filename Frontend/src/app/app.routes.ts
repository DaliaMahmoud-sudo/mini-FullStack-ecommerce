import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { ProductsComponent } from './features/products/products.component';
import { OrdersComponent } from './features/orders/orders.component';
import { LandingComponent } from './features/landing/landing.component';

;



export const routes: Routes = [
  {
    path: '', 
    component: MainLayoutComponent, 
    children: [
      // Redirect empty path to feed
      { path: '', component:LandingComponent }, 
      { path: 'orders', component: OrdersComponent, title: 'Orders' },
      { path: 'products', component: ProductsComponent, title: 'Products' },
    ]
  },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
