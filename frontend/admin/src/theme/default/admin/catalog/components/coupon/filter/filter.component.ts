/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CouponSandbox } from '../../../../../../../core/admin/catalog/coupon/coupon.sandbox';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-spurt-catalog-coupon-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class CouponFilterComponent implements OnInit {

  @Output() progressEmit = new EventEmitter<string>();
  public filterForm: FormGroup;
  public couponNameList: FormControl;
  public sortOrder: FormControl;
  public pageSize: any = 500;
  public couponListArray: any = [];
  public status: any;

  constructor(
    public couponSandbox: CouponSandbox,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage');
    this.initFilterForm();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      couponNameList: [''],
      status: [null],
    });
  }

  filter() {
    if (this.filterForm.value.couponNameList ||this.filterForm.value.status === 0 || this.filterForm.value.status) {
      this.status = this.filterForm.value.status === 0 ? this.status = '0' : this.filterForm.value.status === 1 ? this.status = '1' : '';
      const param: any = {};
      param.limit = this.pageSize;
      param.offset = '';
      param.keyword = this.filterForm.value.couponNameList;
      param.status=this.status;
      this.progressEmit.emit(param);
    }

  }

  reset() {
    // if (this.filterForm.value.couponNameList || this.filterForm.value.status || this.filterForm.value.status === 0 ) {
      this.filterForm.reset();
      const param: any = {};
      param.limit = this.pageSize;
      param.offset = '';
      param.keyword = '';
      param.status= '';
      this.progressEmit.emit(param);
      this.couponSandbox.couponList(param);
      param.count = 1;
      this.couponSandbox.couponListCount(param);
    // }

  }

}
