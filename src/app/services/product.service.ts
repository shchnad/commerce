import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  priceQuantity = ['per kg', 'per lbs', 'per unit', 'per carton', 'per package', 'per bag', 'per bottle', "per can"];
  little = false;

  constructor(private firebaseDb: AngularFireDatabase) { }

  create(product){
    return this.firebaseDb.list('/products').push(product)
  }

  getProducts(){
    return this.firebaseDb.list('/products').snapshotChanges()
    .pipe(map(actions => 
      actions.map(a => ({ key: a.payload.key, ...a.payload.val() as Product  }))))
   }

  getProduct(key){
    return this.firebaseDb.object('/products/' + key).snapshotChanges()
    .pipe(map(a => ({ key: a.payload.key, ...a.payload.val() as Product  })))
  }

  update(key, product){
    this.firebaseDb.object('/products/' + key).update(product)
  }

  delete(key){
    this.firebaseDb.object('/products/' + key).remove()
  }

}
