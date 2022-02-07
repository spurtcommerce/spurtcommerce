/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
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

  constructor(
    public fb: FormBuilder,
    public appSandbox: OrdersSandbox,
    public orderStatusSandbox: OrderstatusSandbox
  ) {}

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.initForm();
    this.getorderstatuslist();
  }

  initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.total = new FormControl('', [Validators.required]);
    this.date = new FormControl('', [Validators.required]);
    this.status = new FormControl('', [Validators.required]);
    this.orderId = new FormControl('', [Validators.required]);
    (this.orderStatusId = new FormControl('')),
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
    this.orderStatusSandbox.getorderstatuslist(params);
  }

  onSubmit() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.orderId = this.salesOrder.value.orderId;
    params.customerName = this.salesOrder.value.name;
    if (parseInt(this.salesOrder.value.total, 10).toFixed() === 'NaN') {
      params.totalAmount = '';
    } else {
      params.totalAmount = parseInt(this.salesOrder.value.total, 10).toFixed();
    }
    params.dateAdded = this.salesOrder.value.date;
    params.orderStatusId = this.salesOrder.value.orderStatusId;
    this.salesEmit.emit(params);
    this.appSandbox.getOrderList(params);
    params.count = 1;
    this.appSandbox.getOrderPagination(params);
  }

  reset() {
    this.salesOrder.reset();
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.orderId = '';
    param.customerName = '';
    param.totalAmount = '';
    param.dateAdded = '';
    this.salesEmit.emit(param);
    this.appSandbox.getOrderList(param);
  }

  onItemChange(data) {
    const params: any = {};
    params.orderId = this.orderId;
    params.orderStatusId = data;
    // this.orderSandbox.changeOrderStatus(params);
  }
}
