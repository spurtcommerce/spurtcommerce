/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { OrdersSandbox } from '../../../../../../../core/admin/sales/orders/orders-sandbox';
import { OrderstatusSandbox } from '../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';

@Component({
  selector: 'app-sales-order-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class OrderFilterComponent implements OnInit {


  public pageSize = '10';
  public salesOrder: FormGroup;
  public submitted = false;
  public name: FormControl;
  public total: FormControl;
  public date: FormControl;
  public status: FormControl;
  public orderId: FormControl;
  public orderStatusId: FormControl;
  public offset = 0;
  public pagination = 1;
  @Output() salesEmit = new EventEmitter<string>();
  miniDate: any;
  fromDate: any;
  displayStartDate: any;
  minPickerDate: any;

  constructor(
    public fb: FormBuilder,
    public appSandbox: OrdersSandbox,
    public orderStatusSandbox: OrderstatusSandbox
  ) { }

  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage');
    this.initForm();
    this.getorderstatuslist();
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
  }

  initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.total = new FormControl('', [Validators.required]);
    this.date = new FormControl('', [Validators.required]);
    this.status = new FormControl(null, [Validators.required]);
    this.orderId = new FormControl('', [Validators.required]);
    (this.orderStatusId = new FormControl(null)),
      (this.salesOrder = this.fb.group({
        name: this.name,
        date: this.date,
        orderId: this.orderId,
        status: this.status,
        total: this.total,
        orderStatusId: this.orderStatusId
      }));
  }

  /**
   * Handles form 'submit' event. Calls sandbox getBannerList . function if form is valid.
   *
   * @param event form event
   * @param form entire form value
   */
  getorderstatuslist() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keyword = '';
    this.orderStatusSandbox.orderStatusList(params);
  }
  onDateSelect(event) {
    this.miniDate = event;
  }

  onSubmit() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.orderId = this.salesOrder.value.orderId ? this.salesOrder.value.orderId : '';
    params.customerName = this.salesOrder.value.name ? this.salesOrder.value.name : '';
    if (parseInt(this.salesOrder.value.total, 10).toFixed() === 'NaN') {
      params.totalAmount = '';
    } else {
      params.totalAmount = parseInt(this.salesOrder.value.total, 10).toFixed();
    }
    const form = this.salesOrder.value.date;
    if (form && form.year) {
      this.fromDate = form ? (form.year) + '-' + ('0' + form.month).slice(-2) + '-' + ('0' + form.day).slice(-2) : null;
    }
    params.dateAdded = this.fromDate ? this.fromDate : '';
    params.orderStatusId = this.salesOrder.value.orderStatusId ? this.salesOrder.value.orderStatusId : '';
    this.salesEmit.emit(params);
  }

  reset() {
    if (this.salesOrder.value.orderId || this.salesOrder.value.name || this.salesOrder.value.total || this.fromDate || this.salesOrder.value.orderStatusId ||this.salesOrder.value.date) {
      this.salesOrder.reset();
      const param: any = {};
      param.limit = this.pageSize;
      param.offset = '';
      param.orderId = '';
      this.salesOrder.value.date="";
      param.customerName = '';
      param.totalAmount = '';
      param.dateAdded = '';
      this.fromDate = '';
      this.salesEmit.emit(param);
    }

  }

  onItemChange(data) {
    const params: any = {};
    params.orderId = this.orderId;
    params.orderStatusId = data;
  }
}
