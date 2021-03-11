import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService, DataService,ExcelService,AuthenticationService } from '../_services';
import { DatePipe } from '@angular/common';
import { user, role } from '../_models';

declare var jQuery:any;
@Component({
  selector: 'app-view-work-order',
  templateUrl: './view-work-order.component.html',
  styleUrls: ['./view-work-order.component.css']
})
export class ViewWorkOrderComponent implements OnInit {
	UserId=localStorage.getItem('UserId');
	public AlertMessage;
	 today: number = Date.now();
	  public SearchDateWorder;
	 public FromDateValidation;
	 public ToDateValidation;
	  public FromDateValidation1;
	 public ToDateValidation1;
	//dateVal  =new Date();
	// calculate Material value = Rcvd qtty * Sales rate
	base64string:any;
	public value = 5;
	public DocData;
public MFData;
	sum: number;
	DispalayCreationDate: any;
	DisplaySignedDate: any;
	DisplayOrderPlacementDate: any;
	TodayDateC: string;
  calculate(quanitynum:number, ratenum:number) {
   this.sum =+quanitynum * +ratenum;
  }
  
  public DocStatusReq={ FormId:0,AutoCode:''};
	public DocStatusData;
  public ViewDocumentReq;
  public Docreq = {DocumentId :0, FormId :0 ,DocumentTypeId :0 , DocumentName  :'' ,Image  :'' , DocumentDetails :'', UserId :'', Option :'', DocGuid :'WorkOrder', AutoCode :''};
  public DocumentData;
  DocUploadForm : FormGroup;

	public WorkOrdersreq = {ClientWorkOrderCode:'', WorkOrderId:0, WorkOrderCode:'', ManufacturerId:0, TotalValue:0,BillingValue:0,TotalVolume:0,TotalVolumeUnitId:0,ExpiryDate:'',CreationDate:'', OrderPlacementDate:'',Details:'', WOStatus:'',PerformBy:'', Operation:0 };
	public WorkOrdersdata;
	
	
	//ManufactureMasteer Data
	public manufacturertypereq ={ManufacturerTypeId:0, ManufacturerType:'', Comments:'', PerformBy:'', Operation:0 };
	public manufacturertypedata;
	
	public TodayDate;
	public CheckValidationForDeletereq={FormName:'WorkOrders',Id:0};
	
		
	//manufacture enrollement 
	public manufacturerreq = {Manufacturerid:0, MFCode:'', ExpiryDate:'', MFName:'', MFAddress:'', MFCityId:0, MFStateId:0,MFGST:'',MFdetails:'',FairMarketrequirement:false,Billingcycle:'',AgreementStatus:'',PrimaryCntName:'',PrimaryCntDesignation:'',PrimaryCntTelNo:'',PrimaryCntEmail:'',SecCntName:'',SecCntDesignation:'',SecCntTelNo:'',SecCntEmail:'',PerformBy:'', Operation:0 };
	
	public manufacturerdata;
	
	
	//Workorder Status 
	public StatusListreq = {StatusId:0, StatusName:'', StatusType:'WorkOrderStatus', Comments:'', PerformBy:'', Operation:0 };
	public workorderStatusdata;
	
	public CkeckExpiryDateFor_WOIreq={ManufacturerId:0};
	public ChechExpiryValidation;
	//material unit data
	public materialunitreq = {MaterialUnitId:0, MaterialUnit:0, MaterialUnitCode:0, Comments:'', PerformBy:'', Operation:0 };
	public materialunitdata;
	
	//Get WorkOrder serch data
		public GetWorkOrderSearchreq={TextToSearch:'',EFromDate:null,EToDate:null,OFromDate:null,OToDate:null, ManufacturerId:0,PerformBy:''};		
		public SearchDataWorkOrder;
	
	
	loading = false;
	submitted = false;
	successmsg = false;
	WorkorderForm:FormGroup;
	WorkorderFilterForm:FormGroup;
	
	public DispalayDate;
	public DispalayDate1;
	
	public GenerateCodeNamereq={InputField:'',FormName:''};
	
	currentUser: user;

	
	
	


  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService, public datepipe: DatePipe, private dataService:DataService,private route: ActivatedRoute,private router: Router,private excelService:ExcelService,private authenticationService: AuthenticationService,) 
  {
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
	this.GetManufacturetype();
	this.GetViewOrder();
	this.GetManufacturer();
	this.GetWorkorderStatus();
	//console.log("Current Date:"+this.currentDate());
	//this.TDate = this.datePipe.transform(Date.now(),"dd-MM-yyyy");
	//this.TodayDate = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
	this.GetMaterialUnit();
	this.GetDocTypesByFormId(this.value);
	this.FetchManufacturer();
	
  }

  ngOnInit() {
	this.TodayDateC = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');


	if(this.route.snapshot.queryParamMap.get('title')=='true'){
	
		jQuery("#myModal").modal("show");

		
	}

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
	 

//	  this.TodayDate = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
	  // this.nav.show();
	    this.WorkorderForm = this.formBuilder.group({
			WorkOrderCode:['',Validators.required],
			ManufacturerId: ['',Validators.required],
			TotalVolume: [0],
			ExpiryDate: ['',Validators.required],
			//CreationDate: [''],
			CreationDate: [''],
			
			OrderPlacementDate: ['',Validators.required],
			Details: [''],
			WOStatus: ['',Validators.required],
			TotalVolumeUnitId:[0],
			ClientWorkOrderCode:['']
			            
        });	
		
		  this.WorkorderFilterForm = this.formBuilder.group({
			EFromDate:[''],
			EToDate: [''],
			OFromDate:[''],
			OToDate: [''],            
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
  
  get fd() { return this.WorkorderFilterForm.controls; }
   
  
   onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.WorkorderForm.invalid) {
            return;
        }
		
	  this.WorkOrdersreq.WorkOrderCode=this.f.WorkOrderCode.value;
		 this.WorkOrdersreq.ManufacturerId=this.f.ManufacturerId.value;
		 this.WorkOrdersreq.TotalVolume=0;
		 this.WorkOrdersreq.TotalVolumeUnitId=0;
		  this.WorkOrdersreq.ExpiryDate=this.f.ExpiryDate.value;
		   this.WorkOrdersreq.CreationDate=this.TodayDateC;

		   this.WorkOrdersreq.OrderPlacementDate=this.f.OrderPlacementDate.value;
		   this.WorkOrdersreq.Details=this.f.Details.value;
		 this.WorkOrdersreq.WOStatus=this.f.WOStatus.value;
		this.WorkOrdersreq.ClientWorkOrderCode=this.f.ClientWorkOrderCode.value;
	this.WorkOrdersreq.WorkOrderId=0;
	 
	  this.WorkOrdersreq.PerformBy=localStorage.getItem('UserId');
	  this.WorkOrdersreq.Operation=1;
	  
	 this.ValidateDocStatus();
     // this.AddUpdateDeleteWorkOrder();
	 
    }
	get f() { return this.WorkorderForm.controls; }
	get d() { return this.DocUploadForm.controls; }
	
	get isAdmin() {
		// return this.currentUser && this.currentUser.UserName == 'admin1'; 
		return this.currentUser && this.currentUser.RoleId == '18'; 
	
	  }

	  get isManufacturer() {
		// return this.currentUser && this.currentUser.UserName == 'admin1'; 
		return this.currentUser && this.currentUser.RoleId == '19'; 
	
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
  
  resetValue() {
    this.WorkorderForm.controls['OrderPlacementDate'].setValue(this.currentDate());
    this.WorkorderForm.controls['ExpiryDate'].setValue(this.currentDate());
  }
  
  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }
  

  RedirectToWOItems(WorkOrderId, WorkOrderCode)
  {
	  //this.dataService.setOption('WorkOrderId', WorkOrderId);  
	  localStorage.setItem('WorkOrderId', WorkOrderId);
	  localStorage.setItem('WorkOrderCode', WorkOrderCode);
  }
  
   ResetFrom(){
		this.WorkorderForm.reset();
		this.successmsg = false;
		this.submitted =false;
		this.DocUploadForm.reset();
		this.DocumentData=undefined;
		jQuery("#myModal").modal("hide");
		jQuery("#myModaledit").modal("hide");
		jQuery("#myModalalert").modal("hide");
		//this.WorkorderForm.controls['CreationDate'].setValue(this.TodayDateC);

	}
	
   // //Work order Item Fetch Primary key ID
	// GetWorkorderItemId(WorkOrderId)
	// {		 		 
	  // this.WorkOrdersreq.WorkOrderId=WorkOrderId;
	 // this.GetWorkorderItem();
	// }
	
	
	/*Start Textbox serach */
  SearchWorkOrder(searchValue : string)
	  {
		   this.WorkorderFilterForm.controls['EFromDate'].setValue('');
		   this.WorkorderFilterForm.controls['EToDate'].setValue('');
		    this.GetWorkOrderSearchreq.EFromDate=null;
		   this.GetWorkOrderSearchreq.EToDate=null;
		   this.WorkorderFilterForm.controls['OFromDate'].setValue('');
		   this.WorkorderFilterForm.controls['OToDate'].setValue('');
		   this.GetWorkOrderSearchreq.OFromDate=null;
		   this.GetWorkOrderSearchreq.OToDate=null;
		  if(searchValue.length>1)
		  {
			  console.log("Call API");
			  this.GetWorkOrderSearchreq.TextToSearch=searchValue;
			 // this.GetAggregatorSearchreq.FromDate=0;
			  //this.GetAggregatorSearchreq.ToDate=0;
			  this.GetWorkOrderNamesearch();
		  }
		  else
			  
			  {
				  this.GetWorkOrderSearchreq.TextToSearch='';
				  this.GetWorkOrderNamesearch();
			  }
		 
	  }
	  /*End Textbox serach */
	  
	  
	  /* Start Date Serch*/
	  
	  DateValidationToDate()
	  {
		  this.WorkorderFilterForm.controls['EFromDate'].setValue('');
		   this.WorkorderFilterForm.controls['EToDate'].setValue('');
		    this.GetWorkOrderSearchreq.EFromDate=null;
		   this.GetWorkOrderSearchreq.EToDate=null;
		  this.ToDateValidation=this.datepipe.transform(this.fd.OFromDate.value, 'yyyy-MM-dd');
		  this.GetWorkOrderSearchreq.OFromDate=this.datepipe.transform(this.fd.OFromDate.value, 'yyyy-MM-dd');
		  this.GetWorkOrderNamesearch();
	  }
	  
	  SearchOnDate()
	  { 
	   this.FromDateValidation=this.datepipe.transform(this.fd.OToDate.value,'yyyy-MM-dd');
			this.GetWorkOrderSearchreq.OFromDate=this.datepipe.transform(this.fd.OFromDate.value, 'yyyy-MM-dd');
		    this.GetWorkOrderSearchreq.OToDate=this.datepipe.transform(this.fd.OToDate.value,'yyyy-MM-dd');
			this.GetWorkOrderNamesearch();
	  }
	  
	  
	  
	  
	  DateValidationToDate1()
	  {
		  this.WorkorderFilterForm.controls['OFromDate'].setValue('');
		   this.WorkorderFilterForm.controls['OToDate'].setValue('');
		   this.GetWorkOrderSearchreq.OFromDate=null;
		   this.GetWorkOrderSearchreq.OToDate=null;
		  this.ToDateValidation1=this.datepipe.transform(this.fd.EFromDate.value, 'yyyy-MM-dd');
		  this.GetWorkOrderSearchreq.EFromDate=this.datepipe.transform(this.fd.EFromDate.value, 'yyyy-MM-dd');
		  this.GetWorkOrderNamesearch();
	  }
	  
	  SearchOnDate1()
	  { 
	   this.FromDateValidation1=this.datepipe.transform(this.fd.EToDate.value,'yyyy-MM-dd');
			this.GetWorkOrderSearchreq.EFromDate=this.datepipe.transform(this.fd.EFromDate.value, 'yyyy-MM-dd');
		    this.GetWorkOrderSearchreq.EToDate=this.datepipe.transform(this.fd.EToDate.value,'yyyy-MM-dd');
			this.GetWorkOrderNamesearch();
	  }
	  
	  
	  /* End Date Serch*/
	  
	
	GenerateWOCode(value)
	{
		this.WorkorderForm.controls['CreationDate'].setValue(this.TodayDateC);

		this.CkeckExpiryDateFor_WOIreq.ManufacturerId=value;
		const result = this.manufacturerdata.find( a => a.Manufacturerid === parseInt(value) );
		console.log("WO Value result :"+result.MFName);
		
		this.GenerateCodeNamereq.InputField=result.MFName.substring(0,4);
		this.GenerateCodeNamereq.FormName='WorkOrders';
		this.GetGenerateCode();	
		this.CkeckExpiryDateFor_WOI();
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
							this.WorkorderForm.controls['WorkOrderCode'].setValue(respData.Data);
							//this.alertService.success(''+ respData.m, true);
							this.WorkorderForm.controls['CreationDate'].setValue(this.TodayDateC);

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
		
		
		GetExpiryDate(ExpiryDate)
		{
			
		this.DispalayDate= ExpiryDate;
		this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		}
		
		
		/* Display Manufacture Search Data */
	  GetWorkOrderNamesearch(){
		  
			 this.loading = true;
	        this.userService.SortFilterWorkOrdersdata(this.GetWorkOrderSearchreq)
	           .pipe()
	            .subscribe(
	                (data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							 this.WorkOrdersdata=respData.Data;
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
	
	
	//View Work Order
	
  GetViewOrder(){
	  
		 this.loading = true;
        this.userService.WorkOrdersCRUD(this.WorkOrdersreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.WorkOrdersdata=respData.Data;
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
	
	
	//Mnufacture enrollement name display
	
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
	
	
	//material unit Data
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
	
	//Work order status
	GetWorkorderStatus(){
	  
		 this.loading = true;
        this.userService.StatusListCRUD(this.StatusListreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.workorderStatusdata=respData.Data;
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
	
//Display Date	
DisplayDate()
{
	const TodayDate = Date.now();
	// this.DispalayDate= ExpiryDate
	// this.DispalayDate1= OrderPlacementDate
this.TodayDate = this.datepipe.transform(this.TodayDate, 'dd-MM-yyyy');
} 
	
	//CRUD Operation in WorkOrder
	

	EditViewworkorderData(WorkOrderCode,ManufacturerId,TotalVolume,ExpiryDate,CreationDate,OrderPlacementDate,Details,WOStatus,WorkOrderId,TotalVolumeUnitId,ClientWorkOrderCode)
	
	{
		this.successmsg = false;
		
		this.WorkorderForm.controls['WorkOrderCode'].setValue(WorkOrderCode);
		this.WorkorderForm.controls['ManufacturerId'].setValue(ManufacturerId);
		this.WorkorderForm.controls['TotalVolume'].setValue(TotalVolume);
		this.WorkorderForm.controls['TotalVolumeUnitId'].setValue(TotalVolumeUnitId);
		// this.WorkorderForm.controls['ExpiryDate'].setValue(ExpiryDate);
		// this.WorkorderForm.controls['CreationDate'].setValue(this.datepipe.transform(CreationDate, 'yyyy-MM-dd'));
		this.WorkorderForm.controls['OrderPlacementDate'].setValue(OrderPlacementDate);
		this.WorkorderForm.controls['Details'].setValue(Details);
		this.WorkorderForm.controls['WOStatus'].setValue(WOStatus);
		this.WorkorderForm.controls['ClientWorkOrderCode'].setValue(ClientWorkOrderCode);
		this.WorkOrdersreq.TotalVolumeUnitId=this.f.TotalVolumeUnitId.value;
		this.WorkOrdersreq.WorkOrderCode=this.f.WorkOrderCode.value;
		 this.WorkOrdersreq.ManufacturerId=this.f.ManufacturerId.value;
		 this.WorkOrdersreq.TotalVolume=this.f.TotalVolume.value;

		//   this.WorkOrdersreq.ExpiryDate=this.f.ExpiryDate.value;
		//   this.DispalayDate= ExpiryDate;
		// this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		
		//    this.WorkOrdersreq.CreationDate=CreationDate;

		//    this.WorkOrdersreq.OrderPlacementDate=this.f.OrderPlacementDate.value;
		//     this.DispalayDate1= OrderPlacementDate
		// this.DispalayDate1= this.datepipe.transform(this.DispalayDate1, 'yyyy-MM-dd');
		
		   this.WorkOrdersreq.Details=this.f.Details.value;
		 this.WorkOrdersreq.WOStatus=this.f.WOStatus.value;

		//New date fields code starts
		this.DispalayDate= ExpiryDate;
		this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		this.WorkOrdersreq.ExpiryDate=this.DispalayDate;
		this.WorkorderForm.controls['ExpiryDate'].setValue(this.DispalayDate);
		
		this.DispalayCreationDate=CreationDate;
		this.DispalayCreationDate= this.datepipe.transform( this.DispalayCreationDate, 'yyyy-MM-dd');
		this.WorkOrdersreq.CreationDate=this.DispalayCreationDate;
		this.WorkorderForm.controls['CreationDate'].setValue(this.DispalayCreationDate);
  
		
		  this.DisplayOrderPlacementDate= OrderPlacementDate;
	   this.DisplayOrderPlacementDate= this.datepipe.transform(this.DisplayOrderPlacementDate, 'yyyy-MM-dd');
	   this.WorkOrdersreq.OrderPlacementDate=this.DisplayOrderPlacementDate
	   this.WorkorderForm.controls['OrderPlacementDate'].setValue(this.DisplayOrderPlacementDate);

/////////////////////////

		 this.WorkOrdersreq.ClientWorkOrderCode=this.f.ClientWorkOrderCode.value;
	   this.WorkOrdersreq.WorkOrderId=WorkOrderId;
	  this.WorkOrdersreq.PerformBy=localStorage.getItem('UserId');
	  this.WorkOrdersreq.Operation=2;
	  
	  this.ViewDocument();
	}
	
	EditWO(){
		this.ValidateDocStatus();
	}
	//Delete data
	
	DeleteViewworkorderData(WorkOrderCode,ManufacturerId,TotalVolume,ExpiryDate,CreationDate,OrderPlacementDate,Details,WOStatus,WorkOrderId,TotalVolumeUnitId)
	
	{
		
		
		this.WorkorderForm.controls['WorkOrderCode'].setValue(WorkOrderCode);
		this.WorkorderForm.controls['ManufacturerId'].setValue(ManufacturerId);
		this.WorkorderForm.controls['TotalVolume'].setValue(TotalVolume);
		this.WorkorderForm.controls['ExpiryDate'].setValue(ExpiryDate);
		this.WorkorderForm.controls['CreationDate'].setValue(this.TodayDate);
		this.WorkorderForm.controls['OrderPlacementDate'].setValue(OrderPlacementDate);
		this.WorkorderForm.controls['Details'].setValue(Details);
		this.WorkorderForm.controls['WOStatus'].setValue(WOStatus);
		this.WorkorderForm.controls['TotalVolumeUnitId'].setValue(TotalVolumeUnitId);

		this.CheckValidationForDeletereq.Id=WorkOrderId;
		this.WorkOrdersreq.TotalVolumeUnitId=this.f.TotalVolumeUnitId.value;
		this.WorkOrdersreq.WorkOrderCode=this.f.WorkOrderCode.value;
		 this.WorkOrdersreq.ManufacturerId=this.f.ManufacturerId.value;
		 this.WorkOrdersreq.TotalVolume=this.f.TotalVolume.value;
		  this.WorkOrdersreq.ExpiryDate=this.f.ExpiryDate.value;
		  this.DispalayCreationDate=CreationDate;
		  this.DispalayCreationDate= this.datepipe.transform( this.DispalayCreationDate, 'yyyy-MM-dd');
		  this.WorkOrdersreq.CreationDate=this.DispalayCreationDate;
		  this.WorkorderForm.controls['CreationDate'].setValue(this.DispalayCreationDate);	
		  	   this.WorkOrdersreq.OrderPlacementDate=this.f.OrderPlacementDate.value;
		   this.WorkOrdersreq.Details=this.f.Details.value;
		 this.WorkOrdersreq.WOStatus=this.f.WOStatus.value;
		 this.WorkOrdersreq.ClientWorkOrderCode=this.f.ClientWorkOrderCode.value;
	   this.WorkOrdersreq.WorkOrderId=WorkOrderId;
	  this.WorkOrdersreq.PerformBy=localStorage.getItem('UserId');
	  this.WorkOrdersreq.Operation=3;
	}
	
	//Add Data Work Order
	AddUpdateDeleteWorkOrder()
	{
		
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		 if (this.WorkorderForm.invalid) {
			this.loading = false;
            return;
			
        }
		 
		
		this.WorkOrdersreq.WorkOrderCode=this.f.WorkOrderCode.value;
		 this.WorkOrdersreq.ManufacturerId=this.f.ManufacturerId.value;
		 this.WorkOrdersreq.TotalVolume=0;
		  this.WorkOrdersreq.ExpiryDate=this.f.ExpiryDate.value;
		  // this.WorkOrdersreq.CreationDate=this.TodayDate;
		   this.WorkOrdersreq.CreationDate=this.f.CreationDate.value;;

		   this.WorkOrdersreq.OrderPlacementDate=this.f.OrderPlacementDate.value;
		   this.WorkOrdersreq.Details=this.f.Details.value;
		 this.WorkOrdersreq.WOStatus=this.f.WOStatus.value;
	  this.WorkOrdersreq.TotalVolumeUnitId=0;
	  this.WorkOrdersreq.ClientWorkOrderCode=this.f.ClientWorkOrderCode.value;
        this.userService.WorkOrdersCRUD(this.WorkOrdersreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.WorkOrdersdata=respData.Data;
						this.AlertMessage=respData.m;
						 
						jQuery("#myModal").modal("hide");
						jQuery("#myModaledit").modal("hide");
						//jQuery("#myModalalert").modal("show");

						this.ResetFrom();

							if(this.WorkOrdersreq.Operation==1)
							{

								localStorage.setItem('WorkOrderId',this.WorkOrdersdata[0].WorkOrderId);
								localStorage.setItem('WorkOrderCode', this.WorkOrdersdata[0].WorkOrderCode);

								

								jQuery("#myModal").modal("hide");
								jQuery("#myModaledit").modal("hide");
								//jQuery("#myModalalert").modal("hide");
								jQuery("#myModalconfirmation").modal("show");

						//	this.router.navigate(['/ViewWorkOrderDetails']);
							}

							else{
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

		this.router.navigate(['/ViewWorkOrderDetails'], {queryParams:{title:'true1'}});
	
		
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
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.WorkOrdersdata, 'WorkOrders Report');
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
		
		this.Docreq.AutoCode=this.f.WorkOrderCode.value;
		this.Docreq.DocumentTypeId=this.d.DocumentTypeId.value;
		this.Docreq.DocumentName=this.d.DocumentName.value;
		this.Docreq.DocumentDetails=this.d.DocumentDetails.value;
		this.Docreq.FormId=this.value;
		this.Docreq.Image=this.base64string;
		this.Docreq.DocGuid='WorkOrder';
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
					this.DocUploadForm.controls['DocumentName'].setValue('');
		this.DocUploadForm.controls['DocumentTypeId'].setValue(0);
		this.DocUploadForm.controls['DocumentDetails'].setValue('');
		
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
ViewDocument()
  {
	  
		this.DocUploadForm.controls['DocumentName'].setValue('');
		this.DocUploadForm.controls['DocumentTypeId'].setValue(0);
		this.DocUploadForm.controls['DocumentDetails'].setValue('');
		this.Docreq.Option='';
		this.Docreq.AutoCode=this.f.WorkOrderCode.value;
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
	this.DocStatusReq.AutoCode=this.f.WorkOrderCode.value;
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
						 this.AddUpdateDeleteWorkOrder();
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


FetchManufacturer()
{
	this.loading = true;
   this.userService.FetchManufacturer()
	  .pipe()
	   .subscribe(
		   (data:any) => {
			   var respData=data;
			   if(respData.s == 1)
			   {
					this.MFData=respData.Data;
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
				this.AddUpdateDeleteWorkOrder();
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

CkeckExpiryDateFor_WOI()
{
	  
		
this.loading = true;
this.userService.CkeckExpiryDateFor_WOI(this.CkeckExpiryDateFor_WOIreq)
  .pipe()
   .subscribe(
	   (data:any) => {
		   var respData=data;
		   if(respData.s == 1)
		   {
			   if(respData.Data!='' || respData.Data!=null)
			   {
				this.ChechExpiryValidation=this.datepipe.transform(respData.Data, 'yyyy-MM-dd');
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
