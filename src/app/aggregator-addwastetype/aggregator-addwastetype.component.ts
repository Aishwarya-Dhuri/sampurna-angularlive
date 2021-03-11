import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,EmailValidator } from '@angular/forms';
import { AlertService, NavbarService, UserService,ExcelService } from '../_services';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
declare var jQuery:any; 
@Component({
  selector: 'app-aggregator-addwastetype',
  templateUrl: './aggregator-addwastetype.component.html',
  styleUrls: ['./aggregator-addwastetype.component.css']
})
export class AggregatorAddwastetypeComponent implements OnInit {
	public AlertMessage;
	base64string:any;

  public processingtypedata1;
	dropdownList = [];
  ProcessingTypedownSettings={};

  UserId=localStorage.getItem('UserId');
  public value = 12;
	public DocData;
	//public DocStatusReq={ FormId:0,AutoCode:''};
	public DocStatusReq={ FormId:0,AutoCode:''};
	public DocStatusData;
public ViewDocumentReq;
  public Docreq = {DocumentId :0, FormId :0 ,DocumentTypeId :0 , DocumentName  :'' ,Image  :'' , DocumentDetails :'', UserId :'', Option :'', DocGuid :'AGWasteType', AutoCode :'',AGWCode:'' };
  public DocumentData;
  DocUploadForm : FormGroup;
  public GetNamesByCityIdreq={FormName:'Aggregators',CityId:0};
		public aggregatorreq = {AggregatorId:0, AGCode:'', AGName:'', Address:'',AGDetails:'',GSTNo:'',AgreementStatusId:0,ExpiryDate:'',PrimaryCntName:'',PrimaryCntDesignation:'',PrimaryCntTelNo:'',PrimaryCntLandlineNo:'',PrimaryCntEmail:'',SecCntName:'',SecCntDesignation:'',SecCntTelNo:'',SecCntLandlineNo:'',SecCntEmail:'',StateId:0,CityId:0,SuburbId:0,Pancard:'',PerformBy:'', Operation:0,CreationDate:'',SignedDate:'' };
		public CheckValidationForDeletereq={FormName:'Aggregators',Id:0};
	public aggregatordata;
	 
	 //Aggregator Waste Type
	 public AGWasteTypesreq = {AGWasteTypeId:0, AggregatorId:0, WasteMaterialFormId:0,WasteMaterialId:0,WasteMaterialTypeId:0,HandlingCapacity:0,HandlingCapacityMatUnitID:0,PrimaryCntName:'',PrimaryCntEmail:'',PrimaryCntTelNo:'',OperatingCities:'',OperatingSuburbs:'',ProcessingTypeId:'',CurrentRecylRates:0,PerformBy:'', Operation:0,StateId:0 ,AGWCode:'' ,Address:''  };
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

    AgWastetypeForm:FormGroup;
  loading: boolean;
  successmsg: boolean;
  submitted: boolean;
	AggregatorId: any;
	AGName: any;

	public Aggregatorname;
	AGNameList:any;
	AggrementStatusdata1:any;
	citydata1:any;
	errormsg: boolean;
  constructor(private formBuilder: FormBuilder,
    public nav: NavbarService,
    private userService: UserService, 
    private alertService : AlertService,
    public datepipe: DatePipe,private route: ActivatedRoute,
    private router: Router,private excelService:ExcelService) { 

		this.AggregatorId= localStorage.getItem('AggregatorID');
		this.AGName= localStorage.getItem('AggregatorName');
		console.log("Aggregator Id: " + this.AggregatorId);
		console.log("Aggregator Name " + this.AGName);
		this.GetAggregator();
		this.GetWastematerials();

		this.GetAGNameById();
		this.GetProcessingtype();
		this.GetMaterialUnit();
		this.GetStateMappingState();
		this.GetAgreementStatus();
		this.GetWasteMaterialform();
		this.GetDocTypesByFormId(this.value);
		this.GetAggregatorWasteType();
		this.GetStateMappingStateAgForm(this.value);
		this.GetState(); 

	}
	
	//AgWastetypeForm AddData
	// GetAggregatorId(AggregatorId,AGName)
	// {		 
	// 	this.Aggregatorname=AGName;
	//   this.aggregatorreq.AggregatorId=AggregatorId;
	//  this.GetAggregatorWasteType();
	// }

	
  ngOnInit() {

    var token=localStorage.getItem('Token');
	  console.log("Token: " + token); 

	//   this.AggregatorId= localStorage.getItem('AggregatorId');
	//   this.AGName= localStorage.getItem('AGName');
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
	  	//Aggregator waste Type
		this.AgWastetypeForm=this.formBuilder.group({
			//  WasteMaterialFormId: ['', Validators.required],
		
			//WasteMaterialTypeId: [0, Validators.required],
		
			AGWCode :[''],
			WasteMaterialId: [0, Validators.required],
			HandlingCapacity: [0, Validators.required],
			HandlingCapacityMatUnitID: [0, Validators.required],
			PrimaryCntName: ['', Validators.required],
			PrimaryCntEmail: ['', [Validators.required,EmailValidator]],
			PrimaryCntTelNo: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]+')]],
			OperatingCities: ['',Validators.required],
			OperatingSuburbs: [''],
			ProcessingTypeId: ['', Validators.required],
			CurrentRecylRates: [''],
			StateId:['', Validators.required],
			Address: ['', Validators.required]

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
    
	if(this.route.snapshot.queryParamMap.get('title')=='true'){
		this.AgWastetypeForm.reset();
		jQuery("#addtypeweste").modal("show");

		
	}
    this.ProcessingTypedownSettings= {
      singleSelection: false,
      idField: 'ProcessingTypeId',
      textField: 'ProcessingType',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };	


  }
  get d() { return this.DocUploadForm.controls; }
  GenerateWasteMaterialCode(value)
  {
	
	  console.log("AG CODe :"+value.substring(0,4));
	  this.GenerateCodeNamereq.InputField= this.AGName.substring(0,3)+value.substring(0,3);
	  this.GenerateCodeNamereq.FormName='AGWasteType';
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
				   this.AgWastetypeForm.controls['AGWCode'].setValue(respData.Data);
				   //this.alertService.success(''+ respData.m, true);
					this.ViewDocument(this.ViewDocumentReq);
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

ResetFrom(){
  this.AgWastetypeForm.reset();
		this.DocumentData=undefined;

	this.AGWasteTypesreq.OperatingCities='';
	this.AGWasteTypesreq.OperatingSuburbs='';
	jQuery("#myModal").modal("hide");
		jQuery("#myModaledit").modal("hide");
		jQuery("#addtypeweste").modal("hide");
		jQuery("#myModaledittypeofweste").modal("hide")
  this.AGWasteTypesreq.ProcessingTypeId='';
  this.submitted = false;
  this.citydata=undefined;

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
	

	this.AGWasteTypesreq.AGWCode=this.g.AGWCode.value;
	
this.AGWasteTypesreq.StateId=this.g.StateId.value;
this.AGWasteTypesreq.AggregatorId=this.aggregatorreq.AggregatorId;
this.AGWasteTypesreq.WasteMaterialId=this.g.WasteMaterialId.value;
this.AGWasteTypesreq.HandlingCapacity=this.g.HandlingCapacity.value;
this.AGWasteTypesreq.HandlingCapacityMatUnitID=this.g.HandlingCapacityMatUnitID.value;
this.AGWasteTypesreq.PrimaryCntName=this.g.PrimaryCntName.value;
this.AGWasteTypesreq.PrimaryCntTelNo=this.g.PrimaryCntTelNo.value;
this.AGWasteTypesreq.PrimaryCntEmail=this.g.PrimaryCntEmail.value;
this.AGWasteTypesreq.OperatingCities=this.g.OperatingCities.value;
this.AGWasteTypesreq.OperatingSuburbs=this.g.OperatingSuburbs.value;
//this.AGWasteTypesreq.ProcessingTypeId=this.g.ProcessingTypeId.value;
this.AGWasteTypesreq.CurrentRecylRates=this.g.CurrentRecylRates.value;
this.AGWasteTypesreq.Address=this.g.Address.value;

//this.AGWasteTypesreq.WasteMaterialFormId =this.g.WasteMaterialFormId.value;

this.AGWasteTypesreq.AGWasteTypeId=0;
this.AGWasteTypesreq.PerformBy=localStorage.getItem('UserId');
this.AGWasteTypesreq.Operation=1;

  this.AddUpdateDeleteAgWastetype();  


}

	//Aggregator waste type form cRUD OPERTAION 
	
	EditAGWasteTypeData(WasteMaterialId,HandlingCapacity,HandlingCapacityMatUnitID,PrimaryCntName,PrimaryCntTelNo,PrimaryCntEmail,OperatingCities,OperatingSuburbs,ProcessingTypeId,CurrentRecylRates,AGWasteTypeId,StateId,AGWCode,Address)
	{
		this.GetStateMappingStateAgForm(StateId);
		this.successmsg = false;
		this.errormsg=false;	

		this.ViewDocumentReq=AGWCode;

		// this.Docreq.AutoCode = AGWCode;
		 this.ViewDocument(this.ViewDocumentReq);
		this.AgWastetypeForm.controls['AGWCode'].setValue(AGWCode);

		 this.AgWastetypeForm.controls['WasteMaterialId'].setValue(WasteMaterialId);
		this.AgWastetypeForm.controls['HandlingCapacity'].setValue(HandlingCapacity);
		this.AgWastetypeForm.controls['HandlingCapacityMatUnitID'].setValue(HandlingCapacityMatUnitID);
		this.AgWastetypeForm.controls['PrimaryCntName'].setValue(PrimaryCntName);
		this.AgWastetypeForm.controls['PrimaryCntTelNo'].setValue(PrimaryCntTelNo);
		this.AgWastetypeForm.controls['PrimaryCntEmail'].setValue(PrimaryCntEmail);
		this.AgWastetypeForm.controls['StateId'].setValue(StateId);
		this.AgWastetypeForm.controls['Address'].setValue(Address);

		this.AgWastetypeForm.controls['OperatingCities'].setValue(OperatingCities);
		this.AgWastetypeForm.controls['OperatingSuburbs'].setValue(OperatingSuburbs);
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
		
			this.getAgFromsuburboncityId1(OperatingCities);
		
		this.AGWasteTypesreq.AGWCode=this.g.AGWCode.value;
		this.AGWasteTypesreq.Address=this.g.Address.value;

		 this.AGWasteTypesreq.WasteMaterialId=this.g.WasteMaterialId.value;
		 this.AGWasteTypesreq.HandlingCapacity=this.g.HandlingCapacity.value;
		 this.AGWasteTypesreq.HandlingCapacityMatUnitID=this.g.HandlingCapacityMatUnitID.value;
		 this.AGWasteTypesreq.PrimaryCntName=this.g.PrimaryCntName.value;
		 this.AGWasteTypesreq.PrimaryCntTelNo=this.g.PrimaryCntTelNo.value;
		 this.AGWasteTypesreq.PrimaryCntEmail=this.g.PrimaryCntEmail.value;
		 // this.AGWasteTypesreq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		 this.AGWasteTypesreq.CurrentRecylRates=this.g.CurrentRecylRates.value;
		 this.AGWasteTypesreq.StateId=this.g.StateId.value;
		
		 this.AGWasteTypesreq.OperatingCities=this.g.OperatingCities.value;
		 
		 this.AGWasteTypesreq.OperatingSuburbs=this.g.OperatingSuburbs.value;
		 this.AGWasteTypesreq.AGWasteTypeId=AGWasteTypeId;
		 this.AGWasteTypesreq.PerformBy=localStorage.getItem('UserId');
		 this.AGWasteTypesreq.Operation=2;
		this.getAgFromsuburboncityId1(OperatingCities);

	}
	
	
	DeleteAGWasteTypeData(WasteMaterialId,HandlingCapacity,HandlingCapacityMatUnitID,PrimaryCntName,PrimaryCntTelNo,PrimaryCntEmail,OperatingCities,OperatingSuburbs,ProcessingTypeId,CurrentRecylRates,AGWasteTypeId,StateId,AGWCode,Address)
	{
		
		this.successmsg = false;
		this.AgWastetypeForm.controls['WasteMaterialId'].setValue(WasteMaterialId);
		this.AgWastetypeForm.controls['HandlingCapacity'].setValue(HandlingCapacity);
		this.AgWastetypeForm.controls['HandlingCapacityMatUnitID'].setValue(HandlingCapacityMatUnitID);
		this.AgWastetypeForm.controls['PrimaryCntName'].setValue(PrimaryCntName);
		this.AgWastetypeForm.controls['PrimaryCntTelNo'].setValue(PrimaryCntTelNo);
		this.AgWastetypeForm.controls['PrimaryCntEmail'].setValue(PrimaryCntEmail);
		this.AgWastetypeForm.controls['StateId'].setValue(StateId);
		this.AgWastetypeForm.controls['Address'].setValue(Address);

		this.AgWastetypeForm.controls['OperatingCities'].setValue(OperatingCities);
		this.AgWastetypeForm.controls['OperatingSuburbs'].setValue(OperatingSuburbs);
	
		this.AgWastetypeForm.controls['AGWCode'].setValue(AGWCode);
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
		 this.AGWasteTypesreq.Address=this.g.Address.value;

		this.AGWasteTypesreq.AGWCode=this.g.AGWCode.value;
	     this.AGWasteTypesreq.AGWasteTypeId=AGWasteTypeId;
	     this.AGWasteTypesreq.PerformBy=localStorage.getItem('UserId');
	     this.AGWasteTypesreq.Operation=3;
	}
	
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
	
	GetAggregatorWasteType(){
	this.AGWasteTypesreq.Operation=0;
	 //this.AGWasteTypesreq.AggregatorId=this.aggregatorreq.AggregatorId;
	 this.AGWasteTypesreq.AggregatorId=this.AggregatorId;
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
						// this.AgWastetypeForm.controls['OperatingCities'].setValue(this.citydata[0].OperatingCities);
						 //this.g.controls['OperatingCities'].setvalue(this.citydata[0].CityId);
						 //this.AggregatorForm.controls['CityId'].setValue(this.citydata[0].CityId);
						 
						 
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

  //this.AGWasteTypesreq.AggregatorId=this.aggregatorreq.AggregatorId;
  this.AGWasteTypesreq.AggregatorId=this.AggregatorId;
  this.AGWasteTypesreq.AGWCode=this.g.AGWCode.value;
  this.AGWasteTypesreq.Address=this.g.Address.value;

  this.AGWasteTypesreq.WasteMaterialId=this.g.WasteMaterialId.value;
  this.AGWasteTypesreq.HandlingCapacity=this.g.HandlingCapacity.value;
  this.AGWasteTypesreq.HandlingCapacityMatUnitID=this.g.HandlingCapacityMatUnitID.value;
  this.AGWasteTypesreq.PrimaryCntName=this.g.PrimaryCntName.value;
  this.AGWasteTypesreq.PrimaryCntTelNo=this.g.PrimaryCntTelNo.value;
  this.AGWasteTypesreq.PrimaryCntEmail=this.g.PrimaryCntEmail.value;
//		this.AGWasteTypesreq.WasteMaterialFormId=this.g.WasteMaterialFormId.value;
this.AGWasteTypesreq.StateId=this.g.StateId.value;

  this.AGWasteTypesreq.OperatingCities=this.g.OperatingCities.value;
  this.AGWasteTypesreq.OperatingSuburbs=this.g.OperatingSuburbs.value;
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
		   this.router.navigate(['/Aggregator-addwastetype']);

           
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

  get g() { return this.AgWastetypeForm.controls; }


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
	  
	  //this.Docreq.AutoCode=this.g.AGCode.value;
	  this.Docreq.AutoCode=this.g.AGWCode.value;
	  this.Docreq.DocumentTypeId=this.d.DocumentTypeId.value;
	  this.Docreq.DocumentName=this.d.DocumentName.value;
	  this.Docreq.DocumentDetails=this.d.DocumentDetails.value;
	  this.Docreq.FormId=this.value;
	  this.Docreq.Image=this.base64string;
	  this.Docreq.DocGuid='AGWasteType';
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

		//this.Docreq.AutoCode=this.g.AGWCode.value;
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
ValidateDocStatus()
{
	this.DocStatusReq.FormId=this.value;
	this.DocStatusReq.AutoCode=this.g.AGWCode.value;
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
						 //this.AddUpdateDeleteAggregator(); 
						 this.AddUpdateDeleteAgWastetype();
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
				this.AddUpdateDeleteAgWastetype(); 
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

