import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';
declare var jQuery:any;
@Component({
  selector: 'app-wostatus',
  templateUrl: './wostatus.component.html',
  styleUrls: ['./wostatus.component.css']
})
export class WostatusComponent implements OnInit {

	public StatusListreq = {StatusId:0, StatusName:'', StatusType:'WorkOrderStatus', Comments:'', PerformBy:'', Operation:0 };
	public workorderStatusdata;
	WOStatusForm:FormGroup;
	 submitted = false;
	loading = false;
	successmsg = false; 
	public AlertMessage;
	
  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,private router: Router) 
  {
	  this.GetWorkorderStatus();
  }

  ngOnInit() {
	    //this.nav.show();
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
		 this.WOStatusForm = this.formBuilder.group({
            StatusName: ['', Validators.required],
            StatusType: ['WorkOrderStatus'],
            Comments: ['']
			            
        });	
  }
  
   ResetFrom(){
		this.WOStatusForm.reset();
		this.successmsg = false;
		this.submitted =false;
	}
	
	
	 onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.WOStatusForm.invalid) {
            return;
        }
		
	  this.StatusListreq.StatusName=this.f.StatusName.value;
	  this.StatusListreq.StatusType='WorkOrderStatus';
	  this.StatusListreq.Comments=this.f.Comments.value;
	  
	  
	  this.StatusListreq.StatusId=0;
	  
	  this.StatusListreq.PerformBy=localStorage.getItem('UserId');
	  this.StatusListreq.Operation=1;
	 
      this.	AddUpdateDeleteWOStatus();
    }
	
	
	EditWOStatusData(StatusName,StatusType,Comments,StatusId)
	{
		this.successmsg = false;
		
		this.WOStatusForm.controls['StatusName'].setValue(StatusName);
		this.WOStatusForm.controls['StatusType'].setValue('Transportation');
		this.WOStatusForm.controls['Comments'].setValue(Comments);
		
		
	  this.StatusListreq.StatusName=this.f.StatusName.value;
	  this.StatusListreq.StatusType=this.f.StatusType.value;
	  this.StatusListreq.Comments=this.f.Comments.value;
	  
	  this.StatusListreq.StatusId=StatusId;
	  this.StatusListreq.PerformBy=localStorage.getItem('UserId');
	  this.StatusListreq.Operation=2;
	}
	
	
	DeleteWOStatusData(StatusName,StatusType,Comments,StatusId)
	{
		// this.successmsg = false;
		
		this.WOStatusForm.controls['StatusName'].setValue(StatusName);
		this.WOStatusForm.controls['StatusType'].setValue('Transportation');
		this.WOStatusForm.controls['Comments'].setValue(Comments);
		
		
	  this.StatusListreq.StatusName=this.f.StatusName.value;
	  this.StatusListreq.StatusType=this.f.StatusType.value;
	  this.StatusListreq.Comments=this.f.Comments.value;
	  
	  this.StatusListreq.StatusId=StatusId;
	  this.StatusListreq.PerformBy=localStorage.getItem('UserId');
	  this.StatusListreq.Operation=3;
	}
	
	 get f() { return this.WOStatusForm.controls; }
	 
	 GetWorkorderStatus(){
	  
		 this.loading = true;
        this.userService.StatusListCRUD(this.StatusListreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.workorderStatusdata=respData.Data;
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
	
	AddUpdateDeleteWOStatus(){
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.WOStatusForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		 this.StatusListreq.StatusName=this.f.StatusName.value;
	  this.StatusListreq.StatusType='WorkOrderStatus';
	  this.StatusListreq.Comments=this.f.Comments.value;
		
		
        this.userService.StatusListCRUD(this.StatusListreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.workorderStatusdata=respData.Data;
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
					this.successmsg = true;
					this.submitted=false;
					
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
					
                });
	}

}
