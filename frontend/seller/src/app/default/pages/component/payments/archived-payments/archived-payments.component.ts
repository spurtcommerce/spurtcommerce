// Angular imports
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

// Third Party imports
import * as moment from 'moment';
import { Subscription } from 'rxjs';
// Sandbox
import { PaymentSandbox } from '../../../../../../../src/app/core/payment/payment.sandbox';
// Constants
import { contentTranslate } from './archived-payments.constant';
import { getTypes } from '../../../../shared/components/reusable-forms/form-constant';
import { imagesList } from '../../../../shared/components/alert-content/alert.content.constant';
import { itemsPerPage } from '../../../../shared/components/reusable-pagination/pagination.constant';
import { getFormControlsFieldsObj } from '../../../../shared/components/reusable-forms/form-constant';
import { itemsPerPageList } from '../../../../shared/components/reusable-pagination/pagination.constant';
import { configureAlertConfig } from '../../../../shared/components/alert-content/alert.content.constant';
import { bulkActions, customTable, fields, objForm, removeEmptyKeys } from './archived-payments.constant';

@Component({
  selector: 'app-archived-payments',
  templateUrl: './archived-payments.component.html',
  styleUrls: ['./archived-payments.component.scss']
})
export class ArchivedPaymentsComponent implements OnInit {
  @ViewChild("dropdownContent", { static: false }) dropdownContent!: ElementRef;
  @ViewChild("dropdownContentFilter", { static: false }) dropdownContentFilter!: ElementRef;

  //Dynamic columns
  backupData: any = structuredClone(customTable);
  dynamicColumnFields: any = structuredClone(customTable);

  // Pagination
  offset = 0;
  currentPage = 1;
  limit: any = itemsPerPage;
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
  // bulk Action
  bulkAction = bulkActions;

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

  constructor(
    public paymentSandbox: PaymentSandbox,
    private ref: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
    public modal: NgbModal,
    private fb: UntypedFormBuilder,
    private titleService: Title) {

  }

  ngOnInit(): void {
    // Form
    this.buildForm();
    // Query param route value
    this.routeSubscribe();
    // Title
    this.titleService.setTitle("Archived Payments");
  }

  // Filter open
  open(): void {
    this.formObjFormGroup.patchValue(this.backupFormValue);
  }

  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == "Invoice") {
          this.downloadInvoice(e?.vendorOrderId)
        } else if (e.actionType == "Archive") {
          this.makeArchive(e?.vendorPaymentId)
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
    this.getPaymentList();
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
        // 'Search': '',
        'From Date': '',
        'To Date': '',
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
        this.exportExcel();
        break;
      case 'exportExcelAll':
        this.exportExcelAll();
        break;
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
      startDate: this.backupFormValue['From Date'] ? moment(this.backupFormValue['From Date']).format('YYYY-MM-DD') : '',
      endDate: this.backupFormValue['To Date'] ? moment(this.backupFormValue['To Date']).format('YYYY-MM-DD') : '',
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
        'From Date': params.startDate ?? "",
        'To Date': params.endDate ?? "",
        'Search': params.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.getPaymentList();
    this.getPaymentListCount();
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
  private getPaymentList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let params = removeEmptyKeys(this.getQueryParam());
    params.count = 0;
    this.paymentSandbox.getArchivePaymentList(params);
    this.subscriptions.add(
      this.paymentSandbox.archivePaymentList$.subscribe(data => {
        this.orderListArray = [];
        if (data && data.length > 0) {
          this.orderListArray = data;
          this.orderListArray.forEach((item) => {
            item.amountWithSymble = !item.currencySymbolLeft ? item.amount : item.currencySymbolLeft + item.amount;
            item.commissionAmountWithSymble = !item.currencySymbolLeft ? item.commissionAmount : item.currencySymbolLeft + item.commissionAmount;
            item.netAmountWithSymble = !item.currencySymbolLeft ? item.NetAmount : item.currencySymbolLeft + item.NetAmount;
          })
          this.alertConfig = configureAlertConfig(contentTranslate.success, imagesList.success);
          this.reset();
        }
      })
    )
    this.updateQueryParam();
  }

  // Count list
  private getPaymentListCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    delete params['limit'];
    delete params['offset'];
    delete params['currentPage'];
    this.paymentSandbox.getArchivePaymentListCount(params);
  }

  // Value update in queryparams for pagination
  private updateQueryParam(): void {
    this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
  }

  // intialize form
  private buildForm(): void {
    const formObjModel = objForm;
    const formGroupField = getFormControlsFieldsObj(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.filterValueUpdate();
  }

  //Reset All
  private resetAll(): void {
    this.getPaymentList();
    this.getPaymentListCount();
    this.dropDownClose('dropdownContentFilter');
    this.dropDownClose('dropdownContent');
  }


  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    if (this.backupFormValue['From Date']) {
      this.backupFormValue['From Date'] = moment(this.backupFormValue['From Date']).format('YYYY-MM-DD');
    }
    if (this.backupFormValue['To Date']) {
      this.backupFormValue['To Date'] = moment(this.backupFormValue['To Date']).format('YYYY-MM-DD');
    }
    this.formValueExists = Object.values(this.backupFormValue).some((val: any) => !this.empty.includes(val));
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
    param.vendorOrderId = this.selectedDatas.map(val => val.vendorOrderId).toString();
    this.paymentSandbox.multiplePaymentExport(param);
    this.subscriptions.add(this.paymentSandbox.MultiplePaymentExport$.subscribe(val => {
      if (val) {
        this.resetCheckbox();
      }
    }));
  }

  // All export download
  private exportExcelAll(): void {
    const param: any = {}
    param.vendorOrderId = []
    this.paymentSandbox.multiplePaymentExport(param);
    this.subscriptions.add(this.paymentSandbox.MultiplePaymentExport$.subscribe(val => {
      if (val) {
        this.resetCheckbox();
      }
    }));
  }

  // Make Archive
  private makeArchive(id) {
    const params = {
      vendorPaymentId: id
    }
    this.paymentSandbox.makePaymentArchive(params);
    this.subscriptions.add(this.paymentSandbox.makePaymentArchive$.subscribe((res: any) => {
      if (res.status == 1) {
        this.getPaymentList();
        this.getPaymentListCount();
      }
    }))
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
