import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private router: Router, 
    private auth: AuthService, 
    private userService: UserService) 
  { 
    this.auth.user$.subscribe( user=> {
      if (!user) return
        this.userService.saveUserInDb(user);
        let returnUrl = localStorage.getItem('returnUrl');
        if (!returnUrl) return
          localStorage.removeItem('returnUrl');
          this.router.navigateByUrl(returnUrl)
    })     
  }

ngOnInit(){
}

}
