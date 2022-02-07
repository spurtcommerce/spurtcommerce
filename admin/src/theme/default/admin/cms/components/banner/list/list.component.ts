/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
// Store Module
import { BannerService } from '../../../../../../../core/admin/cms/banners/banner.service';
import { BannerSandbox } from '../../../../../../../core/admin/cms/banners/banner.sandbox';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { ToastrManager } from 'ng6-toastr-notifications';

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
export class BannerListComponent implements OnInit {
  //  variables
  public closeResult: string;
  public page: any;
  public pageSize = '10';
  private keyword: any = '';
  private offset: number;
  private currentPage: number;
  public index: number;
  public popoverContent: string;
  public pagenationCount: boolean;
  public imageUrl: string;
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];
  public bannerListImage = {};

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  constructor(
    public sandbox: BannerSandbox,
    private service: BannerService,
    private toastr: ToastrManager,
    private router: Router,
    private configService: ConfigService
  ) {}

  // initially calls regSubscriptionEvents,bannerList
  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.imageUrl = this.configService.getImageUrl();
    this.pagenationCount = true;
    this.regSubscriptionEvents();
    this.index = 0;
    this.bannerList(this.offset, this.keyword);
  }

  // this function navigate  to  create page banner
  AddBanner() {
    this.service.setBannerListData('');
    this.router.navigate(['/cms/banners/add']);
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
  }

  // to get total count
  bannerListCount(offset: number = 0, keyword) {
    const params: any = {};
    params.offset = offset;
    params.limit = this.pageSize;
    params.keyword = this.keyword;
    params.count = 1;
    // params.status = 1;
    this.sandbox.getBannerListCount(params);
  }

  // mat pagination function
  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    const offset = event.pageSize * event.pageIndex;
    this.bannerList(offset, this.pageSize);
  }

  //  edit
  editBanner(bannerData) {
    this.service.setBannerListData(bannerData);
    this.router.navigate(['/cms/banners/edit', bannerData.bannerId]);
  }

  //  function deleteBanner to delete particular id in banner list
  deleteBanner(bannerId, deletePop) {
    this.popoverContent = deletePop;
    event.stopPropagation();
    this.sandbox.deletebanner({ bannerId: bannerId });
  }

  // popup  regSubscriptionEvents
  regSubscriptionEvents() {
    this.sandbox.getdeletebanner$.subscribe(_delete => {
      if (_delete && _delete.status && _delete.status === 1) {
        this.bannerList(this.offset, this.keyword);
      }
    });
  }

  // bulkDelete
  bulkDelete() {
    this.unCheckData = [];
    const param: any = {};
    param.bannerId = this.checkedData;
    this.sandbox.bulkDelete(param);
    this.checkedData = [];
    this.sandbox.getdeletebanner$.subscribe(_delete => {
      if (_delete) {
        if (_delete.status === 1) {
          this.checkedData = [];
          this.bannerList(this.offset, this.keyword);
        }
      }
    });
  }

  selectChkBox(event, pageId) {
    if (event.target.checked === true) {
      this.checkedData.push(pageId);
    }
    if (event.target.checked === false) {
      this.unCheckData.push(pageId);
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

  // bulkDeleteEmpty
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
  BannerListImageLoading(id) {
    this.bannerListImage[id] = true;
  }
}
