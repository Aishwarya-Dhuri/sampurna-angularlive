import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, EmailValidator} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService,ExcelService } from '../_services';
import { DatePipe } from '@angular/common'
declare var jQuery:any; 

@Component({
  selector: 'app-transporter-enrolment',
  templateUrl: './transporter-enrolment.component.html',
  styleUrls: ['./transporter-enrolment.component.css']
})
export class TransporterEnrolmentComponent implements OnInit {
UserId=localStorage.getItem('UserId');
	SignedSelected: boolean;
	TerminatedSelected: boolean;
	public NoneAgreementStatusSelected =true;
	public transportreq = {TransporterId:0, TRCode:'', TRName:'', TRAddress:'', TRCityId:'', TRDetails:'', GSTNo:'',PanNumber:'',StateId:0,AgreementStatusId:0,PrimaryCntName:'',PrimaryCntDesignation:'',PrimaryCntTelNo:'',PrimaryCntLandlineNo:'',PrimaryCntEmail:'',SecCntName:'',SecCntDesignation:'',SecCntTelNo:'',SecCntLandlineNo:'',SecCntEmail:'',ExpiryDate:'', PerformBy:'', Operation:0,CreationDate:'',SignedDate:'' };
	public Transportdata;
	base64string:any;
	public value = 3;
	public DocData;
	//Data City
	public cityreq = {CityId:0, CityName:'', CityCode:'', PerformBy:'', Operation:0 };
	public citydata;
	 public DocStatusReq={ FormId:0,AutoCode:''};
	public DocStatusData;
	//state data
	public CheckValidationForDeletereq={FormName:'Transporters',Id:0};
	public statemasterreq = {Stateid:0, StateName:'', StateCode:'', PerformBy:'', Operation:0 };
	public statemasterdata;
	public GetNamesByCityIdreq={FormName:'Transporters',CityId:0}
	 public ViewDocumentReq;
  public Docreq = {DocumentId :0, FormId :0 ,DocumentTypeId :0 , DocumentName  :'' ,Image  :'' , DocumentDetails :'', UserId :'', Option :'', DocGuid :'Transporter', AutoCode :''};
  public DocumentData;
  DocUploadForm : FormGroup;
	
	//Data Vehicle
	public vehicletypereq = {VehicleTypeId:0, VehicleType:'', LoadCapacity:'', BodyType:'', PerformBy:'', Operation:0 };
	public vehicletypedata;
	
	//Transport Data
	
	public TransportRoutesVehiclereq ={TRVehicleId:0, TRVehicleTypeId:0, VehicleType:'', TransporterId:0, TRName:'', TransportRoutes:'', TransportRoutesdesc:'', VechicleDims:'', MaxCapacityForTransport:'', LeadTime:'', PerformBy:'', Operation:0};
	public TransportRoutesVehicleData;
	
	//Transport Route
	public transportroutereq = {TransportRouteId:0,TransportRouteName:'', FromCityId:0, FromSuburbId:0, ToCityId:0, ToSuburbId:0,ViaCityId:0, ViaSuburbId:0, PerformBy:'', Operation:0 };
	public transportVehicledata;
	
	//Transport Aggrement Data
	public StatusListreq = {StatusId:0, StatusName:'', StatusType:'Aggrement', Comments:'', PerformBy:'', Operation:0 };
	public TransportationStatusdata;
	
	//Data GenerateCode
	public GenerateCodeNamereq={InputField:'',FormName:''};
	public GenerateCodeNameData;
		
	public TransporterFilterreq={TextToSearch:'',CityId:0,StateId:0,TranspoterName:'',AgreementStatusId:0};
	public TodayDateC;
	public TodayDate;
	public DispalayDate;
	public DispalayCreationDate;
	public TranspoterName;
	public citydata1;
	public DisplaySignedDate;
	 submitted = false;
	loading = false;
	successmsg = false;
	TransportForm:FormGroup;
	TransportVehicleForm:FormGroup;
	VehicaleForm:FormGroup;
	TransporterFilterForm:FormGroup;
	TRNameList:any;
	TransportationStatusdata1:any;
	
	  //sameasabove
		public secName;
		public secDesig ;
		public SecCntTel ;
		public SecCntLandline ;
		public SecCntEmail;
	AlertMessage: any;
	ShowBlock: boolean;
		
		
		
  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,public datepipe: DatePipe,private router: Router,private excelService:ExcelService)

  {
	 this.GetCities();
	this.GetTransport();
	this.GetVehicletype();
	this.GetTransportVehicle();
	this.GetTransportroute();
	this.GetTransportVehicle();
	this.GetTransportationStatus();
	this.DisplayDate();
	this.GetState();
	  this.GetStateMappingState1();
		   this.GetTRNameById();
		   this.GetTransportationStatus1();
		   this.GetDocTypesByFormId(this.value);
  }
  
  toggleEditable(event) {
     if ( event.target.checked ) 
		{
		 this.TransportForm.controls['SecCntName'].setValue(this.f.PrimaryCntName.value);
		 this.TransportForm.controls['SecCntDesignation'].setValue(this.f.PrimaryCntDesignation.value);
		 this.TransportForm.controls['SecCntTelNo'].setValue(this.f.PrimaryCntTelNo.value);
		 this.TransportForm.controls['SecCntLandlineNo'].setValue(this.f.PrimaryCntLandlineNo.value);
		 this.TransportForm.controls['SecCntEmail'].setValue(this.f.PrimaryCntEmail.value);
        
		}
		else
		{
		this.TransportForm.controls['SecCntName'].setValue('');
		 this.TransportForm.controls['SecCntDesignation'].setValue('');
		 this.TransportForm.controls['SecCntTelNo'].setValue('');
		 this.TransportForm.controls['SecCntLandlineNo'].setValue('');
		 this.TransportForm.controls['SecCntEmail'].setValue('');
		}	
		
	}

  ngOnInit() {
	this.NoneAgreementStatusSelected =true;
	this.SignedSelected = false;
	this.TerminatedSelected = false;
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
	   this.TransportForm = this.formBuilder.group({
            TRCode: ['', Validators.required],
            TRName: ['', Validators.required],
            TRAddress: ['', Validators.required],
            TRCityId: ['', Validators.required],
            TRDetails: [''],
			GSTNo: [''],
			PanNumber: ['', Validators.required],
			StateId:[0,Validators.required],
            AgreementStatusId: ['', Validators.required],
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
           ExpiryDate: ['', Validators.required],
      CheckboxSelect: [false],
			CreationDate:[''],
			SignedDate :['',Validators.required],  
			            
        });	

			 this.TransportVehicleForm = this.formBuilder.group({
            TRVehicleTypeId: ['', Validators.required],    
            TransportRoutes: ['',Validators.required],
           MaxCapacityForTransport: ['', Validators.required],
           LeadTime: ['', Validators.required]
			            
        });	
		
		this.TransporterFilterForm = this.formBuilder.group({
				StateId:[0],
				CityId:[0],
				TranspoterName:[''],				
				AgreementStatusId:[0],				
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
  }
  get d() { return this.DocUploadForm.controls; }
  get fd() { return this.TransporterFilterForm.controls; }
  
	  SearchTransporters(searchValue : string)
	  {
		this.TransporterFilterForm.controls['StateId'].setValue(0);

		  this.TransporterFilterForm.controls['CityId'].setValue(0);
		  this.TransporterFilterForm.controls['TranspoterName'].setValue('');
		  this.TransporterFilterForm.controls['AgreementStatusId'].setValue(0);
		  if(searchValue.length>1)
		  {
			  console.log("Call API");
			  this.TransporterFilterreq.TextToSearch=searchValue;
			  this.TransporterFilterreq.StateId=0;

			  this.TransporterFilterreq.CityId=0;
			  this.TransporterFilterreq.TranspoterName=null;
			  this.TransporterFilterreq.AgreementStatusId=0;
			  this.SearchAndFilterTransporters();
		  }
		  else
		  {
			  this.TransporterFilterreq.TextToSearch='';
			  this.TransporterFilterreq.StateId=0;

			   this.TransporterFilterreq.CityId=0;
			  this.TransporterFilterreq.TranspoterName=null;
			  this.TransporterFilterreq.AgreementStatusId=0;
			  this.SearchAndFilterTransporters();
			 // this.SearchAndFilterTransporters();
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
        FilterOnState(value)
		{
			this.TransporterFilterForm.controls['CityId'].setValue(0);
			this.TransporterFilterForm.controls['TranspoterName'].setValue('');
			this.TransporterFilterForm.controls['AgreementStatusId'].setValue(0);
			this.TransporterFilterreq.TextToSearch='';
			this.TransporterFilterreq.StateId=value;
			this.TransporterFilterreq.CityId=0;
			this.TransporterFilterreq.TranspoterName='';
			this.TransporterFilterreq.AgreementStatusId=0;
			this.SearchAndFilterTransporters();

		}
		
		FilterOnCity(value)
		{
		  //this.TRNameList=undefined;
		 // this.TransportationStatusdata1=undefined;
		 this.TransporterFilterForm.controls['StateId'].setValue(0);

		  this.TransporterFilterForm.controls['TranspoterName'].setValue('');
		  this.TransporterFilterForm.controls['AgreementStatusId'].setValue(0);
		  this.TransporterFilterreq.TextToSearch='';
		  this.TransporterFilterreq.CityId=value;
		  this.TransporterFilterreq.TranspoterName='';
		  this.TransporterFilterreq.AgreementStatusId=0;
		  this.SearchAndFilterTransporters();
		 
		}
		
		FilterOnName(value)
		{		
		 // this.TransportationStatusdata1=undefined;
		 this.TransporterFilterForm.controls['StateId'].setValue(0);

		  this.TransporterFilterForm.controls['CityId'].setValue(0);
		  this.TransporterFilterForm.controls['AgreementStatusId'].setValue(0);
		  this.TransporterFilterreq.TextToSearch='';
		  this.TransporterFilterreq.StateId=0;

		  this.TransporterFilterreq.CityId=0;
		  this.TransporterFilterreq.TranspoterName=value;
		  this.TransporterFilterreq.AgreementStatusId=0;
		  this.SearchAndFilterTransporters()
		  
		}
		
		FilterOnAGStatus(value)
		{
			this.TransporterFilterForm.controls['StateId'].setValue(0);

		  this.TransporterFilterForm.controls['CityId'].setValue(0);
		  this.TransporterFilterForm.controls['TranspoterName'].setValue('');
		  this.TransporterFilterreq.TextToSearch='';
		  this.TransporterFilterreq.StateId=this.fd.StateId.value;

		  this.TransporterFilterreq.CityId=this.fd.CityId.value;
		  this.TransporterFilterreq.TranspoterName=this.fd.TranspoterName.value;
		  this.TransporterFilterreq.AgreementStatusId=value;
		  this.SearchAndFilterTransporters();
		}
		
		GetTRNameById()
		{
			this.loading = true;
	        this.userService.GetNamesByCityId(this.GetNamesByCityIdreq)
	           .pipe()
	            .subscribe(
	                (data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							this.TRNameList=respData.Data;
							
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
		
		GetTransportationStatus1()
		{	  
		 this.loading = true;
        this.userService.StatusListCRUD(this.StatusListreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.TransportationStatusdata1=respData.Data;
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
	
	GetStateMappingState1()
	{
			this.loading = true;
	        this.userService.GetCitiesByStateIdCRUD({StateId:0})
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
		
		
		GetStateMappingState(value)
	{
			this.loading = true;
	        this.userService.GetCitiesByStateIdCRUD({StateId:value})
	           .pipe()
	            .subscribe(
	                (data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							this.citydata=respData.Data;
							this.TransportForm.controls['TRCityId'].setValue(this.citydata[0].CityId);

							
							
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
	
	 SearchAndFilterTransporters(){
		  
			 this.loading = true;
	        this.userService.SortFilterTransporters(this.TransporterFilterreq)
	           .pipe()
	            .subscribe(
	                (data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							 this.Transportdata=respData.Data;
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
  
  
  //Same as  above
  RedirectToAddVehicle(TransporterId, TRName)
  {
	  //this.dataService.setOption('WorkOrderId', WorkOrderId);  
	  localStorage.setItem('TransporterId', TransporterId);
	  localStorage.setItem('TRName', TRName);
  }
	
  
  
   onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.TransportForm.invalid) {
            return;
        }
		
	  this.transportreq.TRCode=this.f.TRCode.value;
	  this.transportreq.TRName=this.f.TRName.value;
	  this.transportreq.TRAddress=this.f.TRAddress.value;
	  this.transportreq.TRCityId=this.f.TRCityId.value;
	  this.transportreq.TRDetails=this.f.TRDetails.value;
	  this.transportreq.GSTNo=this.f.GSTNo.value;
	  this.transportreq.PanNumber=this.f.PanNumber.value;
	  this.transportreq.StateId=this.f.StateId.value;

	  this.transportreq.AgreementStatusId=this.f.AgreementStatusId.value;
	  	this.transportreq.PrimaryCntName=this.f.PrimaryCntName.value;
		this.transportreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
		this.transportreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
		this.transportreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
		this.transportreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;
		this.transportreq.SecCntName='';//this.f.SecCntName.value;
		this.transportreq.SecCntDesignation='';//this.f.SecCntDesignation.value;
		this.transportreq.SecCntTelNo='';//this.f.SecCntTelNo.value;
		this.transportreq.SecCntLandlineNo='';//this.f.SecCntLandlineNo.value;
		this.transportreq.SecCntEmail='';//this.f.SecCntEmail.value;
	  this.transportreq.ExpiryDate='';//this.f.ExpiryDate.value;
	  this.transportreq.SignedDate =this.f.SignedDate.value;
	  
	  this.transportreq.TransporterId=0;
	  this.transportreq.PerformBy=localStorage.getItem('UserId');
	  this.transportreq.Operation=1;

	 // this.ValidateDocStatus();
	 
	 if(this.f.AgreementStatusId.value == 11){

		this.AddUpdateDeleteTransport();
	 }
	 else{
		this.ValidateDocStatus();
	 }
    }
	



	get g() { return this.TransportVehicleForm.controls; }
	
	GetTransporterId(TransporterId,TRName)
	{		 		 
		this.TranspoterName=TRName;
	  this.TransportRoutesVehiclereq.TransporterId=TransporterId;
	 this.GetTransportVehicle();
	}
	
	EditTransporter(){
		if(this.f.AgreementStatusId.value == 11){

			this.AddUpdateDeleteTransport();
		 }
		 else{
			this.ValidateDocStatus();
		 }
	}
	onSubmitTransportVehicle() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.TransportVehicleForm.invalid) {
            return;
        }
		
		this.TransportRoutesVehiclereq.TRVehicleTypeId=this.g.TRVehicleTypeId.value;
		this.TransportRoutesVehiclereq.TransportRoutes=this.g.TransportRoutes.value;
		this.TransportRoutesVehiclereq.MaxCapacityForTransport=this.g.MaxCapacityForTransport.value;
		this.TransportRoutesVehiclereq.LeadTime=this.g.LeadTime.value;
	  
	  
	  this.TransportRoutesVehiclereq.TRVehicleId=0;
	  this.TransportRoutesVehiclereq.PerformBy=localStorage.getItem('UserId');
	  this.TransportRoutesVehiclereq.Operation=1;
	 
      this.AddUpdateDeleteTransportVehicle();
    }
	
	
	
	
	  ResetFrom(){
		this.TransportForm.reset();
		this.TransportVehicleForm.reset();
		this.successmsg = false;
		this.submitted =false;
		this.NoneAgreementStatusSelected=true;
		this.SignedSelected = false;
		this.TerminatedSelected = false;
		this.DocUploadForm.reset();
		this.DocumentData=undefined;
		//this.NoneAgreementStatusSelected=true;
		this.ShowBlock =false;
		this.citydata=undefined;
	  //this.SignedSelected = false;
	  //this.TerminatedSelected = false;
	}
	
	GenerateMFCode(value)
		{
			this.TransportForm.controls['CreationDate'].setValue(this.TodayDateC);
			console.log("TR CODe :"+value.substring(0,4));
			this.GenerateCodeNamereq.InputField=value.substring(0,4);
			this.GenerateCodeNamereq.FormName='Transporters';
			this.GetGenerateCode();			
		}
	
	
	resetValue() {
    this.TransportForm.controls['ExpiryDate'].setValue(this.currentDate());
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
  
  
EditTransportData(TRCode,TRName,TRAddress,StateId,PanNumber,TRCityId,TRDetails,GSTNo,AgreementStatusId,ExpiryDate,PrimaryCntName,PrimaryCntDesignation,PrimaryCntTelNo,PrimaryCntLandlineNo,PrimaryCntEmail,SecCntName,SecCntDesignation,SecCntTelNo,SecCntLandlineNo,SecCntEmail,TransporterId,CreationDate,SignedDate)
	{
		this.successmsg = false;
		this.TransportForm.controls['TRCode'].setValue(TRCode);
		this.TransportForm.controls['TRName'].setValue(TRName);
		this.TransportForm.controls['TRAddress'].setValue(TRAddress);
		this.TransportForm.controls['StateId'].setValue(StateId);

		this.TransportForm.controls['TRCityId'].setValue(TRCityId);
		this.TransportForm.controls['TRDetails'].setValue(TRDetails);
		this.TransportForm.controls['GSTNo'].setValue(GSTNo);
		this.TransportForm.controls['PanNumber'].setValue(PanNumber);
		
		this.TransportForm.controls['AgreementStatusId'].setValue(AgreementStatusId);
	
		  
		
		this.TransportForm.controls['PrimaryCntName'].setValue(PrimaryCntName);
		this.TransportForm.controls['PrimaryCntDesignation'].setValue(PrimaryCntDesignation);
		this.TransportForm.controls['PrimaryCntTelNo'].setValue(PrimaryCntTelNo);
		this.TransportForm.controls['PrimaryCntLandlineNo'].setValue(PrimaryCntLandlineNo);
		this.TransportForm.controls['PrimaryCntEmail'].setValue(PrimaryCntEmail);
		this.TransportForm.controls['SecCntName'].setValue(SecCntName);
		this.TransportForm.controls['SecCntDesignation'].setValue(SecCntDesignation);
		this.TransportForm.controls['SecCntTelNo'].setValue(SecCntTelNo);
		this.TransportForm.controls['SecCntLandlineNo'].setValue(SecCntLandlineNo);
		this.TransportForm.controls['SecCntEmail'].setValue(SecCntEmail);
		
		// this.transportreq.CreationDate=this.DispalayCreationDate;
		 this.transportreq.TRCode=this.f.TRCode.value;
		 this.transportreq.TRName=this.f.TRName.value;
		 this.transportreq.TRAddress=this.f.TRAddress.value;
		 this.transportreq.StateId=this.f.StateId.value;

		 this.transportreq.TRCityId=this.f.TRCityId.value;
		 this.transportreq.TRDetails=this.f.TRDetails.value;
		 this.transportreq.GSTNo=this.f.GSTNo.value;
		 this.transportreq.PanNumber=this.f.PanNumber.value;

		 this.transportreq.AgreementStatusId=this.f.AgreementStatusId.value;
		// this.transportreq.ExpiryDate=this.f.ExpiryDate.value;
		 	this.transportreq.PrimaryCntName=this.f.PrimaryCntName.value;
		this.transportreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
		this.transportreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
		this.transportreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
		this.transportreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;	
		  this.transportreq.SecCntName=this.f.SecCntName.value;
		  this.transportreq.SecCntDesignation=this.f.SecCntDesignation.value;
		  this.transportreq.SecCntTelNo=this.f.SecCntTelNo.value;
		  this.transportreq.SecCntLandlineNo=this.f.SecCntLandlineNo.value;
		  this.transportreq.SecCntEmail=this.f.SecCntEmail.value;

		  this.DispalayDate= ExpiryDate;
		  this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		  this.transportreq.ExpiryDate=this.DispalayDate;
		  this.TransportForm.controls['ExpiryDate'].setValue(this.DispalayDate);
	 
	 
		  this.DispalayCreationDate=CreationDate;
		   this.DispalayCreationDate= this.datepipe.transform( this.DispalayCreationDate, 'yyyy-MM-dd');
		   this.transportreq.CreationDate=this.DispalayCreationDate;
		   this.TransportForm.controls['CreationDate'].setValue(this.DispalayCreationDate);
	 
		   
			 this.DisplaySignedDate= SignedDate;
		  this.DisplaySignedDate= this.datepipe.transform(this.DisplaySignedDate, 'yyyy-MM-dd');
		  this.transportreq.SignedDate=this.DisplaySignedDate
		  this.TransportForm.controls['SignedDate'].setValue(this.DisplaySignedDate);


		

			this.GetAgreementValue(AgreementStatusId);
			this.GetStateMappingState(StateId);
	  this.transportreq.TransporterId=TransporterId;
	  this.transportreq.PerformBy=localStorage.getItem('UserId');
	  this.transportreq.Operation=2;
	   this.ViewDocument();
	}
	
	
	DeleteTransportData(TRCode,TRName,TRAddress,StateId,PanNumber,TRCityId,TRDetails,GSTNo,AgreementStatusId,ExpiryDate,PrimaryCntName,PrimaryCntDesignation,PrimaryCntTelNo,PrimaryCntLandlineNo,PrimaryCntEmail,SecCntName,SecCntDesignation,SecCntTelNo,SecCntLandlineNo,SecCntEmail,TransporterId,CreationDate,SignedDate)
	{
		
			this.TransportForm.controls['TRCode'].setValue(TRCode);
		this.TransportForm.controls['TRName'].setValue(TRName);
		this.TransportForm.controls['TRAddress'].setValue(TRAddress);
		this.TransportForm.controls['TRDetails'].setValue(TRDetails);

		this.TransportForm.controls['StateId'].setValue(StateId);

		this.TransportForm.controls['TRCityId'].setValue(TRCityId);
		this.TransportForm.controls['GSTNo'].setValue(GSTNo);
		this.TransportForm.controls['PanNumber'].setValue(PanNumber);

		this.TransportForm.controls['AgreementStatusId'].setValue(AgreementStatusId);
		this.TransportForm.controls['ExpiryDate'].setValue(ExpiryDate);
		this.TransportForm.controls['CreationDate'].setValue(CreationDate);

			this.TransportForm.controls['PrimaryCntName'].setValue(PrimaryCntName);
		this.TransportForm.controls['PrimaryCntDesignation'].setValue(PrimaryCntDesignation);
		this.TransportForm.controls['PrimaryCntTelNo'].setValue(PrimaryCntTelNo);
		this.TransportForm.controls['PrimaryCntLandlineNo'].setValue(PrimaryCntLandlineNo);
		this.TransportForm.controls['PrimaryCntEmail'].setValue(PrimaryCntEmail);
		this.TransportForm.controls['SecCntName'].setValue(SecCntName);
		this.TransportForm.controls['SecCntDesignation'].setValue(SecCntDesignation);
		this.TransportForm.controls['SecCntTelNo'].setValue(SecCntTelNo);
		this.TransportForm.controls['SecCntLandlineNo'].setValue(SecCntLandlineNo);
		this.TransportForm.controls['SecCntEmail'].setValue(SecCntEmail);
		
		this.CheckValidationForDeletereq.Id=TransporterId;
		 this.transportreq.TRCode=this.f.TRCode.value;
		 this.transportreq.TRName=this.f.TRName.value;
		 this.transportreq.TRAddress=this.f.TRAddress.value;
		 this.transportreq.StateId=this.f.StateId.value;

		 this.transportreq.TRCityId=this.f.TRCityId.value;
		 this.transportreq.PanNumber=this.f.PanNumber.value;

		 		 this.transportreq.GSTNo=this.f.GSTNo.value;
		 		 this.transportreq.StateId=this.f.StateId.value;

		 this.transportreq.TRDetails=this.f.TRDetails.value;
		 this.transportreq.AgreementStatusId=this.f.AgreementStatusId.value;
		  this.transportreq.ExpiryDate=this.f.ExpiryDate.value;
		 	this.transportreq.PrimaryCntName=this.f.PrimaryCntName.value;
		this.transportreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
		this.transportreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
		this.transportreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
		this.transportreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;
		  this.transportreq.SecCntName=this.f.SecCntName.value;
		  this.transportreq.SecCntDesignation=this.f.SecCntDesignation.value;
		  this.transportreq.SecCntTelNo=this.f.SecCntTelNo.value;
		  this.transportreq.SecCntLandlineNo=this.f.SecCntLandlineNo.value;
		  this.transportreq.SecCntEmail=this.f.SecCntEmail.value;

		  this.DispalayDate= ExpiryDate;
		  this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		  this.transportreq.ExpiryDate=this.DispalayDate;
		  this.TransportForm.controls['ExpiryDate'].setValue(this.DispalayDate);
	 
	 
		  this.DispalayCreationDate=CreationDate;
		   this.DispalayCreationDate= this.datepipe.transform( this.DispalayCreationDate, 'yyyy-MM-dd');
		   this.transportreq.CreationDate=this.DispalayCreationDate;
		   this.TransportForm.controls['CreationDate'].setValue(this.DispalayCreationDate);
	 
		   
			 this.DisplaySignedDate= SignedDate;
		  this.DisplaySignedDate= this.datepipe.transform(this.DisplaySignedDate, 'yyyy-MM-dd');
		  this.transportreq.SignedDate=this.DisplaySignedDate
		  this.TransportForm.controls['SignedDate'].setValue(this.DisplaySignedDate);
		 
	  this.transportreq.TransporterId=TransporterId;
	  this.transportreq.PerformBy=localStorage.getItem('UserId');
	  this.transportreq.Operation=3;
	}
  
   GetTransportationStatus(){
	  
		 this.loading = true;
        this.userService.StatusListCRUD(this.StatusListreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.TransportationStatusdata=respData.Data;
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
  
  GetCities(){
	  
		 this.loading = true;
        this.userService.CityCRUD(this.cityreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.citydata=respData.Data;
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
	
	
	 GetTransport(){
	  
		 this.loading = true;
        this.userService.transportCRUD(this.transportreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.Transportdata=respData.Data;
						
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
							this.TransportForm.controls['TRCode'].setValue(respData.Data);
							//this.alertService.success(''+ respData.m, true);
						this.ViewDocument();
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
	
	
	 GetVehicletype(){	  
		 this.loading = true;
        this.userService.VehicleTypesCRUD(this.vehicletypereq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.vehicletypedata=respData.Data;
						
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
	
	
	
		get f() { return this.TransportForm.controls; }
	
	AddUpdateDeleteTransport(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.TransportForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		this.transportreq.TRCode=this.f.TRCode.value;
		this.transportreq.TRName=this.f.TRName.value;
		this.transportreq.TRAddress=this.f.TRAddress.value;
		this.transportreq.TRCityId=this.f.TRCityId.value;
		this.transportreq.TRDetails=this.f.TRDetails.value;
		this.transportreq.GSTNo=this.f.GSTNo.value;
		//this.aggregatorreq.PanNumber=this.f.PanNumber.value;

		this.transportreq.AgreementStatusId=this.f.AgreementStatusId.value;
		this.transportreq.PrimaryCntName=this.f.PrimaryCntName.value;
		this.transportreq.PrimaryCntDesignation=this.f.PrimaryCntDesignation.value;
		this.transportreq.PrimaryCntTelNo=this.f.PrimaryCntTelNo.value;
		this.transportreq.PrimaryCntLandlineNo=this.f.PrimaryCntLandlineNo.value;
		this.transportreq.PrimaryCntEmail=this.f.PrimaryCntEmail.value;
		this.transportreq.SecCntName=this.f.SecCntName.value;
		this.transportreq.SecCntDesignation=this.f.SecCntDesignation.value;
		this.transportreq.SecCntTelNo=this.f.SecCntTelNo.value;
		this.transportreq.SecCntLandlineNo=this.f.SecCntLandlineNo.value;
		this.transportreq.SecCntEmail=this.f.SecCntEmail.value;
		this.transportreq.ExpiryDate=this.f.ExpiryDate.value;
		this.transportreq.CreationDate=this.f.CreationDate.value;
        this.userService.transportCRUD(this.transportreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.Transportdata=respData.Data;
						// this.alertService.success(''+respData.m, true);
						this.AlertMessage=respData.m;
						jQuery("#myModalTrans").modal("hide");
						jQuery("#myModaledit").modal("hide");
						this.ResetFrom();

						if(this.transportreq.Operation==1)
						 {

							localStorage.setItem('TransporterId', this.Transportdata[0].TransporterId);
	 						localStorage.setItem('TRName', this.Transportdata[0].TRName);
							//jQuery("#myModalalert").modal("hide");
							jQuery("#myModalconfirmation").modal("show");

						// this.router.navigate(['/AddVehicle']);
						 }
						 else{
							this.AlertMessage=respData.m;
							jQuery("#myModalTrans").modal("hide");
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

		this.router.navigate(['/AddVehicle'], {queryParams:{title:'true'}});
	}
	 GetTransportroute(){
	  
		 this.loading = true;
        this.userService.transportroutecrudCRUD(this.transportroutereq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.transportVehicledata=respData.Data;
					
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
	
	
	
	//Vehicale Transport CRUD Operation
	
	  GetTransportVehicle(){
		  
		  //this.AGWasteTypesreq.AggregatorId=this.aggregatorreq.AggregatorId;
		  
this.TransportRoutesVehiclereq.TransporterId=this.TransportRoutesVehiclereq.TransporterId;
		  this.TransportRoutesVehiclereq.Operation=0;
		 this.loading = true;
        this.userService.TransportRoutesVehicleCRUD(this.TransportRoutesVehiclereq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.TransportRoutesVehicleData=respData.Data;
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
	
	
	EditTransportVehicleData(TRVehicleTypeId,TransportRoutes,MaxCapacityForTransport,LeadTime,TRVehicleId)
	{
		
		this.successmsg = false;
		 this.TransportVehicleForm.controls['TRVehicleTypeId'].setValue(TRVehicleTypeId);
		 this.TransportVehicleForm.controls['TransportRoutes'].setValue(TransportRoutes);
		 //this.TransportVehicleForm.controls['VechicleDims'].setValue(VechicleDims);
		 this.TransportVehicleForm.controls['MaxCapacityForTransport'].setValue(MaxCapacityForTransport);
		 this.TransportVehicleForm.controls['LeadTime'].setValue(LeadTime);
		
		
		 this.TransportRoutesVehiclereq.TRVehicleTypeId=this.g.TRVehicleTypeId.value;
		 this.TransportRoutesVehiclereq.TransportRoutes=this.g.TransportRoutes.value;
		// this.TransportRoutesVehiclereq.VechicleDims=this.g.VechicleDims.value;
		 this.TransportRoutesVehiclereq.MaxCapacityForTransport=this.g.MaxCapacityForTransport.value;
		 this.TransportRoutesVehiclereq.LeadTime=this.g.LeadTime.value;
		 
		 
	   this.TransportRoutesVehiclereq.TRVehicleId=TRVehicleId;
	  this.TransportRoutesVehiclereq.PerformBy=localStorage.getItem('UserId');
	  this.TransportRoutesVehiclereq.Operation=2;
	}
	
	DeleteTransportVehicleData(TRVehicleTypeId,TransportRoutes,MaxCapacityForTransport,LeadTime,TRVehicleId)
	{
		
		 this.TransportVehicleForm.controls['TRVehicleTypeId'].setValue(TRVehicleTypeId);
		 this.TransportVehicleForm.controls['TransportRoutes'].setValue(TransportRoutes);
		 ///this.TransportVehicleForm.controls['VechicleDims'].setValue(VechicleDims);
		 this.TransportVehicleForm.controls['MaxCapacityForTransport'].setValue(MaxCapacityForTransport);
		 this.TransportVehicleForm.controls['LeadTime'].setValue(LeadTime);
		
		
		 this.TransportRoutesVehiclereq.TRVehicleTypeId=this.g.TRVehicleTypeId.value;
		 this.TransportRoutesVehiclereq.TransportRoutes=this.g.TransportRoutes.value;
		 //this.TransportRoutesVehiclereq.VechicleDims=this.g.VechicleDims.value;
		 this.TransportRoutesVehiclereq.MaxCapacityForTransport=this.g.MaxCapacityForTransport.value;
		 this.TransportRoutesVehiclereq.LeadTime=this.g.LeadTime.value;
		 
		 
	   this.TransportRoutesVehiclereq.TRVehicleId=TRVehicleId;
	  this.TransportRoutesVehiclereq.PerformBy=localStorage.getItem('UserId');
	  this.TransportRoutesVehiclereq.Operation=3;
	}
	
	
	AddUpdateDeleteTransportVehicle(){
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 if(this.TransportRoutesVehiclereq.Operation!=3)
		 {
			 if (this.TransportVehicleForm.invalid) {
			this.loading = false;
            return;
			
        }
		 }
		//   if (this.TransportVehicleForm.invalid) {
		// 	this.loading = false;
        //     return;
			
        // }
		
		 
		this.TransportRoutesVehiclereq.TransporterId=this.TransportRoutesVehiclereq.TransporterId;
		this.TransportRoutesVehiclereq.TRVehicleTypeId=this.g.TRVehicleTypeId.value;
		this.TransportRoutesVehiclereq.TransportRoutes=this.g.TransportRoutes.value;
		//this.TransportRoutesVehiclereq.VechicleDims=this.g.VechicleDims.value;
		this.TransportRoutesVehiclereq.MaxCapacityForTransport=this.g.MaxCapacityForTransport.value;
		this.TransportRoutesVehiclereq.LeadTime=this.g.LeadTime.value;
		
        this.userService.TransportRoutesVehicleCRUD(this.TransportRoutesVehiclereq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.TransportRoutesVehicleData=respData.Data;
						// this.alertService.success(''+respData.m, true);
						
						this.AlertMessage=respData.m;
						jQuery("#myModaledit").modal("hide");

						jQuery("#myModalEditVehicles").modal("hide");
						jQuery("#AddVehicales").modal("hide");

						
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
    this.excelService.exportAsExcelFile(this.Transportdata, 'Transporters Report');
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
		this.TransportForm.controls['ExpiryDate'].setValue(today);
		this.TransportForm.controls['SignedDate'].setValue(today);

 
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
		
		this.Docreq.AutoCode=this.f.TRCode.value;
		this.Docreq.DocumentTypeId=this.d.DocumentTypeId.value;
		this.Docreq.DocumentName=this.d.DocumentName.value;
		this.Docreq.DocumentDetails=this.d.DocumentDetails.value;
		this.Docreq.FormId=this.value;
		this.Docreq.Image=this.base64string;
		this.Docreq.DocGuid='Transporter';
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
		this.Docreq.AutoCode=this.f.TRCode.value;
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
ValidateDocStatus()
{
	this.DocStatusReq.FormId=this.value;
	this.DocStatusReq.AutoCode=this.f.TRCode.value;
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
						 this.AddUpdateDeleteTransport();
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
				this.AddUpdateDeleteTransport();
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
