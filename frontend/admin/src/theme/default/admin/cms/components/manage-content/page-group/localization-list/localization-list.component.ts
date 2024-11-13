// Angular
import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, Output, EventEmitter, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

// third Party
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Sandbox and Service
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';
import { LanguagesSandbox } from '../../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { PageGroupSandbox } from '../../../../../../../../core/admin/cms/page-group/page-group.sandbox';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-localization-list',
  templateUrl: './localization-list.component.html',
  styleUrls: ['./localization-list.component.scss']
})
export class PageGroupLocalizationListComponent implements OnInit, OnDestroy {
  @ViewChild("myDropdown") myDropdown!: NgbDropdown;
  @ViewChild('myInput') myInput: ElementRef;
  @Output() FormEmit = new EventEmitter<any>();
  @ViewChild('pagination') paginator: MatPaginator;
  public pageSize;
  public keyword = '';
  public offset: any = 0;
  public index: any = 0;
  public status: any = '';
  private isCount: boolean;
  public selectedSortField = '';
  public currentPage = 1;
  public filterParams: any = {};
  private subscriptions: Array<Subscription> = [];
  public pageGroupListArray: any;
  public filterData: any = [];
  public filterDataId = [];
  title = 'Page Group';
  filterSearch: any = {};
  public queryData: any = {};
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
    public sandbox: PageGroupSandbox,
    private changeDetectRef: ChangeDetectorRef
  ) {
    this.subscribePageGroup();
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
      this.pageGroupLocalizationList();
    }
  }

  // Language List
  getLanguageList() {
    const params: any = {};
    params.limit = this.pageSize ?? 10;
    params.offset = this.offset;
    params.keyword = this.keyword;
    params.status = ''
    this.languageSandbox.languageList(params);
    this.languageSandbox.languageList$.subscribe((val) => {
      this.languageList = val;
      this.changeDetectRef?.detectChanges();
    });
  }

  // Page Group List
  pageGroupLocalizationList() {
    this.offset = (this.currentPage - 1) * this.pageSize;
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
    this.sandbox.pageGroupLocalizationList(params);
    this.subscribe();
  }



  subscribe() {
    this.subscriptions.push(this.sandbox.pageGroupLocalizationList$.subscribe((data: any) => {
      if (data) {
        this.pageGroupListArray = data;
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
        val.languageIDS = val.pageGroupTranslation?.map(lang => lang.languageId);
      });
    }))
  }

  focusInput() {
    this.myInput.nativeElement.focus();
  }

  // pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.pageSize = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.pageGroupLocalizationList();
  }

  searchList(): void {
    if (this.keyword) {
      this.queryData.keyword = this.keyword;
      this.queryData.pageSize = this.pageSize;
      this.queryData.offset = 0;
      this.queryData.index = 1;
      this.index = 1;
      this.filterSearch.keyword = this.keyword;
      this.pageGroupLocalizationList();
      this.paginations();
    } else {
      this.offset = this.route.snapshot.queryParamMap.get("offset") || 0;
      this.index = this.route.snapshot.queryParamMap.get("index");
      this.pageGroupLocalizationList();
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
    this.pageGroupLocalizationList();
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
      this.pageGroupLocalizationList();
      this.paginations();
    }
  }

  // calls  paginations with params
  paginations() {
    const params: any = {};
    params.count = 1;
    params.keyword = this.keyword;
    this.sandbox.pageGroupLocalizationCount(params);
    this.sandbox.pageGroupLocalizationCount$.subscribe(val => {
    })
  }

  pageChangeEvent() {
    this.isCount = false;
    this.pageSize = this.pageSize;
    this.index = this.index;
    this.offset = this.pageSize * this.index;
    this.filterDataId = [];
    this.pageGroupLocalizationList();
    this.paginations()
  }

  pageChange(event) {
    this.selectedSortField = '';
    window.scroll(0, 0);
    this.currentPage = event;
    this.offset = this.pageSize * (event - 1);
    this.pageGroupLocalizationList();
  }

  pageLength() {
    this.pageGroupLocalizationList();
  }


  // Page Group List  Subscribe
  subscribePageGroup() {
    this.subscriptions.push(this.sandbox.pageGroupLocalizationList$.subscribe((data: any) => {
      if (data && data.length > 0) {
        this.pageGroupListArray = data.map(list => {
          return { ...list, selected: false };
        });
      }
    }));
  }

  //  edit for localization 
  editPageGroup(data) {
    this.router.navigate(['/cms/manage-content/page-group/edit-localization', data.groupId], { queryParams: data });
  }

  // Back To List
  back() {
    this.router.navigate(['/cms/manage-content/page-group/list']);
  }

  // Destroy
  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
