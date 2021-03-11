import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,EmailValidator } from '@angular/forms';
import { AlertService,UserService  } from '../_services';
import { element } from '@angular/core/src/render3';
declare var jQuery:any; 

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.css']
})
export class ClientRegistrationComponent implements OnInit {
  public checkModel:boolean;
	public AlertMessage;
  public TodayDateC ;	
  public DocData;
	IsAgreementStatusSelected: boolean;
public base64string;
  public citydata1;
  AggrementStatusdata1:any;
	SignedSelected: boolean;
	TerminatedSelected: boolean;
  ShowBlock:boolean;
  errorfortonnage :boolean;
	public NoneAgreementStatusSelected =true;
	ValidExpiryF:boolean=false;
  ValidExpiryT:boolean=false;
  dropdownList = [];
   CitydropdownSettings = {};
   public DispalayCreationDate;
   public DisplaySignedDate;
  public myCreationDate = new Date();
public checked:boolean;
  disable=false;
	ShowFilter=false;
	limitSelection=false;
	selectedItems:any=[];
  public DocStatusReq={ FormId:0,AutoCode:''};
	public DocStatusData;
   public ViewDocumentReq;
  public Docreq = {DocumentId :0, FormId :0 ,DocumentTypeId :0 , DocumentName  :'' ,Image  :'' , DocumentDetails :'', UserId :'', Option :'', DocGuid :'Manufacturer', AutoCode :''};
  public DocumentData;
  DocUploadForm : FormGroup;
  ClientRegForm : FormGroup;
  AgreementForm:FormGroup;
//Manufacture enrollment 
public manufacturerreq = {Manufacturerid:0, MFCode:'', ExpiryDate:'',SignedDate:'', MFName:'', MFAddress:'', MFCityIds:0, MFStateId:0,MFGST:'',AgreementStatusId:0,PrimaryCntName:'',PrimaryCntDesignation:'',PrimaryCntTelNo:'',PrimaryCntLandlineNo:'',PrimaryCntEmail:'',SecCntName:'',SecCntDesignation:'',SecCntTelNo:'',SecCntLandlineNo:'',SecCntEmail:'',PerformBy:'', Operation:0,CreationDate:'' ,Tonnage: 0};
public manufacturerdata;

public cityreq = {CityId:0, CityName:'', CityCode:'', PerformBy:'', Operation:0 };
	//public citydata;
	citydata:any;
	
	//Suburb Data
public suburbreq ={SuburbID:0, SuburbName:'', SuburbCode:'', CityId:0,PerformBy:'', Operation:0 };
public Fromsuburbdata;
	
	//Data state master
	public statemasterreq = {Stateid:0, StateName:'', StateCode:'', PerformBy:'', Operation:0 };
	//public statemasterdata;
	 statemasterdata:any;
//Data State City Mapping 		
public GetCitiesByStateIdreq = {CityId:0, CityName:'', CityCode:'', StateId:0, StateName:'', PerformBy:'', Operation:0 };
//public StateMappingStatedata;
public StatusListreq = {StatusId:0, StatusName:'', StatusType:'Aggrement', Comments:'', PerformBy:'', Operation:0 };
  public AggrementStatusdata;
  
	//Data GenerateCode
	public GenerateCodeNamereq={InputField:'',FormName:''};
	public GenerateCodeNameData;


submitted = false;
loading = false;
successmsg = false;
public value = 1;
public CompareExpiryDate;
marked = true;

  constructor(private formBuilder: FormBuilder,  private alertService : AlertService,private router: Router,  private userService: UserService, 
    public datepipe: DatePipe, ) {
      this.GetDocTypesByFormId(this.value);
     // this.GetProcessingtype();
      //this.GetWastematerials();
      this.GetManufacturer();
      //this.GetRecyclingtype();
      this.GetAgreementStatus();
      this.GetState();
      this.GetAgreementStatus1();
    //  this.GetMFNameById();
      this.GetStateMappingState();
      this.GetCities();



     }

     


  ngOnInit() {
    // date: Date;

	
    this.TodayDateC = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
	  // this.CompareExpiryDate=this.datepipe.transform(Date.now() - (30*24*60*60*1000), 'yyyy-MM-dd');

    this.NoneAgreementStatusSelected=true;
    this.SignedSelected = false;
    this.TerminatedSelected = false;
    this.ShowBlock=false;
this.errorfortonnage=false;


    this.ClientRegForm = this.formBuilder.group({
			MFCode: ['',Validators.required],
			MFName: ['', Validators.required],
			MFAddress: ['', Validators.required],
			MFCityIds: ['', Validators.required],
			MFStateId: ['', Validators.required],
			MFGST: ['',Validators.required],
			//Billingcycle: ['', Validators.required],
			AgreementStatusId: ['', Validators.required],
			ExpiryDate: ['',Validators.required],
			SignedDate :['',Validators.required],
			PrimaryCntName: ['', Validators.required],
			PrimaryCntDesignation: ['', Validators.required],
			PrimaryCntTelNo: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]+')]],
			PrimaryCntLandlineNo:['', Validators.pattern('[0-9]+')],
			PrimaryCntEmail: ['', [Validators.required,EmailValidator]],
			//ReportingFrequency: [''],
			SecCntName: [''],
			SecCntDesignation: [''],
			SecCntTelNo:['',[Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]+')]],
			SecCntLandlineNo:['', Validators.pattern('[0-9]+')],
			SecCntEmail:[''],
			CheckboxSelect: [false],
      CreationDate:[''],
      Tonnage : ['']
			
			//,Validators.pattern('(a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$)')
						
		});	

    this.DocUploadForm =this.formBuilder.group({
			DocumentId : [0],
			FormId : [0],
			DocumentTypeId : ['', Validators.required],
			DocumentName : ['', Validators.required],
			DocumentDetails : [''],
			UserId : [''],
			Option : [''],
			DocGuid : [''],
			AutoCode : [''],
			Image:['']
    });
    this.AgreementForm =this.formBuilder.group({
      IAgreeSelect: [false]

    });




  }
  get f() { return this.ClientRegForm.controls; }
  get d() { return this.DocUploadForm.controls; }
  get g(){
    return this.AgreementForm.controls;
  }
  onSubmit() {
		this.submitted = true;
		console.log("form errors : "+this.ClientRegForm.errors);
	
		// stop here if form is invalid
		if (this.ClientRegForm.invalid) {
			return;
		}
    
  


	  this.manufacturerreq.MFName=this.f.MFName.value;
	  this.manufacturerreq.MFCode=this.f.MFCode.value;
	  this.manufacturerreq.MFAddress=this.f.MFAddress.value;
	  this.manufacturerreq.MFCityIds=this.f.MFCityIds.value;
	  this.manufacturerreq.MFStateId=this.f.MFStateId.value;
	  this.manufacturerreq.MFGST=this.f.MFGST.value;
	  this.manufacturerreq.AgreementStatusId=this.f.AgreementStatusId.value;
	  this.manufacturerreq.ExpiryDate=this.f.ExpiryDate.value;
	  this.manufacturerreq.SignedDate =this.f.SignedDate.value;
	  this.manufacturerreq.PrimaryCntName=this.f.PrimaryCntName.value;
	  this.manufacturerreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
	  this.manufacturerreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
	  this.manufacturerreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
    this.manufacturerreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;
    this.manufacturerreq.SecCntName='';//this.f.SecCntName.value;
    this.manufacturerreq.SecCntDesignation='';//this.f.SecCntDesignation.value;
    this.manufacturerreq.SecCntTelNo='';//this.f.SecCntTelNo.value;
    this.manufacturerreq.SecCntLandlineNo='';//this.f.SecCntLandlineNo.value;
    this.manufacturerreq.SecCntEmail='';//this.f.SecCntEmail.value;
	  this.manufacturerreq.Manufacturerid=0;
	  this.manufacturerreq.PerformBy=localStorage.getItem('UserId');
	  this.manufacturerreq.Operation=1;
	  this.manufacturerreq.CreationDate=this.TodayDateC;
    	  this.manufacturerreq.Tonnage=this.f.Tonnage.value;

        if(this.manufacturerreq.Tonnage >=5){
          console.log("Tonnage greater than 5");
          jQuery("#TonnageGreaterThanFive").modal("show");
          
        }
        else{
          console.log("Tonnage less  than 5");
      
            if(this.errorfortonnage == false){
              this.ValidateDocStatus();
            }
            else{
              this.errorfortonnage = true;
            }
        }
      
    
  }
 
  IAgreeSelected(event) {
    this.submitted=true;
   

    if (event.target.checked ==true) 
   {
    this.errorfortonnage =false;
  
   }
   else{
      this.errorfortonnage =true;
      return;
   }


   
 }



  toggleEditable(event) {
	
    this.submitted=true;
      if (this.ClientRegForm.invalid) {
        return;
      }
    
    
   if (event.target.checked) 
    {
     this.ClientRegForm.controls['SecCntName'].setValue(this.f.PrimaryCntName.value);
     this.ClientRegForm.controls['SecCntDesignation'].setValue(this.f.PrimaryCntDesignation.value);
     this.ClientRegForm.controls['SecCntTelNo'].setValue(this.f.PrimaryCntTelNo.value);
     this.ClientRegForm.controls['SecCntLandlineNo'].setValue(this.f.PrimaryCntLandlineNo.value);
     this.ClientRegForm.controls['SecCntEmail'].setValue(this.f.PrimaryCntEmail.value);
    
    }
    else
    {
    this.ClientRegForm.controls['SecCntName'].setValue('');
     this.ClientRegForm.controls['SecCntDesignation'].setValue('');
     this.ClientRegForm.controls['SecCntTelNo'].setValue('');
     this.ClientRegForm.controls['SecCntLandlineNo'].setValue('');
     this.ClientRegForm.controls['SecCntEmail'].setValue('');
    }	
    
  }
  getFiles(event) 
	{
     var files = event.target.files;
     var reader = new FileReader();
     reader.onload = this._handleReaderLoaded.bind(this);
     reader.readAsBinaryString(files[0]);
	}
	_handleReaderLoaded(readerEvt) 
	{
     var binaryString = readerEvt.target.result;
     this.base64string = btoa(binaryString);  
  }
  

  GetStateMappingStateForm(value){
    this.loading = true;
   this.userService.GetCitiesByStateIdCRUD({StateId:value})
      .pipe()
     .subscribe(
       (data:any) => {
         var respData=data;
         if(respData.s == 1)
         {
           this.citydata=respData.Data;
           this.ClientRegForm.controls['MFCityIds'].setValue(this.citydata[0].CityId);

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
 


  GetAgreementStatus(){
	  
    this.loading = true;
   this.userService.StatusListCRUD(this.StatusListreq)
      .pipe()
     .subscribe(
       (data:any) => {
         var respData=data;
         if(respData.s == 1)
         {
            this.AggrementStatusdata=respData.Data;
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
 GetAgreementStatus1(){
	  
  this.loading = true;
 this.userService.StatusListCRUD(this.StatusListreq)
    .pipe()
   .subscribe(
     (data:any) => {
       var respData=data;
       if(respData.s == 1)
       {
          this.AggrementStatusdata1=respData.Data;
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

  GetDocTypesByFormId(value){
	  
    this.loading = true;
     this.userService.GetDocTypesByFormId({FormId:value})
      .pipe()
       .subscribe(
         (data:any) => {
           var respData=data;
           if(respData.s == 1)
           {
            this.DocData=respData.Data;
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
  GetManufacturer(){
	  
    this.loading = true;
   this.userService.manufacturerCRUD(this.manufacturerreq)
      .pipe()
     .subscribe(
       (data:any) => {
         var respData=data;
         if(respData.s == 1)
         {
            this.manufacturerdata=respData.Data;
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
 
 
  
 
 /* Display Cities*/
 GetCities(){
   
    this.loading = true;
   this.userService.CityCRUD(this.cityreq)
      .pipe()
     .subscribe(
       (data:any) => {
         var respData=data;
         if(respData.s == 1)
         {
            this.citydata1=respData.Data;
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
 
 /* Display State */
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
 GetStateMappingState(){
		
  //reset function
  // if(this.g.FocusCityIds.value!=null)
  // {
    // this.AddMFwastetypeForm.controls['FocusCityIds'].setValue(null);
    // this.mfwastetypereq.FocusCityIds='';
  // }
  
   this.loading = true;
  this.userService.GetCitiesByStateIdCRUD({StateId:0})
     .pipe()
    .subscribe(
      (data:any) => {
        var respData=data;
        if(respData.s == 1)
        {
          this.citydata=respData.Data;
          
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
GetAgreementValue(value){
  let  mystatus=this.f.AgreementStatusId.value;
  this.NoneAgreementStatusSelected =true;
  var today = new Date();
  console.log(mystatus);


  if(mystatus != "" && mystatus == 11){
    console.log('Not Signed');
    console.log(Date.now());
    this.NoneAgreementStatusSelected =true;
    this.SignedSelected = false;
    this.TerminatedSelected = false;
    this.ShowBlock =false;
    //this.ClientRegForm.controls['ExpiryDate'].setValue(Date.now());
    this.ClientRegForm.controls['ExpiryDate'].setValue(today);
    this.ClientRegForm.controls['SignedDate'].setValue(today);

 
  }

  else if(mystatus != "" && mystatus ==19){
    console.log('Signed');
    this.NoneAgreementStatusSelected =false;
  

    this.TerminatedSelected = false;
    this.SignedSelected = true;
    this.ShowBlock= true;
  }
  else{
    console.log('Terminated');
    this.NoneAgreementStatusSelected =false;
    this.SignedSelected = false;
    this.ShowBlock= true;

    this.TerminatedSelected = true;


  }
  
}
UploadDocument()
{
  this.submitted = true;
  this.DocUploadForm.controls['Image'].setValue(this.base64string);
      // stop here if form is invalid
      if (this.DocUploadForm.invalid) {
          return;
      }
  
  this.Docreq.AutoCode=this.f.MFCode.value;
  this.Docreq.DocumentTypeId=this.d.DocumentTypeId.value;
  this.Docreq.DocumentName=this.d.DocumentName.value;
  this.Docreq.DocumentDetails=this.d.DocumentDetails.value;
  this.Docreq.FormId=this.value;
  this.Docreq.Image=this.base64string;
  this.Docreq.DocGuid='Manufacturer';
  this.Docreq.Option='Insert';
  
this.loading = true;
 this.userService.DocumentCrud(this.Docreq)
  .pipe()
   .subscribe(
     (data:any) => {
       var respData=data;
       if(respData.s == 1)
       {
        this.DocumentData=respData.Data;
         //this.alertService.success(''+ respData.m, true);
this.DocUploadForm.controls['DocumentName'].setValue('');
  this.DocUploadForm.controls['DocumentTypeId'].setValue(0);
  this.DocUploadForm.controls['DocumentDetails'].setValue('');
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


ViewDocument(ViewDocumentReq)
{
  
  this.DocUploadForm.controls['DocumentName'].setValue('');
  this.DocUploadForm.controls['DocumentTypeId'].setValue(0);
  this.DocUploadForm.controls['DocumentDetails'].setValue('');
  this.Docreq.Option='';
  // this.Docreq.AutoCode=this.f.MFCode.value;
  this.Docreq.AutoCode=this.ViewDocumentReq;

  this.Docreq.FormId=this.value;
this.loading = true;
 this.userService.DocumentCrud(this.Docreq)
  .pipe()
   .subscribe(
     (data:any) => {
       var respData=data;
       if(respData.s == 1)
       {
        this.DocumentData=respData.Data;
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


DeleteDocument(DocumentId)
{
  
  
  this.Docreq.Option='Delete';
  this.Docreq.DocumentId=DocumentId;
  
  
this.loading = true;
 this.userService.DocumentCrud(this.Docreq)
  .pipe()
   .subscribe(
     (data:any) => {
       var respData=data;
       if(respData.s == 1)
       {
        this.DocumentData=respData.Data;
         //this.alertService.success(''+ respData.m, true);
         this.AlertMessage="Document Deleted Sucessfully";
         jQuery("#myModalalert").modal("show");
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



/* Add Manufacturer Enrollment */
AddUpdateDeleteManufacturer(){
  this.submitted = true;
   this.loading = true;
   this.successmsg=false;
   
     if (this.ClientRegForm.invalid) {
     this.loading = false;
     return;
    
   }		
   if (this.AgreementForm.invalid) {
    this.loading = false;
    return;
  }
  
  this.manufacturerreq.MFCode=this.f.MFCode.value;
  this.manufacturerreq.MFName=this.f.MFName.value;
  this.manufacturerreq.MFAddress=this.f.MFAddress.value;
  this.manufacturerreq.MFCityIds=this.f.MFCityIds.value;
  this.manufacturerreq.MFStateId=this.f.MFStateId.value;
  this.manufacturerreq.ExpiryDate=this.f.ExpiryDate.value;
  this.manufacturerreq.SignedDate=this.f.SignedDate.value;
  this.manufacturerreq.MFGST=this.f.MFGST.value;
  this.manufacturerreq.AgreementStatusId=this.f.AgreementStatusId.value;
  this.manufacturerreq.PrimaryCntName=this.f.PrimaryCntName.value;
  this.manufacturerreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
  this.manufacturerreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
  this.manufacturerreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
  this.manufacturerreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;
this.manufacturerreq.SecCntName=this.f.SecCntName.value;
this.manufacturerreq.SecCntDesignation=this.f.SecCntDesignation.value;
this.manufacturerreq.SecCntTelNo=this.f.SecCntTelNo.value;
this.manufacturerreq.SecCntLandlineNo=this.f.SecCntLandlineNo.value;
this.manufacturerreq.SecCntEmail=this.f.SecCntEmail.value;
this.manufacturerreq.CreationDate=this.f.CreationDate.value;
this.manufacturerreq.Tonnage=this.f.Tonnage.value;

if(this.manufacturerreq.Tonnage >=5){
  console.log("Tonnage greater than 5");
  
}
else{

    if(this.g.IAgreeSelect.value == false){
      this.errorfortonnage = true;
      return;
     
      
    }
  else{
    console.log("Tonnage less  than 5 and checked");
  }
    // if(this.errorfortonnage == false){
    //   console.log("Tonnage less  than 5");
    // }
    // else{
    //   this.errorfortonnage = true;
    // }
  
  }





  this.userService.manufacturerCRUD(this.manufacturerreq)
     //.pipe()
    .subscribe(
      (data:any) => {
        var respData=data;
        if(respData.s==1)
        {
           this.manufacturerdata=respData.Data;
           this.AlertMessage=respData.m;
        
         this.ResetFrom();
         jQuery("#myModalalert").modal("show");

        }
        else{
          this.alertService.error(''+ respData.m, true);
          
        } 
        this.loading = false;
        this.successmsg = true;
        this.submitted=false;
        //this.CheckboxSelect=false;					
        
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
        
      });
}

ValidateDocStatus()
{
	this.DocStatusReq.FormId=this.value;
	this.DocStatusReq.AutoCode=this.f.MFCode.value;
	this.loading = true;
   this.userService.ValidateDocStatus(this.DocStatusReq)
	  .pipe()
	   .subscribe(
		   (data:any) => {
			   var respData=data;
			   if(respData.s == 1)
			   {
					this.DocStatusData=respData.Data;
					
					if(this.DocStatusData=='Success')
					{
						 this.AddUpdateDeleteManufacturer();
				
					}
					else
					{
						this.AlertMessage=this.DocStatusData;
			
					}
					
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
  this.ClientRegForm.reset();
  this.successmsg = false;
  this.submitted =false;
  this.successmsg =false;
  this.citydata=undefined;
this.AgreementForm.reset();
  this.DocumentData=undefined;
  this.DocUploadForm.reset();
  this.NoneAgreementStatusSelected=true;
this.ShowBlock =false;
this.SignedSelected = false;
this.TerminatedSelected = false;
this.errorfortonnage =false;
this.checkModel= false;
jQuery("#TonnageLessThanFive").modal("hide");
jQuery("#TonnageGreaterThanFive").modal("hide");


}

GenerateMFCode(value)
	{
		this.ClientRegForm.controls['CreationDate'].setValue(this.TodayDateC);
		console.log("MF CODe :"+value.substring(0,4));
		this.GenerateCodeNamereq.InputField=value.substring(0,4);
		this.GenerateCodeNamereq.FormName='Manufacturers';
		this.GetGenerateCode();			
  }
  GetGenerateCode(){
	  
    this.loading = true;
   this.userService.GetGenerateCodeName(this.GenerateCodeNamereq)
      .pipe()
     .subscribe(
       (data:any) => {
         var respData=data;
         if(respData.s == 1)
         {
           this.ClientRegForm.controls['MFCode'].setValue(respData.Data);
           //this.alertService.success(''+ respData.m, true);
           this.ViewDocument(this.ViewDocumentReq);
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
 
}
