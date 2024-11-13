// Angular imports
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, FormGroup } from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
// Third Party imports
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
// Sandbox
import { OrderSandbox } from '../../../../../../core/order/order.sandbox';
// Constants
import { getFormControlsFieldsObj, getTypes } from '../../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';
import { fields, customTable, bulkActions, objForm, removeEmptyKeys, contentTranslate, sort } from '../../../sales/manage-orders/archive-orders/archive-orders.constant'
import { itemsPerPage, itemsPerPageList } from '../../../../../../../../src/app/default/shared/components/reusable-pagination/pagination.constant';
import { configureAlertConfig } from '../../../../../../../../src/app/default/shared/components/alert-content/alert.content.constant';
import { imagesList } from '../../../../../../../../src/app/default/shared/components/alert-content/alert.content.constant';


@Component({

  selector: 'app-archive-orders',
  templateUrl: './archive-orders.component.html',
  styleUrls: ['./archive-orders.component.scss'],
})
export class ArchiveOrdersComponent implements OnInit, AfterViewInit {
  @ViewChild('dropdownContent', { static: false }) dropdownContent: ElementRef;
  @ViewChild('dropdownContentFilter', { static: false }) dropdownContentFilter: ElementRef;

  //Dynamic columns
  backupData: any = structuredClone(customTable);
  dynamicColumnFields: any = structuredClone(customTable);
  // Pagination
  public limit = itemsPerPage;
  public offset: any = 0;
  public currentPage: any = 1;
  pageSizeList = itemsPerPageList;
  // Filter Id
  public filterDataId = [];
  // public filter = false;
  filters: any = {}
  _Object = Object;
  empty = [null, '', undefined];
  // CheckBox
  tableCheckbox = {
    isSelectAll: false
  };
  bulkActions = bulkActions
  // DropDown
  @ViewChild(NgbDropdown)
  public dropdown: NgbDropdown;
  // common
  config: any;
  public vendorDetails: any;
  //QueryParams
  queryParams: any = {};
  public queryData: any = {};
  public keyword;
  //Translation 
  translateName: any;
  //Loader
  loader: boolean = false;
  //Filter Dynamic Columns
  filterColumns = JSON.parse(JSON.stringify(fields));
  backupColumns = JSON.parse(JSON.stringify(fields));
  // Arrow functions
  trackByIndex = (index: number): number => index;
  // Reusable form 
  formObjFormGroup: any;
  dynamicObjControls: any = {};
  backupFormValue = {};
  formValueExists = false;
  alertConfig: any = {};
  // Count
  count: any;
  initalLoading: boolean = false;

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

   // Sort 
   sortOption: any = sort;
   sortname: string = ''
   sortOrder: any = ''

  constructor(
    public orderSandbox: OrderSandbox,
    public formBuilder: UntypedFormBuilder,
    public router: Router, public route: ActivatedRoute,
    public toastr: ToastrService,
    public translate: TranslateService,
    public titleService: Title,
    private ref: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    this.alertConfig = configureAlertConfig(contentTranslate.success, imagesList.success, '');
    this.titleService.setTitle('Archive Orders')
    this.vendorDetails = JSON.parse(localStorage.getItem('vendorUserDetails'));
    // Form
    this.initFilterForm();
    // Query param route value
    this.routeSubscribe();

    this.subscriptions.add(this.orderSandbox.archiveOrderList$.subscribe(data => {
    }));
  }

  ngAfterViewInit(): void {
    this.config = {
      observer: true,
      slidesPerView: 6,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: true,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2
        },
        960: {
          slidesPerView: 3
        },
        1280: {
          slidesPerView: 4
        },
        1500: {
          slidesPerView: 5
        }
      }
    };
  }

  // Filter open
  open(): void {
    this.formObjFormGroup.patchValue(structuredClone(this.backupFormValue));
  }
  // Form

  initFilterForm(): void {
    const formObjModel = structuredClone(objForm);
    const formGroupField = getFormControlsFieldsObj(formObjModel);
    this.formObjFormGroup = this.formBuilder.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.filterValueUpdate();
  }

  // value update in queryparams and pagination//
  private updateQueryParam(): void {
    this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
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
        'Search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.getArchiveOrderList();
    this.getArchiveOrderCount();
  }

  // Page change event pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.offset = (this.currentPage - 1) * this.limit;
    this.getArchiveOrderList();
  }

  // Per page change drop down
  pageSizeChange(e): void {
    this.onPageChange({ limit: e.id, offset: 0 });
  }

  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(structuredClone(this.backupFormValue)).some((val: any) => !this.empty.includes(val));
    this.ref.detectChanges();
  }

  //Button Action
  buttonAction(e: any): void {
    switch (e.key) {
      case "checkBox":
        this.filterDataId = e.selectedDatas;
        break;
      case "Revoke":
        this.revokeArchieveOrder(e.vendorOrderArchiveId)
    }
  }


  // Get List
  getArchiveOrderList(): void {
    const params = removeEmptyKeys(this.getQueryParam());
    params.isRefresh = false;
    params.keyUp = false;
    params.offset = this.offset;
    params.limit = this.limit;
    params.keyword = this.backupFormValue['Search'] ? this.backupFormValue['Search'] : '';
    params.startDate = this.backupFormValue['fromDate'] ? this.datePipe.transform(this.backupFormValue['fromDate'], 'yyyy-MM-dd') : '';
    params.endDate = this.backupFormValue['toDate'] ? this.datePipe.transform(this.backupFormValue['toDate'], 'yyyy-MM-dd') : '';
    this.orderSandbox.getArchiveOrderList(params);
    this.subscriptions.add(this.orderSandbox.archiveOrderList$.subscribe((data) => {
      if (data && data?.length > 0) {
        this.initalLoading = false;
      } else {
        this.initalLoading = true;
      }
    }));
    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.currentPage || 1;
    this.updateQueryParam();
  }

  // Count List
  getArchiveOrderCount(): void {
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    params.keyword = this.backupFormValue['Search'] ? this.backupFormValue['Search'] : '';
    params.startDate = this.backupFormValue['fromDate'] ? this.datePipe.transform(this.backupFormValue['fromDate'], 'yyyy-MM-dd') : '';
    params.endDate = this.backupFormValue['toDate'] ? this.datePipe.transform(this.backupFormValue['toDate'], 'yyyy-MM-dd') : '';
    this.orderSandbox.getArchiveOrderListCount(params);
    this.subscriptions.add(this.orderSandbox.archiveOrderListCount$.subscribe(((val) => {
      this.count = val;
    })));
  }

  // Save columns
  saveColumns(data: any): void {
    this.backupColumns = structuredClone(data);
    this.showHideTableColumn();
  }

  //Show hide table column
  private showHideTableColumn(): void {
    this.dynamicColumnFields.forEach(val => {
      if (val.hasOwnProperty('filterColName')) {
        val.checked = this.backupColumns[val.filterColName];
      }
    })
  }

  //Date format change
  formatDates(date: Date): string {
    return moment(date).format('DD-MM-YYYY');
  }

  // Remove Filter
  removeFilter(remove): void {
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
    this.getArchiveOrderList();
    this.getArchiveOrderCount();
  }

  // Filters
  applyFilter(): void {
    this.offset = 0
    this.currentPage = 1
    this.filterValueUpdate();
    this.resetAll();
  }

  // Reset filters
  filterReset(type: string): void {
    if (type == 'clearAll') {
      this.formObjFormGroup.reset()
    } else {
      this.formObjFormGroup.patchValue({
        'fromDate': '',
        'toDate': '',
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  // ResetAll
  private resetAll(): void {
    this.getArchiveOrderList();
    this.getArchiveOrderCount();
    this.dropDownClose('dropdownContentFilter');
    this.dropDownClose('dropdownContent');
  }


  // Checkbox
  exportOrder(): void {
    if (this.filterDataId.length > 0) {
      let params: any = {};
      const vendorOrderArchiveId: any = []
      this.filterDataId.forEach((res: any) => {
        vendorOrderArchiveId.push(res.vendorOrderArchiveId)
      })
      params.vendorOrderArchiveId = vendorOrderArchiveId
      this.orderSandbox.exportArchiveOrder(params);
    }
  }

  exportAllArchiveOrder(): void {
    const params: any = {};
    params.vendorId = this.vendorDetails.vendorId;
    this.orderSandbox.exportAllArchiveOrder(params);
  }

  // Bulk actions
  actionType(type: string): void {
    switch (type) {
      case 'resetCheckbox':
        this.resetCheckbox();
        break;
      case 'exportExcel':
        this.exportOrder()
        break
      case 'exportExcelAll':
        this.exportAllArchiveOrder()
        break
      case 'bulkUpload':
        break
    }
  }

  // Reset check box
  private resetCheckbox(): void {
    this.reset();
    this.tableCheckbox.isSelectAll = false;
    this.tableCheckbox = { ...this.tableCheckbox };
  }

  // Reset

  private reset(isChecked = false) {
    this.filterDataId.forEach(val => val.checked = isChecked);
    this.subscriptions.add(this.orderSandbox.archiveOrderList$.subscribe((res: any) => {
      this.filterDataId = res.filter(val => val?.checked);
    }));
  }

  // Revoke Function
  revokeArchieveOrder(id) {
    const params: any = {};
    params.vendorOrderArchiveId = id;
    this.orderSandbox.revokeArchieveOrder(params);
    this.subscriptions.add(this.orderSandbox.revokeArchieveOrderLoaded$.subscribe(data => {
      if (data) {
        this.toastr.success('Successfully revoked')
        this.getArchiveOrderList();
      }
    }));
  }
  // order detail page
  goToArchieveDetail(id): void {
    this.router.navigate(['/sales/manage-orders/archive-orders/archive-orders-detail/' + id], { queryParams: this.queryData });
  }

  archieveOrderKeyword(e) {
    this.getArchiveOrderList();
    this.getArchiveOrderCount();
  }

  // DropDown Close
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }

  isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}


