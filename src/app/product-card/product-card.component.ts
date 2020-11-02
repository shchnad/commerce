import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
@Input('product') product: Product;
@Input('showActions') showActions = true;
@Input('shopping-cart') shoppingCart;

constructor(
  private productService: ProductService,
  private shoppingCartService: ShoppingCartService
  ){}

addToCart(product:Product){
  this.shoppingCartService.addToCart(product)
}

getQuantity(){
  if (!this.shoppingCart) return 0;
  let item = this.shoppingCart.items[this.product.key];
  return item ? item.quantity : 0
}


}
