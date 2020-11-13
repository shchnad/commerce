import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  @Input('addToCartButton') addToCartButton = false;

  products: Product[] = [];
  categoryToFilter;
  filteredProducts: Product[] = [];
  shoppingCart:any;
  subscr: Subscription;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute ) 
  {
    this.productService.getProducts().subscribe(data=> {
      this.products = data;
      this.route.queryParamMap.subscribe(data=> {        
        this.categoryToFilter = data.get('category');  
        this.filteredProducts = (this.categoryToFilter) ? this.products.filter(p=> p.category === this.categoryToFilter) : this.products
      })
    })
  }

  async ngOnInit(){
    this.shoppingCartService.addToCartButton = true;
    this.productService.little = true;
    this.subscr =  (await this.shoppingCartService.getCart()).valueChanges()
    .subscribe(data=> this.shoppingCart = data);
  }
  
  ngOnDestroy(){
    this.shoppingCartService.addToCartButton = false;
    this.productService.little = false;
    this.subscr.unsubscribe
  }

}
