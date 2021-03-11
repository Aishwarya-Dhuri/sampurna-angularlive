import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';
declare var jQuery:any; 

@Component({
  selector: 'app-role-access',
  templateUrl: './role-access.component.html',
  styleUrls: ['./role-access.component.css']
})
export class RoleAccessComponent implements OnInit {

public roleaccessreq = {AccessId:0, PageId:0, RoleId:0, ViewPage:false, EditPage:false, PerformBy:'', Operation:0 };
public RoleAccessData;

public rolreq = {RoleId:0, RoleName:'', PerformBy:'', Operation:0 };
public roledata;

public pagesreq = {PageId:0, PageName:'', PerformBy:'', Operation:0 };
public pagesdata;
	
	
	RoleAccessForm:FormGroup;
	 submitted = false;
	loading = false;
	successmsg = false;
	AlertMessage: any;
	
  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,private router: Router) 
  {
	this.GetRole();
	this. GetPagess();
	this. GetRoleAccessData();
	
  }

  ngOnInit() {
	     // this.nav.show();
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
		  this.RoleAccessForm = this.formBuilder.group({
            PageId: ['', Validators.required],
            RoleId: ['', Validators.required],
            ViewPage: [false],
            EditPage: [false],
			            
        });
  }
  
  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.RoleAccessForm.invalid) {
            return;
        }
		
	 
	  this.roleaccessreq.RoleId=this.f.RoleId.value;
	   this.roleaccessreq.PageId=this.f.PageId.value;
	   this.roleaccessreq.EditPage=this.f.EditPage.value;

	   if(this.roleaccessreq.ViewPage == null){
		this.roleaccessreq.ViewPage = false;
			}
			else{
				this.roleaccessreq.ViewPage=this.f.ViewPage.value;
			}
			if(this.roleaccessreq.EditPage == null){
				this.roleaccessreq.EditPage = false;
					}
					else{
						this.roleaccessreq.EditPage=this.f.EditPage.value;
					}
	  this.roleaccessreq.AccessId=0;
	  this.roleaccessreq.PerformBy=localStorage.getItem('UserId');
	  this.roleaccessreq.Operation=1;
	 
      this.AddUpdateDeleteRoleAccess();
    }
	
	ResetFrom(){
		this.RoleAccessForm.reset();
		this.successmsg = false;
		this.submitted = false;
	}
	
	
	EditRoleAccessData(RoleId,PageId,ViewPage,EditPage,AccessId)
	{
		
		this.successmsg = false;
		this.RoleAccessForm.controls['RoleId'].setValue(RoleId);
		 this.roleaccessreq.RoleId=this.f.RoleId.value;
		 
		 this.RoleAccessForm.controls['PageId'].setValue(PageId);
		 this.roleaccessreq.PageId=this.f.PageId.value;
		 
		 this.RoleAccessForm.controls['ViewPage'].setValue(ViewPage);
		 this.roleaccessreq.ViewPage=this.f.ViewPage.value;
		 
		 this.RoleAccessForm.controls['EditPage'].setValue(EditPage);
		 this.roleaccessreq.EditPage=this.f.EditPage.value;
		 
	  this.roleaccessreq.AccessId=AccessId;
	  this.roleaccessreq.PerformBy=localStorage.getItem('UserId');
	  this.roleaccessreq.Operation=2;
	}
	
	
	DeleteRoleAccessData(RoleId,PageId,ViewPage,EditPage,AccessId)
	{
		this.RoleAccessForm.controls['RoleId'].setValue(RoleId);
		 this.roleaccessreq.RoleId=this.f.RoleId.value;
		 
		 this.RoleAccessForm.controls['PageId'].setValue(PageId);
		 this.roleaccessreq.PageId=this.f.PageId.value;
		 
		 this.RoleAccessForm.controls['ViewPage'].setValue(ViewPage);
		 this.roleaccessreq.ViewPage=this.f.ViewPage.value;
		 
		 this.RoleAccessForm.controls['EditPage'].setValue(EditPage);
		 this.roleaccessreq.EditPage=this.f.EditPage.value;
		 
	  this.roleaccessreq.AccessId=AccessId;
	  this.roleaccessreq.PerformBy=localStorage.getItem('UserId');
	  this.roleaccessreq.Operation=3;
	}
	
	

   GetRoleAccessData(){
	  
		 //this.loading = true;
        this.userService.roleaccessCRUD(this.roleaccessreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.RoleAccessData=respData.Data;
//for(var i=0; i<this.RoleAccessData.length;i)
						//this.alertService.success(''+ respData.m, true);

					}
					else{
						this.alertService.error(''+ respData.m, true);
						
					} 
                  //  this.loading = false;
					this.submitted = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
					
                });
	}
	
  
   GetRole(){
	  
		 //this.loading = true;
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
                  //  this.loading = false;
					this.submitted = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
					
                });
	}
	
	
	 GetPagess(){
	  
		 this.loading = true;
        this.userService.pagesCRUD(this.pagesreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.pagesdata=respData.Data;
						
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
	
	get f() { return this.RoleAccessForm.controls; }
	
	AddUpdateDeleteRoleAccess(){
		
		 this.loading = true;
		 this.submitted = true;
		  if (this.RoleAccessForm.invalid) {
			this.loading = false;
            return;
			
        }
			this.roleaccessreq.RoleId=this.f.RoleId.value;
		this.roleaccessreq.PageId=this.f.PageId.value;
		this.roleaccessreq.ViewPage=this.f.ViewPage.value;
		this.roleaccessreq.EditPage=this.f.EditPage.value;

		if(this.roleaccessreq.ViewPage == null){
			this.roleaccessreq.ViewPage = false;
				}
				else{
					this.roleaccessreq.ViewPage=this.f.ViewPage.value;
				}

if(this.roleaccessreq.EditPage == null){
			this.roleaccessreq.EditPage = false;
				}
				else{
					this.roleaccessreq.EditPage=this.f.EditPage.value;
				}


        this.userService.roleaccessCRUD(this.roleaccessreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.RoleAccessData=respData.Data;
						// this.alertService.success(''+respData.m, true);
						this.AlertMessage=respData.m;
						jQuery("#myModaledit").modal("hide");
						jQuery("#myModal").modal("hide");
						jQuery("#myModalalert").modal("show");

						this.ResetFrom();
						//  this.RoleAccessForm.controls['RoleId'].setValue('');
						//   this.RoleAccessForm.controls['PageId'].setValue('');
						//   this.RoleAccessForm.controls['ViewPage'].setValue('');
						//   this.RoleAccessForm.controls['EditPage'].setValue('');


					}
					else{
						this.alertService.error(''+ respData.m, true);
						
					} 
                    this.loading = false;
					this.submitted = false;
					this.successmsg = true;
					
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
					
                });
	}
}
