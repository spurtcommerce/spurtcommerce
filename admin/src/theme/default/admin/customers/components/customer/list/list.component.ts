/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { CustomerSandbox } from '../../../../../../../core/admin/Customers/customers/customer.sandbox';
import { CustomersApiClientService } from '../../../../../../../core/admin/Customers/customers/customer.ApiClient.service';
import { LayoutSandbox } from '../../../../../../../core/admin/Customers/layout/layout.sandbox';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-customer-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CustomerListComponent implements OnInit {
  // variables
  public closeResult: string;
  public pageSize = '10';
  public pageSizeOptions = [10, 20];
  public offset = 0;
  public currentPage: number;
  public index: number;
  public buttoncheck = true;
  public popoverContent: any;
  public checkedArray: any = [];
  public name = '';
  public email: any;
  public customerGroup = '';
  public date: any;
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];

  // initially customerlist,customerPgination,regSubscribeEvents
  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.customerlist(0, this.pageSize);
    this.customerPgination(0);
    this.regSubscribeEvents();
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrManager,
    public sandbox: CustomerSandbox,
    public layoutSandbox: LayoutSandbox,
    private service: CustomersApiClientService
  ) {}


  // style purpose
  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  /**
   *A check function for filter container enable or disable
   * @param event form event
   */
  check(event) {
    this.buttoncheck = event.target.checked;
  }

  // redirect the customer form
  viewcustomer(customelist) {
    this.router.navigate(['customers/customer/view', customelist]);
  }

  /**
   * A check function editcustomer for edit customer data
   * @param custlistdata getting data from customerlist
   */
  editcustomer(custlistdata) {
    this.service.setcusteditdata(custlistdata);
    this.router.navigate(['/customers/customer/edit', custlistdata.id]);
  }

  // refer customerList addForm
  addaddresscustomer() {
    this.service.setcusteditdata('');
    this.router.navigate(['/customers/customer/add']);

    // this.modalService.open(CustomerAddressComponent);
  }

  /**
   * A check function 'customerlist' for calling Customer List
   * @param offset set initial value
   * @param pageSize set initial value
   */
  customerlist(offset: number = 0, pageSize) {
    const param: any = {};
    param.limit = pageSize;
    param.offset = offset;
    param.name = this.name;
    param.email = this.email;
    param.customerGroup = this.customerGroup;
    param.date = this.date;
    this.sandbox.customerList(param);
    this.layoutSandbox.getActiveCustomerListCount({ status: 1, count: true });
    this.layoutSandbox.getInActiveCustomerListCount({ status: 0, count: true });
  }

  // call the function for count total customer
  customerPgination(offset = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.name = '';
    params.email = '';
    params.customerGroup = '';
    params.date = '';
    params.count = true;
    this.sandbox.PaginationCustomer(params);
    this.layoutSandbox.getCustomerListCount({ count: true });
  }

  /**
   * Handles form 'onPageChange' event. when page changes
   * @param event form event
   */
  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSizeOptions = event.pageSize;
    this.index = event.pageIndex;
    const offset = event.pageSize * event.pageIndex;
    this.customerlist(offset, this.pageSizeOptions);
  }

  /**
   * Handles form 'deletecustomer' event. for delete customer data
   * @param id from customer id
   */
  deletecustomer(id, deletePop) {
    event.stopPropagation();
    this.popoverContent = deletePop;
    this.sandbox.deleteCustomers({ customerId: id });
  }

  // A function 'regSubscribeEvents'  call after getting delete response for pagination purpose
  regSubscribeEvents() {
    this.sandbox.getdeletecustomer$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.customerlist(0, this.pageSize);
        this.customerPgination(0);
      }
    });
  }

  // receive param from filter component .And calls customerPgination event
  receiveProgress(event) {
    this.index = 0;
    this.customerPgination();
    this.name = event.name;
    this.email = event.email;
    this.customerGroup = event.customerGroup;
    this.date = event.date;
  }

  // bulkDelete
  bulkDelete() {
    const param: any = {};
    param.customerId = this.checkedData;
    this.sandbox.bulkDelete(param);
    this.checkedData = [];
    this.sandbox.getdeletecustomer$.subscribe(_delete => {
      if (_delete) {
        if (_delete.status === 1) {
          this.customerlist(0, this.pageSize);
        }
      }
    });
  }

  selectChkBox(event, customerId) {
    if (event.target.checked === true) {
      this.checkedData.push(customerId);
    }
    if (event.target.checked === false) {
      this.unCheckData.push(customerId);
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

  // export Excel
  exportExcel() {
    const param: any = {};
    param.customerId = this.checkedData;
    this.sandbox.customerExcel(param);
  }

  // bulkDeleteEmpty
  bulkDeleteEmpty() {
    this.showNotificationError('Choose atleast one Customer');
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
