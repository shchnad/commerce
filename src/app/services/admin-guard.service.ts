import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
userDb: any;

  constructor(
    private auth: AuthService, 
    private userService: UserService) { }

canActivate() {
  return this.auth.user$
  .pipe(switchMap( user=> {
    if(user) return this.userService.getUserFromDb(user).pipe(map( userDb=> userDb.isAdmin))
  }))
}

}
