import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';
import { environment } from '../../../../../../../../environments/environment';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { LanguagesSandbox } from '../../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { ProductLocalizationSandbox } from '../../../../../../../../core/admin/catalog/product-localization/product-loacalization.sandbox';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-localization-list',
  templateUrl: './product-localization-list.component.html',
  styleUrls: ['./product-localization-list.component.scss']
})
export class ProductLocalizationListComponent implements OnInit {

  @ViewChild('pagination') paginator: MatPaginator;
  public pageSize;
  public keyword = '';
  public offset: any = 0;
  public index: any = 0;
  public sku: any = '';
  private isCount: boolean;
  public popoverContent: any;
  public isActive: any = [];
  public buttoncheck = true;
  public imageUrl: string;
  public productUrl: string;
  public productListImage = {};
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];
  public previousSort = {};
  public selectedSortField = '';
  public currentPage = 1;
  public filterParams: any = {};
  private subscriptions: Array<Subscription> = [];
  public bulkFunction = false;
  public productList: any;
  public selectedAll = false;
  public productListArray: any;
  public filterData: any = [];
  public filterDataId = [];
  public productType: any = '';
  title = 'Products';
  languageList: any = [];
  edit: any;
  isTranslation: boolean = false;


  constructor(
    private router: Router,
    private toastr: ToastrService,
    public modalService: NgbModal,
    public configService: ConfigService,
    public route: ActivatedRoute,
    public titleService: Title,
    public languageSandbox: LanguagesSandbox,
    public productLocalizationSanbox: ProductLocalizationSandbox,
    private changeDetectRef: ChangeDetectorRef,
  ) {
    this.subscribeProduct();
  }

  /** initially calling RatingReviewSandbox
   * getProductlist with pagination data with pagination count
   * and assigning  configService url
   * */
  ngOnInit() {

    this.titleService.setTitle(this.title);
    this.getLanguageList();
    this.pageSize = sessionStorage.getItem('itemsPerPage')
      ? sessionStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.isCount = true;
    this.paginations();
    this.index = this.route.snapshot.queryParamMap.get('index');
    this.offset = this.route.snapshot.queryParamMap.get('offset');
    if (this.index !== 0) {
      this.pageChangeEvent();
    } else {
      this.getProductLocalization();
    }
    this.imageUrl = environment.imageUrl;
    this.productUrl = environment.storeUrl;
  }

  getLanguageList() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.keyword = this.keyword;
    params.status = '';
    this.languageSandbox.languageList(params);
    this.languageSandbox.languageList$.subscribe((val) => {
      this.languageList = val;
      this.changeDetectRef.detectChanges();
    });
  }
  getProductLocalization() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.keyword;
    params.sku = this.sku;

    this.filterParams.pageSize = this.pageSize || '';
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

    this.productLocalizationSanbox.getProductLocalization(params);

    this.subscribe();
  }

  subscribe() {

    this.subscriptions.push(this.productLocalizationSanbox.getProductLocalization$.subscribe((data: any) => {
      if (data) {
        this.productListArray = data;
        if (this.index !== 0) {
          this.index = +this.index - 1;
          this.router.navigate(
            [],
            {
              relativeTo: this.route,
              queryParams: this.filterParams,
              queryParamsHandling: 'merge', // remove to replace all query params by provided
            });
        }
      }
      data?.forEach((val) => {
        val.languageIDS = val.productTranslation.map(lang => lang.languageId);
      });
    }))
  }

  changeFilter(event) {
    this.buttoncheck = event.target.checked;
  }

  // receive param from filter component .And calls paginations event
  receiveProgress(event) {
    this.index = 0;
    this.keyword = event.keyword;
    this.offset = 0;
    this.productType = event.productType;
    if (this.keyword !== ''  || this.productType !== '') {
      // this.paginator.firstPage();
      this.getProductLocalization();
      this.paginations();
    }
  }

  // calls  getProductLocalizationCount with params
  paginations() {
    const params: any = {};
    params.count = 1;
    this.productLocalizationSanbox.getProductLocalizationCount(params);
    this.productLocalizationSanbox.getProductLocalizationCount$.subscribe(val => {
    })
  }

   /**
   * Handles form 'onPageChange' event. when page changes
   * @param event form event
   */

   onPageChange(event: any) {
    this.isCount = false;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.selectedAll = false;
    this.filterDataId = [];
    this.getProductLocalization();
    this.paginations();
  }

  pageChangeEvent() {
    this.isCount = false;
    this.pageSize = this.pageSize;
    this.index = this.index;
    this.offset = this.pageSize * this.index;
    this.filterDataId = [];
    this.selectedAll = false;
    this.getProductLocalization();
    this.paginations()
  }

   pageChange(event) {
    this.selectedSortField = '';
    window.scroll(0, 0);
    this.currentPage = event;
    this.offset = this.pageSize * (event - 1);
    this.getProductLocalization();
  }

  // Product List ImageLoader
  productListImageLoading(id) {
    this.productListImage[id] = true;
  }

  // filter product list event for multiple delete
  filterDataList() {
    this.filterData = this.productListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.productId);
  }

  subscribeProduct() {
    this.subscriptions.push(this.productLocalizationSanbox.getProductLocalization$.subscribe((data: any) => {
      this.productListArray = [];
      if (data && data.length > 0) {
        this.productListArray = data.map(list => {
          return { ...list, selected: false };
        });
      }
    }));

  }
//  edit product description for language 
  editProduct(data) {
    this.edit = data.productId;
    this.router.navigate(['/catalog/manage-products/localization/edit', data.productId], { queryParams: data });

  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}