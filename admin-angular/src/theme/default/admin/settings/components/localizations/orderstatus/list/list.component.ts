/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderstatusSandbox } from '../../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { OrderstatusApiClientService } from '../../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus-ApiClientService';
import { OrderStatusAddComponent } from '../add/add.component';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';


@Component({
  selector: 'app-settings-orderstatus-list',
  templateUrl: './list.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}.coc{
  background: #f20a6d;
    border: solid thin #dddddd;
    color: white;
    padding: 4px 16px;
}`]
})
export class OrderStatusListComponent implements OnInit {
  public type = 'edit';
  public orderStatusDetails: any = {};
  private keyword = '';
  private offset: number;
  public pageSize = '5';
  private currentPage: string;
  private index: number;
  private pagenationCount = true;
  private popoverContent: string;

  constructor(
    public modal: NgbModal,
    private router: Router,
    public Sandbox: OrderstatusSandbox,
    public service: OrderstatusApiClientService
  ) {
    this.regSubscribeEvents();
  }

  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage')
      ? sessionStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.orderStatusList(this.offset, this.keyword);


    this.Sandbox.OrderstatusAddLoaded$.subscribe(data => {
      if (data === true) {
        this.orderStatusList(this.offset, this.keyword);
      }
    });

    this.Sandbox.OrderstatusUpdateLoaded$.subscribe(data => {
      if (data) {
        this.orderStatusList(this.offset, this.keyword);
      }
    });
  }


  /**
   * Handles form 'list' event. Calls sandbox OrderStatus List function .
   *
   * @param params storing entire value
   */
  orderStatusList(offset: number = 0, keyword) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.status = '';
    this.Sandbox.orderStatusList(params);

    if (this.pagenationCount) {
      params.count = true;
      this.Sandbox.orderStatusListCount(params);
    }
  }

  editOrderStatusList(orderstatusinfo) {
    this.orderStatusDetails = orderstatusinfo;
    this.service.statusordersetdata(this.orderStatusDetails);
    this.router.navigate([
      '/settings/local/order-status/edit',
      this.orderStatusDetails.orderStatusId
    ]);
  }

  addOrderStatus(data, type) {
    const modalRef = this.modal.open(OrderStatusAddComponent, {
      windowClass: 'add-language', keyboard: false, backdrop: 'static'
    });
    if (type === 'edit') {
      this.service.statusordersetdata(data);
      modalRef.componentInstance.edit = this.type;
      modalRef.componentInstance.id = data.countryId;
    } else {
      this.service.statusordersetdata('');
    }
  }

  // Pagination Count
  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    const offset = event.pageSize * event.pageIndex;
    this.orderStatusList(offset, this.pageSize);
  }

  // Delete OrderStatus Using OrderStatusId

  deleteStockStatus(orderStatusId) {
    const modelRef = this.modal.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.Sandbox.orderStatusDelete({ orderStatusId: orderStatusId });
        this.regSubscribeEvents();
      }
    });
  }

  // Delete After Subscribe the result
  regSubscribeEvents() {
    this.Sandbox.getorderdelete$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.orderStatusList(this.offset, this.keyword);
      }
    });
  }
}
