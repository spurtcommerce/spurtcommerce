// Angular imports
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
// Third Party imports
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
// Sandbox
import { OrderSandbox } from '../../../../../../../../../src/app/core/order/order.sandbox';
// Constants
import { fields, objForm, removeEmptyKeys, bulkActions, contentTranslate, className, configureAlertConfig, sort } from './back-oreder-list-new.constant';
import { getFormControlsFieldsObj, getTypes } from '../../../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';
import { itemsPerPage, itemsPerPageList } from '../../../../../../../../../src/app/default/shared/components/reusable-pagination/pagination.constant';
import { imagesList } from '../../../../../../../../../src/app/default/shared/components/alert-content/alert.content.constant';
// Environment
import { environment } from '../../../../../../../../../src/environments/environment';

@Component({
  selector: 'app-back-order-list-new',
  templateUrl: './back-order-list-new.component.html',
  styleUrl: './back-order-list-new.component.scss'
})
export class BackOrderListNewComponent {

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

  // Currency Value getting
  public currencySymbol = JSON.parse(localStorage.getItem('adminCurrency'));

  // List
  backOrderListArray: any[] = [];
  rowSelected: number;

  // check box
  tableCheckbox = {
    isSelectAll: false
  };
  filterData: any = [];
  selectedAll = false;
  bulkFunction = false;
  orderProductIds: any;
  public filterDataId = [];

  // bulk Action
  bulkAction = bulkActions;

  // filters dynamic columns
  filterColumns = JSON.parse(JSON.stringify(fields));
  backupColumns = structuredClone(fields);
  filter: any = {};

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  // Alerts
  alertConfig = {};

  // Reusable form 
  formObjFormGroup: any;
  dynamicObjControls: any = {};
  backupFormValue = {};
  formValueExists = false;
  // Image Url
  imageUrl: any;
  initalLoading: boolean = false;

  // Subscriptions
  private subscriptions: Subscription = new Subscription();
  fullFillfilterData: any = [];
  // Arrow functions
  trackByIndex = (index: number): number => index;

   // Sort 
   sortOption: any = sort;
   sortname: string = ''
   sortOrder: any = ''
   

  constructor(public orderSandbox: OrderSandbox,
    public formBuilder: UntypedFormBuilder,
    public toastr: ToastrService,
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService,
    public titleService: Title,
    public ref: ChangeDetectorRef) {
    titleService.setTitle('Back Orders');
    // this.subscribeProduct();
  }

  ngOnInit(): void {
    this.imageUrl = environment.imageUrl;
    // Form
    this.buildForm();
    // Query param route value
    this.routeSubscribe();
    this.rowSelected = -1;
  }

  // Filter open
  open(): void {
    this.formObjFormGroup.patchValue(this.backupFormValue);
  }

  // Page change event pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.offset = (this.currentPage - 1) * this.limit;
    this.backorderList();
  }

  // Per page change drop down
  pageSizeChange(e): void {
    this.onPageChange({ limit: e.id, offset: 0 });
  }

  // Filters
  applyFilter(): void {
    this.offset = 0
    this.currentPage = 1
    this.filterValueUpdate();
    this.resetAll();
  }

  // Remove filter 
  removeFilter(remove): void {
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }

  // Reset filters
  filterReset(type: string): void {
    if (type == 'clearAll') {
      this.formObjFormGroup.reset();
    } else {
      this.formObjFormGroup.patchValue({
        'Order ID': '',
        'Customer Name': '',
        'Total Amount': '',
        'sku': ''
      });
    }
    this.filterValueUpdate();
    this.resetAll();
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

  // Bulk actions
  actionType(type: string): void {
    switch (type) {
      case 'resetCheckbox':
        this.resetCheckbox();
        break;
      case 'exportExcel':
        this.exportExcel();
        break;
      case 'exportExcelAll':
        this.exportExcelAll();
        break;
      case 'fullFillNow':
        this.fullFillNow();
        break;
    }
  }

  // Save columns
  saveColumns(data: any): void {
    this.backupColumns = structuredClone(data);
  }

  // query param value and pagination //
  private getQueryParam(): any {
    const params = {
      limit: this.limit,
      offset: this.offset,
      currentPage: this.currentPage,
      keyword: this.backupFormValue['Search'] ?? '',
      orderId: this.backupFormValue['Order ID'] ?? '',
      amount: this.backupFormValue['Total Amount'] ? this.backupFormValue['Total Amount'] : '',
      customerName: this.backupFormValue['Customer Name'] ? this.backupFormValue['Customer Name'] : '',
      skuName: this.backupFormValue['sku'] ? this.backupFormValue['sku'] : '',
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
    this.backorderList();
    this.backorderListCount();
  }

  // Get list
  private backorderList(): void {
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = true;
    params.limit = this.limit;
    params.offset = this.formValueExists ? 0 : this.offset;
    params.keyword = this.backupFormValue['Search'] ?? '';
    params.count = 0;
    // params.isBackOrder = 1;
    // params.paymentProcess = 1
    params.orderId = this.backupFormValue['Order ID'] ?? '',
      params.amount = this.backupFormValue['Total Amount'] ? this.backupFormValue['Total Amount'] : 0,
      params.customerName = this.backupFormValue['Customer Name'] ? this.backupFormValue['Customer Name'] : '',
      delete params.currentPage
    this.orderSandbox.backOrderList(params);
    this.subscriptions.add(
      this.orderSandbox.backOrderList$.subscribe((data: any) => {
        this.backOrderListArray = [];
        if (data && data.length > 0) {
          this.backOrderListArray = data;
          this.alertConfig = configureAlertConfig(contentTranslate.success, imagesList.success)
          this.reset();
          this.initalLoading = false;
        } else {
          this.initalLoading = true;
        }
      })
    )
    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.index || 1;
    this.updateQueryParam();
  }

  // Count list
  private backorderListCount(): void {
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = true;
    params.limit = this.limit;
    params.offset = this.formValueExists ? 0 : this.offset;
    params.keyword = this.backupFormValue['Search'] ?? '';
    params.count = 1;
    // params.isBackOrder = 1
    // params.paymentProcess = 1
    params.orderId = this.backupFormValue['Order ID'] ?? '',
      params.amount = this.backupFormValue['Total Amount'] ? this.backupFormValue['Total Amount'] : 0,
      params.customerName = this.backupFormValue['Customer Name'] ? this.backupFormValue['Customer Name'] : '',
      params.sku = this.backupFormValue['SKU'] ? this.backupFormValue['SKU'] : ''
    delete params.currentPage
    this.orderSandbox.backOrderListCount(params);
  }

  // value update in queryparams and pagination//
  private updateQueryParam(): void {
    this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
  }

  // intialize form
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
    this.backorderList();
    this.backorderListCount();
    this.dropDownClose('dropdownContentFilter');
    this.dropDownClose('dropdownContent');
  }

  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(this.backupFormValue).some((val: any) => !this.empty.includes(val));
  }

  // Reset checkbox
  private reset(isChecked = false) {
    this.backOrderListArray.forEach(val => val.selected = isChecked);
    this.filterData = this.backOrderListArray.filter(val => val?.selected);
    this.selectedAll = false;
  }

  // Reset check box
  private resetCheckbox(): void {
    this.reset();
    this.fullFillfilterData = [];
    this.tableCheckbox.isSelectAll = false;
    this.tableCheckbox = { ...this.tableCheckbox };
  }

  fullFillNow() {
    const param: any = {};
    param.backOrder = 2
    param.vendorOrderIds = this.fullFillfilterData; 
    this.orderSandbox.fullFillNow(param)
   this.subscriptions.add(this.orderSandbox.fullFillNow$.subscribe(val => {
      if (val) {
        if (val.error.length > 0) {
          this.orderProductIds = val.error.map(element => element.orderProductPrefixId)
        }else{
          this.backorderList();
          this.backorderListCount();
        }
        const allApproved = val.error.length > 0;
        this.alertConfig = allApproved ? configureAlertConfig(this.orderProductIds.toString(), contentTranslate.failed, imagesList.failed, className.failed) : configureAlertConfig();
        this.reset();
        this.resetCheckbox();

      }
    }))

  }

  // Export excel
  private exportExcel(): void {
    const param: any = {};
    param.orderProductId = this.filterDataId.toString();
    this.orderSandbox.exportBackOrderList(param);
    this.subscriptions.add(this.orderSandbox.exportBackOrderList$.subscribe(val => {
      if (val) {
        this.resetCheckbox();
      }
    }))
  }

  // All export download
  private exportExcelAll(): void {
    const param = {
      orderProductId: ""
    }
    this.orderSandbox.exportBackOrderList(param);
    this.subscriptions.add(this.orderSandbox.exportBackOrderList$.subscribe(val => {
      if (val) {
        this.resetCheckbox();
      }
    }));
  }

  // open table panel
  public openCloseRow(id: number): void {
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

  // Table checkbox
  selectCheckAll(event): void {

    if (this.backOrderListArray.length > 0) {
      this.backOrderListArray.forEach((res: any) => {
        if (event) {
          res.selected = true;
        }
        else {
          res.selected = false;
        }
      })
    
      this.filterDataList();
      // this.fullFillData();
      
    }
  }

  checkIfAllSelected(): void {
    this.bulkFunction = true;
    this.selectedAll = this.backOrderListArray.every(function (item: any) {
      return item.selected === true;
    });

    this.filterDataList();
    // this.fullFillData();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
    } else {
      this.bulkFunction = false;
    }
  }
  // Filter data list
  filterDataList(): void {

    this.filterData = this.backOrderListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.orderProductId);
    this.fullFillfilterData = this.filterData.map(obj => obj.vendorOrderId);
  }
  fullFillData() {
    this.filterData = this.backOrderListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
   
  
  }
  // Get data from api
  subscribeProduct(): void {
    this.subscriptions.add(this.orderSandbox.backOrderList$.subscribe((data: any) => {
      this.backOrderListArray = [];
      if (data && data.length > 0) {
        this.backOrderListArray = data.map(list => {
          return { ...list, selected: false };
        });
      }
    }));
  }

  // filterclose
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }
  backOrderDetail(data) {
    this.router.navigate(['/sales/manage-orders/back-orders-list/back-orders-detail/' + data], { queryParams: this.getQueryParam() })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
