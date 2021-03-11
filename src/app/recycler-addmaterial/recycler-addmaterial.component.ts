import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,EmailValidator } from '@angular/forms';
import { AlertService, NavbarService, UserService,ExcelService } from '../_services';

import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
declare var jQuery:any; 
@Component({
  selector: 'app-recycler-addmaterial',
  templateUrl: './recycler-addmaterial.component.html',
  styleUrls: ['./recycler-addmaterial.component.css']
})
export class RecyclerAddmaterialComponent implements OnInit {
  public RecyclerName;
  public RecylerId;
	public ViewDocumentReq;
	public Docreq = {DocumentId :0, FormId :0 ,DocumentTypeId :0 , DocumentName  :'' ,Image  :'' , DocumentDetails :'', UserId :'', Option :'', DocGuid :'Recycler', AutoCode :''};
    public DocumentData;

    dropdownList = [];


    public RCMaterialsreq ={RecyclerMatId:0,RecylerId:0,WasteMaterialId:0,Rate:0, MatUnitId:0, MatUnitName:'',ProcessingTypeId:'', RecylingTypeEndProducts:'',ProcessingTypeName:'', HandlingCapacity:0, HandlingCapacityUnitID:0, HandlingCapacityUnitName:'', MaxATUnitID:0, MinAcceptableTonnage:0,MaxAcceptableTonnage:0, MinATUnitID:0, NonOperationalDays:'', PerformBy:'', PCBStatusId:0,PCBExpiryDate:'', Operation:0}
    public RecyclerMaterialdata;

  //Data state master
  public statemasterreq = {Stateid:0, StateName:'', StateCode:'', PerformBy:'', Operation:0 };
  public statemasterdata;
  public DocStatusReq={ FormId:0,AutoCode:''};
  public DocStatusData;
 
 //city Data
 public cityreq = {CityId:0, CityName:'', CityCode:'', PerformBy:'', Operation:0 };
public citydata;

//Suburb Data
public suburbreq ={SuburbID:0, SuburbName:'', SuburbCode:'', CityId:0,PerformBy:'', Operation:0 };
public suburbdata;

public GetRecyclersSearchreq={TextToSearch:'',RecyclerName:'',AgreementStatusId:0};		
public SearchDataRecyclerData;
//Data status list
  public AgStatusListreq = {StatusId:0, StatusName:'', StatusType:'Aggrement', Comments:'', PerformBy:'', Operation:0 };
  public AggrementStatusdata;

public StatusListreq = {StatusId:0, StatusName:'', StatusType:'Aggrement', Comments:'', PerformBy:'', Operation:0 };
  //public AggrementStatusdata;


 //Data Wastematerial 
 public wastematerailreq = {WasteMatId:0,  WasteMatCode:0, WasteMatName:'', WasteMatDescription:'', PerformBy:'', Operation:0 };
 public wastematerialdata;   
 
  //Data Waste type
public wastetypesreq = {WasteMaterialTypeId:0,  WasteMaterialId:0, WasteTypeName:'', Comments:'', PerformBy:'', Operation:0 };
//public wastetypereqData;


//Data Material
public materialunitreq = {MaterialUnitId:0, MaterialUnit:0, MaterialUnitCode:0, Comments:'', PerformBy:'', Operation:0 };
public materialunitdata;   


//Data Processing
public processingtypereq = {ProcessingTypeId:0, ProcessingType:'', Comments:'', PerformBy:'', Operation:0};
public processingtypedata;
public CheckValidationForDeletereq={FormName:'Recycler',Id:0};
//Recycle ststus
public RecycleStatusListreq = {StatusId:0, StatusName:'', StatusType:'Recycler', Comments:'', PerformBy:'', Operation:0 };
public RecyclerStatusdata;

  
//Data GenerateCode
public GenerateCodeNamereq={InputField:'',FormName:''};
public GenerateCodeNameData;


 ProcessingTypedownSettings={};

 RcMaterialForm:FormGroup;
 submitted = false;
	loading = false;
	successmsg = false;
	public value = 4;
	public DocData;
  errormsg: boolean;
  AlertMessage: any;

  SignedSelected: boolean;
  TerminatedSelected: boolean;
  DispalayDate: any;


  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,public datepipe: DatePipe,private router: Router,private route: ActivatedRoute,) { 
    this.RecylerId= localStorage.getItem('RecylerId');
		this.RecyclerName= localStorage.getItem('RecyclerName');
		console.log("RecylerId" + this.RecylerId);
		console.log("RecyclerName" + this.RecyclerName);
    this.GetWastematerials();

     this.GetMaterialUnit();
     this.GetProcessingtype();
    this.GetRecyclerMaterial();
    this.GetRecyclerStatus();
    this.GetAgreementStatus();
    // this.GetAgreementStatus1();

    // this.GetCities();
    // this.Getsuburb();
    // this.GetState(); 
    // this.GetStateMappingState();
  }

  ngOnInit() {
    this.SignedSelected = false;
		this.TerminatedSelected = false;

   
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


    this.RcMaterialForm = this.formBuilder.group({
      WasteMaterialId: ['', Validators.required],
      Rate: [0, Validators.required],
      MatUnitId: [0, Validators.required],
      ProcessingTypeId: ['', Validators.required],
     HandlingCapacity: [0, Validators.required],
     MaxAcceptableTonnage: [0, Validators.required],
     MinAcceptableTonnage: [0, Validators.required],
     NonOperationalDays: ['', Validators.required],
     RecylingTypeEndProducts: ['', Validators.required],
      PCBStatusId: [0, Validators.required],
      PCBExpiryDate: ['', Validators.required]
            
  });

  this.ProcessingTypedownSettings={
    singleSelection: false,
     idField: 'ProcessingTypeId',
     textField: 'ProcessingType',
     selectAllText: 'Select All',
     unSelectAllText: 'UnSelect All',
 }
 if(this.route.snapshot.queryParamMap.get('title')=='true'){
	this.ResetFrom();
  jQuery("#AddRecyclerWesteMaterial").modal("show");

  
}
  }
	get g() { return this.RcMaterialForm.controls; }

  ResetFrom(){
		
		this.RcMaterialForm.reset();
		this.successmsg = false;
		this.submitted =false;
	
		jQuery("#myModal").modal("hide");
      jQuery("#myModaledit").modal("hide");
      this.SignedSelected=false;
      this.TerminatedSelected=false;
	}
	//Recycle Material Details
  onSubmitRcmaterial() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.RcMaterialForm.invalid) {
        return;
    }

this.RCMaterialsreq.RecylerId=this.RecylerId;
this.RCMaterialsreq.WasteMaterialId=this.g.WasteMaterialId.value;
this.RCMaterialsreq.Rate=this.g.Rate.value;
this.RCMaterialsreq.MatUnitId=this.g.MatUnitId.value;
//this.RCMaterialsreq.ProcessingTypeId=this.g.ProcessingTypeId.value;
this.RCMaterialsreq.HandlingCapacity=this.g.HandlingCapacity.value;
this.RCMaterialsreq.MaxAcceptableTonnage=this.g.MaxAcceptableTonnage.value;
this.RCMaterialsreq.MinAcceptableTonnage=this.g.MinAcceptableTonnage.value;
this.RCMaterialsreq.NonOperationalDays=this.g.NonOperationalDays.value;
this.RCMaterialsreq.RecylingTypeEndProducts=this.g.RecylingTypeEndProducts.value;
this.RCMaterialsreq.PCBStatusId=this.g.PCBStatusId.value;
this.RCMaterialsreq.PCBExpiryDate=this.g.PCBExpiryDate.value;


 this.RCMaterialsreq.RecyclerMatId=0;
this.RCMaterialsreq.PerformBy=localStorage.getItem('UserId');
this.RCMaterialsreq.Operation=1;

  this.AddUpdateDeleteRCMaterial();
}


AddUpdateDeleteRCMaterial(){
		
  this.submitted = true;
   this.loading = true;
   this.successmsg=false;
   
    if (this.RcMaterialForm.invalid) {
    this.loading = false;
          return;
    
      }
  
   
  
  this.RCMaterialsreq.RecylerId=this.RecylerId;
  this.RCMaterialsreq.WasteMaterialId=this.g.WasteMaterialId.value;
  this.RCMaterialsreq.Rate=this.g.Rate.value;
  this.RCMaterialsreq.MatUnitId=this.g.MatUnitId.value;
  //this.RCMaterialsreq.ProcessingTypeId=this.g.ProcessingTypeId.value;
  this.RCMaterialsreq.HandlingCapacity=this.g.HandlingCapacity.value;
  this.RCMaterialsreq.MaxAcceptableTonnage=this.g.MaxAcceptableTonnage.value;
  this.RCMaterialsreq.MinAcceptableTonnage=this.g.MinAcceptableTonnage.value;
  this.RCMaterialsreq.NonOperationalDays=this.g.NonOperationalDays.value;
		this.RCMaterialsreq.RecylingTypeEndProducts=this.g.RecylingTypeEndProducts.value;

     this.RCMaterialsreq.PCBStatusId=this.g.PCBStatusId.value;
     this.RCMaterialsreq.PCBExpiryDate=this.g.PCBExpiryDate.value;

    //  this.RCMaterialsreq.PCBExpiryDate=this.datepipe.transform(this.RCMaterialsreq.PCBExpiryDate, 'yyyy-MM-dd');


  this.RCMaterialsreq.ProcessingTypeId = "";
  for (let i = 0; i < this.g.ProcessingTypeId.value.length; i++) {
    if(this.RCMaterialsreq.ProcessingTypeId == "")
    {
        this.RCMaterialsreq.ProcessingTypeId= this.g.ProcessingTypeId.value[i].ProcessingTypeId.toString() ; 
    }
    else
    {
     this.RCMaterialsreq.ProcessingTypeId= this.RCMaterialsreq.ProcessingTypeId + ',' + this.g.ProcessingTypeId.value[i].ProcessingTypeId.toString() ;  
    }
  }



      this.userService.RCMaterialCRUD(this.RCMaterialsreq)
         //.pipe()
          .subscribe(
              (data:any) => {
        var respData=data;
        if(respData.s==1)
        {
           this.RecyclerMaterialdata=respData.Data;
          // this.alertService.success(''+respData.m, true);
          this.AlertMessage=respData.m;     
               jQuery("#myModaleditMaterial").modal("hide");
          jQuery("#AddRecyclerWesteMaterial").modal("hide");
          jQuery("#myModaleditRecylerMaterial").modal("hide");

          
          
          this.ResetFrom();
          jQuery("#myModalalert").modal("show");
          this.router.navigate(['/Recycler-AddMaterial']);

          
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

EditRecyclerMaterialData(WasteMaterialId,Rate,MatUnitId,ProcessingTypeId,HandlingCapacity,MaxAcceptableTonnage,MinAcceptableTonnage,NonOperationalDays,RecyclerMatId,RecylingTypeEndProducts,PCBStatusId,PCBExpiryDate)
	{
		
		this.successmsg = false;
		this.errormsg=false;
		this.RcMaterialForm.controls['WasteMaterialId'].setValue(WasteMaterialId);
		this.RcMaterialForm.controls['Rate'].setValue(Rate);
		this.RcMaterialForm.controls['MatUnitId'].setValue(MatUnitId);
		this.RcMaterialForm.controls['HandlingCapacity'].setValue(HandlingCapacity);
		this.RcMaterialForm.controls['MaxAcceptableTonnage'].setValue(MaxAcceptableTonnage);
		this.RcMaterialForm.controls['MinAcceptableTonnage'].setValue(MinAcceptableTonnage);
    this.RcMaterialForm.controls['NonOperationalDays'].setValue(NonOperationalDays);
    this.RcMaterialForm.controls['RecylingTypeEndProducts'].setValue(RecylingTypeEndProducts);
	this.RcMaterialForm.controls['PCBStatusId'].setValue(PCBStatusId);
  this.GetPCBStatusValue(PCBStatusId);

  this.DispalayDate= PCBExpiryDate;
  this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');
  this.RCMaterialsreq.PCBExpiryDate=this.DispalayDate;
  this.RcMaterialForm.controls['PCBExpiryDate'].setValue(this.DispalayDate);

		//this.RcMaterialForm.controls['ProcessingTypeId'].setValue(ProcessingTypeId);
		//jQuery("#AddRecyclerWesteMaterial").modal("hide");
		//jQuery("#myModalalert").modal("show");
		this.RCMaterialsreq.ProcessingTypeId='';
				if(ProcessingTypeId.search(",")>=0)
			{
				var FocusProcessingTypeId=ProcessingTypeId.split(',');
				var SelectedProcessingType=[];
				for(var i=0;i<FocusProcessingTypeId.length;i++)
				{

					for(var j=0;j<this.processingtypedata.length;j++)
					{
						if(FocusProcessingTypeId[i]==this.processingtypedata[j].ProcessingTypeId)
						{
							SelectedProcessingType.push(this.processingtypedata[j]);
						}
					}
				}
			
				this.RcMaterialForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType);
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
				this.RcMaterialForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType1);
				this.RCMaterialsreq.ProcessingTypeId=ProcessingTypeId;
			}
	
	
		
		this.RCMaterialsreq.WasteMaterialId=this.g.WasteMaterialId.value;
		this.RCMaterialsreq.Rate=this.g.Rate.value;
		this.RCMaterialsreq.MatUnitId=this.g.MatUnitId.value;
		//this.RCMaterialsreq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		this.RCMaterialsreq.HandlingCapacity=this.g.HandlingCapacity.value;
		this.RCMaterialsreq.MaxAcceptableTonnage=this.g.MaxAcceptableTonnage.value;
		this.RCMaterialsreq.MinAcceptableTonnage=this.g.MinAcceptableTonnage.value;
    this.RCMaterialsreq.NonOperationalDays=this.g.NonOperationalDays.value;
    this.RCMaterialsreq.PCBStatusId=this.g.PCBStatusId.value;

		this.RCMaterialsreq.RecyclerMatId=RecyclerMatId;
		this.RCMaterialsreq.PerformBy=localStorage.getItem('UserId');
		this.RCMaterialsreq.Operation=2;
	
	}
	DeleteRecyclerMaterialData(WasteMaterialId,Rate,MatUnitId,ProcessingTypeId,HandlingCapacity,MaxAcceptableTonnage,MinAcceptableTonnage,NonOperationalDays,RecyclerMatId,RecylingTypeEndProducts,PCBStatusId,PCBExpiryDate)
	{
		
		this.RcMaterialForm.controls['WasteMaterialId'].setValue(WasteMaterialId);
		this.RcMaterialForm.controls['Rate'].setValue(Rate);
		this.RcMaterialForm.controls['MatUnitId'].setValue(MatUnitId);
	//this.RcMaterialForm.controls['ProcessingTypeId'].setValue(ProcessingTypeId);
	this.RcMaterialForm.controls['HandlingCapacity'].setValue(HandlingCapacity);
	this.RcMaterialForm.controls['MaxAcceptableTonnage'].setValue(MaxAcceptableTonnage);
	this.RcMaterialForm.controls['MinAcceptableTonnage'].setValue(MinAcceptableTonnage);
	this.RcMaterialForm.controls['NonOperationalDays'].setValue(NonOperationalDays);
  this.RcMaterialForm.controls['RecylingTypeEndProducts'].setValue(RecylingTypeEndProducts);
    this.RcMaterialForm.controls['PCBStatusId'].setValue(PCBStatusId);
    this.RCMaterialsreq.PCBExpiryDate=this.g.PCBExpiryDate.value;
		 this.DispalayDate= PCBExpiryDate
		this.DispalayDate= this.datepipe.transform(this.DispalayDate, 'yyyy-MM-dd');

	//this.RCMaterialsreq.ProcessingTypeId='';

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
		this.RcMaterialForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType);
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
				this.RcMaterialForm.controls['ProcessingTypeId'].setValue(SelectedProcessingType1);
				this.RCMaterialsreq.ProcessingTypeId=ProcessingTypeId;
			}


		this.RCMaterialsreq.WasteMaterialId=this.g.WasteMaterialId.value;
		this.RCMaterialsreq.Rate=this.g.Rate.value;
		this.RCMaterialsreq.MatUnitId=this.g.MatUnitId.value;
		//this.RCMaterialsreq.ProcessingTypeId=this.g.ProcessingTypeId.value;
		this.RCMaterialsreq.HandlingCapacity=this.g.HandlingCapacity.value;
		this.RCMaterialsreq.MaxAcceptableTonnage=this.g.MaxAcceptableTonnage.value;
		this.RCMaterialsreq.NonOperationalDays=this.g.NonOperationalDays.value;
		this.RCMaterialsreq.MinAcceptableTonnage=this.g.MinAcceptableTonnage.value;
		
		
		
		 
	  this.RCMaterialsreq.RecyclerMatId=RecyclerMatId;
	  this.RCMaterialsreq.PerformBy=localStorage.getItem('UserId');
	  this.RCMaterialsreq.Operation=3;
  }
  


	GetPCBStatusValue(value){
    let  mypcbstatus=this.g.PCBStatusId.value;
    var today = new Date();
    console.log(mypcbstatus);



    if(mypcbstatus != "" && mypcbstatus == 35){
      console.log("Signed PCB STAtus Clicked");
      
     
      this.SignedSelected = true;
      this.TerminatedSelected = false;
      ;
  
   
    }

    else if(mypcbstatus != "" && mypcbstatus == 36){
      console.log("Expired PCB STAtus Clicked");
      
     
      this.SignedSelected = false;
      this.TerminatedSelected = true;
     
   
    }
    else{
      this.SignedSelected = false;
      this.TerminatedSelected = false;
       this.RcMaterialForm.controls['PCBExpiryDate'].setValue(today);
       
    }



  }

DeleteRCMaterial(){
		
  this.submitted = true;
   this.loading = true;
   this.successmsg=false;
   
   
  
   
  
  this.RCMaterialsreq.RecylerId=this.RecylerId;
  this.RCMaterialsreq.WasteMaterialId=this.g.WasteMaterialId.value;
  this.RCMaterialsreq.Rate=this.g.Rate.value;
  this.RCMaterialsreq.MatUnitId=this.g.MatUnitId.value;
  //this.RCMaterialsreq.ProcessingTypeId=this.g.ProcessingTypeId.value;
  this.RCMaterialsreq.HandlingCapacity=this.g.HandlingCapacity.value;
  this.RCMaterialsreq.MaxAcceptableTonnage=this.g.MaxAcceptableTonnage.value;
  this.RCMaterialsreq.MinAcceptableTonnage=this.g.MinAcceptableTonnage.value;
  this.RCMaterialsreq.NonOperationalDays=this.g.NonOperationalDays.value;
  
      this.userService.RCMaterialCRUD(this.RCMaterialsreq)
         //.pipe()
          .subscribe(
              (data:any) => {
        var respData=data;
        if(respData.s==1)
        {
           this.RecyclerMaterialdata=respData.Data;
           this.AlertMessage=respData.m;     

          // this.alertService.success(''+respData.m, true);
          jQuery("#myModaleditMaterial").modal("hide");
          jQuery("#AddRecyclerWesteMaterial").modal("hide");
          jQuery("#myModaleditRecylerMaterial").modal("hide");

          
          
          this.ResetFrom();
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
GetRecyclerMaterial(){
		 
  this.RCMaterialsreq.Operation=0; 
  this.RCMaterialsreq.RecylerId=this.RecylerId;
  
   this.loading = true;
      this.userService.RCMaterialCRUD(this.RCMaterialsreq)
         .pipe()
          .subscribe(
              (data:any) => {
        var respData=data;
        if(respData.s == 1)
        {
           this.RecyclerMaterialdata=respData.Data;
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
GetRecyclerStatus(){
	  
  this.loading = true;
     this.userService.StatusListCRUD(this.RecycleStatusListreq)
        .pipe()
         .subscribe(
             (data:any) => {
       var respData=data;
       if(respData.s == 1)
       {
          this.RecyclerStatusdata=respData.Data;
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
}
