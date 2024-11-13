import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Validators,
  UntypedFormBuilder,
  UntypedFormGroup, ReactiveFormsModule
} from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { OrderSandbox } from '../../../../../core/order/order.sandbox';
import { iif, Subscription } from 'rxjs';
import { ProductSandbox } from '../../../../../core/product/product.sandbox';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sales-report-list',
  templateUrl: './sales-report-list.component.html',
  styleUrls: ['./sales-report-list.component.scss']
})
export class SalesReportListComponent implements OnInit, AfterViewInit, OnDestroy {

  public keyword = '';
  public filterForm: UntypedFormGroup;
  public filter = false;
  public miniDate: any;
  public dateError: string;
  public startDate: any;
  public isRequired = false;
  public endDate: any;
  public selectedAll: any;
  @ViewChild(NgbDropdown)
  public dropdown: NgbDropdown;
  public orderArray = [];
  public filterData: any = [];
  public filterDataId = [];
  public limit = 10;
  public offset = 0;
  public currentPage = 1;
  public submitted = false;
  // public config: SwiperConfigInterface = {};
  config: any;
  public vendorDetails: any;
  private subscriptions: Array<Subscription> = [];
  categoryList = [];
  productList = [];
  public searchcategoryList = false;
  tempsearchcategoryList = [];
  public categoryKeyword: any = '';
  public fromDate: any = null;
  public toDate: any = null;
  public productError = false;
  public selectedProductId: any = [];
  public filterParams: any;
  public manafacturer = false;
  public orderStatus = false;
  public customerGroup = false;
  public orderId = false;
  public paymentType = false;
  public browserInfo = false;
  public vendordetails = JSON.parse(localStorage.getItem('vendorUserDetails'));
  public minPickerDate: any;
  public categorySearch: any;
  public productSearch: any;
  contentshow: boolean = true;
  index: number;
  pageSize: any;
  perPageCount: boolean = false;
  indexs: number;
  emptyBlock = ['', null, undefined]
  // Currency Value getting
  public currencySymbol = JSON.parse(localStorage.getItem('adminCurrency'));


  perpage = [
    { id: 1, name: '10' },
    { id: 2, name: '20' },
    { id: 3, name: '30' },
    { id: 4, name: '40' },
  ];
  selectedpage: any = 10;
  queryParams: any = {};
  constructor(
    public route: ActivatedRoute,
    public orderSandbox: OrderSandbox,
    public formbuilder: UntypedFormBuilder,
    public router: Router,
    public productSandbox: ProductSandbox,
    public cd: ChangeDetectorRef,
    public titleService: Title
  ) {
    this.titleService.setTitle('Sales Report');
    this.offset = parseInt(this.route.snapshot.queryParamMap.get('offset')) || this.offset;
    this.pageSize = this.route.snapshot.queryParamMap.get('pageSize') || this.pageSize;
    this.keyword = this.route.snapshot.queryParamMap.get('keyword') || '';
    this.queryParam(this.pageSize, this.offset, this.index, this.keyword);
    const value = 'pageInital'
    localStorage.setItem('pagination', value)


  }

  ngOnInit() {

    this.vendorDetails = JSON.parse(localStorage.getItem('vendorUserDetails'));
    this.initFilterForm();
    this.salesOrderListCount();
    this.getProductList();
    this.getCategoryList();
    this.subscriptions.push(this.orderSandbox.archiveOrderList$.subscribe(data => {
      if (data) {
        this.orderArray = data;
      }
    }));
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.selectProduct('', '')
    this.toDate = '';
  }

  ngAfterViewInit() {
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

  initFilterForm() {
    this.filterForm = this.formbuilder.group({
      fromDate: [''],
      toDate: ['']
    });
  }

  salesOrderList() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.limit;
    params.keyword = this.keyword;
    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    this.orderSandbox.settlementList(params);
  }

  salesOrderListCount() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.limit;
    params.keyword = this.keyword;
    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    params.count = 1;
    this.orderSandbox.settlementListCount(params);
  }


  applyFilter() {
    if (
      (this.filterForm.controls['toDate'].value === '' ||
        this.filterForm.controls['toDate'].value === null) &&
      this.filterForm.controls['fromDate'].value !== '' &&
      this.filterForm.controls['fromDate'].value !== null
    ) {
      this.isRequired = true;
      return;
    }
    const form = this.filterForm.value.fromDate;
    const to = this.filterForm.value.toDate;
    this.filter = true;
    if (form && form.year) {
      this.startDate = form.year + '-' + form.month + '-' + form.day;
    }
    if (to && to.year) {
      this.endDate = to.year + '-' + to.month + '-' + to.day;
    }
    this.dropdown.close();
    this.salesOrderList();
    this.salesOrderListCount();
  }

  onDateSelect(event) {
    this.miniDate = event;
    this.dateError = '';
  }

  setMinValue(d) {
    this.isRequired = false;
    if (
      this.filterForm.controls['fromDate'].value === '' ||
      this.filterForm.controls['fromDate'].value === null
    ) {
      this.dateError = 'Choose From Date First';
      return;
    }
    d.toggle();
  }

  close() {
    this.dropdown.close();
  }

  resetFilter() {
    this.startDate = '';
    this.endDate = '';
    this.filter = false;
    this.filterForm.reset();
    this.salesOrderList();
    this.salesOrderListCount();

  }

  pageChange(event) {
    this.currentPage = event;
    this.offset = this.limit * (event - 1);
    this.salesOrderList();
  }


  ContentClose() {
    this.contentshow = false;
  }

  getProductList() {
    const params: any = {};
    params.offset = 0;
    params.limit = 0;
    params.sku = '';
    params.status = '';
    params.price = '';
    this.orderSandbox.getProductList(params);
  }

  getCategoryList() {
    const params: any = {};
    params.offset = 0;
    params.limit = 0;
    params.keyword = this.categoryKeyword;
    params.status = '';
    this.orderSandbox.salesReportCategoryList(params);
  }

  searchProduct(key) {
    const params: any = {};
    params.keyword = key;
    this.orderSandbox.searchProduct(params);
  }

  searchCategory(key) {
    const params: any = {};
    params.keyword = key;
    this.orderSandbox.searchCategory(params);
  }

  selectProduct(checked, list) {
    const params: any = {};
    params.list = list;
    params.checked = checked;
    this.orderSandbox.selectProduct(params);
  }


  selectCategory(checked, list) {
    this.submitted = false;
    const params: any = {};
    params.list = list;
    params.checked = checked;
    this.orderSandbox.selectCategory(params);
  }

  generateReport() {
    let productId = [];
    // this.submitted = true;
    // this.productError = false;
    this.subscriptions.push(this.orderSandbox.selectedProductList$.subscribe(data => {
      if (data && data.length > 0) {
        this.selectedProductId = data;
      } else {
        this.selectedProductId = [];
      }
    }));
    if (this.selectedProductId) {
      this.selectedProductId.forEach(data => {
        productId.push(data.productId);
      });
    }
    // if (this.selectedProductId.length === 0) {
    //   // this.productError = true;
    //   return;
    // } else {
    //   this.selectedProductId.forEach(data => {
    //     productId.push(data.productId);
    //   });
    // }
    // this.productError = false;
    // const emptyBlock = ['', null, undefined]
    // if (emptyBlock.includes(this.fromDate) || emptyBlock.includes(this.toDate)) {
    //   return;
    // }

    const params: any = {};
    params.productId = productId.toString();

    const fromdates = this.fromDate;
    params.startDate = fromdates ? (fromdates.year) + '-' + ('0' + fromdates.month).slice(-2) + '-' + ('0' + fromdates.day).slice(-2) : '';
    const todates = this.toDate;
    params.endDate = todates ? (todates.year) + '-' + ('0' + todates.month).slice(-2) + '-' + ('0' + todates.day).slice(-2) : '';
    localStorage.setItem('salesReportParams', JSON.stringify(params));
    this.orderSandbox.settlementList(params);
    this.subscriptions.push(this.orderSandbox.settlementList$.subscribe(data => {
    }));
    this.subscriptions.push(this.orderSandbox.settlementListLoaded$.subscribe(data => {
      if (data && data === true) {
        this.filterParams = localStorage.getItem('salesReportParams') ? JSON.parse(localStorage.getItem('salesReportParams')) : '';
        this.cd.detectChanges();
      }
    }));
  }

  exportSalesReport() {
    let params: any = {};
    params = this.filterParams;
    params.vendorId = this.vendorDetails['vendorId'];
    this.orderSandbox.exportSalesReport(params);
  }
  queryParam(pageSize: any, offset: any, index: number, keyword: any): void {
    this.queryParams.pageSize = pageSize;
    this.queryParams.offset = offset;
    this.queryParams.index = index;
    this.queryParams.keyword = this.keyword;
    this.setQueryParams();
  }
  setQueryParams(): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryParams,
        queryParamsHandling: 'merge',
      });
  }

  resetReport() {
    this.getProductList();
    this.getCategoryList();
    this.submitted = false;
    this.fromDate = '';
    this.toDate = '';
    this.productSearch = '';
    this.categorySearch = '';
    this.orderSandbox.clearList({});
  }

  remove() {
    this.keyword = '';
    const offset = parseInt(this.route.snapshot.queryParamMap.get('offset'));
    this.index = parseInt(this.route.snapshot.queryParamMap.get('index'));
    this.salesOrderList();
    this.searchCategory('')
  }


  onPageChange(event: any): void {
    localStorage.setItem('pagination', '')


    this.perPageCount = false
    if (event.align == 'Left' || 'Last' || 'First') {
      this.offset = (event.index -= 1) * this.limit;
    }
    else if (event.align == 'Right') {
      this.offset = (event.index) * this.limit;
    }
    this.salesOrderList();
  }

  GetPageLimit() {
    localStorage.setItem('pagination', '')

    this.perPageCount = true
    this.pageSize = this.selectedpage.name
    this.salesOrderList();
    this.indexs = 1

  }


  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
    this.orderSandbox.clearList({});
  }
}
