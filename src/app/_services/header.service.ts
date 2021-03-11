import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {   UserService,AuthenticationService} from '../_services';

@Injectable()
export class NavbarService {
  visible: boolean;
  Role= localStorage.getItem('Role');
  public UserName = localStorage.getItem('UserName');
  DashboardId=true;
  EnrolmentFormId=true;
  WorkOrderFormId=true;
  ReportsId=true;
  MastersId=true;
  LogoutId=true;
EnrolmentformsId=true;
ManufacturersAccess=true;
AggregatorsAccess=true;
TransportersAccess=true;
RecyclersAccess=true;
NoneAcces=true;
  // constructor(private userService: UserService,private router: Router,   private authenticationService: AuthenticationService,) {
    constructor() {

    this.visible = false; 
    // this.getRole();
    // this.getUserName();
  //  this.hideShowNavItems();

  }
  getRole()
  {
    this.Role=localStorage.getItem('Role');
    return this.Role;
  }
  
  getUserName()
  {
   this.UserName = localStorage.getItem('UserName');
   return this.UserName;
  }

  // hideShowNavItems(){
  //   if(this.Role == '18')
  //   {
  //     this.DashboardId=true;
  //     this.EnrolmentFormId=true;
  //     this.WorkOrderFormId=true;
  //     this.ReportsId=true;
  //     this.MastersId=true;
  //     this.LogoutId=true;
  //     this. EnrolmentformsId=true;
  //     this.ManufacturersAccess=true;
  //     this.AggregatorsAccess=true;
  //     this.TransportersAccess=true;
  //     this.RecyclersAccess=true;
  //     this.NoneAcces=true;

  //   }
    
  //   else if(this.Role == '19'){
  //     this.DashboardId=true;
  //     this.EnrolmentFormId=true;
  //     this.ManufacturersAccess=true;
  //     this.LogoutId=true;
  //     this.WorkOrderFormId=true;
  //     this.ReportsId=false;
  //     this.MastersId=false;

  //     this.EnrolmentformsId=true;
  //     this.NoneAcces=false;
  //     this.AggregatorsAccess=false;
  //     this.TransportersAccess=false;
  //     this.RecyclersAccess=false;
  //   }
  // }
  
  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

 
}