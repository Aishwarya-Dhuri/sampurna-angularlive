import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';
declare var jQuery:any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
	
	 public rolreq = {RoleId:0, RoleName:'', PerformBy:'', Operation:0 };
	public roledata;
public AlertMessage;
 public userreq = {UserId:0, UserName:'', UserPasswd:'', UserTypeId:0, UserEmail:'', UserTelNo:'', PerformBy:'', Operation:0 };
	public userdata;
	userForm:FormGroup;
	 submitted = false;
	loading = false;
	successmsg = false;
  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,private router: Router) { 
  this.GetUsers();
  this.GetRole();
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
		   this.router.navigate(['/']);
                   return;
	  }
	   //this.nav.show();
	    this.userForm = this.formBuilder.group({
            UserName: ['', Validators.required],
            UserPasswd: ['', Validators.required],
            UserTypeId: ['', Validators.required],
            UserEmail: ['', Validators.required],
            UserTelNo: ['', Validators.required],
			            
        });		
  }
  
  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.userForm.invalid) {
            return;
        }
		
	  this.userreq.UserName=this.f.UserName.value;
	  this.userreq.UserPasswd=this.f.UserPasswd.value;
	  this.userreq.UserTypeId=this.f.UserTypeId.value;
	  this.userreq.UserEmail=this.f.UserEmail.value;
	  this.userreq.UserTelNo=this.f.UserTelNo.value;
	  this.userreq.UserId=0;
	  this.userreq.PerformBy=localStorage.getItem('UserId');
	  this.userreq.Operation=1;
	 
      this.AddUpdateDeleteUser();
    }
	
	 GetRole(){
	  
		 this.loading = true;
        this.userService.RolesCRUD(this.rolreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.roledata=respData.Data;
						//this.alertService.success(''+ respData.m, true);

					}
					else{
						this.alertService.error(''+ respData.m, true);
						
					} 
                    this.loading = false;
					this.submitted = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
					
                });
	}
	
	GetUsers(){
	  
		 this.loading = true;
        this.userService.userCRUD(this.userreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.userdata=respData.Data;
						// this.alertService.success('City added successfuly', true);
						// this.router.navigate(['/city']);
						//this.alertService.success(''+ respData.m, true);

					}
					else{
						this.alertService.error(''+ respData.m, true);
						
					} 
                    this.loading = false;
					this.submitted = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
					
                });
	}
	  ResetFrom(){
		this.userForm.reset();
		this.successmsg = false;
		this.submitted=false;
	}
	
	get f() { return this.userForm.controls; }
	
	EditUserData(UserName,UserId,UserPasswd,UserTypeId,UserEmail,UserTelNo )
	{
		this.successmsg = false;
		this.userForm.controls['UserName'].setValue(UserName);
		 this.userreq.UserName=this.f.UserName.value;
		 this.userForm.controls['UserPasswd'].setValue(UserPasswd);
		 this.userreq.UserPasswd=this.f.UserPasswd.value;
		 this.userForm.controls['UserTypeId'].setValue(UserTypeId);
		 this.userreq.UserTypeId=this.f.UserTypeId.value;
		 this.userForm.controls['UserEmail'].setValue(UserEmail);
		 this.userreq.UserEmail=this.f.UserEmail.value;
		  this.userForm.controls['UserTelNo'].setValue(UserTelNo);
		 this.userreq.UserTelNo=this.f.UserTelNo.value;
		 
	  this.userreq.UserId=UserId;
	  this.userreq.PerformBy=localStorage.getItem('UserId');
	  this.userreq.Operation=2;
	  
	}
	
	DeleteUserData(UserName,UserId,UserPasswd,UserTypeId,UserEmail,UserTelNo )
	{
		this.successmsg = false;
		this.userForm.controls['UserName'].setValue(UserName);
		 this.userreq.UserName=this.f.UserName.value;
		 this.userForm.controls['UserPasswd'].setValue(UserPasswd);
		 this.userreq.UserPasswd=this.f.UserPasswd.value;
		 this.userForm.controls['UserTypeId'].setValue(UserTypeId);
		 this.userreq.UserTypeId=this.f.UserTypeId.value;
		 this.userForm.controls['UserEmail'].setValue(UserEmail);
		 this.userreq.UserEmail=this.f.UserEmail.value;
		  this.userForm.controls['UserTelNo'].setValue(UserTelNo);
		 this.userreq.UserTelNo=this.f.UserTelNo.value;
		 
	  this.userreq.UserId=UserId;
	  this.userreq.PerformBy=localStorage.getItem('UserId');
	  this.userreq.Operation=3;
	  
	}
	
	
	AddUpdateDeleteUser(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.userForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		this.userreq.UserName=this.f.UserName.value;
	  this.userreq.UserPasswd=this.f.UserPasswd.value;
	  this.userreq.UserTypeId=this.f.UserTypeId.value;
	  this.userreq.UserEmail=this.f.UserEmail.value;
	  this.userreq.UserTelNo=this.f.UserTelNo.value;
        this.userService.userCRUD(this.userreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.userdata=respData.Data;
						 //this.alertService.success(''+respData.m, true);
						 //this.router.navigate(['/city']);
						 //this.userForm.controls['UserName'].setValue('');
						  this.AlertMessage=respData.m;
						// this.alertService.success(''+respData.m, true);
						 jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
						  jQuery("#myModalalert").modal("show");
					}
					else{
						this.alertService.error(''+ respData.m, true);
						 this.AlertMessage=respData.m;
						// this.alertService.success(''+respData.m, true);
						 jQuery("#myModal").modal("show");
						 jQuery("#myModaledit").modal("show");
						  jQuery("#myModalalert").modal("show");
						
					} 
                    this.loading = false;
					this.successmsg = true;
					this.submitted=false;
					
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
					
                });
	}
  
  
}
