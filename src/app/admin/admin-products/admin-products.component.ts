import { Component, OnDestroy} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AngularFireDatabase} from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy  {
  products :any[];
  product;
  mySubscription;
  filteredProducts: any[];

  constructor(
    private productService: ProductService,
    private firebaseDb: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.mySubscription = this.productService.getProducts().subscribe(data=> this.filteredProducts = this.products = data)
    }

  navigateToProduct(product){
    this.router.navigate(['/admin/products/' + product.key])
  }

  filt(query: string){
    this.filteredProducts = (query) ? this.products.filter(p=> p.title.toLowerCase().includes(query.toLowerCase())) : this.products
  }

  
  ngOnInit(){
    document.getElementById("search").focus();
   }

  ngOnDestroy(){
    this.mySubscription.unsubscribe()
  }

}
