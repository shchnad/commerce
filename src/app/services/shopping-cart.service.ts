import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../interfaces/product';
import { ShoppingCart } from '../interfaces/shiopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  addToCartButton = false;
  totalQuantity;

  constructor(private firebaseDb: AngularFireDatabase) { }

  private createCart(){
    return this.firebaseDb.list('/shopping-carts').push( {dateCreated: new Date().getTime()} )
  }

  private getItem(cartId, productId){
    return this.firebaseDb.object('/shopping-carts/' + cartId + '/items/' + productId)
  }

 private async getCartId():Promise<string>{
    if(!localStorage.getItem('cartId')) {
      let cart = await this.createCart();
      localStorage.setItem('cartId', cart.key);
    }
    return localStorage.getItem('cartId');
  }

  async getCart(){
    let cartId = await this.getCartId();
    return this.firebaseDb.object('/shopping-carts/' + cartId)
  }

 async addToCart(product: Product){
    let cartId = await this.getCartId();
    let item$ = this.getItem(cartId, product.key)
    let subscr = item$.valueChanges().subscribe((item:any)=> {
      if (item) item$.update( {quantity: item.quantity + 1} )
      else item$.set( {product: product, quantity: 1} )
      subscr.unsubscribe()
    })   
  }
  
  async removeFromCart(product: Product){
    let cartId = await this.getCartId();
    let item$ = this.getItem(cartId, product.key)
    let subscr = item$.valueChanges().subscribe((item:any)=> {
      if (item && item.quantity > 0) item$.update( {quantity: item.quantity - 1} )
      subscr.unsubscribe()
    })   
  }

  async getTotalQuantity(){
    (await this.getCart()).valueChanges().subscribe((cart:ShoppingCart)=> {
      this.totalQuantity = 0;
      for (let productKey in cart.items){          
        this.totalQuantity += cart.items[productKey].quantity
      }
    })
    return this.totalQuantity
  }
  

 }
