/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';
import { VendorProductSandbox } from '../../../../../../../../core/admin/vendor/pages/vendor-product/vendor-product.sandbox';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { ProductSandbox } from 'src/core/admin/catalog/product/product.sandbox';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-vendor-product-list',
  templateUrl: 'vendor-product-list.component.html',
  styleUrls: ['vendor-product-list.component.scss']
})
export class VendorProductListComponent implements OnInit {
  @ViewChild('closeBtn') closeAddExpenseModal: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;

  public ImageUrl: any = '';
  public checkmodules: any = [];
  public unCheckData: any = [];
  public checkCondition: any = [];
  public offset: any = 0;
  public index: any;
  public pageSize :any;
  private isCount: boolean;
  public currentPage = 1;
  public buttoncheck = true;
  public buttonActive = false;
  public filterEnable = true;
  public isChecked: any = [];
  public sampleArray: any = [];
  public pageSizeOptions = [10, 20];
  public deleteItem: any = [];
  public seriesData: any;
  public productArray = [];
  public bulkFunction = false;
  public checkAll = false;
  // Filter
  public filterForm: FormGroup;
  public keyword: FormControl;
  public status: FormControl;
  public productTypes:FormControl;
  public productType:any=0;
  public filterData: any = [];
  public filterDataId = [];
  public selectedAll: any;
  public currency: any;

  public filterKeyword: any = '';
  public filterStatus = '';
  public queryData: any = {};
  title ='Vendor Products';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService,
    public productSandbox: VendorProductSandbox,
    public vendorSandbox: ProductSandbox,
    public fb: FormBuilder,
    public modalService: NgbModal,
    public titleService:Title
  ) {
    this.index = this.route.snapshot.queryParamMap.get('index') || 0;
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.subscribeVal();
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.currency = JSON.parse(sessionStorage.getItem('adminCurrency'));
    this.ImageUrl = this.configService.getImageUrl();
    this.pageSize = sessionStorage.getItem('itemsPerPage')
    this.productSandbox.getVendorProductCounts();
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.index = this.route.snapshot.queryParamMap.get('index');
    this.productList();
    this.productListCount();
    this.productFilterForm();
    this.isCount = true;
  }

  check(event) {
    if (event.target.checked) {
      this.buttonActive = false;
      this.buttoncheck = event.target.checked;
      this.filterEnable = true;
    } else {
      this.buttonActive = true;
      this.buttoncheck = event.target.checked;
      this.filterEnable = false;
    }
  }

  approvalFlag(array) {
    const params: any = {};
    params.productId = array.productId;
    params.approvalFlag = 1;
    this.productSandbox.sellerApproval(params);
    this.subscribeVal();
  }

  subscribeVal() {
    this.productSandbox.getSellerApproval$.subscribe(val => {
      this.productList();
    });
    this.productSandbox.productList$.subscribe(data => {
      if (data) {
        this.productArray = [];
        this.productArray = data.map(val => {
          return { ...val, selected: false };
        });
      }
    });
  }

  checkStatus(array) {
    if (array.approvalFlag === 0) {
      const params: any = {};
      params.productId = array.productId;
      params.status = 0;
      this.productSandbox.productStatus(params);
      this.productSandbox.getProductStatusLoaded$.subscribe(data => {
        if (data === true) {
          this.productSandbox.getVendorProductCounts();
        }
      });
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.productArray.every(function (item: any) {
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
    this.filterData = this.productArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.productId);
  }

  statusChange(event: any, array) {
    const params: any = {};
    params.productId = array.productId;
    const FeatureValue = event.target.checked;
    if (FeatureValue === true) {
      params.status = 1;
      this.productSandbox.productStatus(params);
      this.productSandbox.getVendorProductCounts();
    } else {
      params.status = 0;
      this.productSandbox.productStatus(params);
      this.productSandbox.getVendorProductCounts();
    }
  }

  productList() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.filterKeyword;
    params.status = this.filterStatus;
    params.count = 0;
    params.productType=this.productType?this.productType:0;
    this.productSandbox.productList(params);

    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.index || 0;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', 
      });
  }

  productListCount() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.filterKeyword;
    params.status = this.filterStatus;
    params.productType=this.productType?this.productType:0;
    params.count = 1;
    this.productSandbox.productListCount(params);
  }

  onPageChange(event: any) {
    this.isCount = false;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.selectedAll = false;
    this.filterDataId = [];
    this.productList();
  }

  deleteProduct(id, key) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass:'modal-dialog-centered' , backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = key;
    modelRef.componentInstance.id = id;
    modelRef.componentInstance.deleteMessage = 'Product'
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.productList();
        this.productListCount();
        this.productSandbox.getVendorProductCounts();

      }
    });
  }
  addProduct(){
    this.router.navigate(['/vendors/manage-products/vendor-products/add'], { queryParams: this.queryData });
  }
  update(array) {
    const id = array.productId;
    this.router.navigate(['/vendors/manage-products/vendor-products/edit', id], { queryParams: this.queryData });
  }

  productFilterForm() {
    this.filterForm = this.fb.group({
      keyword: [''],
      status: [null],
      productTypes:[null]
    });
    const requestParam = this.route.snapshot.queryParams;
    if (Object.entries(requestParam).length === 0 && requestParam.constructor === Object) {
    } else {
      const keyword = requestParam.keyword ? requestParam.keyword : '';
      const param: any = {};
      param.limit =  this.pageSize;
      param.offset =  this.offset;
      param.keyword = keyword;
      param.status = '';
      this.filterForm.setValue({
        keyword: keyword,
        status: null,
        productTypes:null
      });
      this.productSandbox.productList(param);
    }
  }

  resetFilter(offset: number = 0, pageSize) {
      this.filterForm.reset();
      const param: any = {};
      param.limit = this.pageSize;
      param.offset = offset;
      this.filterKeyword = '';
      this.filterStatus = '';
      this.productType =0;
      this.productList();
      this.productListCount();
      this.paginator.firstPage();

  }

  applyFilter() {
    this.offset = 0;
    const param: any = {};
    param.offset = this.offset;
    param.limit = this.pageSize;
    this.filterKeyword = this.filterForm.value.keyword || '';
    this.filterStatus = this.filterForm.value.status || '';
    this.productType = this.filterForm.value.productTypes || ''
    if (this.filterKeyword !== '' || this.filterStatus !== '' || this.productType !== '') {
      this.paginator.firstPage();
      this.productList();
      this.productListCount();
    }

  }

  selectAll(event: any) {
    for (let i = 0; i < this.productArray.length; i++) {
      this.productArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
    } else {
      this.bulkFunction = false;
    }
  }

  exportExcel() {
    const param: any = {};
    param.productId = this.filterDataId.toString();
    this.productSandbox.productExcel(param);
  }

  exportAllExcel() {
    const param: any = {};
    param.keyword = this.filterKeyword;
    param.status = this.filterStatus;
    param.productType=this.productType;
    this.productSandbox.productAllExcel(param);
  }


  bulkDelete() {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass:'modal-dialog-centered' , backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const param: any = {};
        param.productId = this.filterDataId.toString();
        this.productSandbox.doProductDelete(param);
        this.productSandbox.productDeleteLoaded$.subscribe(_delete => {
          if (_delete) {
            this.productList();
            this.productListCount();
            this.productSandbox.getVendorProductCounts();
          }
        });
      }
    });
  }

  receiveProgress(event) {
    this.index = 0;
    this.keyword = event.keyword;
    this.status = event.status;
  }

}
