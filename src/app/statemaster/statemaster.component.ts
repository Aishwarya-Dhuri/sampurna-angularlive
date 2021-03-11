import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';

declare var jQuery:any;

@Component({
  selector: 'app-statemaster',
  templateUrl: './statemaster.component.html',
  styleUrls: ['./statemaster.component.css']
})
export class StatemasterComponent implements OnInit {
	
	public statemasterreq = {Stateid:0, StateName:'', StateCode:'', PerformBy:'', Operation:0 };
	public statemasterdata;
	public AlertMessage;
	
	StateForm:FormGroup;
	 submitted = false;
	loading = false;
	successmsg = false;
	

   constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,private router: Router) 
   {
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
	   //this.nav.show();
	     this.StateForm = this.formBuilder.group({
            StateName: ['', Validators.required]
			            
        });		
  }
  
   onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.StateForm.invalid) {
            return;
        }
		
	  this.statemasterreq.StateName=this.f.StateName.value;
	  this.statemasterreq.Stateid=0;
	  this.statemasterreq.PerformBy=localStorage.getItem('UserId');
	  this.statemasterreq.Operation=1;
	 
      this.AddUpdateDeleteState();
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
	
	 ResetFrom(){
		this.StateForm.reset();
		this.successmsg = false;
		this.submitted =false;
	}
	
	
	EditStateMasterData(StateName,Stateid)
	{
		this.successmsg = false;
		
		this.StateForm.controls['StateName'].setValue(StateName);
		
		
		
	  this.statemasterreq.StateName=this.f.StateName.value;

	  
	  this.statemasterreq.Stateid=Stateid;
	  this.statemasterreq.PerformBy=localStorage.getItem('UserId');
	  this.statemasterreq.Operation=2;
	}
	
	
	DeleteStateMasterData(StateName,Stateid)
	{
		
		
		this.StateForm.controls['StateName'].setValue(StateName);
		
		
		
	  this.statemasterreq.StateName=this.f.StateName.value;

	  
	  this.statemasterreq.Stateid=Stateid;
	  this.statemasterreq.PerformBy=localStorage.getItem('UserId');
	  this.statemasterreq.Operation=3;
	}
	
	get f() { return this.StateForm.controls; }
	
	AddUpdateDeleteState()
	{
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.StateForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		this.statemasterreq.StateName=this.f.StateName.value;
        this.userService.statemasterCRUD(this.statemasterreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.statemasterdata=respData.Data;
						 this.AlertMessage=respData.m;
						// this.alertService.success(''+respData.m, true);
						 jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
						  jQuery("#myModalalert").modal("show");
					}
					else{
						this.alertService.error(''+ respData.m, true);
						this.AlertMessage=respData.m;
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
