import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityComponent } from './city/city.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
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
import { AggregatorEnrolmentComponent } from './aggregator-enrolment/aggregator-enrolment.component';
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
import {TransstatusComponent} from'./transstatus/transstatus.component';
import {RecyclerstatusComponent} from'./recyclerstatus/recyclerstatus.component';
import {AggrementstatusComponent} from'./aggrementstatus/aggrementstatus.component';
import { StatemasterComponent } from './statemaster/statemaster.component';
import { WostatusComponent } from './wostatus/wostatus.component';
import { AddmanufacturerWastetypeComponent } from './addmanufacturer-wastetype/addmanufacturer-wastetype.component';
import { TransporterAddvehicleComponent } from './transporter-addvehicle/transporter-addvehicle.component';
import { AggregatorAddwastetypeComponent } from './aggregator-addwastetype/aggregator-addwastetype.component';
import { RecyclerAddmaterialComponent } from './recycler-addmaterial/recycler-addmaterial.component';
import { ClientRegistrationComponent } from './client-registration/client-registration.component';
import { BlankComponent } from './blank/blank.component';
import { AuthGuard } from './_guards/auth.guard';
import { role } from './_models';



const routes: Routes = [
{ 
  path: '',
component: DashboardComponent,
canActivate: [AuthGuard]
},

{path:'blank',component: BlankComponent},
{path:'login',component: LoginComponent},
{ path:'dashboard',component:DashboardComponent ,canActivate: [AuthGuard]},


{path:'city',component:CityComponent ,canActivate: [AuthGuard], 
 },
{path:'subrubs',component:SubrubsComponent},
{path:'DocumentType',component:DocumentTypeComponent},
{path:'WesteMaterial',component:WesteMaterialComponent},
{path:'MaterialUnit',component:MaterialUnitComponent},
// {path:'waste-type',component:WasteTypeComponent},
{path:'RecyclingType',component:RecyclingTypeComponent},
{path:'role',component:RoleComponent,canActivate: [AuthGuard]},
{path:'RoleAccess',component:RoleAccessComponent},
{path:'TransportRoute',component:TransportRouteComponent},
{path:'users', component:UsersComponent,},
{path:'ManufacturerType',component:ManufacturerTypeComponent},
{path:'AggregatorType',component:AggregatorTypeComponent},
{path:'ProcessingType',component:ProcessingTypeComponent},
{path:'VehicaleType',component:VehicaleTypeComponent},
{path:'BillingStatus',component:BillingStatusComponent},
{path:'AggregatorEnrolment',component:AggregatorEnrolmentComponent,canActivate: [AuthGuard]},
{path:'TransporterEnrolment',component:TransporterEnrolmentComponent,canActivate: [AuthGuard]},
{path:'ManufacturerEnrolment',component:ManufacturerEnrolmentComponent,canActivate: [AuthGuard]},
{path:'RecyclerEnrolement',component:RecyclerEnrolementComponent,canActivate: [AuthGuard]},
{path:'ViewWorkOrder',component:ViewWorkOrderComponent},
{path:'ViewWorkOrderDetails',component:ViewWorkOrderDetailsComponent},
// {path:'CollectionPurchase',component:CollectionPurchaseComponent},
{path:'Transportation',component:TransportationComponent},
{path:'ViewSalesDetails',component:ViewSalesDetailsComponent},
{path:'ViewBills',component:ViewBillsComponent},
{path:'Pages',component:PagesComponent},
{path:'transstatus',component:TransstatusComponent},
{path:'recyclerstatus',component:RecyclerstatusComponent},
{path:'aggrementstatus',component:AggrementstatusComponent},
{path:'statemaster',component:StatemasterComponent},
{path:'wostatus',component:WostatusComponent},
{path:'Addmanufacturer-Wastetype',component:AddmanufacturerWastetypeComponent},
{path:'AddVehicle',component:TransporterAddvehicleComponent},
{ path:'Aggregator-addwastetype',component:AggregatorAddwastetypeComponent},
{ path: 'Recycler-AddMaterial',component:RecyclerAddmaterialComponent},
{path:'ClientRegistration',component:ClientRegistrationComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
