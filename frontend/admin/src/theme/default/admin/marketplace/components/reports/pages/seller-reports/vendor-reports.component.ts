// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
// Third Party
import { Subscription } from 'rxjs';
// Sandbox
import { ReportsSandbox } from '../../../../../../../../core/admin/vendor/reports/reports.sandbox';

@Component({
  selector: 'app-vendor-reports',
  templateUrl: 'vendor-reports.component.html',
  styleUrls: ['vendor-reports.component.scss'],
  providers: [DatePipe]

})
export class VendorReportsComponent implements OnInit, OnDestroy {
  // Form
  public vendorReportFilterForm: UntypedFormGroup;

  // Variables
  public currency: any;
  public mininimumDate: any;
  public selectedAll: any;
  public productListArray: any;
  backup: any;
  todaysDate: any;

  // Subscription
  private subscriptions: Array<Subscription> = [];

  // Calculate Total Variables
  public quantityTotal = 0;
  public baseTotal = 0;
  public subTotal = 0;
  public taxTotal = 0;

  // Filter Data
  public filterData: any = [];
  public filterDataId = [];

  constructor(public sandbox: ReportsSandbox,
    public fb: UntypedFormBuilder,
    private dateAdapter: DateAdapter<Date>,
    public datePipe: DatePipe, public titleService: Title) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    // Set Browser Header
    this.titleService.setTitle('Sales By Seller');

    // Get Currency
    this.currency = JSON.parse(sessionStorage.getItem('adminCurrency'));

    // Inicial Form
    this.initForm();

    // Vendor List Api
    this.getVendorList();

    // Current Date
    this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
  }

  // Build Form
  initForm() {
    this.vendorReportFilterForm = this.fb.group({
      allVendor: [''],
      fromDate: [''],
      toDate: [''],
      vendorId: ['']
    });
  }

  // Vendor List Api
  getVendorList() {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.keyword = '';
    params.status = 1;
    this.sandbox.getVendorList(params);
    this.sandbox.vendorList$.subscribe(data => {
      if (data) {
        this.productListArray = data;
        this.productListArray.forEach(element => {
          element.selected = false;
        });
        this.backup = this.productListArray;
      }
    })
  }

  // Generate Report
  generateReport() {
    const allVendor = this.vendorReportFilterForm.value.allVendor;
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.startDate = this.vendorReportFilterForm.value.fromDate ? (this.vendorReportFilterForm.value.fromDate.year) + '-' + ('0' + this.vendorReportFilterForm.value.fromDate.month).slice(-2) + '-' + ('0' + this.vendorReportFilterForm.value.fromDate.day).slice(-2) : '';
    params.endDate = this.vendorReportFilterForm.value.toDate ? (this.vendorReportFilterForm.value.toDate.year) + '-' + ('0' + this.vendorReportFilterForm.value.toDate.month).slice(-2) + '-' + ('0' + this.vendorReportFilterForm.value.toDate.day).slice(-2) : '';
    params.allVendor = allVendor == true ? 1 : 0;
    params.vendorsId = this.filterDataId.toString();
    this.sandbox.vendorSalesReports(params);
    this.subscribe();
  }

  // Calculate Total
  subscribe() {
    this.subscriptions.push(this.sandbox.vendorSalesReport$.subscribe(data => {
      if (data && data.length > 0) {
        this.quantityTotal = 0;
        this.baseTotal = 0;
        this.subTotal = 0;
        this.taxTotal = 0;
        data.map(obj => {
          this.quantityTotal += (+obj.quantityTotal);
          this.baseTotal += (+obj.baseTotal);
          this.subTotal += (+obj.subTotal);
          this.taxTotal += (+obj.taxTotal);
        });
      }
    }));
  }

  // From Date Change Function
  onDateChange(event) {
    this.mininimumDate = event.value;
  }

  // Export Excel
  exportVendorSalesReport() {
    const allVendor = this.vendorReportFilterForm.value.allVendor;
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.startDate = this.vendorReportFilterForm.value.fromDate ? (this.vendorReportFilterForm.value.fromDate.year) + '-' + ('0' + this.vendorReportFilterForm.value.fromDate.month).slice(-2) + '-' + ('0' + this.vendorReportFilterForm.value.fromDate.day).slice(-2) : '';
    params.endDate = this.vendorReportFilterForm.value.toDate ? (this.vendorReportFilterForm.value.toDate.year) + '-' + ('0' + this.vendorReportFilterForm.value.toDate.month).slice(-2) + '-' + ('0' + this.vendorReportFilterForm.value.toDate.day).slice(-2) : '';
    params.allVendor = allVendor === true ? 1 : 0;
    if (this.filterDataId.length > 0) {
      const vendor = this.filterDataId;
      params.vendorsId = vendor.toString();
    } else {
      params.vendorsId = '';
    }
    this.sandbox.exportVendorSalesReport(params);

  }

  // SelectAll Checkbox Function
  selectAll() {
    for (let i = 0; i < this.productListArray.length; i++) {
      this.productListArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
  }

  // Filtered Vendor List
  filterDataList() {
    this.filterData = this.backup.filter((data) => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map((obj) => obj.vendorId);
  }

  // Check Vendor Selected
  checkIfAllSelected() {
    this.selectedAll = this.backup.every(function (item: any) {
      return item.selected === true;
    });
    this.selectedAll = this.productListArray.every(function (item: any) {
      return item.selected === true;
    });
    if (this.productListArray.length === 0) {
      this.selectedAll = false;
    }
    this.filterDataList();
  }

  // Search Vendor
  new(event) {
    if (event.length === 0) {
      this.productListArray = this.backup;
    }
    this.productListArray = this.backup.filter((val) => {
      return val.companyName.toLocaleLowerCase().match(event.toLocaleLowerCase());
    });
    this.filterDataList();
    this.checkIfAllSelected();
  }

  // Remove Selected Vendor
  delete(val) {
    this.backup.forEach(function (value) {
      if (value == val) {
        value.selected = false;
      }
    });
    this.filterDataList();
    this.checkIfAllSelected();
  }

  // Remove All Vendor
  deleteall() {
    this.backup.forEach(function (value) {
      value.selected = false;
    });
    this.filterDataList();
    this.checkIfAllSelected();
    this.sandbox.clear();
    this.vendorReportFilterForm.reset();
  }

  // Reset Form
  reset() {
    this.vendorReportFilterForm.reset();
    this.filterDataId = [];
    this.backup.forEach(function (value) {
      value.selected = false;
    });
    this.filterDataList();
    this.checkIfAllSelected();
    this.sandbox.clear();
  }

  // Destroy
  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
    this.sandbox.clear();
  }
}
