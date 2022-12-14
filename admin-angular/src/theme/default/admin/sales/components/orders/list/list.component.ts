/*
 * SpurtCommerce
 * version 4.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersSandbox } from '../../../../../../../core/admin/sales/orders/orders-sandbox';
import { OrderstatusSandbox } from '../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { LayoutSandbox } from '../../../../../../../core/admin/layout/layout.sandbox';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { LayoutsSandbox } from '../../../../../../../core/admin/sales/layout/layout.sandbox';
import { DeleteConfirmationDialogComponent } from '../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-sales-order-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: MatPaginator;


  public pageSize: any = 5;
  public pageSizeOptions = [5, 10, 20];
  public page: any;
  public currentPage: number;
  public index: any;
  public buttonCheck = true;
  public pagination = true;
  public offset: any;
  private orderId: any;
  private orderStatusId: any;
  private customerName: string;
  private totalAmount: any;
  private dateAdded: any;
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];
  public isChecked: any = [];
  public sampleArray: any = [];
  private subscriptions: Array<Subscription> = [];

  // bulk delete or bulk export variables
  public bulkFunction = false;
  public productList: any;
  public selectedAll = false;
  public orderListArray: any;
  public filterData: any = [];
  public filterDataId = [];
  public queryData: any = {};

  constructor(
    private router: Router,
    public appSandbox: OrdersSandbox,
    private toastr: ToastrManager,
    public orderStatusSandbox: OrderstatusSandbox,
    public layoutSandbox: LayoutSandbox,
    public layoutsSandbox: LayoutsSandbox,
    public modalService: NgbModal,
    public route: ActivatedRoute
  ) {
    this.subscribeOrder();
  }

  ngOnInit() {


    // if (this.paginationService.getIndex() !== 0) {
    //   this.index = this.paginationService.getIndex();
    //   this.onPageChangeEvent();
    // }
    this.offset = 0;
    this.pageSize = sessionStorage.getItem('itemsPerPage') ? sessionStorage.getItem('itemsPerPage') : this.pageSize;

    this.getOrderPaginationCount();
    this.index = 0;
    this.getOrderStatusList();
    this.layoutsSandbox.getSalesCount();
    this.index = this.route.snapshot.queryParamMap.get('index');
    this.offset = this.route.snapshot.queryParamMap.get('offset');
    if (this.index !== 0) {
      this.pageChangeEvent();
    } else {
      this.getOrderList();
    }

  }

  changeFilter(event) {
    this.buttonCheck = event.target.checked;
  }

  getOrderList() {
    this.queryData.index = this.index;
    this.queryData.offset = this.offset;
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.orderId = this.orderId;
    params.customerName = this.customerName;
    params.totalAmount = this.totalAmount;
    params.dateAdded = this.dateAdded;
    params.orderStatusId = this.orderStatusId;
    this.appSandbox.getOrderList(params);

    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.index || 0;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  getOrderPaginationCount() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.orderId = this.orderId;
    params.customerName = this.customerName;
    params.totalAmount = this.totalAmount;
    params.dateAdded = this.dateAdded;
    params.orderStatusId = this.orderStatusId;
    params.count = true;
    this.appSandbox.getOrderListCount(params);
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.selectedAll = false;
    this.filterDataId = [];
    this.getOrderList();
    // this.paginationService.setIndex(this.index);
  }

  onPageChangeEvent() {
    this.currentPage = this.offset;
    this.pageSize = this.pageSize;
    this.index = this.index;
    this.offset = this.pageSize * this.index;
    this.selectedAll = false;
    this.filterDataId = [];
    this.getOrderList();
  }

  pageChangeEvent() {
    this.currentPage = this.offset;
    this.pageSize = this.pageSize;
    this.index = this.index;
    this.offset = this.pageSize * this.index;
    this.selectedAll = false;
    this.filterDataId = [];
    this.getOrderList();
  }

  viewOrders(orderId) {
    this.router.navigate(['/sales/orders/vieworder', orderId], { queryParams: this.queryData });
  }

  // receive param from filter component .And calls categoriesPagination event
  receiveProgress(event) {
    this.index = 0;
    this.orderId = event.orderId;
    this.orderStatusId = event.orderStatusId;
    this.customerName = event.customerName;
    this.totalAmount = event.totalAmount;
    this.dateAdded = event.dateAdded;
    this.offset = 0;

    if (this.orderId !== '' || this.orderStatusId !== '' || this.customerName !== '' || this.totalAmount !== '' || this.dateAdded !== '') {
      this.paginator.firstPage();
      this.getOrderList();
      this.getOrderPaginationCount();
    }


  }

  getOrderStatusList() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = 0;
    params.keyword = '';
    this.orderStatusSandbox.orderStatusList(params);
  }

  exportExcel() {
    const param: any = {};
    param.orderId = this.filterDataId;
    this.appSandbox.orderExcel(param);
  }

  deleteOrder(orderId) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const param: any = {};
        param.orderId = orderId;
        this.appSandbox.salesOrderDelete(param);
        this.appSandbox.getorderDeleteValue$.subscribe(_delete => {
          if (_delete) {
            if (_delete['status'] === 1) {
              this.getOrderList();
              this.getOrderPaginationCount();
              this.layoutsSandbox.getSalesCount();
            }
          }
        });
      }
    });
  }

  bulkDelete() {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const param: any = {};
        param.orderId = this.filterDataId.toString();
        this.appSandbox.salesOrderDelete(param);
        this.appSandbox.getorderDeleteValue$.subscribe(_delete => {
          if (_delete) {
            if (_delete['status'] === 1) {
              this.selectedAll = false;
              this.filterDataId = [];
              this.getOrderList();
              this.getOrderPaginationCount();
              this.layoutsSandbox.getSalesCount();
            }
          }
        });
      }
    });
  }

  selectAll() {
    for (let i = 0; i < this.orderListArray.length; i++) {
      this.orderListArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
    } else {
      this.bulkFunction = false;
    }
  }

  checkIfAllSelected() {
    this.bulkFunction = true;
    this.selectedAll = this.orderListArray.every(function (item: any) {
      return item.selected === true;
    });
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
    } else {
      this.bulkFunction = false;
    }
  }

  filterDataList() {
    this.filterData = this.orderListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.orderId);
  }

  subscribeOrder() {
    this.subscriptions.push(this.appSandbox.orderList$.subscribe(data => {
      this.orderListArray = [];
      if (data && data.length > 0) {
        this.orderListArray = data.map(list => {
          return { ...list, selected: false };
        });
      }
    }));
  }


  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
