// Angular imports
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';

// Third Party imports
import { Subscription } from 'rxjs';
import * as moment from 'moment';
// Sandbox
import { BackorderListSandbox } from 'src/core/admin/sales/backorder-list/backorder-list.sandbox';

// Constants  
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
import { customTable, filterFields, removeEmptyKeys } from './back-orders.constant';
// environment
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-back-orders',
  templateUrl: './back-orders.component.html',
  styleUrls: ['./back-orders.component.scss'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0'
      })),
      state('final', style({
        overflow: 'hidden',
        opacity: '1'
      })),
      transition('initial=>final', animate('750ms')),
      transition('final=>initial', animate('750ms'))
    ]),
  ]
})
export class BackOrdersComponent implements OnInit {

  @ViewChild('myDropdown') myDropdown!: NgbDropdown;

  //Dynamic columns
  customTable: any = customTable;

  // Pagination
  currentPage = 1;
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;
  offset = 0;
  queryData: any = {};
  pagination: boolean = true;

  // currency
  public currency = JSON.parse(sessionStorage.getItem('adminCurrency'));

  // List
  orderList = [];
  isCollapsed  = [];

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

  constructor(
    public titleService: Title,
    private router: Router,
    public route: ActivatedRoute,
    public sandbox: BackorderListSandbox,
    private ref: ChangeDetectorRef,
    public modalService: NgbModal,
    public fb: UntypedFormBuilder,
    public modal: NgbModal) { }

  ngOnInit(): void {
    this.titleService.setTitle('Back Orders');
    // Form
    this.buildForm();
    // Router Param
    this.routeSubscribe();
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
        'order Id': '',
        'customerName': '',
        'Date': '',
        'Order Line No': ''
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  // Orders list
  productList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 0;
    this.sandbox.backOrderList(params);
    this.subscriptions.add(
      this.sandbox.backorderList$.subscribe((element: any) => {
        this.orderList = element;
        this.orderList.forEach(val => {
          val.isCollapsed = true;
        })
    })
  )
    this.updateQueryParam();
  }

  // Orders Count
  productCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    delete params.limit;
    delete params.offset;
    params.count = 1;
    this.sandbox.backOrderListCount(params);
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
      orderId: this.backupFormValue['Order Id'] ?? '',
      orderLineNo : this.backupFormValue['Order Line No'] ?? '',
      customerName: this.backupFormValue['Buyer Name'] ? this.backupFormValue['Buyer Name'] : '',
      dateAdded: this.backupFormValue['Date'] ? moment(this.backupFormValue['Date']).format('YYYY-MM-DD') : '',
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
        'Order Id': paramsValue.orderId ?? "",
        'Order Line No' : paramsValue.orderLineNo,
        'Buyer Name': paramsValue.customerName ? paramsValue.customerName : "",
        'Date': paramsValue.dateAdded ? new Date(paramsValue.dateAdded) : "",
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
