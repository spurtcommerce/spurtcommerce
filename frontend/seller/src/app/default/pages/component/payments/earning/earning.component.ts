// Angular imports
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
// Third Party imports
import { Subscription } from 'rxjs';
// Sandbox
import { EarningSandbox } from '../../../../../../../src/app/core/earning/earning.sandbox';
// Constants
import { getTypes } from '../../../../shared/components/reusable-forms/form-constant';
import { imagesList } from '../../../../shared/components/alert-content/alert.content.constant';
import { itemsPerPage } from '../../../../shared/components/reusable-pagination/pagination.constant';
import { getFormControlsFieldsObj } from '../../../../shared/components/reusable-forms/form-constant';
import { itemsPerPageList } from '../../../../shared/components/reusable-pagination/pagination.constant';
import { configureAlertConfig } from '../../../../shared/components/alert-content/alert.content.constant';
import { bulkActions, contentTranslate, customTable, fields, objForm, removeEmptyKeys } from './earning.constants';

@Component({
  selector: 'app-earning',
  templateUrl: './earning.component.html',
  styleUrls: ['./earning.component.scss']
})
export class EarningComponent implements OnInit {

  @ViewChild("dropdownContent", { static: false }) dropdownContent!: ElementRef;
  @ViewChild("dropdownContentFilter", { static: false }) dropdownContentFilter!: ElementRef;

  //Dynamic columns
  backupData: any = structuredClone(customTable);
  dynamicColumnFields: any = structuredClone(customTable);

  // Pagination
  currentPage = 1;
  limit: any = itemsPerPage;
  offset = 0;
  pageSizeList = itemsPerPageList;
  queryData: any = {};
  pagination: boolean = true;

  // List
  paymentListArray: any[] = [];

  // Count
  count: number;

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

   // currency symbol
  public currency = JSON.parse(localStorage.getItem('adminCurrency'));


  constructor(
    public EarningSandbox: EarningSandbox,
    private ref: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
    public modal: NgbModal,
    private fb: UntypedFormBuilder,
    private titleService: Title) {
    this.titleService.setTitle("Earnings");
  }

  ngOnInit(): void {
    // Form
    this.buildForm();
    //  Query param route value
    this.routeSubscribe();
  }

  // Filter open
  open(): void {
    this.formObjFormGroup.patchValue(this.backupFormValue);
  }

  //Table Actions
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
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
    this.EarningApiList();
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
      this.formObjFormGroup.reset()
    } else {
      this.formObjFormGroup.patchValue({
        'product Name': '',
        'sku': '',
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
      productName: this.backupFormValue['product Name'] ?? '',
      sku: this.backupFormValue['sku'] ?? ''
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
        'product Name': params.productName ?? "",
        'sku': params.sku ?? "",
        'Search': params.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.EarningApiList();
    this.EarningApiCount();
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
  private EarningApiList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let params = removeEmptyKeys(this.getQueryParam());
    params.count = 0;
    this.EarningSandbox.GetEarning(params);
    this.subscriptions.add(
      this.EarningSandbox.GetEarning$.subscribe(res => {
        this.paymentListArray = [];
        if (res && Object.keys(res).length > 0) {
          this.paymentListArray = res.data;
          this.paymentListArray.forEach((item) => {
              item.truncatedText = item.name?.length > 100 ? item.name.slice(0, 100) : item.name;
          
            item.totalSold = !item.soldCount ? '0' : item.soldCount;
          })
          this.alertConfig = configureAlertConfig(contentTranslate.success, imagesList.success, '');
          this.reset();
        }

      })
    )
    this.updateQueryParam();
  }

  // Count list
  private EarningApiCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    delete params['limit']
    delete params['offset']
    this.EarningSandbox.GetEarningCount(params);
    this.subscriptions.add(this.EarningSandbox.GetEarningCount$.subscribe((val:any) => {
      if(val.status==1){
        this.count = val.data
      }
    }))
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
    this.EarningApiList();
    this.EarningApiCount();
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
    this.paymentListArray.forEach(val => val.checked = isChecked);
    this.selectedDatas = this.paymentListArray.filter(val => val?.checked);
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
    param.productId = this.selectedDatas.map(val => val.productId).toString();
    this.EarningSandbox.GetEarningExport(param);
    this.subscriptions.add(this.EarningSandbox.GetEarningExport$.subscribe(val => {
      if (val) {
        this.resetCheckbox();
      }
    }))
  }

  // All export download
  private exportExcelAll(): void {
    const param: any = {};
    param.productId = [];
    this.EarningSandbox.GetEarningExport(param);
    this.subscriptions.add(this.EarningSandbox.GetEarningExport$.subscribe(val => {
      if (val) {
        this.resetCheckbox();
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
