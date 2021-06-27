import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuitarsService } from './service/guitars.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';

registerLocaleData(localePl);

@NgModule({
  declarations: [AppComponent, CartComponent, CartItemComponent],
  imports: [BrowserModule, FormsModule,ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  providers: [GuitarsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
