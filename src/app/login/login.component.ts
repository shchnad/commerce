import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService) { }

  loginWithGoogle(){
    this.auth.loginWithGoogle();
  }

  loginWithFacebook(){
    this.auth.loginWithFacebook();
  }

}
