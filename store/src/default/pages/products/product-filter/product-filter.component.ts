/*
 * spurtcommerce
 * version 1.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  Inject,
  SimpleChanges,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { ConfigService } from '../../../../core/service/config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spurt-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit, OnChanges, OnDestroy {
  // price filter
  public priceFrom = '';
  public priceTo: any = '';
  // filter used new
  public conditions = [
    { option: 'All', value: '' },
    { option: 'New', value: 1 },
    { option: 'Used', value: 2 }
  ];
  // product list
  private keyword: any = '';
  public condition = 0;
  public rupees: any;
  private oneTimeAssignValue = 1;
  @Input() isClickedData: any;
  @Input() brandId: any;
  @Input() category: any;
  @Output() progressEmit = new EventEmitter<string>();
  // radio form variable
  public radioForm: FormGroup;
  public radio: FormControl;
  // image
  public imagePath: string;
  private subscriptions: Array<Subscription> = [];
  constructor(
    private router: Router,
    public listSandbox: ListsSandbox,
    private configService: ConfigService,
    private fb: FormBuilder,
    public route: ActivatedRoute,

    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.route.params.subscribe(data => {
      if (data.id) {
        this.category = data.id;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.category && this.category !== '') {
      // this.getCategory(this.category);
    } else {
      this.getCategories();
    }
  }
  // Initially calls getCategories,getBrands function.
  ngOnInit() {
    this.imagePath = this.configService.getImageUrl();
    this.getBrands();

    /**               INITIALLY SET VALUE  (FROM PRICE) AND  (TO PRICE)
     * subscribe listSandbox maxProductPrice$  to get  maximum product price and as well as set default minimum price.
     * priceTo gets value from listSandbox.maxProductPrice$ and  convert string to number format
     * priceFrom gets value from listSandbox.maxProductPrice$ and  convert string to number format
     * **/
    this.subscriptions.push(
      this.listSandbox.maxProductPrice$.subscribe(maximumPrice => {
        if (maximumPrice && this.oneTimeAssignValue === 1) {
          const tempPriceTo = JSON.parse(maximumPrice);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('priceTo', tempPriceTo);
            this.priceTo = localStorage.getItem('priceTo');
          }
          const initialToPrice = '1';
          this.priceFrom = JSON.parse(initialToPrice);
          this.oneTimeAssignValue++;
        }
      })
    );
    // subscribe subject getting value from MenuComponent
    this.subscriptions.push(
      this.listSandbox.productFilterData.subscribe(productId => {
        if (productId) {
          this.brandId = '';
        }
      })
    );
  }

  // getCategory(id) {
  //   const params: any = {};
  //   params.categoryId = id;
  //   this.listSandbox.getCategory(params);
  // }
  // calls listSandbox getManufacturerList for getting brand list
  public getBrands() {
    const params: any = {};
    params.limit = '';
    params.offset = 0;
    params.keyword = '';
    this.listSandbox.getManufacturerList(params);
  }
  // calls listSandbox getCategoryList with default param values
  public getCategories() {
    const params: any = {};
    params.limit = '';
    params.offset = 0;
    params.keyword = '';
    params.sortOrder = '';
    this.listSandbox.getCategoryList(params);
  }
  // calls getProducts for filter
  public onChangeCategory(categoryId) {
    this.category = categoryId;
    this.getProducts();
  }
  /**
   *  selecting brand in the brand list.
   *  Then calls getProducts to refresh the product list,
   *  set ,get,remove local storage for brandId.
   *  remove brandSelectionKey local storage.
   *  **/
  public selectBrand(brandId) {
    if (brandId === +this.brandId) {
      this.brandId = '';
    } else {
      this.brandId = brandId;
    }
    this.getProducts();
  }

  /** calls getProducts event changed,
   * @param id from condition event **/
  changeCondition(event, id) {
    this.condition = id;
    this.getProducts();
  }

  /** set local storage value,
   *  after the price value changed based on the slider.
   *  @param event from priceFrom slider
   * **/
  priceFromValue(event) {
    this.priceFrom = event.value;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('fromPrice');
      localStorage.setItem('fromPrice', this.priceFrom);
      this.priceFrom = localStorage.getItem('fromPrice');
    }
  }

  /** set local storage value,
   *  after the price value changed based on the slider.
   *  @param event from priceTo slider
   * **/
  priceToValue(event) {
    this.priceTo = event.value;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('priceTo');
      const objStr = JSON.stringify(this.priceTo);
      localStorage.setItem('priceTo', this.priceTo);
      this.priceTo = localStorage.getItem('priceTo');
    }
  }

  /**calls getProducts for price filter
   * **/
  selectPrice() {
    this.getProducts();
  }

  /**
   * calls listSandbox getProductList.Then calls listSandbox getProductCount
   *And also emits the param to product list for correct pagination.
   * */
  getProducts() {
    const params: any = {};
    params.refresh = false;
    if (this.brandId === 'null' || this.brandId == null) {
      this.brandId = '';
      params.manufacturerId = this.brandId;
    } else {
      params.manufacturerId = this.brandId;
    }
    /**  during removing local storage it assigns null string
     * this condition will handle that.**/
    params.keyword = this.keyword;
    if (this.category === 'null' || this.category == null) {
      this.category = '';
      params.categoryId = this.category;
    } else {
      params.categoryId = this.category;
    }
    if (this.priceFrom === 'null' || this.priceFrom == null) {
      this.priceFrom = '';
      params.priceFrom = this.priceFrom;
    } else {
      params.priceFrom = this.priceFrom;
    }
    if (isPlatformBrowser(this.platformId)) {
      if (!localStorage.getItem('priceTo')) {
        this.priceTo = '';
        params.priceTo = this.priceTo;
      } else {
        params.priceTo = this.priceTo;
      }
    }
    params.condition = this.condition;
    this.progressEmit.emit(params);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
}
