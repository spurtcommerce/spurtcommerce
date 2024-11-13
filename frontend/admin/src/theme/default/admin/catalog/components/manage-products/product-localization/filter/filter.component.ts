import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
// Store Module
import { ProductLocalizationSandbox } from '../../../../../../../../core/admin/catalog/product-localization/product-loacalization.sandbox';
import { ActivatedRoute } from '@angular/router';

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

  constructor(public fb: UntypedFormBuilder, public sandbox: ProductLocalizationSandbox, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage');
    this.pagenationCount = true;
    this.setForm();

  }

  setForm() {
    this.initFilterForm();
    this.filterForm.controls['keyword'].setValue(this.keyword);
    // this.filterForm.controls['sku'].setValue(this.sku);
    // this.filterForm.controls['status'].setValue(this.status?.toString());
    // this.filterForm.controls['price'].setValue(this.price);
    // this.filterForm.controls['productType'].setValue(this.productType)
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      keyword: ['', Validators.required],
      // status: [null, Validators.required],
      // price: ['', Validators.required],
      // productType: [null, Validators.required]
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

    // if (this.filterForm.value.keyword ||  this.filterForm.value.status || this.filterForm.value.price || this.filterForm.value.status === 0 || this.filterForm.value.keyword==''){
    this.filterForm.reset();
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = 0;
    param.keyword = '';
    // param.price = '';
    // param.status = '';
    // param.productType = '';
    this.progressEmits.emit(param);
    this.sandbox.getProductLocalization(param);
    param.count = 1;
    this.sandbox.getProductLocalizationCount(param);

    // }

  }

  /**
   * Handles  'applyFilter' event. Calls  getProductList.
   * if (selectedLink == 'Min') assign price value 1 ,
   * else assign price value 1
   */
  applyFilter() {
    this.keyword = this.filterForm.value.keyword ? this.filterForm.value.keyword : '';
    // this.status = this.filterForm.value.status === 0 ? this.status = '0' : this.filterForm.value.status === 1 ? this.status = '1' : '';
    // this.price = this.filterForm.value.price ? this.filterForm.value.price : '';
    // this.productType = this.filterForm.value.productType ? this.filterForm.value.productType : '';

    const params: any = {
      offset: 0,  // Use numeric value 0 instead of '0'
      limit: this.pageSize,
      keyword: this.keyword,
      // status: this.status,
      // price: this.price,
      // productType: this.productType
    };

    this.progressEmits.emit(params);
    console.log('Filter applied successfully. Result:', params);
  }


}
