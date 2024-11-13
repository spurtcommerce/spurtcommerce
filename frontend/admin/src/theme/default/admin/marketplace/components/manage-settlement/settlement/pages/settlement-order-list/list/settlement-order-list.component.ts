// Angular imports
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
// Third Party imports
import { Subscription } from 'rxjs';
import * as moment from 'moment';
// Components
import { SettlementOrderModalComponent } from '../modals/settlement-modal.component';
// Sandbox
import { SettlementOrderSandbox } from 'src/core/admin/vendor/vendor-settlements/settlement-order/settlement-order.sandbox';
import { SettlementOrderService } from 'src/core/admin/vendor/vendor-settlements/settlement-order/settlement-order.service';
// Constants  
import { customTable, filterFields, removeEmptyKeys } from './settlement-order-list.constant';
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
// environment
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-settlement-order-list',
  templateUrl: 'settlement-order-list.component.html',
  styleUrls: ['settlement-order-list.component.scss'],
})
export class SettlementOrderListComponent implements OnInit, OnDestroy {
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;

  //Dynamic columns
  customTable: any = customTable;

  // Pagination
  currentPage = 1;
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;
  offset = 0;
  queryData: any = {};
  pagination: boolean = true;

  // List
  settlementList = [];
  orderStatusList = [];
  vendorList = [];

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  // Arrow functions
  trackByIndex = (index: number): number => index;

  // Reusable form 
  formObjFormGroup: any;
  dynamicObjControls: any = {};
  backupFormValue = {};
  formValueExists = false;

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  // check box
  selectedDatas: any = [];
  tableCheckbox = {
    isSelectAll: false
  };

  // environment
  imageUrl: string = environment.imageUrl;
  
  // currency
  public currency = JSON.parse(sessionStorage.getItem('adminCurrency'));

  constructor(
    public titleService: Title,
    private router: Router,
    public route: ActivatedRoute,
    public sandbox: SettlementOrderSandbox,
    public fb: UntypedFormBuilder,
    public service: SettlementOrderService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.titleService.setTitle('Settlement Order');

    // Dropdown Apis
    this.getDropDownList();
  }

  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "checkBox":
        this.selectedDatas = e.selectedDatas;
        break;
    }
  }

  // Reset checkbox
  private reset(isChecked = false) {
    this.settlementList.forEach(val => val.checked = isChecked);
    this.selectedDatas = this.settlementList.filter(val => val?.checked);
  }

  // Reset check box
  private resetCheckbox(): void {
    this.reset();
    this.tableCheckbox.isSelectAll = false;
    this.tableCheckbox = { ...this.tableCheckbox };
  }

  // Dropdown Close
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }

  //Reset All
  private resetAll(): void {
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.productCount();
    this.dropDownClose('myDropdown');
  }

  // Filters
  applyFilter(): void {
    this.filterValueUpdate();
    this.resetAll();
  }

  // Dropdown Filter
  getDropdownValue(array, requestKey, value, responseKey) {
    return this[array]?.find(list=> list?.[requestKey] == value)?.[responseKey];
  }

  // Dropdown Apis
  getDropDownList() {
   this.subscriptions.add(this.service.orderStatusList({}).subscribe(obj=> {
      if(obj?.status == 1) {
        this.orderStatusList = obj?.data;
        filterFields.OrderStatus.customData = {
          data: this.orderStatusList,
          key: 'name',
          value: 'orderStatusId'
        }
      }
    }));
    this.subscriptions.add(this.service.vendorList({status: 1}).subscribe(obj=> {
      if(obj?.status == 1) {
        this.vendorList =  obj?.data?.filter(list=> !this.empty.includes(list?.companyName));
        // filterFields.ChooseVendor.customData = {
        //   data: this.vendorList,
        //   key: 'companyName',
        //   value: 'vendorId'
        // }
        // Form
        this.buildForm();
        /*query param route value*/
        this.routeSubscribe();
      }
    }))
  }
  
  makeSettlement() {
    if (this.selectedDatas.length > 0) {
      const modalRef = this.modalService.open(SettlementOrderModalComponent, {
        windowClass: 'add-roles', animation: false, backdrop: 'static', centered: false
      });
      modalRef.componentInstance.settlementArray = this.selectedDatas;
      modalRef.result.then((result) => {
        if (result === 'success') {
          this.resetAll();
        }
      });
    }
  }

  // intialize form
  private buildForm(): void {
    const formObjModel = filterFields;
    const formGroupField = getFormControlsFields(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.filterValueUpdate();
  }

  /*Remove filter*/
  removeFilter(remove): void {
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }

  /*Reset filters*/
  filterReset(type: string): void {
    if (type == 'clearAll') {
      this.formObjFormGroup.reset()
    } else {
      this.formObjFormGroup.patchValue({
        'CompanyName': '',
        'FromDate': '',
        'ToDate': '',
        'RangeFrom': '',
        'RangeTo': '',
        'ChooseVendor': '',
        'OrderStatus': '',
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  // settlement list
  productList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let param = removeEmptyKeys(this.getQueryParam());
    param.count = 0;
    this.sandbox.getSettlementOrderList(param);
    this.subscriptions.add(this.sandbox.orderList$.subscribe(element => {
      this.settlementList = element;
    }))
    this.updateQueryParam();
  }

  // settlement list count
  productCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    this.sandbox.getSettlementOrderListCount(params);
  }

  // Page change event pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.productList();
  }

  // Value update in queryparams for pagination
  private updateQueryParam(): void {
    this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
  }

  // Query param value and pagination
  private getQueryParam(): any {
    const params = {
      limit: this.limit,
      offset: this.offset,
      keyword: this.backupFormValue['search'] ?? '',
      startDate: this.backupFormValue['FromDate'] ? moment(this.backupFormValue['FromDate']).format('YYYY-MM-DD') : '',
      endDate: this.backupFormValue['ToDate'] ? moment(this.backupFormValue['ToDate']).format('YYYY-MM-DD') : '',
      amountFrom: this.backupFormValue['RangeFrom'] ? this.backupFormValue['RangeFrom'] : '',
      amountTo: this.backupFormValue['RangeTo'] ? this.backupFormValue['RangeTo'] : '',
      vendorIds: this.backupFormValue['ChooseVendor'] ? this.backupFormValue['ChooseVendor'] : '',
      orderStatus: this.backupFormValue['OrderStatus'] ? this.backupFormValue['OrderStatus'] : '',
      companyName: this.backupFormValue?.['CompanyName'] ? this.backupFormValue?.['CompanyName'] : ''
    };
    return params;
  }

  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(this.backupFormValue).some((val: any) => !this.empty.includes(val));
  }

  // Query param route value subscribe
  private routeSubscribe(): void {
    let paramsValue: any = {};
    this.subscriptions.add(this.route.queryParams.subscribe(params => {
      paramsValue = params;
      this.limit = paramsValue.limit ? Number(paramsValue.limit) : this.limit;
      this.offset = paramsValue.offset ? Number(paramsValue.offset) : 0;
      this.currentPage = (paramsValue.offset && paramsValue.limit) ? Math.floor(paramsValue.offset / paramsValue.limit) + 1 : 1;
      this.formObjFormGroup.patchValue({
        'CompanyName': paramsValue.companyName ?? "",
        'FromDate': paramsValue.startDate ? new Date(paramsValue.startDate) : "",
        'ToDate': paramsValue.endDate ? new Date(paramsValue.endDate) : "",
        'RangeFrom': paramsValue.amountFrom ?? "",
        'RangeTo': paramsValue.amountTo ?? "",
        'ChooseVendor': paramsValue.vendorIds ? Number(paramsValue.vendorIds) : '',
        'OrderStatus': paramsValue.orderStatus ? Number(paramsValue.orderStatus) : null,
        'search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.productList();
    this.productCount();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}