import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';
declare var jQuery:any;
@Component({
  selector: 'app-material-unit',
  templateUrl: './material-unit.component.html',
  styleUrls: ['./material-unit.component.css']
})
export class MaterialUnitComponent implements OnInit {

	public materialunitreq = {MaterialUnitId:0, MaterialUnit:0, MaterialUnitCode:0, Comments:'', PerformBy:'', Operation:0 };
	public materialunitdata;
    public AlertMessage;
   	materialunitsForm:FormGroup;
loading = false;
submitted = false;
successmsg = false;
   
   constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,private router: Router){
	 this.GetMaterialUnit();
   }
   
   
   ResetFrom(){
this.materialunitsForm.reset();
this.successmsg = false;
this.submitted=false;
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
	    this.materialunitsForm = this.formBuilder.group({
          
            // MaterialUnitCode: ['', Validators.required],
			  MaterialUnit: ['', Validators.required],
            Comments: ['']
			            
        });		
  }
  
  
   onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.materialunitsForm.invalid) {
            return;
        }
		
	 
	  // this.materialunitreq.MaterialUnitCode=this.f.MaterialUnitCode.value;
	   this.materialunitreq.MaterialUnit=this.f.MaterialUnit.value;
	  this.materialunitreq.Comments=this.f.Comments.value;
	  this.materialunitreq.MaterialUnitId=0;
	  this.materialunitreq.PerformBy=localStorage.getItem('UserId');
	  this.materialunitreq.Operation=1;
	 
      this.AddUpdateDeletematerialunit();
    }
  
  
  
  GetMaterialUnit(){
	  
		 this.loading = true;
        this.userService.MaterialunitCRUD(this.materialunitreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.materialunitdata=respData.Data;
						
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
	
	get f() { return this.materialunitsForm.controls; }
	
	
	EditMaterialUnitData(MaterialUnit,Comments,MaterialUnitId)
	{
		this.successmsg = false;
		// this.materialunitsForm.controls['MaterialUnitCode'].setValue(MaterialUnitCode);
		 // this.materialunitreq.MaterialUnitCode=this.f.MaterialUnitCode.value;
		 
		 this.materialunitsForm.controls['MaterialUnit'].setValue(MaterialUnit);
		 this.materialunitreq.MaterialUnit=this.f.MaterialUnit.value;
		 
		 this.materialunitsForm.controls['Comments'].setValue(Comments);
		 this.materialunitreq.Comments=this.f.Comments.value;
		 
	  this.materialunitreq.MaterialUnitId=MaterialUnitId;
	  this.materialunitreq.PerformBy=localStorage.getItem('UserId');
	  this.materialunitreq.Operation=2;
	}
	
	
	DeleteMaterialUnitData(MaterialUnit,Comments,MaterialUnitId)
	{
		
		// this.materialunitsForm.controls['MaterialUnitCode'].setValue(MaterialUnitCode);
		 // this.materialunitreq.MaterialUnitCode=this.f.MaterialUnitCode.value;
		 
		 this.materialunitsForm.controls['MaterialUnit'].setValue(MaterialUnit);
		 this.materialunitreq.MaterialUnit=this.f.MaterialUnit.value;
		 
		 this.materialunitsForm.controls['Comments'].setValue(Comments);
		 this.materialunitreq.Comments=this.f.Comments.value;
		 
	  this.materialunitreq.MaterialUnitId=MaterialUnitId;
	  this.materialunitreq.PerformBy=localStorage.getItem('UserId');
	  this.materialunitreq.Operation=3;
	}
	
	
	AddUpdateDeletematerialunit(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.materialunitsForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		
		// this.materialunitreq.MaterialUnitCode=this.f.MaterialUnitCode.value;
		this.materialunitreq.MaterialUnit=this.f.MaterialUnit.value;
		this.materialunitreq.Comments=this.f.Comments.value;
		
        this.userService.MaterialunitCRUD(this.materialunitreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.materialunitdata=respData.Data;
						 this.AlertMessage=respData.m;
						 //this.alertService.success(''+respData.m, true);
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
