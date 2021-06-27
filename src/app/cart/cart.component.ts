import { Component, OnInit } from '@angular/core';
import { GuitarsService } from '../service/guitars.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems = [];
  total:any = 0;
  constructor(private http: GuitarsService) { }

  ngOnInit() {
    this.total = this.http.total;
    this.http.getCartItems()
      .subscribe(
        (cartItems) => {this.cartItems = cartItems}
    );

    this.http.newTotal.subscribe(
      (data) => {
        this.total = data;
        console.log(this.total.total);
      }
    );
  };
    
    printCart() {
      console.log(`Sum to be paid: ${this.total.total} zł`, this.http.cartItems );
  };

}
