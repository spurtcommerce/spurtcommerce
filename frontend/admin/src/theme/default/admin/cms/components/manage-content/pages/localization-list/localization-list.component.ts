// Angular
import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, ElementRef, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

// third party
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Service and Sandbox
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';
import { LanguagesSandbox } from '../../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { PagesSandbox } from '../../../../../../../../core/admin/cms/pages/pages.sandbox';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-localization-list',
  templateUrl: './localization-list.component.html',
  styleUrls: ['./localization-list.component.scss']
})
export class PagesLocalizationListComponent implements OnInit, OnDestroy {
  @ViewChild("myDropdown") myDropdown!: NgbDropdown;
  @ViewChild('myInput') myInput: ElementRef;
  @Output() FormEmit = new EventEmitter<any>();
  @ViewChild('pagination') paginator: MatPaginator;


  public pageSize;
  filterSearch: any = {};
  public limit = 10;
  public queryData: any = {};
  public keyword = '';
  public offset: any = 0;
  public index: any = 0;
  public status: any = '';
  private isCount: boolean;
  public selectedSortField = '';
  public currentPage = 1;
  public filterParams: any = {};
  private subscriptions: Array<Subscription> = [];
  public pageListArray: any;
  public filterData: any = [];
  public filterDataId = [];
  title = 'Page';
  languageList: any = [];
  isTranslation: boolean = false;


  constructor(
    private router: Router,
    private toastr: ToastrService,
    public modalService: NgbModal,
    public configService: ConfigService,
    public route: ActivatedRoute,
    public titleService: Title,
    public languageSandbox: LanguagesSandbox,
    public sandbox: PagesSandbox,
    private changeDetectRef: ChangeDetectorRef,
  ) {
    this.subscribePage();
  }

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
      this.pageLocalizationList();
    }
  }

  // Language List
  getLanguageList() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = this.keyword;
    params.status = ''
    this.languageSandbox.languageList(params);
    this.languageSandbox.languageList$.subscribe((val) => {
      this.languageList = val;
      this.changeDetectRef.detectChanges();
    });
  }

  // Page List
  pageLocalizationList() {
    this.offset = (this.currentPage - 1) * this.limit;
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.keyword;

    this.filterParams.pageSize = this.pageSize || '';
    this.filterParams.keyword = this.keyword || '';
    this.filterParams.offset = this.offset || 0;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.filterParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

    this.sandbox.pageLocalizationList(params);
    this.subscribe();
  }

  // Page List Subscribe
  subscribe() {
    this.subscriptions.push(this.sandbox.pageLocalizationList$.subscribe((data: any) => {
      if (data) {
        this.pageListArray = data;
        if (this.index !== 0) {
          this.index = +this.index - 1;
          this.router.navigate(
            [],
            {
              relativeTo: this.route,
              queryParams: this.filterParams,
              queryParamsHandling: 'merge',
            });
        }
      }
      data?.forEach((val) => {
        val.languageIDS = val.pageTranslation?.map(lang => lang.languageId);
      });
    }))
  }

  focusInput() {
    this.myInput.nativeElement.focus();
  }

  // Pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.pageLocalizationList();
  }

  searchList(): void {
    if (this.keyword) {
      this.queryData.keyword = this.keyword;
      this.queryData.pageSize = this.pageSize;
      this.queryData.offset = 0;
      this.queryData.index = 1;
      this.index = 1;
      this.filterSearch.keyword = this.keyword;
      this.pageLocalizationList();
      this.paginations();
    } else {
      this.offset = this.route.snapshot.queryParamMap.get("offset") || 0;
      this.index = this.route.snapshot.queryParamMap.get("index");
      this.pageLocalizationList();
      this.paginations();
    }
  }

  getStatusDisplay(key: string, value: any): string {
    if (key == 'Status') {
      return value == 1 ? 'Active' : 'Inactive';
    }
    return value;
  }

  // Remove Filter
  removeFilter(removeFilter): void {
    this.filterSearch[removeFilter.key] = '';
    this[removeFilter.key] = '';
    this.offset = 0;
    this.pageLocalizationList();
    this.paginations();
  }

  keywordchange(event) {
    this.filterSearch.keyword = event
  }


  // receive param from filter component .And calls paginations event
  receiveProgress(event) {
    this.index = 0;
    this.keyword = event.keyword;
    this.offset = 0;

    if (this.keyword !== '') {
      this.pageLocalizationList();
      this.paginations();
    }
  }

  // calls  paginations with params
  paginations() {
    const params: any = {};
    params.count = 1;
    params.keyword = this.keyword;
    this.sandbox.pageLocalizationCount(params);
    this.sandbox.pageLocalizationCount$.subscribe(val => {
    })
  }

  /**
  * Handles form 'onPageChange' event. when page changes
  * @param event form event
  */


  pageChangeEvent() {
    this.isCount = false;
    this.pageSize = this.pageSize;
    this.index = this.index;
    this.offset = this.pageSize * this.index;
    this.filterDataId = [];
    this.pageLocalizationList();
    this.paginations()
  }

  pageChange(event) {
    this.selectedSortField = '';
    window.scroll(0, 0);
    this.currentPage = event;
    this.offset = this.pageSize * (event - 1);
    this.pageLocalizationList();
  }

  pageLength() {
    this.pageLocalizationList();
  }

  subscribePage() {
    this.subscriptions.push(this.sandbox.pageLocalizationList$.subscribe((data: any) => {
      if (data && data.length > 0) {
        this.pageListArray = data.map(list => {
          return { ...list, selected: false };
        });
      }
    }));
  }

  //  edit for localization 
  editPage(data) {
    this.router.navigate(['/cms/manage-content/pages/edit-localization', data.pageId], { queryParams: data });
  }

  // Back To List
  back() {
    this.router.navigate(['/cms/manage-content/pages/list']);
  }

  // Destroy
  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
