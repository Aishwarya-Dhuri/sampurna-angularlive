import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';
declare var jQuery:any;
@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.css']
})
export class DocumentTypeComponent implements OnInit {

	public doctypereq = {DocumentTypeId:0, DocumentTypeName:'', PerformBy:'', Operation:0,FormId:0,Comment:'',DocumentStatus:0};
	doctypeForm:FormGroup;
	public doctypedata;
	public FormData;
	public AlertMessage;
	public DocTypeNameData;
	submitted = false;
	loading = false;
	successmsg = false;
  constructor(private formBuilder: FormBuilder, 
  public nav: NavbarService, 
  private userService: UserService, 
  private alertService : AlertService,
  private router: Router){ 
  this.GetFormName();
  this.GetDocType();
  this.GetDocTypeName();
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
	 // this.nav.show();
	    this.doctypeForm = this.formBuilder.group({
            DocumentTypeName: ['', Validators.required],
			FormId:['',Validators.required],
			Comment:[''],
			DocumentType:['',Validators.required]
			            
        });
  }
  
  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.doctypeForm.invalid) {
            return;
        }
		
	  this.doctypereq.DocumentTypeName=this.f.DocumentTypeName.value;
	  this.doctypereq.FormId=this.f.FormId.value;
	  this.doctypereq.Comment=this.f.Comment.value;
	  this.doctypereq.DocumentTypeId=0;
	  this.doctypereq.DocumentStatus=this.f.DocumentType.value;
	  this.doctypereq.PerformBy=localStorage.getItem('UserId');
	  this.doctypereq.Operation=1;
	 
      this.AddUpdateDeleteDoctype();
    }
  
   GetDocType(){
	  
		 this.loading = true;
        this.userService.DoctypeCRUD(this.doctypereq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.doctypedata=respData.Data;
						// this.alertService.success('City added successfuly', true);
						// this.router.navigate(['/city']);
						//this.alertService.success(''+ respData.m, true);

					}
					else{
						this.alertService.error(''+ respData.m, true);
						
					} 
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
	}
	
	get f() { return this.doctypeForm.controls; }
	
	ResetFrom(){
		this.doctypeForm.reset();
		this.successmsg = false;
		this.submitted =false;
	}
	
	
	EditDoctypeData(DocumentTypeName,DocumentTypeId,FormId,Comment,DocumentStatus)
	{
		  this.successmsg = false;
		 this.doctypeForm.controls['FormId'].setValue(FormId);
		this.doctypeForm.controls['Comment'].setValue(Comment);
		 this.doctypeForm.controls['DocumentTypeName'].setValue(DocumentTypeName);
		   this.doctypeForm.controls['DocumentType'].setValue(DocumentStatus);
		 this.doctypereq.FormId=this.f.FormId.value;
		 this.doctypereq.Comment=this.f.Comment.value;
		 this.doctypereq.DocumentTypeName=this.f.DocumentTypeName.value;
	     this.doctypereq.DocumentTypeId=DocumentTypeId;
	     this.doctypereq.PerformBy=localStorage.getItem('UserId');
		 this.doctypereq.DocumentStatus=this.f.DocumentType.value;
		  this.doctypereq.Operation=2;
		  
		 
		 
	}
	
	DeleteDoctypeData(DocumentTypeName,DocumentTypeId,FormId,Comment,DocumentStatus)
	{
		this.doctypeForm.controls['FormId'].setValue(FormId);
		this.doctypeForm.controls['Comment'].setValue(Comment);
		 this.doctypeForm.controls['DocumentTypeName'].setValue(DocumentTypeName);
		  this.doctypeForm.controls['DocumentType'].setValue(DocumentStatus);
		  this.doctypereq.DocumentStatus=this.f.DocumentType.value;
		 this.doctypereq.FormId=this.f.FormId.value;
		 this.doctypereq.Comment=this.f.Comment.value;
		 this.doctypereq.DocumentTypeName=this.f.DocumentTypeName.value;
	     this.doctypereq.DocumentTypeId=DocumentTypeId;
	     this.doctypereq.PerformBy=localStorage.getItem('UserId');
	     this.doctypereq.Operation=3;
		 
		 
		 
	}
	
	
		AddUpdateDeleteDoctype(){
		
		 this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;

        // stop here if form is invalid
        if (this.doctypeForm.invalid) {
			this.loading = false;
            return;
			
        }
		this.doctypereq.FormId=this.f.FormId.value;
		this.doctypereq.Comment=this.f.Comment.value;
		this.doctypereq.DocumentTypeName=this.f.DocumentTypeName.value;
		this.doctypereq.DocumentStatus=this.f.DocumentType.value;
        this.userService.DoctypeCRUD(this.doctypereq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{ this.AlertMessage=respData.m;
						 this.doctypedata=respData.Data;
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
	
	GetFormName(){
	  
		 this.loading = true;
        this.userService.Forms_CRUD()
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.FormData=respData.Data;
						// this.alertService.success('City added successfuly', true);
						// this.router.navigate(['/city']);
						//this.alertService.success(''+ respData.m, true);

					}
					else{
						this.alertService.error(''+ respData.m, true);
						
					} 
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
	}
	
	GetDocTypeName(){
	  
		 this.loading = true;
        this.userService.GetDocType()
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.DocTypeNameData=respData.Data;
						// this.alertService.success('City added successfuly', true);
						// this.router.navigate(['/city']);
						//this.alertService.success(''+ respData.m, true);

					}
					else{
						this.alertService.error(''+ respData.m, true);
						
					} 
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
	}

}
