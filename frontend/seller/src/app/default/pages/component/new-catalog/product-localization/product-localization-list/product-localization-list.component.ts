import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { ConfigService } from '../../../../../../../../src/app/core/services/config.service';
import { ProductLocalizationSandbox } from '../../../../../../../../src/app/core/catalog/product-localization/product-loacalization.sandbox';
import { environment } from '../../../../../../../../src/environments/environment';
import { CommonSandbox } from '../../../../../../../../src/app/core/common/common.sandbox';
import { contentTranslate, fields } from './product-localization.constant';
import { limitForFilterDisable } from '../../../../../../../../src/app/default/shared/common/config.constant';
import { imagesList } from '../../../../../../../../src/app/default/shared/components/alert-content/alert.content.constant';
import { configureAlertConfig } from '../../../../../../../../src/app/default/shared/components/alert-content/alert.content.constant';
import { itemsPerPage } from '../../../../../../../../src/app/default/shared/components/reusable-pagination/pagination.constant';
import { itemsPerPageList } from '../../../../../../../../src/app/default/shared/components/reusable-pagination/pagination.constant';


@Component({
  selector: 'app-product-localization-list',
  templateUrl: './product-localization-list.component.html',
  styleUrls: ['./product-localization-list.component.scss']
})
export class ProductLocalizationListComponent implements OnInit, OnDestroy {

  @ViewChild('dropdownContentDynamicColumn', { static: false }) dropdownContentDynamicColumn: ElementRef;
  @ViewChild("dropdownContent") dropdownContent!: NgbDropdown;
  @ViewChild("dropdownContentFilter", { static: false }) dropdownContentFilter!: ElementRef;

  public sku: any = '';
  public imageUrl: string;
  public productListImage = {};

  public filterParams: any = {};
  public selectedAll = false;
  public productListArray: any;
  public filterData: any = [];
  public filterDataId = [];
  title = 'Products Localization';
  languageList: any = [];
  edit: any;
  isTranslation: boolean = false;

  // Dynamic Tabel
  selectAll: boolean = false;

  // common
  _Object = Object;

  // filters dynamic columns
  filterColumns = JSON.parse(JSON.stringify(fields));
  backupColumns = JSON.parse(JSON.stringify(fields));

  // filter disable
  filterDisableLimit = limitForFilterDisable;
  totalCount = 0;

  // filter
  filtercontrolForm: any;
  filter: any = {};

  // Pagination
  currentPage = 1;
  limit: any = itemsPerPage;
  offset = 0;
  queryData: any = {};
  pagination: boolean = true;
  private isCount: boolean;
  count: any;


  // perpage
  perpage: any = itemsPerPageList;
  selectedpage: any = 10;
  perPageCount: boolean = false;

  public keyword = '';
  productName: any;
  alertConfig: any;
// Subscriptions
private subscriptions: Subscription = new Subscription();
private subscriptions1: Subscription = new Subscription();

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public modalService: NgbModal,
    public configService: ConfigService,
    public route: ActivatedRoute,
    public titleService: Title,
    public commonSandbox: CommonSandbox,
    public productLocalizationSanbox: ProductLocalizationSandbox,
    private changeDetectRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.getLanguageList();
    this.isCount = true;
    this.paginations();
    this.alertConfig = configureAlertConfig(contentTranslate.success, imagesList.success, '');
    this.offset = parseInt(this.route.snapshot.queryParamMap.get("offset")) || this.offset;
    this.limit = parseInt(this.route.snapshot.queryParamMap.get("limit")) || this.limit;
    this.currentPage = parseInt(this.route.snapshot.queryParamMap.get("currentPage")) || this.currentPage;
    this.selectedpage = 10;
    this.keyword = this.route.snapshot.queryParamMap.get("keyword") || "";
    if (!['', null, undefined].includes(this.keyword)) {
      this.filter.keyword = this.keyword;
    }

    const value = "pageInital";
    localStorage.setItem("pagination", value);
    if (this.currentPage !== 0) {
      this.pageChangeEvent();
    } else {
      this.productLocalizationList();
    }
    this.imageUrl = environment.imageUrl;
  }

  getLanguageList() {
    const params = {
      limit: 0,
      offset: 0,
      keyword: '',
      count: 0
    }
    this.commonSandbox.languageList1(params);
    this.subscriptions.add(this.commonSandbox.languageList1$.subscribe(val => {
      if (val) {
        this.languageList = val;
      }
    }));
  }

  productLocalizationList(): void {
    this.offset = (this.currentPage - 1) * this.limit;

    const params: any = {};
    params.offset = this.offset;
    params.limit = this.limit;
    params.keyword = this.keyword;
    params.productName = this.productName || '';
    params.sku = this.sku;
    this.filterParams.limit = this.limit || '';
    this.filterParams.keyword = this.keyword || '';
    this.filterParams.sku = this.sku || '';
    this.filterParams.limit = this.limit || '10';
    this.filterParams.offset = this.offset || 0;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.filterParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
    this.productLocalizationSanbox.getProductLocalization(params);
    this.subscribe();
  }

  subscribe() {
    this.subscriptions.add(this.productLocalizationSanbox.getProductLocalization$.subscribe((data: any) => {
      if (data) {
        this.productListArray = data;
        this.productListArray.forEach(element => {
          element.truncatedText = element.name?.length > 100 ? element.name.slice(0, 100) : element.name;
        })
        this.filterParams.limit = this.limit || '';
        this.filterParams.keyword = this.keyword || '';
        this.filterParams.sku = this.sku || '';
        this.filterParams.offset = this.offset || 0;
        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParams: this.filterParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
          });
      }
      data?.forEach((val) => {
        val.languageIDS = val.productTranslation.map(lang => lang.languageId);
      });
    }))
  }

  // calls getProductLocalizationCount with params
  paginations(): void {
    const params: any = {};
    params.count = 1;
    params.sku = this.sku;
    params.productName = this.productName || '';
    params.keyword = this.keyword;

    this.productLocalizationSanbox.getProductLocalizationCount(params);
   this.subscriptions1.add(this.productLocalizationSanbox.getProductLocalizationCount$.subscribe((val) => {
      this.count = val;
    }));
  }

  // filters dynamic column
  save(): void {
    this.backupColumns = JSON.parse(JSON.stringify(this.filterColumns));
    this.dropDownClose('dropdownContentDynamicColumn');
  }

  open(): void {
    this.filterColumns = JSON.parse(JSON.stringify(this.backupColumns));
    this.calculateCount();
  }

  // filter disable
  calculateCount(): void {
    this.totalCount = Object.values(this.filterColumns).filter((val) => val).length;
  }

  GetPageLimit() {
    this.perPageCount = true;
    this.limit = this.selectedpage.name;
    this.limit = this.selectedpage.name;
    this.offset = 0;
    this.currentPage = 1;
    this.productLocalizationList();
  }

  /**
  * Handles form 'onPageChange' event. when page changes
  * @param event form event
  */

  //page change event pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.productLocalizationList();
  }

  pageChangeEvent(): void {
    this.isCount = false;
    this.limit = this.limit;
    this.currentPage = this.currentPage;
    this.offset = this.limit * this.currentPage;
    this.filterDataId = [];
    this.selectedAll = false;
    this.productLocalizationList();
    this.paginations()
  }

  pageChange(event): void {
    window.scroll(0, 0);
    this.currentPage = event;
    this.offset = this.limit * (event - 1);
    this.productLocalizationList();
  }

  // Search
  searchList(event: any): void {
    this.filter.keyword = event
    this.filterParams.keyword = event;
    if (this.keyword) {
      this.filterParams.limit = this.limit;
      this.filterParams.offset = 0;
      this.filterParams.currentPage = 1;
      this.currentPage = 1;
      this.productLocalizationList();
      this.paginations();
    } else if (!this.keyword) {
      const offset = parseInt(this.route.snapshot.queryParamMap.get('offset'));
      this.currentPage = parseInt(this.route.snapshot.queryParamMap.get('currentPage'));
      this.productLocalizationList();
      this.paginations();
    }
    this.limit = this.route.snapshot.queryParamMap.get('limit');
    this.dropDownClose('dropdownContent');
  }

  keywordchange(event): void {
    this.filter.keyword = event;
  }

  // receive param from filter component .And calls paginations event
  receiveProgress(event) {
    this.offset = 0;
    this.currentPage = 1;
    this.selectAll = true;
    this.productName = event.keyword;
    this.sku = event.sku;

    if (this.sku !== '' || this.productName !== '') {
      if (this.productName) {
        this.filter['Product Name'] = this.productName;
      }
      if (this.sku) {
        this.filter['SKU'] = this.sku;
      }
      this.productLocalizationList();
      this.paginations();
    }
    this.dropdownContentFilter?.nativeElement?.classList.remove("show");

    this.dropDownClose('myDropdown');
    this.dropDownClose('dropdownContent');
  }

  filterForm(form) {
    this.filtercontrolForm = form;
  }

  formchange(formchange): void {
    this.filtercontrolForm = formchange;
  }

  //All clear filter
  allClearFilter() {
    this.keyword = '';
    this.productName = '';
    this.sku = '';
    this.filter = {};
    this.offset = 0;
    this.currentPage = 1;
    this.productLocalizationList();
    this.paginations();
  }

  removefilter(key): void {
    delete this.filter[key];
    if (key == 'keyword') {
      this.keyword = '';
    }
    if (key == 'Product Name') {
      this.productName = '';
      this.filtercontrolForm.controls['keyword']?.setValue('');
    }
    if (key == 'SKU') {
      this.productName = '';
      this.filtercontrolForm.controls['sku']?.setValue('');
    }
    this.selectAll = !this.isObjectEmpty(this.filter);
    this.productLocalizationList();
    this.paginations();
    this.dropDownClose('myDropdown');
  }

  isObjectEmpty(obj): any {
    return Object?.keys(obj).length === 0;
  }

  // filter product list event for multiple delete
  filterDataList(): void {
    this.filterData = this.productListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.productId);
  }

  // edit product description for language 
  editProduct(data): void {
    const paramsValue: any = {};
    paramsValue.limit = this.limit;
    paramsValue.offset = this.offset;
    paramsValue.currentPage = this.currentPage;
    paramsValue.productId = data.productId;
    this.router.navigate(['/new-catalog/product-localizaton/edit', data.productId], { queryParams: paramsValue });
  }

  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.subscriptions1.unsubscribe();
  }
}