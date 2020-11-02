import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router, 
    private auth: AuthService) { }

  canActivate(route, state: RouterStateSnapshot){
   return this.auth.user$.pipe(map( user=> {
    if (user) return true;
    else {
      alert('You have to login!');
      this.router.navigate(['/login'], {queryParams: {redirect: state.url}});
      return false;
    }
    }))
  }

}

