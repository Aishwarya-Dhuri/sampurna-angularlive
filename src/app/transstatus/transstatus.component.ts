import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';
declare var jQuery:any;
@Component({
  selector: 'app-transstatus',
  templateUrl: './transstatus.component.html',
  styleUrls: ['./transstatus.component.css']
})
export class TransstatusComponent implements OnInit {
	
	public StatusListreq = {StatusId:0, StatusName:'', StatusType:'Transportation', Comments:'', PerformBy:'', Operation:0 };
	public TransportationStatusdata;
	TransportationStatusForm:FormGroup;
	 submitted = false;
	loading = false;
	successmsg = false; 
    public AlertMessage;
  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,private router: Router)
  {
	this.GetTransportationStatus();
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
	  
	  this.TransportationStatusForm = this.formBuilder.group({
            StatusName: ['', Validators.required],
            StatusType: ['Transportation'],
            Comments: ['']
			            
        });	
		
  }
  
  ResetFrom(){
		this.TransportationStatusForm.reset();
		this.successmsg = false;
		this.submitted =false;
	}
	
  
   onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.TransportationStatusForm.invalid) {
            return;
        }
		
	  this.StatusListreq.StatusName=this.f.StatusName.value;
	  this.StatusListreq.StatusType='Transportation';
	  this.StatusListreq.Comments=this.f.Comments.value;
	  
	  
	  this.StatusListreq.StatusId=0;
	  
	  this.StatusListreq.PerformBy=localStorage.getItem('UserId');
	  this.StatusListreq.Operation=1;
	 
      this.	AddUpdateDeleteTransportationStatus();
    }
	
	EditTransportationStatusData(StatusName,StatusType,Comments,StatusId)
	{
		this.successmsg = false;
		
		this.TransportationStatusForm.controls['StatusName'].setValue(StatusName);
		this.TransportationStatusForm.controls['StatusType'].setValue('Transportation');
		this.TransportationStatusForm.controls['Comments'].setValue(Comments);
		
		
	  this.StatusListreq.StatusName=this.f.StatusName.value;
	  this.StatusListreq.StatusType=this.f.StatusType.value;
	  this.StatusListreq.Comments=this.f.Comments.value;
	  
	  this.StatusListreq.StatusId=StatusId;
	  this.StatusListreq.PerformBy=localStorage.getItem('UserId');
	  this.StatusListreq.Operation=2;
	}
	
	DeleteTransportationStatusData(StatusName,StatusType,Comments,StatusId)
	{
		// this.successmsg = false;
		
		this.TransportationStatusForm.controls['StatusName'].setValue(StatusName);
		this.TransportationStatusForm.controls['StatusType'].setValue('Transportation');
		this.TransportationStatusForm.controls['Comments'].setValue(Comments);
		
		
	  this.StatusListreq.StatusName=this.f.StatusName.value;
	  this.StatusListreq.StatusType=this.f.StatusType.value;
	  this.StatusListreq.Comments=this.f.Comments.value;
	  
	  this.StatusListreq.StatusId=StatusId;
	  this.StatusListreq.PerformBy=localStorage.getItem('UserId');
	  this.StatusListreq.Operation=3;
	}
	
  
 get f() { return this.TransportationStatusForm.controls; }
 
 
  GetTransportationStatus(){
	  
		 this.loading = true;
        this.userService.StatusListCRUD(this.StatusListreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.TransportationStatusdata=respData.Data;
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
	
	
	AddUpdateDeleteTransportationStatus(){
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.TransportationStatusForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		 this.StatusListreq.StatusName=this.f.StatusName.value;
	  this.StatusListreq.StatusType='Transportation';
	  this.StatusListreq.Comments=this.f.Comments.value;
		
		
        this.userService.StatusListCRUD(this.StatusListreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.TransportationStatusdata=respData.Data;
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
