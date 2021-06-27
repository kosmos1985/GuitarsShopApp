import { Component, OnInit } from '@angular/core';
import { GuitarsService } from '../service/guitars.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems = [];
  total = 0;
  constructor(private http: GuitarsService) { }

  ngOnInit() {
    this.total = this.http.total;
    this.http.getCartItems()
      .subscribe(
        (cartItems) => {this.cartItems = cartItems}
    );

    // this.total = this.http.total;

    this.http.newTotal.subscribe(
      (data) => {
        this.total = data.total;
        console.log(this.total);
      }
    );
  };
    
    printCart() {
    console.log(this.http.cartItems);
  }

}
