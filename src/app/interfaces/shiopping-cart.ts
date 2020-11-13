import { ShoppingCartItem } from '../interfaces/shopping-cart-item';

export interface ShoppingCart {
    items: ShoppingCartItem[],
    dateCreated: Date,
    totalQuantity: number
}