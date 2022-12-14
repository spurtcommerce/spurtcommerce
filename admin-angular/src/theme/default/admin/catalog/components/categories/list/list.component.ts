/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
// Routing Module
import { ActivatedRoute, Router } from '@angular/router';
// Store Module
import { CategoriesSandbox } from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import { CategoriesService } from '../../../../../../../core/admin/catalog/category/categories.service';
import { LayoutsSandbox } from '../../../../../../../core/admin/catalog/layout/layout.sandbox';
import { environment } from '../../../../../../../environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { DeleteConfirmationDialogComponent } from '../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-spurt-catalog-categories-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class CategoriesListComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator: MatPaginator;

  public categoryImage: any = [];
  public page: number;
  private offset: any = 0;
  public pageSize = '10';
  private keyword = '';
  public index: any;
  private currentPage: number;
  private status: any;
  private edit: any;
  public buttonCheck = true;
  public imageUrl: string;
  private subscriptions: Array<Subscription> = [];
  queryData: any = {};
  public filterData: any = [];
  public filterDataId = [];
  public selectedAll: any;
  public selectAllValues = false;
  public productListArray: any;


  constructor(
    private categoryService: CategoriesService,
    public categorySandbox: CategoriesSandbox,
    public layoutSandbox: LayoutsSandbox,
    private route: Router,
    public router: ActivatedRoute,
    public modalService: NgbModal
  ) { }

  ngOnInit() {

    this.imageUrl = environment.imageUrl;
    this.pageSize = sessionStorage.getItem('itemsPerPage')
      ? sessionStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.offset = this.router.snapshot.queryParamMap.get('offset') || 0;
    this.index = this.router.snapshot.queryParamMap.get('index');
    this.categoryList();
    this.getCategoryListCount();
    // this.layoutSandbox.getCatalogCount();
    this.subscribeProduct();

  }

  /**
   * Handles  'categorylist' event. Calls sandbox categorylist function .
   *
   * @param pageSize form pagination
   *  @param offset form offset
   */
  categoryList() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.keyword = this.keyword;
    param.status = this.status;
    this.categorySandbox.categoryList(param);
    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.index || 0;
    this.route.navigate(
      [],
      {
        relativeTo: this.router,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  /**
   * Handles  'categorycountdata' event. Calls categorySandbox categorycountdata function .
   *
   * @param pageSize form pagination
   *  @param offset form offset
   */
  getCategoryListCount() {
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.keyword = this.keyword;
    param.status = this.status;
    param.count = 1;
    this.categorySandbox.getCategoryListCount(param);
  }

  /**
   * Handles  'editCategory' event. Calls categoryService setEditcategories function .
   *  @param data  form value
   */

  editCategory(data) {
    this.edit = data;
    this.route.navigate(['/catalog/categories/edit', data.categoryId], { queryParams: this.queryData });
  }

  /**
   * Handles  'addCategories' event. Calls categoryService setEditcategories function .
   *  @param edit  with empty value
   */
  addCategories() {
    this.route.navigate(['/catalog/categories/add'], { queryParams: this.queryData });
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
    this.selectedAll = false;
    this.filterDataId = [];
    this.categoryList();
  }

  /**
   * Handles  'deleteCategory' event. Calls categorySandbox categorydelete function,
   * (Calls  categorylist function if (_delete)).
   *  @param id  from material paginator value.
   */


  deleteCategory(categoryId) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const params: any = {};
        params.categoryId = categoryId;
        this.categorySandbox.deleteCategory(params);
        this.subscriptions.push(this.categorySandbox.getCategoriesDelete$.subscribe(_delete => {
          if (_delete) {
            if (_delete.user.status === 1) {
              this.categoryList();
              this.getCategoryListCount();
              this.layoutSandbox.getCatalogCount();
            }
          }
        }));
      }
    });
  }

  // receive param from filter component .And calls categoriesPagination event
  receiveProgress(event) {
    this.index = 0;
    this.keyword = event.keyword;
    this.status = event.status;
    this.offset = 0;
    if (this.keyword !== '' || this.status !== '') {
      this.paginator.firstPage();
      this.categoryList();
      this.getCategoryListCount();
    }

  }

  categoryImageLoading(id) {
    this.categoryImage[id] = true;
  }
  subscribeProduct() {
    this.subscriptions.push(this.categorySandbox.getCategoriesList$.subscribe((data: any) => {
      this.productListArray = [];
      if (data && data.length > 0) {
        this.productListArray = data.map(list => {
          return { ...list, selected: false };
        });
      }
    }));
  }

  exportExcel() {
    const param: any = {};
    param.categoryId = this.filterDataId;
    this.categorySandbox.CategoryExcel(param);
  }
  exportAll() {
    const param: any = {};
    param.keyword = this.keyword;
    param.status = this.status;
    this.categorySandbox.ExportAllExcel(param);
  }

  selectAll() {
    for (let i = 0; i < this.productListArray.length; i++) {
      this.productListArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
  }
  filterDataList() {
    this.filterData = this.productListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.categoryId);
  }
  checkIfAllSelected() {
    this.selectedAll = this.productListArray.every(function (item: any) {
      return item.selected === true;
    });
    this.filterDataList();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
