/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Routing Module
import { ActivatedRoute, Router } from '@angular/router';

// Third party
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Store Module
import { CategoriesSandbox } from '../../../../../../../../core/admin/catalog/category/categories.sandbox';
import { LayoutsSandbox } from '../../../../../../../../core/admin/catalog/layout/layout.sandbox';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ConfigService } from '../../../../../../../../../src/core/admin/service/config.service';

@Component({
  selector: 'app-spurt-catalog-categories-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class CategoriesListComponent implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild("myDropdown") myDropdown!: NgbDropdown;
  @ViewChild('myInput') myInput: ElementRef;

  public categoryImage: any = [];
  public page: number;
  private offset: any = 0;
  public pageSize = '10';
  public keyword = '';
  public index: any;
  public currentPage = 1;
  public limit = 10;
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
  title = 'Product Categories';
  categoryCount: any;
  filterSearch: any = {};
  filtercontrolForm: any;
  name = '';

  constructor(
    public categorySandbox: CategoriesSandbox,
    public layoutSandbox: LayoutsSandbox,
    private route: Router,
    public router: ActivatedRoute,
    public modalService: NgbModal,
    public titleService: Title,
    private config: ConfigService
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.imageUrl = this.config.getImageUrl();
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
  
  getStatusDisplay(key: string, value: any): string {
    if (key == 'Status') {
        return value == 1 ? 'Active' : 'In-Active';
    }
    return value;
}

  /**
   * Handles  'categorylist' event. Calls sandbox categorylist function .
   *
   * @param pageSize form pagination
   *  @param offset form offset
   */
  categoryList() {
    this.offset = (this.currentPage - 1) * this.limit;

    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.keyword = this.keyword;
    param.status = this.status;
    param.name = this.name;
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
    param.name = this.name;
    param.count = 1;
    this.categorySandbox.getCategoryListCount(param);
    this.categorySandbox.getCategoriesListCount$.subscribe((val) => {
      this.categoryCount = val;
    })
  }

  /**
   * Handles  'editCategory' event. Calls categoryService setEditcategories function .
   *  @param data  form value
   */

  editCategory(data) {
    this.edit = data;
    this.route.navigate(['/vendors/product-config/categories/edit', data.categoryId], { queryParams: this.queryData });
  }

  /**
   * Handles  'addCategories' event. Calls categoryService setEditcategories function .
   *  @param edit  with empty value
   */
  addCategories() {
    this.route.navigate(['/vendors/product-config/categories/add'], { queryParams: this.queryData });
  }

  localization() {
    this.route.navigate(['/vendors/product-config/categories/localization'])
  }

  // shows the filter component
  changeFilter(event) {
    this.buttonCheck = event.target.checked;
  }

  /**
   * Handles  'onPageChange' event. Calls categorylist function .
   *  @param event  from material paginator value
   */

  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.categoryList();
  }

  /**
   * Handles  'deleteCategory' event. Calls categorySandbox categorydelete function,
   * (Calls  categorylist function if (_delete)).
   *  @param id  from material paginator value.
   */


  deleteCategory() {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'Category'
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const params: any = {};
        params.categoryId = this.filterDataId;
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
    this.name = event.keyword;
    this.status = event.status;
    this.offset = 0;
    this.filterSearch = {
      'Name': this.name,
      'Status': this.status
    }

    if (this.name !== '' || this.status !== '') {
      this.categoryList();
      this.getCategoryListCount();
    }
    this.myDropdown.close();
  }

  formchange(formchange) {
    this.filtercontrolForm = formchange;
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

  deselectAll() {
    for (let i = 0; i < this.productListArray.length; i++) {
      this.productListArray[i].selected = false;
    }
    this.selectedAll = false;
    this.filterDataId = [];
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

  searchList(): void {
    if (this.keyword) {
      this.queryData.keyword = this.keyword;
      this.queryData.pageSize = this.pageSize;
      this.queryData.offset = 0;
      this.queryData.index = 1;
      this.index = 1;

      this.filterSearch.keyword = this.keyword

      this.categoryList();
      this.getCategoryListCount();

    } else {
      this.offset = this.router.snapshot.queryParamMap.get('offset') || 0;
      this.index = this.router.snapshot.queryParamMap.get('index');
      this.categoryList();
      this.getCategoryListCount();
    }
  }

  focusInput() {
    this.myInput.nativeElement.focus();
  }

  keywordchange(event) {
    this.filterSearch.keyword = event;
  }

  removeFilter(removeFilter): void {
    this.filterSearch[removeFilter.key] = '';
    this[removeFilter.key] = '';

    this.name = removeFilter.key == 'Name' ? '' : this.name;
    this.status = removeFilter.key == 'Status' ? '' : this.status;
    this.filtercontrolForm?.controls['keyword'].setValue(removeFilter.key == 'Name' ? '' : this.name);
    this.filtercontrolForm?.controls['status'].setValue(removeFilter.key == 'Status' ? '' : this.status);

    this.offset = 0;
    this.categoryList();
    this.getCategoryListCount();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
