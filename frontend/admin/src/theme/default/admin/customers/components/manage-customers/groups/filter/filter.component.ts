/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { LayoutSandbox } from '../../../../../../../../core/admin/Customers/layout/layout.sandbox';
import { CustomersGroupSandbox } from '../../../../../../../../core/admin/Customers/customers-group/customers-group.sandbox';

@Component({
  selector: 'app-customer-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class GroupsFilterComponent implements OnInit {

  public statusFilterForm: UntypedFormGroup;
  public keyword: UntypedFormControl;
  public status: UntypedFormControl;
  @Input() pageSize: any;
  public pagenationCount: boolean;
  @Output() progressEmits = new EventEmitter<string>();
  @Output() FromEmit = new EventEmitter<any>();

  constructor(public fb: UntypedFormBuilder, public sandbox: CustomersGroupSandbox, public laySandbox: LayoutSandbox) { }

  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage');
    this.pagenationCount = true;
    this.initForm();
  }

  initForm() {
    this.statusFilterForm = this.fb.group({
      keyword: ['', Validators.required],
      status: [null, Validators.required]
    });
  }

  reset() {
    // if (this.statusFilterForm.value.keyword) {
    this.statusFilterForm.reset();
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.keyword = '';
    param.status = '';
    this.progressEmits.emit(param);
    this.sandbox.customersGroupList(param);
    param.count = 1;
    this.sandbox.PaginationCustomersGroup(param);
    // }

  }

  onSubmit() {
    const param: any = {};
    param.keyword = this.statusFilterForm.value.keyword ? this.statusFilterForm.value.keyword : '';
    param.status = this.statusFilterForm.value.status === 0 ? param.price = '0' : this.statusFilterForm.value.status === 1 ? param.price = '1' : '';
    this.progressEmits.emit(param);
    this.FromEmit.emit(this.statusFilterForm);
  }

}

