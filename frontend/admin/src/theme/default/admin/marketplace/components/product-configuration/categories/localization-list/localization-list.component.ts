// Angular
import { Component, OnInit, ViewChild,ChangeDetectorRef, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

// third party
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// environment
import { environment } from '../../../../../../../../environments/environment';

// sandbox and service
import { CategoriesSandbox } from '../../../../../../../../core/admin/catalog/category/categories.sandbox';
import { LanguagesSandbox } from '../../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';

@Component({
  selector: 'app-localization-list',
  templateUrl: './localization-list.component.html',
  styleUrls: ['./localization-list.component.scss']
})
export class CategoryLocalizationListComponent implements OnInit {
  @ViewChild('myInput') myInput: ElementRef;

  public pageSize;
  public keyword = '';
  public offset: any = 0;
  public index: any = 0;
  public sku: any = '';
  public status: any = '';
  filterSearch: any = {};
  private isCount: boolean;
  public imageUrl: string;
  public currentPage = 1;
  public filterParams: any = {};
  private subscriptions: Array<Subscription> = [];
  public bulkFunction = false;
  public categoryList: any;
  public selectedAll = false;
  public categoryListArray: any;
  public filterData: any = [];
  public filterDataId = [];
  title = 'Categories Localization';
  languageList: any = [];
  edit: any;
  isTranslation: boolean = false;
  listCount: any;
  public queryData: any = {};
  limit: number = 10;


  constructor(
    private router: Router,
    private toastr: ToastrService,
    public modalService: NgbModal,
    public configService: ConfigService,
    public route: ActivatedRoute,
    public titleService: Title,
    public languageSandbox: LanguagesSandbox,
    public categorySandbox: CategoriesSandbox,
    private changeDetectRef: ChangeDetectorRef,
  ) {
    this.subscribecategory();
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.getLanguageList();
    this.pageSize = sessionStorage.getItem('itemsPerPage')
      ? sessionStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.isCount = true;
    this.getCategoryLocalizationCount();
    this.index = this.route.snapshot.queryParamMap.get('index');
    this.offset = this.route.snapshot.queryParamMap.get('offset');
    if (this.index !== 0) {
      this.pageChangeEvent();
    } else {
      this.getcategoryLocalization();
    }
    this.imageUrl = environment.imageUrl;
  }

  // Language List
  getLanguageList() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = this.keyword;
    params.status = '';
    this.languageSandbox.languageList(params);
    this.languageSandbox.languageList$.subscribe((val) => {
      this.languageList = val;
      this.changeDetectRef.detectChanges();
    });
  }


  // Remove Filter
  removeFilter(removeFilter): void {
    this.filterSearch[removeFilter.key] = '';
    this[removeFilter.key] = '';
    this.offset = 0;
    this.getcategoryLocalization();
    this.getCategoryLocalizationCount();
    this.keyword = '';
    this.offset = 0;
    this.getcategoryLocalization();
    this.getCategoryLocalizationCount();
  }

  keywordchange(event) {
    this.filterSearch.keyword = event
  }

  focusInput() {
    this.myInput.nativeElement.focus();
  }

  getStatusDisplay(key: string, value: any): string {
    if (key == 'Status') {
      return value == 1 ? 'Active' : 'In-Active';
    }
    return value;
  }

  searchList(): void {
    if (this.keyword) {
      this.queryData.keyword = this.keyword ?? '';
      this.queryData.pageSize = this.pageSize;
      this.queryData.offset = 0;
      this.queryData.index = 1;
      this.index = 1;

      this.filterSearch.keyword = this.keyword;

      this.getcategoryLocalization();
      this.getCategoryLocalizationCount();
    } else {
      this.offset = this.route.snapshot.queryParamMap.get("offset") || 0;
      this.index = this.route.snapshot.queryParamMap.get("index");
      this.getcategoryLocalization();
      this.getcategoryLocalization();
    }
  }

  // Category Localization List
  getcategoryLocalization() {
    this.offset = (this.currentPage - 1) * this.limit;
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.keyword;
    params.sku = this.sku;

    this.filterParams.pageSize = this.pageSize || '';
    this.filterParams.keyword = this.keyword || '';
    this.filterParams.sku = this.sku || '';
    this.filterParams.offset = this.offset || 0;
    this.filterParams.status = this.status || '';
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.filterParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

    this.categorySandbox.getCategoryTranslation(params);

    this.subscribe();
  }

  // Category Localization List Subscribe
  subscribe() {
    this.subscriptions.push(this.categorySandbox.getCategoryTranslationList$.subscribe((data: any) => {
      if (data) {
        this.categoryListArray = data;
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
        data?.forEach((val) => {
          val.languageIDS = val.categoryTranslation.map(lang => lang.languageId);
        });
      }

    }))
  }


   // Category Localization List Count
  getCategoryLocalizationCount() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = 0;
    params.keyword = this.keyword;
    params.sku = this.sku;
    params.count = 1;
    this.categorySandbox.getCategoryTranslationCount(params);
    this.categorySandbox.getCategoryTranslationCount$.subscribe(val => {
      this.listCount = val
      this.changeDetectRef.detectChanges();
    })

  }

  /**
  * Handles form 'onPageChange' event. when page changes
  * @param event form event
  */

  // Pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.getcategoryLocalization();
  }


  pageChangeEvent() {
    this.isCount = false;
    this.pageSize = this.pageSize;
    this.index = this.index;
    this.offset = this.pageSize * this.index;
    this.filterDataId = [];
    this.selectedAll = false;
    this.getcategoryLocalization();
    this.getCategoryLocalizationCount()
  }

  // filter category list event for multiple delete
  filterDataList() {
    this.filterData = this.categoryListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.categoryId);
  }

  subscribecategory() {
    this.subscriptions.push(this.categorySandbox.getCategoryTranslationList$.subscribe((data: any) => {
      this.categoryListArray = [];
      if (data && data.length > 0) {
        this.categoryListArray = data.map(list => {
          return { ...list, selected: false };
        });
      }
    }));

  }

  // Edit Page
  editCategory(data) {
    this.edit = data.categoryId;
    this.router.navigate(['/vendors/product-config/categories/editLocalization', this.edit], { queryParams: data });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
