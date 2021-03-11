import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';
declare var jQuery:any;
@Component({
  selector: 'app-weste-material',
  templateUrl: './weste-material.component.html',
  styleUrls: ['./weste-material.component.css']
})
export class WesteMaterialComponent implements OnInit {

	public wastematerailreq = {WasteMatId:0,  WasteMatCode:0, WasteMatName:'', WasteMatDescription:'', PerformBy:'', Operation:0 };
	public wastematerialdata;
	successmsg = false;
	wastematerialForm:FormGroup;
	loading = false;
	submitted = false;
	public AlertMessage;
  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,private router: Router) { 
  this.GetWastematerials();
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
	    this.wastematerialForm = this.formBuilder.group({
			
			 WasteMatCode: ['', Validators.required],
            WasteMatName: ['', Validators.required],     
            //WasteMatDescription: ['', Validators.required]
			            
        });	
		
	  
  }
  
     onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.wastematerialForm.invalid) {
            return;
        }
		
	  this.wastematerailreq.WasteMatCode=this.f.WasteMatCode.value;
	  this.wastematerailreq.WasteMatName=this.f.WasteMatName.value;
	  //this.wastematerailreq.WasteMatDescription=this.f.WasteMatDescription.value;
	  this.wastematerailreq.WasteMatId=0;
	  this.wastematerailreq.PerformBy=localStorage.getItem('UserId');
	  this.wastematerailreq.Operation=1;
	 
      this.AddUpdateDeletewastematerial();
    }
  
  
  ResetFrom(){
		this.wastematerialForm.reset();
		this.successmsg = false;
		this.submitted = false;
	}
  
  GetWastematerials(){
	  
		 this.loading = true;
        this.userService.WastematerialCRUD(this.wastematerailreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.wastematerialdata=respData.Data;
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
	
	get f() { return this.wastematerialForm.controls; }
	
	EditwastematerialData(WasteMatCode,WasteMatName,WasteMatId)
	{
		
		this.successmsg = false;
		this.wastematerialForm.controls['WasteMatCode'].setValue(WasteMatCode);
		 this.wastematerailreq.WasteMatCode=this.f.WasteMatCode.value;
		 
		 this.wastematerialForm.controls['WasteMatName'].setValue(WasteMatName);
		 this.wastematerailreq.WasteMatName=this.f.WasteMatName.value;
		 
		  // this.wastematerialForm.controls['WasteMatDescription'].setValue(WasteMatDescription);
		 // this.wastematerailreq.WasteMatDescription=this.f.WasteMatDescription.value;
		 
		 
	  this.wastematerailreq.WasteMatId=WasteMatId;
	  this.wastematerailreq.PerformBy=localStorage.getItem('UserId');
	  this.wastematerailreq.Operation=2;
	}
	
	DeletewastematerialData(WasteMatCode,WasteMatName,WasteMatId)
	{
		this.wastematerialForm.controls['WasteMatCode'].setValue(WasteMatCode);
		 this.wastematerailreq.WasteMatCode=this.f.WasteMatCode.value;
		 
		 this.wastematerialForm.controls['WasteMatName'].setValue(WasteMatName);
		 this.wastematerailreq.WasteMatName=this.f.WasteMatName.value;
		 
		  // this.wastematerialForm.controls['WasteMatDescription'].setValue(WasteMatDescription);
		 // this.wastematerailreq.WasteMatDescription=this.f.WasteMatDescription.value;
		 
		 
	  this.wastematerailreq.WasteMatId=WasteMatId;
	  this.wastematerailreq.PerformBy=localStorage.getItem('UserId');
	  this.wastematerailreq.Operation=3;
	}
	
	
	
	AddUpdateDeletewastematerial(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		
		 
		  if (this.wastematerialForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		
		this.wastematerailreq.WasteMatCode=this.f.WasteMatCode.value;
		this.wastematerailreq.WasteMatName=this.f.WasteMatName.value;
		//this.wastematerailreq.WasteMatDescription=this.f.WasteMatDescription.value;
        this.userService.WastematerialCRUD(this.wastematerailreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.wastematerialdata=respData.Data;
						 //this.alertService.success(''+respData.m, true);
						  this.AlertMessage=respData.m;
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
