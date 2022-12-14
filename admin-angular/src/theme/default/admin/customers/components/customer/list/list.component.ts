/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerSandbox } from '../../../../../../../core/admin/Customers/customers/customer.sandbox';
import { CustomersApiClientService } from '../../../../../../../core/admin/Customers/customers/customer.ApiClient.service';
import { CustomerAddressComponent } from '../address/address.component';
import { LayoutSandbox } from '../../../../../../../core/admin/Customers/layout/layout.sandbox';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteConfirmationDialogComponent } from '../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';


@Component({
  selector: 'app-customer-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: MatPaginator;


  public closeResult: string;
  public pageSize = '10';
  public pageSizeOptions = [10, 20];
  public offset: any = 0;
  public keyword = '';
  public currentPage: number;
  public index: any;
  public buttoncheck = true;
  public popoverContent: any;
  public checkedArray: any = [];
  public limit = 10;
  public name = '';
  public customerGroupName: any;
  public email: any;
  public customergroup: any;
  public customerGroup: any;
  public date: any;
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];
  private subscriptions: Array<Subscription> = [];
  // bulk delete or bulk export variables
  public bulkFunction = false;
  public productList: any;
  public selectedAll = false;
  public customerListArray: any;
  public filterData: any = [];
  public filterDataId = [];
  queryData: any = {};

  constructor(
    private modalService: NgbModal,
    private router: Router,
    public sandbox: CustomerSandbox,
    public layoutSandbox: LayoutSandbox,
    private service: CustomersApiClientService,
    public route: ActivatedRoute
  ) {
    this.subscribeCustomer();

  }

  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage')
      ? sessionStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.index = this.route.snapshot.queryParamMap.get('index');
    this.customerList();
    this.customerListCount();
    this.regSubscribeEvents();
    this.layoutSandbox.getCustomerCount();



  }

  // Open to Add Address Add Form And List
  open2(content, id) {
    const modalRef = this.modalService.open(CustomerAddressComponent, {
      windowClass: 'view-address'
    });
    modalRef.componentInstance.customerId = id;
  }

  // style purpose
  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  check(event) {
    this.buttoncheck = event.target.checked;
  }

  viewcustomer(customelist) {
    this.router.navigate(['customers/customer/view', customelist]);
  }


  editcustomer(custlistdata) {
    this.router.navigate(['/customers/customer/edit', custlistdata.id], { queryParams: this.queryData });
  }

  addAddress() {
    this.service.setcusteditdata('');
    this.router.navigate(['/customers/customer/add'], { queryParams: this.queryData });
  }

  customerList() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.name = this.name;
    param.email = this.email;
    param.customerGroup = this.customerGroup;
    param.customerGroupName = '';
    param.date = this.date;
    param.count = 0;
    param.status = '';
    this.sandbox.customerList(param);

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

  customerListCount(offset = 0) {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.name = this.name;
    param.email = this.email;
    param.customerGroup = this.customerGroup;
    param.customerGroupName = '';
    param.date = this.date;
    param.count = '';
    param.status = '';
    param.count = true;
    this.sandbox.paginationCustomer(param);
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSizeOptions = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.filterDataId = [];
    this.selectedAll = false;
    this.customerList();
  }


  regSubscribeEvents() {
    this.subscriptions.push(this.sandbox.deleteCustomer$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.customerList();
        this.customerListCount();
        this.layoutSandbox.getCustomerCount();

      }
    }));
  }

  receiveProgress(event) {
    this.index = 0;
    this.name = event.name;
    this.email = event.email;
    this.customerGroup = event.customerGroup;
    this.date = event.date;
    this.offset = 0;
    if (this.name !== '' || this.email !== '' || this.customerGroup !== '' || this.date !== '') {
      this.paginator.firstPage();
      this.customerList();
      this.customerListCount();
    }
  }

  deleteCustomer(customerId) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.sandbox.deleteCustomers({ customerId: customerId });
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
        param.customerId = this.filterDataId;
        this.sandbox.bulkDelete(param);
        this.subscriptions.push(this.sandbox.deleteCustomer$.subscribe(_delete => {
          if (_delete) {
            if (_delete.status === 1) {
              this.filterDataId = [];
              this.selectedAll = false;
              this.customerList();
              this.customerListCount();
              this.layoutSandbox.getCustomerCount();
            }
          }
        }));
      }
    });
  }

  selectAll() {
    for (let i = 0; i < this.customerListArray.length; i++) {
      this.customerListArray[i].selected = this.selectedAll;
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
    this.selectedAll = this.customerListArray.every(function (item: any) {
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
    this.filterData = this.customerListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.id);
  }

  exportAllExcel(event: any) {
    const param: any = {};
    param.name = this.name?this.name:'';
    param.email = this.email?this.email:'';
    param.customerGroup = this.customerGroup?this.customerGroup:'';
    param.date = this.date?this.date:'';
    this.sandbox.customerAllExcel(param);
  }

  exportExcel() {
    const param: any = {};
    param.customerId = this.filterDataId;
    this.sandbox.customerExcel(param);
  }

  subscribeCustomer() {
    this.subscriptions.push(this.sandbox.customerList$.subscribe(data => {
      this.customerListArray = [];
      if (data && data.length > 0) {
        this.customerListArray = data.map(list => {
          return { ...list, selected: false };
        });
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
