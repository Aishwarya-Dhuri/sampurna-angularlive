import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';

declare var jQuery:any;
@Component({
  selector: 'app-vehicale-type',
  templateUrl: './vehicale-type.component.html',
  styleUrls: ['./vehicale-type.component.css']
})
export class VehicaleTypeComponent implements OnInit {
	
	public vehicletypereq = {VehicleTypeId:0, VehicleType:'', LoadCapacity:'', BodyType:'', VechicleDims:'', PerformBy:'', Operation:0 };
	public vehicletypedata;
	vehicletypeForm:FormGroup;
	 submitted = false;
	loading = false;
	successmsg = false;
	public AlertMessage;
  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,private router: Router) { 
  
  this.GetVehicletype();
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
	    this.vehicletypeForm = this.formBuilder.group({
            VehicleType: ['', Validators.required],
			LoadCapacity: ['', Validators.required],
			BodyType: ['', Validators.required],
			VechicleDims: ['', Validators.required]
			            
        });	
		 
  }
  
  ResetFrom(){
		this.vehicletypeForm.reset();
		this.successmsg = false;
		this.submitted =false;
	}
  
     GetVehicletype(){	  
		 this.loading = true;
        this.userService.VehicleTypesCRUD(this.vehicletypereq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.vehicletypedata=respData.Data;
						
					//	this.alertService.success(''+ respData.m, true);
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
	
	get f() { return this.vehicletypeForm.controls; }
	
	onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.vehicletypeForm.invalid) {
            return;
        }
		
	  this.vehicletypereq.VehicleType=this.f.VehicleType.value;
	   this.vehicletypereq.LoadCapacity=this.f.LoadCapacity.value;
	   this.vehicletypereq.BodyType=this.f.BodyType.value;
	   this.vehicletypereq.VechicleDims=this.f.VechicleDims.value;
	   
	  this.vehicletypereq.VehicleTypeId=0;
	  this.vehicletypereq.PerformBy=localStorage.getItem('UserId');
	  this.vehicletypereq.Operation=1;
	 
      this.AddUpdateDeleteVehicletype();
    }
	
	EditVehicletypeData(VehicleType,LoadCapacity,BodyType,VechicleDims,VehicleTypeId)
	{
			this.successmsg = false;
		this.vehicletypeForm.controls['VehicleType'].setValue(VehicleType);
		 this.vehicletypereq.VehicleType=this.f.VehicleType.value;
		 
		 this.vehicletypeForm.controls['LoadCapacity'].setValue(LoadCapacity);
		 this.vehicletypereq.LoadCapacity=this.f.LoadCapacity.value;
		 
		 this.vehicletypeForm.controls['BodyType'].setValue(BodyType);
		 this.vehicletypereq.BodyType=this.f.BodyType.value;
		 
		  this.vehicletypeForm.controls['VechicleDims'].setValue(VechicleDims);
		 this.vehicletypereq.VechicleDims=this.f.VechicleDims.value;
		 
	  this.vehicletypereq.VehicleTypeId=VehicleTypeId;
	  this.vehicletypereq.PerformBy=localStorage.getItem('UserId');
	  this.vehicletypereq.Operation=2;
	}
	DeleteVehicletypeData(VehicleType,LoadCapacity,BodyType,VechicleDims,VehicleTypeId)
	{
		this.vehicletypeForm.controls['VehicleType'].setValue(VehicleType);
		 this.vehicletypereq.VehicleType=this.f.VehicleType.value;
		 this.vehicletypeForm.controls['LoadCapacity'].setValue(LoadCapacity);
		 this.vehicletypereq.LoadCapacity=this.f.LoadCapacity.value;
		 this.vehicletypeForm.controls['BodyType'].setValue(BodyType);
		 this.vehicletypereq.BodyType=this.f.BodyType.value;
		  this.vehicletypeForm.controls['VechicleDims'].setValue(VechicleDims);
		 this.vehicletypereq.VechicleDims=this.f.VechicleDims.value;
	  this.vehicletypereq.VehicleTypeId=VehicleTypeId;
	  this.vehicletypereq.PerformBy=localStorage.getItem('UserId');
	  this.vehicletypereq.Operation=3;
	}
	
	AddUpdateDeleteVehicletype(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		  if (this.vehicletypeForm.invalid) {
			this.loading = false;
            return;			
        }
		
		this.vehicletypereq.VehicleType=this.f.VehicleType.value;
		this.vehicletypereq.LoadCapacity=this.f.LoadCapacity.value;
		this.vehicletypereq.BodyType=this.f.BodyType.value;
		this.vehicletypereq.VechicleDims=this.f.VechicleDims.value;
		
        this.userService.VehicleTypesCRUD(this.vehicletypereq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.vehicletypedata=respData.Data;
						// this.alertService.success(''+respData.m, true);
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
					this.submitted = false;
					this.successmsg = true;
					
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
					
                });
	}

  
}
