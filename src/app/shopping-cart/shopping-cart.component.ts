import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from '../interfaces/shopping-cart-item';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../interfaces/shiopping-cart';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
cart;
totalQuantity;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit(){
    (await this.shoppingCartService.getCart()).valueChanges().subscribe((cart:ShoppingCart)=> {
      this.totalQuantity = 0;
      this.cart = cart;
      for (let productKey in cart.items){          
        this.totalQuantity += cart.items[productKey].quantity
      }
    })
  }
  
}
