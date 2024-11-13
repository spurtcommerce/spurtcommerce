/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

// Angular
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

// Third Party 
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

// components
import { CustomerAddressComponent } from '../address/address.component';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';

// Store Actions
import { CustomerSandbox } from '../../../../../../../../core/admin/Customers/customers/customer.sandbox';
import { CustomersApiClientService } from '../../../../../../../../core/admin/Customers/customers/customer.ApiClient.service';
import { CustomersGroupService } from '../../../../../../../../../src/core/admin/Customers/customers-group/customers-group.service';

//  constant
import { getFormControlsFields, getTypes } from '../../../../../../../../../src/theme/default/admin/shared/components/common-form/common-form.constant';
import { badgeStatusMappings, bulkAction, customTable, filterFields, removeEmptyKeys } from './list.constant';
@Component({
  selector: 'app-customer-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  @ViewChild("myDropdown") myDropdown!: NgbDropdown;
  @ViewChild('myInput') myInput: ElementRef;

  // Reusable form 
  dynamicObjControls: any = {};
  backupFormValue: any = {};
  private formObjFormGroup: any;
  private formValueExists = false;

  // Status Badge
  badgeStatusMappings = badgeStatusMappings;
  bulkAction = bulkAction;

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  // check box
  selectedDatas: any = [];
  private selectedAll = false;
  tableCheckbox = {
    isSelectAll: false
  };

  //Dynamic columns
  customTable: any = customTable;

  // list 
  customerListArray: any;
  buyerGroupName: any;
  private buyerGroup: any = [];
  private queryData: any = {};
  private title = 'Buyer';

  // pagination
  currentPage: number = 1;
  customerCount: number;
  private offset: any = 0;
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;

  // subscriptions
  private subscriptions: Subscription = new Subscription();

  // Arrow functions
  trackByIndex = (index: number): number => index;

  constructor(
    public sandbox: CustomerSandbox,
    private modalService: NgbModal,
    private router: Router,
    private CustomersGroupservice: CustomersGroupService,
    private service: CustomersApiClientService,
    private route: ActivatedRoute,
    private titleservice: Title,
    private fb: UntypedFormBuilder,
    private datePipe: DatePipe,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.titleservice.setTitle(this.title);
    // form
    this.buildForm();
    /*query param route value*/
    this.routeSubscribe();
    // customer group
    this.customersGroupList();
  }

  subscribeCustomer() {
    this.subscriptions.add(this.sandbox.customerList$.subscribe(data => {
      this.customerListArray = [];
      if (data && data.length > 0) {
        this.customerListArray = data.map(list => {
          return { ...list, selected: false };
        });
      }
    }));
  }

  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "checkBox":
        this.selectedDatas = e.selectedDatas;
        break;
      case "threeDotMenu":
        if (e.actionType == 'Edit') {
          this.editcustomer(e);
        } else {
          this.deleteCustomer(e)
        }
        break;
    }
  }

  // Reset checkbox
  private reset(isChecked = false) {
    this.customerListArray.forEach(val => val.checked = isChecked);
    this.selectedDatas = this.customerListArray.filter(val => val?.checked);
  }

  // Reset check box
  private resetCheckbox(): void {
    this.reset();
    this.tableCheckbox.isSelectAll = false;
    this.tableCheckbox = { ...this.tableCheckbox };
  }

  // Dropdown Close
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }

  // Reset All
  private resetAll(): void {
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.customerListCount();
    this.dropDownClose('myDropdown');
  }

  // Filters
  applyFilter(): void {
    this.filterValueUpdate();
    this.resetAll();
  }

  /*Remove filter*/
  removeFilter(remove): void {
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }

  /*Reset filters*/
  filterReset(type: string): void {
    if (type == 'clearAll') {
      this.formObjFormGroup.reset()
    } else {
      this.formObjFormGroup.patchValue({
        'search': '',
        'Buyer Name': '',
        'Email ID': '',
        'status': '',
        'Date': '',
        'Buyer Group': ''
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  // add buyer address
  addAddress(id): void {
    const modalRef = this.modalService.open(CustomerAddressComponent, {
      windowClass: 'view-address', modalDialogClass: 'modal-dialog-centered'
    });
    modalRef.componentInstance.customerId = id;
  }

  // buyer detail 
  viewcustomer(customelist,data): void {
    this.router.navigate(['customers/manage-customers/customer/view', customelist],{ queryParams: data });
  }

  // add buyer
  addCustomer(): void {
    this.service.setcusteditdata('');
    this.router.navigate(['/customers/manage-customers/customer/add'], { queryParams: this.queryData });
  }

  // edit buyer
  editcustomer(customerlistdata): void {
    this.router.navigate(['/customers/manage-customers/customer/edit', customerlistdata.id], { queryParams: this.getQueryParam() });
  }

  // customerList list
  customerList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let param = removeEmptyKeys(this.getQueryParam());
    param.count = 0;
    param.approvalFlag = 1;
    param.date = this.datePipe.transform(this.backupFormValue['Date'], 'yyyy-MM-dd') ?? '',
      this.sandbox.customerList(param);
    this.subscribeCustomer();
    this.updateQueryParam();
  }

  // customer Count
  customerListCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    params.approvalFlag = 1;
    params.date = this.datePipe.transform(this.backupFormValue['Date'], 'yyyy-MM-dd') ?? '',
      this.sandbox.paginationCustomer(params);
    this.sandbox.customerListCount$.subscribe((val) => {
      if (val) {
        this.customerCount = val?.data;
        this.ref.detectChanges();
      }
    })
  }

  // buyer group list
  customersGroupList(): void {
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.keyword = '';
    param.count = 0;
    this.CustomersGroupservice.customersGroupList(param).subscribe(params => {
      if (params != undefined) {
        this.buyerGroup = params.data;
        filterFields.BuyerGroup.customData.data = params.data;
      }
    })
  }

  // pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.customerList();
  }

  // delete customer
  deleteCustomer(customerId): void {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'Buyer'
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.sandbox.deleteCustomers({ customerId: customerId.id });
        this.sandbox.deleteCustomer$.subscribe(val => {
          if (val?.status == 1) {
            this.routeSubscribe();
          }
        })
      }
    });
  }

  // bulk delete
  bulkDelete(): void {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = this.selectedDatas?.length > 1 ? 'Buyers' : 'Buyer'
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const param: any = {};
        param.customerId = this.selectedDatas.map(list => list?.id).toString()
        this.sandbox.bulkDelete(param);
        this.subscriptions.add(this.sandbox.deleteCustomer$.subscribe(_delete => {
          if (_delete) {
            if (_delete.status === 1) {
              this.selectedDatas = [];
              this.selectedAll = false;
              this.customerList();
              this.customerListCount();
            }
          }
        }));
      }
    });
  }

  // export all 
  exportAllExcel(): void {
    const param: any = {};
    param.customerId = '';
    this.sandbox.customerAllExcel(param);
  }

  // Bulk export
  exportExcel(): void {
    const param = {
      customerId: this.selectedDatas.map(list => list?.id).toString()
    };
    this.sandbox.customerExcel(param);
  }

  // Bulk actions
  actionType(type: string): void {
    switch (type) {
      case 'resetCheckbox':
        this.resetCheckbox();
        break;
      case 'exportExcel':
        this.exportExcel()
        break;
      case 'exportExcelAll':
        this.exportAllExcel()
        break;
      case 'delete':
        this.bulkDelete()
        break;
    }
  }

  focusInput(): void {
    this.myInput.nativeElement.focus();
  }

  // intialize form
  private buildForm(): void {
    const formObjModel = filterFields;
    const formGroupField = getFormControlsFields(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.filterValueUpdate();
  }

  // Value update in queryparams for pagination
  private updateQueryParam(): void {
    this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
  }

  // Query param value and pagination
  private getQueryParam(): any {
    const params = {
      limit: this.limit,
      offset: this.offset,
      keyword: this.backupFormValue['search'] ?? '',
      name: this.backupFormValue['Buyer Name'] ?? '',
      email: this.backupFormValue['Email ID'] ?? '',
      status: this.backupFormValue['status'] ? this.backupFormValue['status'] : '',
      customerGroup: this.backupFormValue?.['Buyer Group'] ?? ''
    };
    return params;
  }

  //Filter Value Update
  private filterValueUpdate(): void {
    const name = this.buyerGroup.find(val => val.id == this.backupFormValue?.['Buyer Group']);
    if (name) {
      this.buyerGroupName = name.name;
    }
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(this.backupFormValue).some((val: any) => !this.empty.includes(val));
  }

  // Query param route value subscribe
  private routeSubscribe(): void {
    let paramsValue: any = {};
    this.subscriptions.add(this.route.queryParams.subscribe(params => {
      paramsValue = params;
      this.limit = paramsValue.limit ? Number(paramsValue.limit) : this.limit;
      this.offset = paramsValue.offset ? Number(paramsValue.offset) : 0;
      this.currentPage = (paramsValue.offset && paramsValue.limit) ? Math.floor(paramsValue.offset / paramsValue.limit) + 1 : 1;
      this.formObjFormGroup.patchValue({
        'Buyer Name': paramsValue.name ?? "",
        'Email ID': paramsValue.email ?? "",
        'status': paramsValue.status ? paramsValue.status : null,
        'Date': paramsValue.date ? new Date(paramsValue.date) : "",
        'Buyer Group': paramsValue.customerGroup ? +paramsValue.customerGroup : null,
        'search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.customerList();
    this.customerListCount();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
