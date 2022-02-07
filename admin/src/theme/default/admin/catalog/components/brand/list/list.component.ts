/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Component, OnInit } from '@angular/core';
// Routing Module
import { Router } from '@angular/router';
// Shared Module
import { ConfigService } from '../../../../../../../core/admin/service/config.service';

// Store Module
import { BrandSandbox } from '../../../../../../../core/admin/catalog/brand/brand.sandbox';
import { BrandApiClient } from '../../../../../../../core/admin/catalog/brand/brandApiClientservice';

@Component({
  selector: 'app-catalog-brand-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BrandListComponent implements OnInit {
  // variables
  public pageoffset: number;
  public keyword = '';
  public offset: number;
  public pageSize = '10';
  public pageSizeOptions: number[] = [10, 25, 100];
  public length: number;
  private pagenationcount: boolean;
  public popoverContent: any;
  // image
  public imageUrl: string;
  public brandListImage = {};
  // condition for filter component
  public buttonCheck = true;
  public index: number;
  private sortOrder: number;

  constructor(
    public sandbox: BrandSandbox,
    private brandApi: BrandApiClient,
    private route: Router,
    public configService: ConfigService
  ) {}

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.pagenationcount = true;
    this.getManufacturerList();
    this.regSubscriptionEvents();
    this.imageUrl = this.configService.getImageUrl();
  }

  /**
   * Handles form 'getManufacturerList' event . Calls sandbox function manufacturerList manufacturerCountList if form is valid.
   * @param offset intial offset value
   */
  getManufacturerList(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = '';
    params.count = '';
    this.sandbox.manufacturerList(params);
    if (this.pagenationcount) {
      params.limit = '';
      params.count = 'true';
      this.sandbox.manufacturerCountList(params);
    }
  }

  /**
   * A function 'onPageChange' handle the page change event
   * @param event from event
   */
  onPageChange(event) {
    this.pagenationcount = false;
    this.pageoffset = event.pageSize * event.pageIndex;
    this.pageSize = event.pageSize;
    this.getManufacturerList(this.pageoffset);
  }

  /**
   *  Handles form 'editManufacture' event. Calls brandApi Service setManufactureEditValue function if form is valid
   * @param editValue brand list data value
   */
  editManufacture(editValue) {
    this.brandApi.setManufactureEditValue(editValue);
    this.route.navigate(['catalog/brand/edit', editValue.manufacturerId]);
  }

  // open add brand component form
  addBrand() {
    this.brandApi.setManufactureEditValue('');
    this.route.navigate(['catalog/brand/add']);
  }

  /**
   * A function 'deleteBrand' handle delete brandlist data
   * @param manufacturerId From manufacturerId
   */
  deleteBrand(manufacturerId, deletePop) {
    event.stopPropagation();
    this.sandbox.deleteManufacturer({ manufacturerId: manufacturerId });
  }

  // A function 'regSubscribeEvents'  call after getting delete response for pagination purpose
  regSubscriptionEvents() {
    this.sandbox.getManufacturerDelete$.subscribe(_delete => {
      if (_delete && _delete.status && _delete.status === 1) {
        this.pagenationcount = true;
        this.getManufacturerList(this.pageoffset);
      }
    });
  }

  // BrandList Image Loader
  brandListImageLoading(id) {
    this.brandListImage[id] = true;
  }

  // shows the filter component
  changeFilter(event) {
    this.buttonCheck = event.target.checked;
  }

  // receive param from filter component .And calls categoriesPagination event
  receiveProgress(event) {
    this.index = 0;
    this.getManufacturerList();
    this.keyword = event.keyword;
    this.sortOrder = event.sortOrder;
  }
}
