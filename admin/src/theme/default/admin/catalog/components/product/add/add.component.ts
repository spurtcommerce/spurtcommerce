import { map } from 'rxjs/operators';
/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { FormArray } from '@angular/forms';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormGroupName
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// Store Module
import { ImagemanagerpopupComponent } from '../../../../shared/model-popup/ImageManagerPopup/imagemanagerpopup.component';
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { CategoriesSandbox } from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import { BrandSandbox } from '../../../../../../../core/admin/catalog/brand/brand.sandbox';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import { StockSandbox } from '../../../../../../../core/admin/settings/localizations/stockStatus/stock.sandbox';

@Component({
  selector: 'app-add-products',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss']
})
export class ProductAddComponent implements OnInit, OnDestroy {
  dropDownnArray: any = [];
  // reactive form
  public user: FormGroup;
  public sizeFormArray: FormArray;
  public productName: FormControl;
  public metaTagTitle: FormControl;
  public productDescription: FormControl;
  public upc: FormControl;
  public sku: FormControl;
  public model: FormControl;
  public location: FormControl;
  public price: FormControl;
  public minimumQuantity: FormControl;
  public quantity: FormControl;
  public subtractStock: FormControl;
  public outOfStockStatus: FormControl;
  public requiredShipping: FormControl;
  public dateAvailable: FormControl;
  public status: FormControl;
  public sortOrder: FormControl;
  public condition: FormControl;
  public textRequired: FormControl;
  // dateFormGroup
  public dataRequired: FormControl;
  public dateValue: FormControl;
  // checkboxFormgroup
  public checkboxRequired: FormControl;
  public pricePrefix: FormControl;
  // size FormGroup
  public sizeBoxRequired: FormControl;
  public timeRequired: FormControl;
  public timeValue: FormControl;
  public dateTimeRequired: FormControl;
  public dateTimeValue: FormControl;

  // textFormGroup
  public TextBoxRequired: FormControl;

  public date: Date;

  // editing values
  public editId: any;
  // pagination
  public catagory: any;
  // upload
  public uploadImage: any = [];
  public TotalCategories: any = [];
  public filteredArray: any[];
  // product add or update api params
  private param: any = {};
  // getting values from popup
  private closeResult: any;
  private getDismissReason: any;
  // condition for product remove
  public show: boolean;
  // validation
  public submittedValues = false;
  public length: number;
  // image view
  public imageUrls: string;
  public defaultImageValue = 1;
  // add categories only when add button clicked
  private addOneTime = false;
  // selected products in paroducts
  public selectedProducts: any = [];
  public addOneTimeData = false;
  onetimeEdit = false;
  CategoryValue = false;
  // search product
  private subscriptions: Array<Subscription> = [];
  public isFormActive: string;

  public updateproductdetails = [];

    // selected category list
    public selectedCategories: any = [];

  // ck editor

  public name = 'ng2-ckeditor';
  public ckeConfig: any;
  public mycontent: string;
  public log = '';
  @ViewChild('myckeditor') ckeditor: any;

  public selectedCategory: FormControl;


  constructor(
    public fb: FormBuilder,
    public productSandbox: ProductSandbox,
    public categoriessandbox: CategoriesSandbox,
    public brandsandbox: BrandSandbox,
    private popup: NgbModal,
    private route: ActivatedRoute,
    private changeDetectRef: ChangeDetectorRef,
    public stockStatusSandbox: StockSandbox,
    public configService: ConfigService,
    private datePipe: DatePipe
  ) {
    this.mycontent = `<p>My html content</p>`;
    // this.initDropDownList();
    this.route.params.subscribe(data => {
      if (data) {
        this.editId = data['id'];
      }
    });
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
    // clear product details Data
    this.productSandbox.ClearProductDetails();
    // calling ProductDetail
    this.initProductForm();
    if (this.editId) {
      this.productSandbox.getProductDetail({ Id: this.editId });
      this.regDetailEvent();
    } else {
      this.initDropDownList();
    }
    this.imageUrls = this.configService.getImageUrl();
    this.changeDetectRef.detectChanges();

    // ck editor
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      // forcePasteAsPlainText: true,
      height: '100%'
    };
  }
  initDropDownList() {
    this.getCategoryList();
    this.getManufacturerList();
    this.getStockStausList();
  }

  // reactive form
  initProductForm() {
    this.productName = new FormControl('', [Validators.required]);
    this.metaTagTitle = new FormControl('');
    this.productDescription = new FormControl('');
    this.upc = new FormControl('');
    this.sku = new FormControl('', [Validators.required]);
    this.model = new FormControl('', [Validators.required]);
    this.location = new FormControl('');
    this.price = new FormControl('', [Validators.required]);
    this.outOfStockStatus = new FormControl('', [Validators.required]);
    this.requiredShipping = new FormControl('', [Validators.required]);
    this.dateAvailable = new FormControl('');
    this.status = new FormControl('', [Validators.required]);
    this.sortOrder = new FormControl('');
    this.condition = new FormControl('', [Validators.required]);
    this.textRequired = new FormControl('');
    this.timeRequired = new FormControl('');
    this.timeValue = new FormControl('');
    this.dateTimeRequired = new FormControl('');
    this.dateTimeValue = new FormControl('');

    this.checkboxRequired = new FormControl('');
    this.sizeBoxRequired = new FormControl('');

    this.dataRequired = new FormControl('');
    this.dateValue = new FormControl('');
    this.selectedCategory = new FormControl('', [Validators.required]);

      (this.TextBoxRequired = new FormControl(''));

    this.user = this.fb.group({
      productName: this.productName,
      metaTagTitle: this.metaTagTitle,
      productDescription: this.productDescription,
      upc: this.upc,
      sku: this.sku,
      model: this.model,
      location: this.location,
      price: this.price,
      outOfStockStatus: this.outOfStockStatus,
      requiredShipping: this.requiredShipping,
      dateAvailable: this.dateAvailable,
      status: this.status,
      sortOrder: this.sortOrder,
      condition: this.condition,
      textRequired: this.textRequired,
      timeRequired: this.timeRequired,
      timeValue: this.timeValue,
      dateTimeRequired: this.dateTimeRequired,
      dateTimeValue: this.dateTimeValue,
      dataRequired: this.dataRequired,
      dateValue: this.dateValue,
      selectedCategory: this.selectedCategory,

      sizeForm: this.fb.group({
        sizeBoxRequired: this.sizeBoxRequired,
        sizeFormArray: this.fb.array([])
      })
    });
  }

  // create control for FormArray of sizeFormArray
  get sizeArray() {
    return <FormArray>this.user.controls['sizeForm'].get('sizeFormArray');
  }

  // Stock Status List

  getStockStausList() {
    const params: any = {};
    params.limit = 0;
    params.offset = 100;
    params.keyword = '';
    params.status = '1';
    this.stockStatusSandbox.stockStatusList(params);
  }

  selecttCategory(event, categoryList) {
    console.log('categoryList', categoryList);
    console.log('event', event);
    this.TotalCategories = categoryList.filter(list => {
      if (list.categoryId === +event) {
        return true;
      } else {
        return false;
      }
    });
    console.log('cat', this.TotalCategories);

  }

  /**
   * Handles  'onSubmit' event. Calls productSandbox doProductUpdate function if (this.editId) else
   * calls productSandbox doProductAdd function.
   * @param user entire form value
   */
  onSubmit(user) {
    console.log('submit image', this.uploadImage);
    // calling
    this.submittedValues = true;

    if (!this.user.valid) {
      this.validateAllFormFields(this.user);
      return;
    }
    this.onetimeEdit = true;
    this.param.productName = user.productName;
    this.param.metaTagTitle = user.metaTagTitle;
    this.param.productDescription = user.productDescription;
    this.param.upc = user.upc;
    this.param.sku = user.sku;
    this.param.image = this.uploadImage;
    this.param.model = user.model;
    this.param.location = user.location;
    this.param.price = user.price;
    this.param.outOfStockStatus = user.outOfStockStatus;
    this.param.requiredShipping = user.requiredShipping;
    this.param.dateAvailable = user.dateAvailable;
    this.param.categoryId = this.TotalCategories;


    const dateSendingToServer = new DatePipe('en-US').transform(
      user.dateAvailable,
      'yyyy-MM-dd'
    );
    this.param.dateAvailable = dateSendingToServer;
    this.param.status = user.status;
    this.param.sortOrder = user.sortOrder;
    this.param.condition = user.condition;
    if (this.editId) {
      this.param.productId = this.editId;
      this.productSandbox.doProductUpdate(this.param);
    } else {
      console.log('params', this.param)
      this.productSandbox.doProductAdd(this.param);
    }
  }

  /**
   * unsubscribe the subscriptions
   *
   * Handles  'regDetailEvent' event. Calls productSandbox productDetails$ to
   * subscribe the response data.,then calls editProductForm function with the response data.
   *
   */
  regDetailEvent() {
    this.CategoryValue = true;
    this.subscriptions.push(
      this.productSandbox.productDetails$.subscribe(data => {
        if (data && Object.keys(data).length) {
          this.selectedProducts = [];
          this.editProductForm(data);
          this.initDropDownList();
        }
      })
    );
  }

  // Handles form 'getManufacturerList' event. Calls sandbox manufacturerList function with empty value.

  getManufacturerList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keyword = '';
    params.status = 1;
    params.count = '';
    this.brandsandbox.manufacturerList(params);
  }

  // calling category list api with pagination
  getCategoryList() {
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.keyword = this.catagory;
    param.sortOrder = '';
    param.status = 1;
    this.categoriessandbox.categorylist(param);
  }

  // editing Product Form with product list values

  editProductForm(productDetail) {
    this.changeDetectRef.detectChanges();
    this.updateproductdetails.push(productDetail);
    if (productDetail.Category && productDetail.Category.length > 0) {
      this.selectedCategory.setValue(productDetail.Category[0].categoryId);
    } else {
      this.selectedCategories = [];
    }
    this.selectedProducts = productDetail.relatedProductDetail;
    this.uploadImage = productDetail.productImage;
    this.selectedProducts = productDetail.relatedProductDetail;
    this.productName.setValue(productDetail.name);
    this.sku.setValue(productDetail.sku);
    this.upc.setValue(productDetail.upc);
    this.price.setValue(productDetail.price);
    this.location.setValue(productDetail.location);
    this.outOfStockStatus.setValue(productDetail.stockStatusId);
    this.status.setValue(productDetail.isActive);
    this.model.setValue(productDetail.manufacturerId);
    this.requiredShipping.setValue(productDetail.shipping);
    if (productDetail && productDetail.stockStatusId) {
      this.outOfStockStatus = productDetail.stockStatusId;
    }
    if (this.requiredShipping.value === 1) {
      this.user.patchValue({ requiredShipping: '1', tc: true });
    } else {
      this.user.patchValue({ requiredShipping: '2', tc: true });
    }
    this.dateAvailable.setValue(productDetail.dateAvailable);
    this.sortOrder.setValue(productDetail.sortOrder);
    this.productDescription.setValue(productDetail.description);
    this.metaTagTitle.setValue(productDetail.metaTagTitle);
    this.condition.setValue(productDetail.condition);
  }

  // getting values from media popup
  uploadProductImages() {
    const modalRef = this.popup.open(ImagemanagerpopupComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    // Make the first image as default  selected.
    modalRef.result.then(
      result => {
        if (result !== '' && result !== undefined) {
          const lengthOfUploadImage: number = this.uploadImage.length;
          this.uploadImage.push(result);
          console.log('upload image', this.uploadImage);

          this.length = 0;
          // make non default value
          if (this.uploadImage.length > 1 && !this.editId) {
            for (let i = 1; i < this.uploadImage.length; i++) {
              this.uploadImage[i].defaultImage = 0;
            }
          } else if (!this.editId) {
            this.uploadImage[0].defaultImage = 1;
          } else if (this.editId) {
            // make  default value
            if (this.uploadImage[0]) {
              this.uploadImage[0].defaultImage = 1;
            } else {
              for (
                let i = lengthOfUploadImage;
                i < this.uploadImage.length;
                i++
              ) {
                this.uploadImage[i].defaultImage = 0;
              }
            }
          }
          console.log('upload image', this.uploadImage);
        }
        this.changeDetectRef.detectChanges();
        this.closeResult = `Closed with: ${'result'}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  // delete image
  deleteImage(i) {
    this.uploadImage.splice(i, 1);
  }

  // validation for the formGroup
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  // ck editor
  checkBox(event, ii) {
    const index: number = ii;
    for (let i = 0; i < this.uploadImage.length; i++) {
      if (index === i && event.target.checked) {
        this.uploadImage[i].defaultImage = 1;
      } else {
        this.uploadImage[i].defaultImage = 0;
      }
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
}
