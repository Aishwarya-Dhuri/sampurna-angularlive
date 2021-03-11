import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';
declare var jQuery:any;
@Component({
  selector: 'app-aggregator-type',
  templateUrl: './aggregator-type.component.html',
  styleUrls: ['./aggregator-type.component.css']
})
export class AggregatorTypeComponent implements OnInit {

	
	public aggregatortypereq = {AggregatorTypeId:0, AggregatorType:'', Comments:'', PerformBy:'', Operation:0 };
	public Aggregatorypedata;
	public AlertMessage;
	
	AggregatortypeForm:FormGroup;
	loading = false;
	submitted = false;
	successmsg = false;
  constructor(private formBuilder: FormBuilder, 
			  public nav: NavbarService,
			  private userService: UserService,
			  private alertService : AlertService,
			  private router: Router) 
  {
	  this.GetAgreegatortype();
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
	    this.AggregatortypeForm = this.formBuilder.group({
            AggregatorType: ['', Validators.required],
            Comments: ['']
			            
        });	
  }
  
  ResetFrom(){
		this.AggregatortypeForm.reset();
		this.successmsg = false;
		this.submitted =false;
	}
	
 

  
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.AggregatortypeForm.invalid) {
            return;
        }
		
	  this.aggregatortypereq.AggregatorType=this.f.AggregatorType.value;
	  this.aggregatortypereq.Comments=this.f.Comments.value;
	  this.aggregatortypereq.AggregatorTypeId=0;
	  this.aggregatortypereq.PerformBy=localStorage.getItem('UserId');
	  this.aggregatortypereq.Operation=1;
	
	 
      this.AddUpdateDeleteAGtype();
    }
	
	
	EditAgtypeData(AggregatorType,Comments,AggregatorTypeId)
	{
		this.successmsg = false;
		this.AggregatortypeForm.controls['AggregatorType'].setValue(AggregatorType);
		this.AggregatortypeForm.controls['Comments'].setValue(Comments);
		 this.aggregatortypereq.AggregatorType=this.f.AggregatorType.value;
		 this.aggregatortypereq.Comments=this.f.Comments.value;
		 
	  this.aggregatortypereq.AggregatorTypeId=AggregatorTypeId;
	  this.aggregatortypereq.PerformBy=localStorage.getItem('UserId');
	  this.aggregatortypereq.Operation=2;
	}
	
	DeleteAGtypeData(AggregatorType,Comments,AggregatorTypeId)
	{
		this.AggregatortypeForm.controls['AggregatorType'].setValue(AggregatorType);
		this.AggregatortypeForm.controls['Comments'].setValue(Comments);
		 this.aggregatortypereq.AggregatorType=this.f.AggregatorType.value;
		 this.aggregatortypereq.Comments=this.f.Comments.value;
		 
	  this.aggregatortypereq.AggregatorTypeId=AggregatorTypeId;
	  this.aggregatortypereq.PerformBy=localStorage.getItem('UserId');
	  this.aggregatortypereq.Operation=3;
	}
  
   GetAgreegatortype(){
	  
		 this.loading = true;
        this.userService.aggregatortypeCRUD(this.aggregatortypereq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.Aggregatorypedata=respData.Data;
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
	
	get f() { return this.AggregatortypeForm.controls; }
	
	AddUpdateDeleteAGtype(){
		
		 this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.AggregatortypeForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		this.aggregatortypereq.AggregatorType=this.f.AggregatorType.value;
		this.aggregatortypereq.Comments=this.f.Comments.value;
        this.userService.aggregatortypeCRUD(this.aggregatortypereq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.Aggregatorypedata=respData.Data;
						// this.alertService.success(''+respData.m, true);
						
						 //this.AggregatortypeForm.controls['AggregatorType'].setValue('');
						 //this.AggregatortypeForm.controls['Comments'].setValue('');
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
