import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService, DataService,ExcelService } from '../_services';
import { DatePipe } from '@angular/common'
declare var jQuery:any;
@Component({
  selector: 'app-view-work-order-details',
  templateUrl: './view-work-order-details.component.html',
  styleUrls: ['./view-work-order-details.component.css']
})
export class ViewWorkOrderDetailsComponent implements OnInit {	

	Isshow:boolean=false;
		public AlertMessage;
	title = 'calculator';
    frieghtamt:number;
	frieghtrate:number;
	test1:number;
	  public DispalayDate;
	  public days;
	  public Date1;
      public Date2;
	  public TimeLineVal;
	  public myDate;
	 //  public citycode;
  //public diffDays;
  
  diffDays:any;
  dropdownList = [];
  public enableInput = false;
  public MilestoneSelected =false;
	/* public WOItemsreq = {WorkOrderItemId:0, WorkOrderId:0, StateId:0, CityId:0, SuburbID:0, ExpiryDate:'',
	WasteMaterialFormid:0, WasteMaterialTypeId:0, Quantity:0, MaterialUnitId:0, Rate:0, GSTRate:0, TotalValue:0,
	OnActualorFreight:false, Timeline:'', Comments:'', PerformBy:'', Operation:0 }; */
	
	public WOItemsreq = {WorkOrderItemId:0, WorkOrderId:0, StateId:0, CityId:0, SuburbID:0, ExpiryDate:'',WasteMaterialId:0, WasteMaterialFormid:0,Quantity:0,FreightRate:0, MaterialUnitId:0, Rate:0, GSTRate:0, OnActualorFreight:false, Timeline:'', Comments:'', PerformBy:'', Operation:0 , TotalValue:0, FreightAmount:0, WorkOrderItemCode:'',ReportingFrequency:'',Billingcycle:0,MileStone:0,GSTAmount:0,AgreementStatusId:0, OrderPlacementDate:''};
	public WOItemsdata;
	
	//Work Order Code Data
	public WorkOrdersreq = {ClientWorkOrderCode:'',WorkOrderId:0, WorkOrderCode:'', ManufacturerId:0, TotalValue:0,BillingValue:0,TotalVolume:0,TotalVolumeUnitId:0,ExpiryDate:'',CreationDate:'', OrderPlacementDate:'',Details:'', WOStatus:'',PerformBy:'', Operation:0 };
	public WorkOrdersdata;
	
	//State data
	public statemasterreq = {Stateid:0, StateName:'', StateCode:'', PerformBy:'', Operation:0 };
	public statemasterdata;
	
	public GenerateCodeNamereq={InputField:'',FormName:''}; 
		
	//City data
	public cityreq = {CityId:0, CityName:'', CityCode:'', PerformBy:'', Operation:0 };
	public citydata;
	
	//Suburb data
	public suburbreq = {SuburbID:0, SuburbName:'', SuburbCode:'', CityId:0, PerformBy:'', Operation:0 };
	public suburbdata;
	
	//Material Unit data
	
	public materialunitreq = {MaterialUnitId:0, MaterialUnit:0, MaterialUnitCode:0, Comments:'', PerformBy:'', Operation:0 };
	public materialunitdata;
	
	//wastematerial
	public wastematerailreq = {WasteMatId:0,  WasteMatCode:0, WasteMatName:'', WasteMatDescription:'', PerformBy:'', Operation:0 };
	public wastematerialdata;
	
	//wastetype
	 public wastetypesreq = {WasteMaterialFormId:0,  WasteMaterialId:0, WasteMaterialFormName:'', Comments:'', PerformBy:'', Operation:0 };
	public wastetypereqData;
	public CheckValidationForDeletereq={FormName:'WorkOrderItem',Id:0};

//Data status list
public AgStatusListreq = {StatusId:0, StatusName:'', StatusType:'Aggrement', Comments:'', PerformBy:'', Operation:0 };
public AggrementStatusdata;

	//public test1;
	dropdownSettings = {};
	WorkorderItemForm:FormGroup;
	 submitted = false;
	loading = false;
	successmsg = false;
	
	public totalgst;
	public gstamt;
	
		
	//City suburb mapping
	public Fromsuburbdata;
	
	today=new Date();
	
	dateerror:any={isError:false,errorMessage:''};
	
	WorkOrderID:any;
	WorkOrderCode:any;
	DisplayOrderPlacementDate: any;
	
 constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService, public datepipe: DatePipe, private dataService:DataService,private router: Router,private excelService:ExcelService,private route: ActivatedRoute,) 
 {
	//var sdata=this.dataService.getOption();
	this.WorkOrderID= localStorage.getItem('WorkOrderId');
	this.WorkOrderCode= localStorage.getItem('WorkOrderCode');
	console.log("Work Order Id : " + this.WorkOrderID);
	console.log("Work Order Code : " + this.WorkOrderCode);
	this.GetWorkorderItem();
	this.GetCities();
	this.Getsuburb();
	this.GetMaterialUnit();
	this.GetWastematerials();
	this.GetWastetype();
	this.GetState();
	this.GetViewOrder();
	this.GetAgreementStatus();
	 // this.calculate1();
	 // this.calculate();
	
 }

 
 
 
  ngOnInit() {


	this.MilestoneSelected =false;
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
	    this.WorkorderItemForm = this.formBuilder.group({
			
			
            WorkOrderId: ['', Validators.required],
			StateId: [0, Validators.required],
			CityId: [0],
            // CityId: [0, Validators.required],
            SuburbID: [0],
			MaterialUnitId: ['', Validators.required],
			WasteMaterialId: ['', Validators.required],			 
		  	WorkOrderItemCode: [''],
			GSTRate: [0, Validators.required],
			ExpiryDate: ['', Validators.required],
            Quantity: [0, Validators.required],
            Rate: [0, Validators.required],
            FreightRate: ['', Validators.required],
            FreightAmount: [''],
			TotalValue: [0],
            OnActualorFreight: [false, Validators.required],
            Timeline: ['', Validators.required],
			Comments: ['']	,
			ReportingFrequency:['', Validators.required],
			Billingcycle:['', Validators.required],	
			MileStone:[0],
			GSTAmount :[0, Validators.required],
			AgreementStatusId: ['', Validators.required],
			OrderPlacementDate: ['',Validators.required]

		});
		
		if(this.route.snapshot.queryParamMap.get('title')=='true1'){
			this.WorkorderItemForm.reset();
	
			jQuery("#myModal").modal("show");
	
			
		}
	


		//   this.dropdownList = [
		// 	{ item_id: 1, item_text: 'Every Shipment' },
		// 	{ item_id: 2, item_text: 'Collection Target Milestone' },
		// 	{ item_id: 3, item_text: 'No Update Till Target Completion' },
		// 	{ item_id: 4, item_text: 'Monthly Updates' },
		// 	{ item_id: 5, item_text: 'On Billing' }
		//   ];

		  this.dropdownList = [
			{ item_id: 1, item_text: 'Every Shipment' },
			{ item_id: 2, item_text: 'Collection Target Milestone(25%,50%,75%,100%)' },
			{ item_id: 3, item_text: 'No Update Till Target Completion' },
			{ item_id: 4, item_text: 'Monthly Updates' },
			{ item_id: 5, item_text: 'On Billing' }
		  ];


		  this.dropdownSettings = {
			singleSelection: false,
			idField: 'item_id',
			textField: 'item_text',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All'
		  };
  }
  

  
  //added by yogesh
  FinalCalculation()
  {
	  var gst=this.f.GSTRate.value;
	  var qty=this.f.Quantity.value;
	  var rate=this.f.Rate.value;
	  var frate=this.f.FreightRate.value;
	  
	  if(this.f.FreightRate.value!=null)
	  {
		  frate=this.f.FreightRate.value;
	  }
	  else
	  {
		frate=0;
		  this.WorkorderItemForm.controls['FreightRate'].setValue(0);
	  }
	  
	  console.log("GST : "+gst);
	  console.log("Quantity : "+qty);
	  console.log("Actual Rate : "+rate);
	  console.log("Freight Rate : "+frate);
	  
	  var amt=(qty*rate);
	  var gstamt=(gst*amt)/100;
	  var totfreighamt=(qty*frate);
	  //var totamt=(amt)+(gstamt)+(totfreighamt);
	  var totamt=(amt)+(totfreighamt);
	  this.WorkorderItemForm.controls['FreightAmount'].setValue(totfreighamt);
	  this.WorkorderItemForm.controls['TotalValue'].setValue(totamt);
	  
	  
  }

	
  
  
  
  onSubmit() {
        this.submitted = true;
		this.WorkorderItemForm.controls['WorkOrderId'].setValue(this.WorkOrderID);
		//this.WOItemsreq.WorkOrderId=this.WorkOrderID;
        // stop here if form is invalid
		if (this.WorkorderItemForm.invalid) {
			return
		} 
		
		
	  this.WOItemsreq.StateId=this.f.StateId.value;
	 // this.WOItemsreq.CityId=this.f.CityId.value;
	  if(this.f.SuburbID.value==null)
	  {
	  this.WOItemsreq.SuburbID=0;
	  }
	  else
	  {
		  this.WOItemsreq.SuburbID=this.f.SuburbID.value;
	  }
	  if(this.f.CityId.value==null)
	  {
	  this.WOItemsreq.CityId=0;
	  }
	  else
	  {
		  this.WOItemsreq.CityId=this.f.CityId.value;
	  }

	  if(this.f.FreightRate.value=='')
	  {
	  this.WOItemsreq.FreightRate=0;
	  }
	  else
	  {
		  this.WOItemsreq.FreightRate=this.f.FreightRate.value;;
	  }

	  if(this.f.MileStone.value == null){
		//this.WorkorderItemForm.controls['MileStone'].setValue(MileStone);
		this.WOItemsreq.MileStone=0;
	 }
	else{
		
			this.WOItemsreq.MileStone=this.f.MileStone.value;
					
	}


	  this.WOItemsreq.MaterialUnitId=this.f.MaterialUnitId.value;
	  this.WOItemsreq.WasteMaterialId=this.f.WasteMaterialId.value;
	 // this.WOItemsreq.WasteMaterialFormid=this.f.WasteMaterialFormid.value;
	  this.WOItemsreq.GSTRate=this.f.GSTRate.value;
	     this.WOItemsreq.ExpiryDate=this.f.ExpiryDate.value;
	  this.WOItemsreq.Quantity=this.f.Quantity.value; 
	  this.WOItemsreq.Rate=this.f.Rate.value;
	 this.WOItemsreq.FreightRate=this.f.FreightRate.value;
	  this.WOItemsreq.FreightAmount= this.f.FreightAmount.value;
	  this.WOItemsreq.TotalValue=this.f.TotalValue.value;
	  this.WOItemsreq.OnActualorFreight=this.f.OnActualorFreight.value;
	  this.WOItemsreq.WorkOrderItemCode=this.f.WorkOrderItemCode.value;
	  this.WOItemsreq.Timeline=this.f.Timeline.value;
	  this.WOItemsreq.Comments=this.f.Comments.value;
	  this.WOItemsreq.WorkOrderItemId=0;
	  this.WOItemsreq.PerformBy=localStorage.getItem('UserId');
	  this.WOItemsreq.ReportingFrequency=this.f.ReportingFrequency.value;
	  this.WOItemsreq.Billingcycle=this.f.Billingcycle.value;
	  this.WOItemsreq.MileStone=this.f.MileStone.value;
	  this.WOItemsreq.GSTAmount=this.f.GSTAmount.value;
	  this.WOItemsreq.AgreementStatusId=this.f.AgreementStatusId.value;
	  this.WOItemsreq.OrderPlacementDate=this.f.OrderPlacementDate.value;

	  this.WOItemsreq.Operation=1;
      this.AddUpdateDeleteWorkorderItem();
	  
	  
    }
  
   
  resetValue() {
    this.WorkorderItemForm.controls['ExpiryDate'].setValue(this.currentDate());
  }
  
  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }
  
  
   ResetFrom(){
		this.WorkorderItemForm.reset();
		this.successmsg=false;
		this.submitted =false;
		//this.WOItemsreq.CityId='';
		//this.WOItemsreq.SuburbID='';
		this.Isshow=false;
		this.enableInput = false;
		this.citydata= undefined;
		this.MilestoneSelected= false;
	}
	
		//Hide show radio button form
  frieghtShow()
  {
  if(this.f.OnActualorFreight.value=='Freight')
  {
	  this.Isshow=true;
	  this.FinalCalculation();
	  
  }
  else
  {
	  this.Isshow=false;
	
	  this.WorkorderItemForm.controls['FreightRate'].setValue(0);
	  this.WorkorderItemForm.controls['GSTAmount'].setValue(0);

	  this.FinalCalculation();


  }
  }
  
  
  //Work order Item Fetch Primary key ID
	// GetWorkorderItemId(WorkOrderId)
	// {		 		 
	  // this.WorkOrdersreq.WorkOrderId=WorkOrderId;
	 // this.GetWorkorderItem();
	// }
	
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
		GetStateMappingState(value){
		  this.WorkorderItemForm.controls['CityId'].setValue(0);
			 this.loading = true;
	        this.userService.GetCitiesByStateIdCRUD({StateId:value})
	           .pipe()
	            .subscribe(
	                (data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							this.citydata=respData.Data;
							this.WorkorderItemForm.controls['CityId'].setValue(0);
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
		GetStateMappingStateWOForm(value){
			this.loading = true;
			 this.userService.GetCitiesByStateIdCRUD({StateId:value})
				.pipe()
				 .subscribe(
					 (data:any) => {
						 var respData=data;
						 if(respData.s == 1)
						 {
							 this.citydata=respData.Data;
							 this.WorkorderItemForm.controls['OperatingCities'].setValue(this.citydata[0].CityId);
							 //this.g.controls['OperatingCities'].setvalue(this.citydata[0].CityId);
							//  this.WorkorderItemForm.controls['CityId'].setValue(this.citydata[0].CityId);
							 
							 
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
	
	
  
  //Display workk order Item
   GetWorkorderItem(){
	   
	  //this.WOItemsreq.Operation=4; 
	  this.WOItemsreq.WorkOrderId=this.WorkOrderID; 
	  
		 this.loading = true;
        this.userService.WOItemsCRUD(this.WOItemsreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.WOItemsdata=respData.Data;
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
	
	
	//Display state
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
	
	
	
	// Display City 
	
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
	
	//Display Suburb
	
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
	
	 getAgFromsuburboncityId(value){
	  
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
	
	
	//Display waste material
	
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
	
	GetWastematerialtypeid(){
	  
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
	 GetWastetype(){
	  
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
	
	EditWorkorderItemData(WorkOrderId,StateId,CityId,SuburbID,MaterialUnitId,WasteMaterialId,ExpiryDate,FreightRate,FreightAmount,Quantity,Rate,GSTRate,TotalValue,Timeline,Comments,WorkOrderItemId,OnActualorFreight,WorkOrderItemCode,ReportingFrequency,Billingcycle,MileStone,GSTAmount,AgreementStatusId,OrderPlacementDate)
	{
		
		
		this.successmsg = false;
	
		this.WorkorderItemForm.controls['WorkOrderItemCode'].setValue(WorkOrderItemCode);
		this.WorkorderItemForm.controls['WorkOrderId'].setValue(WorkOrderId);
		this.WorkorderItemForm.controls['StateId'].setValue(StateId);
		this.WorkorderItemForm.controls['CityId'].setValue(CityId);
		this.WorkorderItemForm.controls['SuburbID'].setValue(SuburbID);
		this.WorkorderItemForm.controls['MaterialUnitId'].setValue(MaterialUnitId);		
		this.WorkorderItemForm.controls['WasteMaterialId'].setValue(WasteMaterialId);
		this.WorkorderItemForm.controls['OrderPlacementDate'].setValue(OrderPlacementDate);

		// this.DispalayDate= this.datepipe.transform(ExpiryDate, 'yyyy-MM-dd');
		// this.WorkorderItemForm.controls['ExpiryDate'].setValue(this.DispalayDate);
		this.WorkorderItemForm.controls['FreightRate'].setValue(FreightRate);
		this.WorkorderItemForm.controls['FreightAmount'].setValue(FreightAmount);
		this.WorkorderItemForm.controls['Quantity'].setValue(Quantity);
		this.WorkorderItemForm.controls['Rate'].setValue(Rate);
		this.WorkorderItemForm.controls['GSTRate'].setValue(GSTRate);
	    this.WorkorderItemForm.controls['OnActualorFreight'].setValue(OnActualorFreight);
		this.WorkorderItemForm.controls['TotalValue'].setValue(TotalValue);
		this.WorkorderItemForm.controls['Timeline'].setValue(Timeline);
		this.WorkorderItemForm.controls['Comments'].setValue(Comments);
		this.WorkorderItemForm.controls['Billingcycle'].setValue(Billingcycle);
		this.WorkorderItemForm.controls['MileStone'].setValue(MileStone);
		this.WorkorderItemForm.controls['GSTAmount'].setValue(GSTAmount);
		this.WorkorderItemForm.controls['AgreementStatusId'].setValue(AgreementStatusId);

		
		this.WOItemsreq.WorkOrderId=this.f.WorkOrderId.value;
		this.WOItemsreq.WorkOrderItemCode=this.f.WorkOrderItemCode.value;
		this.WOItemsreq.StateId=this.f.StateId.value;
		this.WOItemsreq.CityId=this.f.CityId.value;
		this.WOItemsreq.SuburbID=this.f.SuburbID.value;
		this.WOItemsreq.MaterialUnitId=this.f.MaterialUnitId.value;	
		this.WOItemsreq.WasteMaterialId=this.f.WasteMaterialId.value;
		//this.WOItemsreq.WasteMaterialFormid=this.f.WasteMaterialFormid.value;
		//this.WOItemsreq.ExpiryDate=this.f.ExpiryDate.value;
		this.WOItemsreq.FreightRate=this.f.FreightRate.value;
		this.WOItemsreq.FreightAmount=this.f.FreightAmount.value;
		this.WOItemsreq.Quantity=this.f.Quantity.value;
		this.WOItemsreq.Rate=this.f.Rate.value;
		this.WOItemsreq.GSTRate=this.f.GSTRate.value;
		this.WOItemsreq.OnActualorFreight=this.f.OnActualorFreight.value;
		//this.WOItemsreq.TotalValue=this.f.TotalValue.value;
		this.WOItemsreq.Timeline=this.f.Timeline.value;
		this.WOItemsreq.Comments=this.f.Comments.value;		 
		this.WOItemsreq.WorkOrderItemId=WorkOrderItemId;
		this.WOItemsreq.MileStone=this.f.MileStone.value;
		this.WOItemsreq.GSTAmount=this.f.GSTAmount.value;
		this.WOItemsreq.AgreementStatusId=this.f.AgreementStatusId.value;

		this.DisplayOrderPlacementDate= OrderPlacementDate;
		this.DisplayOrderPlacementDate= this.datepipe.transform(this.DisplayOrderPlacementDate, 'yyyy-MM-dd');
		this.WorkOrdersreq.OrderPlacementDate=this.DisplayOrderPlacementDate
		this.WorkorderItemForm.controls['OrderPlacementDate'].setValue(this.DisplayOrderPlacementDate);
 
		this.DispalayDate= ExpiryDate;
		this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		this.WorkOrdersreq.ExpiryDate=this.DispalayDate;
		this.WorkorderItemForm.controls['ExpiryDate'].setValue(this.DispalayDate);

		

		this.WOItemsreq.PerformBy=localStorage.getItem('UserId');
		this.WOItemsreq.Operation=2;


		if(ReportingFrequency.search(",")>=0)
			{
		 		var ReportingFrequencyids=ReportingFrequency.split(',');
				var SelectedReportingFrequencies=[];
		 		for(var i=0;i<ReportingFrequencyids.length;i++)
				{
		 			for(var j=0;j<this.dropdownList.length;j++)
					{
						if(ReportingFrequencyids[i]==this.dropdownList[j].item_id)
	 				{
		 					SelectedReportingFrequencies.push(this.dropdownList[j]);
		 				}
		 			}
		 		}
		 		console.log("test");
		 		this.WorkorderItemForm.controls['ReportingFrequency'].setValue(SelectedReportingFrequencies);
			 }
			 else
			{
				var SelectedProcessingType1=[];
				for(var j=0;j<this.dropdownList.length;j++)
					{
						if(ReportingFrequency==this.dropdownList[j].item_id)
						{
							SelectedProcessingType1.push(this.dropdownList[j]);
						}
					}
				// SelectedProcessingType1.push(ProcessingTypeId);
				console.log("test:" + ReportingFrequency);
				this.WorkorderItemForm.controls['ReportingFrequency'].setValue(SelectedProcessingType1);
				this.WOItemsreq.ReportingFrequency=ReportingFrequency;
			
			}
		
		if(MileStone ==0){

		
				this.MilestoneSelected=false;
				this.enableInput= false;
				 this.WorkorderItemForm.controls['MileStone'].setValue(0);
				 this.WOItemsreq.MileStone=0;
			 }


		else{

			this.MilestoneSelected=true;
		 	this.enableInput= true;
			 this.WorkorderItemForm.controls['MileStone'].setValue(MileStone);

		//	 this.WOItemsreq.MileStone=this.f.MileStone.value;


		}


		this.frieghtShow();
			
		// if(this.f.OnActualorFreight.value=='Freight')
		// {
		// 	this.Isshow=true;
		// 	this.FinalCalculation();
		// }
		// else
		// {
		// 	this.Isshow=false;
		// }
	 
	}
	
	
	DeleteWorkorderItemData(WorkOrderId,StateId,CityId,SuburbID,MaterialUnitId,WasteMaterialId,ExpiryDate,FreightRate,FreightAmount,Quantity,Rate,GSTRate,TotalValue,Timeline,Comments,WorkOrderItemId,WorkOrderItemCode,ReportingFrequency,Billingcycle,MileStone,GSTAmount,AgreementStatusId,OrderPlacementDate)
	{
		this.successmsg = false;
		this.WorkorderItemForm.controls['WorkOrderItemCode'].setValue(WorkOrderItemCode);
		this.WorkorderItemForm.controls['WorkOrderId'].setValue(WorkOrderId);
		this.WorkorderItemForm.controls['StateId'].setValue(StateId);
		this.WorkorderItemForm.controls['CityId'].setValue(CityId);
		this.WorkorderItemForm.controls['SuburbID'].setValue(SuburbID);
		this.WorkorderItemForm.controls['MaterialUnitId'].setValue(MaterialUnitId);		
		this.WorkorderItemForm.controls['WasteMaterialId'].setValue(WasteMaterialId);
		this.WorkorderItemForm.controls['AgreementStatusId'].setValue(AgreementStatusId);
		this.WorkorderItemForm.controls['OrderPlacementDate'].setValue(OrderPlacementDate);

		//this.WorkorderItemForm.controls['WasteMaterialFormid'].setValue(WasteMaterialFormid);		
		this.WorkorderItemForm.controls['ExpiryDate'].setValue(ExpiryDate);
		this.DispalayDate= ExpiryDate
		this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
		this.WorkorderItemForm.controls['FreightRate'].setValue(FreightRate);
		this.WorkorderItemForm.controls['FreightAmount'].setValue(FreightAmount);
		this.WorkorderItemForm.controls['Quantity'].setValue(Quantity);
		this.WorkorderItemForm.controls['Rate'].setValue(Rate);
		this.WorkorderItemForm.controls['GSTRate'].setValue(GSTRate);
		// this.WorkorderItemForm.controls['OnActualorFreight'].setValue(OnActualorFreight);
		this.WorkorderItemForm.controls['TotalValue'].setValue(TotalValue);
		this.WorkorderItemForm.controls['Timeline'].setValue(Timeline);
		this.WorkorderItemForm.controls['Comments'].setValue(Comments);
		this.WorkorderItemForm.controls['MileStone'].setValue(MileStone);
		this.WorkorderItemForm.controls['Billingcycle'].setValue(Billingcycle);
		this.WorkorderItemForm.controls['GSTAmount'].setValue(GSTAmount);
		this.CheckValidationForDeletereq.Id=WorkOrderItemId;

		this.WOItemsreq.WorkOrderId=this.f.WorkOrderId.value;
		this.WOItemsreq.WorkOrderItemCode=this.f.WorkOrderItemCode.value;
		this.WOItemsreq.StateId=this.f.StateId.value;
		this.WOItemsreq.CityId=this.f.CityId.value;
		this.WOItemsreq.SuburbID=this.f.SuburbID.value;
		this.WOItemsreq.MaterialUnitId=this.f.MaterialUnitId.value;
		this.WOItemsreq.WasteMaterialId=this.f.WasteMaterialId.value;
		this.WOItemsreq.MileStone=this.f.MileStone.value;
		//this.WOItemsreq.WasteMaterialFormid=this.f.WasteMaterialFormid.value;
		this.WOItemsreq.ExpiryDate=this.f.ExpiryDate.value;
		this.WOItemsreq.FreightRate=this.f.FreightRate.value;
		this.WOItemsreq.FreightAmount=this.f.FreightAmount.value;
		this.WOItemsreq.Quantity=this.f.Quantity.value;
		this.WOItemsreq.Rate=this.f.Rate.value;
		this.WOItemsreq.GSTRate=this.f.GSTRate.value;
		this.WOItemsreq.GSTAmount=this.f.GSTAmount.value;
		this.WOItemsreq.AgreementStatusId=this.f.AgreementStatusId.value;
		this.WOItemsreq.OrderPlacementDate=this.f.OrderPlacementDate.value;

		// this.WOItemsreq.OnActualorFreight=this.f.OnActualorFreight.value;
		//this.WOItemsreq.TotalValue=this.f.TotalValue.value;
		this.WOItemsreq.Timeline=this.f.Timeline.value;
		this.WOItemsreq.Comments=this.f.Comments.value;		 
		  this.WOItemsreq.WorkOrderItemId=WorkOrderItemId;
		  this.WOItemsreq.PerformBy=localStorage.getItem('UserId');
		  this.WOItemsreq.Operation=3;
		  this.WOItemsreq.ReportingFrequency=ReportingFrequency;
		  this.WOItemsreq.Billingcycle=Billingcycle;
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
				this.AddUpdateDeleteWorkorderItem();
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
	
	//Crud operation
	
	get f() { return this.WorkorderItemForm.controls; }
	
	// Start Freight rate*100=Freight Amt 
  

calculate1(frieghtrate1:number , quanitynum1:number,)
{
	//rate=100;
	this.frieghtamt = +frieghtrate1 * +quanitynum1;
	//this.calculate();
}
  perrate:number;
 calculategst(gstrate1:number)
{
	this.perrate=100;
	this.gstamt= gstrate1 /this.perrate;	
	
}
totalvalue:number;
 // test1:number
 
 
calculate(quanitynum1:number, ratenum1:number)
{
	  if(this.frieghtamt == undefined)
	  {
		  this.totalvalue=+quanitynum1 * +ratenum1 ;
		  this.totalgst = this.gstamt*this.totalvalue;
		//  this.totalvalue = this.totalgst + this.totalvalue	
	  }
	  else 
	  {
		   this.totalvalue=+quanitynum1 * +ratenum1 ;		    			
			this.totalvalue = this.totalvalue + this.frieghtamt;
			this.totalgst = this.gstamt*this.totalvalue;
			//this.totalvalue = this.totalgst + this.totalvalue	
	  }
}  



calculate1edit(frieghtrate:number , quanitynum:number,)
{
	//rate=100;
	this.frieghtamt = +frieghtrate * +quanitynum;
	//this.calculate();
}
  //perrate:number;
 calculategstedit(gstrate:number)
{
	this.perrate=100;
	this.gstamt= gstrate /this.perrate;	
	
}

calculateedit(quanitynum:number, ratenum:number)
{
	   
	  if(this.frieghtamt == undefined)
	  {
		  this.totalvalue=+quanitynum * +ratenum ;
		  this.totalgst = this.gstamt*this.totalvalue;
		 // this.totalvalue = this.totalgst + this.totalvalue	
	  }
	  else 
	  {
		   this.totalvalue=+quanitynum * +ratenum ;		    			
			this.totalvalue = this.totalvalue + this.frieghtamt;
			this.totalgst = this.gstamt*this.totalvalue;
			//this.totalvalue = this.totalgst + this.totalvalue	
	  }
}  
  
  
  
/*  End Quantity*rate=Total Value */
	
	
	AddUpdateDeleteWorkorderItem()
	{
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		 if(this.dateerror.isError==true)
		 {
			 return;
		 }
		 
		  if (this.WorkorderItemForm.invalid) {
			this.loading = false;
            return;
			
        }
		/*  this.WOItemsreq.WorkOrderId=this.WorkOrdersreq.WorkOrderId; */
		  this.WOItemsreq.WorkOrderId=this.f.WorkOrderId.value;
	  this.WOItemsreq.StateId=this.f.StateId.value;
	  this.WOItemsreq.CityId=this.f.CityId.value;
	  this.WOItemsreq.WorkOrderItemCode=this.f.WorkOrderItemCode.value;
	//  this.WOItemsreq.MileStone=this.f.MileStone.value;
	  if(this.f.SuburbID.value==null)
	  {
		this.WOItemsreq.SuburbID=0;  
	  }
	  else
	  {
		  this.WOItemsreq.SuburbID=this.f.SuburbID.value;
	  }
	  				
 		if(this.f.MileStone.value == null){
		
			this.WOItemsreq.MileStone=0;
		}
		else{
			
				this.WOItemsreq.MileStone=this.f.MileStone.value;
						
		}



	  this.WOItemsreq.MaterialUnitId=this.f.MaterialUnitId.value;
	 // this.WOItemsreq.WasteMaterialFormid=this.f.WasteMaterialFormid.value;
	  this.WOItemsreq.WasteMaterialId=this.f.WasteMaterialId.value;
	  this.WOItemsreq.GSTRate=this.f.GSTRate.value;
	     this.WOItemsreq.ExpiryDate=this.f.ExpiryDate.value;
		 
		  //Expiry Date + Timeline Days
		  this.WOItemsreq.OrderPlacementDate=this.f.OrderPlacementDate.value;

		
		  this.WOItemsreq.ReportingFrequency=this.f.ReportingFrequency.value; 
		  this.WOItemsreq.Billingcycle=this.f.Billingcycle.value;
		this.WOItemsreq.Quantity=this.f.Quantity.value; 
		this.WOItemsreq.Rate=this.f.Rate.value;
	   this.WOItemsreq.FreightRate=this.f.FreightRate.value;
	  this.WOItemsreq.FreightAmount=this.frieghtamt;
	this.WOItemsreq.TotalValue=this.f.TotalValue.value;
	  this.WOItemsreq.OnActualorFreight=this.f.OnActualorFreight.value;
	   this.WOItemsreq.Timeline=this.f.Timeline.value;
	  this.WOItemsreq.Comments=this.f.Comments.value;
	  this.WOItemsreq.AgreementStatusId=this.f.AgreementStatusId.value;

	  this.WOItemsreq.ReportingFrequency = "";
	  for (let i = 0; i < this.f.ReportingFrequency.value.length; i++) {
		  if(this.WOItemsreq.ReportingFrequency  == "")
		  {
			this.WOItemsreq.ReportingFrequency = this.f.ReportingFrequency.value[i].item_id.toString() ; 
		  }
		  else
		  {
		 this.WOItemsreq.ReportingFrequency = this.WOItemsreq.ReportingFrequency  + ',' + this.f.ReportingFrequency.value[i].item_id.toString() ;  
		  }
	  }

		
        this.userService.WOItemsCRUD(this.WOItemsreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.WOItemsdata=respData.Data;
						// this.alertService.success(''+respData.m, true);
						this.AlertMessage=respData.m;
						 
						
						jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
						  jQuery("#myModalalert").modal("show");
					this.router.navigate(['/ViewWorkOrderDetails']);
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
	
	
	Timeline()
	{
		
		
		this.Date1 = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
		this.Date2 = this.datepipe.transform(this.f.ExpiryDate.value, 'yyyy-MM-dd');
		// var days =this.Date1.valueOf() - this.Date2.valueOf();
		var date1 = new Date(this.Date1);
		var date2 = new Date(this.Date2);
		
		if(date2<date1){
			this.dateerror={isError:true,errorMessage:'Date should be greater than todays date'};
			this.diffDays=0;
			return;
		}
		else
		{
			this.dateerror={isError:false,errorMessage:''};
		}
		
		var timeDiff = Math.abs(+date1.getTime() -  +date2.getTime())
		console.log("date1" + date1);
		console.log("date2" + date2);
		var date3 = +date1; 
		var date4 = +date2; 
		var diff= date4-date3;
		//this.diffDays = Math.ceil(parseInt((+date2 - +date1) / (24 * 3600 * 1000)));
		this.diffDays =""+ Math.ceil((diff) / (24 * 3600 * 1000));
		
		this.WorkorderItemForm.controls['Timeline'].setValue(this.diffDays);
	} 
	
	expiryDate()
	{
		
		
		this.Date1 = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');		
		this.TimeLineVal = this.f.Timeline.value;
		var date1 = new Date(this.Date1);
		
		if(this.TimeLineVal<=0){
			
			this.myDate = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');	
			
		}
	
		else
		{
	//	var timeDiff = Math.abs(+date1.getTime() -  +date2.getTime())
		//var dateval=Math.abs(+date1.getTime() +  this.TimeLineVal)
		//this.diffDays =""+ Math.ceil((diff) / (24 * 3600 * 1000));
		//this.Date2= this.datepipe.transform(dateval, 'yyyy-MM-dd');
		this.myDate = this.datepipe.transform(new Date(+date1.getTime() +(this.TimeLineVal*24*60*60*1000)), 'yyyy-MM-dd');;
		this.WorkorderItemForm.controls['ExpiryDate'].setValue(this.myDate);
		console.log("Expiry date",this.myDate);
		}
	} 
	
	
	UpdateDeleteWorkorderItem()
	{
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.WorkorderItemForm.invalid) {
			this.loading = false;
            return;
			
        }
		this.WOItemsreq.WorkOrderItemCode=this.f.WorkOrderItemCode.value;
		  this.WOItemsreq.WorkOrderId=this.f.WorkOrderId.value;
	  this.WOItemsreq.StateId=this.f.StateId.value;
	  this.WOItemsreq.CityId=this.f.CityId.value;
	  this.WOItemsreq.SuburbID=this.f.SuburbID.value;
	  this.WOItemsreq.MaterialUnitId=this.f.MaterialUnitId.value;
	  this.WOItemsreq.WasteMaterialId=this.f.WasteMaterialId.value;
	 // this.WOItemsreq.WasteMaterialFormid=this.f.WasteMaterialFormid.value;
	  this.WOItemsreq.GSTRate=this.f.GSTRate.value;
	     this.WOItemsreq.ExpiryDate=this.f.ExpiryDate.value;
	  this.WOItemsreq.Quantity=this.f.Quantity.value; 
	  this.WOItemsreq.Rate=this.f.Rate.value;
	   this.WOItemsreq.FreightRate=this.f.FreightRate.value;
	  this.WOItemsreq.FreightAmount=this.frieghtamt;
	this.WOItemsreq.TotalValue=this.totalvalue;
	  this.WOItemsreq.OnActualorFreight=this.f.OnActualorFreight.value;
	  this.WOItemsreq.Timeline=this.f.Timeline.value;
	  this.WOItemsreq.Comments=this.f.Comments.value;
		this.WOItemsreq.WorkOrderItemCode=this.f.WorkOrderItemCode.value;
		this.WOItemsreq.MileStone=this.f.MileStone.value;
		this.WOItemsreq.OrderPlacementDate=this.f.OrderPlacementDate.value;

		this.WOItemsreq.AgreementStatusId=this.f.AgreementStatusId.value;

		this.WOItemsreq.ReportingFrequency = "";
		for (let i = 0; i < this.f.ReportingFrequency.value.length; i++) {
			if(this.WOItemsreq.ReportingFrequency  == "")
			{
			  this.WOItemsreq.ReportingFrequency = this.f.ReportingFrequency.value[i].item_id.toString(); 
			}
			else
			{
		   this.WOItemsreq.ReportingFrequency = this.WOItemsreq.ReportingFrequency  + ',' + this.f.ReportingFrequency.value[i].item_id.toString() ;  
			}
		}


        this.userService.WOItemsCRUD(this.WOItemsreq)
           
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.WOItemsdata=respData.Data;
						 //this.alertService.success(''+respData.m, true);
						 this.AlertMessage=respData.m;
						 
						
						jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
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
	
	
DeleteWorkorderItem()
	{
		this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  
		/*  this.WOItemsreq.WorkOrderId=this.WorkOrdersreq.WorkOrderId; */
	this.WOItemsreq.WorkOrderId=this.f.WorkOrderId.value;
	this.WOItemsreq.StateId=this.f.StateId.value;
	this.WOItemsreq.CityId=this.f.CityId.value;
	this.WOItemsreq.SuburbID=this.f.SuburbID.value;
	this.WOItemsreq.MaterialUnitId=this.f.MaterialUnitId.value;
	//this.WOItemsreq.WasteMaterialFormid=this.f.WasteMaterialFormid.value;
	//this.WOItemsreq.WasteMaterialTypeId=this.f.WasteMaterialTypeId.value;
	this.WOItemsreq.ExpiryDate=this.f.ExpiryDate.value;
	this.WOItemsreq.Quantity=this.f.Quantity.value;
	this.WOItemsreq.Rate=this.f.Rate.value;
	this.WOItemsreq.GSTRate=this.f.GSTRate.value;
	this.WOItemsreq.OnActualorFreight=this.f.OnActualorFreight.value;
	//this.WOItemsreq.TotalValue=this.f.TotalValue.value;
	this.WOItemsreq.Timeline=this.f.Timeline.value;
	this.WOItemsreq.Comments=this.f.Comments.value;
	this.WOItemsreq.MileStone=this.f.MileStone.value;
        this.userService.WOItemsCRUD(this.WOItemsreq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.WOItemsdata=respData.Data;
						 this.AlertMessage=respData.m;

						// this.alertService.success(''+respData.m, true);
						jQuery("#myModal").modal("hide");
						jQuery("#myModaledit").modal("hide");
						jQuery("#myModaldelete").modal("hide");


						
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
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.WOItemsdata, 'Work Order Items data Report');
  }
  
  Generatecity(value)
  {
	  const city= this.citydata.find( b => b.CityId === parseInt(value) );
	  
	  localStorage.setItem('CityCode',city.CityName);
  }
  
  GenerateState(value)
  {
	  const state= this.statemasterdata.find( b => b.Stateid === parseInt(value) );
	  
	  localStorage.setItem('StateCode',state.StateName);
  }
  GenerateWOItemCode(value)
	{
		
		const result = this.wastematerialdata.find( a => a.WasteMatId === parseInt(value) );
		console.log("WO Value result :"+result.WasteMatName);

		const city= this.citydata.find( b => b.CityId === parseInt(this.f.CityId.value) );
		const state= this.statemasterdata.find( b => b.Stateid === parseInt(this.f.StateId.value) );
		
		var StateCode =state.StateName;
		if(city == undefined){
			var CityCode ='XX';
		}
		else{
		 CityCode =city.CityName;
		}

		// var CityCode =localStorage.getItem('CityCode');
		// var StateCode =localStorage.getItem('StateCode');
		this.GenerateCodeNamereq.InputField= StateCode.substring(0,2) + CityCode.substring(0,2) + result.WasteMatName.substring(0,3) ;
		this.GenerateCodeNamereq.FormName='WorkOrdersItem';
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
							this.WorkorderItemForm.controls['WorkOrderItemCode'].setValue(respData.Data);
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
		
		


		onItemSelect(item: any) {
			var SelectedProcessingType12=[];
			if(item.item_text=='No Update Till Target Completion')
			{	
				console.log(item);
				SelectedProcessingType12.push(item);
				this.WorkorderItemForm.controls['ReportingFrequency'].setValue(SelectedProcessingType12);
			}
			// else if(item.item_text=='Collection Target Milestone(25%,50%,75%,100%)'){
			// 	console.log("Collection Target Milestone Selected");
			// 	this.MileStoneBasedSelected();
			// 	this.MilestoneSelected = true;
			// }
			else
			{
				for(var i=0;i<this.f.ReportingFrequency.value.length;i++)
				{
		 			for(var j=0;j<this.dropdownList.length;j++)
					{
						if(this.f.ReportingFrequency.value[i].item_id==this.dropdownList[j].item_id && this.dropdownList[j].item_id !=3)
	 				{
						SelectedProcessingType12.push(this.dropdownList[j]);
		 				}
		 			}
		 		}
					 this.WorkorderItemForm.controls['ReportingFrequency'].setValue(SelectedProcessingType12);
			}
			
		  }
		  onSelectAll(items: any) {
			var SelectedProcessingType12=[];
				console.log(items);
				
				for(var i=0;i<items.length;i++)
				{
		 			for(var j=0;j<this.dropdownList.length;j++)
					{
						if(items[i].item_id==this.dropdownList[j].item_id  && this.dropdownList[j].item_id !=3)
	 				{
						SelectedProcessingType12.push(this.dropdownList[j]);
		 				}
		 			}
		 		}
					 this.WorkorderItemForm.controls['ReportingFrequency'].setValue(SelectedProcessingType12);
		  }
		  MileStoneBasedSelected(){
			this.enableInput = true;

			this.MilestoneSelected = true;


		  }
	//	(change)="GenerateWOCode($event.target.value)"
}
