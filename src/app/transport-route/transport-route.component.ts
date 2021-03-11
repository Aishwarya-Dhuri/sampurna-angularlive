import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, NavbarService, UserService } from '../_services';
declare var jQuery:any;
@Component({
  selector: 'app-transport-route',
  templateUrl: './transport-route.component.html',
  styleUrls: ['./transport-route.component.css']
})
export class TransportRouteComponent implements OnInit {
	public GenerateCodeNamereq={InputField:'',FormName:''}; 
public statemasterreq = {Stateid:0, StateName:'', StateCode:'', PerformBy:'', Operation:0 };
	public statemasterdata;
	
	public transportroutereq = {TransportRouteId:0,TransportRouteName:'', FromCityId:0, FromSuburbId:0, ToCityId:0, ToSuburbId:0,ViaCityId:0, ViaSuburbId:0, Comments:'', PerformBy:'', Operation:0,TransporterCode:'',FromStateId:0,ToStateId:0 };
	public transportdata;
	public AlertMessage;
	 submitted = false;
	TransportForm:FormGroup;
	
	public ToCity;
	public FromCity;
	public ToSuburb;
	public FromSuburb;
	public ViaCity;
	
	
	public suburbreq = {SuburbId:0, SuburbName:'', SuburbCode:'', CityId:0, PerformBy:'', Operation:0 };
	public suburbdata;

	public cityreq = {CityId:0, CityName:'', CityCode:'', PerformBy:'', Operation:0 };
	
	public citydata;
	public Fromsuburbdata;
	public Tosuburbdata;
	public Viasuburbdata;
	successmsg = false;
	
	
	
	loading = false;
	ViaSuburb: any;
	fromcitydata: any;
	tocitydata: any;
	tosuburbdata: any;
	fromsuburbdata: any;
	tocity1: any;
	fromsuburb: any;
	Viasuburb: string;
  constructor(private formBuilder: FormBuilder, public nav: NavbarService, private userService: UserService, private alertService : AlertService,private router: Router)
  { 
	 this.GetTransportroute();
	//	this.GetCities();
		this.getTosuburboncityId('0');
		this.getFromsuburboncityId('0');
		this.getViasuburboncityId('0');
		this.getViasuburboncityId('0');
		this.GetStateMappingState();
		this.GetState();

  }

  ngOnInit() {
	  	 // this.nav.show();
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
		  this.TransportForm = this.formBuilder.group({
             TransportRouteName: [''],
             FromCityId: ['', Validators.required],
             FromSuburbId: ['', Validators.required],
             ToCityId: ['', Validators.required],
             ToSuburbId: ['', Validators.required],
             ViaCityId: [0],
             ViaSuburbId: [0],
             Comments: [''],
			 TransporterCode:[''],
			 FromStateId:[''],
			 ToStateId:['']
			            
        });	
  }
    ResetFrom(){
this.TransportForm.reset();
this.successmsg = false;
		this.submitted =false;
		this.citydata =undefined;
		this.tocitydata=undefined;
		this.tosuburbdata=undefined;
}

  onSubmit() {
       this.submitted = true;

        // stop here if form is invalid
        if (this.TransportForm.invalid) {
            return;
        }
		
	  this.transportroutereq.TransportRouteName=this.f.TransportRouteName.value;
	  this.transportroutereq.FromCityId=this.f.FromCityId.value;
	  this.transportroutereq.FromSuburbId=this.f.FromSuburbId.value;
	  this.transportroutereq.ToCityId=this.f.ToCityId.value;
	  this.transportroutereq.ToSuburbId=this.f.ToSuburbId.value;
	  this.transportroutereq.ViaCityId=this.f.ViaCityId.value;
	  this.transportroutereq.ViaSuburbId=this.f.ViaSuburbId.value;
	  this.transportroutereq.Comments=this.f.Comments.value;
	  this.transportroutereq.FromStateId=this.f.FromStateId.value;
	  this.transportroutereq.ToStateId=this.f.ToStateId.value;
	  this.transportroutereq.TransporterCode=this.f.TransporterCode.value;
	  
	  this.transportroutereq.TransportRouteId=0;
	  this.transportroutereq.PerformBy=localStorage.getItem('UserId');
	  this.transportroutereq.Operation=1;
	 
      this.AddUpdateDeleteTransportRoute();
    }
	
	
	EditTransportrouteData(TransportRouteName,FromCityId,FromSuburbId,ToCityId,ToSuburbId,ViaCityId,ViaSuburbId,Comments,TransportRouteId,FromStateId,ToStateId,TransporterCode)
	{
		this.successmsg=false;
		this.TransportForm.controls['TransportRouteName'].setValue(TransportRouteName);
		this.TransportForm.controls['FromCityId'].setValue(FromCityId);
		this.TransportForm.controls['FromSuburbId'].setValue(FromSuburbId);
		this.TransportForm.controls['ToCityId'].setValue(ToCityId);
		this.TransportForm.controls['ToSuburbId'].setValue(ToSuburbId);
		this.TransportForm.controls['ViaCityId'].setValue(ViaCityId);
		this.TransportForm.controls['ViaSuburbId'].setValue(ViaSuburbId);
		this.TransportForm.controls['Comments'].setValue(Comments);
		this.TransportForm.controls['FromStateId'].setValue(FromStateId);
		this.TransportForm.controls['ToStateId'].setValue(ToStateId);
		this.TransportForm.controls['TransporterCode'].setValue(TransporterCode);
		this.transportroutereq.FromStateId=this.f.FromStateId.value;
	  this.transportroutereq.ToStateId=this.f.ToStateId.value;
	  this.transportroutereq.TransporterCode=this.f.TransporterCode.value;
		 this.transportroutereq.FromCityId=this.f.FromCityId.value;
		 this.transportroutereq.FromSuburbId=this.f.FromSuburbId.value;
		 this.transportroutereq.ToCityId=this.f.ToCityId.value;
		 this.transportroutereq.ToSuburbId=this.f.ToSuburbId.value;
		 this.transportroutereq.ViaCityId=this.f.ViaCityId.value;
		 this.transportroutereq.ViaSuburbId=this.f.ViaSuburbId.value;
		 this.transportroutereq.Comments=this.f.Comments.value;
		 
		 
	  this.transportroutereq.TransportRouteId=TransportRouteId;
	  this.transportroutereq.PerformBy=localStorage.getItem('UserId');
	  this.transportroutereq.Operation=2;
	}
	
	DeleteTransportrouteData(TransportRouteName,FromCityId,FromSuburbId,ToCityId,ToSuburbId,ViaCityId,ViaSuburbId,Comments,TransportRouteId)
	{
		this.TransportForm.controls['TransportRouteName'].setValue(TransportRouteName);
		this.TransportForm.controls['FromCityId'].setValue(FromCityId);
		this.TransportForm.controls['FromSuburbId'].setValue(FromSuburbId);
		this.TransportForm.controls['ToCityId'].setValue(ToCityId);
		this.TransportForm.controls['ToSuburbId'].setValue(ToSuburbId);
		this.TransportForm.controls['ViaCityId'].setValue(ViaCityId);
		this.TransportForm.controls['ViaSuburbId'].setValue(ViaSuburbId);
		this.TransportForm.controls['Comments'].setValue(Comments);
		
		 this.transportroutereq.FromCityId=this.f.FromCityId.value;
		 this.transportroutereq.FromSuburbId=this.f.FromSuburbId.value;
		 this.transportroutereq.ToCityId=this.f.ToCityId.value;
		 this.transportroutereq.ToSuburbId=this.f.ToSuburbId.value;
		 this.transportroutereq.ViaCityId=this.f.ViaCityId.value;
		 this.transportroutereq.ViaSuburbId=this.f.ViaSuburbId.value;
		 this.transportroutereq.Comments=this.f.Comments.value;
		 
		 
	  this.transportroutereq.TransportRouteId=TransportRouteId;
	  this.transportroutereq.PerformBy=localStorage.getItem('UserId');
	  this.transportroutereq.Operation=3;
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
						 this.transportdata=respData.Data;
					
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
	
	GetCities(){
	  
		 this.loading = true;
        this.userService.CityCRUD(this.transportroutereq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.citydata=respData.Data;
						// this.alertService.success('City added successfuly', true);
						// this.router.navigate(['/city']);
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
	
	
	
	
	getTosuburboncityId(value){
	  
	  this.suburbreq = {SuburbId:0, SuburbName:'', SuburbCode:'', CityId:value, PerformBy:'', Operation:0 };
		 this.loading = true;
        this.userService.SuburbCRUD(this.suburbreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.Tosuburbdata=respData.Data;
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
	
	get f() { return this.TransportForm.controls; }
	
	getFromsuburboncityId(value){
	  
	  this.suburbreq = {SuburbId:0, SuburbName:'', SuburbCode:'', CityId:value, PerformBy:'', Operation:0 };
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
						this.alertService.success(''+ respData.m, true);
						
					} 
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
	}
	getFromsuburboncityId1(value){
		this.suburbreq = {SuburbId:0, SuburbName:'', SuburbCode:'', CityId:value, PerformBy:'', Operation:0 };

		this.loading = true;
		this.userService.SuburbCRUD(this.suburbreq)
		   .pipe()
			.subscribe(
				(data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						this.fromsuburbdata=respData.Data;

						// this.Fromsuburbdata=respData.Data;
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

	getFromsuburboncityId2(value){
		this.suburbreq = {SuburbId:0, SuburbName:'', SuburbCode:'', CityId:value, PerformBy:'', Operation:0 };

		this.loading = true;
		this.userService.SuburbCRUD(this.suburbreq)
		   .pipe()
			.subscribe(
				(data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						this.tosuburbdata=respData.Data;

						// this.Fromsuburbdata=respData.Data;
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



		GetStateMappingStateTRRoute(value){
			this.loading = true;
			this.userService.GetCitiesByStateIdCRUD({StateId:value})
			   .pipe()
				.subscribe(
					(data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							this.fromcitydata=respData.Data;
							this.TransportForm.controls['FromCityId'].setValue(this.fromcitydata[0].CityId);
						//	this.TransportForm.controls['ToCityId'].setValue('');
							this.TransportForm.controls['ViaCityId'].setValue(0);
							
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

		GetStateMappingStateTRRoute1(value){
			this.loading = true;
			this.userService.GetCitiesByStateIdCRUD({StateId:value})
			   .pipe()
				.subscribe(
					(data:any) => {
						var respData=data;
						if(respData.s == 1)
						{
							this.tocitydata=respData.Data;
						

							this.TransportForm.controls['ToCityId'].setValue(this.tocitydata[0].CityId);
							//this.TransportForm.controls['FromCityId'].setValue('');
							//this.TransportForm.controls['ViaCityId'].setValue('');

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
	
	getViasuburboncityId(value){
	  
	  this.suburbreq = {SuburbId:0, SuburbName:'', SuburbCode:'', CityId:value, PerformBy:'', Operation:0 };
		 this.loading = true;
        this.userService.SuburbCRUD(this.suburbreq)
           .pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s == 1)
					{
						 this.Viasuburbdata=respData.Data;
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
	
	
	
	AddUpdateDeleteTransportRoute(){
		
	this.submitted = true;
		 this.loading = true;
		 this.successmsg=false;
		 
		  if (this.TransportForm.invalid) {
			this.loading = false;
            return;
			
        }
		
		this.transportroutereq.FromStateId=this.f.FromStateId.value;
	  this.transportroutereq.ToStateId=this.f.ToStateId.value;
	  this.transportroutereq.TransporterCode=this.f.TransporterCode.value;
		this.transportroutereq.TransportRouteName=this.f.TransportRouteName.value;
		this.transportroutereq.FromCityId=this.f.FromCityId.value;
		this.transportroutereq.FromSuburbId=this.f.FromSuburbId.value;
		this.transportroutereq.ToCityId=this.f.ToCityId.value;
		this.transportroutereq.ToSuburbId=this.f.ToSuburbId.value;
		this.transportroutereq.ViaCityId=this.f.ViaCityId.value;
		this.transportroutereq.ViaSuburbId=this.f.ViaSuburbId.value;
		this.transportroutereq.Comments=this.f.Comments.value;
		if(this.transportroutereq.TransportRouteName == null){
			this.transportroutereq.TransportRouteName = '';
		}
		else{
			this.transportroutereq.TransportRouteName=this.f.TransportRouteName.value;
		}

		if(this.transportroutereq.ViaCityId == 0){
			this.transportroutereq.ViaCityId = 0;
		}
		else{
			this.transportroutereq.ViaCityId=this.f.ViaCityId.value;
		}


		if(this.transportroutereq.ViaSuburbId == null){
			this.transportroutereq.ViaSuburbId = 0;
		}
		else{
			this.transportroutereq.ViaSuburbId=this.f.ViaSuburbId.value;
		}

        this.userService.transportroutecrudCRUD(this.transportroutereq)
           //.pipe()
            .subscribe(
                (data:any) => {
					var respData=data;
					if(respData.s==1)
					{
						 this.transportdata=respData.Data;
						 this.alertService.success(''+respData.m, true);

						 this.AlertMessage=respData.m;
						// this.alertService.success(''+respData.m, true);
						 jQuery("#myModal").modal("hide");
						 jQuery("#myModaledit").modal("hide");
						  jQuery("#myModalalert").modal("show");

						 // this.TransportForm.controls['FromCityId'].setValue('');
						 // this.TransportForm.controls['FromSuburbId'].setValue('');
						 // this.TransportForm.controls['ToCityId'].setValue('');
						 // this.TransportForm.controls['ToSuburbId'].setValue('');
						 // this.TransportForm.controls['ViaCityId'].setValue('');
						 // this.TransportForm.controls['ViaSuburbId'].setValue('');
					}
					else{
						this.alertService.success(''+ respData.m, true);
						this.AlertMessage=respData.m;
						// this.alertService.success(''+respData.m, true);
						 jQuery("#myModal").modal("show");
						 jQuery("#myModaledit").modal("show");
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
	
	OnChangeFromCity(value)
	{
		
		const result = this.fromcitydata.find( a => a.CityId === parseInt(value) );
		console.log("WO Value result :"+result.CityName);
		
		this.FromCity=result.CityName.substring(0,3) ;
		
	}
	
	OnChangeToCity(value)
	{
		
		const result = this.tocitydata.find( a => a.CityId === parseInt(value) );
		console.log("WO Value result :"+result.CityName);
		
		this.ToCity=result.CityName.substring(0,3) ;
		
	}
	OnChangeFromSuburb(value)
	{
		
		const result = this.Fromsuburbdata.find( a => a.SuburbId === parseInt(value) );
		console.log("WO Value result :"+result.SuburbName);
		
		this.FromSuburb=result.SuburbName.substring(0,3) ;
		
	}
	OnChangeToSuburb(value)
	{
		
		const result = this.Tosuburbdata.find( a => a.SuburbId === parseInt(value) );
		console.log("WO Value result :"+result.SuburbName);
		
		this.ToSuburb=result.SuburbName.substring(0,3) ;
		
	}
	
	OnChangeViaCity(value)
	{
		
		const result = this.citydata.find( a => a.CityId === parseInt(value) );
		console.log("WO Value result :"+result.CityName);
		
		this.ViaCity=result.CityName.substring(0,3) ;
		
	}
	OnChangeViaSuburb(value)
	{
		
		const result = this.Viasuburbdata.find( a => a.SuburbId === parseInt(value) );
		console.log("Via Subrub result :"+result.SuburbName);
		
		this.ViaSuburb=result.SuburbName.substring(0,3) ;
		
	}
		GenerateTransportRoutesCode()
	{

		const fromcity = this.fromcitydata.find( a => a.CityId === parseInt(this.f.FromCityId.value) );
		this.FromCity = fromcity.CityName;


		const fromsuburb  = this.fromsuburbdata.find( a => a.SuburbId === parseInt(this.f.FromSuburbId.value) );
		this.fromsuburb = fromsuburb.SuburbName;

		//const ViaCity = this.fromcitydata.find( a => a.CityId === parseInt(this.f.ViaCityId.value) );
		this.ViaCity = 'XXX';

		//const Viasuburb  = this.tosuburbdata.find( a => a.SuburbId === parseInt(this.f.ViaSuburbId.value) );
		this.ViaSuburb = 'XXX';


		const tocity1 = this.tocitydata.find( a => a.CityId === parseInt(this.f.ToCityId.value) );
		this.tocity1 = tocity1.CityName;

		const tosuburb  = this.Tosuburbdata.find( a => a.SuburbId === parseInt(this.f.ToSuburbId.value) );
		this.ToSuburb = tosuburb.SuburbName;
		
		
		this.GenerateCodeNamereq.InputField=this.FromCity.substring(0,3) + this.fromsuburb.substring(0,3) + this.ViaCity.substring(0,3) + this.ViaSuburb.substring(0,3) + this.tocity1.substring(0,3)  + this.ToSuburb.substring(0,3);


		this.GenerateCodeNamereq.FormName='TransportRoutes';
		this.GetGenerateCode();	
		console.log("WO Value result :"+this.GenerateCodeNamereq.InputField);
	}


	GenerateTransportRoutesCodeViaCity()
	{

		const fromcity = this.fromcitydata.find( a => a.CityId === parseInt(this.f.FromCityId.value) );
		this.FromCity = fromcity.CityName;


		const fromsuburb  = this.fromsuburbdata.find( a => a.SuburbId === parseInt(this.f.FromSuburbId.value) );
		this.fromsuburb = fromsuburb.SuburbName;

		const ViaCity = this.fromcitydata.find( a => a.CityId === parseInt(this.f.ViaCityId.value) );
		this.ViaCity = ViaCity.CityName;

	//	const Viasuburb  = this.tosuburbdata.find( a => a.SuburbId === parseInt(this.f.ViaSuburbId.value) );
		this.ViaSuburb = 'XXX';


		const tocity1 = this.tocitydata.find( a => a.CityId === parseInt(this.f.ToCityId.value) );
		this.tocity1 = tocity1.CityName;

		const tosuburb  = this.Tosuburbdata.find( a => a.SuburbId === parseInt(this.f.ToSuburbId.value) );
		this.ToSuburb = tosuburb.SuburbName;
		
		
		this.GenerateCodeNamereq.InputField=this.FromCity.substring(0,3) + this.fromsuburb.substring(0,3) + this.ViaCity.substring(0,3) + this.ViaSuburb.substring(0,3) + this.tocity1.substring(0,3)  + this.ToSuburb.substring(0,3);


		this.GenerateCodeNamereq.FormName='TransportRoutes';
		this.GetGenerateCode();	
		console.log("WO Value result :"+this.GenerateCodeNamereq.InputField);
	}


	GenerateTransportRoutesCodeViaSuburb()
	{

		const fromcity = this.fromcitydata.find( a => a.CityId === parseInt(this.f.FromCityId.value) );
		this.FromCity = fromcity.CityName;


		const fromsuburb  = this.fromsuburbdata.find( a => a.SuburbId === parseInt(this.f.FromSuburbId.value) );
		this.fromsuburb = fromsuburb.SuburbName;

		const ViaCity = this.fromcitydata.find( a => a.CityId === parseInt(this.f.ViaCityId.value) );
		this.ViaCity = ViaCity.CityName;

		const Viasuburb  = this.tosuburbdata.find( a => a.SuburbId === parseInt(this.f.ViaSuburbId.value) );
		this.ViaSuburb = Viasuburb.SuburbName;


		const tocity1 = this.tocitydata.find( a => a.CityId === parseInt(this.f.ToCityId.value) );
		this.tocity1 = tocity1.CityName;

		const tosuburb  = this.Tosuburbdata.find( a => a.SuburbId === parseInt(this.f.ToSuburbId.value) );
		this.ToSuburb = tosuburb.SuburbName;
		
		
		this.GenerateCodeNamereq.InputField=this.FromCity.substring(0,3) + this.fromsuburb.substring(0,3) + this.ViaCity.substring(0,3) + this.ViaSuburb.substring(0,3) + this.tocity1.substring(0,3)  + this.ToSuburb.substring(0,3);


		this.GenerateCodeNamereq.FormName='TransportRoutes';
		this.GetGenerateCode();	
		console.log("WO Value result :"+this.GenerateCodeNamereq.InputField);
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
							this.TransportForm.controls['TransporterCode'].setValue(respData.Data);
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
