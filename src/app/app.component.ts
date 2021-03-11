import { Component } from '@angular/core';
import {  NavbarService ,UserService,AuthenticationService} from './_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sampurna';
  Role= localStorage.getItem('Role');
  constructor(public nav: NavbarService,  private userService: UserService,private router: Router,   private authenticationService: AuthenticationService,) {
    this.getRole();
 
    }
    getRole()
  {
    this.Role=localStorage.getItem('Role');
    return this.Role;
  }
}
