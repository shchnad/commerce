import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { UserDb } from '../interfaces/user-db'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firebaseDb: AngularFireDatabase, 
    private auth: AuthService) 
    { }

  saveUserInDb(user: firebase.User) {
    this.firebaseDb.object('/users/' + user.uid)
    .update({
      name: user.displayName,
      email: user.email
    });
  }

  getUserFromDb(user):Observable<any> {
    return this.firebaseDb.object('/users/' + user.uid).valueChanges();
  }

}
