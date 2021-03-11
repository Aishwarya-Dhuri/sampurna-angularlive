import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,EmailValidator } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService,ExcelService } from '../_services';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
declare var jQuery:any; 

@Component({
  selector: 'app-aggregator-enrolment',
  templateUrl: './aggregator-enrolment.component.html',
  styleUrls: ['./aggregator-enrolment.component.css']
})
export class AggregatorEnrolmentComponent implements OnInit {
	public AlertMessage;
	UserId=localStorage.getItem('UserId');
	interval;
	SignedSelected: boolean;
	TerminatedSelected: boolean;
	public DisplaySignedDate;

	public NoneAgreementStatusSelected =true;
		//Multiple validation
		IsValidAGCT:boolean=true;
		IsValidAGSB:boolean=true;
		IsValidAGPT:boolean=true;
		public processingtypedata1;
	public TodayDateC ;
	dropdownList = [];
   CitydropdownSettings = {};
  SuburbdropdownSettings = {};
 public DispalayCreationDate;
   //ProcessingTypedropdownSettings={};
   ProcessingTypedownSettings={};
   base64string:any;
	public value = 2;
	public DocData;
	public DocStatusReq={ FormId:0,AutoCode:''};
	public DocStatusData;
public ViewDocumentReq;
  public Docreq = {DocumentId :0, FormId :0 ,DocumentTypeId :0 , DocumentName  :'' ,Image  :'' , DocumentDetails :'', UserId :'', Option :'', DocGuid :'Aggregator', AutoCode :''};
  public DocumentData;
  DocUploadForm : FormGroup;
  public GetNamesByCityIdreq={FormName:'Aggregators',CityId:0};
		public aggregatorreq = {AggregatorId:0, AGCode:'', AGName:'', Address:'',AGDetails:'',GSTNo:'',AgreementStatusId:0,ExpiryDate:'',PrimaryCntName:'',PrimaryCntDesignation:'',PrimaryCntTelNo:'',PrimaryCntLandlineNo:'',PrimaryCntEmail:'',SecCntName:'',SecCntDesignation:'',SecCntTelNo:'',SecCntLandlineNo:'',SecCntEmail:'',StateId:0,CityId:0,SuburbId:0,Pancard:'',PerformBy:'', Operation:0,CreationDate:'',SignedDate:'' };
		public CheckValidationForDeletereq={FormName:'Aggregators',Id:0};
	public aggregatordata;
	 
	 //Aggregator Waste Type
	 public AGWasteTypesreq = {AGWasteTypeId:0, AggregatorId:0, WasteMaterialFormId:0,WasteMaterialId:0,WasteMaterialTypeId:0,HandlingCapacity:0,HandlingCapacityMatUnitID:0,PrimaryCntName:'',PrimaryCntEmail:'',PrimaryCntTelNo:'',OperatingCities:'',OperatingSuburbs:'',ProcessingTypeId:'',CurrentRecylRates:0,PerformBy:'', Operation:0,StateId:0,AGWCode:'' };
	 public AGWasteTypesdata;
	 
	 //Waste material name
	 public wastematerailreq = {WasteMatId:0,  WasteMatCode:0, WasteMatName:'', WasteMatDescription:'', PerformBy:'', Operation:0 };
	public wastematerialdata;
	
	//Data state master
		public statemasterreq = {Stateid:0, StateName:'', StateCode:'', PerformBy:'', Operation:0 };
		public statemasterdata;
	 
	 
	 //city Data
	 public cityreq = {CityId:0, CityName:'', CityCode:'', PerformBy:'', Operation:0 };
	public citydata;
	public citydatafilter;
	//Suburb Data
	public suburbreq ={SuburbID:0, SuburbName:'', SuburbCode:'', CityId:0,PerformBy:'', Operation:0 };
	public suburbdata;
	
	//Processing Data
	public processingtypereq = {ProcessingTypeId:0, ProcessingType:'', Comments:'', PerformBy:'', Operation:0};
	public processingtypedata;
	
	//Material Unit
	public materialunitreq = {MaterialUnitId:0, MaterialUnit:0, MaterialUnitCode:0, Comments:'', PerformBy:'', Operation:0 };
	public materialunitdata;
	
	//Aggregatot City Suburb Data
	public AGSuburbsCityreq={AGSuburbId:0, Aggregatorid:0, SuburbId:0, CityName:'', SuburbName:'', PerformBy:'', Operation:0};
	public AGSuburbsCityData;
	
	
	//Aggregment Status
		public StatusListreq = {StatusId:0, StatusName:'', StatusType:'Aggrement', Comments:'', PerformBy:'', Operation:0 };
	public AggrementStatusdata;
	
	
	//Waste matterial Form Data
	 public wastetypesreq = {WasteMaterialFormId:0, WasteMaterialId:0, WasteMaterialFormName:'', Comments:'', PerformBy:'', Operation:0,StateId:0};
	public wastetypereqData;
	
	
	//Data GenerateCode
		public GenerateCodeNamereq={InputField:'',FormName:''};
		public GenerateCodeNameData;
		
		//Get aggregator serch data
		public GetAggregatorSearchreq={TextToSearch:'',FilterState:0,FilterOnCity:0,FilterOnName:'',FilterOnAGStatus:0};		
		public SearchDataAggregatorData;
	
	
	
	//Fromsuburbdata:Array<{SuburbId:Number,SuburbName:string}>;
	Fromsuburbdata:any;
	public TodayDate;
	public DispalayDate;
	public Aggregatorname;
	FilterState:any;
	AggregatorForm:FormGroup;
	AgWastetypeForm:FormGroup;
	AgcitysuburbForm:FormGroup;
	AggregatorFilterForm:FormGroup;
	 submitted = false;
	loading = false;
		successmsg = false;
		
		//variable declare
		
           disable=false;
		   ShowFilter=false;
		   limitSelection=false;
		   selectedItems:any=[];
		   
		  
		   
		   
		   //sameasabove
		public secName;
		public secDesig ;
		public SecCntTel ;
		public SecCntLandline ;
		public SecCntEmail;
		
		AGNameList:any;
		AggrementStatusdata1:any;
		citydata1:any;
	ShowBlock: boolean;
		//Fromsuburbdata1:Array<{}>;
		
		
 constructor(private formBuilder: FormBuilder,
			public nav: NavbarService,
			private userService: UserService, 
			private alertService : AlertService,
			public datepipe: DatePipe,
			private router: Router,private excelService:ExcelService) 
 { 
 //this.Getsuburb();
 this.GetAggregator();
 this.GetWastematerials();
 this.GetCities();
 this.GetProcessingtype();
 this.GetMaterialUnit();
this.GetAGNameById();
 this.GetStateMappingState();
 this.GetAgreementStatus();
 this.GetWasteMaterialform();
 this.DisplayDate();
 this.GetState(); 
 this.GetAgreementStatus1();
 this.GetDocTypesByFormId(this.value);
 this.GetAggregatorNamesearch();
 }
 
 //Same as  above
	
	toggleEditable(event) {
     if ( event.target.checked ) 
		{
		 this.AggregatorForm.controls['SecCntName'].setValue(this.f.PrimaryCntName.value);
		 this.AggregatorForm.controls['SecCntDesignation'].setValue(this.f.PrimaryCntDesignation.value);
		 this.AggregatorForm.controls['SecCntTelNo'].setValue(this.f.PrimaryCntTelNo.value);
		 this.AggregatorForm.controls['SecCntLandlineNo'].setValue(this.f.PrimaryCntLandlineNo.value);
		 this.AggregatorForm.controls['SecCntEmail'].setValue(this.f.PrimaryCntEmail.value);
        
		}
		else
		{
		this.AggregatorForm.controls['SecCntName'].setValue('');
		 this.AggregatorForm.controls['SecCntDesignation'].setValue('');
		 this.AggregatorForm.controls['SecCntTelNo'].setValue('');
		 this.AggregatorForm.controls['SecCntLandlineNo'].setValue('');
		 this.AggregatorForm.controls['SecCntEmail'].setValue('');
		}	
		
	}
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
 
  ResetFrom(){
		this.AggregatorForm.reset();
		this.AgWastetypeForm.reset();
		
		this.AgcitysuburbForm.reset();
		this.successmsg = false;
		this.submitted =false;
		this.IsValidAGCT=true;
		this.IsValidAGSB=true;
		this.IsValidAGPT=true;
		this.DocUploadForm.reset();
		this.DocumentData=undefined;

		this.AGWasteTypesreq.OperatingCities='';
		this.AGWasteTypesreq.OperatingSuburbs='';
		jQuery("#myModal").modal("hide");
			jQuery("#myModaledit").modal("hide");
			jQuery("#addtypeweste").modal("hide");
			jQuery("#myModaledittypeofweste").modal("hide");
			this.ShowBlock =false;
			this.NoneAgreementStatusSelected=true;
			this.SignedSelected = false;
			this.TerminatedSelected = false;
			this.AGWasteTypesreq.ProcessingTypeId='';

	}
	 
	GenerateMFCode(value)
		{
			this.AggregatorForm.controls['CreationDate'].setValue(this.TodayDateC);
			console.log("AG CODe :"+value.substring(0,4));
			this.GenerateCodeNamereq.InputField=value.substring(0,4);
			this.GenerateCodeNamereq.FormName='Aggregators';
			this.GetGenerateCode();			
		}
	
	
	

  ngOnInit() {
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
	  
	 // this.nav.show();
	    this.AggregatorForm = this.formBuilder.group({
            AGCode: [''],
            AGName: ['', Validators.required],
            Address: ['', Validators.required],
            AGDetails: [''],
            GSTNo: [''],
            PanCard: ['', Validators.required],
            AgreementStatusId: ['', Validators.required],
            // WasteMaterialFormId: ['', Validators.required],
            ExpiryDate: ['', Validators.required],
            PrimaryCntName: ['', Validators.required],
	        PrimaryCntDesignation: ['', Validators.required],
	        PrimaryCntTelNo: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]+')]],
	        PrimaryCntLandlineNo:['', Validators.pattern('[0-9]+')],
	        PrimaryCntEmail: ['', [Validators.required,EmailValidator]],
            SecCntName: [''],
	        SecCntDesignation: [''],
	        SecCntTelNo:['',[Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]+')]],
	        SecCntLandlineNo:['', Validators.pattern('[0-9]+')],
	        SecCntEmail:['',EmailValidator],
            StateId: ['', Validators.required],
            CityId: ['', Validators.required],
            SuburbId: [''],
			CheckboxSelect: [false],
			CreationDate:[''],
			SignedDate :['',Validators.required]
			 });
			 

			//Aggregator waste Type
		this.AgWastetypeForm=this.formBuilder.group({
			//  WasteMaterialFormId: ['', Validators.required],
			WasteMaterialId: [0, Validators.required],
			//WasteMaterialTypeId: [0, Validators.required],
			HandlingCapacity: [0, Validators.required],
			HandlingCapacityMatUnitID: [0, Validators.required],
			PrimaryCntName: ['', Validators.required],
			PrimaryCntEmail: ['', [Validators.required,EmailValidator]],
			PrimaryCntTelNo: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]+')]],
			OperatingCities: ['',Validators.required],
			OperatingSuburbs: [''],
			ProcessingTypeId: ['', Validators.required],
			CurrentRecylRates: [0],
			StateId:['', Validators.required]
		});
		
		//Aggregator City Suburb
		this.AgcitysuburbForm=this.formBuilder.group({
			
			
			SuburbId:[0,Validators.required],
			CityId:[0,Validators.required]
			
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
		
		this.AggregatorFilterForm = this.formBuilder.group({
				FilterState:[0],
				FilterOnCity:[0],
				FilterOnName:[''],				
				FilterOnAGStatus:[0],				
			});
		
		
    this.CitydropdownSettings = {
      singleSelection: false,
      idField: 'CityId',
      textField: 'CityName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };	


this.SuburbdropdownSettings = {
      singleSelection: false,
      idField: 'SuburbId',
      textField: 'SuburbName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };	
	
	
	this.ProcessingTypedownSettings= {
	      singleSelection: false,
	      idField: 'ProcessingTypeId',
	      textField: 'ProcessingType',
	      selectAllText: 'Select All',
	      unSelectAllText: 'UnSelect All',
	    };	
  }
  
  RedirectToAGWasteType(AggregatorId, AGName)
  {
	  //this.dataService.setOption('WorkOrderId', WorkOrderId);  
	  localStorage.setItem('AggregatorID', AggregatorId);
	  localStorage.setItem('AggregatorName', AGName);
  }
  /*Start Textbox serach */
  SearchAggregator(searchValue : string)
	  {
		  this.AggregatorFilterForm.controls['FilterOnName'].setValue('');
		  this.AggregatorFilterForm.controls['FilterState'].setValue(0);
		  this.AggregatorFilterForm.controls['FilterOnCity'].setValue(0);
		  this.AggregatorFilterForm.controls['FilterOnAGStatus'].setValue(0);
		  if(searchValue.length>1)
		  {
			  
			  console.log("Call API");
			  this.GetAggregatorSearchreq.TextToSearch=searchValue;
			  this.GetAggregatorSearchreq.FilterState=0;
			  this.GetAggregatorSearchreq.FilterOnCity=0;
			  this.GetAggregatorSearchreq.FilterOnName='';
			  this.GetAggregatorSearchreq.FilterOnAGStatus=0;
			  this.GetAggregatorNamesearch();
		  }
		  else
		  {
			  this.GetAggregatorSearchreq.TextToSearch='';
			  this.GetAggregatorSearchreq.FilterState=0;
			  this.GetAggregatorSearchreq.FilterOnCity=0;
			  this.GetAggregatorSearchreq.FilterOnName='';
			  this.GetAggregatorSearchreq.FilterOnAGStatus=0;
			  this.GetAggregatorNamesearch();
		  }
		  
		 
	  }
	  
	
	 onItemSuburbSelect(item: any) {
    console.log(item);
	
	if(this.AGWasteTypesreq.OperatingSuburbs=="")
	{
		this.AGWasteTypesreq.OperatingSuburbs=item.SuburbId;
	}
	else
	{
		this.AGWasteTypesreq.OperatingSuburbs+=","+item.SuburbId;
	}
	console.log("indivisual selected Suburb values :" + this.AGWasteTypesreq.OperatingSuburbs);	
  }
  
  onSelectSuburbAll(items: any) {
    console.log(items);
	
	this.AGWasteTypesreq.OperatingSuburbs="";
	for(var i=0; i<items.length;i++)
	{
		if (i==0)
		{
			this.AGWasteTypesreq.OperatingSuburbs=items[i].SuburbId;
		}
		else
		{
			this.AGWasteTypesreq.OperatingSuburbs+=","+items[i].SuburbId;
		}
	}
	console.log("selected Suburb values :" + this.AGWasteTypesreq.OperatingSuburbs);
	
	
  }
  
  
  get d() { return this.DocUploadForm.controls; }
  
 
  
  
  
  onSubmit() {
        this.submitted = true;
		
	

        // stop here if form is invalid
        if (this.AggregatorForm.invalid) {
            return;
        }
		
		this.aggregatorreq.AGCode=this.f.AGCode.value;
		this.aggregatorreq.AGName=this.f.AGName.value;
		this.aggregatorreq.Address=this.f.Address.value;
		this.aggregatorreq.AGDetails=this.f.AGDetails.value;
		this.aggregatorreq.GSTNo=this.f.GSTNo.value;
		this.aggregatorreq.Pancard=this.f.PanCard.value;
		this.aggregatorreq.AgreementStatusId=this.f.AgreementStatusId.value;
		// this.aggregatorreq.WasteMaterialFormId=this.f.WasteMaterialFormId.value;
		this.aggregatorreq.ExpiryDate=this.f.ExpiryDate.value;
		this.aggregatorreq.PrimaryCntName=this.f.PrimaryCntName.value;
		this.aggregatorreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
		this.aggregatorreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
		this.aggregatorreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
		this.aggregatorreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;
		this.aggregatorreq.SecCntName=this.f.SecCntName.value;
		this.aggregatorreq.SecCntDesignation=this.f.SecCntDesignation.value;
		this.aggregatorreq.SecCntTelNo=this.f.SecCntTelNo.value;
		this.aggregatorreq.SecCntLandlineNo=this.f.SecCntLandlineNo.value;
		this.aggregatorreq.SecCntEmail=this.f.SecCntEmail.value;
		this.aggregatorreq.StateId=this.f.StateId.value;
		this.aggregatorreq.CityId=this.f.CityId.value;
		this.aggregatorreq.SuburbId=this.f.SuburbId.value;
		this.aggregatorreq.CreationDate=this.TodayDateC;
		this.aggregatorreq.SignedDate =this.f.SignedDate.value;

	  this.aggregatorreq.AggregatorId=0;
	  this.aggregatorreq.PerformBy=localStorage.getItem('UserId');
	  this.aggregatorreq.Operation=1;
	 
	 //this.ValidateDocStatus();
	 if(this.f.AgreementStatusId.value == 11){

		this.AddUpdateDeleteAggregator();
	 }
	 else{
		this.ValidateDocStatus();
	 }
	  
	  
    }
	EditAgrregator(){
		if(this.f.AgreementStatusId.value == 11){

			this.AddUpdateDeleteAggregator();
		 }
		 else{
			this.ValidateDocStatus();
		 }
	}
	 onSubmitAgWatetype() {
        this.submitted = true;
		
			console.log("form errors : "+this.AgWastetypeForm.errors);
			/* if(this.AGWasteTypesreq.ProcessingTypeId=="" )
			{
				this.IsValidAGCT=false;
				this.IsValidAGSB=false;
				this.IsValidAGPT=false;
			
				return;
			} */
		 
        if(this.AgWastetypeForm.controls['OperatingCities'].value =="" )
			{
				
			//this.AgWastetypeForm.invalid = true;
				return;
			}
        // stop here if form is invalid
        if (this.AgWastetypeForm.invalid) {
            return;
        }
		this.AGWasteTypesreq.StateId=this.g.StateId.value;
		this.AGWasteTypesreq.AggregatorId=this.aggregatorreq.AggregatorId;
		this.AGWasteTypesreq.WasteMaterialId=this.g.WasteMaterialId.value;
		this.AGWasteTypesreq.HandlingCapacity=this.g.HandlingCapacity.value;
		this.AGWasteTypesreq.HandlingCapacityMatUnitID=this.g.HandlingCapacityMatUnitID.value;
		this.AGWasteTypesreq.PrimaryCntName=this.g.PrimaryCntName.value;
		this.AGWasteTypesreq.PrimaryCntTelNo=this.g.PrimaryCntTelNo.value;
		this.AGWasteTypesreq.PrimaryCntEmail=this.g.PrimaryCntEmail.value;
		//this.AGWasteTypesreq.OperatingCities=this.g.OperatingCities.value;
		//this.AGWasteTypesreq.OperatingSuburbs=this.g.OperatingSuburbs.value;
		//this.AGWasteTypesreq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		this.AGWasteTypesreq.CurrentRecylRates=this.g.CurrentRecylRates.value;
     
		//this.AGWasteTypesreq.WasteMaterialFormId =this.g.WasteMaterialFormId.value;
	  
	  this.AGWasteTypesreq.AGWasteTypeId=0;
	  this.AGWasteTypesreq.PerformBy=localStorage.getItem('UserId');
	  this.AGWasteTypesreq.Operation=1;
	 
      this.AddUpdateDeleteAgWastetype();  
	  
	  
    }
	
	onSubmitAgSuburbCity()
	{
		this.submitted = true;

        // stop here if form is invalid
        if (this.AgcitysuburbForm.invalid) {
            return;
        }
		
	
		this.AGSuburbsCityreq.Aggregatorid=this.aggregatorreq.AggregatorId;
		this.AGSuburbsCityreq.SuburbId=this.h.SuburbId.value;
		
	  
	  this.AGSuburbsCityreq.AGSuburbId=0;
	  this.AGSuburbsCityreq.PerformBy=localStorage.getItem('UserId');
	  this.AGSuburbsCityreq.Operation=1;
		
		
		this.AddUpdateDeleteAgSuburbCity();
	}
  
  
  resetValue() {
    this.AggregatorForm.controls['ExpiryDate'].setValue(this.currentDate());
  }
  
  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }
  
DisplayDate()
{
	const TodayDate = Date.now();
	//this.DispalayDate= ExpiryDate
this.TodayDate = this.datepipe.transform(this.TodayDate, 'yyyy-MM-dd');
} 
    
   EditAggregatorData(AGCode,AGName,Address,StateId,CityId,SuburbId,AGDetails,GSTNo,AgreementStatusId,ExpiryDate,DispalayDate,PrimaryCntName,PrimaryCntDesignation,PrimaryCntTelNo,PrimaryCntLandlineNo,PrimaryCntEmail,SecCntName,SecCntDesignation,SecCntTelNo,SecCntLandlineNo,SecCntEmail,PanCard,AggregatorId,CreationDate,SignedDate)
	{
		this.successmsg = false;
		this.loading = false;
		this.AggregatorForm.controls['AGCode'].setValue(AGCode);
		this.AggregatorForm.controls['AGName'].setValue(AGName);
		this.AggregatorForm.controls['Address'].setValue(Address);
		this.AggregatorForm.controls['StateId'].setValue(StateId);
		this.AggregatorForm.controls['CityId'].setValue(CityId);
		this.AggregatorForm.controls['SuburbId'].setValue(SuburbId);
		this.AggregatorForm.controls['AGDetails'].setValue(AGDetails);
		this.AggregatorForm.controls['GSTNo'].setValue(GSTNo);
		this.AggregatorForm.controls['PanCard'].setValue(PanCard);
		this.AggregatorForm.controls['AgreementStatusId'].setValue(AgreementStatusId);
		// this.AggregatorForm.controls['WasteMaterialFormId'].setValue(WasteMaterialFormId);
		this.AggregatorForm.controls['PrimaryCntName'].setValue(PrimaryCntName);
		this.AggregatorForm.controls['PrimaryCntDesignation'].setValue(PrimaryCntDesignation);
		this.AggregatorForm.controls['PrimaryCntTelNo'].setValue(PrimaryCntTelNo);
		this.AggregatorForm.controls['PrimaryCntLandlineNo'].setValue(PrimaryCntLandlineNo);
		this.AggregatorForm.controls['PrimaryCntEmail'].setValue(PrimaryCntEmail);
		this.AggregatorForm.controls['SecCntName'].setValue(SecCntName);
		this.AggregatorForm.controls['SecCntDesignation'].setValue(SecCntDesignation);
		this.AggregatorForm.controls['SecCntTelNo'].setValue(SecCntTelNo);
		this.AggregatorForm.controls['SecCntLandlineNo'].setValue(SecCntLandlineNo);
		this.AggregatorForm.controls['SecCntEmail'].setValue(SecCntEmail);
		this.aggregatorreq.AgreementStatusId=this.f.AgreementStatusId.value;


		this.aggregatorreq.AGCode=this.f.AGCode.value;
		this.aggregatorreq.AGName=this.f.AGName.value;
		this.aggregatorreq.Address=this.f.Address.value;
		this.aggregatorreq.StateId=this.f.StateId.value;
		this.aggregatorreq.CityId=this.f.CityId.value;
		this.aggregatorreq.SuburbId=this.f.SuburbId.value;
		this.aggregatorreq.AGDetails=this.f.AGDetails.value;
		this.aggregatorreq.GSTNo=this.f.GSTNo.value;
		this.aggregatorreq.Pancard=this.f.PanCard.value;
		
		// this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		// this.DispalayCreationDate= this.datepipe.transform(CreationDate, 'yyyy-MM-dd');
		// this.aggregatorreq.CreationDate=this.DispalayCreationDate;
		this.aggregatorreq.PrimaryCntName=this.f.PrimaryCntName.value;
		this.aggregatorreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
		this.aggregatorreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
		this.aggregatorreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
		this.aggregatorreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;
		this.aggregatorreq.SecCntName=this.f.SecCntName.value;
		this.aggregatorreq.SecCntDesignation=this.f.SecCntDesignation.value;
		this.aggregatorreq.SecCntTelNo=this.f.SecCntTelNo.value;
		this.aggregatorreq.SecCntLandlineNo=this.f.SecCntLandlineNo.value;
		this.aggregatorreq.SecCntEmail=this.f.SecCntEmail.value;

		if(this.aggregatorreq.SuburbId == null){
			this.aggregatorreq.SuburbId = 0;
		}
		else{
			this.aggregatorreq.SuburbId=this.f.SuburbId.value;
		}
		
		this.DispalayDate= ExpiryDate;
		this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		this.aggregatorreq.ExpiryDate=this.DispalayDate;
		this.AggregatorForm.controls['ExpiryDate'].setValue(this.DispalayDate);
   
   
		this.DispalayCreationDate=CreationDate;
		 this.DispalayCreationDate= this.datepipe.transform( this.DispalayCreationDate, 'yyyy-MM-dd');
		 this.aggregatorreq.CreationDate=this.DispalayCreationDate;
		 this.AggregatorForm.controls['CreationDate'].setValue(this.DispalayCreationDate);
   
		 
		   this.DisplaySignedDate= SignedDate;
		this.DisplaySignedDate= this.datepipe.transform(this.DisplaySignedDate, 'yyyy-MM-dd');
		this.aggregatorreq.SignedDate=this.DisplaySignedDate
		this.AggregatorForm.controls['SignedDate'].setValue(this.DisplaySignedDate);


		this.GetAgreementValue(AgreementStatusId);
		this.getAgFromsuburboncityId1(CityId);


	
	  this.aggregatorreq.AggregatorId=AggregatorId;
	  this.aggregatorreq.PerformBy=localStorage.getItem('UserId');
	  this.aggregatorreq.Operation=2;
	//  this.GetStateMappingState();
	this.GetStateMappingStateAgForm(StateId);
	  //this.getAgFromsuburboncityId(CityId);
	 this.ViewDocument();
	  
	}
	
		
	DeleteAggregatorData(AGCode,AGName,Address,StateId,CityId,SuburbId,AGDetails,GSTNo,AgreementStatusId,ExpiryDate,DispalayDate,PrimaryCntName,PrimaryCntDesignation,PrimaryCntTelNo,PrimaryCntLandlineNo,PrimaryCntEmail,SecCntName,SecCntDesignation,SecCntTelNo,SecCntLandlineNo,SecCntEmail,PanCard,AggregatorId,CreationDate,SignedDate)
	{
			this.AggregatorForm.controls['AGCode'].setValue(AGCode);
		this.AggregatorForm.controls['AGName'].setValue(AGName);
		this.AggregatorForm.controls['Address'].setValue(Address);
		this.AggregatorForm.controls['StateId'].setValue(StateId);
		this.AggregatorForm.controls['CityId'].setValue(CityId);
		this.AggregatorForm.controls['SuburbId'].setValue(SuburbId);
		this.AggregatorForm.controls['AGDetails'].setValue(AGDetails);
		this.AggregatorForm.controls['GSTNo'].setValue(GSTNo);
		this.AggregatorForm.controls['PanCard'].setValue(PanCard);
		this.AggregatorForm.controls['AgreementStatusId'].setValue(AgreementStatusId);
		// this.AggregatorForm.controls['WasteMaterialFormId'].setValue(WasteMaterialFormId);
	
		
		this.AggregatorForm.controls['PrimaryCntName'].setValue(PrimaryCntName);
		this.AggregatorForm.controls['PrimaryCntDesignation'].setValue(PrimaryCntDesignation);
		this.AggregatorForm.controls['PrimaryCntTelNo'].setValue(PrimaryCntTelNo);
		this.AggregatorForm.controls['PrimaryCntLandlineNo'].setValue(PrimaryCntLandlineNo);
		this.AggregatorForm.controls['PrimaryCntEmail'].setValue(PrimaryCntEmail);
		this.AggregatorForm.controls['SecCntName'].setValue(SecCntName);
		this.AggregatorForm.controls['SecCntDesignation'].setValue(SecCntDesignation);
		this.AggregatorForm.controls['SecCntTelNo'].setValue(SecCntTelNo);
		this.AggregatorForm.controls['SecCntLandlineNo'].setValue(SecCntLandlineNo);
		this.AggregatorForm.controls['SecCntEmail'].setValue(SecCntEmail);
		
		this.aggregatorreq.AGCode=this.f.AGCode.value;
		this.aggregatorreq.AGName=this.f.AGName.value;
		this.aggregatorreq.Address=this.f.Address.value;
		this.aggregatorreq.StateId=this.f.StateId.value;
		this.aggregatorreq.CityId=this.f.CityId.value;
		this.aggregatorreq.SuburbId=this.f.SuburbId.value;
		this.aggregatorreq.AGDetails=this.f.AGDetails.value;
		this.aggregatorreq.GSTNo=this.f.GSTNo.value;
		this.aggregatorreq.Pancard=this.f.PanCard.value;
		this.aggregatorreq.AgreementStatusId=this.f.AgreementStatusId.value;
	
		this.CheckValidationForDeletereq.Id=AggregatorId;
		this.aggregatorreq.PrimaryCntName=this.f.PrimaryCntName.value;
		this.aggregatorreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
		this.aggregatorreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
		this.aggregatorreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
		this.aggregatorreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;
		this.aggregatorreq.SecCntName=this.f.SecCntName.value;
		this.aggregatorreq.SecCntDesignation=this.f.SecCntDesignation.value;
		this.aggregatorreq.SecCntTelNo=this.f.SecCntTelNo.value;
		this.aggregatorreq.SecCntLandlineNo=this.f.SecCntLandlineNo.value;
		this.aggregatorreq.SecCntEmail=this.f.SecCntEmail.value;

		this.DispalayDate= ExpiryDate;
		this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		this.aggregatorreq.ExpiryDate=this.DispalayDate;
		this.AggregatorForm.controls['ExpiryDate'].setValue(this.DispalayDate);
   
   
		this.DispalayCreationDate=CreationDate;
		 this.DispalayCreationDate= this.datepipe.transform( this.DispalayCreationDate, 'yyyy-MM-dd');
		 this.aggregatorreq.CreationDate=this.DispalayCreationDate;
		 this.AggregatorForm.controls['CreationDate'].setValue(this.DispalayCreationDate);
   
		 
		   this.DisplaySignedDate= SignedDate;
		this.DisplaySignedDate= this.datepipe.transform(this.DisplaySignedDate, 'yyyy-MM-dd');
		this.aggregatorreq.SignedDate=this.DisplaySignedDate
		this.AggregatorForm.controls['SignedDate'].setValue(this.DisplaySignedDate);

	  this.aggregatorreq.AggregatorId=AggregatorId;
	  this.aggregatorreq.PerformBy=localStorage.getItem('UserId');
	  this.aggregatorreq.Operation=3;
	}
	
	//AgWastetypeForm AddData
	GetAggregatorId(AggregatorId,AGName)
	{		 
		this.Aggregatorname=AGName;
	  this.aggregatorreq.AggregatorId=AggregatorId;
	 this.GetAggregatorWasteType();
	}
	
	//AgCity/Subub AddData
	// GetSuburbAggregatorId(AggregatorId)
	// {		 		 
	  // this.aggregatorreq.AggregatorId=AggregatorId;
	 // this.GetAGSuburbsCity();
	// }
	
	
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
							this.AggregatorForm.controls['AGCode'].setValue(respData.Data);
							//this.alertService.success(''+ respData.m, true);
this.ViewDocument();
						}
						else{
							this.alertService.success(''+ respData.m, true);
							
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
	
		/* Display Aggregator Search Data */
	  GetAggregatorNamesearch(){
		  
			 this.loading = true;
	        this.userService.GetAggregatorSearchCRUD(this.GetAggregatorSearchreq)
	           .pipe()
	            .subscribe(
	                (data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							 this.aggregatordata=respData.Data;
							//this.alertService.success(''+ respData.m, true);
						}
						else{
							this.alertService.success(''+ respData.m, true);
						} 
	                    this.loading = false;
						this.submitted = false;
	                },
	                error => {
	                    this.alertService.error(error);
	                    this.loading = false;
						
	                });
		}
		
		
		
		
		FilterOnState(value)
		{
		  //this.AGNameList=undefined;
		 // this.AggrementStatusdata1=undefined;
		  this.AggregatorFilterForm.controls['FilterOnCity'].setValue(0);
		  this.AggregatorFilterForm.controls['FilterOnName'].setValue('');
		  this.AggregatorFilterForm.controls['FilterOnAGStatus'].setValue(0);
		  this.GetAggregatorSearchreq.TextToSearch='';
		  this.GetAggregatorSearchreq.FilterState=value;
		  this.GetAggregatorSearchreq.FilterOnCity=0;
		  this.GetAggregatorSearchreq.FilterOnName='';
		  this.GetAggregatorSearchreq.FilterOnAGStatus=0;
		  this.GetAggregatorNamesearch();
		// this.GetStateMappingState(value);
		}
		
		FilterOnCity(value)
		{
		  //this.AGNameList=undefined;
		  //this.AggrementStatusdata1=undefined;
		  
		  this.AggregatorFilterForm.controls['FilterState'].setValue(0);
		  this.AggregatorFilterForm.controls['FilterOnName'].setValue('');
		  this.AggregatorFilterForm.controls['FilterOnAGStatus'].setValue(0);
		  this.GetAggregatorSearchreq.TextToSearch='';
		  this.GetAggregatorSearchreq.FilterState=0;
		  this.GetAggregatorSearchreq.FilterOnCity=value;
		  this.GetAggregatorSearchreq.FilterOnName='';
		  this.GetAggregatorSearchreq.FilterOnAGStatus=0;
		  this.GetAggregatorNamesearch();
		 // this.GetAGNameById(value);
		}
		
		FilterOnName(value)
		{		
		 // this.AggrementStatusdata1=undefined;
		 this.AggregatorFilterForm.controls['FilterState'].setValue(0);
		  this.AggregatorFilterForm.controls['FilterOnCity'].setValue(0);
		  this.AggregatorFilterForm.controls['FilterOnAGStatus'].setValue(0);
		  this.GetAggregatorSearchreq.TextToSearch='';
		  this.GetAggregatorSearchreq.FilterState=0;
		  this.GetAggregatorSearchreq.FilterOnCity=0;
		  this.GetAggregatorSearchreq.FilterOnName=value;
		  this.GetAggregatorSearchreq.FilterOnAGStatus=0;
		  this.GetAggregatorNamesearch();
		  //this.GetAgreementStatus1();
		}
		
		FilterOnAGStatus(value)
		{
			this.AggregatorFilterForm.controls['FilterState'].setValue(0);
		  this.AggregatorFilterForm.controls['FilterOnCity'].setValue(0);
		   this.AggregatorFilterForm.controls['FilterOnName'].setValue('');
		  this.GetAggregatorSearchreq.TextToSearch='';
		  this.GetAggregatorSearchreq.FilterState=0;
		  this.GetAggregatorSearchreq.FilterOnCity=0;
		  this.GetAggregatorSearchreq.FilterOnName='';
		  this.GetAggregatorSearchreq.FilterOnAGStatus=value;
		  this.GetAggregatorNamesearch();
		}
		
		GetAGNameById()
		{
			this.loading = true;
	        this.userService.GetNamesByCityId(this.GetNamesByCityIdreq)
	           .pipe()
	            .subscribe(
	                (data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							this.AGNameList=respData.Data;
							
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
							this.alertService.success(''+ respData.m, true);
							
						} 
	                    this.loading = false;
						this.submitted = false;
	                },
	                error => {
	                    this.alertService.error(error);
	                    this.loading = false;
						
	                });
		}

	
	//waste material Name dispaly
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
		
		
		
		GetStateMappingStateAgForm(value){
		   this.loading = true;
	        this.userService.GetCitiesByStateIdCRUD({StateId:value})
	           .pipe()
	            .subscribe(
	                (data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							this.citydata=respData.Data;
							this.AgWastetypeForm.controls['OperatingCities'].setValue(this.citydata[0].CityId);
							//this.g.controls['OperatingCities'].setvalue(this.citydata[0].CityId);
							this.AggregatorForm.controls['CityId'].setValue(this.citydata[0].CityId);
							
							
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
		
		
		
		getAgFromsuburboncityId1(value){
	  
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
	
	//Processing data
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
	
	//Aggregator data
	GetAggregator(){
	  
		 this.loading = true;
        this.userService.aggregatorCRUD(this.aggregatorreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.aggregatordata=respData.Data;
					
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
	
	//Material Uint data
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
	
	
	//Aggrement Status
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
	
	

	
	//Waste material form
	GetWasteMaterialform(){
	  
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
						this.alertService.error(''+ respData.m, true);
						
					} 
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
	}
	
	
	get f() { return this.AggregatorForm.controls; }
	
	get fd() { return this.AggregatorFilterForm.controls; }
	
	AddUpdateDeleteAggregator(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.AggregatorForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		
		this.aggregatorreq.AGCode=this.f.AGCode.value;
		this.aggregatorreq.AGName=this.f.AGName.value;
		this.aggregatorreq.Address=this.f.Address.value;
		this.aggregatorreq.AGDetails=this.f.AGDetails.value;
		this.aggregatorreq.GSTNo=this.f.GSTNo.value;
		this.aggregatorreq.Pancard=this.f.PanCard.value;
		this.aggregatorreq.AgreementStatusId=this.f.AgreementStatusId.value;
		// this.aggregatorreq.WasteMaterialFormId=this.f.WasteMaterialFormId.value;
		this.aggregatorreq.ExpiryDate=this.f.ExpiryDate.value;
		this.aggregatorreq.ExpiryDate=this.datepipe.transform(this.aggregatorreq.ExpiryDate, 'yyyy-MM-dd');
		this.aggregatorreq.PrimaryCntName=this.f.PrimaryCntName.value;
		this.aggregatorreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
		this.aggregatorreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
		this.aggregatorreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
		this.aggregatorreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;
		this.aggregatorreq.SecCntName=this.f.SecCntName.value;
		this.aggregatorreq.SecCntDesignation=this.f.SecCntDesignation.value;
		this.aggregatorreq.SecCntTelNo=this.f.SecCntTelNo.value;
		this.aggregatorreq.SecCntLandlineNo=this.f.SecCntLandlineNo.value;
		this.aggregatorreq.SecCntEmail=this.f.SecCntEmail.value;
		this.aggregatorreq.StateId=this.f.StateId.value;
		this.aggregatorreq.CityId=this.f.CityId.value;
		this.aggregatorreq.SuburbId=this.f.SuburbId.value;

		if(this.f.SuburbId.value==null)
		{
			this.aggregatorreq.SuburbId=0;
		}
		else
		{
			this.aggregatorreq.SuburbId=this.f.SuburbId.value;

		}
		
		this.aggregatorreq.CreationDate=this.f.CreationDate.value;
		
        this.userService.aggregatorCRUD(this.aggregatorreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.aggregatordata=respData.Data;
						 //this.alertService.success(''+respData.m, true);
						 this.AlertMessage=respData.m;
						 this.ResetFrom();
						 if(this.aggregatorreq.Operation==1)
						 {
							localStorage.setItem('AggregatorID', this.aggregatordata[0].AggregatorId);
							localStorage.setItem('AggregatorCode', this.aggregatordata[0].AGCode);
							localStorage.setItem('AggregatorName', this.aggregatordata[0].AGName);

							jQuery("#myModal").modal("hide");
							jQuery("#myModaledit").modal("hide");
							//comment this
							//jQuery("#Typeofweste").modal("show");
							//jQuery("#myModalalert").modal("hide");
							this.Aggregatorname=this.aggregatordata[0].AGName;
							this.aggregatorreq.AggregatorId=this.aggregatordata[0].AggregatorId;
							jQuery("#myModalconfirmation").modal("show");

							this.GetAggregatorWasteType();

						 //   this.router.navigate(['/Aggregator-addwastetype']);
						 }
						 else{
							this.AlertMessage=respData.m;
							jQuery("#myModal").modal("hide");
							jQuery("#myModaledit").modal("hide");
							jQuery("#myModalalert").modal("show");
						 }
						//  jQuery("#nextbutton").disable = false;
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

		this.router.navigate(['/Aggregator-addwastetype'], {queryParams:{title:'true'}});
	}
	//Aggregator waste type form cRUD OPERTAION 
	
	EditAGWasteTypeData(WasteMaterialId,HandlingCapacity,HandlingCapacityMatUnitID,PrimaryCntName,PrimaryCntTelNo,PrimaryCntEmail,OperatingCities,OperatingSuburbs,ProcessingTypeId,CurrentRecylRates,AGWasteTypeId,StateId)
	{
		
		this.successmsg = false;
		 this.AgWastetypeForm.controls['WasteMaterialId'].setValue(WasteMaterialId);
		this.AgWastetypeForm.controls['HandlingCapacity'].setValue(HandlingCapacity);
		this.AgWastetypeForm.controls['HandlingCapacityMatUnitID'].setValue(HandlingCapacityMatUnitID);
		this.AgWastetypeForm.controls['PrimaryCntName'].setValue(PrimaryCntName);
		this.AgWastetypeForm.controls['PrimaryCntTelNo'].setValue(PrimaryCntTelNo);
		this.AgWastetypeForm.controls['PrimaryCntEmail'].setValue(PrimaryCntEmail);
		this.AgWastetypeForm.controls['OperatingCities'].setValue(OperatingCities);
		this.AgWastetypeForm.controls['OperatingSuburbs'].setValue(OperatingSuburbs);
		this.AgWastetypeForm.controls['StateId'].setValue(StateId);
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
				this.AgWastetypeForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType);
				this.AGWasteTypesreq.ProcessingTypeId=ProcessingTypeId;
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
				this.AgWastetypeForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType1);
				this.AGWasteTypesreq.ProcessingTypeId=ProcessingTypeId;
			}
			
		//this.AgWastetypeForm.controls['ProcessingTypeId'].setValue(ProcessingTypeId);
		this.AgWastetypeForm.controls['CurrentRecylRates'].setValue(CurrentRecylRates);
		
		 this.AGWasteTypesreq.WasteMaterialId=this.g.WasteMaterialId.value;
		 this.AGWasteTypesreq.HandlingCapacity=this.g.HandlingCapacity.value;
		 this.AGWasteTypesreq.HandlingCapacityMatUnitID=this.g.HandlingCapacityMatUnitID.value;
		 this.AGWasteTypesreq.PrimaryCntName=this.g.PrimaryCntName.value;
		 this.AGWasteTypesreq.PrimaryCntTelNo=this.g.PrimaryCntTelNo.value;
		 this.AGWasteTypesreq.PrimaryCntEmail=this.g.PrimaryCntEmail.value;
		 // this.AGWasteTypesreq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		 this.AGWasteTypesreq.CurrentRecylRates=this.g.CurrentRecylRates.value;
		 this.AGWasteTypesreq.OperatingCities=this.g.OperatingCities.value;
		 this.AGWasteTypesreq.OperatingSuburbs=this.g.OperatingSuburbs.value;
		 this.AGWasteTypesreq.StateId=this.g.StateId.value;
		 this.AGWasteTypesreq.AGWasteTypeId=AGWasteTypeId;
		 this.AGWasteTypesreq.PerformBy=localStorage.getItem('UserId');
		 this.AGWasteTypesreq.Operation=2;
	}
	
	
	DeleteAGWasteTypeData(WasteMaterialId,HandlingCapacity,HandlingCapacityMatUnitID,PrimaryCntName,PrimaryCntTelNo,PrimaryCntEmail,OperatingCities,OperatingSuburbs,ProcessingTypeId,CurrentRecylRates,AGWasteTypeId,StateId)
	{
		
		this.successmsg = false;
		this.AgWastetypeForm.controls['WasteMaterialId'].setValue(WasteMaterialId);
		this.AgWastetypeForm.controls['HandlingCapacity'].setValue(HandlingCapacity);
		this.AgWastetypeForm.controls['HandlingCapacityMatUnitID'].setValue(HandlingCapacityMatUnitID);
		this.AgWastetypeForm.controls['PrimaryCntName'].setValue(PrimaryCntName);
		this.AgWastetypeForm.controls['PrimaryCntTelNo'].setValue(PrimaryCntTelNo);
		this.AgWastetypeForm.controls['PrimaryCntEmail'].setValue(PrimaryCntEmail);
		this.AgWastetypeForm.controls['OperatingCities'].setValue(OperatingCities);
		this.AgWastetypeForm.controls['OperatingSuburbs'].setValue(OperatingSuburbs);
		this.AgWastetypeForm.controls['StateId'].setValue(StateId);
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
				this.AgWastetypeForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType);
			}
			
		//this.AgWastetypeForm.controls['ProcessingTypeId'].setValue(ProcessingTypeId);
		 this.AgWastetypeForm.controls['CurrentRecylRates'].setValue(CurrentRecylRates);
		 this.AGWasteTypesreq.StateId=this.g.StateId.value;
		 this.AGWasteTypesreq.WasteMaterialId=this.g.WasteMaterialId.value;
		 this.AGWasteTypesreq.HandlingCapacity=this.g.HandlingCapacity.value;
		 this.AGWasteTypesreq.HandlingCapacityMatUnitID=this.g.HandlingCapacityMatUnitID.value;
		 this.AGWasteTypesreq.PrimaryCntName=this.g.PrimaryCntName.value;
		 this.AGWasteTypesreq.PrimaryCntTelNo=this.g.PrimaryCntTelNo.value;
		 this.AGWasteTypesreq.PrimaryCntEmail=this.g.PrimaryCntEmail.value;
		// this.AGWasteTypesreq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		 this.AGWasteTypesreq.CurrentRecylRates=this.g.CurrentRecylRates.value;
		 this.AGWasteTypesreq.OperatingCities=this.g.OperatingCities.value;
		 this.AGWasteTypesreq.OperatingSuburbs=this.g.OperatingSuburbs.value;
		 
	     this.AGWasteTypesreq.AGWasteTypeId=AGWasteTypeId;
	     this.AGWasteTypesreq.PerformBy=localStorage.getItem('UserId');
	     this.AGWasteTypesreq.Operation=3;
	}
	
	
	
	GetAggregatorWasteType(){
	this.AGWasteTypesreq.Operation=0;
	 this.AGWasteTypesreq.AggregatorId=this.aggregatorreq.AggregatorId;
		 this.loading = true;
        this.userService.AGWasteTypesCRUD(this.AGWasteTypesreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.AGWasteTypesdata=respData.Data;
					
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
	
	
		get g() { return this.AgWastetypeForm.controls; }
	
	AddUpdateDeleteAgWastetype(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 if(this.AGWasteTypesreq.Operation!=3)
		 {
			 if (this.AgWastetypeForm.invalid) {
			this.loading = false;
            return;
			
        }
		 }
		   if(this.AgWastetypeForm.controls['OperatingCities'].value =="" )
			{
				
			//this.AgWastetypeForm.invalid = true;
			this.loading = false;
				return;
			}
	
		this.AGWasteTypesreq.AggregatorId=this.aggregatorreq.AggregatorId;
		this.AGWasteTypesreq.WasteMaterialId=this.g.WasteMaterialId.value;
		this.AGWasteTypesreq.HandlingCapacity=this.g.HandlingCapacity.value;
		this.AGWasteTypesreq.HandlingCapacityMatUnitID=this.g.HandlingCapacityMatUnitID.value;
		this.AGWasteTypesreq.PrimaryCntName=this.g.PrimaryCntName.value;
		this.AGWasteTypesreq.PrimaryCntTelNo=this.g.PrimaryCntTelNo.value;
		this.AGWasteTypesreq.PrimaryCntEmail=this.g.PrimaryCntEmail.value;
//		this.AGWasteTypesreq.WasteMaterialFormId=this.g.WasteMaterialFormId.value;
		this.AGWasteTypesreq.OperatingCities=this.g.OperatingCities.value;
		this.AGWasteTypesreq.OperatingSuburbs=this.g.OperatingSuburbs.value;
		this.AGWasteTypesreq.StateId=this.g.StateId.value;
		this.AGWasteTypesreq.ProcessingTypeId = "";
		for (let i = 0; i < this.g.ProcessingTypeId.value.length; i++) {
			if(this.AGWasteTypesreq.ProcessingTypeId == "")
			{
		      this.AGWasteTypesreq.ProcessingTypeId= this.g.ProcessingTypeId.value[i].ProcessingTypeId.toString() ; 
			}
			else
			{
	   	this.AGWasteTypesreq.ProcessingTypeId= this.AGWasteTypesreq.ProcessingTypeId + ',' + this.g.ProcessingTypeId.value[i].ProcessingTypeId.toString() ;  
			}
		}
		//Array[] proctypes= this.g.ProcessingTypeId.value; 
	
		
		this.AGWasteTypesreq.CurrentRecylRates=this.g.CurrentRecylRates.value;
        this.userService.AGWasteTypesCRUD(this.AGWasteTypesreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.AGWasteTypesdata=respData.Data;
						 this.AlertMessage=respData.m;

						 jQuery("#addtypeweste").modal("hide");
						 this.ResetFrom();
						 jQuery("#myModalalert").modal("show");

						 
						// this.alertService.success(''+respData.m, true);
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
	
	//Aggregator City Suburb Crud Operation
	
	
	//Dispaly AGSuburbsCity Data
	
	GetAGSuburbsCity(){
		this.AGSuburbsCityreq.Operation=0;
	   this.AGSuburbsCityreq.Aggregatorid=this.aggregatorreq.AggregatorId;
		 this.loading = true;
        this.userService.AGSuburbsCityCRUD(this.AGSuburbsCityreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.AGSuburbsCityData=respData.Data;
					
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
	
	
	
	
	
	
	
	
	
	
	
	/* Display State City mapping */
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
	
	//Edit City suburb data
	 EditAGSuburbsCityData(CityName,SuburbId,AGSuburbId)
	{
		this.successmsg = false;
		this.AgcitysuburbForm.controls['SuburbId'].setValue(SuburbId);
		 this.AGSuburbsCityreq.SuburbId=this.h.SuburbId.value;		

	  this.AGSuburbsCityreq.AGSuburbId=AGSuburbId;
	  this.AGSuburbsCityreq.PerformBy=localStorage.getItem('UserId');
	  this.AGSuburbsCityreq.Operation=2;
	}
	
	//Delete City suburb data
	 DeleteAGSuburbsCityData(CityName,SuburbId,AGSuburbId)
	{
		
		
		this.AgcitysuburbForm.controls['SuburbId'].setValue(SuburbId);
		 this.AGSuburbsCityreq.SuburbId=this.h.SuburbId.value;		

	  this.AGSuburbsCityreq.AGSuburbId=AGSuburbId;
	  this.AGSuburbsCityreq.PerformBy=localStorage.getItem('UserId');
	  this.AGSuburbsCityreq.Operation=3;
	}
	
	
	
	//Add suburb city data 
	get h() { return this.AgcitysuburbForm.controls;}
	
	AddUpdateDeleteAgSuburbCity(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.AgcitysuburbForm.invalid) {
			this.loading = false;
            return;
			
        }
	
		 this.AGSuburbsCityreq.Aggregatorid=this.aggregatorreq.AggregatorId;
		this.AGSuburbsCityreq.SuburbId=this.h.SuburbId.value;
		
        this.userService.AGSuburbsCityCRUD(this.AGSuburbsCityreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.AGSuburbsCityData=respData.Data;
						// this.alertService.success(''+respData.m, true);
						
						 
						
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
		
		this.Docreq.AutoCode=this.f.AGCode.value;
		this.Docreq.DocumentTypeId=this.d.DocumentTypeId.value;
		this.Docreq.DocumentName=this.d.DocumentName.value;
		this.Docreq.DocumentDetails=this.d.DocumentDetails.value;
		this.Docreq.FormId=this.value;
		this.Docreq.Image=this.base64string;
		this.Docreq.DocGuid='Aggregator';
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

ViewDocument()
  {
	  
		this.DocUploadForm.controls['DocumentName'].setValue('');
		this.DocUploadForm.controls['DocumentTypeId'].setValue(0);
		this.DocUploadForm.controls['DocumentDetails'].setValue('');
		this.Docreq.Option='';
		this.Docreq.AutoCode=this.f.AGCode.value;
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
			
    this.excelService.exportAsExcelFile(this.aggregatordata , 'Aggregator Report');
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
		this.AggregatorForm.controls['ExpiryDate'].setValue(today);
		this.AggregatorForm.controls['SignedDate'].setValue(today);

 
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
	this.DocStatusReq.AutoCode=this.f.AGCode.value;
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
						 this.AddUpdateDeleteAggregator(); 
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
				this.AddUpdateDeleteAggregator(); 
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
