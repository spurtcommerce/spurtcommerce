// Angular imports
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DecimalPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
// Third Party imports
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
// Sandbox
import { ProductSandbox } from '../../../../../../core/product/product.sandbox';
// Constants
import { contentTranslate, objForm, removeEmptyKeys } from './inventory-list.constant';
import { getFormControlsFieldsObj, getTypes } from '../../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';
import { itemsPerPage, itemsPerPageList } from '../../../../../../../../src/app/default/shared/components/reusable-pagination/pagination.constant';

// Environment
import { environment } from '../../../../../../../../src/environments/environment';
import { configureAlertConfig, imagesList } from '../../../../../../../../src/app/default/shared/components/alert-content/alert.content.constant';
@Component({

  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  providers: [DecimalPipe],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0'
      })),
      state('final', style({
        overflow: 'hidden',
        opacity: '1'
      })),
      transition('initial=>final', animate('750ms')),
      transition('final=>initial', animate('750ms'))
    ]),
  ]
})
export class InventoryListComponent implements OnInit {

  @ViewChild('dropdownContent', { static: false }) dropdownContent!: ElementRef;
  @ViewChild("dropdownContentFilter", { static: false }) dropdownContentFilter!: ElementRef;

  //error status
  ErrorStatus: boolean = false;

  // Pagination
  currentPage: any = 1;
  limit: any = itemsPerPage;
  offset: any = 0;
  pageSizeList = itemsPerPageList;
  queryData: any = {};
  pagination: boolean = true;
  keyword: any = '';
  pageSize: any = 10;
  index: number = 1;
  // List
  sku: any;
  stockStatus: any = [];
  name: any;
  list: any[];
  hasStock: any
  imageUrl: any;
  isCollapsed = false;
  buttonActive = true;
  // service
  title: string = 'Stock Update';

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  // Alerts
  alertConfig = {};

  // Reusable form 
  formObjFormGroup: any;
  dynamicObjControls: any = {};
  backupFormValue = {};
  formValueExists = false;
  filterForm: UntypedFormGroup;

  // filters dynamic columns
  filter: any = {};

  initalLoading: boolean = false;
  backOrderQty: Number = 0;
  backOrderCheck: boolean = false
  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  // Arrow functions
  trackByIndex = (index: number): number => index;

  constructor(public Sandbox: ProductSandbox, public router: Router, public route: ActivatedRoute,
    public formBuilder: UntypedFormBuilder,
    public toastr: ToastrService,
    public translate: TranslateService,
    public titleService: Title,
    private ref: ChangeDetectorRef) {
    this.initFilterForm();
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    // Form
    this.buildForm();

    this.imageUrl = environment.imageUrl;
    // Query param route value
    this.routeSubscribe();
  }

  // Intialize form
  initFilterForm(): void {
    this.filterForm = this.formBuilder.group({
      SKU: ['', Validators.required],
      ProductName: ['', Validators.required],
    });
  }


  // Query param value and pagination
  private getQueryParam(): any {
    const params = {
      limit: this.limit,
      offset: this.offset,
      currentPage: this.currentPage,
      keyword: this.backupFormValue['Search'] ?? '',
      sku: this.backupFormValue['SKU'] ?? '',
      productName: this.backupFormValue['Product Name'] ? this.backupFormValue['Product Name'] : '',
    };
    return params;
  }

  // Query param route value subscribe
  private routeSubscribe(): void {
    let paramsValue: any = {};
    this.subscriptions.add(this.route.queryParams.subscribe(params => {
      paramsValue = params;
      this.limit = paramsValue.limit ? Number(paramsValue.limit) : this.limit;
      this.offset = paramsValue.offset ? Number(paramsValue.offset) : 0;
      this.currentPage = paramsValue.currentPage ? Number(paramsValue.currentPage) : 1;
      this.formObjFormGroup.patchValue({
        'SKU': paramsValue.sku ?? "",
        'Product Name': paramsValue.productName ?? "",
        'Search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.inventoryProductList(this.pageSize, this.offset);
    this.inventoryProductListCount();
  }
  // value update in queryparams and pagination//
  private updateQueryParam(): void {
    this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
  }

  // Page change event pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.offset = (this.currentPage - 1) * this.limit;
    this.inventoryProductList(this.limit, this.offset);
  }

  // Per page change drop down
  pageSizeChange(e): void {
    this.onPageChange({ limit: e.id, offset: 0 });
  }
  // Filter open
  open(): void {
    this.formObjFormGroup.patchValue(this.backupFormValue);
  }

  /*Reset filters*/
  filterReset(type: string): void {
    if (type == 'clearAll') {
      this.formObjFormGroup.reset()
    } else {
      this.formObjFormGroup.patchValue({
        'SKU': '',
        'Product Name': '',
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  /*Remove filter*/
  removeFilter(remove): void {
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }

  // Filters
  applyFilter(): void {
    this.filterValueUpdate();
    this.resetAll();
  }

  enableBackQty(item, data) {
    if (item.enableBackOrders == 0) {
      item.backOrderStockLimit = 0;
    }
    this.backOrderQty = data;
    this.ref.detectChanges();
  }

  enablebackOrderCheck(data) {
    if (data > 0) {
      this.backOrderCheck = false
    }
  }

  // Update List
  updateStock(list): void {
    this.backOrderCheck = false
    const params: any = {};
    params.productId = list.productId;
    if (this.stockStatus[list.productId] === 0 || this.stockStatus[list.productId] === false) {
      params.hasStock = 0;
    }
    if (this.stockStatus[list.productId] === 1 || this.stockStatus[list.productId] === true) {
      params.hasStock = 1;
    }
    if (list.skuValue.length > 0) {
      const array = [];
      if (list.skuValue[0].enableBackOrders == 1 && ['', null, undefined, 0].includes(list.skuValue[0].backOrderStockLimit)) {
        this.backOrderCheck = true
        return
      }

      list.skuValue.forEach(data => {


        if (data.minQuantityAllowedCart > data.maxQuantityAllowedCart) {
          this.ErrorStatus = true
        }

        const object: any = {};
        object.skuId = data.id;
        object.outOfStockThreshold = data.outOfStockThreshold;
        object.notifyMinQuantity = data.notifyMinQuantity;
        object.minQuantityAllowedCart = data.minQuantityAllowedCart;
        object.maxQuantityAllowedCart = data.maxQuantityAllowedCart;
        object.enableBackOrders = data.enableBackOrders;
        object.backOrderStockLimit = data.backOrderStockLimit.toString();
        array.push(object);
      });

      params.productStock = array;
    }

    if (this.ErrorStatus == false) {
      this.Sandbox.updateStock(params);
      this.subscriptions.add(this.Sandbox.InventoryProductListLoaded$.subscribe(data => {
        if (data === true) {
          this.inventoryProductList(this.pageSize, this.offset);
        }
      }));
    }

  }
  // change Manage Stock
  changeManageStock(list, event): void {
    if (event.target.checked) {
      if (list.skuValue.length > 0) {
        list.skuValue = list.skuValue.map(data => {
          return {
            ...data,
            outOfStockThreshold: data.outOfStockThreshold ? data.outOfStockThreshold : '',
            notifyMinQuantity: data.notifyMinQuantity ? data.notifyMinQuantity : '',
            minQuantityAllowedCart: data.minQuantityAllowedCart ? data.minQuantityAllowedCart : 1,
            maxQuantityAllowedCart: data.maxQuantityAllowedCart ? data.maxQuantityAllowedCart : 5,
            enableBackOrders: data.enableBackOrders ? data.enableBackOrders : 0,
            backOrderStockLimit: data.backOrderStockLimit ? data.backOrderStockLimit : 0
          };
        });
      }
    }
    this.hasStock = event.target.checked == true ? 1 : 0
    this.updateStock(list)
  }

  //Object Keys
  objectKeys(obj: any) {
    return Object.keys(obj);
  }


  changeAllowmin(item) {
    this.ErrorStatus = false;

  }

  changeAllowmax(item) {
    this.ErrorStatus = false;

  }


  // Intialize form
  private buildForm(): void {
    const formObjModel = objForm;
    const formGroupField = getFormControlsFieldsObj(formObjModel);
    this.formObjFormGroup = this.formBuilder.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.filterValueUpdate();
  }

  // Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(this.backupFormValue).some((val: any) => !this.empty.includes(val));
  }

  // Reset All
  private resetAll(): void {
    this.inventoryProductList(this.pageSize, this.offset);
    this.inventoryProductListCount();
    this.dropDownClose('dropdownContentFilter');
    this.dropDownClose('dropdownContent');
  }

  // Get list
  private inventoryProductList(limit: number, offset: number): void {
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 0;
    if (!['', null, undefined].includes(this.hasStock)) {
      params.hasStock = this.hasStock
    }
    this.queryData.offset = this.offset || 0;
    this.subscriptions.add(this.Sandbox.InventoryProductList$.subscribe(data => {
      this.list = data
    }));
    this.updateQueryParam();
    this.Sandbox.InventoryProductList(params);
    this.subscriptions.add(this.Sandbox.InventoryProductList$.subscribe(data => {
      if (data && data.length > 0) {
        data.forEach(element => {
          element.truncatedText = element.name?.length > 100 ? element.name.slice(0, 100) : element.name;

        })
        this.initalLoading = false;
        data.forEach(list => {
          this.stockStatus[list.productId] = list.hasStock;
        });
      } else {
        this.initalLoading = true;
      }
    }));
    this.subscriptions.add(this.Sandbox.inventoryProductListCount$.subscribe(data => {
    }));
    this.alertConfig = configureAlertConfig(contentTranslate.success, imagesList.success, '');
  }

  // Count List
  private inventoryProductListCount(): void {
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    this.Sandbox.inventoryProductListCount(params);
  }

  // Drop down close
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }

  // Date Change
  onDataChange(val) {
    if (Number(val.enableBackOrders) === 1) {
      val.enableBackOrders = '1';
    } else {
      val.enableBackOrders = '0';
    }
    return true;
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}