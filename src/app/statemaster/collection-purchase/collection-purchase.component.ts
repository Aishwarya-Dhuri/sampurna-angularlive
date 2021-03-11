import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService,ExcelService ,AuthenticationService} from '../../_services';
import { DatePipe } from '@angular/common';
import { user, role } from '../../_models';

declare var jQuery:any;
@Component({
  selector: 'app-collection-purchase',
  templateUrl: './collection-purchase.component.html',
  styleUrls: ['./collection-purchase.component.css']
})
export class CollectionPurchaseComponent implements OnInit {
	UserId=localStorage.getItem('UserId');
    public result ="";
	public TodayDate ;
	IsValidCT:boolean=true;
	public AlertMessage;
	public FromDateValidation;
	 public ToDateValidation;
	 
	  public DocStatusReq={ FormId:0,AutoCode:''};
	public DocStatusData;
	 public CPWorkOrderItemCrudreq={CPWorkOrderItem:0,WorkOrderId:0,WorkOrderItemId:0,Tonnage:0,CPCode:'',PerformBy:'',Operation:0,Quantity:0};
	 public CPWorkOrderItemCrudData;
	 
	 
	 
	 ProcessingTypedownSettings={};

	public collectionpurchasereq = {ProcessingTypeId:'', CollectionPurchaseId:0,WorkOrderId:'',WorkOrderItemId:'',AggregatorId:0,StateId:0,CityId:0, SuburbID: 0, WasteMaterialId:0,WasteMaterialUnitId :0,PCBDocumentFile:'',PCBDocumentName:'',CertificateDocument:'',CertificateDocumentFile:null,MaterialDocument:'',MaterialDocumentFile:null,PerKgRate:0,GSTRate:0, WasteMaterialQty:0, TotalPaymtDownStr:0,CreationDate:'',PlacementDate:'', Comments:'', PerformBy:'', Operation:0, CollectionPurchaseCode:'', WeightReceiptDocument:'', WeightReceiptDocumentFile:null,DeclarationRateDocument:'', DeclarationRateDocumentFile:null,MaterialPhotoDocument:'', MaterialPhotoDocumentFile:null};
	public collectionpurchasedata;

	public ViewDocumentReq;
	public Docreq = {DocumentId :0, FormId :0 ,DocumentTypeId :0 , DocumentName  :'' ,Image  :'' , DocumentDetails :'', UserId :'', Option :'', DocGuid :'CollectionPurchase', AutoCode :''};
    public DocumentData;
	public cpSearchreq ={ TextToSearch:'',AggregatorId:0,StateId:0,CityId:0,ToDate:'',FromDate:''}
	//State Data
	public statemasterreq = {Stateid:0, StateName:'', StateCode:'', PerformBy:'', Operation:0 };
	public statemasterdata;
	
	//city data
	public cityreq = {CityId:0, CityName:'', CityCode:'', PerformBy:'', Operation:0 };
	public citydata;
	
	//Suburb Data
	public suburbreq = {SuburbId:0, SuburbName:'', SuburbCode:'', CityId:0, PerformBy:'', Operation:0 };
	public suburbdata;
	
	//waste material data
	public wastematerailreq = {WasteMatId:0,  WasteMatCode:0, WasteMatName:'', WasteMatDescription:'', PerformBy:'', Operation:0 };
	public wastematerialdata;
	
	//Aggregator Data
	public aggregatortypereq = {AggregatorTypeId:0, AggregatorType:'', Comments:'', PerformBy:'', Operation:0 };
	public Aggregatorypedata;
	
	//Waste Material Type
	 // public wastetypesreq = {WasteMaterialTypeId:0,  WasteMaterialId:0, WasteTypeName:'', Comments:'', PerformBy:'', Operation:0 };
	// public wastetypereqData; 
	
	//Material Unit
	public materialunitreq = {MaterialUnitId:0, MaterialUnit:0, MaterialUnitCode:0, Comments:'', PerformBy:'', Operation:0 };
	public materialunitdata;
	
	//enrollment aggregatordata
	public aggregatorreq = {AggregatorId:0, AGCode:'', AGName:'', Address:'',AGDetails:'',GSTNo:'',AgreementStatusId:0,WasteMaterialId:0,ExpiryDate:'',PrimaryCntName:'',PrimaryCntDesignation:'',PrimaryCntTelNo:'',PrimaryCntLandlineNo:'',PrimaryCntEmail:'',SecCntName:'',SecCntDesignation:'',SecCntTelNo:'',SecCntLandlineNo:'',SecCntEmail:'',StateId:0,CityId:0,SuburbId:0,PerformBy:'', Operation:0 };
	 public aggregatordata;
	
	//Work Order 
	public WorkOrdersreq = {WorkOrderId:0, WorkOrderCode:'', ManufacturerId:0, TotalValue:0,BillingValue:0,TotalVolume:0,TotalVolumeUnitId:0,ExpiryDate:'',CreationDate:'', OrderPlacementDate:'',Details:'', WOStatus:'',PerformBy:'', Operation:0 };
	public WorkOrdersdata;
	
	//Data processing type
		public processingtypereq = {ProcessingTypeId:0, ProcessingType:'', Comments:'', PerformBy:'', Operation:0};
		public processingtypedata;	
	
	
	//wastetype
	 public wastetypesreq = {WasteMaterialFormId:0, WasteMaterialId:0, WasteMaterialFormName:'', Comments:'', PerformBy:'', Operation:0};
	public wastetypereqData;

	public ValidateWorkordersReq={WasteMaterialType:0,StateId:0,CityId:0,Code:''};
	
	
	//work order item
	public WOItemsreq = {WorkOrderItemId:0, WorkOrderId:0, StateId:0, CityId:0, SuburbID:0, ExpiryDate:'',WasteMaterialId:0, WasteMaterialFormid:0,Quantity:0,FreightRate:0, MaterialUnitId:0, Rate:0, GSTRate:0, OnActualorFreight:false, Timeline:'', Comments:'', PerformBy:'', Operation:0 , TotalValue:0, FreightAmount:0};
	public WOItemsdata;
	 dropdownSettings = {};
	 WorkOrderSettings={};
   selectedItems1 = [];
	dropdownList = [];
	//Prefill date display 
	public DispalayDate;
	public DispalayDate1;
	
	//City suburb mapping
	public Fromsuburbdata;
	WorkOrdersForm:FormGroup;
	collectionpurchasForm:FormGroup;
	SearchCP:FormGroup;
	DocUploadForm : FormGroup;
	 submitted = false;
	loading = false;
	successmsg = false;
	public FinalRate;
	public FinalPay;
	public GenerateCodeNamereq={InputField:'',FormName:''};
	base64string:any;

	base64string1:any;
	base64string2:any;
	base64string3:any;
	WoItemsDataFinal:any;
	OldWeightReceiptDocument:any;
	OldMaterialPhotoDocument:any;
	OldDeclarationRateDocument:any;
	

	

	public value = 6;
	public DocData;
	DispalayCreationDate: any;
	DispalayPlacementDate: any;
	currentUser: user;

  constructor(private formBuilder: FormBuilder,
  public nav: NavbarService, 
  private userService: UserService, private authenticationService: AuthenticationService,
  private alertService : AlertService,private excelService:ExcelService,
  public datepipe: DatePipe,
  private router: Router) 
  { 
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  this.GetCities();
  this.Getsuburb();
  this.GetWastematerials();
  this.GetCollectionpurchase();
  this.GetAgreegatortype();
 this.GetWastetypeForm();
  this.GetMaterialUnit();
  //this.GetAggregator();
  this. GetState();
  //this.GetManufacturer();
 // this.GetViewOrder();
  //this.GetWorkorderItem();
   
  this. GetDocTypesByFormId(this.value);
	this.GetProcessingtype();
  }

  ngOnInit() {
	  this.TodayDate = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
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
	  //  this.nav.show();
		
		this.collectionpurchasForm = this.formBuilder.group({
			
            WorkOrderId: [''],
            WorkOrderItemId: [0],
            ProcessingTypeId: ['', Validators.required],
			 AggregatorId: [0, Validators.required],
			 StateId: [0, Validators.required],
            CityId: [0, Validators.required],
            SuburbID: [0],
            WasteMaterialId: ['', Validators.required],
			 WasteMaterialUnitId: [0, Validators.required],
            PerKgRate: ['', Validators.required],
            GSTRate: ['', Validators.required],
            WasteMaterialQty: ['', Validators.required],
            TotalPaymtDownStr: ['', Validators.required],
            CreationDate: [this.TodayDate],
            PlacementDate: ['', Validators.required],
            Comments: [''],
			CollectionPurchaseCode:['',Validators.required],
			WeightReceiptDocument: [''],
			DeclarationRateDocument: [''],
		    MaterialPhotoDocument: [''],
			            
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
	 this.SearchCP=this.formBuilder.group({
		  
		  AggregatorId: [0],
			 StateId: [0],
            CityId: [0],
			ToDate:[''],
			FromDate:['']
	  });
	  
	  this.WorkOrdersForm=this.formBuilder.group({
		  CPWorkOrderItem:[0],
		  WorkOrderId:['', Validators.required],
		  WorkOrderItemId:['', Validators.required],
		  Tonnage:['', Validators.required],
		  CPCode:[''],
		  PerformBy:[''],
		  Operation:[0]
	  });
	  
	  
	// this.WorkOrderSettings=[item_id: this.WorkOrdersdata.WorkOrderId, item_text: this.WorkOrdersdata.WorkOrderCode];
	 this.WorkOrderSettings = {
      singleSelection: false,
      idField: 'WorkOrderId',
      textField: 'WorkOrderCode',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
	
	
	this.ProcessingTypedownSettings = {
		singleSelection: false,
		idField: 'ProcessingTypeId',
		textField: 'ProcessingType',
		selectAllText: 'Select All',
		unSelectAllText: 'UnSelect All',
	};
	
  }
  get isAdmin() {
	// return this.currentUser && this.currentUser.UserName == 'admin1'; 
	return this.currentUser && this.currentUser.RoleId == '18'; 

  }

  get isManufacturer() {
    // return this.currentUser && this.currentUser.UserName == 'admin1'; 
    return this.currentUser && this.currentUser.RoleId == '19'; 

  }




  get CP() { return this.SearchCP.controls; }
  get W() { return this.WorkOrdersForm.controls; }
  //Document Upload
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
    _handleReaderLoaded1(readerEvt) 
	{
     var binaryString = readerEvt.target.result;
	 this.base64string1 = btoa(binaryString);  
	}
	
	 _handleReaderLoaded2(readerEvt) 
	{
     var binaryString = readerEvt.target.result;
	 this.base64string2 = btoa(binaryString);  
	}
	
	 _handleReaderLoaded3(readerEvt) 
	{
     var binaryString = readerEvt.target.result;
	 this.base64string3 = btoa(binaryString);  
	}
	//End Document Upload
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
this.excelService.exportAsExcelFile(this.collectionpurchasedata, 'Collection purchase Report');
}
  GenerateCPCode(value)
	{
		
		const result = this.aggregatordata.find( a => a.AggregatorId === parseInt(value) );
		console.log("CP Value result :"+result.AGName);
		
		var cityid=parseInt(this.f.CityId.value);
		const cityname=this.citydata.find( a => a.CityId === cityid );
		console.log("city name Value result :"+result.CityName);
		
		this.GenerateCodeNamereq.InputField=result.AGName.substring(0,4) + cityname.CityName.substring(0,2);
		this.GenerateCodeNamereq.FormName='WOCollectionPurchases';
		this.GetGenerateCode();	
		this.UpDateDeleteCPWorkOrderItemCrud();
	}
  
  SearchCollectionPurchases(searchValue : string)
  { 
  this.SearchCP.controls['AggregatorId'].setValue(0);
  this.SearchCP.controls['StateId'].setValue(0);
  this.SearchCP.controls['CityId'].setValue(0);
  this.SearchCP.controls['FromDate'].setValue('');
  this.SearchCP.controls['ToDate'].setValue('');
  
  
  this.cpSearchreq.FromDate='';
  this.cpSearchreq.ToDate='';
  this.cpSearchreq.StateId=0;
  this.cpSearchreq.CityId=0;
  this.cpSearchreq.AggregatorId=0;
  
	  if(searchValue.length>1)
	  {
		  console.log("Call API");
		  this.cpSearchreq.TextToSearch=searchValue;
		  this.SearchCollectionpurchase();
		  
	  }
	  else
	  {
		  this.cpSearchreq.TextToSearch='';
		  this.SearchCollectionpurchase();
	  }
  }
  
  SearchByAggregator(value)
  { 
  
  this.cpSearchreq.FromDate='';
  this.cpSearchreq.ToDate='';
  this.cpSearchreq.StateId=0;
  this.cpSearchreq.CityId=0;
 // this.cpSearchreq.AggregatorId=0;
  
  
  //this.SearchCP.controls['AggregatorId'].setValue('0');
  this.SearchCP.controls['StateId'].setValue(0);
  this.SearchCP.controls['CityId'].setValue(0);
  this.SearchCP.controls['FromDate'].setValue('');
  this.SearchCP.controls['ToDate'].setValue('');
	  if(value!=0)
	  {
		  console.log("Call API");
		  this.cpSearchreq.AggregatorId=value;
		  this.SearchCollectionpurchase();
		  
	  }
	  else
	  {
		  this.cpSearchreq.AggregatorId=0;
		  this.SearchCollectionpurchase();
	  }
  }
  
  SearchByState(value)
  { 
  this.cpSearchreq.FromDate='';
  this.cpSearchreq.ToDate='';
 // this.cpSearchreq.StateId=0;
  this.cpSearchreq.CityId=0;
  this.cpSearchreq.AggregatorId=0;
  
  this.SearchCP.controls['AggregatorId'].setValue(0);
  //this.SearchCP.controls['StateId'].setValue('0');
  this.SearchCP.controls['CityId'].setValue(0);
  this.SearchCP.controls['FromDate'].setValue('');
  this.SearchCP.controls['ToDate'].setValue('');
	  if(value!=0)
	  {
		  console.log("Call API");
		  this.cpSearchreq.StateId=value;
		  this.SearchCollectionpurchase();
		  
	  }
	  else
	  {
		  this.cpSearchreq.StateId=0;
		  this.SearchCollectionpurchase();
	  }
  }
  
  
  SearchByCity(value)
  { 
  
  this.cpSearchreq.FromDate='';
  this.cpSearchreq.ToDate='';
  this.cpSearchreq.StateId=0;
  //this.cpSearchreq.CityId=0;
  this.cpSearchreq.AggregatorId=0;
  
  
  
  this.SearchCP.controls['AggregatorId'].setValue(0);
  this.SearchCP.controls['StateId'].setValue(0);
  //this.SearchCP.controls['CityId'].setValue('0');
  this.SearchCP.controls['FromDate'].setValue('');
  this.SearchCP.controls['ToDate'].setValue('');
	  if(value!=0)
	  {
		  console.log("Call API");
		  this.cpSearchreq.CityId=value;
		  this.SearchCollectionpurchase();
		  
	  }
	  else
	  {
		  this.cpSearchreq.CityId=0;
		  this.SearchCollectionpurchase();
	  }
  }
  
  
   DateValidationToDate()
	  {
		//  this.cpSearchreq.FromDate='';
  this.cpSearchreq.ToDate='';
  this.cpSearchreq.StateId=0;
  this.cpSearchreq.CityId=0;
  this.cpSearchreq.AggregatorId=0;
		   this.SearchCP.controls['AggregatorId'].setValue(0);
  this.SearchCP.controls['StateId'].setValue(0);
  this.SearchCP.controls['CityId'].setValue(0);
  //this.SearchCP.controls['FromDate'].setValue('');
  //this.SearchCP.controls['ToDate'].setValue('');
		    
		  this.ToDateValidation=this.datepipe.transform(this.CP.FromDate.value, 'yyyy-MM-dd');
		  this.cpSearchreq.FromDate=this.datepipe.transform(this.CP.FromDate.value, 'yyyy-MM-dd');
		  this.SearchCollectionpurchase();
	  }
	  
	  SearchOnDate()
	  { 
	//  this.cpSearchreq.FromDate='';
  //this.cpSearchreq.ToDate='';
  this.cpSearchreq.StateId=0;
  this.cpSearchreq.CityId=0;
  this.cpSearchreq.AggregatorId=0;
  
	     this.SearchCP.controls['AggregatorId'].setValue(0);
  this.SearchCP.controls['StateId'].setValue(0);
  this.SearchCP.controls['CityId'].setValue(0);
	   this.FromDateValidation=this.datepipe.transform(this.CP.ToDate.value,'yyyy-MM-dd');
			this.cpSearchreq.FromDate=this.datepipe.transform(this.CP.FromDate.value, 'yyyy-MM-dd');
		    this.cpSearchreq.ToDate=this.datepipe.transform(this.CP.ToDate.value,'yyyy-MM-dd');
			this.SearchCollectionpurchase();
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
							this.collectionpurchasForm.controls['CollectionPurchaseCode'].setValue(respData.Data);
							//this.alertService.success(''+ respData.m, true);
this.ViewDocument(this.ViewDocumentReq);

		this.UpDateDeleteCPWorkOrderItemCrud();
		this.CPWorkOrderItemCrud();
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
		
		GetWorkOrderItems(value)
		{
			//const result = this.WOItemsdata.find( a => a.WorkOrderId === parseInt(value) );
			//this.WOItemsdata=result;
			
			/*this.WOItemsdata=[];
			for(var i=0;i<this.WoItemsDataFinal.length;i++)
			{
				if(this.WoItemsDataFinal[i].WorkOrderId==parseInt(value))
				{
					this.WOItemsdata.push(this.WoItemsDataFinal[i]);
				}
			}*/
			
			this.collectionpurchasForm.controls['CreationDate'].setValue(this.TodayDate);
			this.GetWorkorderItem(value);
		}
  
  onSubmit() {
        this.submitted = true;

		/* if(this.collectionpurchasereq.WorkOrderId=='')
			{
				this.IsValidCT=false;
			
				return;
			} */
		this.collectionpurchasForm.controls['TotalPaymtDownStr'].setValue(this.FinalPay);
        // stop here if form is invalid
        if (this.collectionpurchasForm.invalid) {
            return;
        }
		
		//this.collectionpurchasereq.WorkOrderId=this.f.WorkOrderId.value;
		this.collectionpurchasereq.WorkOrderItemId=this.f.WorkOrderItemId.value;
		this.collectionpurchasereq.AggregatorId=this.f.AggregatorId.value;
		this.collectionpurchasereq.StateId=this.f.StateId.value;
		this.collectionpurchasereq.CityId=this.f.CityId.value;
		this.collectionpurchasereq.SuburbID=this.f.SuburbID.value;
		this.collectionpurchasereq.WasteMaterialId=this.f.WasteMaterialId.value;
		this.collectionpurchasereq.WasteMaterialUnitId=this.f.WasteMaterialUnitId.value;
	//	this.collectionpurchasereq.WasteMaterialFormId=this.f.CityId.value;
		this.collectionpurchasereq.PerKgRate=this.f.PerKgRate.value;
		this.collectionpurchasereq.GSTRate=this.f.GSTRate.value;
		this.collectionpurchasereq.WasteMaterialQty=this.f.WasteMaterialQty.value;	
		this.collectionpurchasereq.TotalPaymtDownStr=this.FinalPay;
		this.collectionpurchasereq.CreationDate=this.TodayDate;
		this.collectionpurchasereq.PlacementDate=this.f.PlacementDate.value;
		this.collectionpurchasereq.Comments=this.f.Comments.value;
		// if(this.CPWorkOrderItemCrudreq.Quantity == null){
		// 	this.CPWorkOrderItemCrudreq.Quantity = 0;
		// }
		// else{
		// 	this.CPWorkOrderItemCrudreq.Quantity=this.f.Quantity.value;
		// }
		// this.collectionpurchasereq.PCBDocumentFile=this.base64string;
		// this.collectionpurchasereq.CertificateDocumentFile=this.base64string1;
		// this.collectionpurchasereq.MaterialDocumentFile=this.base64string2;

		this.collectionpurchasereq.PCBDocumentFile=this.base64string;
		this.collectionpurchasereq.CertificateDocumentFile=this.base64string1;
		this.collectionpurchasereq.MaterialDocumentFile=this.base64string2;
		this.collectionpurchasereq.PCBDocumentName='test.png';
		this.collectionpurchasereq.CertificateDocument='test.png';
		this.collectionpurchasereq.MaterialDocument='test.png';


	  this.collectionpurchasereq.CollectionPurchaseId=0;
	  this.collectionpurchasereq.PerformBy=localStorage.getItem('UserId');
	  this.collectionpurchasereq.Operation=1;
	 
     this.ValidateDocStatus();
    }
	
	
	 ResetFrom(){
		this.collectionpurchasForm.reset();
		this.successmsg = false;
		this.submitted =false;
		this.IsValidCT=true;
		this.WOItemsdata=undefined;
		this.collectionpurchasereq.WorkOrderId=="";
		this.WorkOrdersForm.reset();
		this.result="";
		this.DocumentData=undefined;
		this.DocUploadForm.reset();
		this.WorkOrdersdata=undefined;
		this.CPWorkOrderItemCrudData=undefined;
		this.citydata=undefined;
	}
	
	
	onItemSelect(item: any) {
    console.log(item);
	
	
	if(this.collectionpurchasereq.WorkOrderId=="")
		{
			this.result=item.WorkOrderCode;
			 this.collectionpurchasereq.WorkOrderId=this.result;
		}
		else
		{
			 this.result+=","+item.WorkOrderCode;
			 this.collectionpurchasereq.WorkOrderId=this.result;
		}
		console.log("indivisual selected ReportingFrequency values :" + this.collectionpurchasereq.WorkOrderId);
	
  }
  
  
  
  onSelectAll(item: any) {
    console.log(item);
	this.collectionpurchasForm.controls['CreationDate'].setValue(this.TodayDate);
	
	this.collectionpurchasereq.WorkOrderId="";
		

		for(var i=0; i<item.length;i++)
		{
			if (i==0)
			{
				this.collectionpurchasereq.WorkOrderId=item[i].WorkOrderCode;
			}
			else
			{
				this.collectionpurchasereq.WorkOrderId+=","+item[i].WorkOrderCode;
			}
		}
		console.log("selected ReportingFrequency values :" + this.collectionpurchasereq.WorkOrderId);		

  } 
  
  
  
  
  /* Start ProcessingType Multiple select */
	   onItemSelectPT(item: any) {
	    console.log(item);
		
		if(this.collectionpurchasereq.ProcessingTypeId=="")
		{
			this.collectionpurchasereq.ProcessingTypeId=item.ProcessingTypeId;
		}
		else
		{
			this.collectionpurchasereq.ProcessingTypeId+=","+item.ProcessingTypeId;
		}
		console.log("indivisual selected Processing Type values :" + this.collectionpurchasereq.ProcessingTypeId);
	  }
	  onSelectAllPT(items: any) {
	    console.log(items);
		
		this.collectionpurchasereq.ProcessingTypeId="";
		

		for(var i=0; i<items.length;i++)
		{
			if (i==0)
			{
				this.collectionpurchasereq.ProcessingTypeId=items[i].ProcessingTypeId;
			}
			else
			{
				this.collectionpurchasereq.ProcessingTypeId+=","+items[i].ProcessingTypeId;
			}
		}
		console.log("selected Processing Type values :" + this.collectionpurchasereq.ProcessingTypeId);
		
	  }
	  
	  /* End Processing Type multiselect*/
	  
	  
	  
	  
	
	//Dispaly AGSuburbsCity Data
	
	 getAgFromsuburboncityId(value){
	  
	 
	  this.suburbreq = {SuburbId:0, SuburbName:'', SuburbCode:'', CityId:value,  PerformBy:'', Operation:0 };
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
		GetStateMappingState(value){
			
			//reset function for multiselect
			// if(this.f.CityId.value!=null)
			// {
				// this.AggregatorForm.controls['CityId'].setValue(null);
				// this.aggregatorreq.CityId='';
				
			// }
			
			this.collectionpurchasForm.controls['CreationDate'].setValue(this.TodayDate);
		  
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
	
	
	//Display State data
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
	
  
  //Display Data
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
	
	fetchSuburb(value)
	{
		this.getAgFromsuburboncityId(value);
	}
	
	
	//Display Suburb Data
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
						// this.alertService.success('City added successfuly', true);
						// this.router.navigate(['/city']);
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
	
	// dispaly WasteMaterial Data
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
	
	fillWOItemdata(WorkOrderItemId)
		{
			if(WorkOrderItemId.search(",")>=0)
			{
				var selectedcitiesids=WorkOrderItemId.split(',');
				var SelectedCities=[];
				for(var i=0;i<selectedcitiesids.length;i++)
				{
					for(var j=0;j<this.WOItemsdata.length;j++)
					{
						if(selectedcitiesids[i]==this.WOItemsdata[j].WorkOrderItemId)
						{
							SelectedCities.push(this.WOItemsdata[j]);
						}
					}
				}
				console.log("test");
				this.collectionpurchasForm.controls['WorkOrderItemId'].setValue(SelectedCities);
			}
		}
	//Display workk order Item
   GetWorkorderItem(value){
	   
	  //  this.WOItemsreq.Operation=0; 
	  this.WOItemsreq.WorkOrderId=value;
	  
		 this.loading = true;
        this.userService.WOItemsCRUD(this.WOItemsreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						//this.collectionpurchasForm.controls['WorkOrderItemId'].setValue(0);
						 this.WOItemsdata=respData.Data;
						 this.WoItemsDataFinal=respData.Data;
					    //	this.alertService.success(''+ respData.m, true);
						// this.fillWOItemdata(this.WorkOrderItemId);
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
	
	
	
	//Display Aggregator Data
	GetAgreegatortype(){
	  
		 this.loading = true;
        this.userService.aggregatortypeCRUD(this.aggregatortypereq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.Aggregatorypedata=respData.Data;
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
	
	
	//Display Wastematerial Form
	GetWastetypeForm(){
	  
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
	
	
	//Collection Purchase Component
	
	GetCollectionpurchase(){
	  
		 this.loading = true;
        this.userService.collectionpurchaseCRUD(this.collectionpurchasereq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.collectionpurchasedata=respData.Data;
						 this.aggregatordata=respData.AGData;
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
	
	SearchCollectionpurchase(){
	  
		 this.loading = true;
        this.userService.SearchCollectionPurchases(this.cpSearchreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.collectionpurchasedata=respData.Data;
						//this.alertService.success(''+ respData.m, true
					}
					else
					{
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
	
	
	//Display Work order code
	// 	GetViewOrder(){
	  
	// 	 this.loading = true;
    //     this.userService.WorkOrdersCRUD(this.WorkOrdersreq)
    //        .pipe()
    //         .subscribe(
    //             (data:any) => {
	// 				var respData=data;
	// 				if(respData.s == 1)
	// 				{
	// 					 this.WorkOrdersdata=respData.Data;
	// 					//this.alertService.success(''+ respData.m, true);
	// 						/* this.fillWorkOrderdata(WorkOrderId); */
	// 				}
	// 				else{
	// 					this.alertService.error(''+ respData.m, true);
						
	// 				} 
    //                 this.loading = false;
	// 				this.submitted = false;
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
					
    //             });
	// }
		
	
	
	//Display Material Unit
	
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
	
	//Display enrollement agg type
/*	GetAggregator(){
	  
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
					else
					{
						this.alertService.error(''+ respData.m, true);
					} 
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
	}
	*/
	
	
	//AddupdateDelete code
	
	EditcollectionpurchaseData(WorkOrderId,WorkOrderItemId,AggregatorId,CollectionPurchaseCode,StateId,CityId,SuburbID,WasteMaterialId,WasteMaterialUnitId,WasteMaterialFormId,PerKgRate,GSTRate,WasteMaterialQty,TotalPaymtDownStr,CreationDate,PlacementDate,Comments,CollectionPurchaseId,WeightReceiptDocument,DeclarationRateDocument,MaterialPhotoDocument,ProcessingTypeId)
	{
		this.successmsg = false;
		this.GetStateMappingState(StateId);
		//this.collectionpurchasForm.controls['WorkOrderId'].setValue(WorkOrderId);
		this.collectionpurchasForm.controls['WorkOrderItemId'].setValue(WorkOrderItemId);
		this.collectionpurchasForm.controls['AggregatorId'].setValue(AggregatorId);
		this.collectionpurchasForm.controls['CollectionPurchaseCode'].setValue(CollectionPurchaseCode);
		this.collectionpurchasForm.controls['StateId'].setValue(StateId);
		this.collectionpurchasForm.controls['CityId'].setValue(CityId);
		this.collectionpurchasForm.controls['SuburbID'].setValue(SuburbID);
		this.collectionpurchasForm.controls['WasteMaterialId'].setValue(WasteMaterialId);
		this.collectionpurchasForm.controls['WasteMaterialUnitId'].setValue(WasteMaterialUnitId);
		//this.collectionpurchasForm.controls['WasteMaterialFormId'].setValue(WasteMaterialFormId);
		this.collectionpurchasForm.controls['PerKgRate'].setValue(PerKgRate);
		this.collectionpurchasForm.controls['GSTRate'].setValue(GSTRate);
		this.collectionpurchasForm.controls['WasteMaterialQty'].setValue(WasteMaterialQty);		
		this.collectionpurchasForm.controls['TotalPaymtDownStr'].setValue(TotalPaymtDownStr);

		this.DispalayCreationDate=CreationDate;
		 this.DispalayCreationDate= this.datepipe.transform( this.DispalayCreationDate, 'yyyy-MM-dd');
		 this.collectionpurchasereq.CreationDate=this.DispalayCreationDate;
		 this.collectionpurchasForm.controls['CreationDate'].setValue(this.DispalayCreationDate);
		// this.collectionpurchasForm.controls['CreationDate'].setValue(CreationDate);
		// this.DispalayDate= CreationDate
		// this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		
		// this.collectionpurchasForm.controls['PlacementDate'].setValue(PlacementDate);
		// this.DispalayDate1= PlacementDate
		// this.DispalayDate1= this.datepipe.transform(this.DispalayDate1, 'yyyy-MM-dd');
		

		this.DispalayPlacementDate=PlacementDate;
		this.DispalayPlacementDate= this.datepipe.transform( this.DispalayPlacementDate, 'yyyy-MM-dd');
		this.collectionpurchasereq.PlacementDate=this.DispalayPlacementDate;
		this.collectionpurchasForm.controls['PlacementDate'].setValue(this.DispalayPlacementDate);

		this.collectionpurchasForm.controls['Comments'].setValue(Comments);
		
		
		if(WeightReceiptDocument!="" && WeightReceiptDocument!=undefined)
		{
			var FileName=WeightReceiptDocument.split('/');
			this.OldWeightReceiptDocument=FileName[FileName.length-1];
		}
		if(DeclarationRateDocument!="" && DeclarationRateDocument!=undefined)
		{
			var FileName=DeclarationRateDocument.split('/');
			this.OldDeclarationRateDocument=FileName[FileName.length-1];
		}
		
		if(MaterialPhotoDocument!="" && MaterialPhotoDocument!=undefined)
		{
			var FileName=MaterialPhotoDocument.split('/');
			this.OldMaterialPhotoDocument=FileName[FileName.length-1];
		}
		//  if(WorkOrderId.search(",")>=0)
		// 	{
		// 		var WorkOrderId=WorkOrderId.split(',');
		// 		var SelectedFocusCities=[];
		// 		for(var i=0;i<WorkOrderId.length;i++)
		// 		{
		// 			for(var j=0;j<this.dropdownList.length;j++)
		// 			{
		// 				if(WorkOrderId[i]==this.dropdownList[j].item_text)
		// 				{
		// 					SelectedFocusCities.push(this.dropdownList[j]);
		// 				}
		// 			}
		// 		}
		// 		console.log("test");
		// 		this.collectionpurchasForm.controls['WorkOrderId'].setValue(SelectedFocusCities);
		// 	}

			this.collectionpurchasereq.ProcessingTypeId='';
			if (ProcessingTypeId.search(",") >= 0) {
				var FocusProcessingType = ProcessingTypeId.split(',');
				var SelectedProcessingType = [];
				for (var i = 0; i < FocusProcessingType.length; i++) {
					for (var j = 0; j < this.processingtypedata.length; j++) {
						if (FocusProcessingType[i] == this.processingtypedata[j].ProcessingTypeId) {
							SelectedProcessingType.push(this.processingtypedata[j]);
						}
					}
				}
				console.log("test");
				this.collectionpurchasForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType);
				this.collectionpurchasereq.ProcessingTypeId = ProcessingTypeId;
			}
			else {
				var SelectedProcessingType1 = [];
				for (var j = 0; j < this.processingtypedata.length; j++) {
					if (ProcessingTypeId == this.processingtypedata[j].ProcessingTypeId) {
						SelectedProcessingType1.push(this.processingtypedata[j]);
					}
				}
				// SelectedProcessingType1.push(ProcessingTypeId);
				console.log("test:" + ProcessingTypeId);
				this.collectionpurchasForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType1);
				this.collectionpurchasereq.ProcessingTypeId = ProcessingTypeId;
			}
	
		
		//this.collectionpurchasereq.WorkOrderId=this.f.WorkOrderId.value;
		this.collectionpurchasereq.WorkOrderItemId=this.f.WorkOrderItemId.value;
		this.collectionpurchasereq.AggregatorId=this.f.AggregatorId.value;
		this.collectionpurchasereq.CollectionPurchaseCode=this.f.CollectionPurchaseCode.value;
		this.collectionpurchasereq.StateId=this.f.StateId.value;
		this.collectionpurchasereq.CityId=this.f.CityId.value;
		this.collectionpurchasereq.SuburbID=this.f.SuburbID.value;
		this.collectionpurchasereq.WasteMaterialId=this.f.WasteMaterialId.value;
		this.collectionpurchasereq.WasteMaterialUnitId=this.f.WasteMaterialUnitId.value;
		//this.collectionpurchasereq.WasteMaterialFormId=0;
		this.collectionpurchasereq.PerKgRate=this.f.PerKgRate.value;
		this.collectionpurchasereq.GSTRate=this.f.GSTRate.value;
		this.collectionpurchasereq.WasteMaterialQty=this.f.WasteMaterialQty.value;	
		this.collectionpurchasereq.TotalPaymtDownStr=this.FinalPay;
		this.collectionpurchasereq.CreationDate=this.f.CreationDate.value;
		this.collectionpurchasereq.PlacementDate=this.f.PlacementDate.value;
		this.collectionpurchasereq.Comments=this.f.Comments.value;
		
		 
	  this.collectionpurchasereq.CollectionPurchaseId=CollectionPurchaseId;
	  this.collectionpurchasereq.PerformBy=localStorage.getItem('UserId');
	  
	  

	 
	  this.collectionpurchasereq.Operation=2;
	  this.fetchSuburb(CityId);
	  

	  this.UpDateDeleteCPWorkOrderItemCrud();
			//   if(this.f.CityId.value!=0 && this.f.WasteMaterialTypeId.value!=0)
			  if(this.f.CityId.value!=0 )

				{
					//this.ValidateWorkordersReq.WasteMaterialType=this.f.WasteMaterialTypeId.value;
					this.ValidateWorkordersReq.CityId=this.f.CityId.value;
				}
				else{
					//this.ValidateWorkordersReq.WasteMaterialType=0;
					this.ValidateWorkordersReq.CityId=0;
				}
				
				this.getAgFromsuburboncityId(CityId);
	  this.ValidateWorkorders();
 this.ViewDocumentReq=CollectionPurchaseCode;
	 this.ViewDocument(this.ViewDocumentReq);
	

	}
	EditCP(){
		this.ValidateDocStatus();
	}
	
	 fillWorkOrderdata(WorkOrderId)
		{
			if(WorkOrderId.search(",")>=0)
			{
				var selectedcitiesids=WorkOrderId.split(',');
				var SelectedCities=[];
				for(var i=0;i<selectedcitiesids.length;i++)
				{
					for(var j=0;j<this.WorkOrdersdata.length;j++)
					{
						if(selectedcitiesids[i]==this.WorkOrdersdata[j].CityId)
						{
							SelectedCities.push(this.WorkOrdersdata[j]);
						}
					}
				}
				console.log("test");
				this.collectionpurchasForm.controls['WorkOrderId'].setValue(SelectedCities);
			}
		} 

	
	DeletecollectionpurchaseData(WorkOrderId,WorkOrderItemId,AggregatorId,CollectionPurchaseCode,StateId,CityId,SuburbID,WasteMaterialId,WasteMaterialUnitId,WasteMaterialFormId,PerKgRate,GSTRate,WasteMaterialQty,TotalPaymtDownStr,CreationDate,PlacementDate,Comments,CollectionPurchaseId,WeightReceiptDocument,DeclarationRateDocument,MaterialPhotoDocument)
	{
		
		//this.collectionpurchasForm.controls['WorkOrderId'].setValue(WorkOrderId);
		//this.collectionpurchasForm.controls['WorkOrderItemId'].setValue(WorkOrderItemId);
		this.collectionpurchasForm.controls['AggregatorId'].setValue(AggregatorId);
		this.collectionpurchasForm.controls['CollectionPurchaseCode'].setValue(CollectionPurchaseCode);
		this.collectionpurchasForm.controls['StateId'].setValue(StateId);
		this.collectionpurchasForm.controls['CityId'].setValue(CityId);
		this.collectionpurchasForm.controls['SuburbID'].setValue(SuburbID);
		this.collectionpurchasForm.controls['WasteMaterialId'].setValue(WasteMaterialId);
		this.collectionpurchasForm.controls['WasteMaterialUnitId'].setValue(WasteMaterialUnitId);
		//this.collectionpurchasForm.controls['WasteMaterialFormId'].setValue(WasteMaterialFormId);
		this.collectionpurchasForm.controls['PerKgRate'].setValue(PerKgRate);
		this.collectionpurchasForm.controls['GSTRate'].setValue(GSTRate);
		this.collectionpurchasForm.controls['WasteMaterialQty'].setValue(WasteMaterialQty);		
		this.collectionpurchasForm.controls['TotalPaymtDownStr'].setValue(TotalPaymtDownStr);
		
		this.collectionpurchasForm.controls['CreationDate'].setValue(CreationDate);
		this.DispalayDate= CreationDate
		this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		
		this.collectionpurchasForm.controls['PlacementDate'].setValue(PlacementDate);
		this.DispalayDate1= PlacementDate
		this.DispalayDate1= this.datepipe.transform(this.DispalayDate1, 'yyyy-MM-dd');
		
		this.collectionpurchasForm.controls['Comments'].setValue(Comments);
			
		this.collectionpurchasereq.WorkOrderId=this.f.WorkOrderId.value;
		//this.collectionpurchasereq.WorkOrderItemId=this.f.WorkOrderItemId.value;
		this.collectionpurchasereq.AggregatorId=this.f.AggregatorId.value;
		this.collectionpurchasereq.CollectionPurchaseCode=this.f.CollectionPurchaseCode.value;
		this.collectionpurchasereq.StateId=this.f.StateId.value;
		this.collectionpurchasereq.CityId=this.f.CityId.value;
		this.collectionpurchasereq.SuburbID=this.f.SuburbID.value;
		this.collectionpurchasereq.WasteMaterialId=this.f.WasteMaterialId.value;
		this.collectionpurchasereq.WasteMaterialUnitId=this.f.WasteMaterialUnitId.value;
		//this.collectionpurchasereq.WasteMaterialFormId=0;
		this.collectionpurchasereq.PerKgRate=this.f.PerKgRate.value;
		this.collectionpurchasereq.GSTRate=this.f.GSTRate.value;
		this.collectionpurchasereq.WasteMaterialQty=this.f.WasteMaterialQty.value;	
		this.collectionpurchasereq.TotalPaymtDownStr=this.FinalPay;
		this.collectionpurchasereq.CreationDate=this.f.CreationDate.value;
		this.collectionpurchasereq.PlacementDate=this.f.PlacementDate.value;
		this.collectionpurchasereq.Comments=this.f.Comments.value;
	this.collectionpurchasereq.WeightReceiptDocument=this.f.WeightReceiptDocument.value;
		this.collectionpurchasereq.DeclarationRateDocument=this.f.DeclarationRateDocument.value;
		this.collectionpurchasereq.MaterialPhotoDocument=this.f.MaterialPhotoDocument.value;
		 
	  this.collectionpurchasereq.CollectionPurchaseId=CollectionPurchaseId;
	  this.collectionpurchasereq.PerformBy=localStorage.getItem('UserId');
	  this.collectionpurchasereq.Operation=3;
	}
	
	
	
	get f() { return this.collectionpurchasForm.controls; }
	get d() { return this.DocUploadForm.controls; }

	AddUpdateDeletecollectionpurchas(){
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		 console.log("Work Order IDs: " + this.collectionpurchasereq.WorkOrderId);
		 
		  if (this.collectionpurchasForm.invalid) {
			this.loading = false;
            return;
			
        }
		
	//this.collectionpurchasereq.WorkOrderId=this.f.WorkOrderId.value;
	this.collectionpurchasereq.WorkOrderItemId=this.f.WorkOrderItemId.value;
		this.collectionpurchasereq.AggregatorId=this.f.AggregatorId.value;
		this.collectionpurchasereq.StateId=this.f.StateId.value;
		this.collectionpurchasereq.CityId=this.f.CityId.value;
		this.collectionpurchasereq.SuburbID=this.f.SuburbID.value;
		this.collectionpurchasereq.WasteMaterialId=this.f.WasteMaterialId.value;
		this.collectionpurchasereq.WasteMaterialUnitId=this.f.WasteMaterialUnitId.value;
		//this.collectionpurchasereq.WasteMaterialFormId=this.f.CityId.value;
		this.collectionpurchasereq.PerKgRate=this.f.PerKgRate.value;
		this.collectionpurchasereq.GSTRate=this.f.GSTRate.value;
		this.collectionpurchasereq.WasteMaterialQty=this.f.WasteMaterialQty.value;	
		this.collectionpurchasereq.TotalPaymtDownStr=this.FinalPay;
		this.collectionpurchasereq.CreationDate=this.TodayDate;
		this.collectionpurchasereq.PlacementDate=this.f.PlacementDate.value;
		this.collectionpurchasereq.Comments=this.f.Comments.value;
        //this.userService.WastematerialCRUD(this.collectionpurchasereq)
		this.collectionpurchasereq.CollectionPurchaseCode=this.f.CollectionPurchaseCode.value;
		this.collectionpurchasereq.WeightReceiptDocument='test.png';
		this.collectionpurchasereq.WeightReceiptDocumentFile=this.base64string1;
		this.collectionpurchasereq.DeclarationRateDocument='test.png';
		this.collectionpurchasereq.DeclarationRateDocumentFile=this.base64string2;
		this.collectionpurchasereq.MaterialPhotoDocument='test.png';
		this.collectionpurchasereq.MaterialPhotoDocumentFile=this.base64string3;
	

		this.collectionpurchasereq.PCBDocumentName='test.png';
		this.collectionpurchasereq.PCBDocumentFile=this.base64string;
		this.collectionpurchasereq.CertificateDocument='test.png';
		this.collectionpurchasereq.CertificateDocumentFile=this.base64string1;
		this.collectionpurchasereq.MaterialDocument='test.png';
		this.collectionpurchasereq.MaterialDocumentFile=this.base64string2;
		this.collectionpurchasereq.ProcessingTypeId = "";

		if(this.collectionpurchasereq.SuburbID == null){
			this.collectionpurchasereq.SuburbID = 0;
		}
		else{
			this.collectionpurchasereq.SuburbID=this.f.SuburbID.value;
		}

	



  for (let i = 0; i < this.f.ProcessingTypeId.value.length; i++) {
    if(this.collectionpurchasereq.ProcessingTypeId == "")
    {
        this.collectionpurchasereq.ProcessingTypeId= this.f.ProcessingTypeId.value[i].ProcessingTypeId.toString() ; 
    }
    else
    {
     this.collectionpurchasereq.ProcessingTypeId= this.collectionpurchasereq.ProcessingTypeId + ',' + this.f.ProcessingTypeId.value[i].ProcessingTypeId.toString() ;  
    }
  }

        this.userService.collectionpurchaseCRUD(this.collectionpurchasereq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.collectionpurchasedata=respData.Data;
						 this.AlertMessage=respData.m;
						 this.ResetFrom();

						 jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
						  jQuery("#myModalalert").modal("show");
					}
					else{
						this.alertService.error(''+ respData.m, true);
						//  this.AlertMessage=respData.m;
						// // this.alertService.success(''+respData.m, true);
					
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
	
Deletecollectionpurchas(){
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  
		
	//this.collectionpurchasereq.WorkOrderId=this.f.WorkOrderId.value; //commented 19-aug-19
	this.collectionpurchasereq.WorkOrderItemId=this.f.WorkOrderItemId.value;
		this.collectionpurchasereq.AggregatorId=this.f.AggregatorId.value;
		this.collectionpurchasereq.StateId=this.f.StateId.value;
		this.collectionpurchasereq.CityId=this.f.CityId.value;
		this.collectionpurchasereq.SuburbID=this.f.SuburbID.value;
		this.collectionpurchasereq.WasteMaterialId=this.f.WasteMaterialId.value;
		this.collectionpurchasereq.WasteMaterialUnitId=this.f.WasteMaterialUnitId.value;
		//this.collectionpurchasereq.WasteMaterialFormId=0;
		this.collectionpurchasereq.PerKgRate=this.f.PerKgRate.value;
		this.collectionpurchasereq.GSTRate=this.f.GSTRate.value;
		this.collectionpurchasereq.WasteMaterialQty=this.f.WasteMaterialQty.value;	
		this.collectionpurchasereq.TotalPaymtDownStr=this.FinalPay;
		this.collectionpurchasereq.CreationDate=this.f.CreationDate.value;
		this.collectionpurchasereq.PlacementDate=this.f.PlacementDate.value;
		this.collectionpurchasereq.Comments=this.f.Comments.value;
        //this.userService.WastematerialCRUD(this.collectionpurchasereq)
		this.collectionpurchasereq.CollectionPurchaseCode=this.f.CollectionPurchaseCode.value;
		this.collectionpurchasereq.WeightReceiptDocument=this.f.WeightReceiptDocument.value;
		this.collectionpurchasereq.WeightReceiptDocumentFile=this.base64string1;
		this.collectionpurchasereq.DeclarationRateDocument=this.f.DeclarationRateDocument.value;
		this.collectionpurchasereq.DeclarationRateDocumentFile=this.base64string2;
		this.collectionpurchasereq.MaterialPhotoDocument=this.f.MaterialPhotoDocument.value;
		this.collectionpurchasereq.MaterialPhotoDocumentFile=this.base64string3;
	
        this.userService.collectionpurchaseCRUD(this.collectionpurchasereq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.collectionpurchasedata=respData.Data;
						 //this.alertService.success(''+respData.m, true);
						 this.AlertMessage=respData.m;
						// this.alertService.success(''+respData.m, true);
						 jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
						  jQuery("#myModalalert").modal("show");
					}
					else
					{
						this.alertService.error(''+ respData.m, true);
						 this.AlertMessage=respData.m;
						// this.alertService.success(''+respData.m, true);
					
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
	
	
	
	
  
  CalRate()
  {   var TotalPay=this.f.TotalPaymtDownStr.value;
	  var Qty=this.f.WasteMaterialQty.value;
	  
	  if(TotalPay!=0 && Qty!=0)
	  {
	    this.FinalRate= TotalPay / Qty;
	  }
	  else
	  {
		  this.FinalRate=0;
	  }
  }
  
  CalPayMent()
  {	  var Rate=this.f.PerKgRate.value;
	  var Qty=this.f.WasteMaterialQty.value;
	  
	   if(Rate!=0 && Qty!=0)
	  {
	    this.FinalPay= Rate * Qty;
	  }
	  else
	  {
		  this.FinalPay=0;
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
      
	  if (this.DocUploadForm.invalid) {
            return;
        }
		
		this.Docreq.AutoCode=this.f.CollectionPurchaseCode.value;
		this.Docreq.DocumentTypeId=this.d.DocumentTypeId.value;
		this.Docreq.DocumentName=this.d.DocumentName.value;
		this.Docreq.DocumentDetails=this.d.DocumentDetails.value;
		this.Docreq.FormId=this.value;
		this.Docreq.Image=this.base64string;
		this.Docreq.DocGuid='CollectionPurchase';
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
		//this.Docreq.AutoCode=this.f.CollectionPurchaseCode.value;
		this.Docreq.FormId=this.value;
		this.Docreq.AutoCode=this.ViewDocumentReq;

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
				   this.AlertMessage='Deleted Successfully.';
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


CPWorkOrderItemCrud()
  {
	this.submitted=true;

	if (this.WorkOrdersForm.invalid) {
		return;
	}


	this.CPWorkOrderItemCrudreq.WorkOrderId=this.W.WorkOrderId.value;
	this.CPWorkOrderItemCrudreq.WorkOrderItemId=this.W.WorkOrderItemId.value;
	this.CPWorkOrderItemCrudreq.Tonnage=this.W.Tonnage.value;
	this.CPWorkOrderItemCrudreq.PerformBy=this.UserId;
	this.CPWorkOrderItemCrudreq.Quantity=this.f.WasteMaterialQty.value;
	this.CPWorkOrderItemCrudreq.Operation=1;
	
	this.CPWorkOrderItemCrudreq.CPCode=this.f.CollectionPurchaseCode.value;
	this.loading = true;
   this.userService.CPWorkOrderItemCrud(this.CPWorkOrderItemCrudreq)
	  .pipe()
	   .subscribe(
		   (data:any) => {
			   var respData=data;
			   if(respData.s == 1)
			   {
					this.CPWorkOrderItemCrudData=respData.Data;
					this.WorkOrdersForm.controls['WorkOrderId'].setValue(0);
				   this.WorkOrdersForm.controls['WorkOrderItemId'].setValue(0);
				   this.WorkOrdersForm.controls['Tonnage'].setValue('');
				  this.AlertMessage=respData.m;
				  jQuery("#myModalalert").modal("show");
this.ValidateWorkorders();
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

DeleteCPWorkOrderItemCrud(CPWorkOrderItem)
  {
	this.submitted=true;

	this.CPWorkOrderItemCrudreq.CPWorkOrderItem=CPWorkOrderItem;

	this.CPWorkOrderItemCrudreq.Operation=3;
	
	this.CPWorkOrderItemCrudreq.CPCode=this.f.CollectionPurchaseCode.value;
	this.loading = true;
   this.userService.CPWorkOrderItemCrud(this.CPWorkOrderItemCrudreq)
	  .pipe()
	   .subscribe(
		   (data:any) => {
			   var respData=data;
			   if(respData.s == 1)
			   {
					this.CPWorkOrderItemCrudData=respData.Data;
					this.WorkOrdersForm.controls['WorkOrderId'].setValue(0);
				   this.WorkOrdersForm.controls['WorkOrderItemId'].setValue(0);
				   this.WorkOrdersForm.controls['Tonnage'].setValue('');
				  this.AlertMessage=respData.m;
				  jQuery("#myModalalert").modal("show");
				  this.ValidateWorkorders();
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

EditCPWorkOrderItemCrud(WorkOrderId,WorkOrderItemId,Tonnage,CPCode,CPWorkOrderItem)
{
	this.WorkOrdersForm.controls['CPWorkOrderItem'].setValue(CPWorkOrderItem);
	this.WorkOrdersForm.controls['WorkOrderId'].setValue(WorkOrderId);
	this.WorkOrdersForm.controls['WorkOrderItemId'].setValue(WorkOrderItemId);
	this.WorkOrdersForm.controls['Tonnage'].setValue(Tonnage);
	this.CPWorkOrderItemCrudreq.WorkOrderId=this.W.WorkOrderId.value;
	this.CPWorkOrderItemCrudreq.WorkOrderItemId=this.W.WorkOrderItemId.value;
	this.CPWorkOrderItemCrudreq.Tonnage=this.W.Tonnage.value;
	this.CPWorkOrderItemCrudreq.PerformBy=this.UserId;
	this.CPWorkOrderItemCrudreq.Operation=2;
	this.CPWorkOrderItemCrudreq.CPCode=CPCode;
	this.UpDateDeleteCPWorkOrderItemCrud();
}

// DeleteCPWorkOrderItemCrud(WorkOrderId,WorkOrderItemId,Tonnage,CPCode,CPWorkOrderItem)
// {
// 	this.WorkOrdersForm.controls['CPWorkOrderItem'].setValue(CPWorkOrderItem);
// 	this.WorkOrdersForm.controls['WorkOrderId'].setValue(WorkOrderId);
// 	this.WorkOrdersForm.controls['WorkOrderItemId'].setValue(WorkOrderItemId);
// 	this.WorkOrdersForm.controls['Tonnage'].setValue(Tonnage);
// 	this.CPWorkOrderItemCrudreq.WorkOrderId=this.W.WorkOrderId.value;
// 	this.CPWorkOrderItemCrudreq.WorkOrderItemId=this.W.WorkOrderItemId.value;
// 	this.CPWorkOrderItemCrudreq.Tonnage=this.W.Tonnage.value;
// 	this.CPWorkOrderItemCrudreq.PerformBy=this.UserId;
// 	this.CPWorkOrderItemCrudreq.Operation=3;
// 	this.CPWorkOrderItemCrudreq.CPCode=CPCode;
// 	this.UpDateDeleteCPWorkOrderItemCrud();
// }



UpDateDeleteCPWorkOrderItemCrud()
  {
	this.loading = true;
	this.CPWorkOrderItemCrudreq.CPCode=this.f.CollectionPurchaseCode.value;
	if(this.f.WasteMaterialQty.value==null)
	{
		this.CPWorkOrderItemCrudreq.Quantity=0;
	}
	else{
		this.CPWorkOrderItemCrudreq.Quantity=this.f.WasteMaterialQty.value;
	}

   this.userService.CPWorkOrderItemCrud(this.CPWorkOrderItemCrudreq)
   
	  .pipe()
	   .subscribe(
		   (data:any) => {
			   var respData=data;
			   if(respData.s == 1)
			   {
					this.CPWorkOrderItemCrudData=respData.Data;
				   //this.alertService.success(''+ respData.m, true);
				   this.WorkOrdersForm.controls['WorkOrderId'].setValue(0);
				   this.WorkOrdersForm.controls['WorkOrderItemId'].setValue(0);
				   this.WorkOrdersForm.controls['Tonnage'].setValue('');
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
	this.DocStatusReq.AutoCode=this.f.CollectionPurchaseCode.value;
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
						  this.AddUpdateDeletecollectionpurchas();
					}
					else
					{
						this.AlertMessage=this.DocStatusData;
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



OnCitySelect(value)
{
	// this.ValidateWorkordersReq.CityId=this.f.CityId.value;
	this.ValidateWorkordersReq.Code=this.f.CollectionPurchaseCode.value;
	this.ValidateWorkordersReq.WasteMaterialType=value;
	this.ValidateWorkorders();
}

ValidateWorkorders()
{
	
	this.loading = true;
//	this.ValidateWorkordersReq.StateId=this.f.StateId.value;

this.ValidateWorkordersReq.CityId=this.f.StateId.value;
this.ValidateWorkordersReq.Code=this.f.CollectionPurchaseCode.value;
this.ValidateWorkordersReq.WasteMaterialType=this.f.WasteMaterialId.value;

   this.userService.GetWorkOrdersByCityAndState(this.ValidateWorkordersReq)
	  .pipe()
	   .subscribe(
		   (data:any) => {
			   var respData=data;
			   if(respData.s == 1 && respData.Data.length > 0)
			   {
					this.WorkOrdersdata=respData.Data;
			   }
			  else  
			   {
			
				//jQuery("#myModalalert").modal("show");
			//	jQuery("#myModal").modal("hide");

				
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
//WasteMaterialFormId