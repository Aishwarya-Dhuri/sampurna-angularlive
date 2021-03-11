import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, NavbarService, UserService,ExcelService } from '../_services';

import { FormBuilder, FormGroup, Validators, EmailValidator} from '@angular/forms';
import { DatePipe } from '@angular/common'
declare var jQuery:any; 
@Component({
  selector: 'app-transporter-addvehicle',
  templateUrl: './transporter-addvehicle.component.html',
  styleUrls: ['./transporter-addvehicle.component.css']
})
export class TransporterAddvehicleComponent implements OnInit {

  SignedSelected: boolean;
	TerminatedSelected: boolean;
  public NoneAgreementStatusSelected =true;
  
	public transportreq = {TransporterId:0, TRCode:'', TRName:'', TRAddress:'', TRCityId:'', TRDetails:'', GSTNo:'',AgreementStatusId:0,PrimaryCntName:'',PrimaryCntDesignation:'',PrimaryCntTelNo:'',PrimaryCntLandlineNo:'',PrimaryCntEmail:'',SecCntName:'',SecCntDesignation:'',SecCntTelNo:'',SecCntLandlineNo:'',SecCntEmail:'',ExpiryDate:'', PerformBy:'', Operation:0,CreationDate:'' };
	public Transportdata;
	
	//Data City
	public cityreq = {CityId:0, CityName:'', CityCode:'', PerformBy:'', Operation:0 };
	public citydata;
	
	//state data
	public statemasterreq = {Stateid:0, StateName:'', StateCode:'', PerformBy:'', Operation:0 };
	public statemasterdata;
	
	
	
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
		
	public TransporterFilterreq={TextToSearch:'',CityId:0,TranspoterName:'',AgreementStatusId:0};
	public TodayDateC;
	public TodayDate;
	public DispalayDate;
	public DispalayCreationDate;
	public TranspoterName;
	
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
  TransporterId: any;
  TRName: any;
  


  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,public datepipe: DatePipe,private route: ActivatedRoute,private router: Router,private excelService:ExcelService) {

    this.TransporterId= localStorage.getItem('TransporterId');
		this.TRName= localStorage.getItem('TRName');
		console.log("Transporter Id: " + this.TransporterId);
		console.log("Transporter Name " + this.TRName);


    this.GetCities();
    this.GetTransport();
    this.GetVehicletype();
    this.GetTransportVehicle();
    this.GetTransportroute();
    this.GetVehicle();
     this.GetTransportationStatus();
    // this.DisplayDate();
    // this.GetState();
    //   this.GetStateMappingState();
    this.GetTRNameById();
    //      this.GetTransportationStatus1();


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
        
        if(this.route.snapshot.queryParamMap.get('title')=='true'){
          this.ResetFrom();

          jQuery("#AddVehicales").modal("show");
      
          
        }

  }
  get fd() { return this.TransporterFilterForm.controls; }
  get g() { return this.TransportVehicleForm.controls; }

  ResetFrom(){
		this.TransportVehicleForm.reset();
		this.successmsg = false;
		this.submitted =false;
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
GetVehicle(){
 this.TransportRoutesVehiclereq.TransporterId=this.TransporterId;
 


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

         
       //  jQuery("#myModalalert").modal("show");

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
GetTRNameById()
		{
			this.loading = true;
	        this.userService.GetNamesByCityId({CityId:0,FormName:'Transporters'})
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
 //this.aggregatorreq.Pancard=this.f.Pancard.value;

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

         
         jQuery("#myModalalert").modal("show");
         this.ResetFrom();
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
  
this.TransportRoutesVehiclereq.TransporterId=this.TransporterId;
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
  this.TransportRoutesVehiclereq.TransporterId=this.TransporterId;

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
 
  if (this.TransportVehicleForm.invalid) {
  this.loading = false;
        return;
  
    }
   this.TransportRoutesVehiclereq.TransporterId=this.TransporterId;

 
//this.TransportRoutesVehiclereq.TransporterId=this.TransportRoutesVehiclereq.TransporterId;
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
        this.router.navigate(['/AddVehicle']);

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





}
