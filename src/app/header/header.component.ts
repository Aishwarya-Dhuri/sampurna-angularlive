import { Component, OnInit } from '@angular/core';
import {  NavbarService ,UserService,AuthenticationService} from '../_services';
import { Router } from '@angular/router';
import { user, role } from '../_models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //UserId=localStorage.getItem('UserId');
  Role= localStorage.getItem('Role');
  public UserName = localStorage.getItem('UserName');
  currentUser: user;

  constructor(public nav: NavbarService,  private userService: UserService,private router: Router,   private authenticationService: AuthenticationService,) {


    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

   }
  
  ngOnInit() {
   
        
  }
  get isAdmin() {
    // return this.currentUser && this.currentUser.UserName == 'admin1'; 
    return this.currentUser && this.currentUser.RoleId == '18'; 

  }
 
  get isManufacturer() {
    // return this.currentUser && this.currentUser.UserName == 'admin1'; 
    return this.currentUser && this.currentUser.RoleId == '19'; 

  }


  Logout()
  {
   this.nav.hide();
  this.authenticationService.logout();
    localStorage.clear();
    this.router.navigate(['/login']);


  }

}
