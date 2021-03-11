import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';
declare var jQuery:any;
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

	
  public rolreq = {RoleId:0, RoleName:'', PerformBy:'', Operation:0 };
	public roledata;
	public AlertMessage;
	RoleForm:FormGroup;
	loading = false;
	submitted = false;
	successmsg = false;
 constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,private router: Router)
  { 
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
	    this.RoleForm = this.formBuilder.group({
            RoleName: ['', Validators.required]
			            
        });	
  }
  
  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.RoleForm.invalid) {
            return;
        }
		
	  this.rolreq.RoleName=this.f.RoleName.value;
	  this.rolreq.RoleId=0;
	  this.rolreq.PerformBy=localStorage.getItem('UserId');
	  this.rolreq.Operation=1;
	 
      this.AddUpdateDeleteRole();
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
	
	get f() { return this.RoleForm.controls; }
	
	ResetFrom(){
		this.RoleForm.reset();
		this.successmsg = false;
		this.submitted =false;
	}
	
	EditroleData(RoleName,RoleId)
	{
		this.successmsg = false;
		this.RoleForm.controls['RoleName'].setValue(RoleName);
		 this.rolreq.RoleName=this.f.RoleName.value;
		 
	  this.rolreq.RoleId=RoleId;
	  this.rolreq.PerformBy=localStorage.getItem('UserId');
	  this.rolreq.Operation=2;
	}
	
	
	DeleteroleData(RoleName,RoleId)
	{
		this.RoleForm.controls['RoleName'].setValue(RoleName);
		 this.rolreq.RoleName=this.f.RoleName.value;
		 
	  this.rolreq.RoleId=RoleId;
	  this.rolreq.PerformBy=localStorage.getItem('UserId');
	  this.rolreq.Operation=3;
	}
	
	
	AddUpdateDeleteRole(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		  if (this.RoleForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		this.rolreq.RoleName=this.f.RoleName.value;
        this.userService.RolesCRUD(this.rolreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.roledata=respData.Data;
						// this.alertService.success(''+respData.m, true);
						 //this.router.navigate(['/city']);
						// this.RoleForm.controls['RoleName'].setValue('');
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
