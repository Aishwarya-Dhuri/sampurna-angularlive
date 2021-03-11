import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService,ExcelService } from '../_services';
import { DatePipe } from '@angular/common'
declare var jQuery:any;
@Component({
  selector: 'app-view-sales-details',
  templateUrl: './view-sales-details.component.html',
  styleUrls: ['./view-sales-details.component.css']
})
export class ViewSalesDetailsComponent implements OnInit {
	UserId=localStorage.getItem('UserId');
	public ViewDocumentReq;
public wotransportationCPdata;
	public wotransportationREdata;
public AlertMessage;
public TodayDate;
public UnloadingDate;
public WorkOrderDataForSales;
public GetDeliveryDateByTransporterIdreq={TransporterId:0};

public GenerateCodeNamereq={InputField:'',FormName:''}; 
public Docreq = {DocumentId :0, FormId :0 ,DocumentTypeId :0 , DocumentName  :'' ,Image  :'' , DocumentDetails :'', UserId :'', Option :'', DocGuid :'ViewSalesDetails', AutoCode :''};
	public DocumentData;
	 public DocStatusReq={ FormId:0,AutoCode:''};
	public DocStatusData;
	
 public recyclerreq = {RecylerId:0, RecyclerName:'', Address:'', Details:'', RecylingTypeEndProducts:'', NonOpDays:'', GSTNo:'', AgreementStatusId:0,PCBStatusId:0,PrimaryCntName:'',PrimaryCntDesignation:'',PrimaryCntTelNo:'',PrimaryCntLandlineNo:'',PrimaryCntEmail:'',SecCntName:'',SecCntDesignation:'',SecCntTelNo:'',SecCntLandlineNo:'',SecCntEmail:'',ExpiryDate:'', PerformBy:'', Operation:0 };
    public Recyclerdata;
	
	public wosalesdetialsreq = {WOSalesId:0, WOTransporterId:0, TransporterId:0, QuantityReceived:0,ProcessingCharges:0, DeliveryDate:'',UnloadingDate:'',GSTNo:'',MaterialValue:0, NetAmount:0,Comments:'',Rate:0,SalesRate:0, PerformBy:'', Operation:0, CoProcessingCertificate:'', CoProcessingCertificateFile:null, ReceivingCopy:'', ReceivingCopyFile:null,SalesCode:'' ,QuantityUnit:0,RecyclerId:0};
	public WOSalesDetailsdata;
	
	
	//Data Work order Transportation
	public wotransportationreq = {WOTransporterId:0,TransporterId:0,CollectionPurchaseId:0,LRNo:'', TransporterDetails:'', VehicleNo:'',TransportDate:'',TobeDelivered:'',Quantity:0,FreightCost:0,DaysReqForDelivery:'',RecyclerId:0, PerformBy:'', Operation:0 };
	public wotransportationdata;
	
	
	//Transpoter Enrollment
	public transportreq = {TransporterId:0, TRCode:'', TRName:'', TRAddress:'', TRCityId:'', TRDetails:'', GSTNo:'',AgreementStatusId:0,PrimaryCntName:'',PrimaryCntDesignation:'',PrimaryCntTelNo:'',PrimaryCntLandlineNo:'',PrimaryCntEmail:'',SecCntName:'',SecCntDesignation:'',SecCntTelNo:'',SecCntLandlineNo:'',SecCntEmail:'',ExpiryDate:'', PerformBy:'', Operation:0 };
	public Transportdata;
	
	public SearchWOSalesDetailsReq={SalesCode:'',ToDate:'',FromDate:'',WOTransporterId:0}
	
	//public SendMailreq={subject:'',body:'',emailTo:''}
		//Data Material
		public materialunitreq = {MaterialUnitId:0, MaterialUnit:0, MaterialUnitCode:0, Comments:'', PerformBy:'', Operation:0 };
		public materialunitdata;  

	DocUploadForm : FormGroup;

	WOSalesDetailsForm:FormGroup;
	 submitted = false;
	loading = false;
	successmsg = false;
	public DocData;

	public DispalayDate;
	public DispalayDate1;

	base64string:any;
	base64string1:any;
	base64string2:any;
	OldCPC:any;
	OldRC:any;
	public value = 8;
	

	
 constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService, public datepipe: DatePipe,private router: Router,private route: ActivatedRoute,private excelService:ExcelService,)
 {
	 this.GetWOSalesDetails();
	 this.GetWOTransporation();
	 this.GetTransport();
	 this. GetDocTypesByFormId(this.value);
//this.GetWOTransporation();
this.GetMaterialUnit();
 }
  
  ngOnInit() {
	  // this.nav.show();
	


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
	    this.WOSalesDetailsForm = this.formBuilder.group({
			
            WOTransporterId: ['', Validators.required],
            TransporterId: [0],
			QuantityReceived: ['', Validators.required],
			QuantityUnit :[0,Validators.required],
			ProcessingCharges: ['', Validators.required],
            DeliveryDate: ['', Validators.required],
            UnloadingDate: ['', Validators.required],    
            GSTNo: ['', Validators.required],
            Rate: ['', Validators.required],
            SalesRate: ['', Validators.required],
            MaterialValue: [ ''],
            NetAmount: [''],
            Comments: [''],
			CoProcessingCertificate: [''],
			ReceivingCopy:[''],
			SalesCode:[''],
			RecyclerId:[0, Validators.required]
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
  
  UnloadingDateValidation()
  {
	  this.UnloadingDate=this.f.DeliveryDate.value;
  }
  
  
  
   ResetFrom(){
		this.WOSalesDetailsForm.reset();
		this.successmsg = false;
		this.submitted =false;
		this.base64string=undefined;
		this.DocumentData=undefined;
		this.DocUploadForm.reset();
	}
	
	SearchSalesDetails(value)
	{
		if(value.length>=1)
		{
			this.SearchWOSalesDetailsReq.SalesCode=value;
			this.SearchWOSalesDetailsReq.ToDate='';
			this.SearchWOSalesDetailsReq.FromDate='';
			this.SearchWOSalesDetails();
		}
		else
		{

			this.SearchWOSalesDetailsReq.SalesCode='';
			this.SearchWOSalesDetailsReq.ToDate='';
			this.SearchWOSalesDetailsReq.FromDate='';
			this.SearchWOSalesDetails();
		}
	}
	
	SearchSalesDetailsByDate(value)
	{
		this.SearchWOSalesDetailsReq.SalesCode='';
		this.SearchWOSalesDetailsReq.ToDate=value;
		this.SearchWOSalesDetails();
	}
	SearchSalesDetailsByDate1(value)
	{
		this.SearchWOSalesDetailsReq.SalesCode='';
		this.SearchWOSalesDetailsReq.FromDate=value;
		this.SearchWOSalesDetails();
	}
	
	SearchWOSalesDetails(){
	  
		 this.loading = true;
        this.userService.Searchsalesdetials(this.SearchWOSalesDetailsReq)
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
	
	
	OpenDocument(url)
	{
		window.open(url, "_blank");
	}
	
	// getFiles(event,docname) 
	// {
    //  var files = event.target.files;
    //  var reader = new FileReader();
	 
	//  if(docname=='CPC')
	//  {
	// 	reader.onload = this._handleReaderLoaded1.bind(this); 
	//  }
	//  if(docname=='RC')
	//  {
	// 	reader.onload = this._handleReaderLoaded2.bind(this);  
	//  }
	 
    //  reader.readAsBinaryString(files[0]);
	// }
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
   
  
  
  onSubmit() {
	  this.submitted = true;
	    if (this.WOSalesDetailsForm.invalid) {
             return;
         }
		
        this.submitted = true;
		this.wosalesdetialsreq.WOTransporterId=this.f.WOTransporterId.value;
		this.wosalesdetialsreq.TransporterId=this.f.TransporterId.value;
		this.wosalesdetialsreq.QuantityReceived=this.f.QuantityReceived.value;
		this.wosalesdetialsreq.Rate=this.f.Rate.value;
		this.wosalesdetialsreq.SalesRate=this.f.SalesRate.value;
		this.wosalesdetialsreq.ProcessingCharges=this.f.ProcessingCharges.value;
		this.wosalesdetialsreq.DeliveryDate=this.f.DeliveryDate.value;
		this.wosalesdetialsreq.UnloadingDate=this.f.UnloadingDate.value;
		this.wosalesdetialsreq.GSTNo=this.f.GSTNo.value;
		// this.wosalesdetialsreq.MaterialValue= this.sum;
			this.wosalesdetialsreq.MaterialValue= this.netamt1;

		this.wosalesdetialsreq.NetAmount= this.netamt;
		this.wosalesdetialsreq.Comments=this.f.Comments.value;
		this.wosalesdetialsreq.SalesCode=this.f.SalesCode.value;
		this.wosalesdetialsreq.QuantityUnit=this.f.QuantityUnit.value;
		this.wosalesdetialsreq.RecyclerId=this.f.RecyclerId.value;

	  this.wosalesdetialsreq.WOSalesId=0;
	  this.wosalesdetialsreq.PerformBy=localStorage.getItem('UserId');
	  this.wosalesdetialsreq.Operation=1;
        // stop here if form is invalid
       
	  this.ValidateDocStatus();
	  
    }
  get f() { return this.WOSalesDetailsForm.controls; }
  get d() { return this.DocUploadForm.controls; }

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
this.excelService.exportAsExcelFile(this.WOSalesDetailsdata, 'Collection purchase Report');
}




   GetWOSalesDetails(){
	  
		 this.loading = true;
        this.userService.wosalesdetialsCRUD(this.wosalesdetialsreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.WOSalesDetailsdata=respData.Data;
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
	//Transport enrollment
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
	
	
	//Start Add Code
	
	//Material value = Quantity * Sales rate 
	sum: number;
  calculate(qtyrecv:number, ratenum:number) {
   this.sum =+qtyrecv * +ratenum;
  }
  
  
  
  //Net amount=Quantity Received * (Sales Rate – Processing Charge)
  netamt:number;
  calculateNetamount()
  {
	this.netamt=0;
	 if (this.f.SalesRate.value!=0 && this.f.QuantityReceived.value!=0 )
	 {
	  this.netamt=this.f.SalesRate.value - this.f.ProcessingCharges.value ; 
	  this.netamt=this.netamt * this.f.QuantityReceived.value;//+materialvlaue + +processcharge;
	 }
	 else{
		this.netamt=0;
	 }
  }
  //End Add Code
  
  calculateMaterialValue()
  {
	this.netamt1=0;
	 if (this.f.SalesRate.value!=0 && this.f.QuantityReceived.value!=0 )
	 {
	  
	  this.netamt1=this.f.SalesRate.value * this.f.QuantityReceived.value;//+materialvlaue + +processcharge;
	 }
	 else{
		this.netamt1=0;
	 }
  }
  //Start Edit Code
	
	//Material value = Quantity * Sales rate 
	sum1: number;
  calculate1(qtyrecv1:number, ratenum1:number) {
   this.sum1 =+qtyrecv1 * +ratenum1;
  }
  
  
  
  //Net amount=Quantity Received * (Sales Rate – Processing Charge)
  netamt1:number;
  calculate3(materialvlaue1:number, processcharge1:number)
  {
	  this.netamt1= +materialvlaue1 + +processcharge1;
  }
  //End Edit Code
  
  
	

	
	EditWOSalesDetailsData(WOTransporterId,TransporterId,DeliveryDate,UnloadingDate,QuantityReceived,Rate,SalesRate,MaterialValue,GSTNo,ProcessingCharges,NetAmount,Comments,WOSalesId,CoProcessingCertificate,ReceivingCopy,SalesCode,QuantityUnit,RecyclerId)
	{
this.GetDeliveryDateByTransporterIdreq.TransporterId=TransporterId;
		this.GetDeliveryDateByTransporterId();
		this.successmsg = false;
		this.base64string1=undefined;
		this.base64string2=undefined;
		this.WOSalesDetailsForm.controls['WOTransporterId'].setValue(WOTransporterId);
		this.WOSalesDetailsForm.controls['TransporterId'].setValue(TransporterId);
		this.WOSalesDetailsForm.controls['DeliveryDate'].setValue(DeliveryDate);
		this.WOSalesDetailsForm.controls['UnloadingDate'].setValue(UnloadingDate);
		this.WOSalesDetailsForm.controls['QuantityReceived'].setValue(QuantityReceived);
		this.WOSalesDetailsForm.controls['Rate'].setValue(Rate);
		this.WOSalesDetailsForm.controls['SalesCode'].setValue(SalesCode);
		this.WOSalesDetailsForm.controls['SalesRate'].setValue(SalesRate);
		this.WOSalesDetailsForm.controls['MaterialValue'].setValue(MaterialValue);
		this.WOSalesDetailsForm.controls['GSTNo'].setValue(GSTNo);
		this.WOSalesDetailsForm.controls['ProcessingCharges'].setValue(ProcessingCharges);	
		this.WOSalesDetailsForm.controls['NetAmount'].setValue(NetAmount);
		this.WOSalesDetailsForm.controls['Comments'].setValue(Comments);
		this.WOSalesDetailsForm.controls['QuantityUnit'].setValue(QuantityUnit);
	this.WOSalesDetailsForm.controls['RecyclerId'].setValue(RecyclerId);
		// if(CoProcessingCertificate!="" && CoProcessingCertificate!=undefined)
		// {
		// 	var FileName=CoProcessingCertificate.split('/');
		// 	this.OldCPC=FileName[FileName.length-1];
		// }
		// if(ReceivingCopy!="" && ReceivingCopy!=undefined)
		// {
		// 	var FileName=ReceivingCopy.split('/');
		// 	this.OldRC=FileName[FileName.length-1];
		// }
		
		this.wosalesdetialsreq.WOTransporterId=this.f.WOTransporterId.value;
		this.wosalesdetialsreq.TransporterId=this.f.TransporterId.value;
		this.wosalesdetialsreq.DeliveryDate=this.f.DeliveryDate.value;
		 this.DispalayDate= DeliveryDate
		this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		
		this.wosalesdetialsreq.UnloadingDate=this.f.UnloadingDate.value;
		 this.DispalayDate1= UnloadingDate
		this.DispalayDate1= this.datepipe.transform(this.DispalayDate1, 'yyyy-MM-dd');
		this.wosalesdetialsreq.QuantityReceived=this.f.QuantityReceived.value;
		this.wosalesdetialsreq.Rate=this.f.Rate.value;
		this.wosalesdetialsreq.SalesCode=this.f.SalesCode.value;
		this.wosalesdetialsreq.SalesRate=this.f.SalesRate.value;
	 this.wosalesdetialsreq.MaterialValue=this.f.MaterialValue.value;
		// this.wosalesdetialsreq.MaterialValue=this.sum;
		//this.wosalesdetialsreq.MaterialValue= this.netamt1;

		
		this.wosalesdetialsreq.GSTNo=this.f.GSTNo.value;
		this.wosalesdetialsreq.ProcessingCharges=this.f.ProcessingCharges.value;
		this.wosalesdetialsreq.NetAmount=this.f.NetAmount.value;
		this.wosalesdetialsreq.Comments=this.f.Comments.value;
		this.wosalesdetialsreq.QuantityUnit=this.f.QuantityUnit.value;

	  this.wosalesdetialsreq.WOSalesId=WOSalesId;
	 this.wosalesdetialsreq.RecyclerId=this.f.RecyclerId.value;;

	  
	 
	  this.ViewDocument();
	  this.GetDeliveryDateByTransporterIdreq.TransporterId=WOTransporterId;
	  this.GetDeliveryDateByTransporterId();
	  this.wosalesdetialsreq.PerformBy=localStorage.getItem('UserId');
	  this.wosalesdetialsreq.Operation=2;
	}
	
	
	DeleteWOSalesDetailsData(WOTransporterId,TransporterId,DeliveryDate,UnloadingDate,QuantityReceived,Rate,SalesRate,MaterialValue,GSTNo,ProcessingCharges,NetAmount,Comments,WOSalesId,QuantityUnit)
	{
		/* this.successmsg = false; */
		this.base64string1=undefined;
		this.base64string2=undefined;
		this.WOSalesDetailsForm.controls['WOTransporterId'].setValue(WOTransporterId);
		this.WOSalesDetailsForm.controls['TransporterId'].setValue(TransporterId);
		this.WOSalesDetailsForm.controls['DeliveryDate'].setValue(DeliveryDate);
		this.WOSalesDetailsForm.controls['UnloadingDate'].setValue(UnloadingDate);
		this.WOSalesDetailsForm.controls['QuantityReceived'].setValue(QuantityReceived);
		this.WOSalesDetailsForm.controls['Rate'].setValue(Rate);
		
		this.WOSalesDetailsForm.controls['SalesRate'].setValue(SalesRate);
		this.WOSalesDetailsForm.controls['MaterialValue'].setValue(MaterialValue);
		this.WOSalesDetailsForm.controls['GSTNo'].setValue(GSTNo);
		this.WOSalesDetailsForm.controls['ProcessingCharges'].setValue(ProcessingCharges);	
		this.WOSalesDetailsForm.controls['NetAmount'].setValue(NetAmount);
		this.WOSalesDetailsForm.controls['Comments'].setValue(Comments);
		this.WOSalesDetailsForm.controls['QuantityUnit'].setValue(QuantityUnit);

		
		
		this.wosalesdetialsreq.WOTransporterId=this.f.WOTransporterId.value;
		this.wosalesdetialsreq.TransporterId=this.f.TransporterId.value;
		this.wosalesdetialsreq.DeliveryDate=this.f.DeliveryDate.value;
		 this.DispalayDate= DeliveryDate
		this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		
		this.wosalesdetialsreq.UnloadingDate=this.f.UnloadingDate.value;
		 this.DispalayDate1= UnloadingDate
		this.DispalayDate1= this.datepipe.transform(this.DispalayDate1, 'yyyy-MM-dd');
		this.wosalesdetialsreq.QuantityReceived=this.f.QuantityReceived.value;
		this.wosalesdetialsreq.Rate=this.f.Rate.value;
		
		this.wosalesdetialsreq.SalesRate=this.f.SalesRate.value;
		this.wosalesdetialsreq.MaterialValue=this.f.MaterialValue.value;
		this.wosalesdetialsreq.GSTNo=this.f.GSTNo.value;
		this.wosalesdetialsreq.ProcessingCharges=this.f.ProcessingCharges.value;
		this.wosalesdetialsreq.NetAmount=this.f.NetAmount.value;
		this.wosalesdetialsreq.Comments=this.f.Comments.value;
		this.wosalesdetialsreq.QuantityUnit=this.f.QuantityUnit.value;

	  this.wosalesdetialsreq.WOSalesId=WOSalesId;
	  this.wosalesdetialsreq.PerformBy=localStorage.getItem('UserId');
	  this.wosalesdetialsreq.Operation=3;
	}
	
	
	AddUpdateDeleteWOSalesDetails()
	{
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.WOSalesDetailsForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		this.wosalesdetialsreq.WOTransporterId=this.f.WOTransporterId.value;
		this.wosalesdetialsreq.TransporterId=this.f.TransporterId.value;
		this.wosalesdetialsreq.QuantityReceived=this.f.QuantityReceived.value;
		this.wosalesdetialsreq.Rate=this.f.Rate.value;
		this.wosalesdetialsreq.ProcessingCharges=this.f.ProcessingCharges.value;
		this.wosalesdetialsreq.DeliveryDate=this.f.DeliveryDate.value;
		this.wosalesdetialsreq.UnloadingDate=this.f.UnloadingDate.value;
		this.wosalesdetialsreq.GSTNo=this.f.GSTNo.value;
		this.wosalesdetialsreq.SalesRate=this.f.SalesRate.value;
		this.wosalesdetialsreq.MaterialValue= this.netamt1;
		this.wosalesdetialsreq.NetAmount= this.netamt;
		this.wosalesdetialsreq.SalesCode=this.f.SalesCode.value;
		this.wosalesdetialsreq.CoProcessingCertificate= this.f.CoProcessingCertificate.value;
		this.wosalesdetialsreq.CoProcessingCertificateFile= this.base64string1;
		this.wosalesdetialsreq.ReceivingCopy= this.f.ReceivingCopy.value;
		this.wosalesdetialsreq.ReceivingCopyFile= this.base64string2;
		this.wosalesdetialsreq.QuantityUnit=this.f.QuantityUnit.value;
		this.wosalesdetialsreq.RecyclerId=this.f.RecyclerId.value;

	  
        this.userService.wosalesdetialsCRUD(this.wosalesdetialsreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.WOSalesDetailsdata=respData.Data;
						// this.alertService.success(''+respData.m, true);
						// this.alerts.setMessage(''+respData.m,'success');
						 this.AlertMessage=respData.m;
						// this.alertService.success(''+respData.m, true);
						 jQuery("#myModalAddsales").modal("hide");
						 jQuery("#myModaledit").modal("hide");
						  jQuery("#myModalalert").modal("show");
					
						  
					}
					else{
						this.alertService.error(''+ respData.m, true);
						//this.alerts.setMessage(''+respData.m,'success');
						//  this.AlertMessage=respData.m;
						// // this.alertService.success(''+respData.m, true);
						//  jQuery("#myModalAddsales").modal("show");
						//  jQuery("#myModaledit").modal("show");
						//   jQuery("#myModalalert").modal("show");
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
  


	EditSalesDetails(){
		this.ValidateDocStatus();
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
	UploadDocument()
	{
		this.submitted = true;
  this.DocUploadForm.controls['Image'].setValue(this.base64string);
		  // stop here if form is invalid
		  if (this.DocUploadForm.invalid) {
			  return;
		  }
		  
		  this.Docreq.AutoCode=this.f.SalesCode.value;
		  this.Docreq.DocumentTypeId=this.d.DocumentTypeId.value;
		  this.Docreq.DocumentName=this.d.DocumentName.value;
		  this.Docreq.DocumentDetails=this.d.DocumentDetails.value;
		  this.Docreq.FormId=this.value;
		  this.Docreq.Image=this.base64string;
		  this.Docreq.DocGuid='ViewSalesDetails';
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
	this.Docreq.AutoCode=this.f.SalesCode.value;
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
  
 
	
		GenerateSalesCode(value)
	{
		
		const result = this.wotransportationREdata.find( a => a.recylerid === parseInt(value) );
		console.log("WO Value result :"+result.RecyclerName);
		
		this.GenerateCodeNamereq.InputField=result.RecyclerName.substring(0,4) ;
		this.GenerateCodeNamereq.FormName='Sales';
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
							this.WOSalesDetailsForm.controls['SalesCode'].setValue(respData.Data);
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
		
		//SendMail(){
		  
			 //this.loading = true;
	      //  this.userService.SendMail(this.SendMailreq)
	         //  .pipe()
	         //   .subscribe(
	          //      (data:any) => {
			//			
	                  //  this.loading = false;
						//this.submitted = false;
	          //      },
	       //         error => {
	              //      this.alertService.error(error);
	                   // this.loading = false;
						
	     //          });
	//	}
		
		ValidateDocStatus()
{
	this.DocStatusReq.FormId=this.value;
	this.DocStatusReq.AutoCode=this.f.SalesCode.value;
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
						 this.AddUpdateDeleteWOSalesDetails();
					}
					else
					{
						this.AlertMessage=this.DocStatusData;
					}
					
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
	

DeliveryDateEqualToUnloadingDate()
{
	this.WOSalesDetailsForm.controls['UnloadingDate'].setValue(this.f.DeliveryDate.value);
}


GetTranspoterId(value)
{

	this.GetDeliveryDateByTransporterIdreq.TransporterId=value;
this.GetDeliveryDateByTransporterId();
}


GetDeliveryDateByTransporterId()
{

 this.loading = true;
	        this.userService.GetDeliveryDateByTransporterId(this.GetDeliveryDateByTransporterIdreq)
	           .pipe()
	            .subscribe(
	                (data:any) => {
						var respData=data;
						if(respData.s == 1)
						{

							if(this.wosalesdetialsreq.Operation ==1)
							{
							this.WorkOrderDataForSales=respData.WorkOrderData;
							var Dates= this.datepipe.transform(respData.Data, 'yyyy-MM-dd');
							this.WOSalesDetailsForm.controls['DeliveryDate'].setValue(Dates);
							this.WOSalesDetailsForm.controls['UnloadingDate'].setValue(Dates); 
							//this.alertService.success(''+ respData.m, true);
							}
							else
							{
								this.WorkOrderDataForSales=respData.WorkOrderData;
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
