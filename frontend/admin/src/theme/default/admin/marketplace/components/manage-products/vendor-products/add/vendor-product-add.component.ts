/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { FormArray } from '@angular/forms';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { NgbModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormGroupName
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
// Store Module
import { ImagemanagerpopupComponent } from '../../../../../shared/model-popup/ImageManagerPopup/imagemanagerpopup.component';
import { VendorProductSandbox } from '../../../../../../../../core/admin/vendor/pages/vendor-product/vendor-product.sandbox';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { TaxSandbox } from '../../../../../../../../core/admin/settings/localizations/tax/tax.sandbox';
import { ProductSandbox } from 'src/core/admin/catalog/product/product.sandbox';
import { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { VendorProductService } from 'src/core/admin/vendor/pages/vendor-product/vendor-product.service';
 import { CountriesRoutingModule } from 'src/theme/default/admin/settings/components/localizations/countries/countries.routing';


@Component({
  selector: 'app-vendor-product-add',
  templateUrl: 'vendor-product-add.component.html',
  styleUrls: ['vendor-product-add.component.scss']
})
export class VendorProductAddComponent implements OnInit, OnDestroy {


  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('filePath') public filePath: ElementRef;
  public venId: any;
  public id: any;
  @ViewChild(NgbNav)
  private tabset: NgbNav;
  public dropDownnArray: any = [];
  public user: FormGroup;
  public sizeFormArray: FormArray;
  public vendorId = new FormControl();
  public productName: FormControl;
  public productSlug: FormControl;
  public productDescription: FormControl;

  // tier price
  public tierFormArray: FormArray;
  public tierForm: FormGroup;

  public upc: FormControl;
  public hsn: FormControl;
  public sku: FormControl;
  public discountArray = [];
  public specialArray = [];
  public location: FormControl;
  public minimumQuantity: FormControl;
  public quantity: FormControl;
  public subtractStock: FormControl;
  public dateAvailable: FormControl;
  public sortOrder: FormControl;
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
  public TextBoxRequired: FormControl;
  public quotationAvailable: FormControl;

  public shippingValid = false;

  public date: Date;
  public editId: any;
  public values: any = '0';
  // pagination
  public catagory: any;
  // selected category list
  public selectedCategories: any = [];
  public selectedCategoryList: any = [];
  // upload
  public uploadImage: any = [];
  // selectedCategories data in TotalCategories
  public TotalCategories: any = [];
  public filteredArray: any[];
  // product add or update api params
  private param: any = {};
  public value: any;
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
  public isSaved:boolean  =false
  
  private totalArray: any = [];
  public addOneTimeData = false;
  private searchKeyword: string;
  private subscriptions: Array<Subscription> = [];
  public optionListArray: any = [];
  public dropdownValueArray: any = [];
  public dropDownnValue: number;
  public isFormActive: string;
  public selectedOption: any;
  public optionValidatevalue: any;
  public currencySymbol: any = JSON.parse(sessionStorage.getItem('adminCurrency'));
  public updateproductdetails = [];
  public searchText = '';
  public productOptions: any = [];
  public productDiscount: any = [];
  public optionIdArray: any = [];
  public NewOptionID: number;
  public keyword = '';
  public defaultSelected = '--select option--';
  public name = 'ng2-ckeditor';
  public ckeConfig: any;
  public mycontent: string;
  public log = '';
  public ratingImage = {};
  public ratingVal = 3.4;
  @ViewChild('myckeditor') ckeditor: any;
  public discountForm: FormGroup;
  public specialForm: FormGroup;
  public seoForm: FormGroup;
  public discountItems: FormArray;
  public specialItems: FormArray;
  // option form

  public required: FormControl;
  public optionValue: FormArray;
  public rightOption: FormGroupName;
  public options: FormGroupName;
  public option: any[];
  public priceForm: FormGroup;
  public filteredOptions: Observable<any[]>;
  public firstName: '';
  public vendorLoading = false;
  // tax variables
  public taxType = '1';
  public taxValue: any;
  public taxArray: any;
  public taxPercentage: any;
  public currentTaxId: any;
  public grossTotal: number;
  public totalPrice: number;

  // options vriable

  public selectedVaraintId = [];
  public currency: any;

  public optionImageArray: any = [];
  public optionValueArray: any = [];
  public toggleArray: any = [];
  public productTypeSelectedSlug: any = '';
  public config: any;
  FinalUrl: any = '';
  urlSafe: any = '';
  embeded = false;

  uploaded = false;
  videoName: any = '';
  discountstartsdate: any;
  discountsendsdate: any;
  specialstarts: any;
  specialends: any;
  dateavail: any;
  // attributes
  public attributeFormArray: FormArray;
  public attributeForm: FormGroup;
  videoUrl: string;
  uploadedVideoUrl: any = '';
  item: any = {};
  image: any;
  minPickerDate: any;
  public active = 1;
  VarientSkuArrayList: any = [];
  queryDetails: any = {};
  translateName: any;
  translate: any;

  constructor(
    private configService: ConfigService,
    public router: Router,
    private modalService: NgbModal,
    private modalService2: NgbModal,
    public fb: FormBuilder,
    public productSandbox: VendorProductSandbox,
    private popup: NgbModal,
    private changeDetectRef: ChangeDetectorRef,
    public domSanitizer: DomSanitizer,
    private datePipe: DatePipe,
    public toastr: ToastrService,
    private route: ActivatedRoute, public taxSandbox: TaxSandbox,
    private ckeconfiqservice: CkeConfiqService,public Service:VendorProductService

  ) {
    const offset = this.route.snapshot.queryParamMap.get("offset");
    const index = this.route.snapshot.queryParamMap.get("index");
    this.queryDetails.offset = offset || 0;
    this.queryDetails.index = index || 0;
    this.config = this.ckeconfiqservice.getckeconfig();
    this.vendorLoading = true;
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.name = '';
    param.email = '';
    param.status = '';
    param.count = 0;
  this.Service.sellerList(param).subscribe(list=>{
    if(list!=undefined){
      this.vendorLoading = false;
        this.option = list.data;
        this.filteredOptions = this.vendorId.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }
  })
  
    this.editId = this.route.snapshot.paramMap.get('id');

  }


  ngOnInit() {
    this.getTaxlist();
    this.getVendorList();
    this.initProductForm();
    this.catLists();
    this.getVendorId(event);
    this.productSandbox.ClearProductDetails();
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
  
    this.subscriptions.push(
      this.taxSandbox.taxList$.subscribe(data => {
        if (data) {
          this.taxArray = data;
        }
      })
    );
    // calling ProductDetail
    if (this.editId) {
      this.productSandbox.getProductDetail({ Id: this.editId });
      this.regDetailEvent();
    } else {
      this.initDropDownList();
    }
    this.imageUrls = this.configService.getImageUrl();
    this.changeDetectRef.detectChanges();

    this.user.controls.tierForm.disable();
    this.user.controls.attributeForm.disable();

    // ck editor
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      height: '100%'
    };
    this.getProductRatingList();
    this.priceForm = this.fb.group({
      productPrice: ['', Validators.required],
      packingPrice: [0],
      shippingPrice: [0],
      tax: [0],
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
  }

 
  createDiscountItem(): FormGroup {
    return this.fb.group({
      disCustomerGroup: '',
      discountPriority: '',
      discountPrice: '',
      discountDateStart: '',
      discountDateEnd: '',
      discountSku: [this.sku.value, Validators.required],
      discountvarprice: ['']

    });
  }

  createSpecialItem(): FormGroup {
    return this.fb.group({
      specialCustomerGroup: '',
      specialPriority: '',
      specialPrice: '',
      specialDateStart: '',
      specialDateEnd: '',
      specialSku: [this.sku.value, Validators.required],
      specialvarprice: ['']
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

  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return item.firstName.toLowerCase().indexOf(term) > -1 || item.lastName.toLowerCase().indexOf(term) > -1
      || item.email.toLowerCase().indexOf(term) > -1 || item.mobileNumber.toLowerCase().indexOf(term) > -1;
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.option.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);
  }

  initDropDownList() {
    this.getSkuList();
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // reactive form
  initProductForm() {
    this.vendorId = new FormControl(null, [Validators.required]);
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
    this.sku = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(64)
    ]));
    this.hsn = new FormControl('', Validators.compose([
      Validators.maxLength(8),
      Validators.minLength(2)
    ]));

    this.location = new FormControl('');
    this.quantity = new FormControl('', Validators.required);
    this.dateAvailable = new FormControl('');
    this.sortOrder = new FormControl('');
    this.optionId = new FormControl('');
    this.textOptionValue = new FormControl('');
    this.textRequired = new FormControl('');
    this.timeRequired = new FormControl('');
    this.timeValue = new FormControl('');
    this.dateTimeRequired = new FormControl('');
    this.quotationAvailable = new FormControl(''),

      this.dateTimeValue = new FormControl('');
    this.checkboxRequired = new FormControl('');
    this.sizeBoxRequired = new FormControl('');
    this.pincodeBasedDelivery = new FormControl('');
    this.dataRequired = new FormControl('');
    this.dateValue = new FormControl('');
    this.discountId = new FormControl('');
    (this.specialId = new FormControl('')),
      (this.TextBoxRequired = new FormControl(''));

    this.user = this.fb.group({
      vendorId: this.vendorId,
      productName: this.productName,
      productSlug: this.productSlug,
      quantity: this.quantity,
      productDescription: this.productDescription,
      upc: this.upc,
      hsn: this.hsn,
      sku: this.sku,
      location: this.location,
      dateAvailable: this.dateAvailable,
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
      pincodeBasedDelivery: this.pincodeBasedDelivery,
      quotationAvailable: this.quotationAvailable,

      sizeForm: this.fb.group({
        sizeBoxRequired: this.sizeBoxRequired,
        sizeFormArray: this.fb.array([])
      }),
      tierForm: this.fb.group({
        hasTire: ['1'],
        tierFormArray: this.fb.array([])
      }),

      attributeForm: this.fb.group({
        attributeFormArray: this.fb.array([])
      }),
    });


  }

  

  // create control for FormArray of sizeFormArray
  get sizeArray() {
    return <FormArray>this.user.controls['sizeForm'].get('sizeFormArray');
  }
  // create control for FormArray of attributes
  get attributeArray() {
    return <FormArray>this.user.controls['attributeForm'].get('attributeFormArray');
  }

  // attributes
  addAttributeForm() {
    this.user.controls.attributeForm.enable();
    this.attributeArray.push(this.addAttributeField());
  }

  // create formArray of optionFormArray
  public addAttributeField() {
    return this.fb.group({
      attributeId: [null],
      text: ['']
    });
  }

  deleteAttributeForm(index) {
    this.attributeArray.removeAt(index);
    if (this.attributeArray.length === 0) {
      this.user.controls.attributeForm.disable();
    }
  }

  // create control for FormArray of rappleFormArray
  get tierArray() {
    return <FormArray>this.user.controls['tierForm'].get('tierFormArray');
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
      quantity: ['', Validators.required],
      price: [''],
      skuName: [this.sku.value]

    });
  }

  deleteTierForm(index) {
    this.tierArray.removeAt(index);
    if (this.tierArray.length === 0) {
      this.user.controls.tierForm.disable();
    }
  }



  /**
   * Handles  'onSubmit' event. Calls productSandbox doProductUpdate function if (this.editId) else
   * calls productSandbox doProductAdd function.
   * @param user entire form value
   */
  onSubmit(user) {
   
    this.shippingValid = false;
    this.isSaved = true;

    this.addSelecctedCategories();
    this.submittedValues = true;
   if (!this.sku.valid) {
          return;
    }
    if (!this.user.controls['vendorId'].valid) {
    

      return;
    }
    if (!this.user.controls['productName'].valid) {
      return;
    }
    if (this.TotalCategories.length == 0) {
      this.active = 1
      this.toastr.error('Please select the category');
      window.scrollTo(0, document.body.scrollHeight);
      return
    }
    if (!this.user.valid && this.user.value.quantity === '') {
      this.validateAllFormFields(this.user);
      this.active = 13;
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }
    if (!this.hsn.valid) {
      this.active = 13;
      return;
    }
    if (this.uploadImage.length === 0) {
      this.active = 10;
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }
    if (this.priceForm.value.productPrice === '0' || this.priceForm.value.productPrice == '') {
      this.validateAllFormFields(this.priceForm);
      this.active = 8;
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }

    if (!this.seoForm.valid) {
      this.validateAllFormFields(this.seoForm);
      this.active = 6;
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }

    // Tier Form Array Validation
    if (this.user.controls.tierForm.value.tierFormArray.length > 0) {
      let c = this.user.controls.tierForm.value.tierFormArray.some((data, i) => {
        return data?.quantity == "" || data?.skuName == null || data?.price == ""
      })
      if (c == false) {

      } else {
        this.active = 16
        window.scrollTo(0, document.body.scrollHeight);  

        return
      }
    }


    if (this.editId) {
      if (this.user.controls.tierForm.value.tierFormArray.length > 0) {
        if (!this.user.controls.tierForm.valid) {
          this.active = 16
          window.scrollTo(0, document.body.scrollHeight);
          return
        }
      }
    }

    // Discount Form Array Validation

    if (this.discountForm.value.discountItems.length > 0) {
      if (!this.discountForm.valid) {
        this.active = 8;
        window.scrollTo(0, document.body.scrollHeight);
        return
      }
    }

    if (this.discountForm.value.discountItems.length > 0) {
      let discountformvalid = this.discountForm.value.discountItems.some((data, i) => {
        return data?.discountDateEnd == "" || data?.discountSku == null || data?.discountPrice == "" || data?.discountPriority == "" || data?.discountDateStart == "" || data?.discountPrice >= this.totalPrice
      })
      if (discountformvalid == false) {

      } else {
        this.active = 8;
        window.scrollTo(0, document.body.scrollHeight);
        return
      }
    }

    // Special Form Array Validation


    if (this.specialForm.value.specialItems.length > 0) {
      if (this.specialForm.valid) {
        this.active = 8;
        window.scrollTo(0, document.body.scrollHeight);
        return
      }
    }


    if (this.specialForm.value.specialItems.length > 0) {
      let specialformvalid = this.specialForm.value.specialItems.some((data, i) => {
        return data?.specialDateEnd == "" || data?.specialSku == null || data?.specialPrice == "" || data?.specialPriority == "" || data?.specialDateStart == "" || data?.specialPrice>=this.totalPrice
      })
      if (specialformvalid )  {
        this.active = 8;
        window.scrollTo(0, document.body.scrollHeight);
        return
      }
    }

    const param: any = {};
    const categoryIds = this.TotalCategories.map(val => {
      return val.categoryId;
    });
    this.discountForm.controls['discountItems'].value.forEach(data => {
      if (data.discountPrice !== '') {

        const startdates = data.discountDateStart;
        const startdate = startdates ? (startdates.year) + '-' + ('0' + startdates.month).slice(-2) + '-' + ('0' + startdates.day).slice(-2) : null;
        const enddates = data.discountDateEnd;
        const enddate = enddates ? (enddates.year) + '-' + ('0' + enddates.month).slice(-2) + '-' + ('0' + enddates.day).slice(-2) : null;
        const tempPrice = parseInt(data.discountPrice, 10).toFixed();
        this.discountArray.push(
          {
            disCustomerGroup: 1,
            discountPriority: data.discountPriority,
            discountPrice: tempPrice,
            discountDateStart: startdate,
            discountDateEnd: enddate,
            discountvarprice: data.discountvarprice
          }
        );
      }
    });

    if (this.user.value.quotationAvailable === true || this.user.value.quotationAvailable === 1) {
      param.quotationAvailable = 1;
    } else {
      param.quotationAvailable = 0;
    }

    if (this.values === '0' && this.FinalUrl !== '' && this.videoUrl !== '') {


      param.productVideo = {
        'name': '',
        'path': this.FinalUrl,
        'type': 2
      };
    }


    if (this.values === '1' && this.videoName !== '') {

      param.productVideo = {
        'name': this.videoName,
        'path': 'video/',
        'type': 1
      };
    }

    this.specialForm.controls['specialItems'].value.forEach(data => {
      if (data.specialPrice !== '') {

        const specialstartdate = data.specialDateEnd;
        const specialstart = specialstartdate ? (specialstartdate.year) + '-' + ('0' + specialstartdate.month).slice(-2) + '-' + ('0' + specialstartdate.day).slice(-2) : null;
        const specialenddate = data.specialDateEnd;
        const specialend = specialenddate ? (specialenddate.year) + '-' + ('0' + specialenddate.month).slice(-2) + '-' + ('0' + specialenddate.day).slice(-2) : null;
        const tempPrice = parseInt(data.specialPrice, 10).toFixed();
        this.specialArray.push(
          {
            specialGroup: 1,
            specialPriority: data.specialPriority,
            specialPrice: tempPrice,
            specialDateStart: specialstart,
            specialDateEnd: specialend
          }
        );
      }
    });
    this.onetimeEdit = true;
    param.productName = user.productName;
    param.productSlug = user.productSlug;
    param.productDescription = user.productDescription;
    param.upc = user.upc;
    param.hsn = user.hsn;
    param.sku = user.sku;
    param.image = this.uploadImage;
    param.quantity = user.quantity;
    param.categoryId = categoryIds;
    param.price = Number(this.priceForm.controls['productPrice'].value);
    param.packingCost = +this.priceForm.controls['packingPrice'].value;
    param.shippingCost = +this.priceForm.controls['shippingPrice'].value;
    param.tax = this.taxType === '2' ? this.currentTaxId : this.taxValue;
    param.taxType = Number(this.taxType);
    param.others = +this.priceForm.controls['others'].value;
    param.metaTagTitle = this.seoForm.controls['metaTagTitle'].value;
    param.metaTagKeyword = this.seoForm.controls['metaTagKeyword'].value;
    param.metaTagDescription = this.seoForm.controls['metaTagDescription'].value;

    if (this.specialArray.length > 0) {
      let array = [];
      array = this.specialForm.value.specialItems.map(data => {
        const startdates = data.specialDateStart;
        const specialsstartdate = startdates ? (startdates.year) + '-' + ('0' + startdates.month).slice(-2) + '-' + ('0' + startdates.day).slice(-2) : null;
        const enddates = data.specialDateEnd;
        const specialsenddate = enddates ? (enddates.year) + '-' + ('0' + enddates.month).slice(-2) + '-' + ('0' + enddates.day).slice(-2) : null;
        return {
          specialCustomerGroup: data.specialCustomerGroup, skuName: data.specialSku, specialDateEnd: specialsenddate,
          specialDateStart: specialsstartdate, specialPrice: data.specialPrice, specialPriority: data.specialPriority
        };
      });
      param.productSpecial = array;
    }
    if (this.discountArray.length > 0) {
      let array = [];
      array = this.discountForm.value.discountItems.map(data => {
        const startdates = data.discountDateStart;
        const discountssstartdate = startdates ? (startdates.year) + '-' + ('0' + startdates.month).slice(-2) + '-' + ('0' + startdates.day).slice(-2) : null;
        const enddates = data.discountDateEnd;
        const discountssenddate = enddates ? (enddates.year) + '-' + ('0' + enddates.month).slice(-2) + '-' + ('0' + enddates.day).slice(-2) : null;
        return {
          disCustomerGroup: data.disCustomerGroup, skuName: data.discountSku, discountDateEnd: discountssenddate,
          discountDateStart: discountssstartdate, discountPrice: data.discountPrice, discountPriority: data.discountPriority,
        };
      });
      param.productDiscount = array;
    }

    if (this.user.controls.tierForm.disabled) {
      param.tierPrices = [];
      param.hasTirePrice = 0;
    } else {
      param.hasTirePrice = user.tierForm.hasTire;
      param.tierPrices = user.tierForm.tierFormArray;
    }
    param.location = user.location;
    const dates = user.dateAvailable;
      param.dateAvailable = dates ? (dates.year) + '-' + ('0' + dates.month).slice(-2) + '-' + ('0' + dates.day).slice(-2) : this.minPickerDate.year + '-' + this.minPickerDate.month + '-' + this.minPickerDate.day;


    param.sortOrder = Number(user.sortOrder);


    if (this.dropDownnArray.length === 0) {
      param.productOptions = [];
    } else {
      param.productOptions = user.options.rightOption;
    }

    if (this.user.value.pincodeBasedDelivery === true || this.user.value.pincodeBasedDelivery === 1) {
      this.param.pincodeBasedDelivery = 1;
      param.pincodeBasedDelivery = 1;
    } else {
      this.param.pincodeBasedDelivery = 0;
      param.pincodeBasedDelivery = 0;
    }

    if (this.user.controls.attributeForm.disabled) {
      param.productAttribute = [];
    } else {
      param.productAttribute = user.attributeForm.attributeFormArray;
    }






    // probality options

    if (this.editId) {
        param.productVarientOption = [];
        param.productVarient = [];
      param.productId = this.editId;
      param.productName = user.productName;
      param.vendorId = this.id ? param.vendorId = this.id : this.venId;
      this.productSandbox.doProductUpdate(param);
    
     
    } else {
        param.productVarientOption = [];
        param.productVarient = [];
        param.vendorId = this.id;
        this.productSandbox.doProductAdd(param);
      }
      this.subscribe()

  }


  regDetailEvent() {
    this.CategoryValue = true;
    this.subscriptions.push(
      this.productSandbox.productDetails$.subscribe(data => {
        if (data && Object.keys(data).length > 0) {
          this.editProductForm(data);
          this.initDropDownList();
        }
      })
    );
  }
  subscribe(){
    this.productSandbox.productUpdate$.subscribe((res:any) => {
      if (res && res['status'] === 1) {
        this.router.navigate(['/vendors/manage-products/vendor-products'], { queryParams: this.queryDetails });
      }
    })
  }
  

  catLists() {
    const params: any = {};
    params.offset = 0;
    params.limit = 0;
    params.count = 0;
    params.category = this.catagory;
    this.productSandbox.catlist(params);
   
     this.productSandbox.getCatListResponse$.subscribe((data) => {});
  }

  getVendorId(event) {
    this.getVendorList();
  }

  getCategory(event) {
    if (event) {
      this.id = event.vendorId;
      const param: any = {};
      param.vendorId = event.customerId;
      this.productSandbox.catlist(param);
     
     
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  getVendorList() {
    this.vendorLoading = true;
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.name = '';
    param.email = '';
    param.status = '';
    param.count = 0;
    param.approvalFlag = 1;
    this.productSandbox.sellerList(param);
    
  }

  /**
     * Handles  'searchCategory' event. Calls sandbox getCategoryList function.

     * @param catagory searchCategory input value
     */
  searchCategory(event) {
    this.catagory = event.target.value;
    this.catLists();
  }

  selectCategory(data, i) {
    if (!this.editId) {
      this.show = false;
    }
    this.selectedCategories.push(data);
    this.filteredArray = this.selectedCategories;
    const params: any = {};
    params.list = data;
    this.productSandbox.selectCategoryList(params);
    this.selectedCategoryList = this.selectedCategories;
  }

  removeCategory(data, i) {

    if (this.selectedCategories && this.selectedCategories.length > 0) {
      this.selectedCategories = this.selectedCategories.filter(item => {
        if (item.categoryId === data.categoryId) {
          return false;
        } else {
          return true;
        }
      });
      const params: any = {};
      params.list = data;
      this.productSandbox.removeCategoryList(params);
    }
    this.selectedCategoryList = this.selectedCategories;
  }

  addSelecctedCategories() {
    this.TotalCategories = this.selectedCategoryList;
  }

  searchSelectedCategory(filter: String) {
    let value = filter.toLocaleLowerCase();
    this.selectedCategories = this.selectedCategoryList.filter(val => val.name.toLowerCase().includes(value));
  }

  /** calls productSandbox productRemoveList,
   * after pushing the product datas into selectedProducts(array)
   * @param data from selectProduct
   * @param i from selectProduct
   * **/
  

  /**
   * call productSandbox productAddList,after splice product datas in the list.
   * @params data from removeProduct
   * @param i from productAddList
   * */
  

  searchProduct(event) {
    this.searchKeyword = event.target.value;
    this.catLists();
  }





  editProductForm(productDetail) {
    this.item = productDetail;
    this.getSkuList();
    if (productDetail && productDetail.productVideo && productDetail.productVideo.type === 1) {
      this.videoName = productDetail.productVideo.name;
      this.values = '1';
      const baseUrl = this.configService.getBaseUrl();
      this.uploadedVideoUrl = baseUrl + '/media/video-preview-s3?name=' + this.videoName + '&path=video/';
    }

    if (productDetail && productDetail.productVideo && productDetail.productVideo.type === 2) {
      if (productDetail.productVideo.path !== null) {
        this.FinalUrl = productDetail.productVideo.path;
        const data = this.FinalUrl.split('embed/');
        this.videoUrl = data[0] + 'watch?v=' + data[1];
        this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.FinalUrl);
        this.values = '0';
      }

    }
    this.selectedCategories = JSON.parse(JSON.stringify(productDetail.Category));
    if (this.selectedCategories && this.selectedCategories.length > 0) {
      this.selectedCategories = this.selectedCategories.map(data => {
        if (data) {
          return data;
        }
      });
      this.selectedCategoryList = this.selectedCategories;
    }
    this.changeDetectRef.detectChanges();
    this.updateproductdetails.push(productDetail);
    this.uploadImage = productDetail.productImage;
    if (this.editId) {
      this.quantity = new FormControl('', [Validators.required]);
      this.dateAvailable = new FormControl('',[Validators.required]);
     
  
    }
  
    this.priceForm.controls['productPrice'].setValue(productDetail.productCost);
    this.priceForm.controls['packingPrice'].setValue(productDetail.packingCost);
    this.priceForm.controls['shippingPrice'].setValue(productDetail.shippingCost);
    this.priceForm.controls['others'].setValue(productDetail.others);
    this.productSlug.setValue(productDetail.productSlug);

    if (productDetail.quotationAvailable === 1) {

      this.user.controls['quotationAvailable'].setValue(true);
    } else {
      this.user.controls['quotationAvailable'].setValue(false);

    }

    // set tier value into tier array form
    if (productDetail && productDetail.productTirePrices &&
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

    // set attribute value into tier array form
    if (
      productDetail.productAttribute?.length > 0 &&
      productDetail.productAttribute[0]?.id
    ) {
      this.user.controls.attributeForm.enable();

      const attributeFormControl = <FormArray>(
        this.user.controls['attributeForm'].get('attributeFormArray'));
      this.attributeArray.removeAt(0);
      productDetail.productAttribute.forEach(value => {
        attributeFormControl.push(
          this.fb.group({
            attributeId: value.attributeId,
            text: value.text,
          })
        );
      });
    }

    if (productDetail.hasTirePrice === 1) {

      this.user.controls.tierForm['controls']['hasTire'].setValue('1');
    } else {
      this.user.controls.tierForm['controls']['hasTire'].setValue('0');
    }

    this.taxType = String(productDetail.taxType);
    if (productDetail.taxType === 2) {
      this.currentTaxId = productDetail.tax;
      this.getTaxPercentage(this.currentTaxId);
    } else {
      this.taxValue = productDetail.tax !== 0 ? productDetail.tax : null;
    }
    this.getTotalPrice();
    this.getGrossTotal();
    this.seoForm.controls['metaTagTitle'].setValue(
      productDetail.metaTagTitle
    );
    this.seoForm.controls['metaTagDescription'].setValue(
      productDetail.metaTagDescription
    );
    this.seoForm.controls['metaTagKeyword'].setValue(
      productDetail.metaTagKeyword
    );
    if (productDetail.vendorId) {
      this.option?.forEach(data => {
        if (data.vendorId === productDetail.vendorId) {
          this.vendorId.setValue(data.firstName);
          this.venId = data.vendorId;
          const param: any = {};
          param.vendorId = data.customerId;
          this.productSandbox.catlist(param);
        }
      });
    }
    this.productName.setValue(productDetail.name);
    this.sku.setValue(productDetail.sku);
    this.upc.setValue(productDetail.upc);
    this.hsn.setValue(productDetail.hsn);

    this.user.controls['quantity'].setValue(productDetail.quantity);
    this.location.setValue(productDetail.location);
    if (productDetail.dateAvailable) {
      const dateVals = this.datePipe.transform(productDetail.dateAvailable, 'dd-MM-yyyy').split('-');
      this.dateavail = { day: +dateVals[0], month: +dateVals[1], year: +dateVals[2] };
    }

    this.user.controls['dateAvailable'].setValue(this.dateavail);
    this.sortOrder.setValue(productDetail.sortOrder);
    this.productDescription.setValue(this.htmlTagConversion(productDetail.description));

    if (productDetail.pincodeBasedDelivery === 1) {
      this.user.controls['pincodeBasedDelivery'].setValue(true);
    } else {
      this.user.controls['pincodeBasedDelivery'].setValue(false);
    }


    if (
      productDetail.productDiscount.length > 0 &&
      productDetail.productDiscount[0].productDiscountId
    ) {
      this.discountItems = <FormArray>(
        this.discountForm.controls['discountItems']);
      if (productDetail.productDiscount.length > 0) {
        this.discountForm.enable();
        this.discountsArray.removeAt(0);
        productDetail.productDiscount.forEach(data => {

          if (data.dateStart) {
            let discountstart = this.datePipe.transform(data.dateStart, 'dd-MM-yyyy').split('-');
            this.discountstartsdate = { day: +discountstart[0], month: +discountstart[1], year: +discountstart[2] };
          }
          if (data.dateEnd) {
            const discountend = this.datePipe.transform(data.dateEnd, 'dd-MM-yyyy').split('-');
            this.discountsendsdate = { day: +discountend[0], month: +discountend[1], year: +discountend[2] };
          }
          let varprice: any;

          this.VarientSkuArrayList.forEach(val => {
            if (val.sku == data.skuName) {
              varprice = Number(val.price)
            }
          })

          const tempPrice = parseInt(data.price, 10).toFixed();


          this.discountItems.push(
            this.fb.group({
              discountId: data.productDiscountId,
              disCustomerGroup: 1,
              discountQuantity: data.quantity,
              discountPriority: data.priority,
              discountPrice: tempPrice,
              discountDateStart: this.discountstartsdate,
              discountDateEnd: this.discountsendsdate,
              discountSku: data.skuName,
              discountvarprice:this.totalPrice

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
        this.specialForm.controls['specialItems']
      );
      if (productDetail.productSpecialPrice.length > 0) {
        this.specialForm.enable();
        this.specialFormArray.removeAt(0);
        productDetail.productSpecialPrice.forEach(value => {
          if (value.dateStart) {
            const specialstart = this.datePipe.transform(value.dateStart, 'dd-MM-yyyy').split('-');
            this.specialstarts = { day: +specialstart[0], month: +specialstart[1], year: +specialstart[2] };
          }
          if (value.dateEnd) {
            const specialend = this.datePipe.transform(value.dateEnd, 'dd-MM-yyyy').split('-');
            this.specialends = { day: +specialend[0], month: +specialend[1], year: +specialend[2] };
          }
          let varprice:any;
          this.VarientSkuArrayList.forEach(val=>{
             if(val.sku==value.skuName){
              varprice=Number(val.price)
             }
          })
          const tempPrices = parseInt(value.price, 10).toFixed();
          this.specialItems.push(
            this.fb.group({
              specialId: value.productSpecialId,
              specialCustomerGroup: 1,
              specialPriority: value.priority,
              specialPrice: tempPrices,
              specialDateStart: this.specialstarts,
              specialDateEnd: this.specialends,
              specialSku: value.skuName,
              specialvarprice:this.totalPrice
            })
          );
        });
      }
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
    modalRef.componentInstance.maxLength = this.uploadImage.length
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
  deleteImage(i, length) {
    this.uploadImage.splice(i, 1);
    if (length >= 1 && i >= 1) {
      this.length = i - 1;
    }
    if (length == 1 && i == 0) {
      this.length = 0;
    }
    if (length < 0 && i == 0) {
      this.length = 0;
    }
    if (length > 0 && i == 0) {
      this.length = length - 1;
    }
    if (length == 0 && i == 0) {
      this.length = 0;
    }
    if (length == undefined) {
      this.length = i - 1;
    }
    if (this.length == -1 && length == undefined) {
      this.length = 0;
    }
    this.checkBox('', this.length);
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

  // getProductRatingList

  getProductRatingList() {
    const param: any = {};
    param.productId = this.editId;
    param.limit = 0;
    param.offset = 5;
  }


  // Rating & Review Image loader
  ratingImageLoading(id) {
    this.ratingImage[id] = true;
  }

  cancel() {
    this.router.navigate(['/vendors/manage-products/vendor-products']
    ,{
      queryParams: this.queryDetails,
    }
    );
  }
 
  getPrice(evt) {
    this.getGrossTotal();
    this.getTotalPrice();
    this.getTaxValueByPercentage(this.taxPercentage);
  }
  // get gross total event
  getGrossTotal() {
    this.grossTotal = (+this.priceForm.controls['productPrice'].value) + (+this.priceForm.controls['packingPrice'].value)
      + (+this.priceForm.controls['shippingPrice'].value) + (+this.priceForm.controls['others'].value);
  }
  // get total price event
  getTotalPrice() {
    this.totalPrice = (+this.priceForm.controls['productPrice'].value) + (+this.priceForm.controls['packingPrice'].value)
      + (+this.priceForm.controls['shippingPrice'].value) + (+this.priceForm.controls['others'].value) + this.taxValue;
  }
  // get tax value event
  getTaxValue(event) {
    this.taxValue = 0;
    this.taxPercentage = null;
    this.taxType = event.target.value;
    this.getGrossTotal();
    this.getTaxValueByPercentage(this.taxPercentage);
  }
  // get tax amount from input
  getTax(val) {
    this.taxValue = Number(val);
    this.getTotalPrice();
  }
  // get tax list
  getTaxlist() {
    const params: any = {};
    this.taxSandbox.getTaxList(params);
  }
  // get tax percentage
  getTaxPercentage(val) {
    this.currentTaxId = Number(val);
    if (this.taxArray && this.taxArray['length'] > 0) {
      this.taxArray.forEach(data => {
        if (data.taxId === this.currentTaxId) {
          this.taxPercentage = data.value;
          this.getTaxValueByPercentage(this.taxPercentage);
        }
      });
    }
  }
  // get tax value with percentage
  getTaxValueByPercentage(data) {
    this.taxValue = data ? (Number(this.priceForm.controls['productPrice'].value) / 100) * data : 0;
    this.getTotalPrice();
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

  addImageToOptions(image, option, index) {
    const array = [];
    array.push(image);
    this.optionImageArray[index] = image;
  }

  removeOptionImage(options, i) {
    this.optionImageArray = this.optionImageArray.map((data, j) => {
      if (i === j) {
        return [];
      } else {
        return data;
      }
    });

  }

  checkLength(count) {
    const length = +count;
    const diff = 5 - length;

    if (diff === 0) {
      return false;
    } else {
      for (let i = 0; i < diff; i++) {
      }
      return true;
    }
  }

  embed(url) {
    if (url !== '' && url.includes('watch?v=')) {
      const data = url.split('watch?v=');
      this.FinalUrl = data[0] + 'embed/' + data[1];


      this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.FinalUrl);
      this.embeded = true;
      this.uploaded = false;
    }
  }



  // image upload and base64 convert section
  uploadVideo(event) {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }
  uploadVideoFinal(e) {

    if (e.target.files[0]?.size > 50000000) {
      
      this.translateName=this.translate.instant('reports.pleaseuploadavideolessthan50MB');

      this.toastr.error('this.translateName');

    } else {
      this.videoName = e.target.files[0].name;
      const params: any = {};
      params.file = this.videoName;
      params.path = '';
      const formData = new FormData();
      formData.append('file', e.target.files[0], e.target.files[0].name);
      this.productSandbox.videoUpload(formData);
      this.uploaded = true;
      this.embeded = false;
      this.subscriptions.push(this.productSandbox.videoUpload$.subscribe(data => {

        if (data && data.status === 1) {
          const params: any = {};
          params.name = data.data.image;
          this.videoName = data.data.image;
          params.path = 'video/';
          const baseUrl = this.configService.getBaseUrl();
          this.uploadedVideoUrl = baseUrl + '/media/video-preview-s3?name=' + this.videoName + '&path=video/';
        }
      }));



    }



  }

  videoremove() {
    this.videoUrl = '';
    this.urlSafe = '';
    this.values = '0';
    this.embeded = false;
    this.videoName = '';
    this.FinalUrl = '';
  }
  videofileremove() {
    this.videoName = '';
    this.uploadedVideoUrl = '';
    this.uploaded = false;
    this.values = '1';
  }

  htmlTagConversion(data) {
    const val = data
      .replaceAll('&amp;', '&')
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&quot;', '"')
      .replaceAll('&#39;', "'")
      .replaceAll('&sbquo;', '‚')
      .replaceAll('&#61;', '=')
      .replaceAll('&#45;', '-')
      .replaceAll('&hellip;', '…')
      .replaceAll('&commat;', '@')
      .replaceAll('&copy;', '©')
      .replaceAll('&#35;', '#')
      .replaceAll('&ldquo;', '“')
      .replaceAll('&rsquo;', '’')
      .replaceAll('&lsquo;', '‘')
      .replaceAll('&trade;', '™')
      .replaceAll('&reg;', '®')
      .replaceAll('&ndash;', '–')
      .replaceAll('&eacute;', 'é')
      .replaceAll('&euro;', '€')
      .replaceAll('&pound;', '£');
    return val;
  }

  //Sku array list

  getSkuList() {
    this.productSandbox.skuArrayList$.subscribe(data => {
      if (data && data.length > 0) {
        this.VarientSkuArrayList = data;
      }
    })
  }

  //Discount price validation with variant price

  onskuchange(event, j) {
    this.discountForm.value.discountItems[j].discountvarprice = event.price;

    let x = (<FormArray>this.discountForm.controls['discountItems']).at(j)

    if (this.discountForm.value.discountItems[j].discountvarprice != "") {
      this.discountForm.patchValue({
        discountvarprice: this.totalPrice
      });

      x.patchValue({
        discountvarprice: this.totalPrice
      });
    }

  }

  //Special price validation with variant price

  specialskuchange(event, j) {

    this.specialForm.value.specialItems[j].specialvarprice = event.price;

    let x = (<FormArray>this.specialForm.controls['specialItems']).at(j)

    if (this.specialForm.value.specialItems[j].specialvarprice != "") {
      this.specialForm.patchValue({
        specialvarprice: this.totalPrice
      });

      x.patchValue({
        specialvarprice: this.totalPrice
      });
    }

  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
}
