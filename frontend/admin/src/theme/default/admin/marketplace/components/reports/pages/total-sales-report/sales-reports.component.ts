// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
// Sandbox
import { ReportsSandbox } from '../../../../../../../../core/admin/vendor/reports/reports.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sales-reports',
  templateUrl: 'sales-reports.component.html',
  styleUrls: ['sales-reports.component.scss'],
  providers: [DatePipe]
})
export class SalesReportsComponent implements OnInit, OnDestroy {
  // Filter Form
  public totalReportFilterForm: UntypedFormGroup;

  // Variables
  public currency: any;
  public todayDate: any;
  public currentDate: any;
  public selectedMonth: any;
  public selectedFromDate: any;
  public selectedToDate: any;
  public selectedFromAmt: any = 0;
  public selectedToAmt: any = 0;
  public isChecked = false;
  todaysDate: any;

  // Subscription
  private subscriptions: Array<Subscription> = [];

  // Calculate Total Variables
  public quantityTotal: any;
  public taxTotal: any;
  public baseTotal: any;
  public subTotal: any;

  constructor(public sandbox: ReportsSandbox, public fb: UntypedFormBuilder,
    private dateAdapter: DateAdapter<Date>, public datePipe: DatePipe, public titleService: Title) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    // Set Browser Title
    this.titleService.setTitle('Total Sales Report');

    // Cuurent Date
    this.currentDate = new Date();
    this.currentDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()

    };
    this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };

    // Currency
    this.currency = JSON.parse(sessionStorage.getItem('adminCurrency'));
    // Inicial Form
    this.initForm();

    // Set Form Value 
    this.totalReportFilterForm.controls['dateRange'].valueChanges.subscribe(
      (selectedValue) => {
        if (selectedValue === '1') {
          this.todayDate = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: 1
          };
          this.totalReportFilterForm.controls['fromDate'].setValue(this.todayDate);
          this.totalReportFilterForm.controls['toDate'].setValue(this.currentDate);
          this.totalReportFilterForm.get('fromDate').disable();
          this.totalReportFilterForm.get('toDate').disable();
        } else if (selectedValue === '2') {
          const date2 = new Date();
          let b;
          b = new Date(date2.getFullYear(), date2.getMonth() - 2, 1);
          this.todayDate = {
            year: Number(this.datePipe.transform(b, "yyyy")),
            month: Number(this.datePipe.transform(b, "MM")),
            day: 1
          };
          this.totalReportFilterForm.controls['fromDate'].setValue(this.todayDate);
          this.totalReportFilterForm.controls['toDate'].setValue(this.currentDate);
          this.totalReportFilterForm.get('fromDate').disable();
          this.totalReportFilterForm.get('toDate').disable();

        } else if (selectedValue === '3') {
          const date3 = new Date();
          let c;
          c = new Date(date3.getFullYear(), date3.getMonth() - 5, 1);
          this.todayDate = {
            year: Number(this.datePipe.transform(c, "yyyy")),
            month: Number(this.datePipe.transform(c, "MM")),
            day: 1
          };
          this.totalReportFilterForm.controls['fromDate'].setValue(this.todayDate);
          this.totalReportFilterForm.controls['toDate'].setValue(this.currentDate);
          this.totalReportFilterForm.get('fromDate').disable();
          this.totalReportFilterForm.get('toDate').disable();

        }
        else {
          this.totalReportFilterForm.controls['fromDate'].setValue('');
          this.totalReportFilterForm.controls['toDate'].setValue('');
          this.todayDate = '';
          this.totalReportFilterForm.get('fromDate').enable();
          this.totalReportFilterForm.get('toDate').enable();
        }
      }
    );

    this.currentDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.todayDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: 1
    };
    this.totalReportFilterForm.controls['fromDate'].setValue(this.todayDate);
    this.totalReportFilterForm.controls['toDate'].setValue(this.currentDate);
    this.totalReportFilterForm.get('fromDate').disable();
    this.totalReportFilterForm.get('toDate').disable();
  }

  // Build Form
  initForm() {
    this.totalReportFilterForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      dateRange: ['1'],
      rangeFrom: [''],
      rangeTo: ['']
    });
  }

  // Generate Report
  generateReport() {
    this.selectedFromAmt = this.totalReportFilterForm.value.rangeFrom;
    this.selectedToAmt = this.totalReportFilterForm.value.rangeTo;
    const dateRange = this.totalReportFilterForm.value.dateRange;
    if (dateRange === 1) {
      this.selectedMonth = 'This Month';
    } else if (dateRange === 2) {
      this.selectedMonth = '3 Months';
    } else {
      this.selectedMonth = '6 Months';
    }
    this.selectedFromDate = this.totalReportFilterForm.value.fromDate ? (this.totalReportFilterForm.value.fromDate.year) + '-' + ('0' + this.totalReportFilterForm.value.fromDate.month).slice(-2) + '-' + ('0' + this.totalReportFilterForm.value.fromDate.day).slice(-2) : '';
    this.selectedToDate = this.totalReportFilterForm.value.toDate ? (this.totalReportFilterForm.value.toDate.year) + '-' + ('0' + this.totalReportFilterForm.value.toDate.month).slice(-2) + '-' + ('0' + this.totalReportFilterForm.value.toDate.day).slice(-2) : '';

    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.startDate = this.totalReportFilterForm.getRawValue().fromDate ? (this.totalReportFilterForm.getRawValue().fromDate.year) + '-' + ('0' + this.totalReportFilterForm.getRawValue().fromDate.month).slice(-2) + '-' + ('0' + this.totalReportFilterForm.getRawValue().fromDate.day).slice(-2) : '';
    params.endDate = this.totalReportFilterForm.getRawValue().toDate ? (this.totalReportFilterForm.getRawValue().toDate.year) + '-' + ('0' + this.totalReportFilterForm.getRawValue().toDate.month).slice(-2) + '-' + ('0' + this.totalReportFilterForm.getRawValue().toDate.day).slice(-2) : '';
    params.amountFrom = this.totalReportFilterForm.value.rangeFrom ?? '';
    params.amountTo = this.totalReportFilterForm.value.rangeTo ?? '';
    this.sandbox.totalSalesReports(params);
    this.subscribe();
  }

  // Calculate Total Amount
  subscribe() {
    this.subscriptions.push(this.sandbox.totalSalesReport$.subscribe(data => {
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

  // Export Sales Report
  exportSalesReport() {
    const params: any = {};
    params.startDate = this.totalReportFilterForm.getRawValue().fromDate ? (this.totalReportFilterForm.getRawValue().fromDate.year) + '-' + ('0' + this.totalReportFilterForm.getRawValue().fromDate.month).slice(-2) + '-' + ('0' + this.totalReportFilterForm.getRawValue().fromDate.day).slice(-2) : '';
    params.endDate = this.totalReportFilterForm.getRawValue().toDate ? (this.totalReportFilterForm.getRawValue().toDate.year) + '-' + ('0' + this.totalReportFilterForm.getRawValue().toDate.month).slice(-2) + '-' + ('0' + this.totalReportFilterForm.getRawValue().toDate.day).slice(-2) : '';
    params.amountFrom = this.totalReportFilterForm.value.rangeFrom;
    params.amountTo = this.totalReportFilterForm.value.rangeTo;
    this.sandbox.exportTotalSalesReport(params);
  }
  // Reset Form
  reset() {
    this.totalReportFilterForm.reset();
    this.sandbox.clear();
  }

  // Destroy
  ngOnDestroy() {
    this.sandbox.clear();
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
