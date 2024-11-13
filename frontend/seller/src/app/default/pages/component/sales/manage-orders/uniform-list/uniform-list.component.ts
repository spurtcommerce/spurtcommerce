// Angular imports
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
// Third Party imports
import { Subscription } from 'rxjs';
// Components
import { MakeArchieveModalComponent } from '../all-orders/make-archieve-modal/make-archieve-modal.component';
// Sandbox
import { OrderSandbox } from '../../../../../../../../src/app/core/order/order.sandbox';
import { PaymentSandbox } from '../../../../../../../../src/app/core/payment/payment.sandbox';
// Constants
import { badgeMappings, badgeStatusMappings, customTable, fields, objForm, removeEmptyKeys, bulkActions } from './uniform-list.constant';
import { itemsPerPage, itemsPerPageList } from '../../../../../../../../src/app/default/shared/components/reusable-pagination/pagination.constant';
import { className, configureAlertConfig, contentTranslate, imagesList } from '../../../../../../../../src/app/default/shared/components/alert-content/alert.content.constant';
// Model
import { getFormControlsFieldsObj, getTypes } from '../../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';

@Component({
  selector: 'app-uniform-list',
  templateUrl: './uniform-list.component.html',
  styleUrls: ['./uniform-list.component.scss']
})
export class UniformListComponent implements OnInit {
  @ViewChild("dropdownContent", { static: false }) dropdownContent!: ElementRef;
  @ViewChild("dropdownContentFilter", { static: false }) dropdownContentFilter!: ElementRef;

  //Dynamic columns Table
  backupData: any = structuredClone(customTable);
  dynamicColumnFields: any = structuredClone(customTable);

  // Pagination
  currentPage = 1;
  limit: number = itemsPerPage;
  offset = 0;
  pageSizeList = itemsPerPageList;
  queryData: any = {};
  pagination: boolean = true;

  // List
  orderListArray: any[] = [];

  // check box
  selectedDatas: any = [];
  tableCheckbox = {
    isSelectAll: false
  };
  bulkActions = bulkActions

  // filters dynamic columns
  backupColumns = structuredClone(fields);

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

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  // Arrow functions
  trackByIndex = (index: number): number => index;

  // Status Badge
  badgeConfig = badgeMappings;
  badgeStatusMappings = badgeStatusMappings;
  form: UntypedFormGroup;
  constructor(public orderSandbox: OrderSandbox,
    public paymentSandbox: PaymentSandbox,
    public router: Router,
    public route: ActivatedRoute,
    public modal: NgbModal,
    public fb: UntypedFormBuilder,
    private ref: ChangeDetectorRef,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    // form
    this.buildForm();

    /*query param route value*/
    this.routeSubscribe();
  }

  // Filter open
  open(): void {
    this.formObjFormGroup.patchValue(structuredClone(this.backupFormValue));
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

  // Page change event pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.getOrderList();
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

  // Search reset
  clearSearch(): void {
    this.resetAll();
  }


  // Search name
  searchItems(): void {
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
      this.formObjFormGroup.reset();
    } else {
      this.formObjFormGroup.patchValue({
        'Order ID': '',
        'Customer Name': '',
        'Total Amount': '',
        'Update On': null
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
        break
      case 'exportExcelAll':
        this.exportExcelAll()
        break
      case 'bulkUpload':
        break
    }
  }

  // Save columns
  saveColumns(data: any): void {
    this.backupColumns = structuredClone(data);
    this.showHideTableColumn();
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
      customerName: this.backupFormValue['Customer Name'] ? this.backupFormValue['Customer Name'] : '',
      orderStatus: this.backupFormValue?.['OrderStatus'] ? this.backupFormValue?.['OrderStatus'] : '',
      updateOn: this.backupFormValue?.['Update On'] ? this.backupFormValue?.['Update On'] : null,
      status: this.backupFormValue?.['Status'] ? this.backupFormValue?.['Status'] : ''
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
      this.formObjFormGroup?.controls['Status']?.get(['', null, undefined].includes(paramsValue.status) ? null : paramsValue.status);
      this.formObjFormGroup?.controls['Update On']?.get(['', null, undefined].includes(paramsValue.updateOn) ? null : paramsValue.updateOn);
      // this.formObjFormGroup.patchValue({
      //   'Order ID': paramsValue.orderId ?? "",
      //   'Customer Name': paramsValue.customerName ?? "",
      //   'Total Amount': paramsValue.amount ?? "",

      //   'Update On': paramsValue.updateOn ?? '',
      //   'Status': paramsValue.status ?? '',
      //   'Search': paramsValue.keyword ?? ""
      // });
     
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

  // Get list
  private getOrderList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let params = removeEmptyKeys(this.getQueryParam());
    params.isRefresh = false;
    params.keyUp = false;
    params.count = false;
    if (this.backupFormValue['Update On']) {
      params.updateOn = this.datePipe.transform(this.backupFormValue['Update On'], 'dd-MM-yyyy') ?? null
    }
    this.orderSandbox.getAllOrderList(params);
    this.subscriptions.add(
      this.orderSandbox.allOrderList$.subscribe(data => {
        this.orderListArray = [];
        if (data && data.length > 0) {
          data.forEach(val => {
            val.imageMenuStatus = 2
            val.active = 1
          })
          this.orderListArray = data;
          const allApproved = data.every(product => product.orderStatusName === 'Order Delivered');
          this.alertConfig = allApproved ? configureAlertConfig() : configureAlertConfig(contentTranslate.failed, imagesList.failed, className.failed);
          this.reset();
        }

      })
    )
    this.updateQueryParam();
  }

  // Count list
  private getOrderListcount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.isRefresh = false;
    params.keyUp = false;
    params.count = true;
    params.orderId = this.backupFormValue?.['OrderId'] ? this.backupFormValue?.['OrderId'] : '';
    params.amount = this.backupFormValue?.['TotalAmount'] ? this.backupFormValue?.['TotalAmount'] : '';
    params.customerName = this.backupFormValue?.['CustomerName'] ? this.backupFormValue?.['CustomerName'] : '';
    params.orderStatus = this.backupFormValue?.['OrderStatus'] ? this.backupFormValue?.['OrderStatus'] : '';
    if (this.backupFormValue['Update On']) {
      params.updateOn = this.datePipe.transform(this.backupFormValue['Update On'], 'dd-MM-yyyy') ?? null
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
    const param: any = {}
    param.suppliercontactIds = this.selectedDatas.map(val => val.id).toString();
    this.orderSandbox.OrderedExportAll(param);
  this.subscriptions.add(this.orderSandbox.OrderedExportAll$.subscribe(val => {
      if (val) {
        this.resetCheckbox();
      }
    }));
  }

  // All export download
  private exportExcelAll(): void {
    const param = {
      suppliercontactIds: ""
    }
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}