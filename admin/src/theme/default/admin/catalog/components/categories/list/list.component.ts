/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
// Routing Module
import { Router } from '@angular/router';
// Store Module
import { CategoriesSandbox } from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import { CategoriesService } from '../../../../../../../core/admin/catalog/category/categories.service';
import { LayoutsSandbox } from '../../../../../../../core/admin/catalog/layout/layout.sandbox';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-spurt-catalog-categories-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  // pagination
  categoryImage: any = [];
  public page: number;
  private offset = 0;
  public pageSize = '10';
  private keyword = '';
  public index: number;
  private currentPage: number;
  private sortOrder: number;
  // editCategory
  private edit: any;
  // condition for filter component
  public buttonCheck = true;
  imageUrl: string;
  constructor(
    private categoryService: CategoriesService,
    public categorySandbox: CategoriesSandbox,
    public layoutSandbox: LayoutsSandbox,
    private route: Router
  ) {
    // initially calling sandbox categorylist with empty data
  }

  // initially calling categories pagination
  ngOnInit() {
    this.imageUrl = environment.imageUrl;

    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.categoryList(0, this.keyword);
    this.index = 0;
    this.categoriesPagination();
  }

  /**
   * Handles  'categorylist' event. Calls sandbox categorylist function .
   *
   * @param pageSize form pagination
   *  @param offset form offset
   */
  categoryList(offset: number = 0, keyword) {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.keyword = this.keyword;
    param.sortOrder = this.sortOrder;
    this.categorySandbox.categorylist(param);
    this.layoutSandbox.getCatagoryListCount({ count: true });
  }

  /**
   * Handles  'categorycountdata' event. Calls categorySandbox categorycountdata function .
   *
   * @param pageSize form pagination
   *  @param offset form offset
   */
  categoriesPagination() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = 0;
    param.keyword = '';
    param.count = 1;
    this.categorySandbox.categorycountdata(param);
  }

  /**
   * Handles  'editCategory' event. Calls categoryService setEditcategories function .
   *  @param data  form value
   */

  editCategory(data) {
    this.edit = data;
    this.categoryService.setEditcategories(this.edit);
    this.route.navigate(['/catalog/categories/add']);
  }

  /**
   * Handles  'addCategories' event. Calls categoryService setEditcategories function .
   *  @param edit  with empty value
   */
  addCategories() {
    this.edit = ' ';

    this.categoryService.setEditcategories(this.edit);
    this.route.navigate(['/catalog/categories/add']);
  }

  // shows the filter component
  changeFilter(event) {
    this.buttonCheck = event.target.checked;
  }

  /**
   * Handles  'onPageChange' event. Calls categorylist function .
   *  @param event  from material paginator value
   */

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.categoryList(this.offset, this.pageSize);
  }

  /**
   * Handles  'deleteCategory' event. Calls categorySandbox categorydelete function,
   * (Calls  categorylist function if (_delete)).
   *  @param id  from material paginator value.
   */

  deleteCategory(id) {
    const params: any = {};
    params.categoryId = id;
    this.categorySandbox.categorydelete(params);
    this.categorySandbox.getCategoriesDelete$.subscribe(_delete => {
      if (_delete) {
        if (_delete.user.status === 1) {
          this.categoryList(this.offset, this.pageSize);
          this.categoriesPagination();
        }
      }
    });
  }

  // receive param from filter component .And calls categoriesPagination event
  receiveProgress(event) {
    this.index = 0;
    this.categoriesPagination();
    this.keyword = event.keyword;
    this.sortOrder = event.sortOrder;
  }
  categoryImageLoading(id) {
    this.categoryImage[id] = true;
  }
}
