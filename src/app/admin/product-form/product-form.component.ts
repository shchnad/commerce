import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  categories;
  mySubscription1;
  mySubscription2;
  key;

  product:any = {}

  @Input('product') pr: Product;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    public productService: ProductService
    ) {
    this.mySubscription1 = this.categoryService.getCategories()
    .subscribe(data=> {this.categories = data})

    this.key = this.route.snapshot.paramMap.get('id');
    if (this.key) this.mySubscription2 = this.productService.getProduct(this.key)
    .subscribe((data):Product=> this.product = data)
    }

   save(product){
     if (!product.package) product.package = "not indicated";
     if (!product.details) product.details = "not indicated";
     if (!product.price) product.price = 0;
     if (!product.priceQuantity) product.priceQuantity = 'per unit';
     if (this.key) this.productService.update(this.key, product)
     else this.productService.create(product);
     this.router.navigate(['/admin/products'])
   }

 
   delete(){
     if (confirm('Are you sure to delete this product?')) {
      this.productService.delete(this.key);
      this.router.navigate(['/admin/products'])
     }
   }

   ngOnInit(){
    document.getElementById("title").focus();
   }

  ngOnDestroy(){
    this.mySubscription1.unsubscribe();
    if (this.mySubscription2) this.mySubscription2.unsubscribe();
   }

}
