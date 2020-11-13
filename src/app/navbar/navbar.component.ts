import { Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../interfaces/shiopping-cart';

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
  totalQuantity;

  constructor(
    public auth: AuthService,
    public userService: UserService,
    private shoppingCartService: ShoppingCartService
  ) 
  { 
    this.subUser = this.auth.user$.subscribe( user=> {
      if (user) {
        this.user = user;
        this.subUserDb = this.userService.getUserFromDb(user).subscribe(userDb=> {
          if(userDb) this.isAdmin = userDb.isAdmin})
      }
    });
  }

  ngOnDestroy(){
    this.subUser.unsubscribe();
    this.subUserDb.unsubscribe();
  }

  async ngOnInit(){
    (await this.shoppingCartService.getCart()).valueChanges().subscribe((cart:ShoppingCart)=> {
      this.totalQuantity = 0;
      for (let productKey in cart.items){          
        this.totalQuantity += cart.items[productKey].quantity
      }
    })
  }

}
