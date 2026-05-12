import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
      private readonly httpClient=inject(HttpClient);

// Tell Angular this returns an array of Products
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.baseUrl + "/Products");
  }

  getProductById(id: number) {
  return this.httpClient.get<Product>(environment.baseUrl + `/Products/${id}`);
}

  // Use the interface for the data being sent
  addProduct(data: Partial<Product>): Observable<string> {
    return this.httpClient.post(environment.baseUrl + "/Products", data, { 
      responseType: 'text' 
    });
  }
}
