/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersGroupSandbox } from '../../../../../../../../core/admin/Customers/customers-group/customers-group.sandbox';
import { CustomersGroupService } from '../../../../../../../../core/admin/Customers/customers-group/customers-group.service';
import { LayoutSandbox } from '../../../../../../../../core/admin/Customers/layout/layout.sandbox';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { C } from '@angular/cdk/keycodes';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-groups-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class GroupsListComponent implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild("myDropdown") myDropdown!: NgbDropdown;
  @ViewChild("myDropdownSearch") myDropdownSearch!: NgbDropdown;

  public closeResult: string;
  public pageSize = '10';
  public pageSizeOptions = [10, 20];
  public offset: any = 0;
  public keyword = '';
  public currentPage = 1;
  public index: any;
  public buttonCheck = true;
  public popoverContent: any;
  public checkedArray: any = [];
  public limit = 10;
  public date: any;
  public checkCondition: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];
  public count: number;
  public name = '';
  public status: any;
  public statusdetails: any = {};
  public orderStatusDetails: any = {};
  private editOrderStatusId: string;
  private subscriptions: Array<Subscription> = [];
  queryData: any = {};
  title = 'Customer Group';
  filterSearch: any = {};
  filtercontrolForm: any;
  buyerGroupCount: any;
  totalPages: number;
  groupName: any;

  constructor(
    private modalService: NgbModal,
    public sandbox: CustomersGroupSandbox,
    private service: CustomersGroupService,
    public layoutSandbox: LayoutSandbox,
    private router: Router,
    private route: ActivatedRoute,
    public titleService: Title,
    private change: ChangeDetectorRef

  ) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.pageSize = sessionStorage.getItem('itemsPerPage')
      ? sessionStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.index = this.route.snapshot.queryParamMap.get('index');
    this.customersGroupList();
    this.customersGroupPagination();
    // this.layoutSandbox.getCustomerCount();
    this.editOrderStatusId = this.route.snapshot.paramMap.get('id');
  }

  addCustomerGroup() {
    this.service.setOrderStatus('');
    this.router.navigate(['/customers/manage-customers/groups/add'], { queryParams: this.queryData });
  }

  editGroup(customersGroup) {
    this.orderStatusDetails = customersGroup;
    this.service.setOrderStatus(this.orderStatusDetails);
    this.router.navigate(['/customers/manage-customers/groups/edit/', this.orderStatusDetails.id
    ], { queryParams: this.queryData });
  }

  customersGroupList() {
    this.offset = (this.currentPage - 1) * this.limit;
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.keyword = this.keyword;
    param.status = this.status;
    param.groupName = this.groupName;
    param.count = '';
    this.sandbox.customersGroupList(param);
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

  customersGroupPagination() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = '';
    params.name = '';
    params.keyword = this.keyword;
    params.groupName = this.groupName;
    params.status = this.status;
    params.count = true;
    this.sandbox.PaginationCustomersGroup(params);
    this.sandbox.getpagination$.subscribe((val) => {
      this.buyerGroupCount = val
      if (val) {
        this.change.detectChanges();
      }
      this.totalPages = Math.ceil(this.buyerGroupCount / Number(this.pageSize));
    })
  }

  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.customersGroupList();
  }


  check(event) {
    this.buttonCheck = event.target.checked;
  }

  // receive param from filter component .And calls customerPgination event
  receiveProgress(event) {
    this.index = 0;
    // this.keyword = event.keyword
    this.status = event.status;
    this.groupName = event.keyword;
    this.offset = 0;
    this.filterSearch = {
      'Group Name': this.groupName,
      'Keyword': this.keyword,
      'Status': this.status
    }

    if (this.groupName !== '' || this.status !== '') {
      // this.paginator.firstPage();
      this.customersGroupList();
      this.customersGroupPagination();
    }
    this.myDropdown.close();
  }

  formchange(formchange) {
    this.filtercontrolForm = formchange;
  }

  // Open to Add Address Add Form And List
  open2(content, id) {
    const modalRef = this.modalService.open({});
    modalRef.componentInstance.groupId = id;
  }
  getStatusDisplay(key: string, value: any): string {
    console.log(key)
    if (key == 'Status') {
      console.log(value,333)
        return value == 1 ? 'Active' : 'In-Active';
    }
    return value;
}


  deleteCustomerGroup(groupId) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'Customer Group'
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.sandbox.deleteCustomersGroup({ groupId: groupId });
        this.subscriptions.push(this.sandbox.getDeleteCustomersGroupLoaded$.subscribe(_delete => {
          if (_delete && _delete === true) {
            this.customersGroupList();
            this.customersGroupPagination();
            this.layoutSandbox.getCustomerCount();
          }
        }));
      }
    });
  }

  searchList(): void {
    if (this.keyword) {
      this.queryData.keyword = this.keyword;
      this.queryData.pageSize = this.pageSize;
      this.queryData.offset = 0;
      this.queryData.index = 1;
      this.index = 1;

      this.filterSearch.Keyword = this.keyword;
      
      this.customersGroupList();
      this.customersGroupPagination();

    } else {
      this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
      this.index = this.route.snapshot.queryParamMap.get('index');
      this.customersGroupList();
      this.customersGroupPagination();
    }
  }

  keywordchange(event) {
    this.filterSearch.Keyword = event;
  }

  removeFilter(removeFilter): void {

    this.filterSearch[removeFilter.key] = '';
    this[removeFilter.key] = '';

    if (removeFilter.key == 'Keyword') {
      this.keyword = '';
    }
    if (removeFilter.key == 'Group Name') {
      this.groupName = '';
      this.filtercontrolForm?.controls['keyword'].setValue(removeFilter.key == 'Group Name' ? '' : this.groupName);

    }
    if (removeFilter.key == 'Status') {
      this.status = '';
      this.filtercontrolForm?.controls['status'].setValue(removeFilter.key == 'Status' ? '' : this.status);

    }
    this.offset = 0;
    this.customersGroupList();
    this.customersGroupPagination();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
