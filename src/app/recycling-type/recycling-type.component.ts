import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';
declare var jQuery:any;
@Component({
  selector: 'app-recycling-type',
  templateUrl: './recycling-type.component.html',
  styleUrls: ['./recycling-type.component.css']
})
export class RecyclingTypeComponent implements OnInit {

public recyclingtypereq = {RecyclingTypeId:0, RecyclingType:'', Comments:'', PerformBy:'', Operation:0 };
	public recyclingtypedata;
	public AlertMessage;
		recyclingtypeForm:FormGroup;
loading = false;
submitted = false;
successmsg = false;
 constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,private router: Router)
 { this.GetRecyclingtype(); 
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
	    this.recyclingtypeForm = this.formBuilder.group({
            RecyclingType: ['', Validators.required],
            Comments: ['']
			            
        });	
	  
  }
  
  
   onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.recyclingtypeForm.invalid) {
            return;
        }
		
	  this.recyclingtypereq.RecyclingType=this.f.RecyclingType.value;
	  this.recyclingtypereq.Comments=this.f.Comments.value;
	  this.recyclingtypereq.RecyclingTypeId=0;
	  this.recyclingtypereq.PerformBy=localStorage.getItem('UserId');
	  this.recyclingtypereq.Operation=1;
	 
      this.AddUpdateRecycletype();
    }
	
  
  
  GetRecyclingtype(){
	  
		 this.loading = true;
        this.userService.RecyclingTypeCRUD(this.recyclingtypereq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.recyclingtypedata=respData.Data;
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
	
	get f() { return this.recyclingtypeForm.controls; }
	
	ResetFrom(){
		this.recyclingtypeForm.reset();
		this.successmsg = false;
		this.submitted=false;
	}
	
	EditRecyclingtypeData(RecyclingType,Comments,RecyclingTypeId)
	{
		this.successmsg = false;
		 this.recyclingtypeForm.controls['RecyclingType'].setValue(RecyclingType);
			this.recyclingtypeForm.controls['Comments'].setValue(Comments);
			
		 this.recyclingtypereq.RecyclingType=this.f.RecyclingType.value;
		 this.recyclingtypereq.Comments=this.f.Comments.value;
		 
	  this.recyclingtypereq.RecyclingTypeId=RecyclingTypeId;
	  this.recyclingtypereq.PerformBy=localStorage.getItem('UserId');
	  this.recyclingtypereq.Operation=2;
	}
	
	DeleteRecyclingtypeData(RecyclingType,Comments,RecyclingTypeId)
	{
		this.recyclingtypeForm.controls['RecyclingType'].setValue('RecyclingType');
			this.recyclingtypeForm.controls['Comments'].setValue('Comments');
			
		 this.recyclingtypereq.RecyclingType=this.f.RecyclingType.value;
		 this.recyclingtypereq.Comments=this.f.Comments.value;
		 
	  this.recyclingtypereq.RecyclingTypeId=RecyclingTypeId;
	  this.recyclingtypereq.PerformBy=localStorage.getItem('UserId');
	  this.recyclingtypereq.Operation=3;
	}
	
	AddUpdateRecycletype(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.recyclingtypeForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		this.recyclingtypereq.RecyclingType=this.f.RecyclingType.value;
		this.recyclingtypereq.Comments=this.f.Comments.value;
        this.userService.RecyclingTypeCRUD(this.recyclingtypereq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.recyclingtypedata=respData.Data;
					 this.AlertMessage=respData.m;
						// this.alertService.success(''+respData.m, true);
						 jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
						  jQuery("#myModalalert").modal("show");
					}
					else{
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
