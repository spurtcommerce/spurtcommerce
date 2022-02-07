/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { environment } from '../../../../../../../environments/environment';
import { LayoutsSandbox } from '../../../../../../../core/admin/catalog/layout/layout.sandbox';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LayoutSandbox } from '../../../../../../../core/admin/layout/layout.sandbox';

@Component({
  selector: 'app-catalog-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ProductListComponent implements OnInit {
  // pagination
  public pageSize;
  public keyword = '';
  public offset: number;
  public index = 0;
  public sku: any;
  public status: number;
  public price: number;
  // getProductCount
  private isCount: boolean;
  // popover
  public popoverContent: any;
  // toogle filter button
  public isActive: any = [];
  // condition for table responsive
  public buttoncheck = true;
  // image view
  public imageUrl: string;
  public productUrl: string;
  public productListImage = {};
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];

  // pagination
  previousSort = {};
  selectedSortField = '';
  currentPage = 1;

  constructor(
    public productSandbox: ProductSandbox,
    public commonSandbox: LayoutSandbox,
    private router: Router,
    private toastr: ToastrManager,
    public modalService: NgbModal,
    public layoutSandbox: LayoutsSandbox,
    public configService: ConfigService
  ) {}

  /** initially calling RatingReviewSandbox
   * getProductlist with pagination data with pagination count
   * and assigning  configService url
   * */
  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.isCount = true;
    this.ProductLists();
    // this.imageUrl = this.configService.get('resize').imageUrl;
    this.imageUrl = environment.imageUrl;
    this.productUrl = environment.productUrl;
    this.layoutCount();
  }
  /**
   * Handles  'layoutCount' event. Calls productSandbox getProductList,
   *  if (isCount) Calls listSandbox getLayoutCount.
   *
   * @param params with pagination value
   */
  layoutCount() {
    this.layoutSandbox.getProductListCount({ count: true });
    this.layoutSandbox.getActiveProductListCount({ status: '1', count: true });
    this.layoutSandbox.getInActiveProductListCount({
      status: '0',
      count: true
    });
  }
  /**
   * Handles  'getProductlist' event. Calls productSandbox getProductList,
   *  if (isCount) Calls productSandbox getProductCount.
   *
   * @param params with pagination value
   */
  ProductLists() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.keyword;
    params.sku = this.sku;
    params.status = this.status;
    params.price = this.price;
    this.productSandbox.getProductList(params);
    if (this.isCount) {
      params.limit = '';
      params.count = true;
      this.productSandbox.getProductCount(params);
    }
  }

  // open filter component
  changeFilter(event) {
    this.buttoncheck = event.target.checked;
  }

  // calls productSandbox getProductlist with pagination values
  onPageChange(event: any) {
    this.isCount = false;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.ProductLists();
  }

  /** calls productSandbox doProductDelete,
   * if (_delete) then calls getProductlist .
   *
   *@param params with productId from deleteProduct button .
   */
  deleteProduct(id) {
    // event.stopPropagation();
    const params: any = {};
    params.productId = id;
    this.productSandbox.doProductDelete(params);
    this.productSandbox.deletedProduct$.subscribe(_delete => {
      if (_delete) {
        if (_delete.status === 1) {
          this.ProductLists();
        }
      }
    });
  }

  // navigation to update product with productId
  updateProduct(productId) {
    this.router.navigate(['/catalog/product/edit', productId]);
  }


  // receive param from filter component .And calls paginations event
  receiveProgress(event) {
    this.index = 0;
    this.paginations();
    this.keyword = event.keyword;
    this.sku = event.sku;
    this.status = event.status;
    this.price = event.price;
  }

  // calls productSandbox getProductCount with params
  paginations() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = '';
    params.count = true;
    this.productSandbox.getProductCount(params);
  }

  // perticular product details will show
  product_Details(id) {
    window.open(this.productUrl + 'products/productdetails/' + id);
  }

  /**
   * Handles  'todayDealsChange' event. Calls productSandbox productTodayDeals function if FeatureValue is true,
   * else calls productSandbox productTodayDeals
   *
   * @param event and prodinfo form onFilterChange input.
   *
   */
  todayDealsChange(event: any, prodinfo) {
    const params: any = {};
    params.productId = prodinfo.productId;
    const FeatureValue = event.target.checked;
    if (FeatureValue === true) {
      params.todayDeals = 1;
      this.productSandbox.productTodayDeals(params);
    } else {
      params.todayDeals = 0;
      this.productSandbox.productTodayDeals(params);
    }
  }
  // Product List ImageLoader
  productListImageLoading(id) {
    this.productListImage[id] = true;
  }
  // bulkDelete
  bulkDelete() {
    const param: any = {};
    param.productId = this.checkedData;
    this.productSandbox.bulkDelete(param);
    this.checkedData = [];
    this.productSandbox.deletedProduct$.subscribe(_delete => {
      if (_delete) {
        if (_delete.status === 1) {
          this.ProductLists();
        }
      }
    });
  }
  selectChkBox(event, productId) {
    if (event.target.checked === true) {
      this.checkedData.push(productId);
    }
    if (event.target.checked === false) {
      this.unCheckData.push(productId);
      this.unCheckData.forEach((value, index) => {
        this.checkedData = this.checkedData.filter(_value => {
          if (value === _value) {
            return false;
          } else {
            return true;
          }
        });
      });
    }
    this.unCheckData = [];
  }

  // export Excel
  exportExcel() {
    const param: any = {};
    param.productId = this.checkedData;
    this.productSandbox.productExcel(param);
  }
  // bulkDeleteEmpty
  bulkDeleteEmpty() {
    this.showNotificationError('Choose atleast one Product');
  }
  /**
   * Shows error notification with given title and message
   *
   * @params message
   */
  private showNotificationError(message: string): void {
    this.toastr.errorToastr(message);
  }

  /**
   * Handles form 'onPageChange' event. when page changes
   * @param event form event
   */
  pageChange(event) {
    this.selectedSortField = '';
    window.scroll(0, 0);
    this.currentPage = event;
    this.offset = this.pageSize * (event - 1);
    this.ProductLists();
  }
}
