/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PaymentSandbox } from '../../../../../../../../../core/admin/vendor/pages/payment/payment.sandbox';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LayoutSandbox } from '../../../../../../../../../core/admin/layout/layout.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { DynamicDatePipe } from 'src/theme/default/admin/shared/components/pipes/date.pipe';
import { EXPANSION_PANEL_ANIMATION_TIMING } from '@angular/material/expansion';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-list',
  templateUrl: 'payment-list.component.html',
  styleUrls: ['payment-list.component.scss'],
  providers:[DynamicDatePipe],
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

export class PaymentListComponent implements OnInit {
  @ViewChild("myDropdown") myDropdown!: NgbDropdown;
  @ViewChild('myInput') myInput: ElementRef;
  model: NgbDateStruct;
  public buttonCheck = true;
  public buttonActive = false;
  public filterEnable = true;
  // pagination
  public pageSize;
  public offset: any = 0;
  public limit = 10;
  public index: any = 0;
  public keyword: string;
  public fromDate: string;
  public toDate: string;
  private isCount: boolean;
  
  // pagination
  public previousSort = {};
  public selectedSortField = '';
  public currentPage = 1;
  public paymentList: UntypedFormGroup;
  public submitted = false;
  public keywordInput: any;
  public fromDateInput: any;
  public toDateInput: any;
  public isCollapsed = [];
  public isChecked: any = [];
  public checkedData: any = [];
  public sampleArray: any = [];
  public bulkFunction = false;
  public queryData: any = {};
  public selectedAll: any;
  public paymentListData: any = [];
  miniDate: any;
  displayStartDate: string;
  displayEndDate: string;
  startDate: string;
  endDate: string;
  todaysDate: any;
  paymentCount: any;
  filterDataId:any=[]
  filterSearch: any={}
  customerName: any='';

  // currency
  public currency = JSON.parse(sessionStorage.getItem('adminCurrency'));

 
  constructor(
    public paymentSandbox: PaymentSandbox,
    public dynamicDate:DynamicDatePipe,
    public commonSandbox: LayoutSandbox,
    public fb: UntypedFormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    private ChangeDetectors: ChangeDetectorRef,
    public titleService: Title,
  ){
    this.titleService.setTitle('Payments');
  }

  ngOnInit() {
    this.initForm();

    this.pageSize = sessionStorage.getItem('itemsPerPage')
      ? sessionStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.isCount = true;
    this.keyword = '';
    this.fromDate = '';
    this.toDate = '';
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.index = this.route.snapshot.queryParamMap.get('index');
    this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.paymentLists();
    this.getPaymentListCount();
    // this.paymentSandbox.getPaymentDashboardCount();
  }

  paymentLists() {
    this.offset = (this.currentPage - 1) * this.limit;
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.count = 0;
    params.customerName = this.customerName ?this.customerName:'';
    params.keyword = this.keyword ? this.keyword:''
    params.startDate = this.fromDate;
    params.endDate = this.toDate;

    this.paymentSandbox.getPaymentList(params);
    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.index || 0;
    this.paymentSandbox.getPaymentList$.subscribe(data => {
      this.paymentListData = data;
    })
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

      
  
  }

  getPaymentListCount() {
    this.offset = (this.currentPage - 1) * this.limit;
    const params: any = {};
    // params.limit = this.pageSize;
    params.offset = this.offset;
    params.count = 1;
    params.customerName = this.customerName ?this.customerName:'';
    params.keyword = this.keyword ? this.keyword:''
    params.startDate = this.fromDate;
    params.endDate = this.toDate;
    this.paymentSandbox.getPaymentListCount(params);
    this.paymentSandbox.getPaymentListCount$.subscribe(datas => {
      this.paymentCount = datas
      this.ChangeDetectors.detectChanges();
    })
  }


  check(event) {
    if (event.target.checked) {
      this.buttonActive = false;
      this.buttonCheck = event.target.checked;
      this.filterEnable = true;
    } else {
      this.buttonActive = true;
      this.buttonCheck = event.target.checked;
      this.filterEnable = false;
    }
  }

  /**
   * Handles form 'onPageChange' event. when page changes
   * @param event form event
   */
 
  initForm() {
    this.keywordInput = new UntypedFormControl('', [Validators.required]);
    this.fromDateInput = new UntypedFormControl('', [Validators.required]);
    this.toDateInput = new UntypedFormControl('', [Validators.required]);
    this.paymentList = this.fb.group({
      keywordInput: this.keywordInput,
      fromDateInput: this.fromDateInput,
      toDateInput: this.toDateInput,
    });
  }
  onDateSelect(event) {
    this.miniDate = event;
  }
  onSubmit() {
    this.customerName = this.paymentList.value.keywordInput ? this.paymentList.value.keywordInput : '';
    const form = this.paymentList.value.fromDateInput;
    const to = this.paymentList.value.toDateInput;
  
    // Function to format date as yyyy-mm-dd
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month starts from 0
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    };
  
    if (form instanceof Date) {
      this.fromDate = formatDate(form);
      this.displayStartDate = this.fromDate;
    }
  
    if (to instanceof Date) {
      this.displayEndDate = formatDate(to);
      this.toDate = this.displayEndDate;
    }
  
    this.isCount = true;
    
    this.filterSearch = {
      'customerName': this.customerName,
      'fromDate': this.fromDate,
      'toDate': this.toDate
    };
    // this.keyword=this.customerName
      this.paymentLists();
      this.getPaymentListCount();
   
    this.myDropdown.close();
  }
  removeFilter(removeFilter): void {

    this.filterSearch[removeFilter.key] = '';
    this[removeFilter.key] = '';

    this.offset = 0;
    this.paymentLists();
    this.getPaymentListCount();
    this.keywordInput =''    
    this.paymentList.controls['toDateInput'].setValue(removeFilter.key == 'toDate' ? '' : this.toDateInput);
    this.paymentList.controls['keywordInput'].setValue(removeFilter.key == 'customerName' ? '' : this.customerName);
    this.paymentList.controls['fromDateInput'].setValue(removeFilter.key == 'fromDate' ? '' : this.fromDateInput);
    this.offset = 0;
    this.paymentLists();
    this.getPaymentListCount();
  }

  
  searchList(): void {
    if (this.keyword) {
      this.queryData.keyword = this.keyword;
      this.queryData.pageSize = this.pageSize;
      this.queryData.offset = 0;
      this.queryData.index = 1;
      this.index = 1;
      this.filterSearch.keyword = this.keyword;
      this.paymentLists();
      this.getPaymentListCount();

    } else {
      this.offset = this.route.snapshot.queryParamMap.get("offset") || 0;
      this.index = this.route.snapshot.queryParamMap.get("index");
      this.paymentLists();
      this.getPaymentListCount();
    }
  }
  keywordchange(event){
    this.filterSearch.keyword=event
    this.customerName=""
      }

  reset() {
    this.paymentList.reset();
    const param: any = {};
    this.offset = 0;
    this.fromDate = '';
    this.startDate = '';
    this.endDate = '';
    this.keyword = '';
    this.toDate = '';
    this.customerName="";
    this.isCount = true;
    this.filterSearch=[]
    this.paymentLists();
    this.getPaymentListCount();
    this.myDropdown.close();
  }


  selectAll() {
    for (let i = 0; i < this.paymentListData.length; i++) {
      this.paymentListData[i].selected = this.selectedAll;
    }
    this.filterDataList();
    if (this.checkedData.length > 0) {
      this.bulkFunction = true;
    } else {
      this.bulkFunction = false;
    }
  }

  checkIfAllSelected() {
    this.bulkFunction = true;
    this.selectedAll = this.paymentListData.every(function (item: any) {
      return item.selected === true;
    });
    this.filterDataList();
    if (this.checkedData.length > 0) {
      this.bulkFunction = true;
    } else {
      this.bulkFunction = false;
    }
  }

  deselectAll() {
    for (let i = 0; i < this.paymentListData.length; i++) {
      this.paymentListData[i].selected = false;
    }
    this.selectedAll = false;
    this.bulkFunction = false;
    this.filterDataId = [];
  }

  filterDataList() {
    this.checkedData = this.paymentListData.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.checkedData.map(obj => obj.id);
  }
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.paymentLists();
  }

  //  export payment

  exportPayment() {
    const params: any = {};
    params.orderId = this.checkedData.map(val=>val.orderId);
    this.paymentSandbox.exportPayment(params);
  }

  calculateTotal(total, commision) {
    const amt = (+total) - (+commision);
    return Math.round(amt);
  }

  // export all payment

  exportAllPayment() {
    const params: any = {};
    params.customerName = this.keyword;
    params.startDate = this.fromDate;
    params.endDate = this.toDate;
    this.paymentSandbox.exportAllVendorPayment(params);
  }
}
