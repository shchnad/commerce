import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$:Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth, 
    private actRoute: ActivatedRoute, 
    private router: Router)
  {
    this.user$ = this.afAuth.authState;
  }

   
  loginWithGoogle(){
    let returnUrl = this.actRoute.snapshot.queryParamMap.get('redirect');
     localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }

  loginWithFacebook(){
    this.afAuth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
  }

  logout(){
    this.router.navigate(['/'])
    this.afAuth.signOut();
  }

}
