import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';
declare var jQuery:any;
@Component({
  selector: 'app-subrubs',
  templateUrl: './subrubs.component.html',
  styleUrls: ['./subrubs.component.css']
})
export class SubrubsComponent implements OnInit {
	
	public suburbreq = {SuburbId:0, SuburbName:'', SuburbCode:'', CityId:0, PerformBy:'', Operation:0, StateId:0 };
	public cityreq = {CityId:0, CityName:'', CityCode:'', PerformBy:'', Operation:0 };
	public statemasterreq = {Stateid:0, StateName:'', StateCode:'', PerformBy:'', Operation:0 };
	public statemasterdata;
	
	suburbForm:FormGroup;
	public suburbdata;
	public citydata;
	public AlertMessage;
	loading = false;
	submitted = false;
	successmsg = false;
  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,private router: Router) { 
  this.Getsuburb();
  this.GetCities();
  this.GetState();
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
	    this.suburbForm = this.formBuilder.group({
            SuburbName: ['', Validators.required],
			CityId: ['', Validators.required],
			StateId:['',Validators.required]
			            
        });	
  }


	ResetFrom(){
		this.suburbForm.reset();
		this.successmsg = false;
		this.submitted =false;
	}
	
   onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.suburbForm.invalid) {
            return;
        }
		
	  this.suburbreq.SuburbName=this.f.SuburbName.value;
	  this.suburbreq.SuburbId=0;
	   this.suburbreq.StateId=this.f.CityId.value;
	  this.suburbreq.CityId=this.f.CityId.value;
	  this.suburbreq.PerformBy=localStorage.getItem('UserId');
	  this.suburbreq.Operation=1;
	  
	 
      this.AddUpdateDeleteSuburb();
    }
	
	 get f() { return this.suburbForm.controls; }
	
	GetCities(){
	   
		 this.loading = true;
        this.userService.CityCRUD(this.cityreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.citydata=respData.Data;
						// this.alertService.success('City added successfuly', true);
						// this.router.navigate(['/city']);
					}
					else{
						this.alertService.success(''+ respData.m, true);
						
					} 
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
	}
	
	 Getsuburb(){
	  
		 this.loading = true;
        this.userService.SuburbCRUD(this.suburbreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.suburbdata=respData.Data;
						// this.alertService.success('City added successfuly', true);
						// this.router.navigate(['/city']);
					}
					else{
						this.alertService.success(''+ respData.m, true);
						
					} 
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
	}
	
	EditSuburbData(SuburbName, SuburbId, CityId,StateId)
	{
		this.successmsg = false;
		
	  this.suburbForm.controls['SuburbName'].setValue(SuburbName);
	  this.suburbreq.SuburbName=this.f.SuburbName.value;
	  this.suburbreq.SuburbId=SuburbId;	
	  this.suburbForm.controls['StateId'].setValue(StateId);
	  this.suburbForm.controls['CityId'].setValue(CityId);
	  this.suburbreq.CityId=this.f.CityId.value;
	  this.suburbreq.CityId=CityId;
	  
	  this.suburbreq.PerformBy=localStorage.getItem('UserId');
	  this.suburbreq.Operation=2;
	}
	
	DeleteSuburbData(SuburbName,SuburbId,CityId,StateId)
	{
		 this.suburbForm.controls['SuburbName'].setValue(SuburbName);
	  this.suburbreq.SuburbName=this.f.SuburbName.value;
	  this.suburbreq.SuburbId=SuburbId;	
	  this.suburbForm.controls['StateId'].setValue(StateId);
	  this.suburbForm.controls['CityId'].setValue(CityId);
	  this.suburbreq.CityId=this.f.CityId.value;
	  this.suburbreq.CityId=CityId;
	  
	  this.suburbreq.PerformBy=localStorage.getItem('UserId');
	  this.suburbreq.Operation=3;
	}
	
	AddUpdateDeleteSuburb(){
		
		 this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		 if (this.suburbForm.invalid) {
            return;
        }
		
		this.suburbreq.SuburbName=this.f.SuburbName.value;
		this.suburbreq.CityId=this.f.CityId.value;
		this.suburbreq.StateId=this.f.StateId.value;
        this.userService.SuburbCRUD(this.suburbreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.suburbdata=respData.Data;
						 this.AlertMessage=respData.m;
						  jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
						  jQuery("#myModalalert").modal("show");
						//this.alertService.success(''+respData.m, true);
						//this.suburbForm.controls['SuburbName'].setValue('');
						
					}
					else{
						this.alertService.success(''+ respData.m, true);
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
	
	GetState(){
	  
		 this.loading = true;
        this.userService.statemasterCRUD(this.statemasterreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.statemasterdata=respData.Data;
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
	
	GetStateMappingState(value)
	{
			
			//reset function
			// if(this.g.FocusCityIds.value!=null)
			// {
				// this.AddMFwastetypeForm.controls['FocusCityIds'].setValue(null);
				// this.mfwastetypereq.FocusCityIds='';
			// }
		  
			 //this.loading = true;
	        this.userService.GetCitiesByStateIdCRUD({StateId:value})
	           .pipe()
	            .subscribe(
	                (data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							this.citydata=respData.Data;
							
						}
						else{
							this.alertService.error(''+ respData.m, true);
							
						} 
	                    this.loading = false;
						
	                },
	                error => {
	                    this.alertService.error(error);
	                    this.loading = false;
						
	                });
		}

}
