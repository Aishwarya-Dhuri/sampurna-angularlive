import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AlertService, AuthenticationService, UserService, NavbarService, DataService,ExcelService } from './_services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Gouri added


	import { AlertComponent } from './_directives';
	
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HashLocationStrategy, LocationStrategy,DatePipe } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AggregatorEnrolmentComponent } from './aggregator-enrolment/aggregator-enrolment.component';
import { SubrubsComponent } from './subrubs/subrubs.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { WesteMaterialComponent } from './weste-material/weste-material.component';
import { MaterialUnitComponent } from './material-unit/material-unit.component';
import { RecyclingTypeComponent } from './recycling-type/recycling-type.component';
import { RoleComponent } from './role/role.component';
import { RoleAccessComponent } from './role-access/role-access.component';
import { TransportRouteComponent } from './transport-route/transport-route.component';
import { UsersComponent } from './users/users.component';
import { ManufacturerTypeComponent } from './manufacturer-type/manufacturer-type.component';
import { AggregatorTypeComponent } from './aggregator-type/aggregator-type.component';
import { ProcessingTypeComponent } from './processing-type/processing-type.component';
import { VehicaleTypeComponent } from './vehicale-type/vehicale-type.component';
import { BillingStatusComponent } from './billing-status/billing-status.component';
import { TransporterEnrolmentComponent } from './transporter-enrolment/transporter-enrolment.component';
import { ManufacturerEnrolmentComponent } from './manufacturer-enrolment/manufacturer-enrolment.component';
import { RecyclerEnrolementComponent } from './recycler-enrolement/recycler-enrolement.component';
import { ViewWorkOrderComponent } from './view-work-order/view-work-order.component';
import { ViewWorkOrderDetailsComponent } from './view-work-order-details/view-work-order-details.component';
// import { CollectionPurchaseComponent } from './collection-purchase/collection-purchase.component';
import { TransportationComponent } from './transportation/transportation.component';
import { ViewSalesDetailsComponent } from './view-sales-details/view-sales-details.component';
import { ViewBillsComponent } from './view-bills/view-bills.component';
import { PagesComponent } from './pages/pages.component';
import { TransstatusComponent } from './transstatus/transstatus.component';
import { RecyclerstatusComponent } from './recyclerstatus/recyclerstatus.component';
import { AggrementstatusComponent } from './aggrementstatus/aggrementstatus.component';
import { StatemasterComponent } from './statemaster/statemaster.component';
import { WostatusComponent } from './wostatus/wostatus.component';
import { MaterialModule } from './material.module';
import { FormsModule} from '@angular/forms';
import { AddmanufacturerWastetypeComponent } from './addmanufacturer-wastetype/addmanufacturer-wastetype.component';
import { TransporterAddvehicleComponent } from './transporter-addvehicle/transporter-addvehicle.component'; 
import { AggregatorAddwastetypeComponent } from './aggregator-addwastetype/aggregator-addwastetype.component';
import { RecyclerAddmaterialComponent } from './recycler-addmaterial/recycler-addmaterial.component';
import { ClientRegistrationComponent } from './client-registration/client-registration.component';
import { BlankComponent } from './blank/blank.component';
import { AuthGuard } from './_guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
	AlertComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    AggregatorEnrolmentComponent,
    SubrubsComponent,
    DocumentTypeComponent,
    WesteMaterialComponent,
    MaterialUnitComponent,
    RecyclingTypeComponent,
    RoleComponent,
    RoleAccessComponent,
    TransportRouteComponent,
    UsersComponent,
    ManufacturerTypeComponent,
    AggregatorTypeComponent,
    ProcessingTypeComponent,
    VehicaleTypeComponent,
    BillingStatusComponent,
    TransporterEnrolmentComponent,
    ManufacturerEnrolmentComponent,
    RecyclerEnrolementComponent,
    ViewWorkOrderComponent,
    ViewWorkOrderDetailsComponent,
    // CollectionPurchaseComponent,
    TransportationComponent,
    ViewSalesDetailsComponent,
    ViewBillsComponent,
    PagesComponent,
	TransstatusComponent,
	RecyclerstatusComponent,
	AggrementstatusComponent,
	StatemasterComponent,
	WostatusComponent,
  AddmanufacturerWastetypeComponent,
  AggregatorAddwastetypeComponent,
	TransporterAddvehicleComponent,
	RecyclerAddmaterialComponent,
	ClientRegistrationComponent,
	BlankComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	ReactiveFormsModule,
	HttpClientModule,
	MaterialModule,
	 NgMultiSelectDropDownModule.forRoot(),
	 FormsModule,
	 MatAutocompleteModule
	// ReactiveFormsModule
	
  ],
 
  providers: [AuthenticationService,AlertService,NavbarService,UserService,DataService,ExcelService,AuthGuard,
  ({provide: LocationStrategy, useClass: HashLocationStrategy}),DatePipe
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
