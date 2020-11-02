import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import { Category } from '../interfaces/category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firebaseDb: AngularFireDatabase) { }

  getCategories(){
    return this.firebaseDb.list('/categories').snapshotChanges()
    .pipe(map(actions => 
      actions.map(a => ({ key: a.payload.key, ...a.payload.val() as Category  }))))
  }
 
}
