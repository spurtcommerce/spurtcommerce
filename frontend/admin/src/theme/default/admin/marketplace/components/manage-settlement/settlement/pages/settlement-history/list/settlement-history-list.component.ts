// import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
// import { ConfigService } from '../../../../../../../../../../core/admin/service/config.service';
// import {
//   FormBuilder,
//   FormControl,
//   FormGroup,
// } from '@angular/forms';
// import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { LayoutSandbox } from '../../../../../../../../../../core/admin/layout/layout.sandbox';
// import { PaymentSandbox } from '../../../../../../../../../../core/admin/vendor/pages/payment/payment.sandbox';
// import { SettlementHistorySandbox } from '../../../../../../../../../../core/admin/vendor/vendor-settlements/settlement-history/settlement-history.sandbox';
// import { VendorProductSandbox } from '../../../../../../../../../../core/admin/vendor/pages/vendor-product/vendor-product.sandbox';
// import { SettlementHistoryModalComponent } from '../modals/settlement-history-modal.component';
// import { Subscription } from 'rxjs';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Title } from '@angular/platform-browser';
// import { DynamicDatePipe } from 'src/theme/default/admin/shared/components/pipes/date.pipe';

// Angular imports
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
// Third Party imports
import { Subscription } from 'rxjs';
import * as moment from 'moment';
// Sandbox
import { SettlementHistorySandbox } from 'src/core/admin/vendor/vendor-settlements/settlement-history/settlement-history.sandbox';

// Constants  
import { bulkActions, customTable, filterFields, removeEmptyKeys } from './settlement-history-list.contant';
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
// environment
import { environment } from 'src/environments/environment';
import { SettlementHistoryModalComponent } from '../modals/settlement-history-modal.component';
@Component({
  selector: 'app-vendor-settlement-history',
  templateUrl: 'settlement-history-list.component.html',
  styleUrls: ['settlement-history-list.component.scss'],
})
export class SettlementHistoryListComponent implements OnInit, OnDestroy {
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;

  //Dynamic columns
  customTable: any = customTable;

  // Pagination
  currentPage = 1;
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;
  offset = 0;
  queryData: any = {};
  pagination: boolean = true;

  // Currency
  currency = JSON.parse(sessionStorage.getItem('adminCurrency'));

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

  // Bulk Action
  bulkAction = bulkActions;

  // environment
  imageUrl: string = environment.imageUrl;

  constructor(
    public titleService: Title,
    private router: Router,
    public route: ActivatedRoute,
    public sandbox: SettlementHistorySandbox,
    public fb: UntypedFormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.titleService.setTitle('Settlement History');

    // Form
    this.buildForm();
    /*query param route value*/
    this.routeSubscribe();
  }

  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "checkBox":
        this.selectedDatas = e.selectedDatas;
        break;
      case "imageMenu":
        this.viewSettlementDetails(e);
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
        'FromDate': '',
        'ToDate': '',
        'RangeFrom': '',
        'RangeTo': '',
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
    this.sandbox.getSettlementHistoryList(param);
    this.subscriptions.add(this.sandbox.historyList$.subscribe(element => {
      this.settlementList = element;
    }))
    this.updateQueryParam();
  }

  // settlement list count
  productCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    this.sandbox.getSettlementHistoryListCount(params);
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
      keyword: this.backupFormValue['search'] ? this.backupFormValue['search'] : '',
      startDate: this.backupFormValue['FromDate'] ? moment(this.backupFormValue['FromDate']).format('YYYY-MM-DD') : '',
      endDate: this.backupFormValue['ToDate'] ? moment(this.backupFormValue['ToDate']).format('YYYY-MM-DD') : '',
      amountFrom: this.backupFormValue['RangeFrom'] ? this.backupFormValue['RangeFrom'] : '',
      amountTo: this.backupFormValue['RangeTo'] ? this.backupFormValue['RangeTo'] : '',
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
        'FromDate': paramsValue.startDate ? new Date(paramsValue.startDate) : "",
        'ToDate': paramsValue.endDate ? new Date(paramsValue.endDate) : "",
        'RangeFrom': paramsValue.amountFrom ?? "",
        'RangeTo': paramsValue.amountTo ?? "",
        'search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.productList();
    this.productCount();
  }

  // Bulk actions
  actionType(type: string): void {
    switch (type) {
      case 'resetCheckbox':
        this.resetCheckbox();
        break;
      case 'exportExcel':
        this.exportPayment()
        break;
    }
  }

  // Export Payment
  exportPayment() {
    const params: any = {};
    params.settlementId = this.selectedDatas?.map(res=> res?.id);
    this.sandbox.exportPayment(params);
    this.resetCheckbox();
  }

  viewSettlementDetails(list) {
    const modalRef = this.modalService.open(SettlementHistoryModalComponent, {
      windowClass: 'add-local',animation:false,backdrop: 'static', centered: false
    });
    modalRef.componentInstance.details = list;
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.resetAll();
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}



//   @ViewChild('closeBtn') closeAddExpenseModal: ElementRef;
//   @ViewChild("myDropdown") myDropdown!: NgbDropdown;
//   @ViewChild('myInput') myInput: ElementRef;

//   public ImageUrl: any = '';
//   public checkmodules: any = [];
//   public unCheckData: any = [];
//   public checkCondition: any = [];
//   public offset: any = 0;
//   public index: any = 0;
//   public pageSize:any = 20;
//   private isCount: boolean;
//   public currentPage = 1;
//   public buttoncheck = true;
//   public buttonActive = false;
//   public filterEnable = true;
//   public isChecked: any = [];
//   public sampleArray: any = [];
//   public pageSizeOptions = [10, 20];
//   public deleteItem: any = [];
//   public seriesData: any;
//   public productArray = [];
//   public bulkFunction = false;
//   filterSearch: any = {};
//   public checkAll = false;
//   // Filter
//   public filterForm: FormGroup;
//   public keyword: FormControl;
//   public status: FormControl;
//   public fromDate: FormControl;
//   public toDate: FormControl;
//   public rangeFrom: FormControl;
//   public rangeTo: FormControl;

//   public filterKeyword = '';
//   public startDate = '';
//   public endDate = '';
//   public filterRangeFrom = '';
//   public filterRangeTo = '';
//   public subscriptions: Array<Subscription> = [];
//   public filterData: any = [];
//   public filterDataId = [];
//   public selectedAll: any;
//   public currency: any;
//   public queryData: any = {};
//   miniDate: any;
//   displayStartDate: string;
//   displayEndDate: string;
//   todaysDate: any;
//   title ='Settlement History'
//   limit: number=10;
//   constructor(
//     private configService: ConfigService,
//     public fb: FormBuilder,
//     public dynamicDate:DynamicDatePipe,
//     public modalService: NgbModal,
//     public commonSandbox: LayoutSandbox,
//     public paymentSandbox: PaymentSandbox,
//     public sandbox: SettlementHistorySandbox,
//     public productSandbox: VendorProductSandbox,
//     public router: Router,
//     public route: ActivatedRoute,
//     public titleService:Title
//   ) {
//     this.subscribeVal();
//   }

//   ngOnInit() {
//     this.titleService.setTitle(this.title);
//     this.pageSize = sessionStorage.getItem('itemsPerPage')
//     ? sessionStorage.getItem('itemsPerPage')
//     : this.pageSize;
    
//     this.currency = JSON.parse(sessionStorage.getItem('adminCurrency'));
//     this.ImageUrl = this.configService.getImageUrl();
//     this.paymentSandbox.getPaymentDashboardCount();
//     this.todaysDate = {
//       year: new Date().getFullYear(),
//       month: new Date().getMonth() + 1,
//       day: new Date().getDate()
//     };

//     this.initFilterForm();
//     this.isCount = true;
//     this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
//     this.index = this.route.snapshot.queryParamMap.get('index');
//     this.settlementHistoryList();
//     this.settlementHistoryListCount();
//   }

//   initFilterForm() {
//     this.filterForm = this.fb.group({
//       keyword: [''],
//       fromDate: [''],
//       toDate: [''],
//       rangeFrom: [''],
//       rangeTo: ['']
//     });
//   }

//   check(event) {
//     if (event.target.checked) {
//       this.buttonActive = false;
//       this.buttoncheck = event.target.checked;
//       this.filterEnable = true;
//     } else {
//       this.buttonActive = true;
//       this.buttoncheck = event.target.checked;
//       this.filterEnable = false;
//     }
//   }

//   removeFilter(removeFilter): void {
    
//     this.filterSearch[removeFilter.key] = '';
//     this[removeFilter.key] = '';
   
//     this.offset = 0;
    
    
    
//     // this.vendorName = removeFilter.key == 'CompanyName' ? '' : this.vendorName;
//     this.filterKeyword = removeFilter.key == 'companyName' ? '' : this.filterKeyword;
//     this.startDate = removeFilter.key == 'fromDate' ? '' : this.startDate;
//     this.endDate = removeFilter.key == 'toDate' ? '' : this.endDate;
//     this.filterRangeFrom = removeFilter.key == 'filterRandgeFrom' ? '' : this.filterRangeFrom;
//     this.filterRangeTo = removeFilter.key == 'filterRangeTo' ? '' : this.filterRangeTo;
    
  
//     this.filterForm.controls['keyword'].setValue(removeFilter.key == 'companyName' ? '' : this.filterKeyword);
//     this.filterForm.controls['fromDate'].setValue(removeFilter.key == 'Email' ? '' : this.startDate);
//     this.filterForm.controls['toDate'].setValue(removeFilter.key == 'Date' ? '' : this.endDate);
//     this.filterForm.controls['rangeFrom'].setValue(removeFilter.key == 'BuyerGroup' ? '' : this.filterRangeFrom);
//     this.filterForm.controls['rangeTo'].setValue(removeFilter.key == 'filterRangeTo' ? '' : this.filterRangeTo);
    
    
//     this.offset = 0;
//     this.settlementHistoryList();
//     this.settlementHistoryListCount();
  
    
//   }

//   focusInput() {
//     this.myInput.nativeElement.focus();
//   }

//   resetFilter() {
//     // if (this.filterForm.value.keyword || this.filterForm.value.fromDate || this.filterForm.value.toDate || this.filterForm.value.rangeFrom || this.filterForm.value.rangeTo) {
//       this.filterForm.reset();
//       this.filterSearch = {};
//       this.filterKeyword = '';
//       this.startDate = '';
//       this.endDate = '';
//       this.filterRangeFrom = '';
//       this.filterRangeTo = '';
//       // this.pageSize = 20;
//       this.offset = 0;
//       this.index = 0;
//       this.settlementHistoryList();
//       this.settlementHistoryListCount();
//       this.myDropdown.close()
//     // }
//   }
//   onDateSelect(event) {
//     this.miniDate = event;
//   }
//   applyFilter() {
//     this.filterKeyword = this.filterForm.value.keyword || '';
//     // this.startDate = this.filterForm.value.fromDate || '';
//     // this.endDate = this.filterForm.value.toDate || '';
//     const form = this.filterForm.value.fromDate;
//     const to = this.filterForm.value.toDate;
  
//     // this.filter = true;

//     this.startDate= this.dynamicDate.transform(form);
//     this.endDate=this.dynamicDate.transform(to)
//     this.filterRangeFrom = this.filterForm.value.rangeFrom || '';
//     this.filterRangeTo = this.filterForm.value.rangeTo || '';
//     // this.pageSize = 20;
//     this.offset = 0;
//     this.index = 0;
//     this.filterSearch = {
//       'companyName': this.filterKeyword,
//       'fromDate': this.startDate,
//       'toDate': this.endDate,
//       'filterRandgeFrom':this.filterRangeFrom,
//       'filterRangeTo':this.filterRangeTo,
//       // 'OrderStatusId':this.orderStatusId,
//       // 'CompanyName':this.vendorName,
     
//        };
//     if (this.filterKeyword !== '' || this.startDate !== '' || this.endDate !== '' || this.filterRangeTo !== '' || this.filterRangeFrom !== '') {
//       this.settlementHistoryList();
//       this.settlementHistoryListCount();
//       this.myDropdown.close();
//     }
//   }

//   searchList(): void {
//     if (this.keyword) {
//       this.queryData.keyword = this.keyword;
//       this.queryData.pageSize = this.pageSize;
//       this.queryData.offset = 0;
//       this.queryData.index = 1;
//       this.index = 1;

//       // this.filterSearch.keyword = this.keyword

//       this.settlementHistoryList();
//       this.settlementHistoryListCount();

//     } else {
//       this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
//       this.index = this.route.snapshot.queryParamMap.get('index');
//       this.settlementHistoryList();
//       this.settlementHistoryListCount();
//     }
//   }

//   settlementHistoryList() {
//     this.offset = (this.currentPage - 1) * this.limit;
//     const params: any = {};
//     params.offset = this.offset ;
//     params.limit = this.pageSize;
//     params.keyword = this.filterKeyword ?? '';
//     params.startDate = this.startDate ?? '';
//     params.endDate = this.endDate ?? '';
//     params.amountFrom = this.filterRangeFrom;
//     params.amountTo = this.filterRangeTo;
//     this.sandbox.getSettlementHistoryList(params);
//     this.queryData.offset = this.offset || 0;
//     this.queryData.index = this.index || 0;
//     this.router.navigate(
//       [],
//       {
//         relativeTo: this.route,
//         queryParams: this.queryData,
//         queryParamsHandling: 'merge', // remove to replace all query params by provided
//       });
//   }
//   keywordchange(event) {
//     this.filterSearch.keyword = event;
//   }

  
//   deselectAll() {
//     for (let i = 0; i < this.productArray.length; i++) {
//       this.productArray[i].selected = false;
//     }
//     this.selectedAll = false;
//     this.bulkFunction = false;
//     this.filterDataId = [];
//   }

//   settlementHistoryListCount() {
//     const params: any = {};
//     params.offset = this.offset;
//     params.limit = this.pageSize;
//     params.keyword = this.filterKeyword;
//     params.startDate = this.startDate ?? '';
//     params.endDate = this.endDate ?? '';
//     params.amountFrom = this.filterRangeFrom;
//     params.aamountTo = this.filterRangeTo;
//     params.count = 1;
//     this.sandbox.getSettlementHistoryListCount(params);
//   }


//   subscribeVal() {
//     this.subscriptions.push(this.sandbox.historyList$.subscribe(data => {
//       if (data) {
//         this.productArray = [];
//         data.map(val => {
//           val.selected = false;
//           this.productArray.push(val);
//         });
//       }
//     }));
//   }


//   checkIfAllSelected() {
//     this.selectedAll = this.productArray.every(function (item: any) {
//       return item.selected === true;
//     });
//     this.filterDataList();
//     if (this.filterData.length > 0) {
//       this.bulkFunction = true;
//     } else {
//       this.bulkFunction = false;
//     }
//   }
//   // filter product list event for multiple delete
//   filterDataList() {
//     this.filterData = this.productArray.filter(data => {
//       if (data.selected === true) {
//         return data;
//       }
//     });
//     this.filterDataId = this.filterData.map(obj => obj.id);
//   }


//   selectAll(event: any) {
//     for (let i = 0; i < this.productArray.length; i++) {
//       this.productArray[i].selected = this.selectedAll;
//     }
//     this.filterDataList();
//     if (this.filterData.length > 0) {
//       this.bulkFunction = true;
//     } else {
//       this.bulkFunction = false;
//     }
//   }

//   viewSettlementDetails(list) {
//     const modalRef = this.modalService.open(SettlementHistoryModalComponent, {
//       windowClass: 'add-roles',animation:false,backdrop: 'static', centered: false
//     });
//     modalRef.componentInstance.details = list;
//     modalRef.result.then((result) => {
//       if (result === 'success') {
//         this.settlementHistoryList();
//         this.settlementHistoryListCount();
//       }
//     });
//   }

//   exportPayment() {
//     const params: any = {};
//     params.settlementId = this.filterDataId;
//     this.sandbox.exportPayment(params);
//   }
  
//   onPageChange(event: { offset: number; limit: number }): void {
//     this.limit = event.limit;
//     this.currentPage = Math.floor(event.offset / event.limit) + 1;
//     this.settlementHistoryList();
//   }


//     exportAllPayment() {
//       const params: any = {};
//       params.keyword = this.filterKeyword;
//       params.startDate = this.startDate;
//       params.endDate = this.endDate;
//       params.amountFrom = this.filterRangeFrom;
//       params.amountTo = this.filterRangeTo;
//       this.sandbox.exportAllPayment(params);
//     }

//   ngOnDestroy() {
//     this.subscriptions.forEach(each => each.unsubscribe());
//   }
// }
