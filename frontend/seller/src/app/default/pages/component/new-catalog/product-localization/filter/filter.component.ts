import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
// Store Module

import { ActivatedRoute } from '@angular/router';
import { ProductLocalizationSandbox } from '../../../../../../../../src/app/core/catalog/product-localization/product-loacalization.sandbox';

@Component({
  selector: 'app-product-localization-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class ProductLocalizationFilterComponent implements OnInit {

  public filterForm: UntypedFormGroup;
  public keyword: string;
  public sku: any;
  public status: any;
  @Input() pageSize: any;
  private price: any;
  public pagenationCount: boolean;
  public selectedLink = 'Min';
  public productType: any;
  @Output() progressEmits = new EventEmitter<string>();
  @Output() formEmits = new EventEmitter<any>();


  constructor(public fb: UntypedFormBuilder, public sandbox: ProductLocalizationSandbox, public route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.pageSize = localStorage.getItem('itemsPerPage');
    this.pagenationCount = true;
    this.setForm();

  }

  setForm() {
    this.initFilterForm();
    this.filterForm.controls['keyword'].setValue(this.keyword);
    this.filterForm.controls['sku'].setValue(this.sku);
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      keyword: ['', Validators.required],
      sku: ['', Validators.required],
    });
  }


  /**
   * Handles  'resetFilter' event. Calls  getProductList and reset().
   *
   * @param filterForm entire form value
   */
  resetFilter() {

    // if (this.filterForm.value.keyword ||  this.filterForm.value.status || this.filterForm.value.price || this.filterForm.value.status === 0 || this.filterForm.value.keyword==''){
    this.filterForm.reset();
    const param: any = {};
    // param.limit = 10;
    // param.offset = 0;
    param.keyword = '';
    param.sku = '';
    this.progressEmits.emit(param);
    this.sandbox.getProductLocalization(param);
    param.count = 1;
    this.sandbox.getProductLocalizationCount(param);

    // }

  }


  applyFilter() {
    this.keyword = this.filterForm.value.keyword ? this.filterForm.value.keyword : '';
    this.sku = this.filterForm.value.sku ? this.filterForm.value.sku : '';

    const params: any = {
      offset: 0,  // Use numeric value 0 instead of '0'
      limit: this.pageSize,
      keyword: this.keyword,
      sku: this.sku,
    };

    this.progressEmits.emit(params);
    this.formEmits.emit(this.filterForm)
  }


}
