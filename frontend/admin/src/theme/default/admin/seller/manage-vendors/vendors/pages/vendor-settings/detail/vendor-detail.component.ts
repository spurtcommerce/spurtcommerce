/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { ChangeDetectorRef, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SettingSandbox } from '../../../../../../../../../core/admin/vendor/pages/vendor-setting/vendor-setting.sandbox';
import { SettingService } from '../../../../../../../../../core/admin/vendor/pages/vendor-setting/vendor-setting.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../../../../../../core/admin/service/config.service';
import { VendorProductSandbox } from '../../../../../../../../../core/admin/vendor/pages/vendor-product/vendor-product.sandbox';
// import { ToastrManager } from 'ng6-toastr-notifications';
import { Subscription } from 'rxjs';
import { LayoutSandbox } from '../../../../../../../../../core/admin/layout/layout.sandbox';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendor-settings-detail',
  templateUrl: 'vendor-detail.component.html',
  styleUrls: ['vendor-detail.component.scss']
})
export class VendorSettingsDetailComponent implements OnInit, OnDestroy {


  @ViewChild('tab1') el: ElementRef;
  public sellerId: any;
  public id: any;
  public vendorId: any;
  public ImageUrl: any = '';
  public settingForm: UntypedFormGroup;
  public categoryId: UntypedFormControl;
  public commission: UntypedFormControl;
  public setCommissionForm: UntypedFormGroup;
  public defaultCommission: UntypedFormControl;
  public submitted = false;
  public selectedCategory = [];
  public edit: any;
  private CategoryEditdata: any;
  public CommissionButton = false;
  public editSetCommissionField = false;
  public data: any;
  public vendorDetails: any;
  public searchText = '';
  public searchSelectedText = '';
  public offset = 0;
  public index = 0;
  public pageSize: any;
  public commissionVal: any;
  public vendorCommissionVal: any;
  public clear = false;
  public overallCommissionField = false;
  private subscriptions: Array<Subscription> = [];
  private subscription: Array<Subscription> = [];
  public selectAssign: boolean;

  constructor(
    public settingSandbox: SettingSandbox,
    public settingService: SettingService,
    private configService: ConfigService, public productSandbox: VendorProductSandbox,
    public router: Router,
    private modalService: NgbModal,
    private modalService2: NgbModal,
    public fb: UntypedFormBuilder,
    private changeDetectRef: ChangeDetectorRef,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    public commonSandbox: LayoutSandbox
  ) {
    this.sellerId = '';
    this.route.params.subscribe(param => {
      if (param['id']) {
        this.subscription.forEach(each => each.unsubscribe());
        this.sellerId = param['id'];
        if (this.sellerId) {
          this.selectAssign = true;
          this.getSellerDetail();
          this.subscribe();
        }
      }
    });
  }

  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage');
    this.ImageUrl = this.configService.getImageUrl();
    this.settingsForm();
    this.commissionForm();
    this.get();
    this.getCommission(this.commissionVal);
  }

  // get category list from filter
  subscribe() {
    this.subscriptions.push(this.settingSandbox.getCatListResponse$.subscribe(data => {
      if (data) {
        this.selectedCategory = [];
        data.forEach(dataVal => {
          this.selectedCategory.push(dataVal);
          this.settingSandbox.addCategory(dataVal);
        });
      }
    }));
  }

  get() {
    const param: any = {};
    this.settingSandbox.getCommission(param);
  }

  settingsForm() {
    this.settingForm = this.fb.group({
      categoryId: [''],
      commission: ['', [
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(2)
      ]]
    });
  }

  commissionForm() {
    this.setCommissionForm = this.fb.group({
      defaultCommission: ['', [
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(2)
      ]],
    });
  }

  deleteProduct(array) {
    const params: any = {};
    params.vendorCategoryId = array.vendorCategoryId;
    this.settingSandbox.categorydelete(params);
    this.subscriptions.push(this.settingSandbox.getDeleteCategoriesResponse$.subscribe(_delete => {
      if (_delete) {
        this.catList();
      }
    }));
  }

  getSellerDetail() {
    const params: any = {};
    params.id = this.sellerId;
    this.settingSandbox.pageDetail(params);
    this.subscription.push(this.settingSandbox.pageDetail$.subscribe(data => {
      if (data) {
        this.vendorDetails = data;
        this.vendorCommissionVal = this.vendorDetails.commission ? this.vendorDetails.commission : 0;
        this.changeDetectRef.detectChanges();
        this.setCommissionForm.controls['defaultCommission'].setValue(this.vendorCommissionVal);
        if (this.vendorDetails) {
          this.selectedCategory = [];
          this.catList();
        }
      }
    }));
  }

  changeTab(val) {
    if (val === '1') {
      this.vendorProductList();
      this.selectAssign = false;
    } else {
      this.selectAssign = true;
    }
  }

  vendorProductList() {
    const param: any = {};
    param.offset = this.offset;
    param.limit = this.pageSize;
    param.count = 0;
    param.vendorId = this.sellerId;
    this.productSandbox.productList(param);
    this.productSandbox.vendorProductListCount({ status: '', vendorId: this.sellerId, count: 1 });
  }

  catList() {
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.count = 0;
    param.vendorId = this.sellerId;
    this.settingSandbox.catlist(param);
  }

  update(array) {
    this.edit = array;
    this.settingService.setEditcategories(this.edit);
    this.CategoryEditdata = this.settingService.getEditcategories();

    if (this.CategoryEditdata && this.CategoryEditdata !== ' ') {
      this.editCategoryList();
    }
  }

  editCategoryList() {
    this.settingForm.controls['categoryId'].setValue(
      this.CategoryEditdata.categoryId
    );
    this.settingForm.controls['commission'].setValue(
      this.CategoryEditdata.vendorCategoryCommission
    );
  }

  setCommissionButton() {
    this.CommissionButton = true;
  }

  setCommission() {
    const params: any = {};
    params.defaultCommission = this.setCommissionForm.value.defaultCommission;
    params.vendorId = Number(this.sellerId);
    this.settingSandbox.commission(params);
    this.setCommissionForm.reset();
    this.subscriptions.push(this.settingSandbox.getSetCommissionResponse$.subscribe(data => {

      const param: any = {};
      param.id = this.sellerId;
      this.settingSandbox.pageDetail(param);
      this.editSetCommissionField = false;
    }));
  }

  maxLengthCheck(event) {
    const percentage = event.target.value + event.key;

    if (percentage > 100) {
      return false;
    }
  }

  editSetCommission() {
    this.editSetCommissionField = true;
    this.CommissionButton = true;
    const params: any = {};
  }

  clearCommission() {
    this.subscriptions.push(this.settingSandbox.getSetCommissionResponse$.subscribe(data => {
      const params: any = {};
      this.settingSandbox.getCommission(params);
      this.editSetCommissionField = false;
    }));
  }

  // add category lists event
  addCategory(category) {
    this.selectedCategory.push(category);
    this.settingSandbox.addCategory(category);
  }

  removecategory(category) {
    this.selectedCategory = this.selectedCategory.filter(cat => {
      if (cat.categoryId === category.categoryId) {
        return false;
      } else {
        return true;
      }
    });
    this.settingSandbox.removeCategory(category);
  }

  createCategory() {
    if (this.selectedCategory.length === 0) {
      this.toastr.error('Please choose atleast one category');
      return;
    }
    const category = this.selectedCategory.map(val => {
      return val.categoryId;
    });
    const params: any = {};
    params.vendorId = this.sellerId;
    params.categoryId = category.toString();
    params.commission = this.settingForm.value.commission;
    this.settingSandbox.updatecategories(params);
    this.subscriptions.push(this.settingSandbox.getUpdateCategoriesRequestLoaded$.subscribe(data => {
      if (data === true) {
        this.getSellerDetail();
      }
    }));
  }

  addAllCategory(categoryList) {
    this.selectedCategory = categoryList;
    this.settingSandbox.addCategory(categoryList);
  }

  removeAllCategory() {
    this.clear = true;
    if (this.selectedCategory.length > 0) {
      this.settingSandbox.removeCategory(this.selectedCategory);
      this.selectedCategory = [];
    }
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.vendorProductList();
  }

  getCommission(val) {
    this.productSandbox.productList$.subscribe(data =>{
      if(data){
        data.forEach(item=>{
          this.commissionVal=item.vendorProductCommission
        })
      }


    })
    this.commissionVal = val;
    
  }

  setCommissionForSingleProduct(val) {
    const params: any = {};
    params.productId = String(val);
    params.commission = String(this.commissionVal);
    this.productSandbox.doProductCommission(params);
  }

  numberOnly(event): boolean {
    const percentage = event.target.value + event.key;

    if (percentage > 100) {
      return false;
    }
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  setOverallCommision(products) {
    this.overallCommissionField = false;
    const array = [];
    products.forEach(data => {
      array.push(data.productId);
    });
    const params: any = {};
    params.productId = array.toString();
    params.commission = Number(this.commissionVal);
    this.productSandbox.doProductCommission(params);
    this.subscriptions.push(this.productSandbox.productCommissionLoaded$.subscribe(data => {
      if (data === true) {
        this.vendorProductList();
        this.overallCommissionField = false;
      }
    }));
  }

  // change checkbox commission field event
  changeCommissionField(event) {
    if (event.target.checked === true) {
      this.overallCommissionField = true;
    } else {
      this.overallCommissionField = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
