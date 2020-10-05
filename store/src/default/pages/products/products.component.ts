/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ChangeDetectorRef,
  PLATFORM_ID,
  Inject,
  OnDestroy,
  OnChanges
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProductDialogComponent } from '../../shared/components/products-carousel/product-dialog/product-dialog.component';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { ConfigService } from '../../../core/service/config.service';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  // decorator
  @ViewChild('sidenav') sidenav: any;
  // side nav
  public sidenavOpen = true;
  // card view
  public viewType = 'grid';
  public viewCol = 25;
  public sortings: Array<any>;
  public sortData: any = 'Price Low To High';
  condition: any;
  // parameters for product list
  public startKey = 0;
  public viewOrder = 'ASC';
  public keyword = '';
  public categoryId = '';
  public brand: any = '';
  public priceFrom = '';
  public priceTo = '';
  // pagination
  public pagesize: any = 12;
  public index: any = 0;
  // load image path
  public imagePath: string;
  // product list
  public isClicked: any = [];
  public queryParams: any;
  // discount price
  public discountPrice = 20;
  public fiftyPercent = 50;
  public subscription: Array<Subscription> = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    public listSandbox: ListsSandbox,
    private configService: ConfigService,
    private changeDetectRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // subscribe route params
    this.subscription.push(
      this.activatedRoute.queryParams.subscribe(query => {
        if (query['keyword']) {
          this.keyword = query['keyword'];
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('keywordData', query['keyword']);
            this.keyword = localStorage.getItem('keywordData');
          }
          this.getProductList(this.startKey, this.viewOrder, this.categoryId);
        }
        if (query['brand']) {
          this.brand = query['brand'];
          this.getProductList(this.startKey, this.viewOrder, this.categoryId);
        }
      })
    );
    this.subscription.push(
      this.activatedRoute.params.subscribe(param => {
        this.queryParams = param;

        // if route params contains id assign id to the parameter categoryId
        if (this.queryParams.id) {
          if (this.queryParams.id === 'All' && !this.brand) {
            this.isClicked = [];
            this.brand = '';
            this.keyword = '';
            this.categoryId = '';
            this.getProductList(this.startKey, this.viewOrder, this.categoryId);
          } else {
            this.isClicked = [];
            this.isClicked[this.queryParams.id] = true;
            this.categoryId = this.queryParams.id;
            this.getProductList(this.startKey, this.viewOrder, this.categoryId);
          }
        }
      })
    );
  }

  // initially remove local storage and calls listSandbox getSettings
  ngOnInit() {
    if (!this.queryParams.id && this.keyword === '') {
      this.getProductList(this.startKey, this.viewOrder, this.categoryId);
    }
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('fromPrice');
      localStorage.removeItem('priceTo');
    }

    // this.listSandbox.getSettings();
    this.sortings = [
      { order: 'Price Low To High', value: 'ASC' },
      { order: 'Price High To Low', value: 'DESC' }
    ];
    // this.imagePath = this.configService.get('resize').imageUrl;
    this.imagePath = this.configService.getImageUrl();
    this.changeDetectRef.detectChanges();
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }
    if (window.innerWidth < 1280) {
      this.viewCol = 33.3;
    }
  }

  /**
   * fetch product list from service. calling getProductList function from sandbox
   *
   * @param limit number of records to be load
   * @param offset startkey of the records to be load
   * @param manufacturerId brand id to be filtered
   * @param categoryId category id to be filtered
   * @param price price to be filtered
   * @param priceFrom filter (from price)
   * @param keyword filter (to price)
   */
  getProductList(offset, price, category) {
    const params: any = {};
    params.limit = this.pagesize;
    params.offset = offset;
    if (this.brand == null) {
      this.brand = '';
    }
    params.manufacturerId = this.brand;
    params.categoryId = this.categoryId;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('categoryIdDataKey', this.categoryId);
    }
    params.keyword = this.keyword;
    params.price = price;
    if (this.priceFrom) {
      params.priceFrom = this.priceFrom;
    } else {
      params.priceFrom = 0;
    }
    if (this.condition) {
      params.condition = this.condition;
    }
    params.priceTo = this.priceTo;
    this.listSandbox.getProductList(params);
    params.price = '';
    params.count = true;
    this.listSandbox.getProductCount(params);
  }

  /**
   * open quick view of the product
   *
   * @param data passing selected product detail to dialog
   */
  public openProductDialog(product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      panelClass: 'product-dialog',
      data: product
    });
    dialogRef.afterClosed().subscribe(products => {
      if (products) {
        this.router.navigate(['/products/productdetails', products.productId]);
      }
    });
  }

  // sidebar open close based on the window size
  @HostListener('window:resize')
  public onWindowResize(): void {
    window.innerWidth < 960
      ? (this.sidenavOpen = false)
      : (this.sidenavOpen = true);
    window.innerWidth < 1280 ? (this.viewCol = 33.3) : (this.viewCol = 25);
  }

  // changing the view type
  public changeViewType(viewType, viewCol) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  // calls getProductList for sorting list
  public changeSorting(sort) {
    this.sortData = sort.order;
    this.viewOrder = sort.value;
    this.getProductList(this.startKey, this.viewOrder, this.categoryId);
  }

  // calls getProductList for pagination
  onPageChange(event) {
    this.startKey = event.pageSize * event.pageIndex;
    this.pagesize = event.pageSize;
    this.index = event.pageIndex;
    if (isPlatformBrowser(this.platformId)) {
      this.priceFrom = localStorage.getItem('fromPrice');
      this.priceTo = localStorage.getItem('priceTo');
    }

    if (this.priceTo == null) {
      this.priceTo = '';
    }

    this.getProductList(this.startKey, this.viewOrder, this.categoryId);
  }

  /**
   *  receive data which is emitted from the child component through event emitter,
   * set's local storage value(brandKey). And calls getProductList.
   *
   *  @param event from event  emitter.
   *
   *  **/
  receiveProgress(event) {
    this.priceFrom = '';
    this.brand = event.manufacturerId;
    // this.categoryId = event.categoryId;
    this.priceFrom = event.priceFrom;
    this.priceTo = event.priceTo;
    this.condition = event.condition;
    const defaultCallValue = this.viewOrder;
    this.categoryId = event.categoryId;
    this.getProductList(0, defaultCallValue, event.categoryId);
  }
  ngOnDestroy() {
    this.subscription.forEach(each => {
      each.unsubscribe();
    });
  }
}
