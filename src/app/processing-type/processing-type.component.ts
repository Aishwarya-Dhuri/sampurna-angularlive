import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';

declare var jQuery:any;
@Component({
  selector: 'app-processing-type',
  templateUrl: './processing-type.component.html',
  styleUrls: ['./processing-type.component.css']
})
export class ProcessingTypeComponent implements OnInit {
	public processingtypereq = {ProcessingTypeId:0, ProcessingType:'', Comments:'', PerformBy:'', Operation:0};
	public operartiontypedata;
	processingtypeForm:FormGroup;
	 submitted = false;
	loading = false;
	successmsg = false;
public AlertMessage;
  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,private router: Router) { 
  this.GetProcessingtype();}

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
	    this.processingtypeForm = this.formBuilder.group({
            ProcessingType: ['', Validators.required],
			Comments: ['']
			            
        });		
  }
  
    ResetFrom(){
this.processingtypeForm.reset();
this.successmsg = false;
this.submitted =false;
}
  
     onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.processingtypeForm.invalid) {
            return;
        }
		
	  this.processingtypereq.ProcessingType=this.f.ProcessingType.value;
	  this.processingtypereq.Comments=this.f.Comments.value;
	  this.processingtypereq.ProcessingTypeId=0;
	  this.processingtypereq.PerformBy=localStorage.getItem('UserId');
	  this.processingtypereq.Operation=1;
	  
	 
      this.AddUpdateDeleteProcessingtype();
    }
	
  get f() { return this.processingtypeForm.controls; }
  
  EditProcessingtypeData(ProcessingType,Comments,ProcessingTypeId)
	{
		this.successmsg = false;
		this.processingtypeForm.controls['ProcessingType'].setValue(ProcessingType);
		 this.processingtypereq.ProcessingType=this.f.ProcessingType.value;
		 this.processingtypeForm.controls['Comments'].setValue(Comments);
		  this.processingtypereq.Comments=this.f.Comments.value;
	  this.processingtypereq.ProcessingTypeId=ProcessingTypeId;
	  this.processingtypereq.PerformBy=localStorage.getItem('UserId');
	  this.processingtypereq.Operation=2;
	}
	
	DeleteProcessingtypeData(ProcessingType,Comments,ProcessingTypeId)
	{
		this.processingtypeForm.controls['ProcessingType'].setValue(ProcessingType);
		 this.processingtypereq.ProcessingType=this.f.ProcessingType.value;
		 this.processingtypeForm.controls['Comments'].setValue(Comments);
		 this.processingtypereq.Comments=this.f.Comments.value;
	  this.processingtypereq.ProcessingTypeId=ProcessingTypeId;
	  this.processingtypereq.PerformBy=localStorage.getItem('UserId');
	  this.processingtypereq.Operation=3;
	}
  
   GetProcessingtype(){
	  
		 this.loading = true;
        this.userService.processingtypeCRUD(this.processingtypereq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.operartiontypedata=respData.Data;
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
	
		AddUpdateDeleteProcessingtype(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		  if (this.processingtypeForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		 this.processingtypereq.ProcessingType=this.f.ProcessingType.value;
	  this.processingtypereq.Comments=this.f.Comments.value;
        this.userService.processingtypeCRUD(this.processingtypereq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.operartiontypedata=respData.Data;
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
