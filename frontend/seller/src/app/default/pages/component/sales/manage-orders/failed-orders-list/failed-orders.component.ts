// Angular imports
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Third Party imports
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

// Sandbox
import { OrderSandbox } from '../../../../../../../../src/app/core/order/order.sandbox';
// Constants
import { fields, objForm, removeEmptyKeys, bulkActions,contentTranslate, sort } from './failed-orders.constant';
import { itemsPerPage, itemsPerPageList } from '../../../../../../../../src/app/default/shared/components/reusable-pagination/pagination.constant';
import { configureAlertConfig, imagesList } from '../../../../../../../../src/app/default/shared/components/alert-content/alert.content.constant';
// import { contentTranslate } from './failed-orders.constant';
// Model
import { getFormControlsFieldsObj, getTypes } from '../../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';
import { environment } from '../../../../../../../../src/environments/environment';

@Component({
  selector: 'app-failed-orders',
  templateUrl: './failed-orders.component.html',
  styleUrls: ['./failed-orders.component.scss']
})
export class FailedOrdersComponent implements OnInit {
  @ViewChild("dropdownContent", { static: false }) dropdownContent!: ElementRef;
  @ViewChild("dropdownContentFilter", { static: false }) dropdownContentFilter!: ElementRef;

  // Pagination
  currentPage = 1;
  limit: any = itemsPerPage;
  offset: any = 0;
  pageSizeList = itemsPerPageList;
  queryData: any = {};
  pagination: boolean = true;
  keyword: any = '';
  pageSize: any = 10;
  index: number;
  indexs: number;


  // List
  productListArray: any[] = [];
  public rowSelected: number;


  // check box
  tableCheckbox = {
    isSelectAll: false
  };
  filterData: any = [];
  selectedAll = false;
  bulkFunction = false;
  public filterDataId = [];

  // Bulk Action
  bulkAction = bulkActions;

  // Filters dynamic columns
  filterColumns = JSON.parse(JSON.stringify(fields));
  backupColumns = structuredClone(fields);
  filter: any = {};

  // Currency Value getting
  public currencySymbol = JSON.parse(localStorage.getItem('adminCurrency'));

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  // Alerts
  alertConfig = {};

  //Count
  count: number;

  // Reusable form 
  formObjFormGroup: any;
  dynamicObjControls: any = {};
  backupFormValue = {};
  formValueExists = false;
  public filterForm: UntypedFormGroup;

  imageUrl: any;
  initalLoading: boolean = false;

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  // Arrow functions
  trackByIndex = (index: number): number => index;

// Sort 
sortOption: any = sort;
sortname: string = ''
sortOrder: any = ''



  constructor(private router: Router,
    public formBuilder: UntypedFormBuilder,
    public toastr: ToastrService,
    public translate: TranslateService,
    public route: ActivatedRoute, public orderSandbox: OrderSandbox,
    public titleService: Title,) {
    titleService.setTitle('Failed Orders')
    this.initFilterForm();
    this.subscribeProduct();
  }
  ngOnInit(): void {
    this.imageUrl = environment.imageUrl;
    // Form
    this.buildForm();
    // Query param route value
    this.routeSubscribe();
    this.rowSelected = -1;
  }

  // Intialize form
  initFilterForm() {
    this.filterForm = this.formBuilder.group({
      OrderId: ['', Validators.required],
      CustomerName: ['', Validators.required],
      TotalAmount: ['', Validators.required],
    });
  }

  // Filter open
  open(): void {
    this.formObjFormGroup.patchValue(this.backupFormValue);
  }
  // open table panel
  openCloseRow(id: number): void {
    if (this.rowSelected === -1) {
      this.rowSelected = id;
    } else {
      if (this.rowSelected === id) {
        this.rowSelected = -1;
      } else {
        this.rowSelected = id;
      }
    }
  }

  // Page change event pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.offset = (this.currentPage - 1) * this.limit;
    this.failedOrderList(this.limit, this.offset);
  }

  // Per page change drop down
  pageSizeChange(e): void {
    this.onPageChange({ limit: e.id, offset: 0 });
  }

  // Filters
  applyFilter(): void {
    this.filterValueUpdate();
    this.resetAll();
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
        'Order ID': '',
        'Customer Name': '',
        'Total Amount': '',
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  // Table checkbox
  selectCheckAll(event): void {
    if (this.productListArray.length > 0) {
      this.productListArray.forEach((res: any) => {
        if (event) {
          res.selected = true;
        }
        else {
          res.selected = false;
        }
      })
      this.filterDataList()
    }
  }

  checkIfAllSelected(): void {
    this.bulkFunction = true;
    this.selectedAll = this.productListArray.every(function (item: any) {
      return item.selected === true;
    });
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
    } else {
      this.bulkFunction = false;
    }
  }


  filterDataList(): void {
    this.filterData = this.productListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.orderId);

  }

  // Bulk actions
  actionType(type: string): void {
    switch (type) {
      case 'resetCheckbox':
        this.resetCheckbox();
        break;
      case 'exportExcel':
        this.exportExcel()
        break
      case 'exportExcelAll':
        this.exportExcelAll()
        break
    }
  }

  // Save columns
  saveColumns(data: any): void {
    this.backupColumns = structuredClone(data);
  }

   // sort acending decendinng 
   SortValueChange(newValue: any): void {
    this.sortname = newValue?.name;
    this.sortOrder =['',null,undefined].includes(this.sortOrder) ?'ASC':this.sortOrder
    this.routeSubscribe();
  }

  // sort field
  SortValueChangeOrder(value): void {
    this.sortOrder = value;
    this.routeSubscribe();
  }

  // Query param value and pagination //
  private getQueryParam(): any {
    const params = {
      limit: this.limit,
      offset: this.offset,
      currentPage: this.currentPage,
      keyword: this.backupFormValue['Search'] ?? '',
      orderId: this.backupFormValue['Order ID'] ?? '',
      amount: this.backupFormValue['Total Amount'] ? this.backupFormValue['Total Amount'] : '',
      customerName: this.backupFormValue['Customer Name'] ? this.backupFormValue['Customer Name'] : '',
      sortBy: this.sortname,
      sortOrder: this.sortOrder
    };
    return params;
  }

  // Query param route value subscribe
  private routeSubscribe(): void {
    let paramsValue: any = {};
    this.subscriptions.add(this.route.queryParams.subscribe(params => {
      paramsValue = params;
      this.limit = paramsValue.limit ? Number(paramsValue.limit) : this.limit;
      this.offset = paramsValue.offset ? Number(paramsValue.offset) : 0;
      this.currentPage = paramsValue.currentPage ? Number(paramsValue.currentPage) : 1;
      this.formObjFormGroup.patchValue({
        'Order ID': paramsValue.orderId ?? "",
        'Customer Name': paramsValue.customerName ?? "",
        'Total Amount': paramsValue.amount ?? "",
        'Search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.failedOrderList(this.pageSize, this.offset);
    this.failedOrderCounts();
  }

  // Get list
  private failedOrderList(limit: number, offset: number): void {
    const params = removeEmptyKeys(this.getQueryParam());
    params.isRefresh = false;
    params.keyUp = false;
    params.limit = limit;
    params.offset = offset;
    params.keyword = this.backupFormValue['Search'] ?? '';
    params.count = 0;
    params.isBackOrder = 0;
    params.paymentProcess = 0
    params.orderId = this.backupFormValue['Order ID'] ?? '',
      params.amount = this.backupFormValue['Total Amount'] ? this.backupFormValue['Total Amount'] : '',
      params.customerName = this.backupFormValue['Customer Name'] ? this.backupFormValue['Customer Name'] : '',
      this.orderSandbox.failedOrderList(params);
    this.subscriptions.add(
      this.orderSandbox.failedOrderList$.subscribe((data: any) => {
        this.productListArray = [];
        if (data && data.length > 0) {
          this.productListArray = data;
          this.initalLoading = false;
          this.alertConfig = configureAlertConfig(contentTranslate.success, imagesList.success);
          this.reset();
        } else {
          this.initalLoading = true;
        }

      })
    )
    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.indexs || 1;
    this.updateQueryParam()

  }

  // Count list
  private failedOrderCounts(): void {
    const params = removeEmptyKeys(this.getQueryParam());
    params.isRefresh = false;
    params.keyUp = false;
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.keyword = this.backupFormValue['Search'] ?? '';
    params.count = 1;
     params.isBackOrder = 0;
    params.paymentProcess = 0
    params.orderId = this.backupFormValue['Order ID'] ?? '',
      params.amount = this.backupFormValue['Total Amount'] ? this.backupFormValue['Total Amount'] : '',
      params.customerName = this.backupFormValue['Customer Name'] ? this.backupFormValue['Customer Name'] : '',
      this.orderSandbox.failedOrderCounts(params);
    this.subscriptions.add(this.orderSandbox.failedOrderCounts$.subscribe((val: any) => {
      if (val?.status == 1) {
        this.count = val?.data
      }
    }))
  }
  // subscribe Product
  private subscribeProduct(): void {
    this.subscriptions.add(this.orderSandbox.failedOrderList$.subscribe((data: any) => {
      this.productListArray = [];
      if (data && data.length > 0) {
        this.productListArray = data.map(list => {
          return { ...list, selected: false };
        });
      }
    }));
  }
  // value update in queryparams and pagination//
  private updateQueryParam(): void {
    this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
  }

  // Intialize form
  private buildForm(): void {
    const formObjModel = objForm;
    const formGroupField = getFormControlsFieldsObj(formObjModel);
    this.formObjFormGroup = this.formBuilder.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.filterValueUpdate();
  }

  //Reset All
  private resetAll(): void {
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.failedOrderCounts();
    this.dropDownClose('dropdownContentFilter');
    this.dropDownClose('dropdownContent');
  }

  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(this.backupFormValue).some((val: any) => !this.empty.includes(val));
  }

  // filterclose
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }
  // Reset checkbox
  private reset(isChecked = false) {
    this.productListArray.forEach(val => val.selected = isChecked);
    this.filterData = this.productListArray.filter(val => val?.selected);
    this.selectedAll = false;
  }

  // Reset check box
  private resetCheckbox(): void {
    this.reset();
    this.tableCheckbox.isSelectAll = false;
    this.tableCheckbox = { ...this.tableCheckbox };
  }

  // Export excel
  private exportExcel(): void {
    const param: any = {}
    param.orderId = this.filterDataId.toString();
    this.orderSandbox.exportFailedOrderList(param);
    this.subscriptions.add(this.orderSandbox.exportFailedOrderList$.subscribe(val => {
      if (val) {
        this.resetCheckbox();
      }
    }));
  }

  // All export download
  private exportExcelAll(): void {
    const param = {
      orderId: ""
    }
    this.orderSandbox.exportFailedOrderList(param);
    this.subscriptions.add(this.orderSandbox.exportFailedOrderList$.subscribe(val => {
      if (val) {
        this.resetCheckbox();
      }
    }));
  }

  failedOrderDetail(data){
    this.router.navigate(['/sales/manage-orders/failed-orders-list/failed-orders-detail/' + data], { queryParams: this.getQueryParam() }) 
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
