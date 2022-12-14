/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
// Routing Module
import { ActivatedRoute, Router } from '@angular/router';
// Shared Module
import { ConfigService } from '../../../../../../../core/admin/service/config.service';

// Store Module
import { BrandSandbox } from '../../../../../../../core/admin/catalog/brand/brand.sandbox';
import { BrandApiClient } from '../../../../../../../core/admin/catalog/brand/brandApiClientservice';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subscription } from 'rxjs';
import { DeleteConfirmationDialogComponent } from '../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-catalog-brand-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']

})

export class BrandListComponent implements OnInit, OnDestroy {


  @ViewChild('paginator') paginator: MatPaginator;
  // variables
  public pageoffset: any;
  public keyword = '';
  public status = '';
  public offset: number;
  public pageSize = '10';
  public pageSizeOptions: number[] = [10, 25, 100];
  public length: number;
  public pagenationcount: boolean;
  public popoverContent: any;
  // image
  public imageUrl: string;
  public brandListImage = {};
  // condition for filter component
  public buttonCheck = true;
  public index: any;
  public sortOrder: any;

  // bulk delete or bulk export variables
  public bulkFunction = false;
  public productList: any;
  public selectedAll = false;
  private subscriptions: Array<Subscription> = [];
  public brandListArray: any;
  public filterData: any = [];
  public filterDataId = [];
  queryData: any = {};


  constructor(public sandbox: BrandSandbox,
    private brandApi: BrandApiClient,
    private route: Router,
    public router: ActivatedRoute,
    public configService: ConfigService,
    private toastr: ToastrManager,
    public modalService: NgbModal) {
    this.subscribeBrand();

  }

  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage');

    this.pagenationcount = true;
    this.pageoffset = this.router.snapshot.queryParamMap.get('offset') || 0;
    this.index = this.router.snapshot.queryParamMap.get('index');
    this.getManufacturerList();
    this.getManufactureCount();
    this.regSubscriptionEvents();
    this.imageUrl = this.configService.getImageUrl();

  }

  /**
   * Handles form 'getManufacturerList' event . Calls sandbox function manufacturerList manufacturerCountList if form is valid.
   * @param offset intial offset value
   */
  getManufacturerList() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.pageoffset;
    params.keyword = this.keyword;
    params.count = 0;
    params.status = this.status;
    this.sandbox.manufacturerList(params);
    this.queryData.offset = this.pageoffset || 0;
    this.queryData.index = this.index || 0;
    this.route.navigate(
      [],
      {
        relativeTo: this.router,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  getManufactureCount() {
    const params: any = {};
    params.count = 1;
    params.keyword = this.keyword;
    params.status = this.status;
    this.sandbox.manufacturerCount(params);
  }

  /**
   * A function 'onPageChange' handle the page change event
   * @param event from event
   */
  onPageChange(event) {
    this.pagenationcount = false;
    this.pageoffset = event.pageSize * event.pageIndex;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.filterDataId = [];
    this.selectedAll = false;
    this.getManufacturerList();
  }

  pageChangeEvent() {
    this.pagenationcount = false;
    this.pageoffset = this.offset;
    this.pageSize = this.pageSize;
    this.index = this.index;
    this.filterDataId = [];
    this.selectedAll = false;
    this.getManufacturerList();
  }

  /**
   *  Handles form 'editManufacture' event. Calls brandApi Service setManufactureEditValue function if form is valid
   * @param editValue brand list data value
   */
  editManufacture(editValue) {
    this.brandApi.setManufactureEditValue(editValue);
    this.route.navigate(['catalog/brand/edit', editValue.manufacturerId], { queryParams: this.queryData });
  }

  addBrand() {
    this.brandApi.setManufactureEditValue('');
    this.route.navigate(['catalog/brand/add'], { queryParams: this.queryData });
  }

  // A function 'regSubscribeEvents'  call after getting delete response for pagination purpose
  regSubscriptionEvents() {
    this.sandbox.getManufacturerDelete$.subscribe(_delete => {
      if (_delete && _delete.status && _delete.status === 1) {
        this.pagenationcount = true;
        this.getManufacturerList();
        this.getManufactureCount();

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
    this.keyword = event.keyword;
    this.status = event.status;
    this.pageoffset = 0;
    this.paginator.firstPage();
    if (this.keyword !== '' || this.status !== '') {
      this.getManufacturerList();
      this.getManufactureCount();
    }

  }


  selectAll() {
    for (let i = 0; i < this.brandListArray.length; i++) {
      this.brandListArray[i].selected = this.selectedAll;
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
    this.selectedAll = this.brandListArray.every(function (item: any) {
      return item.selected === true;
    });
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
    } else {
      this.bulkFunction = false;
    }
  }

  // filter product list event for multiple delete
  filterDataList() {
    this.filterData = this.brandListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.manufacturerId);
  }

  // bulkDeleteEmpty
  bulkDeleteEmpty() {
    this.showNotificationError('Choose atleast one Product');
  }

  /**
   * Shows error notification with given title and message
   *
   * @params message
   */
  private showNotificationError(message: string): void {
    this.toastr.errorToastr(message);
  }

  bulkDelete() {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const param: any = {};
        param.manufacturerId = this.filterDataId.toString();
        this.sandbox.bulkDeleteManufacturer(param);
        this.subscriptions.push(this.sandbox.bulkDelete$.subscribe(_delete => {
          if (_delete) {
            if (_delete.status === 1) {
              this.filterDataId = [];
              this.selectedAll = false;
              this.getManufacturerList();
              this.getManufactureCount();
            }
          }
        }));
      }
    });
  }



  deleteBrand(manufacturerId) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.sandbox.deleteManufacturer({ manufacturerId: manufacturerId });
      }
    });
  }

  subscribeBrand() {
    this.subscriptions.push(this.sandbox.getManufactureList$.subscribe((data: any) => {
      this.brandListArray = [];
      if (data && data.length > 0) {
        this.brandListArray = data.map(list => {
          return { ...list, selected: false };
        });
      }
    }));
  }

  exportBrand() {
    const param: any = {};
    param.manufacturerId = this.filterDataId.toString();
    this.sandbox.exportManufacturer(param);
  }

  ngOnDestroy() {
    this.filterDataId = [];
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}

