//  Angular
import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
// Third Party
import { Subscription } from 'rxjs';
// Sandbox
import { SalesReportSandbox } from 'src/core/admin/reports/sales-report/sales-report.sandbox';
import { LayoutSandbox } from 'src/core/admin/layout/layout.sandbox';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe]
})
export class SalesReportListComponent implements OnInit, OnDestroy {
  @ViewChild('drop') public drop: ElementRef;
  @ViewChild(NgbDropdown)
  public dropdown: NgbDropdown;

  // Search Keyword
  public productKeyword: any = '';
  public categoryKeyword: any = '';

  // List
  public selectedProductId: any = [];

  // Variables
  public fromDate: any;
  public toDate: any;
  public productError = false;
  public submitted = false;
  public orderStatus = false;
  public customerGroup = false;
  public orderId = false;
  public paymentType = false;
  public todaysDate: any;
  public productSearch: any;
  public categorySearch: any;

  // Subscription
  private subscriptions: Array<Subscription> = [];

  // Filter 
  public filterParams: any;


  constructor(public sandbox: SalesReportSandbox, public datePipe: DatePipe,
    private dateAdapter: DateAdapter<Date>,
    public layoutSandbox: LayoutSandbox,
    public cd: ChangeDetectorRef,
    public titleService: Title,
  ) {
    this.titleService.setTitle('Sales Reports');
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    // Selected Field List Api
    this.getProductList();
    this.getCategoryList();
    // Current Date
    this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
  }

  // Product List Api
  getProductList() {
    const params: any = {};
    params.offset = 0;
    params.limit = 0;
    params.keyword = this.productKeyword;
    params.sku = '';
    params.status = '';
    params.price = 0;
    this.sandbox.getProductList(params);
  }

  // Category List Api
  getCategoryList() {
    const params: any = {};
    params.offset = 0;
    params.limit = 0;
    params.keyword = this.categoryKeyword;
    params.status = '';
    this.sandbox.getCategoryList(params);
  }

  // Search Product Function
  searchProduct(key) {
    const params: any = {};
    params.keyword = key;
    this.sandbox.searchProduct(params);
  }

  // Search Category Function
  searchCategory(key) {
    const params: any = {};
    params.keyword = key;
    this.sandbox.searchCategory(params);
  }

  // Select Product Function
  selectProduct(checked, list) {
    this.submitted = false;
    const params: any = {};
    params.list = list;
    params.checked = checked;
    this.sandbox.selectProduct(params);
  }

  // Select Category Function
  selectCategory(checked, list) {
    this.submitted = false;
    const params: any = {};
    params.list = list;
    params.checked = checked;
    this.sandbox.selectCategory(params);
  }

  // Generate Report
  generateReport() {
    let productId = [];
    this.submitted = true;
    this.productError = false;
    this.subscriptions.push(this.sandbox.selectedProductList$.subscribe(data => {
      if (data && data.length > 0) {
        this.selectedProductId = data;
      } else {
        this.selectedProductId = [];
      }
    }));

    if (this.selectedProductId.length === 0) {
      this.productError = true;
      return;
    } else {
      this.selectedProductId.forEach(data => {
        productId.push(data.productId);
      });
    }
    const params: any = {};
    params.productId = productId.toString();

    const fromdates = this.fromDate;
    params.startDate = fromdates ? (fromdates.year) + '-' + ('0' + fromdates.month).slice(-2) + '-' + ('0' + fromdates.day).slice(-2) : '';
    const todates = this.toDate;
    params.endDate = todates ? (todates.year) + '-' + ('0' + todates.month).slice(-2) + '-' + ('0' + todates.day).slice(-2) : '';
    sessionStorage.setItem('salesReportParams', JSON.stringify(params));
    localStorage.setItem('salesReportParams', JSON.stringify(params));
    this.sandbox.salesReportList(params);
    this.subscriptions.push(this.sandbox.salesReportListLoaded$.subscribe(data => {
      if (data && data === true) {
        this.filterParams = localStorage.getItem('salesReportParams') ? JSON.parse(localStorage.getItem('salesReportParams')) : JSON.parse(sessionStorage.getItem('salesReportParams')) ;
        this.cd.detectChanges();
      }
    }));
  }

  // Dropdown Close
  close() {
    this.dropdown.close();
  }

  // Export Report
  exportSalesReport() {
    let params: any = {};
    params = this.filterParams;
    this.sandbox.exportSalesReport(params);
  }

  // Reset Report Function
  resetReport() {
    this.getProductList();
    this.getCategoryList();
    this.fromDate = '';
    this.toDate = '';
    this.sandbox.clearList({});
    this.categorySearch = '';
    this.productSearch = '';
  }

  // Destroy
  ngOnDestroy() {
    this.sandbox.clearList({});
  }
}
