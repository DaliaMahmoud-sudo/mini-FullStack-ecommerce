import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
 @Input() isOrderPage: boolean = false;


  @Output() createProduct = new EventEmitter<void>();


}
