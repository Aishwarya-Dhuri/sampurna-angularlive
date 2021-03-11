import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';
declare var jQuery:any;
@Component({
  selector: 'app-billing-status',
  templateUrl: './billing-status.component.html',
  styleUrls: ['./billing-status.component.css']
})
export class BillingStatusComponent implements OnInit {
	public billingstatusreq = {BillingStatusId:0, BillingStatusDesc:'', Comments:'', PerformBy:'', Operation:0 };
	public billingstatusdata;
	billingstatusForm:FormGroup;
	 submitted = false;
	loading = false;
	successmsg = false;
	public AlertMessage;
  constructor(private formBuilder: FormBuilder,
  public nav: NavbarService,
  private userService: UserService,
  private alertService : AlertService,
  private router: Router) { }

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
	    this.billingstatusForm = this.formBuilder.group({
            BillingStatusDesc: ['', Validators.required],
			Comments: ['']
			            
        });	
		this.GetBillingstatus();
  }
  
  ResetFrom(){
		this.billingstatusForm.reset();
		this.successmsg = false;
		this.submitted =false;
	}
	
   GetBillingstatus(){	  
		 this.loading = true;
        this.userService.BillingStatusCRUD(this.billingstatusreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.billingstatusdata=respData.Data;
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
	
	get f() { return this.billingstatusForm.controls; }
	
	onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.billingstatusForm.invalid) {
            return;
        }
		
	  this.billingstatusreq.BillingStatusDesc=this.f.BillingStatusDesc.value;
	   this.billingstatusreq.Comments=this.f.Comments.value;
	  this.billingstatusreq.BillingStatusId=0;
	  this.billingstatusreq.PerformBy=localStorage.getItem('UserId');
	  this.billingstatusreq.Operation=1;
	 
      this.AddUpdateDeleteBillingstatus();
    }
	
	EditBillingstatusData(BillingStatusDesc,BillingStatusId,Comments)
	{
		this.successmsg = false;
		this.billingstatusForm.controls['BillingStatusDesc'].setValue(BillingStatusDesc);
		 this.billingstatusreq.BillingStatusDesc=this.f.BillingStatusDesc.value;
		 this.billingstatusForm.controls['Comments'].setValue(Comments);
		 this.billingstatusreq.Comments=this.f.Comments.value;
	  this.billingstatusreq.BillingStatusId=BillingStatusId;
	  this.billingstatusreq.PerformBy=localStorage.getItem('UserId');
	  this.billingstatusreq.Operation=2;
	}
	DeleteBillingstatusData(BillingStatusDesc,BillingStatusId)
	{
		this.billingstatusForm.controls['BillingStatusDesc'].setValue(BillingStatusDesc);
		 this.billingstatusreq.BillingStatusDesc=this.f.BillingStatusDesc.value;
	  this.billingstatusreq.BillingStatusId=BillingStatusId;
	  this.billingstatusreq.PerformBy=localStorage.getItem('UserId');
	  this.billingstatusreq.Operation=3;
	}
	
	
	AddUpdateDeleteBillingstatus(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.billingstatusForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		this.billingstatusreq.BillingStatusDesc=this.f.BillingStatusDesc.value;
		this.billingstatusreq.Comments=this.f.Comments.value;
        this.userService.BillingStatusCRUD(this.billingstatusreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.billingstatusdata=respData.Data;
					//	 this.alertService.success(''+respData.m, true);
						 //this.router.navigate(['/city']);
						 //this.billingstatusForm.controls['BillingStatusDesc'].setValue('');
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
