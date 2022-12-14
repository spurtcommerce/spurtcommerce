/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Store Module
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog-product-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  public filterForm: FormGroup;
  public keyword: string;
  public sku: any;
  public status: any;
  @Input() pageSize: any;
  private price: any;
  public pagenationCount: boolean;
  public selectedLink = 'Min';
  public productType:any;
  @Output() progressEmits = new EventEmitter<string>();

  constructor(public fb: FormBuilder, public sandbox: ProductSandbox, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage');
    this.pagenationCount = true;
    this.setForm();
  }

  setForm() {
    this.initFilterForm();
    this.filterForm.controls['keyword'].setValue(this.keyword);
    this.filterForm.controls['sku'].setValue(this.sku);
    this.filterForm.controls['status'].setValue(this.status?.toString());
    this.filterForm.controls['price'].setValue(this.price);
    this.filterForm.controls['productType'].setValue(this.productType)
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      keyword: ['', Validators.required],
      sku: ['', Validators.required],
      status: [null, Validators.required],
      price: ['', Validators.required],
      productType:[null,Validators.required]
    });
  }

  selectPrice(e: string): void {
    this.selectedLink = e;
  }

  /**
   * Handles  'resetFilter' event. Calls  getProductList and reset().
   *
   * @param filterForm entire form value
   */
  resetFilter() {
    if (this.filterForm.value.keyword || this.filterForm.value.sku || this.filterForm.value.status || this.filterForm.value.price || this.filterForm.value.status === 0 || this.filterForm.value.productType) {
      this.filterForm.reset();
      const param: any = {};
      param.limit = this.pageSize;
      param.offset = 0;
      param.keyword = '';
      param.price = '';
      param.sku = '';
      param.status = '';
      param.productType = '';
      this.progressEmits.emit(param);
      this.sandbox.getProductList(param);
      param.count = 1;
      this.sandbox.getProductCount(param);

    }

  }

  /**
   * Handles  'applyFilter' event. Calls  getProductList.
   * if (selectedLink == 'Min') assign price value 1 ,
   * else assign price value 1
   */
  applyFilter() {
    this.keyword = this.filterForm.value.keyword ? this.filterForm.value.keyword : '';
    this.sku = this.filterForm.value.sku ? this.filterForm.value.sku : '';
    this.status = this.filterForm.value.status === 0 ? this.status = '0' : this.filterForm.value.status === 1 ? this.status = '1' : '';
    this.price = this.filterForm.value.price ? this.filterForm.value.price : '';
    this.productType = this.filterForm.value.productType?this.filterForm.value.productType:'';
    console.log('this.productTypethis.productType',this.productType)
    const params: any = {};
    params.offset = '';
    params.limit = this.pageSize;
    params.keyword = this.keyword;
    params.sku = this.sku;
    params.status = this.status;
    params.price = this.price;
    params.productType=this.productType;
    this.progressEmits.emit(params);
  }

}
