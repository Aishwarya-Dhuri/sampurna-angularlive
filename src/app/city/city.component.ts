import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';

declare var jQuery:any;

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
	
	public cityreq = {CityId:0, CityName:'', CityCode:'', StateId:0,PerformBy:'', Operation:0 };
	public citydata;
	
	//state master
	public statemasterreq = {Stateid:0, StateName:'', StateCode:'', PerformBy:'', Operation:0 };
	public statemasterdata;
	public AlertMessage;
//	 public jQuery:any; 
	cityForm:FormGroup;
	 submitted = false;
	loading = false;
	successmsg = false;
	
  constructor(private formBuilder: FormBuilder, 
  public nav: NavbarService, 
  private userService: UserService,
  private alertService : AlertService,
  private router: Router) 
  { 
  this.GetCities();
  this.GetState();
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
	 //  this.nav.show();
	    this.cityForm = this.formBuilder.group({
            CityName: ['', Validators.required],
            StateId: [0, Validators.required]
			            
        });		
  }
  
   onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.cityForm.invalid) {
            return;
        }
		
	  this.cityreq.CityName=this.f.CityName.value;
	  this.cityreq.StateId=this.f.StateId.value;
	  this.cityreq.CityId=0;
	  this.cityreq.PerformBy=localStorage.getItem('UserId');
	  this.cityreq.Operation=1;
	 
      this.AddUpdateDeleteCity();
    }
	
	  ResetFrom(){
		this.cityForm.reset();
		this.successmsg = false;
		this.submitted =false;
	}
	
  
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
	
	//State Data Display
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
	
	get f() { return this.cityForm.controls; }
	
	EditCityData(StateId,CityName,CityId)
	{
		this.successmsg = false;
		this.cityForm.controls['StateId'].setValue(StateId);
		this.cityForm.controls['CityName'].setValue(CityName);
		 this.cityreq.StateId=this.f.StateId.value;
		 this.cityreq.CityName=this.f.CityName.value;
		
		 
	  this.cityreq.CityId=CityId;
	  this.cityreq.PerformBy=localStorage.getItem('UserId');
	  this.cityreq.Operation=2;
	}
	DeleteCityData(StateId,CityName,CityId)
	{
			this.cityForm.controls['StateId'].setValue(StateId);
		this.cityForm.controls['CityName'].setValue(CityName);
		 this.cityreq.StateId=this.f.StateId.value;
		 this.cityreq.CityName=this.f.CityName.value;
		 
	  this.cityreq.CityId=CityId;
	  
	  this.cityreq.PerformBy=localStorage.getItem('UserId');
	  this.cityreq.Operation=3;
	}
	
	AddUpdateDeleteCity(){
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.cityForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		 this.cityreq.StateId=this.f.StateId.value;
		this.cityreq.CityName=this.f.CityName.value;
        this.userService.CityCRUD(this.cityreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.citydata=respData.Data;
						 //this.alertService.success(''+respData.m, true);
						 this.AlertMessage=respData.m;
						 jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
						  jQuery("#myModalalert").modal("show");
					}
					else
					{
						this.alertService.error(''+ respData.m, true);
						// jQuery("#myModal").modal("show");
						// jQuery("#myModaledit").modal("show");
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
