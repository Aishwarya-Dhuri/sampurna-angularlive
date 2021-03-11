import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,EmailValidator } from '@angular/forms';
import { AlertService, NavbarService, UserService,ExcelService } from '../_services';

import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
declare var jQuery:any; 

@Component({
  selector: 'app-recycler-enrolement',
  templateUrl: './recycler-enrolement.component.html',
  styleUrls: ['./recycler-enrolement.component.css']
})
export class RecyclerEnrolementComponent implements OnInit {
UserId=localStorage.getItem('UserId');
public TodayDateC ;
	public TodayDate;
	public DispalayDate
	public RecyclerName;
	public IsValidPT;
	public DisplaySignedDate;

	public ViewDocumentReq;
	public Docreq = {DocumentId :0, FormId :0 ,DocumentTypeId :0 , DocumentName  :'' ,Image  :'' , DocumentDetails :'', UserId :'', Option :'', DocGuid :'Recycler', AutoCode :''};
    public DocumentData;
	public DisplayCreationDate;
   public recyclerreq = {RecylerId:0, RecyclerName:'',RecylerCode:'', Address:'', Details:'', RecylingTypeEndProducts:'', NonOpDays:'', GSTNo:'', AgreementStatusId:0,PrimaryCntName:'',PrimaryCntDesignation:'',PrimaryCntTelNo:'',PrimaryCntLandlineNo:'',PrimaryCntEmail:'',SecCntName:'',SecCntDesignation:'',SecCntTelNo:'',SecCntLandlineNo:'',SecCntEmail:'',ExpiryDate:'', RecyclerStatusId:0,PCBDocumentFile:'',PCBDocumentName:'',CertificateDocument:'',CertificateDocumentFile:null,MaterialDocument:'',MaterialDocumentFile:null,PerformBy:'', Operation:0,CreationDate:'',SignedDate:'',StateId:0,CityId:0,SuburbId:0 };
    public Recyclerdata;
   
   dropdownList = [];
   IsValidAGPT:boolean=true;
   SignedSelected: boolean;
   TerminatedSelected: boolean;
   ShowBlock:boolean;
   citydata1:any;
   public NoneAgreementStatusSelected =true;
   //Recycler Material Data
   //public RCMaterialsreq ={RecyclerMatId:0,RecylerId:0,WasteMaterialId:0,Rate:0, MatUnitId:0, MatUnitName:'',ProcessingTypeId:'', ProcessingTypeName:'', HandlingCapacity:0, HandlingCapacityUnitID:0, HandlingCapacityUnitName:'', MaxATUnitID:0, MinAcceptableTonnage:0,MaxAcceptableTonnage:0, MinATUnitID:0, NonOperationalDays:'', PerformBy:'', Operation:0}
   public RCMaterialsreq ={RecyclerMatId:0,RecylerId:0,WasteMaterialId:0,Rate:0, MatUnitId:0, MatUnitName:'',ProcessingTypeId:'', ProcessingTypeName:'', HandlingCapacity:0, HandlingCapacityUnitID:0, HandlingCapacityUnitName:'', MaxATUnitID:0, MinAcceptableTonnage:0,MaxAcceptableTonnage:0, MinATUnitID:0, NonOperationalDays:'', PerformBy:'', Operation:0}
   public RecyclerMaterialdata;
   
   //Data state master
		public statemasterreq = {Stateid:0, StateName:'', StateCode:'', PerformBy:'', Operation:0 };
		public statemasterdata;
		public DocStatusReq={ FormId:0,AutoCode:''};
		public DocStatusData;
	 
	 //city Data
	 public cityreq = {CityId:0, CityName:'', CityCode:'', PerformBy:'', Operation:0 };
	public citydata;

	//Suburb Data
	public suburbreq ={SuburbID:0, SuburbName:'', SuburbCode:'', CityId:0,PerformBy:'', Operation:0 };
	public suburbdata;

	public GetRecyclersSearchreq={TextToSearch:'',RecyclerName:'',AgreementStatusId:0};		
	public SearchDataRecyclerData;
	//Data status list
		public AgStatusListreq = {StatusId:0, StatusName:'', StatusType:'Aggrement', Comments:'', PerformBy:'', Operation:0 };
		public AggrementStatusdata;
	
	public StatusListreq = {StatusId:0, StatusName:'', StatusType:'Aggrement', Comments:'', PerformBy:'', Operation:0 };
		//public AggrementStatusdata;
	
	
   //Data Wastematerial 
   public wastematerailreq = {WasteMatId:0,  WasteMatCode:0, WasteMatName:'', WasteMatDescription:'', PerformBy:'', Operation:0 };
   public wastematerialdata;   
   
    //Data Waste type
	public wastetypesreq = {WasteMaterialTypeId:0,  WasteMaterialId:0, WasteTypeName:'', Comments:'', PerformBy:'', Operation:0 };
	//public wastetypereqData;
	
	
	//Data Material
	public materialunitreq = {MaterialUnitId:0, MaterialUnit:0, MaterialUnitCode:0, Comments:'', PerformBy:'', Operation:0 };
	public materialunitdata;   
	
	
	//Data Processing
	public processingtypereq = {ProcessingTypeId:0, ProcessingType:'', Comments:'', PerformBy:'', Operation:0};
	public processingtypedata;
	public CheckValidationForDeletereq={FormName:'Recycler',Id:0};
	//Recycle ststus
	public RecycleStatusListreq = {StatusId:0, StatusName:'', StatusType:'Recycler', Comments:'', PerformBy:'', Operation:0 };
	public RecyclerStatusdata;
	
		
	//Data GenerateCode
	public GenerateCodeNamereq={InputField:'',FormName:''};
	public GenerateCodeNameData;
	
	
	 ProcessingTypedownSettings={};
   
	
  
   
	DocUploadForm : FormGroup;
   RecyclerForm:FormGroup;
   RcMaterialForm:FormGroup;
   RecyclerSearchForm:FormGroup;
   submitted = false;
	loading = false;
	successmsg = false;
	
	public value = 4;
	public DocData;
	  //sameasabove
		public secName;
		public secDesig ;
		public SecCntTel ;
		public SecCntLandline ;
		public SecCntEmail;
	 
		base64string:any;
		base64string1:any;
		base64string2:any;
	OldPCBDocumentName:any;
	OldCertificateDocument:any;
	OldMaterialDocument:any;
	AggrementStatusdata1:any;
	AlertMessage: any;
	DispalayCreationDate;
	errormsg: boolean;
   constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,public datepipe: DatePipe,private router: Router,private excelService:ExcelService)

   { 
   this.GetRecycler();
   this.GetWastematerials();
   /* this.GetWastetype(); */
   this.GetMaterialUnit();
    this.GetProcessingtype();
	this.GetRecyclerMaterial();
	this.GetRecyclerStatus();
	 this.DisplayDate();
	 this.GetAgreementStatus();
	 this.GetAgreementStatus1();
	 this.GetDocTypesByFormId(this.value);
	 this.GetStateMappingStateRCForm(this.value);
	// this.GetCities();
	 //this.Getsuburb();
	 this.GetState(); 
	 //this.GetStateMappingState();


   }
   
   
  //Same as  above
  RedirectToRecyclerMaterial(RecylerId, RecyclerName)
  {
	  //this.dataService.setOption('WorkOrderId', WorkOrderId);  
	  localStorage.setItem('RecylerId', RecylerId);
	  localStorage.setItem('RecyclerName', RecyclerName);
  }
	toggleEditable(event) {
     if ( event.target.checked ) 
		{
		 this.RecyclerForm.controls['SecCntName'].setValue(this.f.PrimaryCntName.value);
		 this.RecyclerForm.controls['SecCntDesignation'].setValue(this.f.PrimaryCntDesignation.value);
		 this.RecyclerForm.controls['SecCntTelNo'].setValue(this.f.PrimaryCntTelNo.value);
		 this.RecyclerForm.controls['SecCntLandlineNo'].setValue(this.f.PrimaryCntLandlineNo.value);
		 this.RecyclerForm.controls['SecCntEmail'].setValue(this.f.PrimaryCntEmail.value);
        
		}
		else
		{
		this.RecyclerForm.controls['SecCntName'].setValue('');
		 this.RecyclerForm.controls['SecCntDesignation'].setValue('');
		 this.RecyclerForm.controls['SecCntTelNo'].setValue('');
		 this.RecyclerForm.controls['SecCntLandlineNo'].setValue('');
		 this.RecyclerForm.controls['SecCntEmail'].setValue('');
		}	
		
	}
	

  ngOnInit() {
	 // this.nav.show();
	 this.NoneAgreementStatusSelected =true;
		this.SignedSelected = false;
		this.TerminatedSelected = false;
		this.ShowBlock=false;

	   this.TodayDateC = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
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
	   this.RecyclerForm = this.formBuilder.group({
            RecyclerName: ['', Validators.required],
            RecylerCode: ['', Validators.required],
            Address: ['', Validators.required],
            Details: [''],
            //RecylingTypeEndProducts: ['', Validators.required],
            //NonOpDays: ['', Validators.required],
            GSTNo: ['', Validators.required],
            AgreementStatusId: ['', Validators.required],
           // PCBStatusId: [''],
			PrimaryCntName: ['', Validators.required],
            PrimaryCntDesignation: ['', Validators.required],
           PrimaryCntTelNo: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]+')]],
            PrimaryCntLandlineNo:['', Validators.pattern('[0-9]+')],
             PrimaryCntEmail: ['', [Validators.required,EmailValidator]],
            SecCntName: [''],
            SecCntDesignation: [''],
            SecCntTelNo:['',[Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]+')]],
            SecCntLandlineNo:['', Validators.pattern('[0-9]+')],
            SecCntEmail: [''],
			CheckboxSelect: [false],
           ExpiryDate: ['', Validators.required],
          // RecyclerStatusId: [0, Validators.required],
           PCBDocumentName: [''],
           CertificateDocument: [''],
           MaterialDocument: [''],
		   CreationDate:[''],
		   SignedDate :['',Validators.required],   
		    StateId: ['', Validators.required],
		   CityId: ['', Validators.required],
		   SuburbId: [0 ]
			          
        });

	   this.RcMaterialForm = this.formBuilder.group({
		   
 
           
            WasteMaterialId: ['', Validators.required],
			Rate: [0, Validators.required],
			MatUnitId: [0, Validators.required],
            ProcessingTypeId: ['', Validators.required],
           HandlingCapacity: [0, Validators.required],
           MaxAcceptableTonnage: [0, Validators.required],
           MinAcceptableTonnage: [0, Validators.required],
           NonOperationalDays: ['', Validators.required]
          
          
			            
        });
this.RecyclerSearchForm = this.formBuilder.group({
				
				FilterName:[''],				
				AgStatusNameId:[0],				
			});




			this.DocUploadForm =this.formBuilder.group({
				DocumentId : [0],
				FormId : [0],
				DocumentTypeId : [0, Validators.required],
				DocumentName : ['', Validators.required],
				DocumentDetails : [''],
				UserId : [''],
				Option : [''],
				DocGuid : [''],
				AutoCode : [''],
				Image:['']
			});
			
			
			this.ProcessingTypedownSettings={
			 singleSelection: false,
	      idField: 'ProcessingTypeId',
	      textField: 'ProcessingType',
	      selectAllText: 'Select All',
	      unSelectAllText: 'UnSelect All',
		}


  }
  
  
  
  
  SearchRecycler(searchValue : string)
	  {
		  this.RecyclerSearchForm.controls['AgStatusNameId'].setValue(0);
		  this.RecyclerSearchForm.controls['FilterName'].setValue('');
		  if(searchValue.length>1)
		  {
			  console.log("Call API");
			  this.GetRecyclersSearchreq.TextToSearch=searchValue;			  
			  this.GetRecyclersSearchreq.RecyclerName='';
			  this.GetRecyclersSearchreq.AgreementStatusId=0;
			  this.GetRecyclerNamesearch();
		  }
		  else
		  {
			  this.GetRecyclersSearchreq.TextToSearch='';
			  this.GetRecyclersSearchreq.RecyclerName='';
			  this.GetRecyclersSearchreq.AgreementStatusId=0;
			  this.GetRecyclerNamesearch();
		  }
		 
	  }
	  
	  
	   GetRecyclerNamesearch(){
		  
			 this.loading = true;
	        this.userService.GetRecyclersSearchCRUD(this.GetRecyclersSearchreq)
	           .pipe()
	            .subscribe(
	                (data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							 this.Recyclerdata=respData.Data;
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
		
		
		
		FilterOnName(value)
		{		
		  //this.MGNameList=undefined;
		  this.RecyclerSearchForm.controls['AgStatusNameId'].setValue(0);
		  this.GetRecyclersSearchreq.TextToSearch='';
		  this.GetRecyclersSearchreq.RecyclerName=value;
		  this.GetRecyclersSearchreq.AgreementStatusId=0;
		  this.GetRecyclerNamesearch();
		  
		}
		
		FilterOnAGStatus(value)
		{this.RecyclerSearchForm.controls['FilterName'].setValue('');
		  this.GetRecyclersSearchreq.TextToSearch='';
		  this.GetRecyclersSearchreq.RecyclerName='';
		  this.GetRecyclersSearchreq.AgreementStatusId=value;
		  this.GetRecyclerNamesearch();
		}

		//Display State
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
	   
	   
	   
	   GetStateMappingStateRCForm(value){
		  this.loading = true;
		   this.userService.GetCitiesByStateIdCRUD({StateId:value})
			  .pipe()
			   .subscribe(
				   (data:any) => {
					   var respData=data;
					   if(respData.s == 1)
					   {
						   this.citydata=respData.Data;
					//	   this.RecyclerForm.controls['CityId'].setValue(this.citydata[0].CityId);

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
	   
	   GetStateMappingState(){
			
		//reset function for multiselect
		/*  if(this.f.CityId.value!=null)
		 {
			 this.AggregatorForm.controls['CityId'].setValue(null);
			 this.aggregatorreq.CityId='';
			
		 } */
		
		
	  
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
	   
	   getRCFromsuburboncityId1(value){
	 
	  //this.WorkorderItemForm.controls['SuburbID'].setValue(0);

	 this.suburbreq = {SuburbID:0, SuburbName:'', SuburbCode:'', CityId:value,PerformBy:'', Operation:0 };
		this.loading = true;
	   this.userService.SuburbCRUD(this.suburbreq)
		  .pipe()
		   .subscribe(
			   (data:any) => {
				   var respData=data;
				   if(respData.s == 1)
				   {
						this.suburbdata=respData.Data;
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
   
   
 
 //cITY data
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
   
   //Suburb data
   Getsuburb(){
	 
		this.loading = true;
	   this.userService.SuburbCRUD(this.suburbreq)
		  .pipe()
		   .subscribe(
			   (data:any) => {
				   var respData=data;
				   if(respData.s == 1)
				   {
						this.suburbdata=respData.Data;
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
	  
  //Start Document Uplaod
   OpenDocument(url)
	{
		window.open(url, "_blank");
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
  //End Document Uplaod
  
   onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.RecyclerForm.invalid) {
            return;
        }
		
		this.recyclerreq.RecyclerName=this.f.RecyclerName.value;
		this.recyclerreq.RecylerCode=this.f.RecylerCode.value;
		this.recyclerreq.Address=this.f.Address.value;
		this.recyclerreq.Details=this.f.Details.value;
		//this.recyclerreq.RecylingTypeEndProducts=this.f.RecylingTypeEndProducts.value;
		this.recyclerreq.RecylingTypeEndProducts='';
		//this.recyclerreq.NonOpDays=this.f.NonOpDays.value;
		this.recyclerreq.GSTNo=this.f.GSTNo.value;
		this.recyclerreq.AgreementStatusId=this.f.AgreementStatusId.value;
		//this.recyclerreq.PCBStatusId=this.f.PCBStatusId.value;
		this.recyclerreq.PrimaryCntName=this.f.PrimaryCntName.value;
		this.recyclerreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
		this.recyclerreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
		this.recyclerreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
		this.recyclerreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;
		this.recyclerreq.SecCntName='';//this.f.SecCntName.value;
		this.recyclerreq.SecCntDesignation='';//this.f.SecCntDesignation.value;
		this.recyclerreq.SecCntTelNo='';//this.f.SecCntTelNo.value;
		this.recyclerreq.SecCntLandlineNo='';//this.f.SecCntLandlineNo.value;
		this.recyclerreq.SecCntEmail='';//this.f.SecCntEmail.value;
		this.recyclerreq.ExpiryDate=this.f.ExpiryDate.value;
		//this.recyclerreq.RecyclerStatusId=this.f.RecyclerStatusId.value;
			this.recyclerreq.RecyclerStatusId=0;

		this.recyclerreq.PCBDocumentFile=this.base64string;
		this.recyclerreq.CertificateDocumentFile=this.base64string1;
		this.recyclerreq.MaterialDocumentFile=this.base64string2;
		this.recyclerreq.PCBDocumentName=this.f.PCBDocumentName.value;
		this.recyclerreq.CertificateDocument=this.f.CertificateDocument.value;
		this.recyclerreq.MaterialDocument=this.f.MaterialDocument.value;
		this.recyclerreq.CreationDate=this.TodayDateC;
		this.recyclerreq.SignedDate =this.f.SignedDate.value;
		this.recyclerreq.StateId=this.f.StateId.value;
		this.recyclerreq.CityId=this.f.CityId.value;
		this.recyclerreq.SuburbId=this.f.SuburbId.value;
		this.recyclerreq.RecylerId=0;
		this.recyclerreq.PerformBy=localStorage.getItem('UserId');
		this.recyclerreq.Operation=1;
	 
		//this.ValidateDocStatus();
		if(this.f.AgreementStatusId.value == 11){

			this.AddUpdateDeleteRecycler();
		 }
		 else{
			this.ValidateDocStatus();
		 }


	}
	

	 EditRecycler(){
		if(this.f.AgreementStatusId.value == 11){

			this.AddUpdateDeleteRecycler();
		 }
		 else{
			this.ValidateDocStatus();
		 }
	 }

	 
	//Recycle Material Details
	 onSubmitRcmaterial() {
        this.submitted = true;
		
		
		
		// if(this.RCMaterialsreq.ProcessingTypeId=='' )
		// 	{
				
		// 		this.IsValidAGPT=false;
			
		// 		return;
		// 	}

        // stop here if form is invalid
        if (this.RcMaterialForm.invalid) {
            return;
        }
		
		this.RCMaterialsreq.RecylerId=this.recyclerreq.RecylerId;
		this.RCMaterialsreq.WasteMaterialId=this.g.WasteMaterialId.value;
		this.RCMaterialsreq.Rate=this.g.Rate.value;
		this.RCMaterialsreq.MatUnitId=this.g.MatUnitId.value;
		//this.RCMaterialsreq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		this.RCMaterialsreq.HandlingCapacity=this.g.HandlingCapacity.value;
		this.RCMaterialsreq.MaxAcceptableTonnage=this.g.MaxAcceptableTonnage.value;
		this.RCMaterialsreq.MinAcceptableTonnage=this.g.MinAcceptableTonnage.value;
		this.RCMaterialsreq.NonOperationalDays=this.g.NonOperationalDays.value;
	  
	  
	   this.RCMaterialsreq.RecyclerMatId=0;
	  this.RCMaterialsreq.PerformBy=localStorage.getItem('UserId');
	  this.RCMaterialsreq.Operation=1;
	 
      this.AddUpdateDeleteRCMaterial();
    }
	
	
	 /* Start ProcessingType Multiple select */
	   onItemSelect(item: any) {
	    console.log(item);
		
		if(this.RCMaterialsreq.ProcessingTypeId=='')
		{
			this.RCMaterialsreq.ProcessingTypeId=item.ProcessingTypeId;
		}
		else
		{
			this.RCMaterialsreq.ProcessingTypeId+=","+item.ProcessingTypeId;
		}
		console.log("indivisual selected Processing Type values :" + this.RCMaterialsreq.ProcessingTypeId);
	  }
	  onSelectAll(items: any) {
	    console.log(items);
		
		this.RCMaterialsreq.ProcessingTypeId='';
		

		for(var i=0; i<items.length;i++)
		{
			if (i==0)
			{
				this.RCMaterialsreq.ProcessingTypeId=items[i].ProcessingTypeId;
			}
			else
			{
				this.RCMaterialsreq.ProcessingTypeId+=','+items[i].ProcessingTypeId;
			}
		}
		console.log("selected Processing Type values :" + this.RCMaterialsreq.ProcessingTypeId);
		
	  }
	  
	  /* End Processing Type multiselect*/
	
	
	
  
  ResetFrom(){
		this.RecyclerForm.reset();
		this.RcMaterialForm.reset();
		this.successmsg = false;
		this.submitted =false;
		this.IsValidAGPT=true;
		this.base64string=undefined;
		this.ShowBlock =false;
		
		this.SignedSelected = false;
		this.TerminatedSelected = false;
	this.DocumentData=undefined;
	this.citydata=undefined;
this.suburbdata=undefined;
		jQuery("#myModal").modal("hide");
			jQuery("#myModaledit").modal("hide");
	}
	
	GenerateRCCode(value)
		{
			this.RecyclerForm.controls['CreationDate'].setValue(this.TodayDateC);
			console.log("RC CODe :"+value.substring(0,4));
			this.GenerateCodeNamereq.InputField=value.substring(0,4);
			this.GenerateCodeNamereq.FormName='Recyclers';
			this.GetGenerateCode();			
		}
	
	
	resetValue() {
    this.RecyclerForm.controls['ExpiryDate'].setValue(this.currentDate());
  }
  
  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }
  
  
  //Recycle Material Fetch Primary IDData
	GetRecyclerMaterialId(RecylerId,RecyclerName)
	{		 		 
	  this.recyclerreq.RecylerId=RecylerId;
	  this.RecyclerName=RecyclerName;
	  this.GetRecyclerMaterial();
	}
	
	//Display Date
DisplayDate()
{
	const TodayDate = Date.now();
	//this.DispalayDate= ExpiryDate
this.TodayDate = this.datepipe.transform(this.TodayDate, 'yyyy-MM-dd');
} 
 
  
  
   EditRecyclerData(RecyclerName,RecylerCode,Address,Details,RecylingTypeEndProducts,GSTNo,AgreementStatusId,ExpiryDate,PrimaryCntName,PrimaryCntDesignation,PrimaryCntTelNo,PrimaryCntLandlineNo,PrimaryCntEmail,SecCntName,SecCntDesignation,SecCntTelNo,SecCntLandlineNo,SecCntEmail,RecylerId,PCBDocumentName,CertificateDocument,MaterialDocument,CreationDate,SignedDate,StateId,CityId,SuburbId)
   
	{
	//	this.GetStateMappingState();
	this.GetStateMappingStateRCForm(StateId);
		//var newDate1= new Date(SignedDate);
		this.ViewDocumentReq=RecylerCode;
		this.ViewDocument(this.ViewDocumentReq);
		this.successmsg = false;	
		this.errormsg=false;	
		//this.base64string=undefined;
		//this.base64string1=undefined;
		//this.base64string2=undefined;
		this.RecyclerForm.controls['RecyclerName'].setValue(RecyclerName);
		this.RecyclerForm.controls['RecylerCode'].setValue(RecylerCode);
		this.RecyclerForm.controls['Address'].setValue(Address);
		this.RecyclerForm.controls['Details'].setValue(Details);
		//this.RecyclerForm.controls['RecylingTypeEndProducts'].setValue(RecylingTypeEndProducts);
		//this.RecyclerForm.controls['NonOpDays'].setValue(NonOpDays);
		this.RecyclerForm.controls['GSTNo'].setValue(GSTNo);
		this.RecyclerForm.controls['AgreementStatusId'].setValue(AgreementStatusId);
	//	this.RecyclerForm.controls['RecyclerStatusId'].setValue(RecyclerStatusId);
		
		//this.RecyclerForm.controls['PCBStatusId'].setValue(PCBStatusId);
		this.RecyclerForm.controls['PrimaryCntName'].setValue(PrimaryCntName);
		this.RecyclerForm.controls['PrimaryCntDesignation'].setValue(PrimaryCntDesignation);
		this.RecyclerForm.controls['PrimaryCntTelNo'].setValue(PrimaryCntTelNo);
		this.RecyclerForm.controls['PrimaryCntLandlineNo'].setValue(PrimaryCntLandlineNo);
		this.RecyclerForm.controls['PrimaryCntEmail'].setValue(PrimaryCntEmail);
		this.RecyclerForm.controls['SecCntName'].setValue(SecCntName);
		this.RecyclerForm.controls['SecCntDesignation'].setValue(SecCntDesignation);
		this.RecyclerForm.controls['SecCntTelNo'].setValue(SecCntTelNo);
		this.RecyclerForm.controls['SecCntLandlineNo'].setValue(SecCntLandlineNo);
		this.RecyclerForm.controls['SecCntEmail'].setValue(SecCntEmail);
		this.RecyclerForm.controls['StateId'].setValue(StateId);
		this.RecyclerForm.controls['CityId'].setValue(CityId);
		this.RecyclerForm.controls['SuburbId'].setValue(SuburbId);
		
		if(PCBDocumentName!="" && PCBDocumentName!=undefined)
		{
			var FileName=PCBDocumentName.split('/');
			this.OldPCBDocumentName=FileName[FileName.length-1];
		}
		
		
		if(CertificateDocument!="" && CertificateDocument!=undefined)
		{
			var FileName=CertificateDocument.split('/');
			this.OldCertificateDocument=FileName[FileName.length-1];
		}
		
		
		if(MaterialDocument!="" && MaterialDocument!=undefined)
		{
			var FileName=MaterialDocument.split('/');
			this.OldMaterialDocument=FileName[FileName.length-1];
		}
		
		
		 this.recyclerreq.RecyclerName=this.f.RecyclerName.value;
		 this.recyclerreq.RecylerCode=this.f.RecylerCode.value;
		 this.recyclerreq.Address=this.f.Address.value;
		 this.recyclerreq.Details=this.f.Details.value;
		// this.recyclerreq.RecylingTypeEndProducts=this.f.RecylingTypeEndProducts.value;
		 this.recyclerreq.RecylingTypeEndProducts='';

		 //this.recyclerreq.NonOpDays=this.f.NonOpDays.value;
		 this.recyclerreq.GSTNo=this.f.GSTNo.value;
		 this.recyclerreq.AgreementStatusId=this.f.AgreementStatusId.value;
		//  this.recyclerreq.RecyclerStatusId=this.f.RecyclerStatusId.value;
		  this.recyclerreq.RecyclerStatusId=0;


		 this.DispalayDate= ExpiryDate;
		 this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		 this.recyclerreq.ExpiryDate=this.DispalayDate;
		 this.RecyclerForm.controls['ExpiryDate'].setValue(this.DispalayDate);
	
	
		 this.DispalayCreationDate=CreationDate;
		  this.DispalayCreationDate= this.datepipe.transform( this.DispalayCreationDate, 'yyyy-MM-dd');
		  this.recyclerreq.CreationDate=this.DispalayCreationDate;
		  this.RecyclerForm.controls['CreationDate'].setValue(this.DispalayCreationDate);
	
		  
			this.DisplaySignedDate= SignedDate;
		 this.DisplaySignedDate= this.datepipe.transform(this.DisplaySignedDate, 'yyyy-MM-dd');
		 this.recyclerreq.SignedDate=this.DisplaySignedDate
		 this.RecyclerForm.controls['SignedDate'].setValue(this.DisplaySignedDate);

	
		// this.recyclerreq.PCBStatusId=this.f.PCBStatusId.value;
		this.recyclerreq.PrimaryCntName=this.f.PrimaryCntName.value;
		this.recyclerreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
		this.recyclerreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
		this.recyclerreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
		this.recyclerreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;
		this.recyclerreq.SecCntName=this.f.SecCntName.value;
		this.recyclerreq.SecCntDesignation=this.f.SecCntDesignation.value;
		this.recyclerreq.SecCntTelNo=this.f.SecCntTelNo.value;
		this.recyclerreq.SecCntLandlineNo=this.f.SecCntLandlineNo.value;
		this.recyclerreq.SecCntEmail=this.f.SecCntEmail.value;
		this.recyclerreq.StateId=this.f.StateId.value;
		this.recyclerreq.CityId=this.f.CityId.value;
		this.recyclerreq.SuburbId=this.f.SuburbId.value;
	    this.recyclerreq.RecylerId=RecylerId;
	    this.recyclerreq.PerformBy=localStorage.getItem('UserId');
		this.recyclerreq.Operation=2;
		
		this.GetAgreementValue(AgreementStatusId);
	
		this.getRCFromsuburboncityId1(CityId);
		//this.GetCityByStateId(StateId,CityId);

	}
	
	GetCityByStateId(value,CityId){
		
		//reset function
		
	  
		 this.loading = true;
		this.userService.GetCitiesByStateIdCRUD({StateId:value})
		   .pipe()
			.subscribe(
				(data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						this.citydata=respData.Data;
						
						
						this.fillcitydata(CityId);
						
						
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


	fillcitydata(CityId)
	{
		if(CityId.search(",")>=0)
		{
			var selectedcitiesids=CityId.split(',');
			var SelectedCities=[];
			for(var i=0;i<selectedcitiesids.length;i++)
			{
				for(var j=0;j<this.citydata.length;j++)
				{
					if(selectedcitiesids[i]==this.citydata[j].CityId)
					{
						SelectedCities.push(this.citydata[j]);
					}
				}
			}
			console.log("test");
			this.RecyclerForm.controls['CityId'].setValue(SelectedCities);
		}
	}




   DeleteRecyclerData(RecyclerName,RecylerCode,Address,Details,RecylingTypeEndProducts,GSTNo,AgreementStatusId,ExpiryDate,PrimaryCntName,PrimaryCntDesignation,PrimaryCntTelNo,PrimaryCntLandlineNo,PrimaryCntEmail,SecCntName,SecCntDesignation,SecCntTelNo,SecCntLandlineNo,SecCntEmail,RecylerId,PCBDocumentName,CertificateDocument,MaterialDocument,SignedDate,StateId,CityId,SuburbId,CreationDate)
	{
		
	//	var newDate1= new Date(SignedDate);
		this.RecyclerForm.controls['RecyclerName'].setValue(RecyclerName);
		this.RecyclerForm.controls['RecylerCode'].setValue(RecylerCode);
		this.RecyclerForm.controls['Address'].setValue(Address);
		this.RecyclerForm.controls['Details'].setValue(Details);
		//this.RecyclerForm.controls['RecylingTypeEndProducts'].setValue(RecylingTypeEndProducts);
		//this.RecyclerForm.controls['NonOpDays'].setValue(NonOpDays);
		this.RecyclerForm.controls['GSTNo'].setValue(GSTNo);
		this.RecyclerForm.controls['AgreementStatusId'].setValue(AgreementStatusId);
		//this.RecyclerForm.controls['RecyclerStatusId'].setValue(RecyclerStatusId);
		this.RecyclerForm.controls['ExpiryDate'].setValue(ExpiryDate);
		//this.RecyclerForm.controls['PCBStatusId'].setValue(PCBStatusId);
		this.RecyclerForm.controls['PrimaryCntName'].setValue(PrimaryCntName);
		this.RecyclerForm.controls['PrimaryCntDesignation'].setValue(PrimaryCntDesignation);
		this.RecyclerForm.controls['PrimaryCntTelNo'].setValue(PrimaryCntTelNo);
		this.RecyclerForm.controls['PrimaryCntLandlineNo'].setValue(PrimaryCntLandlineNo);
		this.RecyclerForm.controls['PrimaryCntEmail'].setValue(PrimaryCntEmail);
		this.RecyclerForm.controls['SecCntName'].setValue(SecCntName);
		this.RecyclerForm.controls['SecCntDesignation'].setValue(SecCntDesignation);
		this.RecyclerForm.controls['SecCntTelNo'].setValue(SecCntTelNo);
		this.RecyclerForm.controls['SecCntLandlineNo'].setValue(SecCntLandlineNo);
		this.RecyclerForm.controls['SecCntEmail'].setValue(SecCntEmail);
		this.RecyclerForm.controls['StateId'].setValue(StateId);
		this.RecyclerForm.controls['CityId'].setValue(CityId);
		this.RecyclerForm.controls['SuburbId'].setValue(SuburbId);

		/*if(PCBDocumentName!="" && PCBDocumentName!=undefined)
		{
			var FileName=PCBDocumentName.split('/');
			this.RecyclerForm.controls['PCBDocumentName'].setValue(FileName[FileName.length-1]);
		}*/
		this.CheckValidationForDeletereq.Id=RecylerId;
		 this.recyclerreq.RecyclerName=this.f.RecyclerName.value;
		 this.recyclerreq.RecylerCode=this.f.RecylerCode.value;
		 this.recyclerreq.Address=this.f.Address.value;
		 this.recyclerreq.Details=this.f.Details.value;
		// this.recyclerreq.RecylingTypeEndProducts=this.f.RecylingTypeEndProducts.value;
		 this.recyclerreq.RecylingTypeEndProducts='';
		 //this.recyclerreq.NonOpDays=this.f.NonOpDays.value;
		 this.recyclerreq.GSTNo=this.f.GSTNo.value;
		 this.recyclerreq.AgreementStatusId=this.f.AgreementStatusId.value;
		// this.recyclerreq.RecyclerStatusId=this.f.RecyclerStatusId.value;
		 this.recyclerreq.RecyclerStatusId=0;
		 this.recyclerreq.ExpiryDate=this.f.ExpiryDate.value;
		 this.DispalayDate= ExpiryDate
		this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
	//	 this.recyclerreq.PCBStatusId=this.f.PCBStatusId.value;
		this.recyclerreq.PrimaryCntName=this.f.PrimaryCntName.value;
		this.recyclerreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
		this.recyclerreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
		this.recyclerreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
		this.recyclerreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;
		this.recyclerreq.SecCntName=this.f.SecCntName.value;
		this.recyclerreq.SecCntDesignation=this.f.SecCntDesignation.value;
		this.recyclerreq.SecCntTelNo=this.f.SecCntTelNo.value;
		this.recyclerreq.SecCntLandlineNo=this.f.SecCntLandlineNo.value;
		this.recyclerreq.SecCntEmail=this.f.SecCntEmail.value;
		this.recyclerreq.StateId=this.f.StateId.value;
		this.recyclerreq.CityId=this.f.CityId.value;
		this.recyclerreq.SuburbId=this.f.SuburbId.value;

		 //Signed Date Starts
		 this.DispalayDate= ExpiryDate;
		 this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		 this.recyclerreq.ExpiryDate=this.DispalayDate;
		 this.RecyclerForm.controls['ExpiryDate'].setValue(this.DispalayDate);
	
	
		 this.DispalayCreationDate=CreationDate;
		  this.DispalayCreationDate= this.datepipe.transform( this.DispalayCreationDate, 'yyyy-MM-dd');
		  this.recyclerreq.CreationDate=this.DispalayCreationDate;
		  this.RecyclerForm.controls['CreationDate'].setValue(this.DispalayCreationDate);
	
		  
			this.DisplaySignedDate= SignedDate;
		 this.DisplaySignedDate= this.datepipe.transform(this.DisplaySignedDate, 'yyyy-MM-dd');
		 this.recyclerreq.SignedDate=this.DisplaySignedDate
		 this.RecyclerForm.controls['SignedDate'].setValue(this.DisplaySignedDate);


		
		 
	  this.recyclerreq.RecylerId=RecylerId;
	  this.recyclerreq.PerformBy=localStorage.getItem('UserId');
	  this.recyclerreq.Operation=3;
	}
	
	
	//Recycle Aggrement Status
	GetAgreementStatus(){
		  
			 this.loading = true;
	        this.userService.StatusListCRUD(this.AgStatusListreq)
	           .pipe()
	            .subscribe(
	                (data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							 this.AggrementStatusdata=respData.Data;
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
		
		
		
		/* Start Generate code*/
		GetGenerateCode(){
		  
			 this.loading = true;
	        this.userService.GetGenerateCodeName(this.GenerateCodeNamereq)
	           .pipe()
	            .subscribe(
	                (data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							this.RecyclerForm.controls['RecylerCode'].setValue(respData.Data);
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
		
		/* End Generate code*/
		
		
	
	GetRecyclerStatus(){
	  
		 this.loading = true;
        this.userService.StatusListCRUD(this.RecycleStatusListreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.RecyclerStatusdata=respData.Data;
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
	
  
   GetRecycler(){
	  
		 this.loading = true;
        this.userService.recyclerCRUD(this.recyclerreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.Recyclerdata=respData.Data;
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
	get g() { return this.RcMaterialForm.controls; }
	get d() { return this.DocUploadForm.controls; }
		get f() { return this.RecyclerForm.controls; }
		get h() { return this.RecyclerSearchForm.controls; }
	
	AddUpdateDeleteRecycler(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.RecyclerForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		this.recyclerreq.RecyclerName=this.f.RecyclerName.value;
		this.recyclerreq.RecylerCode=this.f.RecylerCode.value;
		this.recyclerreq.Address=this.f.Address.value;
		this.recyclerreq.Details=this.f.Details.value;
		//this.recyclerreq.RecylingTypeEndProducts=this.f.RecylingTypeEndProducts.value;
		this.recyclerreq.RecylingTypeEndProducts='';
		//this.recyclerreq.NonOpDays=this.f.NonOpDays.value;
		this.recyclerreq.GSTNo=this.f.GSTNo.value;
		//this.recyclerreq.PCBStatusId=this.f.PCBStatusId.value;
		this.recyclerreq.AgreementStatusId=this.f.AgreementStatusId.value;
		this.recyclerreq.RecyclerStatusId=0;

		// this.recyclerreq.RecyclerStatusId=this.f.RecyclerStatusId.value;
		this.recyclerreq.PrimaryCntName=this.f.PrimaryCntName.value;
		this.recyclerreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
		this.recyclerreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
		this.recyclerreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
		this.recyclerreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;
		this.recyclerreq.SecCntName=this.f.SecCntName.value;
		this.recyclerreq.SecCntDesignation=this.f.SecCntDesignation.value;
		this.recyclerreq.SecCntTelNo=this.f.SecCntTelNo.value;
		this.recyclerreq.SecCntLandlineNo=this.f.SecCntLandlineNo.value;
		this.recyclerreq.SecCntEmail=this.f.SecCntEmail.value;
		this.recyclerreq.ExpiryDate=this.datepipe.transform(this.recyclerreq.ExpiryDate, 'yyyy-MM-dd');
		this.recyclerreq.CreationDate=this.f.CreationDate.value;
		this.recyclerreq.PCBDocumentName=this.f.PCBDocumentName.value;
		this.recyclerreq.PCBDocumentFile=this.base64string;
		this.recyclerreq.CertificateDocument=this.f.CertificateDocument.value;
		this.recyclerreq.CertificateDocumentFile=this.base64string1;
		this.recyclerreq.MaterialDocument=this.f.MaterialDocument.value;
		this.recyclerreq.MaterialDocumentFile=this.base64string2;
		this.recyclerreq.StateId=this.f.StateId.value;
		this.recyclerreq.CityId=this.f.CityId.value;
		this.recyclerreq.SuburbId=this.f.SuburbId.value;

		if(this.recyclerreq.SuburbId == null){
			this.recyclerreq.SuburbId = 0;
		}
		else{
			this.recyclerreq.SuburbId=this.f.SuburbId.value;
		}


        this.userService.recyclerCRUD(this.recyclerreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.Recyclerdata=respData.Data;
						// this.alertService.success(''+respData.m, true);
		
						this.AlertMessage=respData.m;
						// jQuery("#AddRecyclerWesteMaterial").modal("hide");
						jQuery("#myModal").modal("hide");
						this.ResetFrom();
						jQuery("#myModaledit").modal("hide");
						jQuery("#AddRecyclerWesteMaterial").modal("hide");
						jQuery("#myModaleditRecylerMaterial").modal("hide");

						
						if(this.recyclerreq.Operation==1)
						{
							localStorage.setItem('RecylerId', this.Recyclerdata[0].RecylerId);

						   localStorage.setItem('RecyclerName', this.Recyclerdata[0].RecyclerName);
						   localStorage.setItem('RecylerCode', this.Recyclerdata[0].RecylerCode);

							   


						   jQuery("#myModal").modal("hide");
						   jQuery("#myModaledit").modal("hide");
						  // jQuery("#myModaleditMaterial").modal("show");
						   this.recyclerreq.RecylerId=this.Recyclerdata[0].RecylerId;
						   this.RecyclerName=this.Recyclerdata[0].RecyclerName;
						   jQuery("#myModalconfirmation").modal("show");
						   this.GetRecyclerMaterial();

						//this.router.navigate(['/Recycler-AddMaterial']);
						}
						else
						{
							this.AlertMessage=respData.m;
							jQuery("#myModal").modal("hide");
							jQuery("#myModaledit").modal("hide");
							jQuery("#myModalalert").modal("show");
						}

					}
					else{
						this.alertService.error(''+ respData.m, true);
						
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
	RedirectToSubForm(){
		jQuery("#myModalconfirmation").modal("hide");

		this.router.navigate(['/Recycler-AddMaterial'], {queryParams:{title:'true'}});
	
		
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
	

		/*  GetWastetype(){
	  
		 this.loading = true;
        this.userService.wastetypesCRUD(this.wastetypesreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.wastetypereqData=respData.Data;
					
					}
					else{
						this.alertService.success(''+ respData.m, true);
						
					} 
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
	} */

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
		
		
	 GetProcessingtype(){
	  
		 this.loading = true;
        this.userService.processingtypeCRUD(this.processingtypereq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.processingtypedata=respData.Data;
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
	
	//Display Code Recycle Material 
	 GetRecyclerMaterial(){
		 
		this.RCMaterialsreq.Operation=0; 
	  this.RCMaterialsreq.RecylerId=this.recyclerreq.RecylerId;
	  
		 this.loading = true;
        this.userService.RCMaterialCRUD(this.RCMaterialsreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.RecyclerMaterialdata=respData.Data;
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
	
	//Crud Operation In Recycle Material Details

	EditRecyclerMaterialData(WasteMaterialId,Rate,MatUnitId,ProcessingTypeId,HandlingCapacity,MaxAcceptableTonnage,MinAcceptableTonnage,NonOperationalDays,RecyclerMatId)
	{
		
		this.successmsg = false;
		this.errormsg=false;
		this.RcMaterialForm.controls['WasteMaterialId'].setValue(WasteMaterialId);
		this.RcMaterialForm.controls['Rate'].setValue(Rate);
		this.RcMaterialForm.controls['MatUnitId'].setValue(MatUnitId);
		this.RcMaterialForm.controls['HandlingCapacity'].setValue(HandlingCapacity);
		this.RcMaterialForm.controls['MaxAcceptableTonnage'].setValue(MaxAcceptableTonnage);
		this.RcMaterialForm.controls['MinAcceptableTonnage'].setValue(MinAcceptableTonnage);
		this.RcMaterialForm.controls['NonOperationalDays'].setValue(NonOperationalDays);
		//this.RcMaterialForm.controls['ProcessingTypeId'].setValue(ProcessingTypeId);
		//jQuery("#AddRecyclerWesteMaterial").modal("hide");
		//jQuery("#myModalalert").modal("show");
		this.RCMaterialsreq.ProcessingTypeId='';
				if(ProcessingTypeId.search(",")>=0)
			{
				var FocusProcessingTypeId=ProcessingTypeId.split(',');
				var SelectedProcessingType=[];
				for(var i=0;i<FocusProcessingTypeId.length;i++)
				{

					for(var j=0;j<this.processingtypedata.length;j++)
					{
						if(FocusProcessingTypeId[i]==this.processingtypedata[j].ProcessingTypeId)
						{
							SelectedProcessingType.push(this.processingtypedata[j]);
						}
					}
				}
			
				this.RcMaterialForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType);
			}
	
			else
			{
				var SelectedProcessingType1=[];
				for(var j=0;j<this.processingtypedata.length;j++)
					{
						if(ProcessingTypeId==this.processingtypedata[j].ProcessingTypeId)
						{
							SelectedProcessingType1.push(this.processingtypedata[j]);
						}
					}
				// SelectedProcessingType1.push(ProcessingTypeId);
				console.log("test:" + ProcessingTypeId);
				this.RcMaterialForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType1);
				this.RCMaterialsreq.ProcessingTypeId=ProcessingTypeId;
			}
	
	
		
		this.RCMaterialsreq.WasteMaterialId=this.g.WasteMaterialId.value;
		this.RCMaterialsreq.Rate=this.g.Rate.value;
		this.RCMaterialsreq.MatUnitId=this.g.MatUnitId.value;
		//this.RCMaterialsreq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		this.RCMaterialsreq.HandlingCapacity=this.g.HandlingCapacity.value;
		this.RCMaterialsreq.MaxAcceptableTonnage=this.g.MaxAcceptableTonnage.value;
		this.RCMaterialsreq.MinAcceptableTonnage=this.g.MinAcceptableTonnage.value;
		this.RCMaterialsreq.NonOperationalDays=this.g.NonOperationalDays.value;
		this.RCMaterialsreq.RecyclerMatId=RecyclerMatId;
		this.RCMaterialsreq.PerformBy=localStorage.getItem('UserId');
		this.RCMaterialsreq.Operation=2;
	
	}
	
	
	DeleteRecyclerMaterialData(WasteMaterialId,Rate,MatUnitId,ProcessingTypeId,HandlingCapacity,MaxAcceptableTonnage,MinAcceptableTonnage,NonOperationalDays,RecyclerMatId)
	{
		
		this.RcMaterialForm.controls['WasteMaterialId'].setValue(WasteMaterialId);
		this.RcMaterialForm.controls['Rate'].setValue(Rate);
		this.RcMaterialForm.controls['MatUnitId'].setValue(MatUnitId);
	//this.RcMaterialForm.controls['ProcessingTypeId'].setValue(ProcessingTypeId);
	this.RcMaterialForm.controls['HandlingCapacity'].setValue(HandlingCapacity);
	this.RcMaterialForm.controls['MaxAcceptableTonnage'].setValue(MaxAcceptableTonnage);
	this.RcMaterialForm.controls['MinAcceptableTonnage'].setValue(MinAcceptableTonnage);
	this.RcMaterialForm.controls['NonOperationalDays'].setValue(NonOperationalDays);
		
	//this.RCMaterialsreq.ProcessingTypeId='';

	if(ProcessingTypeId.search(",")>=0)
	{
		var FocusProcessingType=ProcessingTypeId.split(',');
		var SelectedProcessingType=[];
		for(var i=0;i<FocusProcessingType.length;i++)
		{
			for(var j=0;j<this.processingtypedata.length;j++)
			{
				if(FocusProcessingType[i]==this.processingtypedata[j].ProcessingTypeId)
				{
					SelectedProcessingType.push(this.processingtypedata[j]);
				}
			}
		}
		console.log("test");
		this.RcMaterialForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType);
	}
	else
			{
				var SelectedProcessingType1=[];
				for(var j=0;j<this.processingtypedata.length;j++)
					{
						if(ProcessingTypeId==this.processingtypedata[j].ProcessingTypeId)
						{
							SelectedProcessingType1.push(this.processingtypedata[j]);
						}
					}
				// SelectedProcessingType1.push(ProcessingTypeId);
				console.log("test:" + ProcessingTypeId);
				this.RcMaterialForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType1);
				this.RCMaterialsreq.ProcessingTypeId=ProcessingTypeId;
			}


		this.RCMaterialsreq.WasteMaterialId=this.g.WasteMaterialId.value;
		this.RCMaterialsreq.Rate=this.g.Rate.value;
		this.RCMaterialsreq.MatUnitId=this.g.MatUnitId.value;
		//this.RCMaterialsreq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		this.RCMaterialsreq.HandlingCapacity=this.g.HandlingCapacity.value;
		this.RCMaterialsreq.MaxAcceptableTonnage=this.g.MaxAcceptableTonnage.value;
		this.RCMaterialsreq.NonOperationalDays=this.g.NonOperationalDays.value;
		this.RCMaterialsreq.MinAcceptableTonnage=this.g.MinAcceptableTonnage.value;
		
		
		
		 
	  this.RCMaterialsreq.RecyclerMatId=RecyclerMatId;
	  this.RCMaterialsreq.PerformBy=localStorage.getItem('UserId');
	  this.RCMaterialsreq.Operation=3;
	}
	


	AddUpdateDeleteRCMaterial(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.RcMaterialForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		 
		
		this.RCMaterialsreq.RecylerId=this.recyclerreq.RecylerId;
		this.RCMaterialsreq.WasteMaterialId=this.g.WasteMaterialId.value;
		this.RCMaterialsreq.Rate=this.g.Rate.value;
		this.RCMaterialsreq.MatUnitId=this.g.MatUnitId.value;
		//this.RCMaterialsreq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		this.RCMaterialsreq.HandlingCapacity=this.g.HandlingCapacity.value;
		this.RCMaterialsreq.MaxAcceptableTonnage=this.g.MaxAcceptableTonnage.value;
		this.RCMaterialsreq.MinAcceptableTonnage=this.g.MinAcceptableTonnage.value;
		this.RCMaterialsreq.NonOperationalDays=this.g.NonOperationalDays.value;
		this.RCMaterialsreq.ProcessingTypeId = "";
		for (let i = 0; i < this.g.ProcessingTypeId.value.length; i++) {
			if(this.RCMaterialsreq.ProcessingTypeId == "")
			{
		      this.RCMaterialsreq.ProcessingTypeId= this.g.ProcessingTypeId.value[i].ProcessingTypeId.toString() ; 
			}
			else
			{
	   	this.RCMaterialsreq.ProcessingTypeId= this.RCMaterialsreq.ProcessingTypeId + ',' + this.g.ProcessingTypeId.value[i].ProcessingTypeId.toString() ;  
			}
		}
        this.userService.RCMaterialCRUD(this.RCMaterialsreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.RecyclerMaterialdata=respData.Data;
						// this.alertService.success(''+respData.m, true);
						
						jQuery("#myModaleditMaterial").modal("hide");
						jQuery("#AddRecyclerWesteMaterial").modal("hide");
						jQuery("#myModaleditRecylerMaterial").modal("hide");

						
						
						this.ResetFrom();
						jQuery("#myModalalert").modal("show");
						
						
					}
					else{
						this.alertService.error(''+ respData.m, true);
						
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
	
	DeleteRCMaterial(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		 
		
		 
		
		this.RCMaterialsreq.RecylerId=this.recyclerreq.RecylerId;
		this.RCMaterialsreq.WasteMaterialId=this.g.WasteMaterialId.value;
		this.RCMaterialsreq.Rate=this.g.Rate.value;
		this.RCMaterialsreq.MatUnitId=this.g.MatUnitId.value;
		//this.RCMaterialsreq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		this.RCMaterialsreq.HandlingCapacity=this.g.HandlingCapacity.value;
		this.RCMaterialsreq.MaxAcceptableTonnage=this.g.MaxAcceptableTonnage.value;
		this.RCMaterialsreq.MinAcceptableTonnage=this.g.MinAcceptableTonnage.value;
		this.RCMaterialsreq.NonOperationalDays=this.g.NonOperationalDays.value;
		
        this.userService.RCMaterialCRUD(this.RCMaterialsreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.RecyclerMaterialdata=respData.Data;
						// this.alertService.success(''+respData.m, true);
						jQuery("#myModaleditMaterial").modal("hide");
						jQuery("#AddRecyclerWesteMaterial").modal("hide");
						jQuery("#myModaleditRecylerMaterial").modal("hide");

						
						
						this.ResetFrom();
						jQuery("#myModalalert").modal("show");
					}
					else{
						this.alertService.error(''+ respData.m, true);
						
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
	
	
	print() {
			
			// window.print();
			//this.AvoidPrint=false;
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title></title>
          <style>
         .doNotPrint{display:none !important;}
		 table {
    border:solid #000 !important;
    border-width:1px 0 0 1px !important;
}
th, td {
    border:solid #000 !important;
    border-width:0 1px 1px 0 !important;
}
.padding-left-right-150{
	padding:5px 150px !important;
   
  }
  .address10{
	position: relative;
	height: 64px;
	width: 349px;
	padding: 0;
	margin: 0 5px 0 5px;
	text-decoration: none;
	word-break: break-all;
  }
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
		
	exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.Recyclerdata, 'Recycler Report');
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

  UploadDocument()
  {
	  this.submitted = true;
this.DocUploadForm.controls['Image'].setValue(this.base64string);
        // stop here if form is invalid
        if (this.DocUploadForm.invalid) {
            return;
        }
		
		this.Docreq.AutoCode=this.f.RecylerCode.value;
		this.Docreq.DocumentTypeId=this.d.DocumentTypeId.value;
		this.Docreq.DocumentName=this.d.DocumentName.value;
		this.Docreq.DocumentDetails=this.d.DocumentDetails.value;
		this.Docreq.FormId=this.value;
		this.Docreq.Image=this.base64string;
		this.Docreq.DocGuid='Recycler';
		this.Docreq.UserId=this.UserId;
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
		this.Docreq.AutoCode=this.ViewDocumentReq;
		this.Docreq.FormId = this.value;
		
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
					this.AlertMessage="Document Deleted Sucessfully";
					//this.alertService.success(''+ respData.m, true);
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
		//this.ManufactureForm.controls['ExpiryDate'].setValue(Date.now());
		this.RecyclerForm.controls['ExpiryDate'].setValue(today);
		this.RecyclerForm.controls['SignedDate'].setValue(today);

 
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
ValidateDocStatus()
{
	this.DocStatusReq.FormId=this.value;
	this.DocStatusReq.AutoCode=this.f.RecylerCode.value;
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
						 this.AddUpdateDeleteRecycler();
					}
					else
					{
						this.AlertMessage=this.DocStatusData;
						jQuery("#myModalalert").modal("show");
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




CheckValidationForDelete()
{
	  
		
this.loading = true;
this.userService.CheckValidationForDelete(this.CheckValidationForDeletereq)
  .pipe()
   .subscribe(
	   (data:any) => {
		   var respData=data;
		   if(respData.s == 1)
		   {
				
			   if(respData.Data=='Success')
			   {
				this.AddUpdateDeleteRecycler();
			   }
			   else{
				this.AlertMessage=respData.m;
				jQuery("#myModalalert").modal("show");
			   }

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
