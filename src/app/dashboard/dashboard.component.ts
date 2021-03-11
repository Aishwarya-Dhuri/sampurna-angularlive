import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService, NavbarService,UserService } from '../_services';
import { user } from '../_models';
import { Location } from '@angular/common';
import { role } from '../_models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	currentUser: user;
    userFromApi: user;
    aa: user;


  constructor(private userService: UserService, private authenticationService: AuthenticationService,public nav: NavbarService,
  private router: Router,	private route: ActivatedRoute,public _location: Location,	) {


   }

  ngOnInit() {
	  var token=localStorage.getItem('Token');
	  console.log("Token: " + token); 
	  if(token!=null)
	  {
		   this.nav.show();		
		  
   
	  }
	  else
	  {
		   this.nav.hide();
		  // this.router.navigate(['/']);
        return;
	  }
	
	 


	   this.nav.show();
	
  
 

}


}