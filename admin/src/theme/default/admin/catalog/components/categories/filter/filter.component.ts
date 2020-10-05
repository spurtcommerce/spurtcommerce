/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
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
  // categorylist purpose

  @Output() progressEmit = new EventEmitter<string>();
  // FormGroup Variable
  public filterForm: FormGroup;
  public categoryNameList: FormControl;
  public sortOrder: FormControl;
  public pageSize: any = 500;
  public categoryListArray: any = [];

  constructor(
    public categorySandbox: CategoriesSandbox,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.categoryList();
    this.initFilterForm();
  }

  // Formgroup
  initFilterForm() {
    this.filterForm = this.fb.group({
      categoryNameList: [''],
      sortOrder: ['']
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
    param.keyword = this.filterForm.value.categoryNameList;
    param.sortOrder = this.filterForm.value.sortOrder;
    this.progressEmit.emit(param);
    this.categorySandbox.categorylist(param);
    param.limit = '';
    param.count = true;
    this.categorySandbox.categorycountdata(param);
  }

  // reset category list
  /**
   * Handles reset function  . Calls categorySandbox categorylist function .
   *
   * @param param with only one limit value .
   */

  reset() {
    this.filterForm.reset();
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.keyword = '';
    this.progressEmit.emit(param);
    this.categorySandbox.categorylist(param);
  }

  categoryList() {
    this.categorySandbox.getCategoriesFilterList$.subscribe(data => {
      if (data && data[0]) {
        this.categoryListArray = data;
      }
    });
  }
}
