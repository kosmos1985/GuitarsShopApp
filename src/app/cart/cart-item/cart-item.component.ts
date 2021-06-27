import { Component, OnInit, Input } from '@angular/core';
import { GuitarsService } from '../../service/guitars.service';
import { Guitars } from '../../models/guitars';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  
  @Input() cartItem: {item: Guitars, amount: number};
  
  constructor(private http: GuitarsService) { }

  ngOnInit() {
  };

  decrease(item) {
    this.http.decrease(item);
  };

  increase(item) {
    this.http.increase(item);
  };

}
