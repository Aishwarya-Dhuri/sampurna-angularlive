import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';
declare var jQuery:any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
	
	public pagesreq = {PageId:0, PageName:'', PerformBy:'', Operation:0 };
	public pagesdata;
	public AlertMessage;
	pagesForm:FormGroup;
	 submitted = false;
	loading = false;
	successmsg = false;
  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,private router: Router) 
  { 
  this.GetPagess();
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
	   // this.nav.show();
	    this.pagesForm = this.formBuilder.group({
            PageName: ['', Validators.required]
			            
        });		
  }
  
  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.pagesForm.invalid) {
            return;
        }
		
	  this.pagesreq.PageName=this.f.PageName.value;
	  this.pagesreq.PageId=0;
	  this.pagesreq.PerformBy=localStorage.getItem('UserId');
	  this.pagesreq.Operation=1;
	 
       this.AddUpdateDeletePages();
    }
	
	ResetFrom(){
		this.pagesForm.reset();
		this.successmsg = false;
		this.submitted =false;
	}
	
  get f() { return this.pagesForm.controls; }
  
  EditPagesData(PageName,PageId)
	{
		this.successmsg = false;
		this.pagesForm.controls['PageName'].setValue(PageName);
		 this.pagesreq.PageName=this.f.PageName.value;
	  this.pagesreq.PageId=PageId;
	  this.pagesreq.PerformBy=localStorage.getItem('UserId');
	  this.pagesreq.Operation=2;
	  
	}
	
	DeletePagesData(PageName,PageId)
	{
		this.pagesForm.controls['PageName'].setValue(PageName);
		 this.pagesreq.PageName=this.f.PageName.value;
	  this.pagesreq.PageId=PageId;
	  this.pagesreq.PerformBy=localStorage.getItem('UserId');
	  this.pagesreq.Operation=3;
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
						// this.alertService.success('City added successfuly', true);
						// this.router.navigate(['/city']);
						///this.alertService.success(''+ respData.m, true);

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
	
	AddUpdateDeletePages(){
		
		 this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.pagesForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		this.pagesreq.PageName=this.f.PageName.value;
        this.userService.pagesCRUD(this.pagesreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.pagesdata=respData.Data;
						// this.alertService.success(''+respData.m, true);
						  this.AlertMessage=respData.m;
						// this.alertService.success(''+respData.m, true);
						 jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
						  jQuery("#myModalalert").modal("show");
						 //this.pagesForm.controls['PageName'].setValue('');
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
