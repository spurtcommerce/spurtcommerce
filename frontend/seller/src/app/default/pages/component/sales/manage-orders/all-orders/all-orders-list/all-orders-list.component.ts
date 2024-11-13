// Angular imports
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Title } from "@angular/platform-browser";
// Third Party imports
import { Subscription } from 'rxjs';
// Components
import { MakeArchieveModalComponent } from '../make-archieve-modal/make-archieve-modal.component';
import { BulkUpdateComponent } from '../../../../../../../../../src/app/default/common/bulk-update/bulk-update.component';
// Sandbox
import { OrderSandbox } from '../../../../../../../../../src/app/core/order/order.sandbox';
import { PaymentSandbox } from '../../../../../../../../../src/app/core/payment/payment.sandbox';
//Services
import { OrderService } from '../../../../../../../../../src/app/core/order/order.service';

// Constants
import { bulkActions, customTable, fields, objForm, removeEmptyKeys, sort } from './all-orders-list.constant';
import { itemsPerPage, itemsPerPageList } from '../../../../../../../../../src/app/default/shared/components/reusable-pagination/pagination.constant';
import { className, configureAlertConfig, contentTranslate, imagesList } from '../../../../../../../../../src/app/default/shared/components/alert-content/alert.content.constant';
// Model
import { getFormControlsFieldsObj, getTypes } from '../../../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';
import { CommonSandbox } from '../../../../../../../../../src/app/core/common/common.sandbox';

@Component({
  selector: 'app-all-orders-list',
  templateUrl: './all-orders-list.component.html',
  styleUrls: ['./all-orders-list.component.scss'],
})
export class AllOrdersListComponent implements OnInit {
  @ViewChild("dropdownContent", { static: false }) dropdownContent!: ElementRef;
  @ViewChild("dropdownContentFilter", { static: false }) dropdownContentFilter!: ElementRef;
  //Dynamic columns
  backupData: any = structuredClone(customTable);
  dynamicColumnFields: any = structuredClone(customTable);

  // Pagination
  currentPage = 1;
  limit: number = itemsPerPage;
  offset = 0;
  pageSizeList = itemsPerPageList;
  queryData: any = {};

  // List
  orderListArray: any[] = [];

  // check box
  selectedDatas: any = [];
  tableCheckbox = {
    isSelectAll: false
  };

  // filters dynamic columns
  backupColumns = structuredClone(fields);

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  // Alerts
  alertConfig = {};
  // bulk Action
  bulkAction = bulkActions;
  // Reusable form 
  formObjFormGroup: any;
  dynamicObjControls: any = {};
  backupFormValue = {};
  formValueExists = false;

  currencySymbol: any = {};
  initalLoading: boolean = false;

  // Sort 
  sortOption: any = sort;
  sortname: string = ''
  sortOrder: any = ''

  // Status Option
  statusOption: any = []

  // Status Changes
  StatusChanges: string;

  // Subscriptions
  private subscriptions: Subscription = new Subscription();
  // Vendor Details
  public vendorDetails: any;

  // Arrow functions
  trackByIndex = (index: number): number => index;

  constructor(public orderSandbox: OrderSandbox,
    public paymentSandbox: PaymentSandbox,
    public router: Router,
    public route: ActivatedRoute,
    public modal: NgbModal,
    public fb: UntypedFormBuilder,
    private ref: ChangeDetectorRef,
    private service: OrderService,
    private titleService: Title,
    public commonSandbox: CommonSandbox,) { }

  ngOnInit(): void {
    // form
    this.buildForm();

    let check = JSON.parse(localStorage.getItem('vendorUser'));

    // Orders Status List
    this.getOrderStatusList();

    // this.getVendorProfile();

    // Title
    this.titleService.setTitle("Orders");
    this.currencySymbol = JSON.parse(localStorage.getItem("vendor-settings"))?.currencySymbol
  }

  // get Vendor Profile
  private getVendorProfile() {
    this.commonSandbox.doGetProfile();
    this.subscriptions.add(this.commonSandbox.getProfile$.subscribe((profile: any) => {
      if (profile) {

        this.vendorDetails = profile;


      }

    }));
  }

  // Filter open
  open(): void {
    this.formObjFormGroup.patchValue(structuredClone(this.backupFormValue));
  }

  // Order Status Changes
  orderStatusChange(value): void {
    this.StatusChanges = value.name;


    this.routeSubscribe();




  }



  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == "Invoice") {
          this.downloadInvoice(e?.vendorOrderId)
          // this.edit(e.id);
        } else if (e.actionType == "Archive") {
          this.makeArchive(e?.vendorOrderId)
          // this.delete(e.id);
        }
        break;
      case "checkBox":
        this.selectedDatas = e.selectedDatas;
        break;
    }
  }

  //View Order Page 
  vieworder(id: number): void {
    this.router.navigate(['sales/manage-orders/all-orders/view-orders', id], { queryParams: this.getQueryParam() });
  }

  // Page change event pagination
  onPageChange(event: { offset: number; limit: number }): void {

    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.offset = (this.currentPage - 1) * this.limit;
    this.getOrderList();
  }

  // Per page change drop down
  pageSizeChange(e): void {
    this.onPageChange({ limit: e.id, offset: 0 });
  }

  // Filters
  applyFilter(): void {
    this.currentPage = 1;
    this.offset = 0;
    this.filterValueUpdate();
    this.resetAll();
  }

  // Search reset
  clearSearch(): void {
    this.offset = 0;
    this.currentPage = 1;
    this.resetAll();
  }

  // Search name
  searchItems(): void {
    this.offset = 0;
    this.currentPage = 1;
    this.resetAll();
  }

  // Remove filter
  removeFilter(remove): void {
    this.offset = 0;
    this.currentPage = 1;
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }
  // Reset filters
  filterReset(type: string): void {
    this.offset = 0;
    this.currentPage = 1;
    if (type == 'clearAll') {
      this.formObjFormGroup.reset()
    } else {
      this.formObjFormGroup.patchValue({
        'Order ID': '',
        'Customer Name': '',
        'Total Amount': '',
        'Tags': ''
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }


  // Bulk actions
  actionType(type: string): void {
    switch (type) {
      case 'resetCheckbox':
        this.resetCheckbox();
        break;
      case 'exportExcel':
        this.exportExcel()
        break;
      case 'exportExcelAll':
        this.exportExcelAll()
        break;
      case 'bulkUpload':
        this.BulkUpload()
        break;
    }
  }

  // Save columns
  saveColumns(data: any): void {
    this.backupColumns = structuredClone(data);
    this.showHideTableColumn();
  }

  // sort acending decendinng 
  SortValueChange(newValue: any): void {
    this.sortname = newValue?.name;
    this.sortOrder = ['', null, undefined].includes(this.sortOrder) ? 'ASC' : this.sortOrder
    this.routeSubscribe();
  }

  // sort field
  SortValueChangeOrder(value): void {
    this.sortOrder = value;
    this.routeSubscribe();
  }

  // Query param value and pagination
  private getQueryParam(): any {
    const params = {
      limit: this.limit,
      offset: this.offset,
      currentPage: this.currentPage,
      keyword: this.backupFormValue['Search'] ?? '',
      orderId: this.backupFormValue['Order ID'] ?? '',
      amount: this.backupFormValue['Total Amount'] ? this.backupFormValue['Total Amount'] : '',
      tags: this.backupFormValue['Tags'] ? this.backupFormValue['Tags'] : '',
      customerName: this.backupFormValue['Customer Name'] ? this.backupFormValue['Customer Name'] : '',
      statusType: this.StatusChanges ?? '',
      sortBy: this.sortname,
      sortOrder: this.sortOrder

    };
    return params;
  }

  // Dropdown Close
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
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
        'Tags': paramsValue.tags ?? "",

        'Search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.getOrderList();
    this.getOrderListcount();
  }

  //Show hide table column
  private showHideTableColumn(): void {
    this.dynamicColumnFields.forEach(val => {
      if (val.hasOwnProperty('filterColName')) {
        val.checked = this.backupColumns[val.filterColName];
      }
    })
  }

  // Orders Status List
  getOrderStatusList(): void {
    this.orderSandbox.getOrderStatusList({});
    this.subscriptions.add(this.orderSandbox.orderStatusList$.subscribe((val: any) => {
      if (!['', undefined, null].includes(val)) {
        this.statusOption = val
        this.StatusChanges = val[0]?.name
      }
      // Query param route value
      this.routeSubscribe();
    }));
  }


  // Get list
  private getOrderList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let params = removeEmptyKeys(this.getQueryParam());
    params.count = false;
    delete params.currentPage
    params.paymentProcess = 1
    if (this.formValueExists) {
      params.offset = 0
    }
    this.orderSandbox.getAllOrderList(params);
    this.subscriptions.add(
      this.orderSandbox.allOrderList$.subscribe(data => {
        this.orderListArray = [];
        if (data && data?.length > 0) {
          this.initalLoading = false;
          this.orderListArray = data;
          const allApproved = data.every(product => product.orderStatusName === 'Order Delivered');
          this.alertConfig = allApproved ? configureAlertConfig() : configureAlertConfig(contentTranslate.failed, imagesList.failed, className.failed);
          this.reset();
        } else {
          this.initalLoading = true;
        }

      })
    )
    this.updateQueryParam();
  }

  // Count list
  private getOrderListcount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.paymentProcess = 1
    params.count = true;
    delete params.currentPage
    if (this.formValueExists) {
      params.offset = 0
    }
    this.orderSandbox.getAllOrderListcount(params);
  }

  // Value update in queryparams for pagination
  private updateQueryParam(): void {
    this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
  }

  // intialize form
  private buildForm(): void {
    const formObjModel = structuredClone(objForm);
    const formGroupField = getFormControlsFieldsObj(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.filterValueUpdate();
  }

  //Reset All
  private resetAll(): void {
    // this.onPageChange({ limit: this.limit, offset: 0 });
    this.getOrderList();
    this.getOrderListcount();
    this.dropDownClose('dropdownContentFilter');
    this.dropDownClose('dropdownContent');
  }

  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(structuredClone(this.backupFormValue)).some((val: any) => !this.empty.includes(val));
    this.ref.detectChanges();
  }

  // Reset checkbox
  private reset(isChecked = false) {
    this.orderListArray.forEach(val => val.checked = isChecked);
    this.selectedDatas = this.orderListArray.filter(val => val?.checked);
  }

  // Reset check box
  private resetCheckbox(): void {
    this.reset();
    this.tableCheckbox.isSelectAll = false;
    this.tableCheckbox = { ...this.tableCheckbox };
  }

  // Invoice download
  private downloadInvoice(id: number): void {
    const params: any = {};
    params.vendorOrderId = id;
    this.paymentSandbox.downloadInvoice(params);
  }

  // Export excel
  private exportExcel(): void {
    const param: any = {};
    param.vendorOrderId = this.selectedDatas.map(val => val.vendorOrderId)
    this.orderSandbox.OrderedExportAll(param);
    this.subscriptions.add(this.orderSandbox.OrderedExportAll$.subscribe(val => {
      if (val) {
        this.resetCheckbox();
      }
    }));
  }

  // All export download
  private exportExcelAll(): void {
    const param: any = {};
    param.vendorOrderId = []
    this.orderSandbox.OrderedExportAll(param);
    this.subscriptions.add(this.orderSandbox.OrderedExportAll$.subscribe(val => {
      if (val) {
        this.resetCheckbox();
      }
    }));
  }

  // Make Archive
  private makeArchive(id: number): void {
    const params: any = {};
    params.vendorOrderId = id;
    const modelRef = this.modal.open(MakeArchieveModalComponent, {
      size: 'sm', windowClass: 'assignattributesmodal-categories delete-modal', backdrop: 'static', backdropClass: 'createcr', modalDialogClass: 'modal-dialog-centered'
    });
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.orderSandbox.makeArchive(params);
        this.subscriptions.add(this.orderSandbox.makeArchiveLoaded$.subscribe(data => {
          if (data === true) {
            this.getOrderList();
          }
        }));
      }
    })
  }


  //Bulk Upload
  BulkUpload() {
    let orderStatus = []
    this.subscriptions.add(this.orderSandbox.orderStatusList$.subscribe((res: any) => {
      this.ref.detectChanges()
      orderStatus = res
    }))


    const modelRef = this.modal.open(BulkUpdateComponent, {
      size: 'md', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories",
    });
    modelRef.componentInstance.Name = 'Order Status';
    modelRef.componentInstance.orderStatus = orderStatus
    modelRef.componentInstance.Content = 'content.orderstatus';
    modelRef.componentInstance.action = 'Single';
    modelRef.componentInstance.fulfillment = 'fulfillment'
    modelRef.result.then((result) => {
      const params: any = {}
      const data = []
      if (result.modelStatus == 'Save') {
        this.selectedDatas.forEach(res => {
          data.push(res.vendorOrderId)
        })
        params.vendorOrderIds = data
        params.subOrderStatusId = result.StatusChange
        params.fullfillmentStatusId = result.obj.fullfillmentStatusId;


        const cleanedData = Object.fromEntries(
          Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== "")
        );

        if (result.empty !== 0) {
          if (result.StatusChange) {
            this.service.allOrdersStatusUpdate(cleanedData).subscribe((res: any) => {
              if (res.status) {
                this.getOrderList();
                this.selectedDatas = []
              }
            })
          }
        }


      }
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}



