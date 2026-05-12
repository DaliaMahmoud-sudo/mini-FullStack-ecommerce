import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
      private readonly httpClient=inject(HttpClient);
getAllOrders() {
  return this.httpClient.get<any[]>(environment.baseUrl + "/Orders");
}
   getProductById(id: number) {
   return this.httpClient.get<any>(environment.baseUrl + `/Orders/${id}`);
 }

  addOrder(data:object){
  return this.httpClient.post(environment.baseUrl + "/Orders", data, { responseType: 'text' });
}


}
