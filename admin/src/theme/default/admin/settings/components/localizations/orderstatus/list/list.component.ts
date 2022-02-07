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
import { OrderstatusSandbox } from '../../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { OrderstatusApiClientService } from '../../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus-ApiClientService';

@Component({
  selector: 'app-settings-orderstatus-list',
  templateUrl: './list.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class OrderStatusListComponent implements OnInit {
  // Variable
  public orderstatusdetails: any = {};
  private keyword = '';
  private offset: number;
  public pageSize = '5';
  private currentPage: string;
  private index: number;
  private pagenationcount = true;
  private popoverContent: string;

  // initially calls getorderstatuslist with (offset ,keyword) as argument
  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.getorderstatuslist(this.offset, this.keyword);
  }

  constructor(
    private router: Router,
    public Sandbox: OrderstatusSandbox,
    public service: OrderstatusApiClientService
  ) {
    this.regSubscribeEvents();
  }

  /**
   * Handles form 'list' event. Calls sandbox OrderStatus List function .
   *
   * @param params storing entire value
   */
  getorderstatuslist(offset: number = 0, keyword) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.status = '';
    this.Sandbox.getorderstatuslist(params);

    if (this.pagenationcount) {
      params.count = true;
      this.Sandbox.getorderstatuspagination(params);
    }
  }

  // EditOrderStatus navigate to Add Form
  editOrderStatusList(orderstatusinfo) {
    this.orderstatusdetails = orderstatusinfo;
    this.service.statusordersetdata(this.orderstatusdetails);
    this.router.navigate([
      '/settings/local/order-status/edit',
      this.orderstatusdetails.orderStatusId
    ]);
  }

  // Add OrderStatus Navigate to Add Form
  addorderstatus() {
    this.service.statusordersetdata('');

    this.router.navigate(['/settings/local/order-status/add']);
  }

  // Pagination Count
  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    const offset = event.pageSize * event.pageIndex;
    this.getorderstatuslist(offset, this.pageSize);
  }

  // Delete OrderStatus Using OrderStatusId
  deleteStockStatus(orderStatusId, deletePop) {
    event.stopPropagation();
    this.popoverContent = deletePop;
    this.Sandbox.orderstatusDelete({ orderStatusId: orderStatusId });
  }

  // Delete After Subscribe the result
  regSubscribeEvents() {
    this.Sandbox.getorderdelete$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.getorderstatuslist(this.offset, this.keyword);
      }
    });
  }
}
