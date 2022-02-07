/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersSandbox } from '../../../../../../../core/admin/sales/orders/orders-sandbox';
import { OrderstatusSandbox } from '../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { LayoutSandbox } from '../../../../../../../core/admin/layout/layout.sandbox';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-sales-order-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.css']
})
export class OrderListComponent implements OnInit {
  public pageSize = '5';
  public pageSizeOptions = [5, 10, 20];
  public page: any;
  public currentPage: number;
  public index: number;
  public buttonCheck = true;
  public pagination = true;
  public offset: number;
  private orderId: number;
  private orderStatusId: number;
  private customerName: string;
  private totalAmount: number;
  private dateAdded: any;
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];

  constructor(
    private router: Router,
    public appSandbox: OrdersSandbox,
    private toastr: ToastrManager,
    public orderStatusSandbox: OrderstatusSandbox,
    public layoutSandbox: LayoutSandbox
  ) {}

  ngOnInit() {
    this.offset = 0;
    this.pageSize = localStorage.getItem('itemsPerPage') ? localStorage.getItem('itemsPerPage') : this.pageSize;
    this.getOrderList(0);
    this.index = 0;
    this.getOrderStatusList();
  }

  changeFilter(event) {
    this.buttonCheck = event.target.checked;
  }

  getOrderList(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.orderId = this.orderId;
    params.customerName = this.customerName;
    params.totalAmount = this.totalAmount;
    params.dateAdded = this.dateAdded;
    params.orderStatusId = this.orderStatusId;
    this.appSandbox.getOrderList(params);
    if (this.pagination) {
      params.count = 'true';
      this.appSandbox.getOrderPagination(params);
    }
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.getOrderList(this.offset);
  }

  viewOrders(orderId) {
    this.router.navigate(['/sales/orders/vieworder', orderId]);
  }

  // receive param from filter component .And calls categoriesPagination event
  receiveProgress(event) {
    this.index = 0;
    this.orderId = event.orderId;
    this.orderStatusId = event.orderStatusId;
    this.customerName = event.customerName;
    this.totalAmount = event.totalAmount;
    this.dateAdded = event.dateAdded;
    this.offset = event.offset;
    this.pageSize = event.limit;
    this.getOrderList();
  }

  getOrderPaginationcount() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.orderId = this.orderId;
    params.customerName = this.customerName;
    params.totalAmount = this.totalAmount;
    params.dateAdded = this.dateAdded;
    params.count = true;
    this.appSandbox.getOrderPagination(params);
  }

  getOrderStatusList() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = 0;
    params.keyword = '';
    this.orderStatusSandbox.getorderstatuslist(params);
  }

  // export Excel
  exportExcel() {
    const param: any = {};
    param.orderId = this.checkedData;
    this.appSandbox.orderExcel(param);
  }
  selectChkBox(event, orderId) {
    if (event.target.checked === true) {
      this.checkedData.push(orderId);
    }
    if (event.target.checked === false) {
      this.unCheckData.push(orderId);
      this.unCheckData.forEach((value, index) => {
        this.checkedData = this.checkedData.filter(_value => {
          if (value === _value) {
            return false;
          } else {
            return true;
          }
        });
      });
    }
    this.unCheckData = [];
  }
  deleteOrder(orderId) {
    this.checkedData.push(orderId);
    const param: any = {};
    param.orderId = this.checkedData;
    this.appSandbox.salesOrderDelete(param);
    this.appSandbox.getorderDeleteValue$.subscribe(_delete => {
      if (_delete) {
        if (_delete['status'] === 1) {
          this.checkedData = [];
          this.getOrderList(0);
        }
      }
    });
  }
  // bulkDelete
  bulkDelete() {
    const param: any = {};
    param.orderId = this.checkedData;
    this.appSandbox.salesOrderDelete(param);
    this.appSandbox.getorderDeleteValue$.subscribe(_delete => {
      if (_delete) {
        if (_delete['status'] === 1) {
          this.checkedData = [];
          this.getOrderList(0);
        }
      }
    });
  }
  // bulkDeleteEmpty
  bulkDeleteEmpty() {
    this.showNotificationError('Choose atleast one Order');
  }
  /**
   * Shows error notification with given title and message
   *
   * @params message
   */
  private showNotificationError(message: string): void {
    this.toastr.errorToastr(message);
  }
}
