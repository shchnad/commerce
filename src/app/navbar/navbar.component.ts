import { Component, OnDestroy, OnInit} from '@angular/core';
import { switchMapTo } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {
  user;
  isAdmin;
  subUser;
  subUserDb;

  constructor(
    public auth: AuthService,
    public userService: UserService
  ) 
  {
    this.subUser = this.auth.user$
    .subscribe( user=> {
      if (user) {
        this.user = user;
        this.subUserDb = this.userService.getUserFromDb(user)
        .subscribe(userDb=> {if(userDb) this.isAdmin = userDb.isAdmin})
      }
    }) 
   }
    
  ngOnDestroy(){
    this.subUser.unsubscribe();
    this.subUserDb.unsubscribe();
  }

}
