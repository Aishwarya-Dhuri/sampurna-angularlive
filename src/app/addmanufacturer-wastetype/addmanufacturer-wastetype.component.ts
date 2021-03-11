import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,EmailValidator } from '@angular/forms';
import { AlertService, NavbarService, UserService,ExcelService } from '../_services';
import { DatePipe } from '@angular/common'
import { Router, ActivatedRoute } from '@angular/router';
declare var jQuery:any; 

@Component({
  selector: 'app-addmanufacturer-wastetype',
  templateUrl: './addmanufacturer-wastetype.component.html',
  styleUrls: ['./addmanufacturer-wastetype.component.css']
})
export class AddmanufacturerWastetypeComponent implements OnInit {



  public manufacturerreq = {Manufacturerid:0, MFCode:'', ExpiryDate:'', MFName:'', MFAddress:'', MFCityIds:0, MFStateId:0,MFGST:'',Billingcycle:'',AgreementStatusId:0,PrimaryCntName:'',PrimaryCntDesignation:'',PrimaryCntTelNo:'',PrimaryCntLandlineNo:'',PrimaryCntEmail:'',SecCntName:'',SecCntDesignation:'',SecCntTelNo:'',SecCntLandlineNo:'',SecCntEmail:'',ReportingFrequency:'',PerformBy:'', Operation:0,CreationDate:'' };
	public manufacturerdata;
	public MGNameList;
	
	//Manufacture Waste type 
	public mfwastetypereq = {MFWasteTypeId:0, ManufacturerId:0, WasteMaterialIds:0, WastMaterialTypeId:0, ProductionCapacity:'',ProductionCapacityUnit :0,EPRTargetUnit :0,
	PreferredDispSystem:'',RecyclingTypeId:'', AnnualConsumption:0, EPRTarget:0, FocusStateIds:0, FocusCityIds:0,SuburbId:0, ProcessingTypeId:'', EngagedwithAnotherPRO:'',EngagedwithAnother:false, PerformBy:'', Operation:0 ,AnnualConsumptionUnitId:0 };
	//ProductionCapacityUnit

	public mfwastetypedata;
	
	//Data waste material
	public wastematerailreq = {WasteMatId:0,  WasteMatCode:0, WasteMatName:'', WasteMatDescription:'', PerformBy:'', Operation:0 };
	public wastematerialdata;


		//Material Unit
		public materialunitreq = {MaterialUnitId:0, MaterialUnit:0, MaterialUnitCode:0, Comments:'', PerformBy:'', Operation:0 };
		public materialunitdata;
	
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
  public TodayDateC ;
	submitted = false;
	loading = false;
  successmsg = false;
  IsValidRF:boolean=true;
	IsValidCT:boolean=true;
	IsValidPT:boolean=true;
	IsValidRecyclingType:boolean =true;
  AddMFwastetypeForm:FormGroup;
  AlertMessage: any;
	Manufacturerid: any;
	MFName: any;
	ProcessingTypedropdownSettings:any={};
	RecyclingtypedropdownSettings:any={};
	errormsg: any;
	AgreementStatusId: any;
	onClick() {
		this.enableInput = true;
		//!this.enableInput;
		//this.AddMFwastetypeForm.controls['EngagedwithAnotherPRO'].setValue('');
		}

		onClick1() {
			this.enableInput = false;
			this.AddMFwastetypeForm.controls['EngagedwithAnotherPRO'].setValue('');
			}

  constructor(private formBuilder: FormBuilder,  public nav: NavbarService, 
    private userService: UserService, 
    private alertService : AlertService,private route: ActivatedRoute,
    public datepipe: DatePipe,
    private router: Router) {
		
		this.Manufacturerid= localStorage.getItem('Manufacturerid');
		this.MFName= localStorage.getItem('MFName');
		this.AgreementStatusId= localStorage.getItem('AgreementStatusId');

		console.log("Manufacturer Id: " + this.Manufacturerid);
		console.log("Manufacturer Name " + this.MFName);
		console.log("AgreementStatusId" + this.AgreementStatusId);

		this.GetWastematerials();
		//this.GetRecyclingtype();
		this.GetManufacturer();

		this.GetState();
		this.GetProcessingtype();
		this.GetRecyclingtype();
		this.GetMFwastetype();
		this.GetMaterialUnit();
		//this.GetMFNameById();
		//this.AddUpdateDeleteAddMFwastetype();

		


	 }

  ngOnInit() {

	if(this.route.snapshot.queryParamMap.get('title')=='true'){
	
		jQuery("#myModalAddwesteMaterialDetails").modal("show");

		
	}


    this.TodayDateC = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
	this.Manufacturerid= localStorage.getItem('Manufacturerid');
	this.MFName= localStorage.getItem('MFName');
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


    this.AddMFwastetypeForm = this.formBuilder.group({
			
      WasteMaterialIds: ['', Validators.required],
	  ProductionCapacity: ['', Validators.required],
	  ProductionCapacityUnit :[0,Validators.required],
	// PreferredDispSystem: ['', Validators.required],
	RecyclingTypeId:['',Validators.required],
      FocusCityIds: [0],
      FocusStateIds: [0, Validators.required],
      SuburbId: [0 ],
	  EPRTarget: ['', Validators.required],
	  EPRTargetUnit :[0,Validators.required],
      AnnualConsumption: ['', Validators.required],
	  ProcessingTypeId: ['', Validators.required],
	  EngagedwithAnother: [false],
	  EngagedwithAnotherPRO: [''],
	  AnnualConsumptionUnitId:[0,Validators.required],

     // EngagedwithAnother: [false, Validators.required],
 
         
 });	
 	this.ProcessingTypedropdownSettings=
	{
		 singleSelection: false,
			idField: 'ProcessingTypeId',
			textField: 'ProcessingType',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
	}

	this.RecyclingtypedropdownSettings=
	{
		 singleSelection: false,
		idField: 'RecyclingTypeId',
		textField: 'RecyclingType',
		selectAllText: 'Select All',
		unSelectAllText: 'UnSelect All',
	}



  }


  ResetFrom(){
	  this.successmsg = false;
	  this.submitted =false;
		this.AddMFwastetypeForm.reset();		
		this.citydata=undefined;
		//this.Fromsuburbdata=undefined;
		this.mfwastetypereq.ProcessingTypeId='';

  }
  get g() { return this.AddMFwastetypeForm.controls; }

  RedirectMfWasteType(Manufacturerid, MFCode)
  {
	  //this.dataService.setOption('WorkOrderId', WorkOrderId);  
	  localStorage.setItem('Manufacturerid', Manufacturerid);
	  localStorage.setItem('MFCode', MFCode);
  }
	  //Waste type manufacturer  submit 
	  RedirectToWorkOrder(){
		jQuery("#confirmationModalWorkOrder").modal("hide");

		this.router.navigate(['/ViewWorkOrder'], {queryParams:{title:'true'}});
	
		
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


/* Start ProcessingType Multiple select */
onItemSelect(item: any) {
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

  onSelectAll(items: any) {
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
					  this.AddMFwastetypeForm.controls['FocusCityIds'].setValue(0);

					  
					  
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
// this.suburbreq = {SuburbID:0, SuburbName:'', SuburbCode:'', CityId:0,PerformBy:'', Operation:0 };
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
					  this.AddMFwastetypeForm.controls['FocusCityIds'].setValue(this.citydata[0].CityId);

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



onSubmitmfwastetype() {
  this.submitted = true;
  
  console.log("form errors : "+this.AddMFwastetypeForm.errors);

  
  
//   if(this.mfwastetypereq.ProcessingTypeId=="")
//   {
//     this.IsValidPT=false;
  
//     return;
//   }
//   if(this.mfwastetypereq.RecyclingTypeId=="")
//   {
//     this.IsValidRecyclingType=false;
  
//     return;
//   }

  // stop here if form is invalid
  if (this.AddMFwastetypeForm.invalid) {
    return;
  }
  this.mfwastetypereq.ManufacturerId = this.Manufacturerid;
  this.mfwastetypereq.WasteMaterialIds=this.g.WasteMaterialIds.value;
  this.mfwastetypereq.ProductionCapacity=this.g.ProductionCapacity.value;
  this.mfwastetypereq.ProductionCapacityUnit=this.g.ProductionCapacityUnit.value;
  //this.mfwastetypereq.PreferredDispSystem=this.g.PreferredDispSystem.value;
 this.mfwastetypereq.AnnualConsumption=this.g.AnnualConsumption.value;
  this.mfwastetypereq.EPRTarget=this.g.EPRTarget.value;
  this.mfwastetypereq.EPRTargetUnit=this.g.EPRTargetUnit.value;
  this.mfwastetypereq.AnnualConsumptionUnitId=this.g.AnnualConsumptionUnitId.value;

  this.mfwastetypereq.FocusStateIds=this.g.FocusStateIds.value;
 this.mfwastetypereq.FocusCityIds=this.g.FocusCityIds.value;
 this.mfwastetypereq.SuburbId=this.g.SuburbId.value;
  //this.mfwastetypereq.ProcessingTypeId=this.g.ProcessingTypeId.value;
  this.mfwastetypereq.EngagedwithAnother=this.g.EngagedwithAnother.value;
  this.mfwastetypereq.EngagedwithAnotherPRO=this.g.EngagedwithAnotherPRO.value;
  this.mfwastetypereq.MFWasteTypeId=0;
  this.mfwastetypereq.PerformBy=localStorage.getItem('UserId');
  this.mfwastetypereq.Operation=1;
 
  this.AddUpdateDeleteAddMFwastetype();
}
getAddMFwastetype(){
	this.mfwastetypereq.ManufacturerId = this.Manufacturerid;
   
	
	
	
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
AddUpdateDeleteAddMFwastetype(){	
		
  this.submitted = true;
   this.loading = true;
   this.successmsg=false;
   
//    if (this.AddMFwastetypeForm.invalid) {
//     return;
//   }


if(this.mfwastetypereq.Operation!=3)
		 {
			 if (this.AddMFwastetypeForm.invalid) {
			this.loading = false;
            return;
			
        }
		 }
		 
  this.mfwastetypereq.ManufacturerId = this.Manufacturerid;

  this.mfwastetypereq.WasteMaterialIds=this.g.WasteMaterialIds.value;
   this.mfwastetypereq.ProductionCapacity=this.g.ProductionCapacity.value;
   this.mfwastetypereq.ProductionCapacityUnit=this.g.ProductionCapacityUnit.value;

  // this.mfwastetypereq.PreferredDispSystem=this.g.PreferredDispSystem.value;
   this.mfwastetypereq.AnnualConsumption=this.g.AnnualConsumption.value;
   this.mfwastetypereq.AnnualConsumptionUnitId=this.g.AnnualConsumptionUnitId.value;

   this.mfwastetypereq.EPRTarget=this.g.EPRTarget.value;
   this.mfwastetypereq.EPRTargetUnit=this.g.EPRTargetUnit.value;

   this.mfwastetypereq.FocusStateIds=this.g.FocusStateIds.value;
  this.mfwastetypereq.FocusCityIds=this.g.FocusCityIds.value;
  // this.mfwastetypereq.ProcessingTypeId=this.g.ProcessingTypeId.value;
  this.mfwastetypereq.EngagedwithAnother=this.g.EngagedwithAnother.value;

   //this.mfwastetypereq.EngagedwithAnotherPRO=this.g.EngagedwithAnotherPRO.value;
   this.mfwastetypereq.SuburbId=this.g.SuburbId.value;
   if(this.mfwastetypereq.FocusCityIds == null){
	this.mfwastetypereq.FocusCityIds = 0;
	}
	else{
		this.mfwastetypereq.FocusCityIds=this.g.FocusCityIds.value;
	}

   if(this.mfwastetypereq.SuburbId == null){
	this.mfwastetypereq.SuburbId = 0;
	}
	else{
		this.mfwastetypereq.SuburbId=this.g.SuburbId.value;
	}

	


	if(this.mfwastetypereq.EngagedwithAnother ==true){
		this.enableInput = true;
		   this.mfwastetypereq.EngagedwithAnotherPRO=this.g.EngagedwithAnotherPRO.value;

	}
	else{
		this.enableInput=false;
		this.mfwastetypereq.EngagedwithAnotherPRO='';
	}

	if(this.mfwastetypereq.EngagedwithAnother == null || this.mfwastetypereq.EngagedwithAnotherPRO == ''){
		this.mfwastetypereq.EngagedwithAnother = false;
		this.mfwastetypereq.EngagedwithAnotherPRO = '';

		}
	
	if(this.mfwastetypereq.EngagedwithAnotherPRO!= ''){
		this.enableInput=true;

			this.mfwastetypereq.EngagedwithAnotherPRO=this.g.EngagedwithAnotherPRO.value;
		}
		else{
					//No Selected
					this.enableInput=false;

					this.mfwastetypereq.EngagedwithAnotherPRO = '';
		
		}



		// if(this.mfwastetypereq.EngagedwithAnotherPRO!="")
		// {
		// 	this.enableInput=true;
		// 	this.mfwastetypereq.EngagedwithAnotherPRO=this.g.EngagedwithAnotherPRO.value;

		// }
		// else
		// {
		// 	 this.enableInput=false;
		// 	 this.mfwastetypereq.EngagedwithAnotherPRO=this.g.EngagedwithAnotherPRO.value;

		// }

   /*New Code for ProcessingTypeId multiselect*/
   this.mfwastetypereq.ProcessingTypeId = "";
		for (let i = 0; i < this.g.ProcessingTypeId.value.length; i++) {
			if(this.mfwastetypereq.ProcessingTypeId == "")
			{
		      this.mfwastetypereq.ProcessingTypeId= this.g.ProcessingTypeId.value[i].ProcessingTypeId.toString() ; 
			}
			else
			{
	   	this.mfwastetypereq.ProcessingTypeId= this.mfwastetypereq.ProcessingTypeId + ',' + this.g.ProcessingTypeId.value[i].ProcessingTypeId.toString() ;  
			}
		}
		//Array[] proctypes= this.g.ProcessingTypeId.value; 
      /*New Code for ProcessingTypeId multiselect Ends*/
	  this.mfwastetypereq.RecyclingTypeId = "";


	  for (let i = 0; i < this.g.RecyclingTypeId.value.length; i++) {
		if(this.mfwastetypereq.RecyclingTypeId == "")
		{
		  this.mfwastetypereq.RecyclingTypeId= this.g.RecyclingTypeId.value[i].RecyclingTypeId.toString() ; 
		}
		else
		{
	   this.mfwastetypereq.RecyclingTypeId= this.mfwastetypereq.RecyclingTypeId + ',' + this.g.RecyclingTypeId.value[i].RecyclingTypeId.toString() ;  
		}
	}

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
		  //jQuery("#myModalalert").modal("show");
		  
		  if(this.mfwastetypereq.Operation==1){
			localStorage.setItem('Manufacturerid', this.manufacturerdata[0].Manufacturerid);
			localStorage.setItem('MFCode', this.manufacturerdata[0].MFCode);
			localStorage.setItem('MFName', this.manufacturerdata[0].MFName);
			localStorage.setItem('AgreementStatusId', this.manufacturerdata[0].AgreementStatusId);

			if(this.manufacturerdata[0].AgreementStatusId == 19){
				console.log("Agreement Status Signed for waste type");
				jQuery("#myModal").modal("hide");
				jQuery("#myModaledit").modal("hide");
				jQuery("#confirmationModalWorkOrder").modal("show");

			}
			else{
				jQuery("#myModal").modal("hide");
				jQuery("#myModaledit").modal("hide");
				jQuery("#myModalalert").modal("show");
				this.router.navigate(['/Addmanufacturer-Wastetype']);

			}

		



		  }
		  else{
			this.AlertMessage=respData.m;
			jQuery("#myModal").modal("hide");
			jQuery("#confirmationModalWorkOrder").modal("hide");

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
        this.IsValidPT=true;
        
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
        
      });
}
GetMFwastetype(){
	//this.mfwastetypereq.ManufacturerId = 0;
	 this.mfwastetypereq.ManufacturerId = this.Manufacturerid;
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
	GetManufacturereId(Manufacturerid,MFName)
	{		 		 
	  this.manufacturerreq.Manufacturerid=Manufacturerid;
	  this.ManufacturerName=MFName;
	  this.mfwastetypereq.Operation=0;
	 this.GetMFwastetype();
	}
	
	EditMfWasteTypeData(WasteMaterialIds,ProductionCapacity,ProductionCapacityUnit,AnnualConsumption,EPRTarget,EPRTargetUnit,FocusStateIds,FocusCityIds,SuburbId,ProcessingTypeId,EngagedwithAnother,EngagedwithAnotherPRO,MFWasteTypeId,RecyclingTypeId,AnnualConsumptionUnitId)
	{
		// this.AGWasteTypesreq.AggregatorId=this.aggregatorreq.AggregatorId;
		this.successmsg = false;
		
		this.AddMFwastetypeForm.controls['WasteMaterialIds'].setValue(WasteMaterialIds);
		this.AddMFwastetypeForm.controls['ProductionCapacity'].setValue(ProductionCapacity);
		this.AddMFwastetypeForm.controls['ProductionCapacityUnit'].setValue(ProductionCapacityUnit);
		//this.AddMFwastetypeForm.controls['PreferredDispSystem'].setValue(PreferredDispSystem);
		this.AddMFwastetypeForm.controls['AnnualConsumption'].setValue(AnnualConsumption);
		this.AddMFwastetypeForm.controls['AnnualConsumptionUnitId'].setValue(AnnualConsumptionUnitId);

		this.AddMFwastetypeForm.controls['EPRTarget'].setValue(EPRTarget);
		this.AddMFwastetypeForm.controls['EPRTargetUnit'].setValue(EPRTargetUnit);

		this.AddMFwastetypeForm.controls['FocusStateIds'].setValue(FocusStateIds);
		this.AddMFwastetypeForm.controls['FocusCityIds'].setValue(FocusCityIds);
		this.AddMFwastetypeForm.controls['SuburbId'].setValue(SuburbId);
		this.AddMFwastetypeForm.controls['EngagedwithAnother'].setValue(EngagedwithAnother);
		this.AddMFwastetypeForm.controls['EngagedwithAnotherPRO'].setValue(EngagedwithAnotherPRO);

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
				this.AddMFwastetypeForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType1);
				this.mfwastetypereq.ProcessingTypeId=ProcessingTypeId;
			}
		
			if(RecyclingTypeId.search(",")>=0)
			{
				var FocusRecyclingType=RecyclingTypeId.split(',');
				var SelectedRecyclingType=[];
				for(var i=0;i<FocusRecyclingType.length;i++)
				{
					for(var j=0;j<this.recyclingtypedata.length;j++)
					{
						if(FocusRecyclingType[i]==this.recyclingtypedata[j].RecyclingTypeId)
						{
							SelectedRecyclingType.push(this.recyclingtypedata[j]);
						}
					}
				}
				console.log("test");
				this.AddMFwastetypeForm.controls['RecyclingTypeId'].setValue(SelectedRecyclingType);
			}
			else
			{
				var SelectedRecyclingType2=[];
				for(var j=0;j<this.recyclingtypedata.length;j++)
					{
						if(RecyclingTypeId==this.recyclingtypedata[j].RecyclingTypeId)
						{
							SelectedRecyclingType2.push(this.recyclingtypedata[j]);
						}
					}
				console.log("test:" + RecyclingTypeId);
				this.AddMFwastetypeForm.controls['RecyclingTypeId'].setValue(SelectedRecyclingType2);
				this.mfwastetypereq.RecyclingTypeId=RecyclingTypeId;
			}





			
			if(this.mfwastetypereq.EngagedwithAnotherPRO!= ''){
				this.enableInput=true;
		
					this.mfwastetypereq.EngagedwithAnotherPRO=this.g.EngagedwithAnotherPRO.value;
				}
				else{
							//No Selected
							this.enableInput=false;
		
							this.mfwastetypereq.EngagedwithAnotherPRO = '';
				
				}
			
		 /* Start IF else EngagedwithAnotherPRO */
		//  if(EngagedwithAnotherPRO!="")
		//  {
		// 	 this.enableInput=true;
		// 	 this.AddMFwastetypeForm.controls['EngagedwithAnother'].setValue(true);
		// 	 this.AddMFwastetypeForm.controls['EngagedwithAnotherPRO'].setValue(EngagedwithAnotherPRO);
		//  }
		//  else
		//  {
		// 	  this.enableInput=false;
		// 	  this.AddMFwastetypeForm.controls['EngagedwithAnother'].setValue(false);

		// 	 this.AddMFwastetypeForm.controls['EngagedwithAnotherPRO'].setValue('');
		//  }

		 this.mfwastetypereq.WasteMaterialIds=this.g.WasteMaterialIds.value;
		 this.mfwastetypereq.ProductionCapacity=this.g.ProductionCapacity.value;
		 this.mfwastetypereq.ProductionCapacityUnit=this.g.ProductionCapacityUnit.value;

		// this.mfwastetypereq.PreferredDispSystem=this.g.PreferredDispSystem.value;
		 this.mfwastetypereq.AnnualConsumption=this.g.AnnualConsumption.value;
		 this.mfwastetypereq.AnnualConsumption=this.g.AnnualConsumption.value;

		 this.mfwastetypereq.EPRTarget=this.g.EPRTarget.value;
		 this.mfwastetypereq.AnnualConsumptionUnitId=this.g.AnnualConsumptionUnitId.value;

		 this.mfwastetypereq.FocusStateIds=this.g.FocusStateIds.value;
		 this.mfwastetypereq.FocusCityIds=this.g.FocusCityIds.value;
		 this.mfwastetypereq.SuburbId=this.g.SuburbId.value;		
		 //this.mfwastetypereq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		 this.mfwastetypereq.EngagedwithAnotherPRO=this.g.EngagedwithAnotherPRO.value;

		 this.mfwastetypereq.EngagedwithAnother=this.g.EngagedwithAnother.value;
		 

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

	
	DeleteMfWasteTypeData(WasteMaterialIds,ProductionCapacity,ProductionCapacityUnit,AnnualConsumption,EPRTarget,EPRTargetUnit,FocusStateIds,FocusCityIds,SuburbId,ProcessingTypeId,EngagedwithAnother,EngagedwithAnotherPRO,MFWasteTypeId,RecyclingTypeId,AnnualConsumptionUnitId)
	{
		// this.AGWasteTypesreq.AggregatorId=this.aggregatorreq.AggregatorId;
		this.successmsg = false;
		
		this.AddMFwastetypeForm.controls['WasteMaterialIds'].setValue(WasteMaterialIds);
		this.AddMFwastetypeForm.controls['ProductionCapacity'].setValue(ProductionCapacity);
	this.AddMFwastetypeForm.controls['ProductionCapacityUnit'].setValue(ProductionCapacityUnit);

		//this.AddMFwastetypeForm.controls['PreferredDispSystem'].setValue(PreferredDispSystem);
		this.AddMFwastetypeForm.controls['AnnualConsumption'].setValue(AnnualConsumption);
		this.AddMFwastetypeForm.controls['AnnualConsumptionUnitId'].setValue(AnnualConsumptionUnitId);

		this.AddMFwastetypeForm.controls['EPRTarget'].setValue(EPRTarget);
		this.AddMFwastetypeForm.controls['EPRTargetUnit'].setValue(EPRTargetUnit);

		this.AddMFwastetypeForm.controls['FocusStateIds'].setValue(FocusStateIds);
		this.AddMFwastetypeForm.controls['FocusCityIds'].setValue(FocusCityIds);
		this.AddMFwastetypeForm.controls['SuburbId'].setValue(SuburbId);
		this.AddMFwastetypeForm.controls['EngagedwithAnother'].setValue(EngagedwithAnother);

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

		if(RecyclingTypeId.search(",")>=0)
		{
			var FocusRecyclingType=RecyclingTypeId.split(',');
			var SelectedRecyclingType=[];
			for(var i=0;i<FocusRecyclingType.length;i++)
			{
				for(var j=0;j<this.recyclingtypedata.length;j++)
				{
					if(FocusRecyclingType[i]==this.recyclingtypedata[j].RecyclingTypeId)
					{
						SelectedRecyclingType.push(this.recyclingtypedata[j]);
					}
				}
			}
			console.log("Recycling type delete test");
			this.AddMFwastetypeForm.controls['RecyclingTypeId'].setValue(SelectedRecyclingType);
		}

		 /* Start IF else EngagedwithAnotherPRO */
		//  if(EngagedwithAnotherPRO!="")
		//  {
		// 	 this.enableInput=true;
		// 	 this.AddMFwastetypeForm.controls['EngagedwithAnother'].setValue(true);
		// 	 this.AddMFwastetypeForm.controls['EngagedwithAnotherPRO'].setValue(EngagedwithAnotherPRO);
		//  }
		//  else
		//  {
		// 	  this.enableInput=false;
		// 	  this.AddMFwastetypeForm.controls['EngagedwithAnother'].setValue(false);
		// 	 this.AddMFwastetypeForm.controls['EngagedwithAnotherPRO'].setValue('');
		//  }
		  
		 
		 this.mfwastetypereq.WasteMaterialIds=this.g.WasteMaterialIds.value;
		 this.mfwastetypereq.ProductionCapacity=this.g.ProductionCapacity.value;
		// this.mfwastetypereq.ProductionCapacityUnit=this.g.ProductionCapacityUnit.value;
		 //this.mfwastetypereq.PreferredDispSystem=this.g.PreferredDispSystem.value;
		 this.mfwastetypereq.AnnualConsumption=this.g.AnnualConsumption.value;
		 this.mfwastetypereq.AnnualConsumptionUnitId=this.g.AnnualConsumptionUnitId.value;

		 	 //this.mfwastetypereq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		 this.mfwastetypereq.EPRTarget=this.g.EPRTarget.value;
		 this.mfwastetypereq.FocusStateIds=this.g.FocusStateIds.value;
		 this.mfwastetypereq.FocusCityIds=this.g.FocusCityIds.value;
		 this.mfwastetypereq.SuburbId=this.g.SuburbId.value;		
	
		 this.mfwastetypereq.EngagedwithAnother=this.g.EngagedwithAnother.value;
		 

	   this.mfwastetypereq.MFWasteTypeId=MFWasteTypeId;
	  this.mfwastetypereq.PerformBy=localStorage.getItem('UserId');
	  this.mfwastetypereq.Operation=3;
	 
	}
/* Start Recycling Type Multiple select */

  //Get Recycling Type
 
  onItemSelectRecycling(item: any) {
	console.log(item);

	if(this.mfwastetypereq.RecyclingTypeId=="")
	{
		//this.mfwastetypereq.RecyclingTypeId=item.RecyclingType;
		this.mfwastetypereq.RecyclingTypeId=item.RecyclingTypeId;
	}
	else
	{
		//this.mfwastetypereq.RecyclingTypeId+=","+item.RecyclingType;
		this.mfwastetypereq.RecyclingTypeId+=","+item.RecyclingTypeId;
	}
	console.log("individual selected Recycling Type values :" + this.mfwastetypereq.RecyclingTypeId);
  }
 
  onSelectAllRecycling(items: any) {
	console.log(items);
	
	this.mfwastetypereq.RecyclingTypeId="";
	

	for(var i=0; i<items.length;i++)
	{
		if (i==0)
		{
			//this.mfwastetypereq.RecyclingTypeId=items[i].RecyclingType;
			this.mfwastetypereq.RecyclingTypeId=items[i].RecyclingTypeId;
		}
		else
		{
			//this.mfwastetypereq.RecyclingTypeId+=","+items[i].RecyclingType;
			this.mfwastetypereq.RecyclingTypeId+=","+items[i].RecyclingTypeId;
		}
	}
	console.log("selected Recycling  Type values :" + this.mfwastetypereq.RecyclingTypeId);
	
  }
  /*End Recycling Type multiselect*/



}
