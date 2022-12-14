/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
// Store Module
import { BannerService } from '../../../../../../../core/admin/cms/banners/banner.service';
import { BannerSandbox } from '../../../../../../../core/admin/cms/banners/banner.sandbox';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subscription } from 'rxjs';
import { DeleteConfirmationDialogComponent } from '../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-spurt-cms-banner-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #009efb;
        color: white;
      }

      .dark-modal .close {
        color: white;
      }

      .light-blue-backdrop {
        background-color: #5cb3fd;
      }

      .image-manager .modal-dialog {
        max-width: 70%;
      }
    `
  ]
})
export class BannerListComponent implements OnInit, OnDestroy {

  //  variables
  public closeResult: string;
  public page: any;
  public pageSize = '10';
  private keyword: any = '';
  private offset: any;
  private currentPage: number;
  public index: any;
  public popoverContent: string;
  public pagenationCount: boolean;
  public imageUrl: string;
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];
  public bannerListImage = {};
  public isChecked: any = [];
  public sampleArray: any = [];
  public productList: any;
  // bulk delete or bulk export variables
  public bulkFunction = false;
  public selectedAll = false;
  public bannerListArray: any;
  public filterData: any = [];
  public filterDataId = [];
  private subscriptions: Array<Subscription> = [];
  public queryData: any = {};

  constructor(
    public sandbox: BannerSandbox,
    private service: BannerService,
    private toastr: ToastrManager,
    private router: Router,
    private configService: ConfigService,
    public modalService: NgbModal,
    public route: ActivatedRoute
  ) {
    this.subscribeBanner();
  }


  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage')
      ? sessionStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.imageUrl = this.configService.getImageUrl();
    this.pagenationCount = true;
    this.regSubscriptionEvents();
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.index = this.route.snapshot.queryParamMap.get('index');
    this.bannerList(this.offset, this.keyword);
  }



  addBanner() {
    this.service.setBannerListData('');
    this.router.navigate(['/cms/banners/add'], { queryParams: this.queryData });
  }

  /**
   * Handles form 'submit' event. Calls sandbox getBannerList . function if form is valid.
   *
   * @param event form event
   * @param form entire form value
   */

  bannerList(offset: number = 0, keyword) {
    const params: any = {};
    params.offset = offset;
    params.limit = this.pageSize;
    params.keyword = this.keyword;
    this.sandbox.getBannerList(params);
    if (this.pagenationCount) {
      params.count = 'true';
      this.sandbox.getBannerPagination(params);
    }
    this.bannerListCount(0, keyword);
    this.queryData.offset = offset || 0;
    this.queryData.index = this.index || 0;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  bannerListCount(offset: number = 0, keyword) {
    const params: any = {};
    params.offset = offset;
    params.limit = this.pageSize;
    params.keyword = this.keyword;
    params.count = 1;
    this.sandbox.getBannerListCount(params);
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    const offset = event.pageSize * event.pageIndex;
    this.bannerList(offset, this.pageSize);
  }

  editBanner(bannerData) {
    this.router.navigate(['/cms/banners/edit', bannerData.bannerId], { queryParams: this.queryData });
  }


  deleteBanner(bannerId) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.sandbox.deletebanner({ bannerId: bannerId });
      }
    });
  }

  regSubscriptionEvents() {
    this.subscriptions.push(this.sandbox.getdeletebanner$.subscribe(_delete => {
      if (_delete && _delete.status && _delete.status === 1) {
        this.bannerList(this.offset, this.keyword);
        this.bannerListCount(this.offset, this.keyword);
      }
    }));
  }

  bulkDelete() {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.unCheckData = [];
        const param: any = {};
        param.bannerId = this.filterDataId;
        this.sandbox.bulkDelete(param);
        this.subscriptions.push(this.sandbox.getdeletebanner$.subscribe(_delete => {
          if (_delete) {
            if (_delete.status === 1) {
              this.selectedAll = false;
              this.filterDataId = [];
              this.bannerList(this.offset, this.keyword);
              this.bannerListCount(this.offset, this.keyword);
            }
          }
        }));
      }
    });
  }

  selectAll() {
    for (let i = 0; i < this.bannerListArray.length; i++) {
      this.bannerListArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
    } else {
      this.bulkFunction = false;
    }
  }

  checkIfAllSelected() {
    this.bulkFunction = true;
    this.selectedAll = this.bannerListArray.every(function (item: any) {
      return item.selected === true;
    });
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
    } else {
      this.bulkFunction = false;
    }
  }

  filterDataList() {
    this.filterData = this.bannerListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.bannerId);
  }

  bulkDeleteEmpty() {
    this.showNotificationError('Choose atleast one Banner');
  }

  /**
   * Shows error notification with given title and message
   *
   * @params message
   */
  private showNotificationError(message: string): void {
    this.toastr.errorToastr(message);
  }

  // BannerList Image Loader
  bannerListImageLoading(id) {
    this.bannerListImage[id] = true;
  }

  subscribeBanner() {
    this.subscriptions.push(this.sandbox.getbannerlist$.subscribe(data => {
      this.bannerListArray = [];
      if (data && data.length > 0) {
        this.bannerListArray = data.map(list => {
          return { ...list, selected: false };
        });
      }
    }));
  }


  exportBanner() {
    const param: any = {};
    param.bannerId = this.filterDataId;
    this.sandbox.exportBanner(param);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
