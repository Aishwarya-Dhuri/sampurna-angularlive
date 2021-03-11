import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService ,ExcelService} from '../_services';

import { DatePipe } from '@angular/common'

declare var jQuery:any;
@Component({
  selector: 'app-view-bills',
  templateUrl: './view-bills.component.html',
  styleUrls: ['./view-bills.component.css']
})
export class ViewBillsComponent implements OnInit {
	public UserId;
	public wobillsdetailsreq = {WorkOrderItemId:0,WorkOrderId:0, WOBillId: 0, WOSalesId: '', InvoiceCode:'', InvoiceNumber:'',InvoiceDate:'', Quantity:0, Rate:0, MaterialType:'', GSTamount:0, Totalamount:0, BillDate:'', BillType:'', BillSubType:'', Comments:'', PerformBy:'', Operation:0, CoProcessingCertificate:'', CoProcessingCertificateFile:null, WeightConfirmation:'',WeightConfirmationFile:null, BillCopy:'',BillCopyFile:null,ManufacturerId:0,AggregatorId:0,CollectionPurchaseId:'',TransporterId:0,RecyclerId:0,WOTransporterId:''};
	public wobillsdetailsdata;
	public InvoiceDataByBillType;
	public AlertMessage;
	public ViewDocumentReq;
	public finalTotalAmount;
	public InvoiceDate;
	public RateValue;
	public DispalayCreationDate;
	public UDValidation;
	public Quantity;
	public Transportdata;
	public Docreq = {DocumentId :0, FormId :0 ,DocumentTypeId :0 , DocumentName  :'' ,Image  :'' , DocumentDetails :'', UserId :'', Option :'', DocGuid :'ViewBills', AutoCode :''};
    public DocumentData;
	 public DocStatusReq={ FormId:0,AutoCode:''};
	public DocStatusData;
	//Sales Data
	public wosalesdetialsreq = {WOSalesId:0, WOTransporterId:0, QuantityReceived:0,ProcessingCharges:0, DeliveryDate:'',UnloadingDate:'',GSTNo:'',MaterialValue:0, NetAmount:0,Comments:'', PerformBy:'', Operation:0 ,SalesCode:''};
	public WOSalesDetailsdata;
	public REdata;
	public SearchBillReq={TextToSearch:'',InvoiceNumber:0}
	public WOItemsreq = {WorkOrderItemId:0, WorkOrderId:0, StateId:0, CityId:0, SuburbID:0, ExpiryDate:'',WasteMaterialId:0, WasteMaterialFormid:0,Quantity:0,FreightRate:0, MaterialUnitId:0, Rate:0, GSTRate:0, OnActualorFreight:false, Timeline:'', Comments:'', PerformBy:'', Operation:0 , TotalValue:0, FreightAmount:0};
	public WOItemsdata;
	DocUploadForm : FormGroup;
public MFData;
	wobillsdetailsForm:FormGroup;
	SearchBill:FormGroup;
	public wotransportationCPdata;
	 submitted = false;
	loading = false;
	successmsg = false;
	public GST;
	SalesDropdownSettings={};
	CPDropDownSettings={};
	TransporterDropdownSettings={};
	//Prefill date display 
	public DispalayDate;
	public DispalayDate1;
	public aggregatordata;
	public wotransportationdata;
	OldCPC:any;
	OldWC:any;
	OldBC:any;
	base64string:any;
	base64string1:any;
	base64string2:any;
	base64string3:any;
	public ShoDebitCreditContentMF:boolean=false;
	public ShoDebitCreditContentAG:boolean=false;
	public ShoDebitCreditContentTR:boolean=false;
	public ShoDebitCreditContentRC:boolean=false;
	public HideShowInvoiceDropdown:boolean=false;
	public ShowClientBillData :boolean=false;
	public ShowCPBillData :boolean=false;
	public ShowREBillData :boolean=false;
	public ShowTRBillData :boolean=false;
	public InvoiceData;
public WorkOrdersdata;
	public CPCValidation:boolean=true;
	public WCValidation:boolean=true;
	public BCValidation:boolean=true;
	public ProccessingRate;
	public SalesRate;
	public showCPC:boolean=false;
	public showWC:boolean=false;
	public TodayDateC ;
	public saldocstatus:boolean=false;
	errormsg:any;
	public value ;
	public DocData;
	AvoidPrint=true;

  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,public datepipe: DatePipe,private router: Router,private excelService:ExcelService)
  {
		this.Getwobillsdetails();
		this.FetchInvoiceNo();
		

  }

  ngOnInit() {
	this.UDValidation=this.datepipe.transform(Date.now(), 'yyyy-MM-dd');

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
	  this.AvoidPrint=true;

	   //this.nav.show();
	    this.wobillsdetailsForm = this.formBuilder.group({
			WOSalesId: [''],
			WorkOrderId:[0],
			WorkOrderItemId:[''],
            InvoiceCode: ['', Validators.required],
            InvoiceNumber: ['', Validators.required],
            Quantity: ['', Validators.required],
            Rate: ['', Validators.required],
            MaterialType: [''],
            GSTamount: ['', Validators.required],
            Totalamount: ['', Validators.required],
            BillDate: ['', Validators.required],
            BillType: ['', Validators.required],
            BillSubType: ['', Validators.required],
            Comments: [''],
			CoProcessingCertificate:[''],
			WeightConfirmation:[''],
			BillCopy:[''],
			InvoiceDate:['', Validators.required],
			ManufacturerId:[0],
			AggregatorId:[0],
			CollectionPurchaseId:[''],
			RecyclerId:[0],
			TransporterId:[0],
			WOTransporterId:['']
			            
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
		this.SearchBill=this.formBuilder.group({
			TextToSearch:[''],
			InvoiceNumber:['0']
		});		

		this.SalesDropdownSettings = {
			singleSelection: false,
			idField: 'WOSalesId',
			textField: 'SalesCode',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
		};

		this.CPDropDownSettings={
			singleSelection: false,
			idField: 'CollectionPurchaseId',
			textField: 'CollectionPurchaseCode',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
		};

		this.TransporterDropdownSettings={
			singleSelection: false,
			idField: 'WOTransporterId',
			textField: 'TrasporterCode',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
		};
		
		
  }





getDocumentName(value){

if(this.f.BillType.value=='Client Bill' && value=='Debit Note')
{
 this.value=17;
 this.HideShowInvoiceDropdown=true;
 this. GetDocTypesByFormId(this.value);
 this.DocUploadForm.controls['DocumentTypeId'].setValue(0);
}
else if(this.f.BillType.value=='Client Bill' && value=='Credit Note')
{
this.value=16;
this.HideShowInvoiceDropdown=true;
this. GetDocTypesByFormId(this.value);
this.DocUploadForm.controls['DocumentTypeId'].setValue(0);

}
else if(this.f.BillType.value=='Client Bill' && value=='Invoices')
{
this.value=15;
this.HideShowInvoiceDropdown=false;
this. GetDocTypesByFormId(this.value);
this.DocUploadForm.controls['DocumentTypeId'].setValue(0);

}
else if(this.f.BillType.value=='Collection/Purchase Bill' && value=='Debit Note')
{
 this.value=20;
 this.HideShowInvoiceDropdown=true;
 this. GetDocTypesByFormId(this.value);
 this.DocUploadForm.controls['DocumentTypeId'].setValue(0);

}
else if(this.f.BillType.value=='Collection/Purchase Bill' && value=='Credit Note')
{
this.value=19;
this.HideShowInvoiceDropdown=true;
this. GetDocTypesByFormId(this.value);
this.DocUploadForm.controls['DocumentTypeId'].setValue(0);

}
else if(this.f.BillType.value=='Collection/Purchase Bill' && value=='Invoices')
{
this.value=18;
this.HideShowInvoiceDropdown=false;
this. GetDocTypesByFormId(this.value);
this.DocUploadForm.controls['DocumentTypeId'].setValue(0);

}
else if(this.f.BillType.value=='Transporter Bill' && value=='Debit Note')
{
 this.value=23;
 this.HideShowInvoiceDropdown=true;
 this. GetDocTypesByFormId(this.value);
 this.DocUploadForm.controls['DocumentTypeId'].setValue(0);

}
else if(this.f.BillType.value=='Transporter Bill' && value=='Credit Note')
{
this.value=22;
this.HideShowInvoiceDropdown=true;
this. GetDocTypesByFormId(this.value);
this.DocUploadForm.controls['DocumentTypeId'].setValue(0);

}
else if(this.f.BillType.value=='Transporter Bill' && value=='Invoices')
{
this.value=21;
this.HideShowInvoiceDropdown=false;
this. GetDocTypesByFormId(this.value);
this.DocUploadForm.controls['DocumentTypeId'].setValue(0);

}
else if(this.f.BillType.value=='Recycler Sales Bill' && value=='Debit Note')
{
 this.value=26;
 this.HideShowInvoiceDropdown=true;
 this. GetDocTypesByFormId(this.value);
 this.DocUploadForm.controls['DocumentTypeId'].setValue(0);

}
else if(this.f.BillType.value=='Recycler Sales Bill' && value=='Credit Note')
{
this.value=25;
this.HideShowInvoiceDropdown=true;
this. GetDocTypesByFormId(this.value);
this.DocUploadForm.controls['DocumentTypeId'].setValue(0);

}
else if(this.f.BillType.value=='Recycler Sales Bill' && value=='Invoices')
{
this.value=24;
this.HideShowInvoiceDropdown=false;
this. GetDocTypesByFormId(this.value);
this.DocUploadForm.controls['DocumentTypeId'].setValue(0);

}
else if(this.f.BillType.value=='Recycler Processing Bill' && value=='Debit Note')
{
 this.value=29;
 this.HideShowInvoiceDropdown=true;
 this. GetDocTypesByFormId(this.value);
 this.DocUploadForm.controls['DocumentTypeId'].setValue(0);

}
else if(this.f.BillType.value=='Recycler Processing Bill' && value=='Credit Note')
{
this.value=28;
this.HideShowInvoiceDropdown=true;
this. GetDocTypesByFormId(this.value);
this.DocUploadForm.controls['DocumentTypeId'].setValue(0);

}
else if(this.f.BillType.value=='Recycler Processing Bill' && value=='Invoices')
{
this.value=27;
this.HideShowInvoiceDropdown=false;
this. GetDocTypesByFormId(this.value);
this.DocUploadForm.controls['DocumentTypeId'].setValue(0);

}

}





  
	print() {
		
		// window.print();
		this.AvoidPrint=false;
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
this.excelService.exportAsExcelFile(this.wobillsdetailsdata, 'Bills Report');
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
	
	SelectedBillType(value)
	{
		if(value == "Client Bill")
		{
			this.showCPC=true;
			this.showWC=true;
			
		}
		else if (value == "Recycler Processing Bill")
		{
			this.showCPC=true;
			this.showWC=false;
			
		}
		else
		{
			this.showCPC=false;
			this.showWC=false;
		}
		this.GetGenerateCode(value.substring(0,4))
	}
	
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
						 //  this.WoItemsDataFinal=respData.Data;
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
	/* Start Generate code*/
		GetGenerateCode(value)
		{
		  
			this.loading = true;
	        this.userService.GetGenerateCodeName({InputField:value,FormName:'Bills'})
	           .pipe()
	            .subscribe(
	                (data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							this.wobillsdetailsForm.controls['InvoiceCode'].setValue(respData.Data);
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
		
		checksalesdocstatus(value)
		{
			this.loading = true;
			this.userService.CheckSalesDocStatus({WOSalesId:value})
			   .pipe()
				.subscribe(
					(data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							 this.saldocstatus=false;
							
						}
						else
						{
							this.saldocstatus=true;
							this.errormsg=respData.m;							
						} 
						this.loading = false;
						this.submitted = false;
					},
					error => {
						this.alertService.error(error);
						this.loading = false;
						
					});
		}
		
		/*End Generate code*/
  
  onSubmit() {
        this.submitted = true;
		if(this.f.BillType.value=='Client Bill')
	  {
				if(this.f.WorkOrderId.value==null && this.f.WorkOrderItemId.value==null && this.f.ManufacturerId.value==null && this.f.WOSalesId.value==null && this.f.BillSubType.value=='Invoices' )
				{
					this.wobillsdetailsForm.controls['WorkOrderId'].setErrors({required:true});
					this.wobillsdetailsForm.controls['WorkOrderItemId'].setErrors({required:true});
					this.wobillsdetailsForm.controls['ManufacturerId'].setErrors({required:true});
					this.wobillsdetailsForm.controls['WOSalesId'].setErrors({required:true});
				}
				else if(this.f.ManufacturerId.value==null && this.f.BillSubType.value!='Invoices')
				{
					this.wobillsdetailsForm.controls['ManufacturerId'].setErrors({required:true});
				}
				else if(this.f.ManufacturerId.value==null && this.f.BillSubType.value=='Invoices')
				{
					this.wobillsdetailsForm.controls['ManufacturerId'].setErrors({required:true});
				}
				else if(this.f.WorkOrderId.value==null && this.f.BillSubType.value=='Invoices')
				{
					this.wobillsdetailsForm.controls['WorkOrderId'].setErrors({required:true});
				}
				else if(this.f.WorkOrderItemId.value==null && this.f.BillSubType.value=='Invoices')
				{
					this.wobillsdetailsForm.controls['WorkOrderItemId'].setErrors({required:true});
				}
				else if(this.f.WOSalesId.value==null && this.f.BillSubType.value=='Invoices')
				{
					this.wobillsdetailsForm.controls['WOSalesId'].setErrors({required:true});
				}
		else
		{
	  this.wobillsdetailsreq.WorkOrderId=this.f.WorkOrderId.value;
	  this.wobillsdetailsreq.WorkOrderItemId=this.f.WorkOrderItemId.value;
	  this.wobillsdetailsreq.ManufacturerId=this.f.ManufacturerId.value;
	  this.wobillsdetailsreq.WOSalesId=this.f.WOSalesId.value;
	  }
	}
	  else
	  {
		this.wobillsdetailsreq.WorkOrderId=0;
		this.wobillsdetailsreq.WorkOrderItemId=0;
		this.wobillsdetailsreq.ManufacturerId=0;
		this.wobillsdetailsreq.WOSalesId='';
	  }

		if(this.f.BillType.value=='Collection/Purchase Bill')
	  {
		if(this.f.AggregatorId.value==null && this.f.CollectionPurchaseId.value==null && this.f.BillSubType.value=='Invoices')
		{
			this.wobillsdetailsForm.controls['AggregatorId'].setErrors({required:true});
			this.wobillsdetailsForm.controls['CollectionPurchaseId'].setErrors({required:true});			
		}
		else if(this.f.AggregatorId.value==null && this.f.BillSubType.value!='Invoices')
		{
			this.wobillsdetailsForm.controls['AggregatorId'].setErrors({required:true});
		}
		else if(this.f.AggregatorId.value==null && this.f.BillSubType.value=='Invoices')
		{
			this.wobillsdetailsForm.controls['AggregatorId'].setErrors({required:true});
		}
		else if(this.f.CollectionPurchaseId.value==null && this.f.BillSubType.value=='Invoices')
		{
			this.wobillsdetailsForm.controls['CollectionPurchaseId'].setErrors({required:true});
		}		
		else
		{
	  this.wobillsdetailsreq.AggregatorId=this.f.AggregatorId.value;
	  this.wobillsdetailsreq.CollectionPurchaseId=this.f.CollectionPurchaseId.value;	  
	  }
	}
	  else
	  {
		this.wobillsdetailsreq.AggregatorId=0;
		this.wobillsdetailsreq.CollectionPurchaseId='';
	  }

	  if(this.f.BillType.value=='Transporter Bill')
	  {
		if(this.f.TransporterId.value==null && this.f.WOTransporterId.value==null && this.f.BillSubType.value=='Invoices')
		{
			this.wobillsdetailsForm.controls['TransporterId'].setErrors({required:true});
			this.wobillsdetailsForm.controls['WOTransporterId'].setErrors({required:true});			
		}
		else if(this.f.TransporterId.value==null && this.f.BillSubType.value=='Invoices' )
		{
			this.wobillsdetailsForm.controls['TransporterId'].setErrors({required:true});
		}
		else if(this.f.TransporterId.value==null && this.f.BillSubType.value!='Invoices' )
		{
			this.wobillsdetailsForm.controls['TransporterId'].setErrors({required:true});
		}
		else if(this.f.WOTransporterId.value==null && this.f.BillSubType.value=='Invoices')
		{
			this.wobillsdetailsForm.controls['WOTransporterId'].setErrors({required:true});
		}		
		else
		{
	  this.wobillsdetailsreq.TransporterId=this.f.TransporterId.value;
	  this.wobillsdetailsreq.WOTransporterId=this.f.WOTransporterId.value;	  
	  }
	}
	  else
	  {
		this.wobillsdetailsreq.TransporterId=0;
		this.wobillsdetailsreq.WOTransporterId='';
	  }

	  
	  if(this.f.BillType.value=='Recycler Sales Bill' ||  this.f.BillType.value=='Recycler Processing Bill' )
	  {
		if(this.f.RecyclerId.value==null && this.f.WOSalesId.value==null && this.f.BillSubType.value=='Invoices')
		{
			this.wobillsdetailsForm.controls['RecyclerId'].setErrors({required:true});
			this.wobillsdetailsForm.controls['WOSalesId'].setErrors({required:true});			
		}
		else if(this.f.RecyclerId.value==null && this.f.BillSubType.value=='Invoices')
		{
			this.wobillsdetailsForm.controls['RecyclerId'].setErrors({required:true});
		}
		else if(this.f.RecyclerId.value==null && this.f.BillSubType.value!='Invoices')
		{
			this.wobillsdetailsForm.controls['RecyclerId'].setErrors({required:true});
		}
		else if(this.f.WOSalesId.value==null && this.f.BillSubType.value=='Invoices')
		{
			this.wobillsdetailsForm.controls['WOSalesId'].setErrors({required:true});
		}		
		else
		{
	  this.wobillsdetailsreq.RecyclerId=this.f.RecyclerId.value;
	 this.wobillsdetailsreq.WOSalesId=this.f.WOSalesId.value;	
		}  
	  }
	  else
	  {
		this.wobillsdetailsreq.RecyclerId=0;
		this.wobillsdetailsreq.WOSalesId='';
	  }

	
        // stop here if form is invalid
        if (this.wobillsdetailsForm.invalid) {
            return;
        }
		
	  
	  this.wobillsdetailsreq.InvoiceCode=this.f.InvoiceCode.value;
	  this.wobillsdetailsreq.InvoiceNumber=this.f.InvoiceNumber.value;
	  this.wobillsdetailsreq.InvoiceDate=this.f.InvoiceDate.value;
	  this.wobillsdetailsreq.Quantity=this.f.Quantity.value;
	  this.wobillsdetailsreq.Rate=this.f.Rate.value;
	  this.wobillsdetailsreq.MaterialType=this.f.MaterialType.value;
	  this.wobillsdetailsreq.GSTamount=this.f.GSTamount.value;
	  this.wobillsdetailsreq.Totalamount=this.f.Totalamount.value;
	  this.wobillsdetailsreq.BillDate=this.TodayDateC;
	  this.wobillsdetailsreq.BillType=this.f.BillType.value;
	  this.wobillsdetailsreq.BillSubType=this.f.BillSubType.value;
	  this.wobillsdetailsreq.Comments=this.f.Comments.value;
	  this.wobillsdetailsreq.WOBillId=0;

	  

	  
	  
	  this.wobillsdetailsreq.PerformBy=localStorage.getItem('UserId');
	  this.wobillsdetailsreq.Operation=1;
	 
      this.ValidateDocStatus();
    }
	
	
	 ResetFrom()
	 {
		this.wobillsdetailsForm.reset();
		this.DocUploadForm.reset();

		this.successmsg = false;
		this.submitted =false;
		this.base64string=undefined;
		this.DocumentData=undefined;
		this.ShoDebitCreditContentMF=false;
		this.ShoDebitCreditContentAG=false;
		this.ShoDebitCreditContentRC=false;
		this.ShoDebitCreditContentTR=false;		
		this.ShowCPBillData=false;
		this.ShowClientBillData=false;
		this.ShowREBillData=false;
		this.ShowTRBillData=false;
	 }
	
  
   Getwobillsdetails(){
	  
		 this.loading = true;
        this.userService.wobillsdetailsCRUD(this.wobillsdetailsreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.wobillsdetailsdata=respData.Data;
						 this.aggregatordata=respData.AGData;
						 this.REdata=respData.RCData;
						 this.Transportdata=respData.TRData;
						//this.alertService.success(''+ respData.m, true);
						this.MFData=respData.MFData;
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

DropDownHideShow()
{

	this.wobillsdetailsForm.controls['BillDate'].setValue(this.TodayDateC);
	if(this.f.BillType.value=='Client Bill' )
	{
		if(this.f.BillSubType.value=='Debit Note' || this.f.BillSubType.value=='Credit Note' )
		{ 
		this.ShoDebitCreditContentMF=true;		
		this.ShoDebitCreditContentAG=false;
		this.ShoDebitCreditContentTR=false;
		this.ShoDebitCreditContentRC=false;
		this.ShowCPBillData=false;
		this.ShowClientBillData=false;
		this.ShowREBillData=false;
		this.ShowTRBillData=false;
		}
		else
		{
			this.ShoDebitCreditContentAG=false;
				this.ShoDebitCreditContentMF=false;			
				this.ShoDebitCreditContentTR=false;
				this.ShoDebitCreditContentRC=false;
		this.ShowClientBillData=true;
		this.ShowCPBillData=false;
		this.ShowREBillData=false;
		this.ShowTRBillData=false;
		}
	}	
	else if(this.f.BillType.value=='Collection/Purchase Bill' )
	{
		if(this.f.BillSubType.value=='Debit Note' || this.f.BillSubType.value=='Credit Note' )
		{ 
		this.ShoDebitCreditContentAG=true;
		this.ShoDebitCreditContentMF=false;		
		this.ShoDebitCreditContentTR=false;
		this.ShoDebitCreditContentRC=false;
		this.ShowCPBillData=false;
		this.ShowClientBillData=false;
		this.ShowREBillData=false;
		this.ShowTRBillData=false;
		}
		else
		{
			this.ShoDebitCreditContentAG=false;
				this.ShoDebitCreditContentMF=false;			
				this.ShoDebitCreditContentTR=false;
				this.ShoDebitCreditContentRC=false;
		this.ShowCPBillData=true;
		this.ShowClientBillData=false;
		this.ShowREBillData=false;
		this.ShowTRBillData=false;
		}
	}	
	else if(this.f.BillType.value=='Transporter Bill' )
	{
		if(this.f.BillSubType.value=='Debit Note' || this.f.BillSubType.value=='Credit Note' )
		{ 
		this.ShoDebitCreditContentTR=true;
		this.ShoDebitCreditContentMF=false;
		this.ShoDebitCreditContentAG=false;		
		this.ShoDebitCreditContentRC=false;
		this.ShowCPBillData=false;
		this.ShowClientBillData=false;
		this.ShowREBillData=false;
		this.ShowTRBillData=false;
		}
		else
		{
			this.ShoDebitCreditContentAG=false;
				this.ShoDebitCreditContentMF=false;			
				this.ShoDebitCreditContentTR=false;
				this.ShoDebitCreditContentRC=false;
		this.ShowCPBillData=false;
		this.ShowClientBillData=false;
		this.ShowREBillData=false;
		this.ShowTRBillData=true;
		}
	}	
	else if(this.f.BillType.value=='Recycler Sales Bill' ||  this.f.BillType.value=='Recycler Processing Bill' )
	{
		if(this.f.BillSubType.value=='Debit Note' || this.f.BillSubType.value=='Credit Note' )
		{ 
		this.ShoDebitCreditContentRC=true;
		this.ShoDebitCreditContentMF=false;
		this.ShoDebitCreditContentAG=false;
		this.ShoDebitCreditContentTR=false;
	
		this.ShowCPBillData=false;
		this.ShowClientBillData=false;
		this.ShowREBillData=false;
		this.ShowTRBillData=false;
		}
		else
		{
			this.ShoDebitCreditContentAG=false;
				this.ShoDebitCreditContentMF=false;			
				this.ShoDebitCreditContentTR=false;
				this.ShoDebitCreditContentRC=false;
		this.ShowCPBillData=false;
		this.ShowClientBillData=false;
		this.ShowREBillData=true;
		this.ShowTRBillData=false;
		}
	}	
	else
	{
		this.ShoDebitCreditContentMF=false;
		this.ShoDebitCreditContentAG=false;
		this.ShoDebitCreditContentTR=false;
		this.ShoDebitCreditContentRC=false;
		this.ShowCPBillData=false;
		this.ShowClientBillData=false;
		this.ShowREBillData=false;
		this.ShowTRBillData=false;
	}
}

	
	CalculateFinalAmount()
	{
		if(this.f.BillType.value=='Client Bill' && this.f.BillSubType.value=='Invoices')
		{
			this.finalTotalAmount=this.f.Quantity.value * this.f.Rate.value ;
			this.finalTotalAmount=this.finalTotalAmount+( this.finalTotalAmount * (this.f.GSTamount.value/100));
			this.wobillsdetailsForm.controls['Totalamount'].setValue(this.finalTotalAmount);
		}
		
		if(this.f.BillType.value=='Client Bill' && this.f.BillSubType.value=='Debit Note')
		{
			this.finalTotalAmount=this.f.Quantity.value * this.f.Rate.value ;
			this.finalTotalAmount=this.finalTotalAmount+( this.finalTotalAmount * (this.f.GSTamount.value/100));
			this.wobillsdetailsForm.controls['Totalamount'].setValue(this.finalTotalAmount);
		}
		if(this.f.BillType.value=='Client Bill' && this.f.BillSubType.value=='Credit Note')
		{
			this.finalTotalAmount=this.f.Quantity.value * this.f.Rate.value ;
			this.finalTotalAmount=this.finalTotalAmount+( this.finalTotalAmount * (this.f.GSTamount.value/100));
			this.wobillsdetailsForm.controls['Totalamount'].setValue(this.finalTotalAmount);
		}

		if(this.f.BillType.value=='Recycler Sales Bill' && this.f.BillSubType.value=='Invoices')
		{
			this.finalTotalAmount=this.f.Quantity.value * this.f.Rate.value ;
			this.finalTotalAmount=this.finalTotalAmount+( this.finalTotalAmount * (this.f.GSTamount.value/100));
			this.wobillsdetailsForm.controls['Totalamount'].setValue(this.finalTotalAmount);
		}
		
		if(this.f.BillType.value=='Recycler Sales Bill' && this.f.BillSubType.value=='Debit Note')
		{
			this.finalTotalAmount=this.f.Quantity.value * this.f.Rate.value ;
			this.finalTotalAmount=this.finalTotalAmount+( this.finalTotalAmount * (this.f.GSTamount.value/100));
			this.wobillsdetailsForm.controls['Totalamount'].setValue(this.finalTotalAmount);
		}
		if(this.f.BillType.value=='Recycler Sales Bill' && this.f.BillSubType.value=='Credit Note')
		{
			this.finalTotalAmount=this.f.Quantity.value * this.f.Rate.value ;
			this.finalTotalAmount=this.finalTotalAmount+( this.finalTotalAmount * (this.f.GSTamount.value/100));
			this.wobillsdetailsForm.controls['Totalamount'].setValue(this.finalTotalAmount);
		}

		if(this.f.BillType.value=='Recycler Processing Bill' && this.f.BillSubType.value=='Invoices')
		{
			this.finalTotalAmount=this.f.Quantity.value * this.f.Rate.value ;
			this.finalTotalAmount=this.finalTotalAmount+( this.finalTotalAmount * (this.f.GSTamount.value/100));
			this.wobillsdetailsForm.controls['Totalamount'].setValue(this.finalTotalAmount);
		}
		if(this.f.BillType.value=='Recycler Processing Bill' && this.f.BillSubType.value=='Debit Note')
		{
			this.finalTotalAmount=this.f.Quantity.value * this.f.Rate.value ;
			this.finalTotalAmount=this.finalTotalAmount+( this.finalTotalAmount * (this.f.GSTamount.value/100));
			this.wobillsdetailsForm.controls['Totalamount'].setValue(this.finalTotalAmount);
		}
		if(this.f.BillType.value=='Recycler Processing Bill' && this.f.BillSubType.value=='Credit Note')
		{
			this.finalTotalAmount=this.f.Quantity.value * this.f.Rate.value ;
			this.finalTotalAmount=this.finalTotalAmount+( this.finalTotalAmount * (this.f.GSTamount.value/100));
			this.wobillsdetailsForm.controls['Totalamount'].setValue(this.finalTotalAmount);
		}

		if(this.f.BillType.value=='Collection/Purchase Bill' && this.f.BillSubType.value=='Invoices')
		{
			this.finalTotalAmount=this.f.Quantity.value * this.f.Rate.value ;
			this.finalTotalAmount=this.finalTotalAmount+( this.finalTotalAmount * (this.f.GSTamount.value/100));
			this.wobillsdetailsForm.controls['Totalamount'].setValue(this.finalTotalAmount);
		}
		
		if(this.f.BillType.value=='Collection/Purchase Bill' && this.f.BillSubType.value=='Debit Note')
		{
			this.finalTotalAmount=this.f.Quantity.value * this.f.Rate.value ;
			this.finalTotalAmount=this.finalTotalAmount+( this.finalTotalAmount * (this.f.GSTamount.value/100));
			this.wobillsdetailsForm.controls['Totalamount'].setValue(this.finalTotalAmount);
		}
		if(this.f.BillType.value=='Collection/Purchase Bill' && this.f.BillSubType.value=='Credit Note')
		{
			this.finalTotalAmount=this.f.Quantity.value * this.f.Rate.value ;
			this.finalTotalAmount=this.finalTotalAmount+( this.finalTotalAmount * (this.f.GSTamount.value/100));
			this.wobillsdetailsForm.controls['Totalamount'].setValue(this.finalTotalAmount);
		}

		if(this.f.BillType.value=='Transporter Bill' && this.f.BillSubType.value=='Invoices')
		{
			this.finalTotalAmount=this.f.Quantity.value * this.f.Rate.value ;
			this.finalTotalAmount=this.finalTotalAmount+( this.finalTotalAmount * (this.f.GSTamount.value/100));
			this.wobillsdetailsForm.controls['Totalamount'].setValue(this.finalTotalAmount);
		}
		
		if(this.f.BillType.value=='Transporter Bill' && this.f.BillSubType.value=='Debit Note')
		{
			this.finalTotalAmount=this.f.Quantity.value * this.f.Rate.value ;
			this.finalTotalAmount=this.finalTotalAmount+( this.finalTotalAmount * (this.f.GSTamount.value/100));
			this.wobillsdetailsForm.controls['Totalamount'].setValue(this.finalTotalAmount);
		}
		if(this.f.BillType.value=='Transporter Bill' && this.f.BillSubType.value=='Credit Note')
		{
			this.finalTotalAmount=this.f.Quantity.value * this.f.Rate.value ;
			this.finalTotalAmount=this.finalTotalAmount+( this.finalTotalAmount * (this.f.GSTamount.value/100));
			this.wobillsdetailsForm.controls['Totalamount'].setValue(this.finalTotalAmount);
		}


	}
	
	CalculateAmountByQuantity(value)
	{
		var Quantity=value;
		var Rate=this.f.Rate.value;
		if(Quantity=='0' || Rate=='0' )
		{
		this.finalTotalAmount='0';
		}
		else
		{
			this.finalTotalAmount=Rate*Quantity;
		}
	}
	
	CalculateAmountByRate(value)
	{
		var Rate=value;
		var Quantity=this.f.Quantity.value;
		if(Quantity=='0' || Rate=='0' )
		{
		this.finalTotalAmount='0';
		}
		else
		{
			this.finalTotalAmount=Rate*Quantity;
		}
	}
	
	
	//Displaying sales data
	FetchSalesIdByWOI(value){
	  
		this.wobillsdetailsForm.controls['WOSalesId'].setValue('');
		 this.loading = true;
        this.userService.FetchSalesIdByWOI({WorkOrderItemId:value,RecyclerId:0})
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.WOSalesDetailsdata=respData.Data;
						// this.MFData=respData.MFData;
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
	


	FetchSalesIdByRC(value){
	  
		this.wobillsdetailsForm.controls['WOSalesId'].setValue('');
		 this.loading = true;
        this.userService.FetchSalesIdByWOI({WorkOrderItemId:0,RecyclerId:value})
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.WOSalesDetailsdata=respData.Data;
						// this.MFData=respData.MFData;
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

	
	get f() { return this.wobillsdetailsForm.controls; }
	get g() { return this.SearchBill.controls; }
	get d() { return this.DocUploadForm.controls; }

	EditwobillsdetailsData(WOSalesId,InvoiceCode,InvoiceNumber,Quantity,Rate,MaterialType,GSTamount,Totalamount,BillDate,BillType,BillSubType,Comments,WOBillId,CoProcessingCertificate,WeightConfirmation,BillCopy,InvoiceDate,ManufacturerId,WorkOrderId,WorkOrderItemId,CollectionPurchaseId,AggregatorId,TransporterId,WOTransporterId,RecyclerId)
	{
		

		this.successmsg = false;
		this.base64string1=null;
		this.base64string2=null;
		this.base64string3=null;
		
		
	//	this.wobillsdetailsForm.controls['WOSalesId'].setValue(WOSalesId);
		this.wobillsdetailsForm.controls['InvoiceCode'].setValue(InvoiceCode);
		this.wobillsdetailsForm.controls['InvoiceNumber'].setValue(InvoiceNumber);
	//	this.DispalayDate= InvoiceNumber;
	//	this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		
		if(CoProcessingCertificate!="" && CoProcessingCertificate!=undefined)
		{
			var FileName=CoProcessingCertificate.split('/');
			this.OldCPC=FileName[FileName.length-1];
		}
		if(WeightConfirmation!="" && WeightConfirmation!=undefined)
		{
			var FileName=WeightConfirmation.split('/');
			this.OldWC=FileName[FileName.length-1];
		}
		if(BillCopy!="" && BillCopy!=undefined)
		{
			var FileName=BillCopy.split('/');
			this.OldBC=FileName[FileName.length-1];
		}		


		this.DispalayCreationDate=BillDate;
	  this.DispalayCreationDate= this.datepipe.transform( this.DispalayCreationDate, 'yyyy-MM-dd');
	  this.wobillsdetailsreq.BillDate=this.DispalayCreationDate;
	  this.wobillsdetailsForm.controls['BillDate'].setValue(this.DispalayCreationDate);
		  var InvoiceDate1= this.datepipe.transform(InvoiceDate, 'yyyy-MM-dd');
		  this.wobillsdetailsForm.controls['InvoiceDate'].setValue(InvoiceDate1);
		this.wobillsdetailsForm.controls['Quantity'].setValue(Quantity);
		this.wobillsdetailsForm.controls['Rate'].setValue(Rate);
		this.wobillsdetailsForm.controls['MaterialType'].setValue(MaterialType);
		this.wobillsdetailsForm.controls['GSTamount'].setValue(GSTamount);
		this.wobillsdetailsForm.controls['Totalamount'].setValue(Totalamount);
		
		
		this.DispalayDate1= BillDate;
		this.DispalayDate1= this.datepipe.transform(this.DispalayDate1, 'yyyy-MM-dd');
		
		
		this.wobillsdetailsForm.controls['BillType'].setValue(BillType);
		this.wobillsdetailsForm.controls['BillSubType'].setValue(BillSubType);
		this.wobillsdetailsForm.controls['Comments'].setValue(Comments);
		
		
		if(this.f.BillType.value=='Client Bill' )
		{
			this.FetchWorkOrderbyManufacturerId(ManufacturerId);
			this.GetWorkorderItem(WorkOrderId);			
			this.FetchSalesIdByWOI(WorkOrderItemId);

			this.wobillsdetailsForm.controls['ManufacturerId'].setValue(ManufacturerId);
			this.wobillsdetailsForm.controls['WorkOrderId'].setValue(WorkOrderId);
			this.wobillsdetailsForm.controls['WorkOrderItemId'].setValue(WorkOrderItemId);
			if(this.f.BillSubType.value=='Debit Note' || this.f.BillSubType.value=='Credit Note' )
			{ 
			this.ShoDebitCreditContentMF=true;			
			this.ShoDebitCreditContentAG=false;
			this.ShoDebitCreditContentTR=false;
			this.ShoDebitCreditContentRC=false;
			this.ShowCPBillData=false;
			this.ShowClientBillData=false;
			this.ShowREBillData=false;
			this.ShowTRBillData=false;
			}
			else
			{
			this.ShowClientBillData=true;
			this.ShowCPBillData=false;
			this.ShowREBillData=false;
			this.ShowTRBillData=false;
			}
		}	
		else if(this.f.BillType.value=='Collection/Purchase Bill' )
		{
			this.FetchCollectionPurchaseByAGID(AggregatorId);

			this.wobillsdetailsForm.controls['AggregatorId'].setValue(AggregatorId);
			if(this.f.BillSubType.value=='Debit Note' || this.f.BillSubType.value=='Credit Note' )
			{ 
			this.ShoDebitCreditContentAG=true;
			this.ShoDebitCreditContentMF=false;			
			this.ShoDebitCreditContentTR=false;
			this.ShoDebitCreditContentRC=false;
			this.ShowCPBillData=false;
			this.ShowClientBillData=false;
			this.ShowREBillData=false;
			this.ShowTRBillData=false;
			}
			else
			{
				this.ShoDebitCreditContentAG=false;
				this.ShoDebitCreditContentMF=false;			
				this.ShoDebitCreditContentTR=false;
				this.ShoDebitCreditContentRC=false;
			this.ShowCPBillData=true;
			this.ShowClientBillData=false;
			this.ShowREBillData=false;
			this.ShowTRBillData=false;
			}
		}	
		else if(this.f.BillType.value=='Transporter Bill' )
		{
			this.FetchWOTRByTrasporter(TransporterId);

			this.wobillsdetailsForm.controls['TransporterId'].setValue(TransporterId);
			if(this.f.BillSubType.value=='Debit Note' || this.f.BillSubType.value=='Credit Note' )
			{ 
			this.ShoDebitCreditContentTR=true;
			this.ShoDebitCreditContentMF=false;
			this.ShoDebitCreditContentAG=false;		
			this.ShoDebitCreditContentRC=false;
			this.ShowCPBillData=false;
			this.ShowClientBillData=false;
			this.ShowREBillData=false;
			this.ShowTRBillData=false;
			}
			else
			{
				this.ShoDebitCreditContentAG=false;
				this.ShoDebitCreditContentMF=false;			
				this.ShoDebitCreditContentTR=false;
				this.ShoDebitCreditContentRC=false;
			this.ShowCPBillData=false;
			this.ShowClientBillData=false;
			this.ShowREBillData=false;
			this.ShowTRBillData=true;
			}
		}	
		else if(this.f.BillType.value=='Recycler Sales Bill' ||  this.f.BillType.value=='Recycler Processing Bill' )
		{
			this.FetchSalesIdByRC(RecyclerId);

			this.wobillsdetailsForm.controls['RecyclerId'].setValue(RecyclerId);
			if(this.f.BillSubType.value=='Debit Note' || this.f.BillSubType.value=='Credit Note' )
			{ 
			this.ShoDebitCreditContentRC=true;
			this.ShoDebitCreditContentMF=false;
			this.ShoDebitCreditContentAG=false;
			this.ShoDebitCreditContentTR=false;	
			this.ShowCPBillData=false;
			this.ShowClientBillData=false;
			this.ShowREBillData=false;
			this.ShowTRBillData=false;
			}
			else
			{
				this.ShoDebitCreditContentAG=false;
				this.ShoDebitCreditContentMF=false;			
				this.ShoDebitCreditContentTR=false;
				this.ShoDebitCreditContentRC=false;
			this.ShowCPBillData=false;
			this.ShowClientBillData=false;
			this.ShowREBillData=true;
			this.ShowTRBillData=false;
			}
		}	
		else
		{
			this.ShoDebitCreditContentMF=false;
			this.ShoDebitCreditContentAG=false;
			this.ShoDebitCreditContentTR=false;
			this.ShoDebitCreditContentRC=false;
			this.ShowCPBillData=false;
			this.ShowClientBillData=false;
			this.ShowREBillData=false;
			this.ShowTRBillData=false;
		}
		this.wobillsdetailsreq.RecyclerId=this.f.RecyclerId.value;
		this.wobillsdetailsreq.InvoiceDate=InvoiceDate1;
		this.wobillsdetailsreq.TransporterId=this.f.TransporterId.value;
		this.wobillsdetailsreq.AggregatorId=this.f.AggregatorId.value;
		this.wobillsdetailsreq.ManufacturerId=this.f.ManufacturerId.value;
		//this.wobillsdetailsreq.WOSalesId=this.f.WOSalesId.value;
		 this.wobillsdetailsreq.InvoiceCode=this.f.InvoiceCode.value;
	  this.wobillsdetailsreq.InvoiceNumber=this.f.InvoiceNumber.value;
	  this.wobillsdetailsreq.Quantity=this.f.Quantity.value;
	  this.wobillsdetailsreq.Rate=this.f.Rate.value;
	  this.wobillsdetailsreq.MaterialType=this.f.MaterialType.value;
	  this.wobillsdetailsreq.GSTamount=this.f.GSTamount.value;
	  this.wobillsdetailsreq.Totalamount=this.f.Totalamount.value;
	  this.wobillsdetailsreq.BillDate=this.DispalayCreationDate;
	  this.wobillsdetailsreq.BillType=this.f.BillType.value;
	  this.wobillsdetailsreq.BillSubType=this.f.BillSubType.value;
	  this.wobillsdetailsreq.Comments=this.f.Comments.value;
		 
	  this.wobillsdetailsreq.WOBillId=WOBillId;
	  this.wobillsdetailsreq.PerformBy=localStorage.getItem('UserId');
//SalesID nultiselect
if(this.f.BillType.value=='Recycler Sales Bill' ||  this.f.BillType.value=='Recycler Processing Bill' || this.f.BillType.value=='Client Bill' )
		{
	  this.wobillsdetailsreq.WOSalesId='';
	  if (WOSalesId.search(",") >= 0) {
		  var FocusProcessingType = WOSalesId.split(',');
		  var SelectedProcessingType = [];
		  for (var i = 0; i < FocusProcessingType.length; i++) {
			  for (var j = 0; j < this.WOSalesDetailsdata.length; j++) {
				  if (FocusProcessingType[i] == this.WOSalesDetailsdata[j].WOSalesId) {
					  SelectedProcessingType.push(this.WOSalesDetailsdata[j]);
				  }
			  }
		  }
		  console.log("test");
		  this.wobillsdetailsForm.controls['WOSalesId'].setValue(SelectedProcessingType);
		//this.wobillsdetailsreq.WOSalesId = WOSalesId;
	  }
	  else {
		  var SelectedProcessingType1 = [];
		  for (var j = 0; j < this.WOSalesDetailsdata.length; j++) {
			  if (WOSalesId == this.WOSalesDetailsdata[j].WOSalesId) {
				  SelectedProcessingType1.push(this.WOSalesDetailsdata[j]);
			  }
		  }
		  // SelectedProcessingType1.push(ProcessingTypeId);
		  console.log("test:" + WOSalesId);
		  this.wobillsdetailsForm.controls['WOSalesId'].setValue(SelectedProcessingType1);
		  this.wobillsdetailsreq.WOSalesId = WOSalesId;
	  }
	}
 else
	 {
		this.wobillsdetailsreq.WOSalesId ='';
 }


	//Collection Purchase multiselect
	if(this.f.BillType.value=='Collection/Purchase Bill' )
		{
	  this.wobillsdetailsreq.CollectionPurchaseId='';
	  if (CollectionPurchaseId.search(",") >= 0) {
		  var FocusProcessingType = CollectionPurchaseId.split(',');
		  var SelectedProcessingType = [];
		  for (var i = 0; i < FocusProcessingType.length; i++) {
			  for (var j = 0; j < this.wotransportationCPdata.length; j++) {
				  if (FocusProcessingType[i] == this.wotransportationCPdata[j].CollectionPurchaseId) {
					  SelectedProcessingType.push(this.wotransportationCPdata[j]);
				  }
			  }
		  }
		  console.log("test");
		  this.wobillsdetailsForm.controls['CollectionPurchaseId'].setValue(SelectedProcessingType);
		  this.wobillsdetailsreq.CollectionPurchaseId = CollectionPurchaseId;
	  }
	  else {
		  var SelectedProcessingType1 = [];
		  for (var j = 0; j < this.wotransportationCPdata.length; j++) {
			  if (CollectionPurchaseId == this.wotransportationCPdata[j].CollectionPurchaseId) {
				  SelectedProcessingType1.push(this.wotransportationCPdata[j]);
			  }
		  }
		  // SelectedProcessingType1.push(ProcessingTypeId);
		  console.log("test:" + CollectionPurchaseId);
		  this.wobillsdetailsForm.controls['CollectionPurchaseId'].setValue(SelectedProcessingType1);
		  this.wobillsdetailsreq.CollectionPurchaseId = CollectionPurchaseId;
	  }
	}
	else
	{
		this.wobillsdetailsreq.CollectionPurchaseId = '';
	}

	if(this.f.BillType.value=='Transporter Bill' )
	{
		this.wobillsdetailsreq.WOTransporterId='';
		if (WOTransporterId.search(",") >= 0) {
			var FocusProcessingType = WOTransporterId.split(',');
			var SelectedProcessingType = [];
			for (var i = 0; i < FocusProcessingType.length; i++) {
				for (var j = 0; j < this.wotransportationdata.length; j++) {
					if (FocusProcessingType[i] == this.wotransportationdata[j].WOTransporterId) {
						SelectedProcessingType.push(this.wotransportationdata[j]);
					}
				}
			}
			console.log("test");
			this.wobillsdetailsForm.controls['WOTransporterId'].setValue(SelectedProcessingType);
			this.wobillsdetailsreq.WOTransporterId = WOTransporterId;
		}
		else {
			var SelectedProcessingType1 = [];
			for (var j = 0; j < this.wotransportationdata.length; j++) {
				if (WOTransporterId == this.wotransportationdata[j].WOTransporterId) {
					SelectedProcessingType1.push(this.wotransportationdata[j]);
				}
			}
			// SelectedProcessingType1.push(ProcessingTypeId);
			console.log("test:" + WOTransporterId);
			this.wobillsdetailsForm.controls['WOTransporterId'].setValue(SelectedProcessingType1);
			this.wobillsdetailsreq.WOTransporterId = WOTransporterId;
		}
	}
	else
	{
		this.wobillsdetailsreq.WOTransporterId = ''
	}

	  this.wobillsdetailsreq.Operation=2;


	  if(this.f.BillType.value=='Client Bill' && this.f.BillSubType.value=='Debit Note')
	  {
	   this.value=17;
	   this.HideShowInvoiceDropdown=true;
	   this. GetDocTypesByFormId(this.value);
	  }
	  else if(this.f.BillType.value=='Client Bill' && this.f.BillSubType.value=='Credit Note')
	  {
	  this.value=16;
	  this.HideShowInvoiceDropdown=true;
	  this. GetDocTypesByFormId(this.value);
	  }
	  else if(this.f.BillType.value=='Client Bill' && this.f.BillSubType.value=='Invoices')
	  {
	  this.value=15;
	  this.HideShowInvoiceDropdown=false;
	  this. GetDocTypesByFormId(this.value);
	  }
	  else if(this.f.BillType.value=='Collection/Purchase Bill' && this.f.BillSubType.value=='Debit Note')
	  {
	   this.value=20;
	   this.HideShowInvoiceDropdown=true;
	   this. GetDocTypesByFormId(this.value);
	  }
	  else if(this.f.BillType.value=='Collection/Purchase Bill' && this.f.BillSubType.value=='Credit Note')
	  {
	  this.value=19;
	  this.HideShowInvoiceDropdown=true;
	  this. GetDocTypesByFormId(this.value);
	  }
	  else if(this.f.BillType.value=='Collection/Purchase Bill' && this.f.BillSubType.value=='Invoices')
	  {
	  this.value=18;
	  this.HideShowInvoiceDropdown=false;
	  this. GetDocTypesByFormId(this.value);
	  }
	  else if(this.f.BillType.value=='Transporter Bill' && this.f.BillSubType.value=='Debit Note')
	  {
	   this.value=23;
	   this.HideShowInvoiceDropdown=true;
	   this. GetDocTypesByFormId(this.value);
	  }
	  else if(this.f.BillType.value=='Transporter Bill' && this.f.BillSubType.value=='Credit Note')
	  {
	  this.value=22;
	  this.HideShowInvoiceDropdown=true;
	  this. GetDocTypesByFormId(this.value);
	  }
	  else if(this.f.BillType.value=='Transporter Bill' && this.f.BillSubType.value=='Invoices')
	  {
	  this.value=21;
	  this.HideShowInvoiceDropdown=false;
	  this. GetDocTypesByFormId(this.value);
	  }
	  else if(this.f.BillType.value=='Recycler Sales Bill' && this.f.BillSubType.value=='Debit Note')
	  {
	   this.value=26;
	   this.HideShowInvoiceDropdown=true;
	   this. GetDocTypesByFormId(this.value);
	  }
	  else if(this.f.BillType.value=='Recycler Sales Bill' && this.f.BillsubType.value=='Credit Note')
	  {
	  this.value=25;
	  this.HideShowInvoiceDropdown=true;
	  this. GetDocTypesByFormId(this.value);
	  }
	  else if(this.f.BillType.value=='Recycler Sales Bill' && this.f.BillSubType.value=='Invoices')
	  {
	  this.value=24;
	  this.HideShowInvoiceDropdown=false;
	  this. GetDocTypesByFormId(this.value);
	  }
	  else if(this.f.BillType.value=='Recycler Processing Bill' && this.f.BillSubType.value=='Debit Note')
	  {
	   this.value=29;
	   this.HideShowInvoiceDropdown=true;
	   this. GetDocTypesByFormId(this.value);
	  }
	  else if(this.f.BillType.value=='Recycler Processing Bill' && this.f.BillSubType.value=='Credit Note')
	  {
	  this.value=28;
	  this.HideShowInvoiceDropdown=true;
	  this. GetDocTypesByFormId(this.value);
	  }
	  else if(this.f.BillType.value=='Recycler Processing Bill' && this.f.BillSubType.value=='Invoices')
	  {
	  this.value=27;
	  this.HideShowInvoiceDropdown=false;
	  this. GetDocTypesByFormId(this.value);
	  }




	  this.ViewDocument();
	}
	
	
	DeletewobillsdetailsData(WOSalesId,InvoiceCode,InvoiceNumber,Quantity,Rate,MaterialType,GSTamount,Totalamount,BillDate,BillType,BillSubType,Comments,WOBillId,CoProcessingCertificate,WeightConfirmation,BillCopy,InvoiceDate,ManufacturerId,WorkOrderId,WorkOrderItemId,CollectionPurchaseId,AggregatorId,TransporterId,WOTransporterId,RecyclerId)
	{
		this.successmsg = false;
		this.base64string1=null;
		this.base64string2=null;
		this.base64string3=null;
		this.FetchSalesIdByWOI(WorkOrderItemId);
		this.FetchWorkOrderbyManufacturerId(ManufacturerId);
		this.GetWorkorderItem(WorkOrderId);
	//	this.wobillsdetailsForm.controls['WOSalesId'].setValue(WOSalesId);
		this.wobillsdetailsForm.controls['InvoiceCode'].setValue(InvoiceCode);
		this.wobillsdetailsForm.controls['InvoiceNumber'].setValue(InvoiceNumber);
		this.DispalayDate= InvoiceNumber
		this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		
		if(CoProcessingCertificate!="" && CoProcessingCertificate!=undefined)
		{
			var FileName=CoProcessingCertificate.split('/');
			this.OldCPC=FileName[FileName.length-1];
		}
		if(WeightConfirmation!="" && WeightConfirmation!=undefined)
		{
			var FileName=WeightConfirmation.split('/');
			this.OldWC=FileName[FileName.length-1];
		}
		if(BillCopy!="" && BillCopy!=undefined)
		{
			var FileName=BillCopy.split('/');
			this.OldBC=FileName[FileName.length-1];
		}		


		this.DispalayCreationDate=BillDate;
	  this.DispalayCreationDate= this.datepipe.transform( this.DispalayCreationDate, 'yyyy-MM-dd');
	  this.wobillsdetailsreq.BillDate=this.DispalayCreationDate;
	  this.wobillsdetailsForm.controls['BillDate'].setValue(this.DispalayCreationDate);
		  var InvoiceDate1= this.datepipe.transform(InvoiceDate, 'yyyy-MM-dd');
		  this.wobillsdetailsForm.controls['InvoiceDate'].setValue(InvoiceDate1);
		this.wobillsdetailsForm.controls['Quantity'].setValue(Quantity);
		this.wobillsdetailsForm.controls['Rate'].setValue(Rate);
		this.wobillsdetailsForm.controls['MaterialType'].setValue(MaterialType);
		this.wobillsdetailsForm.controls['GSTamount'].setValue(GSTamount);
		this.wobillsdetailsForm.controls['Totalamount'].setValue(Totalamount);
		this.wobillsdetailsForm.controls['TransporterId'].setValue(TransporterId);
		this.wobillsdetailsForm.controls['AggregatorId'].setValue(AggregatorId);
		this.DispalayDate1= BillDate;
		this.DispalayDate1= this.datepipe.transform(this.DispalayDate1, 'yyyy-MM-dd');
		this.wobillsdetailsForm.controls['RecyclerId'].setValue(RecyclerId);
		this.wobillsdetailsForm.controls['ManufacturerId'].setValue(ManufacturerId);
		this.wobillsdetailsForm.controls['BillType'].setValue(BillType);
		this.wobillsdetailsForm.controls['BillSubType'].setValue(BillSubType);
		this.wobillsdetailsForm.controls['Comments'].setValue(Comments);
		this.wobillsdetailsForm.controls['WorkOrderId'].setValue(WorkOrderId);
		this.wobillsdetailsForm.controls['WorkOrderItemId'].setValue(WorkOrderItemId);
		
		if(this.f.BillType.value=='Client Bill' )
		{
			this.ShowClientBillData=true;
			this.ShowCPBillData=false;
			this.ShowREBillData=false;
			this.ShowTRBillData=false;
		}	
		else if(this.f.BillType.value=='Collection/Purchase Bill' )
		{
			this.ShowCPBillData=true;
			this.ShowClientBillData=false;
			this.ShowREBillData=false;
			this.ShowTRBillData=false;
		}	
		else if(this.f.BillType.value=='Transporter Bill' )
		{
			this.ShowCPBillData=false;
			this.ShowClientBillData=false;
			this.ShowREBillData=false;
			this.ShowTRBillData=true;
		}	
		else if(this.f.BillType.value=='Recycler Sales Bill' ||  this.f.BillType.value=='Recycler Processing Bill' )
		{
			this.FetchSalesIdByRC(RecyclerId);
			this.ShowCPBillData=false;
			this.ShowClientBillData=false;
			this.ShowREBillData=true;
			this.ShowTRBillData=false;
		}	
		else
		{
			this.ShowCPBillData=false;
			this.ShowClientBillData=false;
			this.ShowREBillData=false;
			this.ShowTRBillData=false;
		}
		this.wobillsdetailsreq.RecyclerId=RecyclerId;
		this.wobillsdetailsreq.InvoiceDate=InvoiceDate1;
		this.wobillsdetailsreq.TransporterId=this.f.TransporterId.value;
		this.wobillsdetailsreq.AggregatorId=this.f.AggregatorId.value;
		this.wobillsdetailsreq.ManufacturerId=this.f.ManufacturerId.value;
		//this.wobillsdetailsreq.WOSalesId=this.f.WOSalesId.value;
		 this.wobillsdetailsreq.InvoiceCode=this.f.InvoiceCode.value;
	  this.wobillsdetailsreq.InvoiceNumber=this.f.InvoiceNumber.value;
	  this.wobillsdetailsreq.Quantity=this.f.Quantity.value;
	  this.wobillsdetailsreq.Rate=this.f.Rate.value;
	  this.wobillsdetailsreq.MaterialType=this.f.MaterialType.value;
	  this.wobillsdetailsreq.GSTamount=this.f.GSTamount.value;
	  this.wobillsdetailsreq.Totalamount=this.f.Totalamount.value;
	  this.wobillsdetailsreq.BillDate=this.DispalayCreationDate;
	  this.wobillsdetailsreq.BillType=this.f.BillType.value;
	  this.wobillsdetailsreq.BillSubType=this.f.BillSubType.value;
	  this.wobillsdetailsreq.Comments=this.f.Comments.value;
		 
	  this.wobillsdetailsreq.WOBillId=WOBillId;
	  this.wobillsdetailsreq.PerformBy=localStorage.getItem('UserId');

if(this.f.BillType.value=='Recycler Sales Bill' ||  this.f.BillType.value=='Recycler Processing Bill' || this.f.BillType.value=='Client Bill' )
		{
	  this.wobillsdetailsreq.WOSalesId='';
	  if (WOSalesId.search(",") >= 0) {
		  var FocusProcessingType = WOSalesId.split(',');
		  var SelectedProcessingType = [];
		  for (var i = 0; i < FocusProcessingType.length; i++) {
			  for (var j = 0; j < this.WOSalesDetailsdata.length; j++) {
				  if (FocusProcessingType[i] == this.WOSalesDetailsdata[j].WOSalesId) {
					  SelectedProcessingType.push(this.WOSalesDetailsdata[j]);
				  }
			  }
		  }
		  console.log("test");
		  this.wobillsdetailsForm.controls['WOSalesId'].setValue(SelectedProcessingType);
		  this.wobillsdetailsreq.WOSalesId = WOSalesId;
	  }
	  else {
		  var SelectedProcessingType1 = [];
		  for (var j = 0; j < this.WOSalesDetailsdata.length; j++) {
			  if (WOSalesId == this.WOSalesDetailsdata[j].WOSalesId) {
				  SelectedProcessingType1.push(this.WOSalesDetailsdata[j]);
			  }
		  }
		  // SelectedProcessingType1.push(ProcessingTypeId);
		  console.log("test:" + WOSalesId);
		  this.wobillsdetailsForm.controls['WOSalesId'].setValue(SelectedProcessingType1);
		  this.wobillsdetailsreq.WOSalesId = WOSalesId;
	  }
	}
	else
	{
		this.wobillsdetailsreq.WOSalesId ='';
	}

	if(this.f.BillType.value=='Collection/Purchase Bill' )
		{
	  this.wobillsdetailsreq.CollectionPurchaseId='';
	  if (CollectionPurchaseId.search(",") >= 0) {
		  var FocusProcessingType = CollectionPurchaseId.split(',');
		  var SelectedProcessingType = [];
		  for (var i = 0; i < FocusProcessingType.length; i++) {
			  for (var j = 0; j < this.wotransportationCPdata.length; j++) {
				  if (FocusProcessingType[i] == this.wotransportationCPdata[j].CollectionPurchaseId) {
					  SelectedProcessingType.push(this.wotransportationCPdata[j]);
				  }
			  }
		  }
		  console.log("test");
		  this.wobillsdetailsForm.controls['CollectionPurchaseId'].setValue(SelectedProcessingType);
		  this.wobillsdetailsreq.CollectionPurchaseId = CollectionPurchaseId;
	  }
	  else {
		  var SelectedProcessingType1 = [];
		  for (var j = 0; j < this.wotransportationCPdata.length; j++) {
			  if (CollectionPurchaseId == this.wotransportationCPdata[j].CollectionPurchaseId) {
				  SelectedProcessingType1.push(this.wotransportationCPdata[j]);
			  }
		  }
		  // SelectedProcessingType1.push(ProcessingTypeId);
		  console.log("test:" + CollectionPurchaseId);
		  this.wobillsdetailsForm.controls['CollectionPurchaseId'].setValue(SelectedProcessingType1);
		  this.wobillsdetailsreq.CollectionPurchaseId = CollectionPurchaseId;
	  }
	}
	else
	{
		this.wobillsdetailsreq.CollectionPurchaseId = '';
	}

	if(this.f.BillType.value=='Transporter Bill' )
	{
		this.wobillsdetailsreq.WOTransporterId='';
		if (WOTransporterId.search(",") >= 0) {
			var FocusProcessingType = WOTransporterId.split(',');
			var SelectedProcessingType = [];
			for (var i = 0; i < FocusProcessingType.length; i++) {
				for (var j = 0; j < this.wotransportationdata.length; j++) {
					if (FocusProcessingType[i] == this.wotransportationdata[j].WOTransporterId) {
						SelectedProcessingType.push(this.wotransportationdata[j]);
					}
				}
			}
			console.log("test");
			this.wobillsdetailsForm.controls['WOTransporterId'].setValue(SelectedProcessingType);
			this.wobillsdetailsreq.WOTransporterId = WOTransporterId;
		}
		else {
			var SelectedProcessingType1 = [];
			for (var j = 0; j < this.wotransportationdata.length; j++) {
				if (WOTransporterId == this.wotransportationdata[j].WOTransporterId) {
					SelectedProcessingType1.push(this.wotransportationdata[j]);
				}
			}
			// SelectedProcessingType1.push(ProcessingTypeId);
			console.log("test:" + WOTransporterId);
			this.wobillsdetailsForm.controls['WOTransporterId'].setValue(SelectedProcessingType1);
			this.wobillsdetailsreq.WOTransporterId = WOTransporterId;
		}
	}
	else
	{

	}

	  this.wobillsdetailsreq.Operation=2;
	  this.ViewDocument();
	}
	
	
	
	AddUpdateDeletewobillsdetails()
	{
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.wobillsdetailsForm.invalid) 
		  {
			this.loading = false;
            return;
		  }

	  
	  this.wobillsdetailsreq.InvoiceCode=this.f.InvoiceCode.value;
	  this.wobillsdetailsreq.InvoiceNumber=this.f.InvoiceNumber.value;
	  this.wobillsdetailsreq.InvoiceDate=this.f.InvoiceDate.value;
	  this.wobillsdetailsreq.Quantity=this.f.Quantity.value;
	  this.wobillsdetailsreq.Rate=this.f.Rate.value;
	  this.wobillsdetailsreq.MaterialType=this.f.MaterialType.value;
	  this.wobillsdetailsreq.GSTamount=this.f.GSTamount.value;
	  this.wobillsdetailsreq.Totalamount=this.f.Totalamount.value;
	  this.wobillsdetailsreq.BillDate=this.f.BillDate.value;
	  this.wobillsdetailsreq.BillType=this.f.BillType.value;
	  this.wobillsdetailsreq.BillSubType=this.f.BillSubType.value;
	  this.wobillsdetailsreq.Comments=this.f.Comments.value;
	   this.wobillsdetailsreq.CoProcessingCertificate=this.f.CoProcessingCertificate.value;
	   this.wobillsdetailsreq.CoProcessingCertificateFile='';
	   this.wobillsdetailsreq.WeightConfirmation=this.f.WeightConfirmation.value;
	   this.wobillsdetailsreq.WeightConfirmationFile='';
	   this.wobillsdetailsreq.BillCopy=this.f.BillCopy.value; 
	   this.wobillsdetailsreq.BillCopyFile='';
	   this.wobillsdetailsreq.WOSalesId="";

	   if(this.wobillsdetailsreq.ManufacturerId==null)
	{
		this.wobillsdetailsreq.ManufacturerId=0;
	}	

	if(this.wobillsdetailsreq.AggregatorId==null)
	{
		this.wobillsdetailsreq.AggregatorId=0;
	}	

	if(this.wobillsdetailsreq.RecyclerId==null)
	{
		this.wobillsdetailsreq.RecyclerId=0;
	}	
	if(this.wobillsdetailsreq.TransporterId==null)
	{
		this.wobillsdetailsreq.TransporterId=0;
	}	
	if(this.wobillsdetailsreq.WorkOrderId==null)
	{
		this.wobillsdetailsreq.WorkOrderId=0;
	}	
	if(this.wobillsdetailsreq.WorkOrderItemId==null)
	{
		this.wobillsdetailsreq.WorkOrderItemId=0;
	}	

	   if(this.f.BillType.value=='Client Bill' && this.f.BillSubType.value=='Invoices' || this.f.BillType.value=='Recycler Sales Bill' && this.f.BillSubType.value=='Invoices' || this.f.BillType.value=='Recycler Processing Bill' && this.f.BillSubType.value=='Invoices')
	   {
	   for (let i = 0; i < this.f.WOSalesId.value.length; i++)
	    {
			if(this.wobillsdetailsreq.WOSalesId == "")
			{
				this.wobillsdetailsreq.WOSalesId= this.f.WOSalesId.value[i].WOSalesId.toString() ; 
			}
			else
			{
			this.wobillsdetailsreq.WOSalesId= this.wobillsdetailsreq.WOSalesId + ',' + this.f.WOSalesId.value[i].WOSalesId.toString() ;  
			}
		  }
		}
		this.wobillsdetailsreq.CollectionPurchaseId='';
		if(this.f.BillType.value=='Collection/Purchase Bill' && this.f.BillSubType.value=='Invoices')
		{
			for (let i = 0; i < this.f.CollectionPurchaseId.value.length; i++) {
				if(this.wobillsdetailsreq.CollectionPurchaseId == "")
				{
					this.wobillsdetailsreq.CollectionPurchaseId= this.f.CollectionPurchaseId.value[i].CollectionPurchaseId.toString() ; 
				}
				else
				{
				this.wobillsdetailsreq.CollectionPurchaseId= this.wobillsdetailsreq.CollectionPurchaseId + ',' + this.f.CollectionPurchaseId.value[i].CollectionPurchaseId.toString() ;  
				}
			}
		}


	if(this.f.BillType.value=='Transporter Bill' && this.f.BillSubType.value=='Invoices')
		{
			for (let i = 0; i < this.f.WOTransporterId.value.length; i++) {
				if(this.wobillsdetailsreq.WOTransporterId == "")
				{
					this.wobillsdetailsreq.WOTransporterId= this.f.WOTransporterId.value[i].WOTransporterId.toString() ; 
				}
				else
				{
				this.wobillsdetailsreq.WOTransporterId= this.wobillsdetailsreq.WOTransporterId + ',' + this.f.WOTransporterId.value[i].WOTransporterId.toString() ;  
				}
			}
		}
	  

			


        this.userService.wobillsdetailsCRUD(this.wobillsdetailsreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.wobillsdetailsdata=respData.Data;
						 this.aggregatordata=respData.AGData;
						 this.REdata=respData.RCData;
						 this.Transportdata=respData.TRData;
						 
						 //this.alertService.success(''+respData.m, true);
						 this.AlertMessage=respData.m;
						// this.alertService.success(''+respData.m, true);
						 jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
						 this.ResetFrom();

						  jQuery("#myModalalert").modal("show");
					}
					else{
						this.alertService.error(''+ respData.m, true);
						//  this.AlertMessage=respData.m;
						// // this.alertService.success(''+respData.m, true);
						//  jQuery("#myModal").modal("show");
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
	
	SearchBill_Text(searchValue)
  { 
	  if(searchValue.length>=1)
	  {
		  console.log("Call API");
		  this.SearchBill.controls['InvoiceNumber'].setValue(0);
		  this.SearchBillReq.TextToSearch=searchValue;
		  this.WOSearchBill();
		  
	  }
	  else
	  { this.SearchBill.controls['InvoiceNumber'].setValue(0);
		  this.SearchBillReq.TextToSearch='';
		  this.WOSearchBill();
	  }
  }
  
  SearchBill_Invoice(searchValue)
  { 
	  if(searchValue!=0)
	  {
		  console.log("Call API");
		 	this.SearchBill.controls['TextToSearch'].setValue('');
		  this.SearchBillReq.InvoiceNumber=searchValue;
		  this.WOSearchBill();
		  
	  }
	  else
	  {
		  this.SearchBill.controls['TextToSearch'].setValue('');
		  this.SearchBillReq.InvoiceNumber=0;
		  this.WOSearchBill();
	  }
  }
  
  
  
	
	WOSearchBill(){
	  
		 this.loading = true;
        this.userService.SearchBill(this.SearchBillReq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.wobillsdetailsdata=respData.Data;
						 
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
	
	SelectCertificates(value)
		{
			this.loading = true;
			this.userService.SalesDoc({SaleId:value})
			   .pipe()
				.subscribe(
					(data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							// this.saldocstatus=false;
							 this.wobillsdetailsForm.controls['CoProcessingCertificate'].setValue(respData.Data.CoProcessingCertificate);
		this.wobillsdetailsForm.controls['WeightConfirmation'].setValue(respData.Data.WeightConfirmation);
						}
						else
						{
							//this.saldocstatus=true;
							this.errormsg=respData.m;							
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
		UploadDocument()
  {
	  this.submitted = true;
		this.DocUploadForm.controls['Image'].setValue(this.base64string);
        // stop here if form is invalid
       if (this.DocUploadForm.invalid) {
           return;
         }
		
		this.Docreq.AutoCode=this.f.InvoiceCode.value;
		this.Docreq.DocumentTypeId=this.d.DocumentTypeId.value;
		this.Docreq.DocumentName=this.d.DocumentName.value;
		this.Docreq.DocumentDetails=this.d.DocumentDetails.value;
		this.Docreq.FormId=this.value;
		this.Docreq.Image=this.base64string;
		this.Docreq.DocGuid='ViewBills';
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
		this.Docreq.AutoCode=this.f.InvoiceCode.value;
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
	this.DocStatusReq.AutoCode=this.f.InvoiceCode.value;
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
						 this.AddUpdateDeletewobillsdetails();
					}
					else
					{
						this.AlertMessage=this.DocStatusData;
						   //this.alertService.success(''+ respData.m, true);
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

FetchRateFromWOI(value)
{
this.userService.FetchRateFromWOI({WorkOrderItemId:value})
	  .pipe()
	   .subscribe(
		   (data:any) => {
			   var respData=data;
			   if(respData.s == 1)
			   {
					this.RateValue=respData.Data;
					this.wobillsdetailsForm.controls['Rate'].setValue(this.RateValue);
					this.CalculateFinalAmount();
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

		FetchSalesDatabyInvoice(value)
		{
		
		this.userService.FetchSalesDatabySalesId({SaleId:'',CPId:'',TRId:'',InvoiceNo:value})
			  .pipe()
			   .subscribe(
				   (data:any) => {
					   var respData=data;
					   if(respData.s == 1)
					   {
							this.UDValidation=this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
							this.Quantity=respData.Data.QuantityReceived;
							this.SalesRate=respData.Data.SalesRate;
							this.ProccessingRate=respData.Data.ProccessingRate;
							this.GST=respData.Data.GST;
							this.wobillsdetailsForm.controls['Quantity'].setValue(this.Quantity);
							this.wobillsdetailsForm.controls['GSTamount'].setValue(this.GST);
							this.wobillsdetailsForm.controls['Rate'].setValue(this.SalesRate);
							this.wobillsdetailsForm.controls['InvoiceDate'].setValue(this.datepipe.transform(Date.now(), this.InvoiceDate));
							if(this.f.BillType.value=='Recycler Sales Bill')
							{						
								this.wobillsdetailsForm.controls['Rate'].setValue(this.SalesRate);
							}
							if(this.f.BillType.value=='Recycler Processing Bill')
							{
								this.wobillsdetailsForm.controls['Rate'].setValue(this.ProccessingRate);
							}
		
							this.CalculateFinalAmount();
						   //this.alertService.success(''+ respData.m, true);+
						
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


		FetchSalesDatabyTRId()
		{
		
			var SalesIds='';
			for (let i = 0; i < this.f.WOTransporterId.value.length; i++) {
				if(this.wobillsdetailsreq.WOTransporterId == "")
				{
					SalesIds= this.f.WOTransporterId.value[i].WOTransporterId.toString() ; 
				}
				else
				{
					SalesIds= this.wobillsdetailsreq.WOTransporterId + ',' + this.f.WOTransporterId.value[i].WOTransporterId.toString() ;  
				}
			}
		
		this.userService.FetchSalesDatabySalesId({SaleId:'',CPId:'',TRId:SalesIds,InvoiceNo:''})
			  .pipe()
			   .subscribe(
				   (data:any) => {
					   var respData=data;
					   if(respData.s == 1)
					   {
							this.UDValidation=this.datepipe.transform(respData.Data.UnloadingDate, 'yyyy-MM-dd');
							this.Quantity=respData.Data.QuantityReceived;
							this.SalesRate=respData.Data.SalesRate;
							this.ProccessingRate=respData.Data.ProccessingRate;
							this.GST=respData.Data.GST;
							this.wobillsdetailsForm.controls['Quantity'].setValue(this.Quantity);
							this.wobillsdetailsForm.controls['GSTamount'].setValue(this.GST);

							
		
							if(this.f.BillType.value=='Transporter Bill' )
							{					
								this.wobillsdetailsForm.controls['Rate'].setValue(this.SalesRate);
							}
						
		
							this.CalculateFinalAmount();
						   //this.alertService.success(''+ respData.m, true);+
						
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
		

		FetchSalesDatabyCPId()
		{
		
			var SalesIds='';
			for (let i = 0; i < this.f.CollectionPurchaseId.value.length; i++) {
				if(SalesIds == "")
				{
					SalesIds= this.f.CollectionPurchaseId.value[i].CollectionPurchaseId.toString() ; 
				}
				else
				{
					SalesIds = SalesIds  + ',' + this.f.CollectionPurchaseId.value[i].CollectionPurchaseId.toString() ;  
				}
			}
		
		this.userService.FetchSalesDatabySalesId({SaleId:'',CPId:SalesIds,TRId:'',InvoiceNo:''})
			  .pipe()
			   .subscribe(
				   (data:any) => {
					   var respData=data;
					   if(respData.s == 1)
					   {
							this.UDValidation=this.datepipe.transform(respData.Data.UnloadingDate, 'yyyy-MM-dd');
							this.Quantity=respData.Data.QuantityReceived;
							this.SalesRate=respData.Data.SalesRate;
							this.ProccessingRate=respData.Data.ProccessingRate;
							this.GST=respData.Data.GST;
							this.wobillsdetailsForm.controls['Quantity'].setValue(this.Quantity);
							this.wobillsdetailsForm.controls['GSTamount'].setValue(this.GST);
							
							if(this.f.BillType.value=='Collection/Purchase Bill' )
							{					
								this.wobillsdetailsForm.controls['Rate'].setValue(this.SalesRate);
							}
							
		
							this.CalculateFinalAmount();
						   //this.alertService.success(''+ respData.m, true);+
						
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
		




FetchSalesDatabySalesId()
{

	var SalesIds='';
	for (let i = 0; i < this.f.WOSalesId.value.length; i++) {
		if(SalesIds == "")
		{
			SalesIds= this.f.WOSalesId.value[i].WOSalesId.toString() ; 
		}
		else
		{
			SalesIds = SalesIds  + ',' + this.f.WOSalesId.value[i].WOSalesId.toString() ;  
		}
	}

this.userService.FetchSalesDatabySalesId({SaleId:SalesIds,CPId:'',TRId:'',InvoiceNo:''})
	  .pipe()
	   .subscribe(
		   (data:any) => {
			   var respData=data;
			   if(respData.s == 1)
			   {
					this.UDValidation=this.datepipe.transform(respData.Data.UnloadingDate, 'yyyy-MM-dd');
					this.Quantity=respData.Data.QuantityReceived;
					this.SalesRate=respData.Data.SalesRate;
					this.ProccessingRate=respData.Data.ProccessingRate;
					this.GST=respData.Data.GST;
					this.wobillsdetailsForm.controls['Quantity'].setValue(this.Quantity);
					this.wobillsdetailsForm.controls['GSTamount'].setValue(this.GST);
					//this.wobillsdetailsForm.controls['Rate'].setValue(this.SalesRate);
					if(this.f.BillType.value=='Recycler Sales Bill')
					{						
						this.wobillsdetailsForm.controls['Rate'].setValue(this.SalesRate);
					}
					if(this.f.BillType.value=='Recycler Processing Bill')
					{
						this.wobillsdetailsForm.controls['Rate'].setValue(this.ProccessingRate);
					}

					this.CalculateFinalAmount();
				   //this.alertService.success(''+ respData.m, true);+
				
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


		FetchWorkOrderbyManufacturerId(value)
{
this.userService.FetchWorkOrderbyManufacturerId({ManufacturerId:value})
	  .pipe()
	   .subscribe(
		   (data:any) => {
			   var respData=data;
			   if(respData.s == 1)
			   {
					this.WorkOrdersdata=respData.Data;
				   //this.alertService.success(''+ respData.m, true);+
				
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


		FetchWOTRByTrasporter(value)
		{
			this.userService.FetchWOTRByTrasporter({TransporterId:value})
				  .pipe()
				   .subscribe(
					   (data:any) => {
						   var respData=data;
						   if(respData.s == 1)
						   {
								this.wotransportationdata=respData.Data;
							   //this.alertService.success(''+ respData.m, true);+
							
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


		FetchCollectionPurchaseByAGID(value)
		{
		this.userService.FetchCollectionPurchaseByAGID({AggregatorId:value})
			  .pipe()
			   .subscribe(
				   (data:any) => {
					   var respData=data;
					   if(respData.s == 1)
					   {
							this.wotransportationCPdata=respData.Data;
						   //this.alertService.success(''+ respData.m, true);+
						
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

		FetchInvoiceNo()
		{
		this.userService.FetchInvoiceNoByBillType({MFID:0,AGID:0,TRID:0,RCID:0})
			  .pipe()
			   .subscribe(
				   (data:any) => {
					   var respData=data;
					   if(respData.s == 1)
					   {
							this.InvoiceData=respData.Data;
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

		FetchInvoiceNoByMFID(value)
		{
		this.userService.FetchInvoiceNoByBillType({MFID:value,AGID:0,TRID:0,RCID:0})
			  .pipe()
			   .subscribe(
				   (data:any) => {
					   var respData=data;
					   if(respData.s == 1)
					   {
							this.InvoiceDataByBillType=respData.Data;
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
				FetchInvoiceNoByAGID(value)
				{
				this.userService.FetchInvoiceNoByBillType({MFID:0,AGID:value,TRID:0,RCID:0})
					  .pipe()
					   .subscribe(
						   (data:any) => {
							   var respData=data;
							   if(respData.s == 1)
							   {
									this.InvoiceDataByBillType=respData.Data;
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
						FetchInvoiceNoByTRID(value)
						{
						this.userService.FetchInvoiceNoByBillType({MFID:0,AGID:0,TRID:value,RCID:0})
							  .pipe()
							   .subscribe(
								   (data:any) => {
									   var respData=data;
									   if(respData.s == 1)
									   {
											this.InvoiceDataByBillType=respData.Data;
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
								FetchInvoiceNoByRCID(value)
								{
								this.userService.FetchInvoiceNoByBillType({MFID:0,AGID:0,TRID:0,RCID:value})
									  .pipe()
									   .subscribe(
										   (data:any) => {
											   var respData=data;
											   if(respData.s == 1)
											   {
													this.InvoiceDataByBillType=respData.Data;
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
