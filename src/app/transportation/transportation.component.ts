import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService,ExcelService } from '../_services';
import { DatePipe } from '@angular/common'
declare var jQuery:any;
@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.css']
})
export class TransportationComponent implements OnInit {
	UserId=localStorage.getItem('UserId');
	DocUploadForm : FormGroup;
	base64string:any;
	base64string1:any;
	base64string2:any;
	public ViewDocumentReq;
	//Transportation request
	public wotransportationreq = {WOTransporterId:0,TransporterId:0,CollectionPurchaseId:0,LRNo:'', TransporterDetails:'', VehicleNo:'',TransportDate:'',TobeDelivered:'',Quantity:0,FreightCost:0,DaysReqForDelivery:'',TransportationStatus:0,RecyclerId:0, PerformBy:'', Operation:0,ManifestCopyDocumentFile:null,ManifestCopyDocument:'',LRCopyDocumentFile:null,LRCopyDocument:'',TrasporterCode:'',IncludedInCP:false ,GSTAmount:0,ManufacturerId:0};
	public wotransportationdata;

	public wotransportationCPdata;
	public wotransportationREdata;
	public TodayDate;
	public AlertMessage;
	
	//transport enrollment data
	public transportreq = {TransporterId:0, TRCode:'', TRName:'', TRAddress:'', TRCityId:'', TRDetails:'', GSTNo:'', AgreementStatus:'',ExpiryDate:'', PerformBy:'', Operation:0 };
	public Transportdata;
	
 public DocStatusReq={ FormId:0,AutoCode:''};
	public DocStatusData;
	public Docreq = {DocumentId :0, FormId :0 ,DocumentTypeId :0 , DocumentName  :'' ,Image  :'' , DocumentDetails :'', UserId :'', Option :'', DocGuid :'Transportation', AutoCode :''};
	public DocumentData;
	
	public SearchWOTransporationreq={TextToSearch:'',FromDate:'',ToDate:'',ManufacturerId:0,PerformBy:''}
	
	public GenerateCodeNamereq={InputField:'',FormName:''}; 
	//CollectionPurchase data
	public collectionpurchasereq = { CollectionPurchaseId:0, WorkOrderId:0,WorkOrderItemId:0,	AggregatorId:0,StateId:0,CityId:0, SuburbID: 0, WasteMaterialId:0,WasteMaterialUnitId :0,WasteMaterialFormId:0,PerKgRate:0,GSTRate:0, WasteMaterialQty:0, TotalPaymtDownStr:0,CreationDate:'',PlacementDate:'', Comments:'', PerformBy:'', Operation:0 };
	public collectionpurchasedata;
	
	//Recycle Enrollment
	 public recyclerreq = {RecylerId:0, RecyclerName:'', Address:'', Details:'', RecylingTypeEndProducts:'', NonOpDays:'', GSTNo:'', AgreementStatusId:0,PCBStatusId:0,PrimaryCntName:'',PrimaryCntDesignation:'',PrimaryCntTelNo:'',PrimaryCntLandlineNo:'',PrimaryCntEmail:'',SecCntName:'',SecCntDesignation:'',SecCntTelNo:'',SecCntLandlineNo:'',SecCntEmail:'',ExpiryDate:'', PerformBy:'', Operation:0 };
    public Recyclerdata;
	
	//Transportation status data
	public StatusListreq = {StatusId:0, StatusName:'', StatusType:'Transportation', Comments:'', PerformBy:'', Operation:0 };
	public TransportationStatusdata;
	
	//Prefill date display 
	public DispalayDate;
	public DispalayDate1;
	public ToDateValidation;
	public FromDateValidation;
	
	
	WOTransporationForm:FormGroup;
	WOTSearch:FormGroup;
	 submitted = false;
	loading = false;
	successmsg = false;
	
	OldManifestDocumet:any;
	OldLRCopyDocument:any;
	CPNamesdata:any;
	WOSalesDetailsdata:any;

	public value = 7;
	public DocData;
	
	constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService, public datepipe: DatePipe,private router: Router,private excelService:ExcelService,)
	{ 
		//this.GetTransport();
		this.GetWOTransporation();
		
		//this.GetCollectionpurchase();
		this.GetRecyclerEnrolment();
		this.GetTransportationStatus();
		this.GetCollectionpurchaseNames();
		this. GetDocTypesByFormId(this.value);

	}

	ngOnInit() 
	{
	

		this.TodayDate=this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
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
		
		this.WOTransporationForm = this.formBuilder.group({
            CollectionPurchaseId: ['', Validators.required],
            TransporterId: ['', Validators.required],
            RecyclerId: ['', Validators.required],
            LRNo: ['', Validators.required],
            TransporterDetails: [''],
            VehicleNo: ['', Validators.required],
            TransportDate: ['', Validators.required],
            TobeDelivered: ['', Validators.required],
            Quantity: [''],
            FreightCost: ['', Validators.required],
            DaysReqForDelivery: ['', Validators.required],
            TransportationStatus: ['', Validators.required],
            ManifestCopyDocument: [''],
            LRCopyDocument: [''],
		   TrasporterCode: [''],
		   IncludedInCP :[false],
		   GSTAmount :[0, Validators.required]
			            
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
		
		this.WOTSearch=this.formBuilder.group({
			TextToSearch:[''],
			FromDate:[''],
			ToDate:['']
		});
	}
	
	 ResetFrom(){
		this.WOTransporationForm.reset();
		this.successmsg = false;
		this.submitted =false;
		this.base64string=undefined;
		this.DocumentData=undefined;
		this.DocUploadForm.reset();

	}
	
	
	onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.WOTransporationForm.invalid) {
            return;
        }
		
	  this.wotransportationreq.CollectionPurchaseId=this.f.CollectionPurchaseId.value;
	  this.wotransportationreq.TransporterId=this.f.TransporterId.value;
	  this.wotransportationreq.TrasporterCode=this.f.TrasporterCode.value;
	  this.wotransportationreq.RecyclerId=this.f.RecyclerId.value;
	  this.wotransportationreq.LRNo=this.f.LRNo.value;
	  this.wotransportationreq.TransporterDetails='';
	  this.wotransportationreq.VehicleNo=this.f.VehicleNo.value;
	  this.wotransportationreq.TransportDate=this.f.TransportDate.value;
	  this.wotransportationreq.TobeDelivered=this.f.TobeDelivered.value;
	  this.wotransportationreq.Quantity=0;
	  this.wotransportationreq.FreightCost=this.f.FreightCost.value;
	  this.wotransportationreq.DaysReqForDelivery=this.f.DaysReqForDelivery.value;
	  this.wotransportationreq.TransportationStatus=this.f.TransportationStatus.value;
	  this.wotransportationreq.ManifestCopyDocument=this.f.ManifestCopyDocument.value;
	  this.wotransportationreq.ManifestCopyDocumentFile=this.base64string1;
	  this.wotransportationreq.LRCopyDocument=this.f.LRCopyDocument.value;
	  this.wotransportationreq.LRCopyDocumentFile=this.base64string2;
	    this.wotransportationreq.IncludedInCP=this.f.IncludedInCP.value;
		this.wotransportationreq.GSTAmount=this.f.GSTAmount.value;

	  
	  
	  this.wotransportationreq.WOTransporterId=0;
	  this.wotransportationreq.PerformBy=localStorage.getItem('UserId');
	  this.wotransportationreq.Operation=1;
	 
      this.ValidateDocStatus();
    }
	
	GetRE(value)
	{
		this.wotransportationreq.CollectionPurchaseId=value;
		this.GetWOTransporation();
	}
	
	
	
	
	//Display transport enrollment
/*	GetTransport(){
	  
		 this.loading = true;
        this.userService.transportCRUD(this.transportreq)
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
	}*/
	
	//Display WOTransporationForm
	
	GetWOTransporation(){
	  
		 this.loading = true;
        this.userService.wotransportationCRUD(this.wotransportationreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						this.wotransportationdata=respData.Data;						
						this.wotransportationCPdata=respData.DataCP;
						this.wotransportationREdata=respData.DataRE;
						this.Transportdata=respData.DataTR;
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
	
	SearchTransportation(value)
	{
		
		
		if(value.length>0)
		{
			this.SearchWOTransporationreq.TextToSearch=value;
			this.SearchWOTransporationreq.ToDate='';
			this.SearchWOTransporationreq.FromDate='';
			this.SearchWOTransporation();
		}
		else
		{
			this.SearchWOTransporationreq.TextToSearch='';
			this.SearchWOTransporationreq.ToDate='';
			this.SearchWOTransporationreq.FromDate='';
			this.SearchWOTransporation();
		}
	}
	
	SearchWOTransporation(){
	  
		 this.loading = true;
        this.userService.SearchWOTransportation(this.SearchWOTransporationreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.wotransportationdata=respData.Data;
						
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
	
	
	
	DateValidationToDate()
	  {  
	  
	  this.SearchWOTransporationreq.TextToSearch='';
	  this.SearchWOTransporationreq.ToDate='';
		  this.ToDateValidation=this.datepipe.transform(this.WOTS.FromDate.value, 'yyyy-MM-dd');
		  this.SearchWOTransporationreq.FromDate=this.datepipe.transform(this.WOTS.FromDate.value, 'yyyy-MM-dd');
		  this.SearchWOTransporation();
	  }
	  
	  SearchOnDate()
	  
	  { 
	  
	  this.SearchWOTransporationreq.TextToSearch='';
	        this.FromDateValidation=this.datepipe.transform(this.WOTS.ToDate.value,'yyyy-MM-dd');
			this.SearchWOTransporationreq.FromDate=this.datepipe.transform(this.WOTS.FromDate.value, 'yyyy-MM-dd');
		    this.SearchWOTransporationreq.ToDate=this.datepipe.transform(this.WOTS.ToDate.value,'yyyy-MM-dd');
			this.SearchWOTransporation();
	  }
	
	
	
	//Display Collection Purchase Component
	
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
	
	//Display Transportation status
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
	
	GetCollectionpurchaseNames(){
	  
		 this.loading = true;
        this.userService.GetCollectionPurchaseNamess()
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.CPNamesdata=respData.Data;
						
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
	
	GetRecyclerEnrolment(){
	  
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
	
	//start Document upload
	
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
	
	SetToBeDelivey(value)
	{ 
	if(this.f.TransportDate.value!=null)
	{
		var tpdate=new Date(this.datepipe.transform(this.f.TransportDate.value, 'yyyy-MM-dd'));
		var caldate=tpdate.setDate(tpdate.getDate() + parseInt(value));
		var changeddate = new Date(caldate); 
		var newdate=this.datepipe.transform(changeddate, 'yyyy-MM-dd');
		this.WOTransporationForm.controls['TobeDelivered'].setValue(newdate);
	}
	else
	{
		var tpdate=new Date(this.datepipe.transform(Date.now(),'yyyy-MM-dd'));
		var caldate=tpdate.setDate(tpdate.getDate() + parseInt(value));
		var changeddate = new Date(caldate); 
		var newdate=this.datepipe.transform(changeddate, 'yyyy-MM-dd');
		this.WOTransporationForm.controls['TobeDelivered'].setValue(newdate);
	}
	}
	
	
	
	//End Document Upload
	
	//CRUD operation AddUpdateDelete wotransportation
	
	
	EditwotransportationData(CollectionPurchaseId,TransporterId,RecyclerId,LRNo,TransporterDetails,VehicleNo,TransportDate,TobeDelivered,Quantity,FreightCost,DaysReqForDelivery,TransportationStatus,WOTransporterId,ManifestDocumet,LRCopyDocument,TrasporterCode,IncludedInCP,GSTAmount)
	{
		this.successmsg = false;
		this.base64string1=undefined;
		this.base64string2=undefined;
		this.WOTransporationForm.controls['CollectionPurchaseId'].setValue(CollectionPurchaseId);
		this.WOTransporationForm.controls['TrasporterCode'].setValue(TrasporterCode);
		
		this.WOTransporationForm.controls['TransporterId'].setValue(TransporterId);
		this.WOTransporationForm.controls['RecyclerId'].setValue(RecyclerId);
		this.WOTransporationForm.controls['LRNo'].setValue(LRNo);
		this.WOTransporationForm.controls['TransporterDetails'].setValue(TransporterDetails);
		this.WOTransporationForm.controls['VehicleNo'].setValue(VehicleNo);
		// this.WOTransporationForm.controls['TransportDate'].setValue(TransportDate);
		// this.DispalayDate= TransportDate
		// this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		
		this.DispalayDate1= TobeDelivered;
		this.DispalayDate1= this.datepipe.transform(this.DispalayDate1, 'yyyy-MM-dd');
		this.wotransportationreq.TobeDelivered=this.DispalayDate1;
		this.WOTransporationForm.controls['TobeDelivered'].setValue(this.DispalayDate1);
	
		
		
		this.WOTransporationForm.controls['Quantity'].setValue(Quantity);
		this.WOTransporationForm.controls['FreightCost'].setValue(FreightCost);
		this.WOTransporationForm.controls['DaysReqForDelivery'].setValue(DaysReqForDelivery);
		this.WOTransporationForm.controls['TransportationStatus'].setValue(TransportationStatus);
		this.WOTransporationForm.controls['GSTAmount'].setValue(GSTAmount);

		this.DispalayDate= TransportDate;
		this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		this.wotransportationreq.TransportDate=this.DispalayDate;
		this.WOTransporationForm.controls['TransportDate'].setValue(this.DispalayDate);
   
		//this.WOTransporationForm.controls['UnloadingDate'].setValue(UnloadingDate);
		if(IncludedInCP!="")
		{
		
			this.WOTransporationForm.controls['IncludedInCP'].setValue('');
		
		}
		else
		{
			
			this.WOTransporationForm.controls['IncludedInCP'].setValue(IncludedInCP);
		
		}
		
		if(ManifestDocumet!="" && ManifestDocumet!=undefined)
		{
			var FileName=ManifestDocumet.split('/');
			this.OldManifestDocumet=FileName[FileName.length-1];
		}
		if(LRCopyDocument!="" && LRCopyDocument!=undefined)
		{
			var FileName=LRCopyDocument.split('/');
			this.OldLRCopyDocument=FileName[FileName.length-1];
		}
		
		
		 this.wotransportationreq.CollectionPurchaseId=this.f.CollectionPurchaseId.value;
		 this.wotransportationreq.TransporterId=this.f.TransporterId.value;
		 this.wotransportationreq.TrasporterCode=this.f.TrasporterCode.value;
		 this.wotransportationreq.RecyclerId=this.f.RecyclerId.value;
		 this.wotransportationreq.LRNo=this.f.LRNo.value;
		 this.wotransportationreq.TransporterDetails='';
		 this.wotransportationreq.VehicleNo=this.f.VehicleNo.value;
		//  this.wotransportationreq.TransportDate=this.f.TransportDate.value;
		 this.wotransportationreq.TobeDelivered=this.f.TobeDelivered.value;
		 this.wotransportationreq.Quantity=0;
		 this.wotransportationreq.FreightCost=this.f.FreightCost.value;
		 this.wotransportationreq.DaysReqForDelivery=this.f.DaysReqForDelivery.value;
		 this.wotransportationreq.TransportationStatus=this.f.TransportationStatus.value;
		 this.wotransportationreq.ManifestCopyDocument=this.f.ManifestCopyDocument.value;
		 this.wotransportationreq.LRCopyDocument=this.f.LRCopyDocument.value;
		// this.wotransportationreq.UnloadingDate=this.f.UnloadingDate.value;
		this.wotransportationreq.IncludedInCP=this.f.IncludedInCP.value;
		this.wotransportationreq.GSTAmount=this.f.GSTAmount.value;

	  this.wotransportationreq.WOTransporterId=WOTransporterId;
	  this.wotransportationreq.PerformBy=localStorage.getItem('UserId');
	  this.wotransportationreq.Operation=2;
	  
	  this.ViewDocument();
	}
	
	
	
		DeletewotransportationData(CollectionPurchaseId,TransporterId,RecyclerId,LRNo,TransporterDetails,VehicleNo,TransportDate,TobeDelivered,Quantity,FreightCost,DaysReqForDelivery,TransportationStatus,WOTransporterId,ManifestDocumet,LRCopyDocument,IncludedInCP,GSTAmount)
	{
		this.base64string1=undefined;
		this.base64string2=undefined;		
		this.WOTransporationForm.controls['CollectionPurchaseId'].setValue(CollectionPurchaseId);
		this.WOTransporationForm.controls['TransporterId'].setValue(TransporterId);
		this.WOTransporationForm.controls['RecyclerId'].setValue(RecyclerId);
		this.WOTransporationForm.controls['LRNo'].setValue(LRNo);
		this.WOTransporationForm.controls['TransporterDetails'].setValue(TransporterDetails);
		this.WOTransporationForm.controls['VehicleNo'].setValue(VehicleNo);
		this.WOTransporationForm.controls['TransportDate'].setValue(TransportDate);
		this.WOTransporationForm.controls['TobeDelivered'].setValue(TobeDelivered);
		this.WOTransporationForm.controls['Quantity'].setValue(Quantity);
		this.WOTransporationForm.controls['FreightCost'].setValue(FreightCost);
		this.WOTransporationForm.controls['DaysReqForDelivery'].setValue(DaysReqForDelivery);
		this.WOTransporationForm.controls['TransportationStatus'].setValue(TransportationStatus);
		//this.WOTransporationForm.controls['UnloadingDate'].setValue(UnloadingDate);
		this.WOTransporationForm.controls['IncludedInCP'].setValue(IncludedInCP);
		this.WOTransporationForm.controls['GSTAmount'].setValue(GSTAmount);

		
		 this.wotransportationreq.CollectionPurchaseId=this.f.CollectionPurchaseId.value;
		 this.wotransportationreq.TransporterId=this.f.TransporterId.value;
		 this.wotransportationreq.RecyclerId=this.f.RecyclerId.value;
		 this.wotransportationreq.LRNo=this.f.LRNo.value;
		 this.wotransportationreq.TransporterDetails='';
		 this.wotransportationreq.VehicleNo=this.f.VehicleNo.value;
		 this.wotransportationreq.TransportDate=this.f.TransportDate.value;
		 this.wotransportationreq.TobeDelivered=this.f.TobeDelivered.value;
		 this.wotransportationreq.Quantity=0;
		 this.wotransportationreq.FreightCost=this.f.FreightCost.value;
		 this.wotransportationreq.DaysReqForDelivery=this.f.DaysReqForDelivery.value;
		 this.wotransportationreq.TransportationStatus=this.f.TransportationStatus.value;
		 this.wotransportationreq.ManifestCopyDocument=this.f.ManifestCopyDocument.value;
		 this.wotransportationreq.LRCopyDocument=this.f.LRCopyDocument.value;
		// this.wotransportationreq.UnloadingDate=this.f.UnloadingDate.value;
		this.wotransportationreq.IncludedInCP=this.f.IncludedInCP.value;
		this.wotransportationreq.GSTAmount=this.f.GSTAmount.value;

	  this.wotransportationreq.WOTransporterId=WOTransporterId;
	  this.wotransportationreq.PerformBy=localStorage.getItem('UserId');
	  this.wotransportationreq.Operation=3;
	}
	
	 GetWOSalesDetails(WOTransporterId){
	  
		 this.loading = true;
        this.userService.Searchsalesdetials({WOTransporterId:WOTransporterId})
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.WOSalesDetailsdata=respData.Data;
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
	
	
	
	
	get f() { return this.WOTransporationForm.controls; }
	get d() { return this.DocUploadForm.controls; }

	get WOTS(){return this.WOTSearch.controls;}
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
this.excelService.exportAsExcelFile(this.wotransportationdata, 'Transportation Report');
}
	AddUpdateDeletewotransportation(){
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		   if (this.WOTransporationForm.invalid) {
			this.loading = false;
            return;
			
        }
		this.wotransportationreq.TrasporterCode=this.f.TrasporterCode.value;
	  this.wotransportationreq.CollectionPurchaseId=this.f.CollectionPurchaseId.value;
	  this.wotransportationreq.TransporterId=this.f.TransporterId.value;
	  this.wotransportationreq.RecyclerId=this.f.RecyclerId.value;
	  this.wotransportationreq.LRNo=this.f.LRNo.value;
	  this.wotransportationreq.TransporterDetails='';
	  this.wotransportationreq.VehicleNo=this.f.VehicleNo.value;
	  this.wotransportationreq.TransportDate=this.f.TransportDate.value;
	  this.wotransportationreq.TobeDelivered=this.f.TobeDelivered.value;
	  this.wotransportationreq.Quantity=0;
	  this.wotransportationreq.FreightCost=this.f.FreightCost.value;
	  this.wotransportationreq.DaysReqForDelivery=this.f.DaysReqForDelivery.value;
	  this.wotransportationreq.TransportationStatus=this.f.TransportationStatus.value;
	  
	  this.wotransportationreq.ManifestCopyDocument=this.f.ManifestCopyDocument.value;
	  this.wotransportationreq.ManifestCopyDocumentFile=this.base64string1;
	  this.wotransportationreq.LRCopyDocument=this.f.LRCopyDocument.value;
	  this.wotransportationreq.LRCopyDocumentFile=this.base64string2;
	 // this.wotransportationreq.UnloadingDate=this.f.UnloadingDate.value;
	 this.wotransportationreq.IncludedInCP=this.f.IncludedInCP.value;
	 this.wotransportationreq.GSTAmount=this.f.GSTAmount.value;
	 
	 if(this.wotransportationreq.IncludedInCP == null){
		this.wotransportationreq.IncludedInCP = false;

		}
        this.userService.wotransportationCRUD(this.wotransportationreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.wotransportationdata=respData.Data;
						 this.wotransportationCPdata=respData.DataCP;
						this.wotransportationREdata=respData.DataRE;
						 this.alertService.success(''+respData.m, true);
						 this.AlertMessage=respData.m;
						// this.alertService.success(''+respData.m, true);
						 jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
						  jQuery("#myModalalert").modal("show");
					}
					else{
						this.alertService.success(''+ respData.m, true);
						 this.AlertMessage=respData.m;
						// this.alertService.success(''+respData.m, true);
						 jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
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
	
	
	Deletewotransportation(){
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		 /*  if (this.WOTransporationForm.invalid) {
			this.loading = false;
            return;
			
        } */
		
	  this.wotransportationreq.CollectionPurchaseId=this.f.CollectionPurchaseId.value;
	  this.wotransportationreq.TransporterId=this.f.TransporterId.value;
	  this.wotransportationreq.RecyclerId=this.f.RecyclerId.value;
	  this.wotransportationreq.LRNo=this.f.LRNo.value;
	  this.wotransportationreq.TransporterDetails='';
	  this.wotransportationreq.VehicleNo=this.f.VehicleNo.value;
	  this.wotransportationreq.TransportDate=this.f.TransportDate.value;
	  this.wotransportationreq.TobeDelivered=this.f.TobeDelivered.value;
	  this.wotransportationreq.Quantity=0;
	  this.wotransportationreq.FreightCost=this.f.FreightCost.value;
	  this.wotransportationreq.DaysReqForDelivery=this.f.DaysReqForDelivery.value;
	  this.wotransportationreq.TransportationStatus=this.f.TransportationStatus.value;
	  
	  this.wotransportationreq.ManifestCopyDocument=this.f.ManifestCopyDocument.value;
	  this.wotransportationreq.ManifestCopyDocumentFile=this.base64string1;
	  this.wotransportationreq.LRCopyDocument=this.f.LRCopyDocument.value;
	  this.wotransportationreq.LRCopyDocumentFile=this.base64string2;
	 // this.wotransportationreq.UnloadingDate=this.f.UnloadingDate.value;
	  
	 this.wotransportationreq.IncludedInCP=this.f.IncludedInCP.value;
        this.userService.wotransportationCRUD(this.wotransportationreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.wotransportationdata=respData.Data;
						 this.alertService.success(''+respData.m, true);
						 this.AlertMessage=respData.m;
						// this.alertService.success(''+respData.m, true);
						 jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
						  jQuery("#myModalalert").modal("show");
					}
					else{
						this.alertService.success(''+ respData.m, true);
						 this.AlertMessage=respData.m;
						// this.alertService.success(''+respData.m, true);
						 jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
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
	
	GenerateTrnspoterCode(value)
	{
		
		const result = this.Transportdata.find( a => a.TransporterId === parseInt(value) );
		console.log("WO Value result :"+result.TRName);
		
		this.GenerateCodeNamereq.InputField=result.TRName.substring(0,4) ;
		this.GenerateCodeNamereq.FormName='Transpotation';
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
							this.WOTransporationForm.controls['TrasporterCode'].setValue(respData.Data);
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
		
		UploadDocument()
  {
	  this.submitted = true;
this.DocUploadForm.controls['Image'].setValue(this.base64string);
        // stop here if form is invalid
        if (this.DocUploadForm.invalid) {
            return;
        }
		
		this.Docreq.AutoCode=this.f.TrasporterCode.value;
		this.Docreq.DocumentTypeId=this.d.DocumentTypeId.value;
		this.Docreq.DocumentName=this.d.DocumentName.value;
		this.Docreq.DocumentDetails=this.d.DocumentDetails.value;
		this.Docreq.FormId=this.value;
		this.Docreq.Image=this.base64string;
		this.Docreq.DocGuid='Transportation';
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
		this.Docreq.AutoCode=this.f.TrasporterCode.value;
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

EditTransportation(){
	this.ValidateDocStatus();
}

ValidateDocStatus()
{
	this.DocStatusReq.FormId=this.value;
	this.DocStatusReq.AutoCode=this.f.TrasporterCode.value;
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
						 this.AddUpdateDeletewotransportation();
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
}
