import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';
declare var jQuery:any;
@Component({
  selector: 'app-manufacturer-type',
  templateUrl: './manufacturer-type.component.html',
  styleUrls: ['./manufacturer-type.component.css']
})
export class ManufacturerTypeComponent implements OnInit {

	public manufacturertypereq = {ManufacturerTypeId:0, ManufacturerType:'', Comments:'', PerformBy:'', Operation:0 };
	public manufacturertypedata;
	public AlertMessage;
	manufacturetypForm:FormGroup;
	loading = false;
	submitted = false;
	successmsg = false;

  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,private router: Router) 
  {
		this.GetManufacturetype();
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
	    this.manufacturetypForm = this.formBuilder.group({
            ManufacturerType: ['', Validators.required],
            Comments: ['']
			            
        });	
  }
  
   ResetFrom(){
		this.manufacturetypForm.reset();
		this.successmsg = false;
		this.submitted =false;
	}
	
  
  
   onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.manufacturetypForm.invalid) {
            return;
        }
		
	  this.manufacturertypereq.ManufacturerType=this.f.ManufacturerType.value;
	  this.manufacturertypereq.Comments=this.f.Comments.value;
	  this.manufacturertypereq.ManufacturerTypeId=0;
	  this.manufacturertypereq.PerformBy=localStorage.getItem('UserId');
	  this.manufacturertypereq.Operation=1;
	  
	 
      this.AddUpdateDeleteManufacturertype();
    }
  
  GetManufacturetype(){
	  
		 this.loading = true;
        this.userService.manufacturertypeCRUD(this.manufacturertypereq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.manufacturertypedata=respData.Data;
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
	
	get f() { return this.manufacturetypForm.controls; }
	
	
	EditManufacturetypeData(ManufacturerType,Comments,ManufacturerTypeId)
	{
		this.successmsg = false;
		this.manufacturetypForm.controls['ManufacturerType'].setValue(ManufacturerType);
		this.manufacturetypForm.controls['Comments'].setValue(Comments);
		 this.manufacturertypereq.ManufacturerType=this.f.ManufacturerType.value;
		 this.manufacturertypereq.Comments=this.f.Comments.value;
		 
	  this.manufacturertypereq.ManufacturerTypeId=ManufacturerTypeId;
	  this.manufacturertypereq.PerformBy=localStorage.getItem('UserId');
	  this.manufacturertypereq.Operation=2;
	}
	
	DeleteManufacturetypeData(ManufacturerType,Comments,ManufacturerTypeId)
	{
		this.manufacturetypForm.controls['ManufacturerType'].setValue(ManufacturerType);
		this.manufacturetypForm.controls['Comments'].setValue(Comments);
		 this.manufacturertypereq.ManufacturerType=this.f.ManufacturerType.value;
		 this.manufacturertypereq.Comments=this.f.Comments.value;
		 
	  this.manufacturertypereq.ManufacturerTypeId=ManufacturerTypeId;
	  this.manufacturertypereq.PerformBy=localStorage.getItem('UserId');
	  this.manufacturertypereq.Operation=3;
	}
	
	
	AddUpdateDeleteManufacturertype(){
		
		 this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		  if (this.manufacturetypForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		this.manufacturertypereq.ManufacturerType=this.f.ManufacturerType.value;
		this.manufacturertypereq.Comments=this.f.Comments.value;
        this.userService.manufacturertypeCRUD(this.manufacturertypereq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.manufacturertypedata=respData.Data;
						 //this.alertService.success(''+respData.m, true);
						 //this.router.navigate(['/city']);
						 // this.manufacturetypForm.controls['ManufacturerType'].setValue('');
						 // this.manufacturetypForm.controls['Comments'].setValue('');
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