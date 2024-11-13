// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
// Third Party
import { Subscription } from 'rxjs';
// Sandbox
import { ReportsSandbox } from '../../../../../../../../core/admin/vendor/reports/reports.sandbox';

@Component({
  selector: 'app-settlement-reports',
  templateUrl: 'settlement-reports.component.html',
  styleUrls: ['settlement-reports.component.scss'],
  providers: [DatePipe]
})
export class SettlementReportsComponent implements OnInit, OnDestroy {
  // Form
  public settlementReportFilterForm: UntypedFormGroup;

  // Variables
  public currency: any;
  public mininimumDate: any;
  public selectedAll: any;
  public selectedOrderAll: any;
  todaysDate: any;

  // Subscription
  private subscriptions: Array<Subscription> = [];

  // Calculate Total Variable
  public quantityTotal = 0;
  public baseTotal = 0;
  public subTotal = 0;
  public taxTotal = 0;

  // Filter
  public filterData: any = [];
  public filterDataId = [];
  public filterOrderId = [];
  public filterOrder: any = [];

  // List Array
  public productListArray: any;
  public orderListArray: any;
  orderBackup: any;
  backup: any;

  constructor(public sandbox: ReportsSandbox, public fb: UntypedFormBuilder,
    private dateAdapter: DateAdapter<Date>, public datePipe: DatePipe, public titleService: Title) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    // Set Browser Title
    this.titleService.setTitle('Settlement Report');
    
    // Get Currency
    this.currency = JSON.parse(sessionStorage.getItem('adminCurrency'));

    // Inicial Form
    this.initForm();

    // Call list Api's
    this.getVendorList();
    this.orderStatusList();

    // Current Date
    this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
  }

  // Build Form
  initForm() {
    this.settlementReportFilterForm = this.fb.group({
      allVendor: [''],
      fromDate: [''],
      toDate: [''],
      vendorId: [''],
      settlementFlag: [''],
      orderStatus: ['']
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
  
  // Order List Api
  orderStatusList() {
    const params: any = {};
    params.offset = 0;
    params.limit = 0;
    params.keyword = '';
    this.sandbox.orderStatusList(params);
    this.sandbox.orderStatusList$.subscribe(data => {
      if (data) {
        this.orderListArray = data;
        this.orderListArray.forEach(element => {
          element.selected = false;
        });
        this.orderBackup = this.orderListArray;
      }

    })
  }

  // Generate Report
  generateReport() {
    const allVendor = this.settlementReportFilterForm.value.allVendor;
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.startDate = this.settlementReportFilterForm.value.fromDate ? (this.settlementReportFilterForm.value.fromDate.year) + '-' + ('0' + this.settlementReportFilterForm.value.fromDate.month).slice(-2) + '-' + ('0' + this.settlementReportFilterForm.value.fromDate.day).slice(-2) : '';
    params.endDate = this.settlementReportFilterForm.value.toDate ? (this.settlementReportFilterForm.value.toDate.year) + '-' + ('0' + this.settlementReportFilterForm.value.toDate.month).slice(-2) + '-' + ('0' + this.settlementReportFilterForm.value.toDate.day).slice(-2) : '';
    params.allVendor = allVendor == true ? 1 : 0;
    params.vendorsId = this.filterDataId.toString();
    params.orderStatus = this.filterOrderId.toString();
    params.settlementFlag = this.settlementReportFilterForm.value.settlementFlag ? this.settlementReportFilterForm.value.settlementFlag : 0;
    this.sandbox.settlementReports(params);
    this.subscribe();
  }

  // Calculate Total
  subscribe() {
    this.subscriptions.push(this.sandbox.settlementReport$.subscribe(data => {
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

  // Export Excl
  exportSettlementReport() {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.startDate = this.settlementReportFilterForm.value.fromDate ? (this.settlementReportFilterForm.value.fromDate.year) + '-' + ('0' + this.settlementReportFilterForm.value.fromDate.month).slice(-2) + '-' + ('0' + this.settlementReportFilterForm.value.fromDate.day).slice(-2) : '';
    params.endDate = this.settlementReportFilterForm.value.toDate ? (this.settlementReportFilterForm.value.toDate.year) + '-' + ('0' + this.settlementReportFilterForm.value.toDate.month).slice(-2) + '-' + ('0' + this.settlementReportFilterForm.value.toDate.day).slice(-2) : '';

    if (this.filterDataId.length > 0) {
      params.vendorsId = this.filterDataId.toString();
    } else {
      params.vendorsId = '';
    }
    if (this.filterOrderId.length > 0) {
      params.orderStatus = this.filterOrderId.toString();
    } else {
      params.orderStatus = '';
    }
    params.settlementFlag = this.settlementReportFilterForm.value.settlementFlag ? this.settlementReportFilterForm.value.settlementFlag : 0;
    this.sandbox.exportSettlementReport(params);
  }

  // Product List Select All Function
  selectAll() {
    for (let i = 0; i < this.productListArray.length; i++) {
      this.productListArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
  }

  // Product Filtered Data
  filterDataList() {
    this.filterData = this.backup.filter((data) => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map((obj) => obj.vendorId);
  }

  // Product Check Selected Function
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

  // Product Search Function
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
  // Remove Product Selected
  delete(val) {
    this.backup.forEach(function (value) {
      if (value == val) {
        value.selected = false;
      }
    });
    this.filterDataList();
    this.checkIfAllSelected();
  }

  // Remove All Product
  deleteall() {
    this.backup.forEach(function (value) {
      value.selected = false;

    });
    this.filterDataList();
    this.checkIfAllSelected();
  }

  // Filtered Order
  filterOrderList() {
    this.filterOrder = this.orderBackup.filter((data) => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterOrderId = this.filterOrder.map((obj) => obj.orderStatusId);
  }

  // Select All Order Function
  selectOrderAll() {
    for (let i = 0; i < this.orderListArray.length; i++) {
      this.orderListArray[i].selected = this.selectedOrderAll;
    }
    this.filterOrderList();
  }

  // Check Selected Order
  checkIfAllOrderSelected() {
    this.selectedOrderAll = this.orderBackup.every(function (item: any) {
      return item.selected === true;
    });
    this.selectedOrderAll = this.orderListArray.every(function (item: any) {
      return item.selected === true;
    });
    if (this.orderListArray.length === 0) {
      this.selectedOrderAll = false;
    }
    this.filterOrderList();
  }

  // Search Order Function
  newOrder(event) {
    if (event.length === 0) {
      this.orderListArray = this.orderBackup;
    }
    this.orderListArray = this.orderBackup.filter((val) => {
      return val.name.toLocaleLowerCase().match(event.toLocaleLowerCase());
    });
    this.filterOrderList();
    this.checkIfAllOrderSelected();
  }

  // Remove Selected Order
  clear(val) {
    this.orderBackup.forEach(function (value) {
      if (value == val) {
        value.selected = false;
      }
    });
    this.filterOrderList();
    this.checkIfAllOrderSelected();
  }

  // Remove All Selected Order
  clearall() {
    if (this.filterOrderId || this.filterDataId) {
      this.sandbox.clear();
      this.settlementReportFilterForm.reset();
      if (this.filterOrderId) {
        this.orderBackup.forEach(function (value) {
          value.selected = false;

        });
        this.filterOrderList();
        this.checkIfAllOrderSelected();
      }
      if (this.filterDataId) {
        this.backup.forEach(function (value) {
          value.selected = false;

        });
        this.filterDataList();
        this.checkIfAllSelected();
      }
    }
  }

  // Reset Form
  reset() {
    if (this.filterOrderId || this.filterDataId) {
      this.sandbox.clear();
      this.settlementReportFilterForm.reset();
      if (this.filterOrderId) {
        this.orderBackup.forEach(function (value) {
          value.selected = false;

        });
        this.filterOrderList();
        this.checkIfAllOrderSelected();
      }
      if (this.filterDataId) {
        this.backup.forEach(function (value) {
          value.selected = false;

        });
        this.filterDataList();
        this.checkIfAllSelected();
      }
    }
  }

  // Destroy
  ngOnDestroy() {
    this.sandbox.clear();
  }
}
