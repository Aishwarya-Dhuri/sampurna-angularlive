import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from '../_models';
import { Register } from '../_models';
import { city } from '../_models';
import { state } from '../_models';
import { customer } from '../_models';
import { suburb } from '../_models';
import { doctype } from '../_models';
import { wastematerial } from '../_models';
import { recyclingtype } from '../_models';
import { role } from '../_models';
import { materialunit } from '../_models';
import { operartiontype } from '../_models';
import { billingstatus } from '../_models';
import { vehicletype } from '../_models';
import { wastetypes } from '../_models';
import { manufacturertype } from '../_models';
import { aggregatortypes } from '../_models';
import { processingtypes } from '../_models';
import { pages } from '../_models';
import { transportroute } from '../_models';
import { roleaccess } from '../_models';
import { smuser } from '../_models';
import { manufacturer } from '../_models';
import { transport } from '../_models';
import { recycler } from '../_models'
import { aggregator } from '../_models';
import { AGWasteTypes } from '../_models';
import { TransportRoutesVehicle } from '../_models';
import { recyclerMaterial } from '../_models';
import { AGSuburbsCities } from '../_models';
import { viewworkorder } from '../_models';
import { collectionpurchase } from '../_models';
import { transportation } from '../_models';
import { wotransportation } from '../_models';
import { wosalesdetials } from '../_models';
import { wobillsdetails } from '../_models';
import { WOItems } from '../_models';
import { Statuslist } from '../_models';
import { statemaster } from '../_models';
import { GetCitiesByStateIdMaster } from '../_models';
import { GetManufacturersSearch } from '../_models';
import { GenerateCodeName } from '../_models';
import { GetRecyclersSearch } from '../_models';

@Injectable()

export class UserService {
	private UserData = localStorage.getItem('currentUser');
	private token = localStorage.getItem('Token');
	private UserId = localStorage.getItem('UserId');
	private Role = localStorage.getItem('Role');
	private usertoken = this.token; //+ '|' + this.UserId;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': this.usertoken,
		'UserId': this.UserId
	});
	private options = { headers: this.headers };
      apiUrl:string = "http://wmsapi.jayits.com";
	//apiUrl: string = "http://localhost:60614";

	constructor(private http: HttpClient) { }

	getAll() {
		return this.http.get<user[]>(`/users`);
	}

	getById(id: number) {
		return this.http.get(`${this.apiUrl}/Customer.svc/users/${id}`);
	}

	
	CityCRUD(cityreq: {}) {
		return this.http.post<city[]>(`${this.apiUrl}/Masters.svc/Cities_CRUD`, cityreq,this.options);
	}

	SuburbCRUD(suburbreq: {}) {
		return this.http.post<suburb[]>(`${this.apiUrl}/Masters.svc/Suburbs_CRUD`, suburbreq,this.options);
	}

	DoctypeCRUD(doctypereq: {}) {
		return this.http.post<doctype[]>(`${this.apiUrl}/Masters.svc/DocumentType_CRUD`, doctypereq,this.options);
	}

	WastematerialCRUD(wastematerailreq: {}) {
		return this.http.post<wastematerial[]>(`${this.apiUrl}/Masters.svc/WasteMaterials_CRUD`, wastematerailreq,this.options);
	}

	MaterialunitCRUD(materialunitreq: {}) {
		return this.http.post<materialunit[]>(`${this.apiUrl}/Masters.svc/MaterialsUnits_CRUD`, materialunitreq,this.options);
	}

	RecyclingTypeCRUD(recyclingtypereq: {}) {
		return this.http.post<recyclingtype[]>(`${this.apiUrl}/Masters.svc/RecyclingTypes_CRUD`, recyclingtypereq,this.options);
	}

	OperationTypesCRUD(operartiontypereq: {}) {
		return this.http.post<operartiontype[]>(`${this.apiUrl}/Masters.svc/OperationTypes_CRUD`, operartiontypereq,this.options);
	}
	RolesCRUD(rolreq: {}) {
		return this.http.post<role[]>(`${this.apiUrl}/Masters.svc/Roles_CRUD`, rolreq,this.options);
	}
	BillingStatusCRUD(billingstatusreq: {}) {
		return this.http.post<billingstatus[]>(`${this.apiUrl}/Masters.svc/BillingStatus_CRUD`, billingstatusreq,this.options);
	}
	VehicleTypesCRUD(vehicletypereq: {}) {
		return this.http.post<vehicletype[]>(`${this.apiUrl}/Masters.svc/VehicleTypes_CRUD`, vehicletypereq,this.options);
	}

	wastetypesCRUD(wastetypesreq: {}) {
		return this.http.post<wastetypes[]>(`${this.apiUrl}/Masters.svc/WasteMaterialForms_CRUD`, wastetypesreq,this.options);
	}

	manufacturertypeCRUD(manufacturertypereq: {}) {
		return this.http.post<manufacturertype[]>(`${this.apiUrl}/Masters.svc/ManufacturerTypes_CRUD`, manufacturertypereq,this.options);
	}

	aggregatortypeCRUD(aggregatortypereq: {}) {
		return this.http.post<aggregatortypes[]>(`${this.apiUrl}/Masters.svc/AggregatorTypes_CRUD`, aggregatortypereq,this.options);
	}

	processingtypeCRUD(processingtypereq: {}) {
		return this.http.post<processingtypes[]>(`${this.apiUrl}/Masters.svc/ProcessingTypes_CRUD`, processingtypereq,this.options);
	}

	pagesCRUD(pagesreq: {}) {
		return this.http.post<pages[]>(`${this.apiUrl}/Masters.svc/AppPages_CRUD`, pagesreq,this.options);
	}

	transportroutecrudCRUD(transportroutereq: {}) {
		return this.http.post<transportroute[]>(`${this.apiUrl}/Masters.svc/TransportRoutes_CRUD`, transportroutereq,this.options);
	}

	roleaccessCRUD(roleaccessreq: {}) {
		return this.http.post<roleaccess[]>(`${this.apiUrl}/Masters.svc/RolesAccess_CRUD`, roleaccessreq,this.options);
	}

	userCRUD(userreq: {}) {
		return this.http.post<smuser[]>(`${this.apiUrl}/Masters.svc/Users_CRUD`, userreq,this.options);
	}

	manufacturerCRUD(manufacturerreq: {}) {
		return this.http.post<manufacturer[]>(`${this.apiUrl}/Masters.svc/Manufacturers_CRUD`, manufacturerreq,this.options);
	}

	MFwastetypeCRUD(mfwastetypereq: {}) {
		return this.http.post<manufacturer[]>(`${this.apiUrl}/Masters.svc/MFWasteTypes_CRUD`, mfwastetypereq,this.options);
	}

	transportCRUD(transportreq: {}) {
		return this.http.post<transport[]>(`${this.apiUrl}/Masters.svc/Transporters_CRUD`, transportreq,this.options);
	}

	recyclerCRUD(recyclerreq: {}) {
		return this.http.post<recycler[]>(`${this.apiUrl}/Masters.svc/Recyclers_CRUD`, recyclerreq,this.options);
	}

	aggregatorCRUD(aggregatorreq: {}) {
		return this.http.post<aggregator[]>(`${this.apiUrl}/Masters.svc/Aggregators_CRUD`, aggregatorreq,this.options);
	}

	AGWasteTypesCRUD(AGWasteTypesreq: {}) {
		return this.http.post<AGWasteTypes[]>(`${this.apiUrl}/Masters.svc/AGWasteTypes_CRUD`, AGWasteTypesreq,this.options);
	}


	TransportRoutesVehicleCRUD(TransportRoutesVehiclereq: {}) {
		return this.http.post<TransportRoutesVehicle[]>(`${this.apiUrl}/Masters.svc/TRVehicles_CRUD`, TransportRoutesVehiclereq,this.options);
	}

	RCMaterialCRUD(RCMaterialsreq: {}) {
		return this.http.post<recyclerMaterial[]>(`${this.apiUrl}/Masters.svc/RCMaterials_CRUD`, RCMaterialsreq,this.options);
	}

	AGSuburbsCityCRUD(AGSuburbsCityreq: {}) {
		return this.http.post<AGSuburbsCities[]>(`${this.apiUrl}/Masters.svc/AGSuburbs_CRUD`, AGSuburbsCityreq,this.options);
	}

	WorkOrdersCRUD(WorkOrdersreq: {}) {
		return this.http.post<viewworkorder[]>(`${this.apiUrl}/Masters.svc/WorkOrders_CRUD`, WorkOrdersreq,this.options);
	}

	collectionpurchaseCRUD(collectionpurchasereq: {}) {
		return this.http.post<collectionpurchase[]>(`${this.apiUrl}/Masters.svc/WOCollectionPurchases_CRUD`, collectionpurchasereq,this.options);
	}

	wotransportationCRUD(wotransportationreq: {}) {
		return this.http.post<wotransportation[]>(`${this.apiUrl}/Masters.svc/WOTransporters_CRUD`, wotransportationreq,this.options);
	}

	wosalesdetialsCRUD(wosalesdetialsreq: {}) {
		return this.http.post<wosalesdetials[]>(`${this.apiUrl}/Masters.svc/WOSales_CRUD`, wosalesdetialsreq,this.options);
	}

	wobillsdetailsCRUD(wobillsdetailsreq: {}) {
		return this.http.post<wobillsdetails[]>(`${this.apiUrl}/Masters.svc/WOBills_CRUD`, wobillsdetailsreq,this.options);
	}

	WOItemsCRUD(WOItemsreq: {}) {
		return this.http.post<WOItems[]>(`${this.apiUrl}/Masters.svc/WorkOrderItems_CRUD`, WOItemsreq,this.options);
	}

	StatusListCRUD(StatusListreq: {}) {
		return this.http.post<Statuslist[]>(`${this.apiUrl}/Masters.svc/StatusList_CRUD`, StatusListreq,this.options);
	}


	statemasterCRUD(statemasterreq: {}) {
		return this.http.post<statemaster[]>(`${this.apiUrl}/Masters.svc/States_CRUD`, statemasterreq,this.options);
	}


	GetCitiesByStateIdCRUD(requestData: any) {
		return this.http.post<GetCitiesByStateIdMaster[]>(`${this.apiUrl}/Masters.svc/GetCitiesByStateId`, requestData,this.options);
	}


	GetManufacturersSearchCRUD(GetManufacturersSearchreq: {}) {
		return this.http.post<GetManufacturersSearch[]>(`${this.apiUrl}/Masters.svc/GetManufacturers`, GetManufacturersSearchreq,this.options);
	}

	GetNamesByCityId(requestData: any) {
		return this.http.post<any[]>(`${this.apiUrl}/Masters.svc/GetNamesByCityId`, requestData,this.options);
	}


	GetGenerateCodeName(GenerateCodeNamereq: any) {
		return this.http.post<GenerateCodeName[]>(`${this.apiUrl}/Masters.svc/GenerateCode`, GenerateCodeNamereq,this.options);
	}

	GetAggregatorSearchCRUD(GetAggregatorSearchreq: {}) {
		return this.http.post<aggregator[]>(`${this.apiUrl}/Masters.svc/GetAggregators`, GetAggregatorSearchreq,this.options);
	}

	SortFilterTransporters(requestData: any) {
		return this.http.post<transport[]>(`${this.apiUrl}/Masters.svc/GetTransporters`, requestData,this.options);
	}


	SortFilterWorkOrdersdata(GetWorkOrderSearchreq: any) {
		return this.http.post<viewworkorder[]>(`${this.apiUrl}/Masters.svc/GetWorkOrders`, GetWorkOrderSearchreq,this.options);
	}

	SearchCollectionPurchases(requestData: any) {
		return this.http.post<collectionpurchase[]>(`${this.apiUrl}/Masters.svc/GetCollectionPurchases`, requestData,this.options);
	}

	GetCollectionPurchaseNamess() {
		return this.http.get<any[]>(`${this.apiUrl}/Masters.svc/GetCollectionPurchaseNames`,this.options);
	}

	SearchWOTransportation(requestData: any) {
		return this.http.post<wotransportation[]>(`${this.apiUrl}/Masters.svc/SearchWOTransporters`, requestData,this.options);
	}

	Searchsalesdetials(requestData: any) {
		return this.http.post<wosalesdetials[]>(`${this.apiUrl}/Masters.svc/Search_WOSales_CRUD`, requestData,this.options);
	}

	CheckSalesDocStatus(requestData: any) {
		return this.http.post<any[]>(`${this.apiUrl}/Masters.svc/ValidateSalesDocStatus`, requestData,this.options);
	}
	SearchBill(requestData: any) {
		return this.http.post<wobillsdetails[]>(`${this.apiUrl}/Masters.svc/WOBills_Search`, requestData,this.options);
	}

	SalesDoc(requestData: any) {
		return this.http.post<any[]>(`${this.apiUrl}/Masters.svc/GetDocumetsForBill`, requestData,this.options);
	}


	GetRecyclersSearchCRUD(GetRecyclersSearchreq: {}) {
		return this.http.post<GetRecyclersSearch[]>(`${this.apiUrl}/Masters.svc/GetRecyclers`, GetRecyclersSearchreq,this.options);
	}

	Forms_CRUD() {
		return this.http.get(`${this.apiUrl}/Masters.svc/Forms_CRUD`,this.options);
	}
	GetDocTypesByFormId(requestData: any) {
		return this.http.post(`${this.apiUrl}/Masters.svc/GetDocumentTypesByForm`, requestData,this.options);
	}
	DocumentCrud(requestData: any) {
		return this.http.post(`${this.apiUrl}/Masters.svc/DocumentCrud`, requestData,this.options);
	}

	//SendMail(requestData: any) {
	//	return this.http.post(`${this.apiUrl}/Masters.svc/sendEmailViaWebApi`, requestData);
	//}

	CPWorkOrderItemCrud(requestData: any) {
		return this.http.post(`${this.apiUrl}/Masters.svc/CPWorkOrderItemCrud`, requestData,this.options);
	}

	GetDocType() {
		return this.http.get(`${this.apiUrl}/Masters.svc/GetDocType`,this.options);
	}

	ValidateDocStatus(requestData: any) {
		return this.http.post(`${this.apiUrl}/Masters.svc/ValidateDocStatus`, requestData,this.options);
	}

	FetchManufacturer() {
		return this.http.get(`${this.apiUrl}/Masters.svc/Fetch_Manufacturer`,this.options);
	}

	CheckValidationForDelete(requestData: any) {
		return this.http.post(`${this.apiUrl}/Masters.svc/CheckValidationForDelete`, requestData,this.options);
	}

	CkeckExpiryDateFor_WOI(requestData: any) {
		return this.http.post(`${this.apiUrl}/Masters.svc/CkeckExpiryDateFor_WOI`, requestData,this.options);
	}

	GetWorkOrdersByCityAndState(requestData: any) {
		return this.http.post(`${this.apiUrl}/Masters.svc/GetWorkOrdersByCityAndState`, requestData,this.options);
	}

	GetDeliveryDateByTransporterId(requestData: any) {
		return this.http.post(`${this.apiUrl}/Masters.svc/GetDeliveryDateByTransporterId`, requestData,this.options);
	}

	FetchRateFromWOI(requestData: any) {
		return this.http.post(`${this.apiUrl}/Masters.svc/FetchRateFromWOI`, requestData,this.options);
	}
	FetchSalesDatabySalesId(requestData: any) {
		return this.http.post(`${this.apiUrl}/Masters.svc/FetchSalesDatabySalesId`, requestData,this.options);
	}

	FetchWorkOrderbyManufacturerId(requestData: any) {
		return this.http.post(`${this.apiUrl}/Masters.svc/FetchWorkOrderbyManufacturerId`, requestData,this.options);
	}

	FetchSalesIdByWOI(requestData: any) {
		return this.http.post(`${this.apiUrl}/Masters.svc/FetchSalesIdByWOI`, requestData,this.options);
	}

	FetchCollectionPurchaseByAGID(requestData: any) {
		return this.http.post(`${this.apiUrl}/Masters.svc/FetchCollectionPurchaseByAGID`, requestData,this.options);
	}

	FetchWOTRByTrasporter(requestData: any) {
		return this.http.post(`${this.apiUrl}/Masters.svc/FetchWOTRByTrasporter`, requestData,this.options);
	}

	FetchInvoiceNoByBillType(requestData: any){
		return this.http.post(`${this.apiUrl}/Masters.svc/FetchInvoiceNoByBillType`, requestData,this.options);
	}

	FetchUsersByUserType(requestData: any){
		return this.http.post(`${this.apiUrl}/Masters.svc/FetchUsersByUserType`, requestData,this.options);
	}

}


//C7AD44CBAD762A5DA0A452F9E854FDC1E0E7A52A3815F23F3EAB1D8B931DD472634DFAC71CD34EBC35D16AB7FB8A90C81F975113D6C7538DC69DD8DE9077EC