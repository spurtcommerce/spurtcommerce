/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoriesSandbox } from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-spurt-catalog-categories-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class CategoriesFilterComponent implements OnInit {

  @Output() progressEmit = new EventEmitter<string>();
  public filterForm: FormGroup;
  public categoryNameList: FormControl;
  public status: FormControl;
  public pageSize: any = 500;
  public categoryListArray: any = [];

  constructor(
    public categorySandbox: CategoriesSandbox,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage');
    this.initFilterForm();
  }

  // Formgroup
  initFilterForm() {
    this.filterForm = this.fb.group({
      status: [null],
      keyword: ['']
    });
  }

  /**
   * Handles filter  . Calls categorySandbox categorylist function .
   *
   * @param param with value which is already assigned
   */
  filter() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.keyword = this.filterForm.value.keyword ? this.filterForm.value.keyword : '';
    param.status = this.filterForm.value.status === 0 ? param.price = '0' : this.filterForm.value.status === 1 ? param.price = '1' : '';
    this.progressEmit.emit(param);

  }

  // reset category list
  /**
   * Handles reset function  . Calls categorySandbox categorylist function .
   *
   * @param param with only one limit value .
   */

  reset() {
    if (this.filterForm.value.keyword || this.filterForm.value.status || this.filterForm.value.status === 0) {
      this.filterForm.reset();
      const param: any = {};
      param.limit = this.pageSize;
      param.offset = '';
      param.keyword = '';
      this.progressEmit.emit(param);
      this.categorySandbox.categoryList(param);
    }
  }


}
