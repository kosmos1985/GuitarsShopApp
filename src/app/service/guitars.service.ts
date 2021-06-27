import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Guitars } from '../models/guitars';


@Injectable({
  providedIn: 'root'
})


export class GuitarsService {

 
  cartItems: {item: Guitars, amount: number}[] = [];
  total: number = 0;
  totalAmount: number = 0;
  newTotal = new Subject();

  api_url = 'http://localhost:3000/guitars';
  constructor(private http: HttpClient) { }

  getGuitars() {
    return this.http.get<Guitars>(this.api_url).pipe(map(arr => arr.sort((a: Guitars, b: Guitars) => a.name === b.name ? 0 : a.name ? 1 : -1))).pipe(tap(console.log));
  };

 
   getCartItems(): Observable<{item: Guitars, amount: number}[]> {
    return of(this.cartItems)
  };

  addToCart(item: Guitars, amount: number) {
    let m = this.cartItems.find((cartItem)=>{return cartItem.item == item});
    if (m) {
      m.amount += amount;
    } else {
      this.cartItems.push({item: item, amount: amount});
    }
    this.recalculate();
  };
  
 recalculate() {
    let sum = 0;
    let amt = 0;
    for (let cartItem of this.cartItems) {
      sum += cartItem.item.price * cartItem.amount;
      amt += cartItem.amount;
    }
    this.total = sum;
    this.totalAmount = amt;
    this.newTotal.next({total: this.total, amount: this.totalAmount});
  };

  decrease(item) {
    if (item.amount > 1) {
      item.amount -= 1;
    } else if (item.amount = 1) {
      let index = this.cartItems.indexOf(item);
      this.cartItems.splice(index, 1);
    }
    this.recalculate();
  };

  increase(item) {
    item.amount += 1;
    this.recalculate();
  };
}
