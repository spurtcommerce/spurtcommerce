/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { map } from 'rxjs/operators';
import { FormArray } from '@angular/forms';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgbModal, NgbPanelChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormGroupName
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Store Module
import { ImagemanagerpopupComponent } from '../../../../shared/model-popup/ImageManagerPopup/imagemanagerpopup.component';
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { CategoriesSandbox } from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import { StockSandbox } from '../../../../../../../core/admin/settings/localizations/stockStatus/stock.sandbox';
import { DomSanitizer } from '@angular/platform-browser';
import { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-products',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss']
})
export class ProductAddComponent implements OnInit, OnDestroy {

  @ViewChild('filePath') filePath: ElementRef;

  public dropDownnArray: any = [];
  public user: FormGroup;
  public sizeFormArray: FormArray;
  @ViewChild(NgbTabset)
  private tabset: NgbTabset;
  public productName: FormControl;
  public productSlug: FormControl;
  public productDescription: FormControl;
  public upc: FormControl;
  public sku: FormControl;
  public hsn: FormControl;
  public location: FormControl;
  public minimumQuantity: FormControl;
  public quantity: FormControl;
  public subtractStock: FormControl;
  public outOfStockStatus: FormControl;
  public requiredShipping: FormControl;
  public dateAvailable: FormControl;
  public status: FormControl;
  public sortOrder: FormControl;
  public manufacturer: FormControl;
  public textOptionValue: FormControl;
  public textRequired: FormControl;
  public optionId: FormControl;
  public discountId: FormControl;
  public specialId: FormControl;
  public dataRequired: FormControl;
  public dateValue: FormControl;
  public checkboxRequired: FormControl;
  public optionValueId: FormControl;
  public pricePrefix: FormControl;
  public sizeBoxRequired: FormControl;
  public timeRequired: FormControl;
  public timeValue: FormControl;
  public dateTimeRequired: FormControl;
  public dateTimeValue: FormControl;
  public pincodeBasedDelivery: FormControl;
  public quotationAvailable: FormControl;
  public discountArray = [];
  public specialArray = [];
  public productDiscount: any = [];
  public discountForm: FormGroup;
  public specialForm: FormGroup;
  public seoForm: FormGroup;
  public priceForm: FormGroup;
  public shippingForm: FormGroup;
  public discountItems: FormArray;
  public specialItems: FormArray;
  public date: Date;
  // editing values
  public editId: any;
  // pagination
  public catagory: any;
  // selected category list
  public selectedCategories: any = [];
  // upload
  public uploadImage: any = [];
  // selectedCategories data in TotalCategories
  public TotalCategories: any = [];
  public filteredArray: any[];
  // product add or update api params
  private param: any = {};
  // getting values from popup
  private closeResult: any;
  private getDismissReason: any;
  // condition for product remove
  public show: boolean;
  // condition for product add or update api
  private onetimeEdit = false;
  private CategoryValue = false;
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
  // add product data
  private totalArray: any = [];
  public addOneTimeData = false;
  // search product
  private searchKeyword: string;
  private subscriptions: Array<Subscription> = [];
  public optionListArray: any = [];
  public dropdownValueArray: any = [];
  public dropDownnValue: number;
  public isFormActive: string;
  public selectedOption: any;
  public optionValidatevalue: any;
  public searchText = '';
  public updateproductdetails = [];
  public productOptions: any = [];
  public optionIdArray: any = [];
  public NewOptionID: number;
  // defaultSelected
  public defaultSelected = '--select option--';
  // ck editor
  public name = 'ng2-ckeditor';
  public ckeConfig: any;
  public mycontent: string;
  public log = '';
  public config: any;
  @ViewChild('myckeditor') ckeditor: any;
  // option form
  public selected_optionId: FormControl;
  public required: FormControl;
  public optionValue: FormArray;
  public rightOption: FormGroupName;
  public options: FormGroupName;
  public currencySymbol: any = JSON.parse(sessionStorage.getItem('adminCurrency'));

  public shippingValid = false;
  // tier price
  public tierFormArray: FormArray;
  public tierForm: FormGroup;

  public priceValid = false;
  public selectedVaraintId = [];
  public currency: any;
  public probability: any = [];
  // filter params
  public filterParams: any = {};

  public productTypeSelectedSlug: any = '';


  currentDate: Date;

  // video
  public values = '0';
  videoUrl: any = '';
  embeded = false;
  uploaded = false;
  url: any = '';
  public abc: any;
  urlSafe: any = '';
  FinalUrl: string;
  videoName: any = '';
  dateAvail: any;
  uploadedVideoUrl: any = '';
  discountstart: any;
  discountend: any;
  specialstart: any;
  specialend: any;
  productItem: any = {}
  image: any;
  minPickerDate: any;
  submittedSpecialDate = false;
  public dateError: string;
  public isRequired = false;
  public discounterror=[];
  totalPrice: any;
  constructor(
    public fb: FormBuilder,
    public productSandbox: ProductSandbox,
    public categoriessandbox: CategoriesSandbox,
    private popup: NgbModal,
    private route: ActivatedRoute,
    private changeDetectRef: ChangeDetectorRef,
    public stockStatusSandbox: StockSandbox,
    public configService: ConfigService,
    private datePipe: DatePipe,
    public router: Router,
    public domSanitizer: DomSanitizer,
    public ckeconfiqservice: CkeConfiqService,
    public toastr: ToastrManager
  ) {
    this.url = this.domSanitizer.bypassSecurityTrustUrl(this.videoUrl);
    this.config = this.ckeconfiqservice.getckeconfig();
    // this.videoUrl = this.domSanitizer.bypassSecurityTrustUrl(this.videoUrl);
    this.mycontent = `<p>My html content</p>`;
    this.route.params.subscribe(data => {
      if (data) {
        this.editId = data['id'];
      }
    });
    const pageSize = this.route.snapshot.queryParamMap.get('pageSize');
    const offset = this.route.snapshot.queryParamMap.get('offset');
    const keyword = this.route.snapshot.queryParamMap.get('keyword');
    const filterSku = this.route.snapshot.queryParamMap.get('sku');
    const filterStatus = this.route.snapshot.queryParamMap.get('status');
    const price = this.route.snapshot.queryParamMap.get('price');
    const index = this.route.snapshot.queryParamMap.get('index');


    this.filterParams.pageSize = pageSize || '';
    this.filterParams.keyword = keyword || '';
    this.filterParams.sku = filterSku || '';
    this.filterParams.offset = offset || 0;
    this.filterParams.price = price || '';
    this.filterParams.index = index || 0;
    this.filterParams.status = filterStatus || '';

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
    this.currency = JSON.parse(sessionStorage.getItem('adminCurrency'));
    this.currentDate = new Date();
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.getCategoryList();
    this.productSandbox.ClearProductDetails();
    this.initProductForm();
    this.getManufacturerList();

    if (this.editId) {
      this.productSandbox.getProductDetail({ Id: this.editId });
      this.productSandbox.productDetails$.subscribe(data => {
        this.productItem = data
      })
      this.regDetailEvent();
    } else {
      this.initDropDownList();
    }
    this.imageUrls = this.configService.getImageUrl();
    this.changeDetectRef.detectChanges();

    // calling searchoptionlist Api
    this.user.controls.tierForm.disable();


    this.stockStatusSandbox.getStockList$.subscribe(data => {
      if (data) {
      }
    })

  }
  initDropDownList() {
    this.ProductLists();
    this.getStockStausList();
  }


  // reactive form
  initProductForm() {
    this.productName = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(255)
    ]));
    this.productSlug = new FormControl('', Validators.compose([
      Validators.maxLength(255)
    ]));
    this.productDescription = new FormControl('');
    this.upc = new FormControl('', Validators.compose([
      Validators.maxLength(12)
    ]));
    this.hsn = new FormControl('', Validators.compose([
      Validators.maxLength(64)
    ]));
    this.sku = new FormControl(null, Validators.compose([
      Validators.required,
      Validators.maxLength(64)
    ]));
    this.location = new FormControl('');
    this.quantity = new FormControl('',[Validators.required]);
    this.outOfStockStatus = new FormControl(null);
    this.requiredShipping = new FormControl('');
    this.dateAvailable = new FormControl('');
    this.status = new FormControl(null, [Validators.required]);
    this.sortOrder = new FormControl('');
    this.optionId = new FormControl('');
    this.textOptionValue = new FormControl('');
    this.textRequired = new FormControl('');
    this.timeRequired = new FormControl('');
    this.timeValue = new FormControl('');
    this.dateTimeRequired = new FormControl('');
    this.dateTimeValue = new FormControl('');
    this.manufacturer = new FormControl(null, [Validators.required]);
    this.pincodeBasedDelivery = new FormControl('');
    this.quotationAvailable = new FormControl(''),
      this.checkboxRequired = new FormControl('');
    this.sizeBoxRequired = new FormControl('');
    this.dataRequired = new FormControl('');
    this.dateValue = new FormControl('');
    this.discountId = new FormControl('');
    (this.specialId = new FormControl('')),

      this.user = this.fb.group({
        productName: this.productName,
        productSlug: this.productSlug,
        productDescription: this.productDescription,
        upc: this.upc,
        sku: this.sku,
        hsn: this.hsn,
        location: this.location,
        quantity: this.quantity,
        outOfStockStatus: this.outOfStockStatus,
        dateAvailable: this.dateAvailable,
        status: this.status,
        sortOrder: this.sortOrder,
        textOptionValue: this.textOptionValue,
        textRequired: this.textRequired,
        timeRequired: this.timeRequired,
        timeValue: this.timeValue,
        dateTimeRequired: this.dateTimeRequired,
        dateTimeValue: this.dateTimeValue,
        optionId: this.optionId,
        discountId: this.discountId,
        specialId: this.specialId,
        dataRequired: this.dataRequired,
        dateValue: this.dateValue,
        manufacturer: this.manufacturer,
        pincodeBasedDelivery: this.pincodeBasedDelivery,
        quotationAvailable: this.quotationAvailable,

        tierForm: this.fb.group({
          hasTire: ['1'],
          tierFormArray: this.fb.array([])
        }),
        options: this.fb.group({
          selected_optionId: this.selected_optionId,
          rightOption: this.fb.array([])
        }),

        sizeForm: this.fb.group({
          sizeBoxRequired: this.sizeBoxRequired,
          sizeFormArray: this.fb.array([])
        }),
      });
    this.priceForm = this.fb.group({
      productPrice: ['', Validators.required],
      packingPrice: [0],
      shippingPrice: [0],
      others: [0],
    });
    this.seoForm = this.fb.group({
      metaTagTitle: [''],
      metaTagKeyword: [''],
      metaTagDescription: [''],
    });
    this.discountForm = this.fb.group({
      discountItems: this.fb.array([])
    });
    this.specialForm = this.fb.group({
      specialItems: this.fb.array([])
    });
    this.shippingForm = this.fb.group({
      requiredShipping: ['0'],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      length: ['', Validators.required],
      width: ['', Validators.required]
    });

    this.optionValue = this.user.controls['options'].get(
      'rightOption'
    ) as FormArray;
  }
  createDiscountItem(): FormGroup {
    return this.fb.group({
      discountSku: [null, Validators.required],
      disCustomerGroup: '',
      discountPriority: '',
      discountPrice: '',
      discountDateStart: ['', Validators.required],
      discountDateEnd: ['', Validators.required]
    });
  }
  createSpecialItem(): FormGroup {
    return this.fb.group({
      specialSku: [null, Validators.required],
      specialCustomerGroup: '',
      specialPriority: ['', Validators.required],
      specialPrice: ['', Validators.required],
      specialDateStart: ['', Validators.required],
      specialDateEnd: ['', Validators.required],
    });
  }
  addDiscountForm(): void {
    if (this.editId) {
      this.discountItems = this.discountForm.get('discountItems') as FormArray;
      this.discountItems.push(this.createDiscountItem());
    }

  }

  // create control for FormArray of discountFormArray
  get discountsArray() {
    return <FormArray>(
      this.discountForm.controls['discountItems']);
  }
  // create control for FormArray of specialFormArray
  get specialFormArray() {
    return <FormArray>(
      this.specialForm.controls['specialItems']);
  }

  // create control for FormArray of sizeFormArray
  get sizeArray() {
    return <FormArray>this.user.controls['sizeForm'].get('sizeFormArray');
  }

  // create control for FormArray of rappleFormArray
  get tierArray() {
    return <FormArray>this.user.controls['tierForm'].get('tierFormArray');
  }


  removeDiscountForm(index) {
    this.discountItems.removeAt(index);
  }

  addSpecialForm(): void {
    if (this.editId) {
      this.specialItems = this.specialForm.get('specialItems') as FormArray;
      this.specialItems.push(this.createSpecialItem());
    }

  }
  removeSpecialForm(index) {
    this.specialItems.removeAt(index);
  }
  specialPriceDate(i) {

    if (this.specialForm.value.specialItems[i].specialDateStart === '') {
      this.submittedSpecialDate = true;
    } else {
      this.submittedSpecialDate = false;
    }
  }

  // add tier form
  addTierForm() {
    if (this.editId) {
      this.user.controls.tierForm.enable();
      this.tierArray.push(this.addTierField());
    }
  }

  // create formArray of optionFormArray
  public addTierField() {
    return this.fb.group({
      quantity: [''],
      price: [''],
      skuName: [null]

    });
  }

  deleteTierForm(index) {
    this.tierArray.removeAt(index);
    if (this.tierArray.length === 0) {
      this.user.controls.tierForm.disable();
    }
  }



 




  // productoption data Formvalue
  public setProductOptionFormData() {

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

  subscribe() {
    this.productSandbox.productAdd$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/catalog/product'], { queryParams: this.filterParams });
      }
    });

    this.productSandbox.productUpdate$.subscribe(data => {
      if (data && data['status'] === 1) {
        this.router.navigate(['/catalog/product'], { queryParams: this.filterParams });
      }
    });
  }



  /**
   * Handles  'onSubmit' event. Calls productSandbox doProductUpdate function if (this.editId) else
   * calls productSandbox doProductAdd function.
   * @param user entire form value
   */
  onSubmit(user) {
    this.shippingValid = false;
    if (this.probability.length > 0) {
      this.probability.map((data, i) => {
 
      });
    }

    // calling
    this.setProductOptionFormData();
    this.submittedValues = true;
    this.priceValid = true;

    this.addSelecctedCategories();
    this.addProductData();
    if (this.uploadImage.length === 0) {
      this.tabset.select('10');
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }
    console.log('this.user.valid',this.user.valid,this.user.value)
    if (!this.user.valid && this.user.value.status === '' || this.user.value.manufacturer === '' || this.user.value.status === null || this.user.value.manufacturer === null || this.user.value.quantity === '') {
      this.validateAllFormFields(this.user);
      this.tabset.select('6');
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }

    if (!this.priceForm.valid || this.priceForm.value === '' || this.priceForm.value.productPrice === '0') {

      this.validateAllFormFields(this.priceForm);
      this.tabset.select('8');
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }


    if (this.shippingForm.value.requiredShipping === '1') {
      if (this.shippingForm.valid) {
      } else {
        this.shippingValid = true;
        this.tabset.select('9');
        return;
      }
    }
    if(this.discountForm.value.discountItems.length>0){
    let c=this.discountForm.value.discountItems.some((data,i)=>{
        return data?.discountPrice>=this.totalPrice
      })
      console.log('c',c)
      if(c==false){

      }else{
        this.tabset.select('8');
        return
      }

    }

    if(this.specialForm.value.specialItems.length>0){
      let c=this.specialForm.value.specialItems.some((data,i)=>{
          return data?.specialPrice>=this.totalPrice
        })
        console.log('c',c)
        if(c==false){
  
        }else{
          this.tabset.select('8');
          return
        }
  
      }

    // this.discountForm.value.discountItems.map((value,i)
    console.log('after return')
    
    // discountPrice
    

    if (this.values === '0' && this.FinalUrl !== '' && this.FinalUrl !== null) {
      this.param.productVideo = {
        'name': '',
        'path': this.FinalUrl,
        'type': 2
      }
    }

    if (this.values === '1' && this.videoName !== '') {
      this.param.productVideo = {
        'name': this.videoName,
        'path': 'video/',
        'type': 1
      }
    }


    const param: any = {};
    const categoryIds = this.TotalCategories.map(val => {
      return val.categoryId;
    });
    this.onetimeEdit = true;
    this.param.productName = user.productName;
    this.param.productSlug = user.productSlug;
    this.param.productDescription = user.productDescription;
    this.param.upc = user.upc;
    this.param.hsn = user.hsn;
    this.param.sku = user.sku;
    this.param.image = this.uploadImage;
    this.param.categoryId = categoryIds;
    this.param.relatedProductId = this.totalArray;
    this.param.location = user.location;
    this.param.quantity = user.quantity;
    this.param.outOfStockStatus = user.outOfStockStatus;
    if (this.shippingForm.value.requiredShipping) {
      this.param.requiredShipping = this.shippingForm.value.requiredShipping;
    }
    // this.param.dateAvailable = user.dateAvailable;
    // const dateSendingToServer = new DatePipe('en-US').transform(
    //   user.dateAvailable,
    //   'yyyy-MM-dd'
    // );
    const dateAvail = user.dateAvailable;
    this.param.dateAvailable = dateAvail ? (dateAvail.year) + '-' + ('0' + dateAvail.month).slice(-2) + '-' + ('0' + dateAvail.day).slice(-2) : null;
    // this.param.dateAvailable = dateSendingToServer;
    this.param.status = user.status;
    this.param.sortOrder = Number(user.sortOrder);
    this.param.price = Number(this.priceForm.controls['productPrice'].value);
    this.param.packingCost = +this.priceForm.controls['packingPrice'].value;
    this.param.shippingCost = +this.priceForm.controls['shippingPrice'].value;
    this.param.others = +this.priceForm.controls['others'].value;
    this.param.metaTagTitle = this.seoForm.controls['metaTagTitle'].value;
    this.param.metaTagKeyword = this.seoForm.controls['metaTagKeyword'].value;
    this.param.metaTagDescription = this.seoForm.controls['metaTagDescription'].value;
    this.param.width = this.shippingForm.value.width;
    this.param.height = this.shippingForm.value.height;
    this.param.length = this.shippingForm.value.length;
    this.param.weight = this.shippingForm.value.weight;
    this.param.manufacturerId = this.user.value.manufacturer;

    if (this.user.value.pincodeBasedDelivery === true || this.user.value.pincodeBasedDelivery === 1) {
      this.param.pincodeBasedDelivery = 1;
    } else {
      this.param.pincodeBasedDelivery = 0;
    }
    if (this.user.value.quotationAvailable === true || this.user.value.quotationAvailable === 1) {
      this.param.quotationAvailable = 1;
    } else {
      this.param.quotationAvailable = 0;
    }

    if (this.specialForm.valid) {

      let array = [];
      array = this.specialForm.value.specialItems.map(data => {
        const specialstarts = data.specialDateStart;
        const specialstart = specialstarts ? (specialstarts.year) + '-' + ('0' + specialstarts.month).slice(-2) + '-' + ('0' + specialstarts.day).slice(-2) : null
        const specialenddates = data.specialDateEnd;
        const specialenddate = specialenddates ? (specialenddates.year) + '-' + ('0' + specialenddates.month).slice(-2) + '-' + ('0' + specialenddates.day).slice(-2) : null
        return {
          specialCustomerGroup: data.specialCustomerGroup, skuName: data.specialSku, specialDateEnd: specialenddate,
          specialDateStart: specialstart, specialPrice: data.specialPrice, specialPriority: data.specialPriority
        };
      });
      this.param.productSpecial = array;
    }
    if (this.discountForm.valid) {
      let array = [];

      array = this.discountForm.value.discountItems.map(data => {
        const startdates = data.discountDateStart;
        const startdate = startdates ? (startdates.year) + '-' + ('0' + startdates.month).slice(-2) + '-' + ('0' + startdates.day).slice(-2) : null;
        const enddates = data.discountDateEnd;
        const enddate = enddates ? (enddates.year) + '-' + ('0' + enddates.month).slice(-2) + '-' + ('0' + enddates.day).slice(-2) : null;
        return {
          disCustomerGroup: data.disCustomerGroup, skuName: data.discountSku, discountDateEnd: enddate,
          discountDateStart: startdate, discountPrice: data.discountPrice, discountPriority: data.discountPriority
        };
      });
      this.param.productDiscount = array;
    }

    if (this.user.controls.tierForm.disabled) {
      this.param.tierPrices = [];
      this.param.hasTirePrice = 0;
    } else {
      this.param.hasTirePrice = user.tierForm.hasTire;
      this.param.tierPrices = user.tierForm.tierFormArray;
    }




    // probality options


    if (this.editId) {
      if (this.probability.length > 0) {
        const final = [];
        const prob = this.probability;


        this.param.productVarientOption = final;
        this.param.productVarient = this.selectedVaraintId;

      } else {
        this.param.productVarientOption = [];
        this.param.productVarient = [];
      }
      this.param.productId = this.editId;
      this.productSandbox.doProductUpdate(this.param);
    } else {
      if (this.probability.length > 0) {
        const final = [];
        const prob = this.probability;


        this.param.productVarientOption = final;
        this.param.productVarient = this.selectedVaraintId;

      } else {
        this.param.productVarientOption = [];
        this.param.productVarient = [];
      }
      this.productSandbox.doProductAdd(this.param);
    }
    this.subscribe();

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
    params.limit = 0;
    params.offset = 0;
    params.keyword = '';
    params.status = 1;
    params.count = 0;
    this.productSandbox.manufacturerList(params);
  }

  // calling category list api with pagination
  getCategoryList() {
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.keyword = this.catagory;
    param.sortOrder = 0;
    param.status = 1;
    this.categoriessandbox.categoryList(param);
  }

  // calling product list api with default value

  ProductLists() {
    const params: any = {};
    params.offset = 0;
    params.limit = 0;
    params.keyword = this.searchKeyword;
    params.sku = '';
    params.status = '';
    params.price = 0;
    this.productSandbox.getProductList(params);
  }

  /**
     * Handles  'searchCategory' event. Calls sandbox getCategoryList function.

     * @param catagory searchCategory input value
     */
  searchCategory(event) {
    this.catagory = event.target.value;
    this.getCategoryList();
  }

  /**
   * Handles  'selectCategory' event. Calls categoriessandbox Productremove  if (this.editId)function.
   * else Calls categoriessandbox Productremove.And push  the datas to categories list using push() method.
   * @param categoryId searchCategory input value
   * @param name searchCategory input value
   */
  selectCategory(data, i) {
    if (this.editId) {
      const param: any = {};
      param.categoryId = data.categoryId;
      param.categoryName = data.name;
      param.levels = data.levels;

      this.addOneTime = true;
      this.selectedCategories.push(param);
      this.categoriessandbox.productRemove(i);
    } else {
      this.selectedCategories.push(data);
      this.categoriessandbox.productRemove(i);
      this.show = false;
    }
    this.filteredArray = this.selectedCategories;
  }

  /**
   * Handles  'removeCategory' event. Calls categoriessandbox Productadd  if (this.editId)function.
   * else Calls categoriessandbox Productadd.And splice the datas with particular index as(i)
   * @param categoryId searchCategory input value.
   * @param name searchCategory input value.
   */
  removeCategory(data, i) {
    if (this.editId) {
      const param: any = {};
      param.categoryId = data.categoryId;
      param.levels = data.levels;
      this.addOneTime = true;
      this.categoriessandbox.productAdd(param);
      this.selectedCategories.splice(i, 1);
    } else {
      this.categoriessandbox.productAdd(data);
      this.selectedCategories.splice(i, 1);
    }
    this.filteredArray = this.selectedCategories;
  }

  /** calls productSandbox productRemoveList,
   * after pushing the product datas into selectedProducts(array)
   * @param data from selectProduct
   * @param i from selectProduct
   * **/
  selectProduct(data, i) {
    if (this.editId) {
      this.addOneTimeData = true;
    }
    this.selectedProducts.push(data);
    if (this.selectedProducts) {
    }
    this.productSandbox.productRemoveList(i);
  }

  /**
   * call productSandbox productAddList,after splice product datas in the list.
   * @params data from removeProduct
   * @param i from productAddList
   * */
  removeProduct(data, i) {
    if (this.editId) {
      this.addOneTimeData = true;
      this.selectedProducts.splice(i, 1);
      this.productSandbox.productAddList(data);
    } else {
      this.productSandbox.productAddList(data);
      this.selectedProducts.splice(i, 1);
    }
  }

  // calls ProductLists ,when  searching the  product list data
  searchProduct(event) {
    this.searchKeyword = event.target.value;
    this.ProductLists();
  }

  // push the selected data into the totalArray(array).

  addProductData() {
    this.totalArray = [];
    if (this.selectedProducts) {
      for (let i = 0; i < this.selectedProducts.length; i++) {
        if (this.selectedProducts[i] && this.selectedProducts[i].productId) {
          this.totalArray.push(this.selectedProducts[i].productId);
        }
      }
    }
  }

  /**
   * Handles  'addSelecctedCategories' event.
   *
   * storing selectedCategories data in TotalCategories
   */

  addSelecctedCategories() {
    if (this.show === true) {
      this.selectedCategories = this.filteredArray;
    }
    this.TotalCategories = this.selectedCategories;
  }

  /**
   * Handles  'searchSelectedCategory' event. And show the searched result  in the form
   *
   * @param filter searchbox  value
   */
  searchSelectedCategory(filter: String) {
    this.filteredArray = this.selectedCategories.filter(item => {
      if (
        item.name
          .toString()
          .toLowerCase()
          .indexOf(filter.toLowerCase()) !== -1
      ) {
        if (this.filteredArray != null) {
          this.show = true;
        }
        return true;
      }
      return false;
    });
  }

  // editing Product Form with product list values

  editProductForm(productDetail) {
    this.productTypeSelectedSlug = productDetail.productType;

    if (productDetail && productDetail.productVideo && productDetail.productVideo.type === 1) {
      this.videoName = productDetail.productVideo.name;
      this.values = '1';
      const baseUrl = this.configService.getBaseUrl();
      this.uploadedVideoUrl = baseUrl + '/media/video-preview-s3?name=' + this.videoName + '&path=video/';
    }

    if (productDetail && productDetail.productVideo && productDetail.productVideo.type === 2) {
      this.FinalUrl = productDetail.productVideo.path;
      if (productDetail.productVideo.path !== null) {
        const data = this.FinalUrl.split('embed/');
        this.videoUrl = data[0] + 'watch?v=' + data[1];
        this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.FinalUrl);
        this.values = '0';
      }
    }


    if (productDetail.productVarient && productDetail.productVarient.length > 0) {
      productDetail.productVarient.forEach(data => {
        this.selectedVaraintId.push(data.varientsId);
      });
    }
    this.selectedProducts = [];
    this.selectedCategories = [];
    if (productDetail.Category && productDetail.Category.length > 0) {
      this.categoriessandbox.filterCategory(productDetail.Category);
    }
    productDetail.Category.forEach(each => {
      if (each) {
        this.selectedCategories.push(each);
      }
    });
    this.changeDetectRef.detectChanges();
    this.updateproductdetails.push(productDetail);
    this.uploadImage = productDetail.productImage;
    productDetail.relatedProductDetail.forEach(each => {
      if (each) {
        this.selectedProducts.push(each);
      }
    });
    this.productName.setValue(productDetail.name);
    this.sku.setValue(productDetail.sku);
    this.upc.setValue(productDetail.upc);
    this.hsn.setValue(productDetail.hsn);


    this.priceForm.controls['productPrice'].setValue(productDetail.productCost);
    this.priceForm.controls['packingPrice'].setValue(productDetail.packingCost);
    this.priceForm.controls['shippingPrice'].setValue(productDetail.shippingCost);
    this.priceForm.controls['others'].setValue(productDetail.others);
    if (productDetail.manufacturerId) {
      this.user.controls['manufacturer'].setValue(productDetail.manufacturerId);
    }
    this.productSlug.setValue(productDetail.productSlug);


    // shipping form
    this.shippingForm.controls['width'].setValue(parseFloat(productDetail.width).toFixed());
    this.shippingForm.controls['height'].setValue(parseFloat(productDetail.height).toFixed());
    this.shippingForm.controls['weight'].setValue(parseFloat(productDetail.weight).toFixed());
    this.shippingForm.controls['length'].setValue(parseFloat(productDetail.length).toFixed());

   
    this.seoForm.controls['metaTagTitle'].setValue(
      productDetail.metaTagTitle
    );
    this.seoForm.controls['metaTagDescription'].setValue(
      productDetail.metaTagDescription
    );
    this.seoForm.controls['metaTagKeyword'].setValue(
      productDetail.metaTagKeyword
    );

    this.location.setValue(productDetail.location);
    this.quantity.setValue(productDetail.quantity);
    this.outOfStockStatus.setValue(productDetail.stockStatusId);
    this.status.setValue(productDetail.isActive);
    if (productDetail && productDetail.stockStatusId) {
      this.outOfStockStatus = productDetail.stockStatusId;
    }
    if (productDetail.shipping === 0) {
      this.shippingForm.controls['requiredShipping'].setValue('0');

    }
    if (productDetail.shipping === 1) {
      this.shippingForm.controls['requiredShipping'].setValue('1');

    }
    if (productDetail.dateAvailable) {
      const dateVals = this.datePipe.transform(productDetail.dateAvailable, 'dd-MM-yyyy').split('-');
      this.dateAvail = { day: +dateVals[0], month: +dateVals[1], year: +dateVals[2] };
    }
    this.dateAvailable.setValue(this.dateAvail);
    this.sortOrder.setValue(productDetail.sortOrder);
    // this.productDescription.setValue(productDetail.description);
    // console.log('productDetail.description',productDetail.description)
    this.productDescription.setValue(this.htmlTagConversion(productDetail.description));
    console.log('html',this.htmlTagConversion(productDetail.description))

    // this.productDescription.setValue(val);



    if (productDetail.pincodeBasedDelivery === 1) {
      this.user.controls['pincodeBasedDelivery'].setValue(true);
    } else {
      this.user.controls['pincodeBasedDelivery'].setValue(false);
    }

    if (productDetail.quotationAvailable === 1) {
      this.user.controls['quotationAvailable'].setValue(true);
    } else {
      this.user.controls['quotationAvailable'].setValue(false);
    }
    // setting product dicount form array
    if (
      productDetail.productDiscount.length > 0 &&
      productDetail.productDiscount[0].productDiscountId
    ) {


      this.discountItems = <FormArray>(
        this.discountForm.controls['discountItems']
      );

      if (productDetail.productDiscount.length > 0) {
        this.discountForm.enable();
        this.discountsArray.removeAt(0);
        productDetail.productDiscount.forEach(data => {
          // const tempstartDate = this.datePipe.transform(
          //   data.dateStart,
          //   'yyyy-MM-dd'
          // );
          // const tempendDate = this.datePipe.transform(
          //   data.dateEnd,
          //   'yyyy-MM-dd'
          // );
          if (data.dateStart) {
            const discountstarts = this.datePipe.transform(data.dateStart, 'dd-MM-yyyy').split('-');
            this.discountstart = { day: +discountstarts[0], month: +discountstarts[1], year: +discountstarts[2] };
          }

          if (data.dateEnd) {
            const discountends = this.datePipe.transform(data.dateEnd, 'dd-MM-yyyy').split('-');
            this.discountend = { day: +discountends[0], month: +discountends[1], year: +discountends[2] };
          }


          const tempPrice = parseInt(data.price, 10).toFixed();
          this.discountItems.push(
            this.fb.group({
              discountId: data.productDiscountId,
              disCustomerGroup: 1,
              discountQuantity: data.quantity,
              discountPriority: data.priority,
              discountPrice: tempPrice,
              discountDateStart: this.discountstart,
              discountDateEnd: this.discountend,
              discountSku: data.skuName

            })
          );
        });



      }
    }

    if (
      productDetail.productSpecialPrice.length > 0 &&
      productDetail.productSpecialPrice[0].productSpecialId
    ) {
      this.specialItems = <FormArray>(
        this.specialForm.controls['specialItems']);
      if (productDetail.productSpecialPrice.length > 0) {

        this.specialForm.enable();
        this.specialFormArray.removeAt(0);
        productDetail.productSpecialPrice.forEach(value => {
          // const tempstartDate = this.datePipe.transform(
          //   value.dateStart,
          //   'yyyy-MM-dd'
          // );
          // const tempendDate = this.datePipe.transform(
          //   value.dateEnd,
          //   'yyyy-MM-dd'
          // );
          if (value.dateStart) {
            const specialstarts = this.datePipe.transform(value.dateStart, 'dd-MM-yyyy').split('-');
            this.specialstart = { day: +specialstarts[0], month: +specialstarts[1], year: +specialstarts[2] };
          }

          if (value.dateEnd) {
            const specialends = this.datePipe.transform(value.dateEnd, 'dd-MM-yyyy').split('-');
            this.specialend = { day: +specialends[0], month: +specialends[1], year: +specialends[2] };
          }

          const tempPrices = parseInt(value.price, 10).toFixed();

          this.specialItems.push(
            this.fb.group({
              specialId: value.productSpecialId,
              specialCustomerGroup: 1,
              specialPriority: value.priority,
              specialPrice: tempPrices,
              specialDateStart: this.specialstart,
              specialDateEnd: this.specialend,
              specialSku: value.skuName

            })
          );
        });
      }
    }

    // set tier value into tier array form
    if (
      productDetail.productTirePrices.length > 0 &&
      productDetail.productTirePrices[0].id
    ) {
      this.user.controls.tierForm.enable();

      const tierFormControl = <FormArray>(
        this.user.controls['tierForm'].get('tierFormArray'));
      this.tierArray.removeAt(0);
      productDetail.productTirePrices.forEach(value => {
        tierFormControl.push(
          this.fb.group({
            quantity: value.quantity,
            price: value.price,
            skuName: value.skuName

          })
        );
      });
    }



    if (productDetail.hasTirePrice === 1) {
      this.user.controls.tierForm['controls']['hasTire'].setValue('1');
    } else {
      this.user.controls.tierForm['controls']['hasTire'].setValue('0');
    }

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
        if (result && result.length > 0) {
          const lengthOfUploadImage: number = this.uploadImage.length;

          result.forEach(data => {
            this.image = data.image;
            if (data) {
              this.uploadImage.push(data);
            }
          });

          this.length = 0;
          // make non default value
          if (this.uploadImage.length > 1 && !this.editId) {
            for (let i = 0; i < this.uploadImage.length; i++) {
              if (i === 0) {
                this.uploadImage[i].defaultImage = 1;
              } else {
                this.uploadImage[i].defaultImage = 0;
              }
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
  deleteImage(i,length) {
    this.uploadImage.splice(i, 1);
    if(length>=1 && i>=1){
      this.length=i-1;
    }
    if(length==1 && i==0){
      this.length=0;
    }
    if(length<0 && i==0){
      this.length=0;
    }
    if(length>0 && i==0){
      this.length=length-1;
    }
    if(length==0 && i==0){
      this.length=0;
    }
    if(length == undefined){
      this.length=i-1; 
    }
    if(this.length==-1 && length==undefined){
      this.length=0;
    }
    this.checkBox('',this.length);
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
      if (index === i) {
        this.length = index;
        this.uploadImage[i].defaultImage = 1;
      } else {
        this.length = index;
        this.uploadImage[i].defaultImage = 0;
      }
    }
  }


  uploadOptionImage(event, options, i) {
    const modalRef = this.popup.open(ImagemanagerpopupComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    // Make the first image as default  selected.
    modalRef.result.then(
      result => {

        if (result) {
          this.addImageToOptions(result, options, i);
        }
        this.changeDetectRef.detectChanges();
        this.closeResult = `Closed with: ${'result'}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  // image upload and base64 convert section
  uploadVideo(event) {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }
  uploadVideoFinal(e) {
    if (e.target.files[0]?.size > 50000000) {
      this.toastr.errorToastr('please upload a video less than 50MB');
    } else {

      this.videoName = e.target.files[0].name;
      const params: any = {};
      params.file = this.videoName;
      params.path = '';
      // this.productSandbox.videoUpload(params);
      const formData = new FormData();
      formData.append('file', e.target.files[0], e.target.files[0].name);
      this.productSandbox.videoUpload(formData);
      this.embeded = false;
      this.uploaded = true;
      this.subscriptions.push(this.productSandbox.videoUpload$.subscribe(data => {

        if (data && data.status === 1) {
          // this.changeDetectRef.detectChanges();

          const params: any = {};
          params.name = data.data.image;
          this.videoName = data.data.image;
          params.path = 'video/';
          // this.productSandbox.videoPreview(params);
          const baseUrl = this.configService.getBaseUrl();
          this.uploadedVideoUrl = baseUrl + '/media/video-preview-s3?name=' + this.videoName + '&path=video/';
          // http://13.127.212.232/backend/api/media/video-preview-s3?name=hi.mp4&path=video/
        }
      }));



    }



  }

  addImageToOptions(image, option, index) {
    const params: any = {};
    params.image = image[0];
    const array = [];
  }




  embed(url) {
    if (url !== '') {
      const data = url.split('watch?v=');
      this.FinalUrl = data[0] + 'embed/' + data[1];


      this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.FinalUrl);
      // this.urlSafe = URL.changingThisBreaksApplicationSecurity;
      // this.urlSafe = this.domSanitizer.bypassSecurityTrustUrl(url);
      this.embeded = true;
      this.uploaded = false;
    }



  }




  videoremove() {
    this.videoUrl = '';
    this.urlSafe = '';
    this.values = '0';
    this.embeded = false;
    this.FinalUrl = '';
    this.videoName = '';
  }
  videofileremove() {
    this.videoName = '';
    this.uploadedVideoUrl = '';
    this.uploaded = false;
    this.values = '1';
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  htmlTagConversion(data){
    const val = data.replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;','"')
    .replaceAll('&#39;',"'")
    .replaceAll('&sbquo;','‚')
    .replaceAll('&#61;','=')
    .replaceAll('&#45;','-')
    .replaceAll('&hellip;','…')
    .replaceAll('&commat;','@')
    .replaceAll('&copy;','©')
    .replaceAll('&#35;','#')
    .replaceAll('&ldquo;','“')
    .replaceAll('&rsquo;','’')
    .replaceAll('&lsquo;','‘')
    .replaceAll('&trade;','™')
    .replaceAll('&reg;','®')
    .replaceAll('&ndash;','–')
    .replaceAll('&eacute;','é')
    .replaceAll('&euro;','€')
    .replaceAll('&pound;','£');
     return  val ;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
}
