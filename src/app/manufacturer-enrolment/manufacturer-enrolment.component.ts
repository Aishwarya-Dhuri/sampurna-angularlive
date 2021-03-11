import { Component, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common'
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,EmailValidator } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService,ExcelService } from '../_services';


 declare var jQuery:any; 

@Component({
  selector: 'app-manufacturer-enrolment',
  templateUrl: './manufacturer-enrolment.component.html',
  styleUrls: ['./manufacturer-enrolment.component.css']
})
export class ManufacturerEnrolmentComponent implements OnInit {
	public AlertMessage;
UserId=localStorage.getItem('UserId');
	//Popup Code
	 timeLeft: number =300;
	interval;
	public DocData;
	public TodayDateC ;
	IsValidRF:boolean=true;
	IsValidCT:boolean=true;
	IsValidPT:boolean=true;
	IsAgreementStatusSelected: boolean;
public base64string;
	public citydata1;
	//search html input 
	TextToSearch:any;
	FilterState:any;
	FilterCity:any;
	FilterName:any;
	FilterAggrementStatus:any;
	MGNameList:any;
	filtercitydata:any;
	public value = 1;
	AggrementStatusdata1:any;
	SignedSelected: boolean;
	TerminatedSelected: boolean;
	ShowBlock:boolean;
	public NoneAgreementStatusSelected =true;
	//ProcessingTypedropdownSettings={};

	
	ValidExpiryF:boolean=false;
	ValidExpiryT:boolean=false;
//Manufacturer Reporting frequency drop down



dropdownSettings = {};
selectedItems1 = [];

public CompareExpiryDate;

	dropdownList = [];
   CitydropdownSettings = {};
   public DispalayCreationDate;
   public DisplaySignedDate;
  public myCreationDate = new Date();
  

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
   

  public GetNamesByCityIdreq={FormName:'Manufacturer',CityId:0};
   //Manufacture enrollment 
	public manufacturerreq = {Manufacturerid:0, MFCode:'', ExpiryDate:'',SignedDate:'', MFName:'', MFAddress:'', MFCityIds:0, MFStateId:0,MFGST:'',AgreementStatusId:0,PrimaryCntName:'',PrimaryCntDesignation:'',PrimaryCntTelNo:'',PrimaryCntLandlineNo:'',PrimaryCntEmail:'',SecCntName:'',SecCntDesignation:'',SecCntTelNo:'',SecCntLandlineNo:'',SecCntEmail:'',PerformBy:'', Operation:0,CreationDate:'',Tonnage:0,Details:'' };
	public manufacturerdata;
	
	public CheckValidationForDeletereq={FormName:'Manufacturer',Id:0};
	//Manufacture Waste type 
	public mfwastetypereq = {MFWasteTypeId:0, ManufacturerId:0, WasteMaterialIds:0, WastMaterialTypeId:0, ProductionCapacity:'', PreferredDispSystem:'', AnnualConsumption:0, EPRTarget:0, FocusStateIds:'', FocusCityIds:'',SuburbId:0, ProcessingTypeId:'', EngagedwithAnotherPRO:'',EngagedwithAnother:'', PerformBy:'', Operation:0 };
	public mfwastetypedata;
	
	//Data waste material
	public wastematerailreq = {WasteMatId:0,  WasteMatCode:0, WasteMatName:'', WasteMatDescription:'', PerformBy:'', Operation:0 };
	public wastematerialdata;
	
	
	//Data waste type
	public wastetypesreq = {WasteMaterialTypeId:0,  WasteMaterialId:0, WasteTypeName:'', Comments:'', PerformBy:'', Operation:0 };
	//public wastetypereqData;	
	
	//Data processing type
	public processingtypereq = {ProcessingTypeId:0, ProcessingType:'', Comments:'', PerformBy:'', Operation:0};
	public processingtypedata;	
	

	
	//Data recycling type
	public recyclingtypereq = {RecyclingTypeId:0, RecyclingType:'', Comments:'', PerformBy:'', Operation:0 };
	public recyclingtypedata;
	
	//Data status list
	public StatusListreq = {StatusId:0, StatusName:'', StatusType:'Aggrement', Comments:'', PerformBy:'', Operation:0 };
	public AggrementStatusdata;
	
	//Data city 
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
	
	//Data GetManufacturers
	public GetManufacturersSearchreq={TextToSearch:'',StateId:0,CityId:0,ManufacturerName:'',AgreementStatusId:0};		
	public SearchDataManufacturerData;
	
	//Data GenerateCode
	public GenerateCodeNamereq={InputField:'',FormName:''};
	public GenerateCodeNameData;
	

	public TodayDate;
	public DispalayDate;

	public todayDate = new Date(Date.parse(Date()));
	public enableInput = false;
	
	public ManufacturerName;
	
	//emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

	onClick() {
this.enableInput = true;//!this.enableInput;
//this.AddMFwastetypeForm.controls['EngagedwithAnotherPRO'].setValue('');
}

onClick1() {
this.enableInput = false;
this.AddMFwastetypeForm.controls['EngagedwithAnotherPRO'].setValue('');
}


	
	
	
	AddMFwastetypeForm:FormGroup;
	ManufactureForm:FormGroup;
	ManufactureSearchForm:FormGroup;
	submitted = false;
	loading = false;
	successmsg = false;
	AvoidPrint=true;
	
	
	//City suburb mapping
//public Fromsuburbdata;

ProcessingTypedropdownSettings:any={};

 constructor(private formBuilder: FormBuilder, 
 public nav: NavbarService, 
 private userService: UserService, 
 private alertService : AlertService,
 public datepipe: DatePipe,
 private router: Router,private excelService:ExcelService) 
 { 
this.GetDocTypesByFormId(this.value);
	this.GetProcessingtype();
	this.GetWastematerials();
	this.GetManufacturer();
	this.GetRecyclingtype();
	this.GetAgreementStatus();
	this.GetState();
	this.GetAgreementStatus1();
	this.GetMFNameById();
	this.GetStateMappingState();
	//this.GetCities();

	console.log("Current Date:"+this.currentDate());


 }

//Same as  above



 
  ngOnInit() {
	date: Date;

	
	  this.TodayDateC = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
	  this.CompareExpiryDate=this.datepipe.transform(Date.now() - (30*24*60*60*1000), 'yyyy-MM-dd');


	  this.AvoidPrint=true;
	  var token=localStorage.getItem('Token');
  console.log("Token: " + token); 
  this.NoneAgreementStatusSelected=true;
  this.SignedSelected = false;
  this.TerminatedSelected = false;
  this.ShowBlock=false;
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
	  //var emailRegEx=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
	  
	   //this.nav.show();
		this.ManufactureForm = this.formBuilder.group({
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
			PrimaryCntLandlineNo:[''],
			PrimaryCntEmail: ['', [Validators.required,EmailValidator]],
			//ReportingFrequency: [''],
			SecCntName: [''],
			SecCntDesignation: [''],
			SecCntTelNo:[''],
			SecCntLandlineNo:[''],
			SecCntEmail:[''],
			CheckboxSelect: [false],
			CreationDate:[''],
			Details: ['']

			
			//,Validators.pattern('(a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$)')
						
		});	
		
		this.AddMFwastetypeForm = this.formBuilder.group({
			
			   WasteMaterialIds: ['', Validators.required],
			   ProductionCapacity: ['', Validators.required],
			   PreferredDispSystem: ['', Validators.required],
			   FocusCityIds: ['', Validators.required],
			   FocusStateIds: ['', Validators.required],
			   SuburbId: [0, Validators.required],
			   EPRTarget: ['', Validators.required],
			   AnnualConsumption: ['', Validators.required],
			   ProcessingTypeId: ['', Validators.required],
			   EngagedwithAnotherPRO: [''],
			//   EngagedwithAnother: [false, Validators.required],
			EngagedwithAnother: [false]
		
						
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
		
		//Search for filterform
		this.ManufactureSearchForm = this.formBuilder.group({
			FilterState:[0],
			FilterCity:[0],
			FilterName:[''],				
			AgStatusNameId:[0],				
		});
		
		
			
	this.CitydropdownSettings = {
	  singleSelection: false,
	  idField: 'CityId',
	  textField: 'CityName',
	  selectAllText: 'Select All',
	  unSelectAllText: 'UnSelect All',
	};	
	
	this.ProcessingTypedropdownSettings=
	{
		 singleSelection: false,
  idField: 'ProcessingTypeId',
  textField: 'ProcessingType',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
	}
			
	
	
	//Dropdownlist Reporting frequency drop down
	
	
	
	this.dropdownList = [
  { item_id: 1, item_text: 'Every Shipment' },
  { item_id: 2, item_text: 'Milestone Based' },
  { item_id: 3, item_text: 'No Update Till' },
  { item_id: 4, item_text: 'Monthly Completion' },
  { item_id: 5, item_text: 'Billing Cycle' }
];


 this.dropdownSettings = {
  singleSelection: false,
  idField: 'item_id',
  textField: 'item_text',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All'
};

 this.ManufactureForm.controls['MFCode'].disable();
 //this.changeValidator();

  }
  
  // changeValidator()
  // {
	  // this.AddMFwastetypeForm.get('EngagedwithAnother').valueChanges
	  // .subscribe(EngagedwithAnother => {

	  // const EngagedwithAnotherPROControl = this.AddMFwastetypeForm.get('EngagedwithAnotherPRO');
	  
		// if (EngagedwithAnother === true) {
		// EngagedwithAnotherPROControl.setValidators([Validators.required]);
		// }

		// if (EngagedwithAnother === false) {
			// EngagedwithAnotherPROControl.setValidators(null);
		// }

		// EngagedwithAnotherPROControl.updateValueAndValidity();
	  // });
  // }
  
  toggleEditable(event) {
	
	this.submitted=true;
	//   if (this.ManufactureForm.invalid) {
	// 		return;
	// 	}
	
	
 if (event.target.checked) 
	{
	 this.ManufactureForm.controls['SecCntName'].setValue(this.f.PrimaryCntName.value);
	 this.ManufactureForm.controls['SecCntDesignation'].setValue(this.f.PrimaryCntDesignation.value);
	 this.ManufactureForm.controls['SecCntTelNo'].setValue(this.f.PrimaryCntTelNo.value);
	 this.ManufactureForm.controls['SecCntLandlineNo'].setValue(this.f.PrimaryCntLandlineNo.value);
	 this.ManufactureForm.controls['SecCntEmail'].setValue(this.f.PrimaryCntEmail.value);
	
	}
	else
	{
	this.ManufactureForm.controls['SecCntName'].setValue('');
	 this.ManufactureForm.controls['SecCntDesignation'].setValue('');
	 this.ManufactureForm.controls['SecCntTelNo'].setValue('');
	 this.ManufactureForm.controls['SecCntLandlineNo'].setValue('');
	 this.ManufactureForm.controls['SecCntEmail'].setValue('');
	}	
	
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
 
  
  SearchMenufacturer(searchValue : string)
  {
	  
	this.ManufactureSearchForm.controls['FilterState'].setValue(0);
	 this.ManufactureSearchForm.controls['FilterCity'].setValue(0);
	  this.ManufactureSearchForm.controls['FilterName'].setValue('');
	  this.ManufactureSearchForm.controls['AgStatusNameId'].setValue(0);
	  
	  if(searchValue.length>1)
	  {
		  console.log("Call API");
		  this.GetManufacturersSearchreq.TextToSearch=searchValue;
		  this.GetManufacturersSearchreq.StateId=0;
		  this.GetManufacturersSearchreq.CityId=0;
		  this.GetManufacturersSearchreq.ManufacturerName='';
		  this.GetManufacturersSearchreq.AgreementStatusId=0;
		  this.GetManufacturerNamesearch();
	  }
	  else
	  {
		  this.GetManufacturersSearchreq.TextToSearch='';
		  this.GetManufacturersSearchreq.StateId=0;
		  this.GetManufacturersSearchreq.CityId=0;
		  this.GetManufacturersSearchreq.ManufacturerName='';
		  this.GetManufacturersSearchreq.AgreementStatusId=0;
		  this.GetManufacturerNamesearch();
	  }
	 
  }
  
 
  
  get d() { return this.DocUploadForm.controls; }
  
  
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
  
  
  
  
  onItemSelectPT(item: any) {
console.log(item);

if(this.mfwastetypereq.ProcessingTypeId=="")
{
	this.mfwastetypereq.ProcessingTypeId=item.ProcessingTypeId;
}
else
{
	this.mfwastetypereq.ProcessingTypeId+=","+item.ProcessingTypeId;
}
console.log("indivisual selected Processing Type values :" + this.mfwastetypereq.ProcessingTypeId);

}
onSelectAllPT(items: any) {
console.log(items);

this.mfwastetypereq.ProcessingTypeId="";
for(var i=0; i<items.length;i++)
{
	if (i==0)
	{
		this.mfwastetypereq.ProcessingTypeId=items[i].ProcessingTypeId;
	}
	else
	{
		this.mfwastetypereq.ProcessingTypeId+=","+items[i].ProcessingTypeId;
	}
	
}
console.log("selected Processing Type values :" + this.mfwastetypereq.ProcessingTypeId);

}
  
  
  
  
  resetValue() {
	this.ManufactureForm.controls['ExpiryDate'].setValue(this.currentDate());
  }
  
  currentDate() {
	const currentDate = new Date();
	return currentDate.toISOString().substring(0,10);
	//let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
  }
  
  DisplayDate()
{
	const TodayDate = Date.now();
	//this.DispalayDate= ExpiryDate
this.TodayDate = this.datepipe.transform(this.TodayDate, 'yyyy-MM-dd');
}
  
   ResetFrom(){
		this.ManufactureForm.reset();
		this.AddMFwastetypeForm.reset();			
		this.successmsg = false;
		this.submitted =false;
		this.IsValidRF=true;
		this.IsValidCT=true;
		this.IsValidPT=true;
		this.citydata=undefined;
		this.enableInput=false;
		this.DocumentData=undefined;
		this.DocUploadForm.reset();
		this.NoneAgreementStatusSelected=true;
	this.ShowBlock =false;
		
  this.SignedSelected = false;
  this.TerminatedSelected = false;

	}
	RedirectMfWasteType(Manufacturerid, MFCode)
  {
	  //this.dataService.setOption('WorkOrderId', WorkOrderId);  
	  localStorage.setItem('Manufacturerid', Manufacturerid);
	  localStorage.setItem('MFCode', MFCode);
  }
	GenerateMFCode(value)
	{
		this.ManufactureForm.controls['CreationDate'].setValue(this.TodayDateC);
		console.log("MF CODe :"+value.substring(0,4));
		this.GenerateCodeNamereq.InputField=value.substring(0,4);
		this.GenerateCodeNamereq.FormName='Manufacturers';
		this.GetGenerateCode();			
	}
	
	
	
	closeManufacturerPopup()
	{
		
	}
  
  
  /* Display Manufacture Enrollment */
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
	
	/* Display RecyclingType */
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
	
	
	/* Display Manufacture Search Data */
  GetManufacturerNamesearch(){
	  
		 this.loading = true;
		this.userService.GetManufacturersSearchCRUD(this.GetManufacturersSearchreq)
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
	
	FilterOnState(value)
	{
	 // this.MGNameList=undefined;
	  this.ManufactureSearchForm.controls['FilterCity'].setValue(0);
	  this.ManufactureSearchForm.controls['FilterName'].setValue('');
	  this.ManufactureSearchForm.controls['AgStatusNameId'].setValue(0);
	  this.GetManufacturersSearchreq.TextToSearch='';
	  this.GetManufacturersSearchreq.StateId=value;
	  this.GetManufacturersSearchreq.CityId=0;
	  this.GetManufacturersSearchreq.ManufacturerName='';
	  this.GetManufacturersSearchreq.AgreementStatusId=0;
	  this.GetManufacturerNamesearch();
	//  this.GetStateMappingState(value);
	}
	
	
	FilterOnCity(value)
	{
	 // this.MGNameList=undefined;
	 this.ManufactureSearchForm.controls['FilterState'].setValue(0);
	  this.ManufactureSearchForm.controls['FilterName'].setValue('');
	  this.ManufactureSearchForm.controls['AgStatusNameId'].setValue(0);
	  this.GetManufacturersSearchreq.TextToSearch='';
	  this.GetManufacturersSearchreq.StateId=0;//this.h.FilterState.value;
	  this.GetManufacturersSearchreq.CityId=value;
	  this.GetManufacturersSearchreq.ManufacturerName='';
	  this.GetManufacturersSearchreq.AgreementStatusId=0;
	  this.GetManufacturerNamesearch();
	  //this.GetMFNameById(value);
	}
	
	FilterOnName(value)
	{		
	  //this.MGNameList=undefined;
	  this.ManufactureSearchForm.controls['FilterCity'].setValue(0);
	  this.ManufactureSearchForm.controls['FilterState'].setValue(0);
	  this.ManufactureSearchForm.controls['AgStatusNameId'].setValue(0);
	  this.GetManufacturersSearchreq.TextToSearch='';
	  this.GetManufacturersSearchreq.StateId=0;//this.h.FilterState.value;
	  this.GetManufacturersSearchreq.CityId=0;//this.h.FilterCity.value;
	  this.GetManufacturersSearchreq.ManufacturerName=value;
	  this.GetManufacturersSearchreq.AgreementStatusId=0;
	  this.GetManufacturerNamesearch();
	  //this.GetAgreementStatus1();
	}
	
	FilterOnAGStatus(value)
	{
	  this.ManufactureSearchForm.controls['FilterCity'].setValue(0);
	  this.ManufactureSearchForm.controls['FilterState'].setValue(0);
	  this.ManufactureSearchForm.controls['FilterName'].setValue('');
	  this.GetManufacturersSearchreq.TextToSearch='';
	  this.GetManufacturersSearchreq.StateId=0;//this.h.FilterState.value;
	  this.GetManufacturersSearchreq.CityId=0;//this.h.FilterCity.value;
	  this.GetManufacturersSearchreq.ManufacturerName='';//this.h.FilterName.value;
	  this.GetManufacturersSearchreq.AgreementStatusId=value;
	  this.GetManufacturerNamesearch();
	}
	
	GetMFNameById()
	{
		this.loading = true;
		this.userService.GetNamesByCityId(this.GetNamesByCityIdreq)
		   .pipe()
			.subscribe(
				(data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						this.MGNameList=respData.Data;
						
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
	
	/* Display State City mapping */
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
	
	
	/* Display State City mapping Wate type */
	GetStateMappingState1(value){
	  this.loading = true;
		this.userService.GetCitiesByStateIdCRUD({StateId:value})
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
	
	
	//Dispaly AGSuburbsCity Data

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
					 this.Fromsuburbdata=respData.Data;
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
	 
	
	
	
	/* Display State City mapping */
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
						this.ManufactureForm.controls['MFCityIds'].setValue(this.citydata[0].CityId);

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
	
	
	
	GetCityByStateId(value,FocusCityIds){
		
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
						
						
						this.fillcitydata(FocusCityIds);
						
						
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
	
	
	/* Display AggreementStatus */
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
	
	
	
	
	/* Submit Manufacture enrollment */
	  onSubmit() {
		this.submitted = true;
		
		console.log("form errors : "+this.ManufactureForm.errors);
		// if(this.manufacturerreq.ReportingFrequency=="")
		// {
		// 	this.IsValidRF=false;
		
		// 	return;
		// }
		
		
		// stop here if form is invalid
		if (this.ManufactureForm.invalid) {
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
	  this.manufacturerreq.Details=this.f.Details.value;
	  this.manufacturerreq.SecCntName=this.f.SecCntName.value;
	  this.manufacturerreq.SecCntDesignation=this.f.SecCntDesignation.value;
	  this.manufacturerreq.SecCntTelNo=this.f.SecCntTelNo.value;
	  this.manufacturerreq.SecCntLandlineNo=this.f.SecCntLandlineNo.value;
	  this.manufacturerreq.SecCntEmail=this.f.SecCntEmail.value;

	// this.manufacturerreq.SecCntName='';//this.f.SecCntName.value;
	// this.manufacturerreq.SecCntDesignation='';//this.f.SecCntDesignation.value;
	// this.manufacturerreq.SecCntTelNo='';//this.f.SecCntTelNo.value;
	// this.manufacturerreq.SecCntLandlineNo='';//this.f.SecCntLandlineNo.value;
	// this.manufacturerreq.SecCntEmail='';//this.f.SecCntEmail.value;
	  this.manufacturerreq.Manufacturerid=0;
	  this.manufacturerreq.PerformBy=localStorage.getItem('UserId');
	  this.manufacturerreq.Operation=1;
	  this.manufacturerreq.CreationDate=this.TodayDateC;
	  
	// this.ValidateDocStatus();
	 if(this.f.AgreementStatusId.value == 11){

		this.AddUpdateDeleteManufacturer();
	 }
	 else{
		this.ValidateDocStatus();
	 }
	}
	
	get f() { return this.ManufactureForm.controls; }
	
	/* CRUD Operationof Manufacture Enrollment */ 
	
	
	EditManufactureData(MFName,MFCode,MFAddress,MFCityIds,MFStateId,ExpiryDate,SignedDate,MFGST,AgreementStatusId,PrimaryCntName,PrimaryCntDesignation,PrimaryCntTelNo,PrimaryCntLandlineNo,PrimaryCntEmail,SecCntName,SecCntDesignation,SecCntTelNo,SecCntLandlineNo,SecCntEmail,Manufacturerid,CreationDate,Details)
	{
	

		 this.loading = false;
		this.successmsg = false;
		 this.ManufactureForm.controls['MFName'].setValue(MFName);
	  this.manufacturerreq.MFName=this.f.MFName.value;
		
	this.ManufactureForm.controls['MFCode'].setValue(MFCode);
	  this.manufacturerreq.MFCode=this.f.MFCode.value;
	  
	//   this.ManufactureForm.controls['MFName'].setValue(MFName);
	//   this.manufacturerreq.MFName=this.f.MFName.value;
	  
	  this.ManufactureForm.controls['MFAddress'].setValue(MFAddress);
	  this.manufacturerreq.MFAddress=this.f.MFAddress.value;
	  this.ManufactureForm.controls['MFCityIds'].setValue(MFCityIds);
	  this.manufacturerreq.MFCityIds=this.f.MFCityIds.value;
	  this.ManufactureForm.controls['MFStateId'].setValue(MFStateId);
	  this.manufacturerreq.MFStateId=this.f.MFStateId.value;
	 //  this.ManufactureForm.controls['Billingcycle'].setValue(Billingcycle);
	  //this.manufacturerreq.Billingcycle=this.f.Billingcycle.value;
	  //Expiry Date Starts
	  
	  this.ManufactureForm.controls['Details'].setValue(Details);
	  this.manufacturerreq.Details=this.f.Details.value;


		this.DispalayDate= ExpiryDate;
	 this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
	 this.manufacturerreq.ExpiryDate=this.DispalayDate;
	 this.ManufactureForm.controls['ExpiryDate'].setValue(this.DispalayDate);


	 this.DispalayCreationDate=CreationDate;
	  this.DispalayCreationDate= this.datepipe.transform( this.DispalayCreationDate, 'yyyy-MM-dd');
	  this.manufacturerreq.CreationDate=this.DispalayCreationDate;
	  this.ManufactureForm.controls['CreationDate'].setValue(this.DispalayCreationDate);

	  
		this.DisplaySignedDate= SignedDate;
	 this.DisplaySignedDate= this.datepipe.transform(this.DisplaySignedDate, 'yyyy-MM-dd');
	 this.manufacturerreq.SignedDate=this.DisplaySignedDate
	 this.ManufactureForm.controls['SignedDate'].setValue(this.DisplaySignedDate);
	  //Signed Date starts
	 
	//Signed Date Ends


	//   this.ManufactureForm.controls['ExpiryDate'].setValue(new Date(ExpiryDate));	  
	//   this.manufacturerreq.ExpiryDate=this.f.ExpiryDate.value;



	

	  this.ManufactureForm.controls['MFGST'].setValue(MFGST);
	  this.manufacturerreq.MFGST=this.f.MFGST.value; 
	  this.ManufactureForm.controls['AgreementStatusId'].setValue(AgreementStatusId);
	  this.manufacturerreq.AgreementStatusId=this.f.AgreementStatusId.value;

		this.GetAgreementValue(AgreementStatusId);
		this.GetStateMappingState1(MFStateId);
	

	  this.ManufactureForm.controls['PrimaryCntName'].setValue(PrimaryCntName);
	  this.manufacturerreq.PrimaryCntName=this.f.PrimaryCntName.value;
	  this.ManufactureForm.controls['PrimaryCntDesignation'].setValue(PrimaryCntDesignation);
	  this.manufacturerreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
	  this.ManufactureForm.controls['PrimaryCntTelNo'].setValue(PrimaryCntTelNo);
	  this.manufacturerreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
	   this.ManufactureForm.controls['PrimaryCntLandlineNo'].setValue(PrimaryCntLandlineNo);
	  this.manufacturerreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
	  this.ManufactureForm.controls['PrimaryCntEmail'].setValue(PrimaryCntEmail);
	  this.manufacturerreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;
	  this.ManufactureForm.controls['SecCntName'].setValue(SecCntName);
	  this.manufacturerreq.SecCntName=this.f.SecCntName.value;
	  this.ManufactureForm.controls['SecCntDesignation'].setValue(SecCntDesignation);
	  this.manufacturerreq.SecCntDesignation=this.f.SecCntDesignation.value;
	  this.ManufactureForm.controls['SecCntTelNo'].setValue(SecCntTelNo);
	  this.manufacturerreq.SecCntTelNo=this.f.SecCntTelNo.value;
	  this.ManufactureForm.controls['SecCntLandlineNo'].setValue(SecCntLandlineNo);
	  this.manufacturerreq.SecCntLandlineNo=this.f.SecCntLandlineNo.value;
	  this.ManufactureForm.controls['SecCntEmail'].setValue(SecCntEmail);
	  this.manufacturerreq.SecCntEmail=this.f.SecCntEmail.value;
	 
	  
	  this.manufacturerreq.Manufacturerid=Manufacturerid;
	  this.manufacturerreq.PerformBy=localStorage.getItem('UserId');
	
	  this.manufacturerreq.Operation=2;
	 
	 
	  this.ViewDocumentReq=MFCode;
	  this.ViewDocument(this.ViewDocumentReq);

	
	}
	
	DeletetManufactureData(MFName,MFCode,MFAddress,MFCityIds,MFStateId,ExpiryDate,SignedDate,MFGST,AgreementStatusId,PrimaryCntName,PrimaryCntDesignation,PrimaryCntTelNo,PrimaryCntLandlineNo,PrimaryCntEmail,SecCntName,SecCntDesignation,SecCntTelNo,SecCntLandlineNo,SecCntEmail,Manufacturerid,CreationDate,Details)
	{		
	  this.GetStateMappingState();
		 
		 var newDate = new Date(ExpiryDate);
		 var newDate1= new Date(SignedDate);
		 console.log("ExpiryDate: "+newDate);
		
		this.successmsg = false;
		 this.ManufactureForm.controls['MFName'].setValue(MFName);
	  this.manufacturerreq.MFName=this.f.MFName.value;
		
	this.ManufactureForm.controls['MFCode'].setValue(MFCode);
	  this.manufacturerreq.MFCode=this.f.MFCode.value;
	  
	 
	  
	  this.ManufactureForm.controls['MFAddress'].setValue(MFAddress);
	  this.manufacturerreq.MFAddress=this.f.MFAddress.value;
	  this.ManufactureForm.controls['MFCityIds'].setValue(MFCityIds);
	  this.manufacturerreq.MFCityIds=this.f.MFCityIds.value;
	  this.ManufactureForm.controls['MFStateId'].setValue(MFStateId);
	  this.manufacturerreq.MFStateId=this.f.MFStateId.value;

	  this.ManufactureForm.controls['Details'].setValue(Details);
	  this.manufacturerreq.Details=this.f.Details.value;


	   //this.ManufactureForm.controls['Billingcycle'].setValue(Billingcycle);
	//  this.manufacturerreq.Billingcycle=this.f.Billingcycle.value;
	this.DispalayDate= ExpiryDate;
	this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
	this.manufacturerreq.ExpiryDate=this.DispalayDate;
	this.ManufactureForm.controls['ExpiryDate'].setValue(this.DispalayDate);


	this.DispalayCreationDate=CreationDate;
	 this.DispalayCreationDate= this.datepipe.transform(this.DispalayCreationDate, 'yyyy-MM-dd');
	 this.manufacturerreq.CreationDate=this.DispalayCreationDate;
	 this.ManufactureForm.controls['CreationDate'].setValue(this.DispalayCreationDate);

	 
	   this.DisplaySignedDate= SignedDate;
	this.DisplaySignedDate= this.datepipe.transform(this.DisplaySignedDate, 'yyyy-MM-dd');
	this.manufacturerreq.SignedDate=this.DisplaySignedDate
	this.ManufactureForm.controls['SignedDate'].setValue(this.DisplaySignedDate);


	  this.ManufactureForm.controls['MFGST'].setValue(MFGST);
	  this.manufacturerreq.MFGST=this.f.MFGST.value; 
	  this.ManufactureForm.controls['AgreementStatusId'].setValue(AgreementStatusId);
	  this.manufacturerreq.AgreementStatusId=this.f.AgreementStatusId.value;
	  this.CheckValidationForDeletereq.Id=Manufacturerid;
	 
	  
	 
	  
	  
	  this.ManufactureForm.controls['PrimaryCntName'].setValue(PrimaryCntName);
	  this.manufacturerreq.PrimaryCntName=this.f.PrimaryCntName.value;
	  this.ManufactureForm.controls['PrimaryCntDesignation'].setValue(PrimaryCntDesignation);
	  this.manufacturerreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
	  this.ManufactureForm.controls['PrimaryCntTelNo'].setValue(PrimaryCntTelNo);
	  this.manufacturerreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
	   this.ManufactureForm.controls['PrimaryCntLandlineNo'].setValue(PrimaryCntLandlineNo);
	  this.manufacturerreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
	  this.ManufactureForm.controls['PrimaryCntEmail'].setValue(PrimaryCntEmail);
	  this.manufacturerreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;
	  this.ManufactureForm.controls['SecCntName'].setValue(SecCntName);
	  this.manufacturerreq.SecCntName=this.f.SecCntName.value;
	  this.ManufactureForm.controls['SecCntDesignation'].setValue(SecCntDesignation);
	  this.manufacturerreq.SecCntDesignation=this.f.SecCntDesignation.value;
	  this.ManufactureForm.controls['SecCntTelNo'].setValue(SecCntTelNo);
	  this.manufacturerreq.SecCntTelNo=this.f.SecCntTelNo.value;
	  this.ManufactureForm.controls['SecCntLandlineNo'].setValue(SecCntLandlineNo);
	  this.manufacturerreq.SecCntLandlineNo=this.f.SecCntLandlineNo.value;
	  this.ManufactureForm.controls['SecCntEmail'].setValue(SecCntEmail);
	  this.manufacturerreq.SecCntEmail=this.f.SecCntEmail.value;
	//   this.ManufactureForm.controls['CreationDate'].setValue(CreationDate);
	//   this.manufacturerreq.CreationDate=this.f.CreationDate.value;
	   // this.ManufactureForm.controls['ReportingFrequency'].setValue(ReportingFrequency);	  
	  //this.manufacturerreq.ReportingFrequency=this.f.ReportingFrequency.value;
	  
	//   if(ReportingFrequency.search(",")>=0)
	// 	{
	// 		var ReportingFrequencyids=ReportingFrequency.split(',');
	// 		var SelectedReportingFrequencies=[];
	// 		for(var i=0;i<ReportingFrequencyids.length;i++)
	// 		{
	// 			for(var j=0;j<this.dropdownList.length;j++)
	// 			{
	// 				if(ReportingFrequencyids[i]==this.dropdownList[j].item_text)
	// 				{
	// 					SelectedReportingFrequencies.push(this.dropdownList[j]);
	// 				}
	// 			}
	// 		}
	// 		console.log("test");
	// 		this.ManufactureForm.controls['ReportingFrequency'].setValue(SelectedReportingFrequencies);
	// 	}
	  this.manufacturerreq.Manufacturerid=Manufacturerid;
	  this.manufacturerreq.PerformBy=localStorage.getItem('UserId');
	  this.manufacturerreq.Operation=3;
	}

EditManufacturer(){
	// this.ValidateDocStatus();
	 if(this.f.AgreementStatusId.value == 11){

		this.AddUpdateDeleteManufacturer();
	 }
	 else{
		this.ValidateDocStatus();
	 }
}

	
	/* Add Manufacturer Enrollment */
	AddUpdateDeleteManufacturer(){
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		 
		   if (this.ManufactureForm.invalid) {
			 this.loading = false;
			 return;
			
		 }		
		 
	  this.manufacturerreq.MFCode=this.f.MFCode.value;
	  this.manufacturerreq.MFName=this.f.MFName.value;
	  this.manufacturerreq.MFAddress=this.f.MFAddress.value;
	  this.manufacturerreq.MFCityIds=this.f.MFCityIds.value;
	  this.manufacturerreq.MFStateId=this.f.MFStateId.value;
	  //this.manufacturerreq.Billingcycle=this.f.Billingcycle.value;
	  this.manufacturerreq.ExpiryDate=this.f.ExpiryDate.value;
	  this.manufacturerreq.SignedDate=this.f.SignedDate.value;

	  this.manufacturerreq.MFGST=this.f.MFGST.value;
	  this.manufacturerreq.AgreementStatusId=this.f.AgreementStatusId.value;
	 // this.manufacturerreq.ReportingFrequency=this.f.ReportingFrequency.value;
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
	
	this.manufacturerreq.Details=this.f.Details.value;
		this.userService.manufacturerCRUD(this.manufacturerreq)
		   //.pipe()
			.subscribe(
				(data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.manufacturerdata=respData.Data;
						 this.AlertMessage=respData.m;
						 jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
						 this.ResetFrom();
						//jQuery("#myModalalert").modal("show");


						 if(this.manufacturerreq.Operation==1)
						 {

							localStorage.setItem('Manufacturerid', this.manufacturerdata[0].Manufacturerid);
							localStorage.setItem('MFCode', this.manufacturerdata[0].MFCode);
							localStorage.setItem('MFName', this.manufacturerdata[0].MFName);
							localStorage.setItem('AgreementStatusId', this.manufacturerdata[0].AgreementStatusId);

								


							jQuery("#myModal").modal("hide");
							jQuery("#myModaledit").modal("hide");
							//jQuery("#myModalalert").modal("hide");
							jQuery("#myModalconfirmation").modal("show");
							this.GetMFwastetype();
						// this.router.navigate(['/Addmanufacturer-Wastetype']);
						 }
						 else{
							this.AlertMessage=respData.m;
							jQuery("#myModal").modal("hide");
							jQuery("#myModaledit").modal("hide");
							jQuery("#myModalalert").modal("show");
						 }


						// this.alertService.success(''+respData.m, true);
						 //this.ResetFrom();
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
	RedirectToSubForm(){
		jQuery("#myModalconfirmation").modal("hide");

		this.router.navigate(['/Addmanufacturer-Wastetype'], {queryParams:{title:'true'}});
	
		
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
						this.ManufactureForm.controls['MFCode'].setValue(respData.Data);
						//this.alertService.success(''+ respData.m, true);
						//this.ViewDocument();
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
	
	
	/* Display Wastematerials */
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
	
	
	
	//Display waste type
	 // GetWastetype(){
	  
		 // this.loading = true;
		// this.userService.wastetypesCRUD(this.wastetypesreq)
		   // .pipe()
			// .subscribe(
				// (data:any) => {
					// var respData=data;
					// if(respData.s == 1)
					// {
						 // this.wastetypereqData=respData.Data;
					
					// }
					// else{
						// this.alertService.success(''+ respData.m, true);
						
					// } 
					// this.loading = false;
				// },
				// error => {
					// this.alertService.error(error);
					// this.loading = false;
				// });
	// }
	
	
	//Dispaly AGSuburbsCity Data

 getAgFromsuburboncityId(value){
  
   //this.WorkorderItemForm.controls['SuburbID'].setValue(0);
//	  this.suburbreq = {SuburbID:0, SuburbName:'', SuburbCode:'', CityId:value,PerformBy:'', Operation:0 };
	 this.loading = true;
	this.userService.SuburbCRUD(this.suburbreq)
	   .pipe()
		.subscribe(
			(data:any) => {
				var respData=data;
				if(respData.s == 1)
				{
					 this.Fromsuburbdata=respData.Data;
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
	
	/* Display processing type */
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
						 //this.fillProcessingType(ProcessingTypeId);
						 
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
		
		/* Fetch ID Manufacture to waste type */
		GetManufacturereId(Manufacturerid,MFName)
	{		 		 
	  this.manufacturerreq.Manufacturerid=Manufacturerid;
	  this.ManufacturerName=MFName;
	  this.mfwastetypereq.Operation=0;
	 this.GetMFwastetype();
	}
	
	RedirectToMFWasteType(Manufacturerid, MFName)
	{
		//this.dataService.setOption('WorkOrderId', WorkOrderId);  
		localStorage.setItem('Manufacturerid', Manufacturerid);
		localStorage.setItem('MFName', MFName);
	}
	//Waste type manufacturer  submit 
onSubmitmfwastetype() {
		this.submitted = true;
		
		
		
		
		if(this.mfwastetypereq.ProcessingTypeId=="")
		{
			this.IsValidPT=false;
		
			return;
		}
			

		// stop here if form is invalid
		if (this.AddMFwastetypeForm.invalid) {
			return;
		}
		
	  this.mfwastetypereq.ManufacturerId = this.manufacturerreq.Manufacturerid;
	  this.mfwastetypereq.WasteMaterialIds=this.g.WasteMaterialIds.value;
	  this.mfwastetypereq.ProductionCapacity=this.g.ProductionCapacity.value;
	  this.mfwastetypereq.PreferredDispSystem=this.g.PreferredDispSystem.value;
	 this.mfwastetypereq.AnnualConsumption=this.g.AnnualConsumption.value;
	  this.mfwastetypereq.EPRTarget=this.g.EPRTarget.value;
	  this.mfwastetypereq.FocusStateIds=this.g.FocusStateIds.value;
	 this.mfwastetypereq.FocusCityIds=this.g.FocusCityIds.value;
	 this.mfwastetypereq.SuburbId=this.g.SuburbId.value;
	  //this.mfwastetypereq.ProcessingTypeId=this.g.ProcessingTypeId.value;
	  this.mfwastetypereq.EngagedwithAnother=this.g.EngagedwithAnother.value;
	  //this.mfwastetypereq.EngagedwithAnotherPRO=this.g.EngagedwithAnotherPRO.value;
	  this.mfwastetypereq.MFWasteTypeId=0;
	  this.mfwastetypereq.PerformBy=localStorage.getItem('UserId');
	  this.mfwastetypereq.Operation=1;
	 
	  this.AddUpdateDeleteAddMFwastetype();
	}
	
	
	
	get g() { return this.AddMFwastetypeForm.controls; }
	
	get h() { return this.ManufactureSearchForm.controls; }
	
	
	/* Display Manufacture Waste type */
	GetMFwastetype(){
	//this.mfwastetypereq.ManufacturerId = 0;
	 this.mfwastetypereq.ManufacturerId = this.manufacturerreq.Manufacturerid;
		 this.loading = true;
		this.userService.MFwastetypeCRUD(this.mfwastetypereq)
		   .pipe()
			.subscribe(
				(data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.mfwastetypedata=respData.Data;
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
	
	/* Crud operation in manufacturer Waste types */
	
	
	EditMfWasteTypeData(WasteMaterialIds,ProductionCapacity,PreferredDispSystem,AnnualConsumption,EPRTarget,FocusStateIds,FocusCityIds,SuburbId,ProcessingTypeId,EngagedwithAnotherPRO,MFWasteTypeId)
	{
		// this.AGWasteTypesreq.AggregatorId=this.aggregatorreq.AggregatorId;
		this.successmsg = false;
		
		this.AddMFwastetypeForm.controls['WasteMaterialIds'].setValue(WasteMaterialIds);
		this.AddMFwastetypeForm.controls['ProductionCapacity'].setValue(ProductionCapacity);
		this.AddMFwastetypeForm.controls['PreferredDispSystem'].setValue(PreferredDispSystem);
		this.AddMFwastetypeForm.controls['AnnualConsumption'].setValue(AnnualConsumption);
		this.AddMFwastetypeForm.controls['EPRTarget'].setValue(EPRTarget);
		this.AddMFwastetypeForm.controls['FocusStateIds'].setValue(FocusStateIds);
		this.AddMFwastetypeForm.controls['FocusCityIds'].setValue(FocusCityIds);
		this.AddMFwastetypeForm.controls['SuburbId'].setValue(SuburbId);
			
		//this.AddMFwastetypeForm.controls['ProcessingTypeId'].setValue(ProcessingTypeId);
		
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
			this.AddMFwastetypeForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType);
		}
		 

		 /* Start IF else EngagedwithAnotherPRO */
		 if(EngagedwithAnotherPRO!="")
		 {
			 this.enableInput=true;
			 this.AddMFwastetypeForm.controls['EngagedwithAnother'].setValue(true);
			 this.AddMFwastetypeForm.controls['EngagedwithAnotherPRO'].setValue(EngagedwithAnotherPRO);
		 }
		 else
		 {
			  this.enableInput=false;
			  this.AddMFwastetypeForm.controls['EngagedwithAnother'].setValue(false);
			 this.AddMFwastetypeForm.controls['EngagedwithAnotherPRO'].setValue('');
		 }

		 this.mfwastetypereq.WasteMaterialIds=this.g.WasteMaterialIds.value;
		 this.mfwastetypereq.ProductionCapacity=this.g.ProductionCapacity.value;
		 this.mfwastetypereq.PreferredDispSystem=this.g.PreferredDispSystem.value;
		 this.mfwastetypereq.AnnualConsumption=this.g.AnnualConsumption.value;
		 this.mfwastetypereq.EPRTarget=this.g.EPRTarget.value;
		 this.mfwastetypereq.FocusStateIds=this.g.FocusStateIds.value;
		 this.mfwastetypereq.FocusCityIds=this.g.FocusCityIds.value;
		 this.mfwastetypereq.SuburbId=this.g.SuburbId.value;		
		 //this.mfwastetypereq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		 this.mfwastetypereq.EngagedwithAnotherPRO=this.g.EngagedwithAnotherPRO.value;
		 

	   this.mfwastetypereq.MFWasteTypeId=MFWasteTypeId;
	  this.mfwastetypereq.PerformBy=localStorage.getItem('UserId');
	  this.mfwastetypereq.Operation=2;
	  this.GetCityByStateId(FocusStateIds,FocusCityIds);
	 
	}
	
	fillcitydata(FocusCityIds)
	{
		if(FocusCityIds.search(",")>=0)
		{
			var selectedcitiesids=FocusCityIds.split(',');
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
			this.AddMFwastetypeForm.controls['FocusCityIds'].setValue(SelectedCities);
		}
	}
	
	
	fillProcessingType(ProcessingTypeId)
	{
		
		if(ProcessingTypeId.search(",")>=0)
		{
			var selectedProcessingTypeIds=ProcessingTypeId.split(',');
			var SelectedProcessingType=[];
			for(var i=0;i<selectedProcessingTypeIds.length;i++)
			{
				for(var j=0;j<this.processingtypedata.length;j++)
				{
					if(selectedProcessingTypeIds[i]==this.processingtypedata[j].ProcessingTypeId)
					{
						SelectedProcessingType.push(this.processingtypedata[j]);
					}
				}
			}
			console.log("test");
			this.AddMFwastetypeForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType);
		}
		
	}
	DeleteMfWasteTypeData(WasteMaterialIds,ProductionCapacity,PreferredDispSystem,AnnualConsumption,EPRTarget,FocusStateIds,FocusCityIds,SuburbId,ProcessingTypeId,EngagedwithAnotherPRO,MFWasteTypeId)
	{
		// this.AGWasteTypesreq.AggregatorId=this.aggregatorreq.AggregatorId;
		this.successmsg = false;
		
		this.AddMFwastetypeForm.controls['WasteMaterialIds'].setValue(WasteMaterialIds);
		this.AddMFwastetypeForm.controls['ProductionCapacity'].setValue(ProductionCapacity);
		this.AddMFwastetypeForm.controls['PreferredDispSystem'].setValue(PreferredDispSystem);
		this.AddMFwastetypeForm.controls['AnnualConsumption'].setValue(AnnualConsumption);
		this.AddMFwastetypeForm.controls['EPRTarget'].setValue(EPRTarget);
		this.AddMFwastetypeForm.controls['FocusStateIds'].setValue(FocusStateIds);
		this.AddMFwastetypeForm.controls['FocusCityIds'].setValue(FocusCityIds);
		this.AddMFwastetypeForm.controls['SuburbId'].setValue(SuburbId);
			
		//this.AddMFwastetypeForm.controls['ProcessingTypeId'].setValue(ProcessingTypeId);
		
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
			this.AddMFwastetypeForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType);
		}
		 

		 /* Start IF else EngagedwithAnotherPRO */
		 if(EngagedwithAnotherPRO!="")
		 {
			 this.enableInput=true;
			 this.AddMFwastetypeForm.controls['EngagedwithAnother'].setValue(true);
			 this.AddMFwastetypeForm.controls['EngagedwithAnotherPRO'].setValue(EngagedwithAnotherPRO);
		 }
		 else
		 {
			  this.enableInput=false;
			  this.AddMFwastetypeForm.controls['EngagedwithAnother'].setValue(false);
			 this.AddMFwastetypeForm.controls['EngagedwithAnotherPRO'].setValue('');
		 }
		  
		 
		 this.mfwastetypereq.WasteMaterialIds=this.g.WasteMaterialIds.value;
		 this.mfwastetypereq.ProductionCapacity=this.g.ProductionCapacity.value;
		 this.mfwastetypereq.PreferredDispSystem=this.g.PreferredDispSystem.value;
		 this.mfwastetypereq.AnnualConsumption=this.g.AnnualConsumption.value;
		 this.mfwastetypereq.EPRTarget=this.g.EPRTarget.value;
		 this.mfwastetypereq.FocusStateIds=this.g.FocusStateIds.value;
		 this.mfwastetypereq.FocusCityIds=this.g.FocusCityIds.value;
		 this.mfwastetypereq.SuburbId=this.g.SuburbId.value;		
		 //this.mfwastetypereq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		 this.mfwastetypereq.EngagedwithAnotherPRO=this.g.EngagedwithAnotherPRO.value;
		 

	   this.mfwastetypereq.MFWasteTypeId=MFWasteTypeId;
	  this.mfwastetypereq.PerformBy=localStorage.getItem('UserId');
	  this.mfwastetypereq.Operation=3;
	 
	}

	
	
	AddUpdateDeleteAddMFwastetype(){	
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		 
		  if (this.AddMFwastetypeForm.invalid) {
		this.loading = false;
		return;
		
	}
	
		this.mfwastetypereq.WasteMaterialIds=this.g.WasteMaterialIds.value;
		 this.mfwastetypereq.ProductionCapacity=this.g.ProductionCapacity.value;
		 this.mfwastetypereq.PreferredDispSystem=this.g.PreferredDispSystem.value;
		 this.mfwastetypereq.AnnualConsumption=this.g.AnnualConsumption.value;
		 this.mfwastetypereq.EPRTarget=this.g.EPRTarget.value;
		 this.mfwastetypereq.FocusStateIds=this.g.FocusStateIds.value;
		this.mfwastetypereq.FocusCityIds=this.g.FocusCityIds.value;
		this.mfwastetypereq.SuburbId=this.g.SuburbId.value;
		// this.mfwastetypereq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		 //this.mfwastetypereq.EngagedwithAnotherPRO=this.g.EngagedwithAnotherPRO.value;
		 this.mfwastetypereq.EngagedwithAnother=this.g.EngagedwithAnother.value;
		 
		 
		this.userService.MFwastetypeCRUD(this.mfwastetypereq)
		   //.pipe()
			.subscribe(
				(data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.mfwastetypedata=respData.Data;
						// this.alertService.success(''+respData.m, true);
						this.AlertMessage=respData.m;

						jQuery("#myModalAddwesteMaterialDetails").modal("hide");
						jQuery("#myModaleditWestMaterial").modal("hide");

						
						this.ResetFrom();
						jQuery("#myModalalert").modal("show");
						
						 
					}
					else{
						this.alertService.error(''+ respData.m, true);
						
					} 
					this.loading = false;
					this.successmsg = true;
					this.submitted=false;
					this.IsValidPT=true;
					
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
					
				});
	}
	
	
	
	print() {
		// window.print();
		// this.AvoidPrint=false;
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
this.excelService.exportAsExcelFile(this.manufacturerdata, 'Manufacturer Report');
}
	/* Start ProcessingType Multiple select */
	onItemSelect(item: any) {
		console.log(item);
	
		if(this.mfwastetypereq.ProcessingTypeId=="")
		{
			this.mfwastetypereq.ProcessingTypeId=item.ProcessingType;
		}
		else
		{
			this.mfwastetypereq.ProcessingTypeId+=","+item.ProcessingType;
		}
		console.log("indivisual selected Processing Type values :" + this.mfwastetypereq.ProcessingTypeId);
	  }

	  onSelectAll(items: any) {
		console.log(items);
		
		this.mfwastetypereq.ProcessingTypeId="";
		

		for(var i=0; i<items.length;i++)
		{
			if (i==0)
			{
				this.mfwastetypereq.ProcessingTypeId=items[i].ProcessingType;
			}
			else
			{
				this.mfwastetypereq.ProcessingTypeId+=","+items[i].ProcessingType;
			}
		}
		console.log("selected Processing Type values :" + this.mfwastetypereq.ProcessingTypeId);
		
	  }
	  
	  /* End Processing Type multiselect*/

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
			this.ManufactureForm.controls['ExpiryDate'].setValue(today);
			this.ManufactureForm.controls['SignedDate'].setValue(today);

	 
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

	//	this.Docreq.AutoCode=this.f.MFCode.value;
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
				//    //this.alertService.success(''+ respData.m, true);
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


ScrolltoTopfunction(){
	
	var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
		form.addEventListener('submit', function(event) {
  
		  if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
  
			var errorElements = document.querySelectorAll(
			  "input.form-control:invalid");
			errorElements.forEach(function(element) {
			//   element.parentNode.childNodes.forEach(function(node) {
			// 	if (node.className == 'valid-feedback') {
			// 	  node.className = 'invalid-feedback';
			// 	  node.innerText =
			// 		'Please choose a Gender';
			// 	}
			//   });
			});

			
			// jQuery('html, body').animate({
			//   scrollTop: j(errorElements[0]).offset().top
			// }, 2000);
		  }
		  form.classList.add('was-validated');
		}, false);
	  });
	

}

// ValidateDocStatus()
// {
// 	this.DocStatusReq.FormId=this.value;
// 	this.DocStatusReq.AutoCode=this.f.MFCode.value;
// 	this.loading = true;
//    this.userService.ValidateDocStatus(this.DocStatusReq)
// 	  .pipe()
// 	   .subscribe(
// 		   (data:any) => {
// 			   var respData=data;
// 			   if(respData.s == 1)
// 			   {
// 					this.DocStatusData=respData.Data;
					
// 					if(this.DocStatusData=='Success')
// 					{
// 						 this.AddUpdateDeleteManufacturer();
// 						 //jQuery("#myModalalert").modal("hide");
// 					}
// 					else
// 					{
// 						this.AlertMessage=this.DocStatusData;
// 						jQuery("#myModalalert").modal("show");
// 					}
					
// 				   //this.alertService.success(''+ respData.m, true);
					
// 			   }
// 			   else{
// 				   this.alertService.error(''+ respData.m, true);
				   
// 			   } 
// 			   this.loading = false;
// 			   this.submitted = false;
// 		   },
// 		   error => {
// 			   this.alertService.error(error);
// 			   this.loading = false;
			   
// 		   });
// }



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
				this.AddUpdateDeleteManufacturer();
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
