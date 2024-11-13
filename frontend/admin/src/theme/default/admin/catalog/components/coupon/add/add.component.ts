/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { NgbDate, } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
// Store
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CouponSandbox } from 'add-ons/marketing/coupon/core/coupon.sandbox';
import { CouponService } from 'add-ons/marketing/coupon/core/coupon.service';

@Component({
  selector: 'app-spurt-catalog-coupon-add',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss']
})
export class CouponAddComponent implements OnInit, OnDestroy {

  public user: FormGroup;
  public couponCode: FormControl;
  public couponType: FormControl;
  public couponName: FormControl;
  public couponValue: FormControl;
  public startDate: FormControl;
  public endDate: FormControl;
  public minimumAmount: FormControl;
  public maximumAmount: FormControl;
  public emailRestriction: FormControl;
  public userCount: FormControl;
  public usageLimit: FormControl;
  public cartItems: FormControl;
  public couponQualified: FormControl;
  public products: FormControl;
  public status: FormControl;
  public searchKeyword = '';
  private valids: boolean;
  private vendorCouponId: any;
  public items: any = [];
  private subscriptions: Array<Subscription> = [];
  public selectedProduct: any = [];
  private closeResult: string;
  private param: any = {};
  public CouponEditdata: any;
  public submittedValues = false;
  public productOffset: any = 0;
  public minDate: any;
  public todayDate: any;
  public limit = 10;
  public queryDetails: any = {};
  public objList:any=[];
  currentDate: any;
  editStartDate: { day: number; month: number; year: number; };
  editEndDate: { day: number; month: number; year: number; };
  enteredUsageLimit: number;
  enteredUserCount: number;
  enteredCouponValue:number;
  enteredCouponType:number;
  startdateerror: boolean;
  enddateerror: boolean;

  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    public sandbox: CouponSandbox, public route: ActivatedRoute,
    private couponservice: CouponService, public productSandbox: ProductSandbox,
    public router: Router,
    public datePipe: DatePipe,public Service:CouponService
  ) {
    this.valids = false;
    this.route.params.subscribe(data => {
      if (data.id) {
        this.vendorCouponId = data.id;
      } else {
        this.todayDate = new Date();
        this.minDate = this.todayDate;
      }
    });
    this.valids = false;

    const pageOffset = this.route.snapshot.queryParamMap.get('offset');
    const index = this.route.snapshot.queryParamMap.get('index');

    this.queryDetails.offset = pageOffset || 0;
    this.queryDetails.index = index || 0;


  }




  open(content) {
    this.modalService.open(content, {
      windowClass: 'dark-modal,image-manager'
    });
  }

  ngOnInit() {

    this.getProductList();
    this.currentDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };

    if (this.vendorCouponId) {
      const params: any = {};
      params.vendorCouponId = this.vendorCouponId;
      this.sandbox.couponDetails(params);
      this.subscriptions.push(this.sandbox.getCouponGet$.subscribe(datas => {
        if (datas && Object.keys(datas).length) {
          this.CouponEditdata = datas;
          if (this.CouponEditdata) {
            this.editCouponList();
          }
        }
      }));
    }

    this.apiFordropDownlist();
    this.couponCode = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(32)
    ]));
    this.couponName = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(255)
    ]));
    this.couponType = new FormControl(null, [Validators.required]);
    this.couponValue = new FormControl('', [Validators.required]);
    this.startDate = new FormControl('', [Validators.required]);
    this.endDate = new FormControl('', [Validators.required]),
      this.minimumAmount = new FormControl('', [Validators.required]),
      this.maximumAmount = new FormControl('', [Validators.required]),
      this.emailRestriction = new FormControl(''),
      this.userCount = new FormControl('', [Validators.required]),
      this.couponQualified = new FormControl(''),
      this.usageLimit = new FormControl('', [Validators.required]),
      this.cartItems = new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
      this.products = new FormControl([], [Validators.required]),
      this.status = new FormControl(null, [Validators.required]);
    this.user = this.fb.group({
      couponCode: this.couponCode,
      couponType: this.couponType,
      couponName: this.couponName,
      couponValue: this.couponValue,
      startDate: this.startDate,
      endDate: this.endDate,
      emailRestriction: this.emailRestriction,
      userCount: this.userCount,
      couponQualified: this.couponQualified,
      minimumAmount: this.minimumAmount,
      maximumAmount: this.maximumAmount,
      usageLimit: this.usageLimit,
      cartItems: this.cartItems,
      products: this.products,
      status: this.status
    });
  }

  apiFordropDownlist() {
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.keyword = '';
    param.sortOrder = '';
    this.sandbox.couponList(param);
  }

  /**
   * Handles  'onSubmits' event. Calls sandbox  updatecoupon if ((this.CouponEditdata!=undefined)&&(this.CouponEditdata!=' ')),
   * else calls sandbox addcoupon function,if the form is valid.
   *
   * @param user entire form value
   * @param param storing entire form value
   *
   */

  onSubmits(user) {

    if (this.user.controls['couponQualified'].value === true) {
      this.user.controls['cartItems'].clearValidators();
      this.user.controls['cartItems'].updateValueAndValidity();
      this.user.controls['cartItems'].reset();
    } else {
      this.user.controls['cartItems'].setValidators([Validators.required, Validators.min(1)]);
      this.user.controls['cartItems'].updateValueAndValidity();
    }
    const productsArray: any = [];
    this.submittedValues = true;
    let dateValid;
    if(this.CouponEditdata){
       dateValid=this.isValid();  
    }
    if (!this.user.valid || ((this.enteredUsageLimit) < (this.enteredUserCount)) ||(this.enteredCouponType==1 && (this.enteredCouponValue >= 100))|| (this.CouponEditdata && (dateValid[0]==true || dateValid[1]==true)))
    {
      this.validateAllFormFields(this.user);
      return;
    }
    if (user.products) {
      const object: any = {};
      const array = [];
      object.type = 1;
      user.products.forEach(data => {
        array.push(data.productId);
      });
      object.referenceId = array;
      productsArray.push(object);
    }
    this.param.couponName = user.couponName;
    this.param.couponCode = user.couponCode;
    this.param.couponType = user.couponType;
    this.param.discount = user.couponValue;
    this.param.minimumPurchaseAmount = user.minimumAmount;
    this.param.maximumPurchaseAmount = user.maximumAmount;
    this.param.emailRestrictions = user.emailRestriction.toLowerCase();
    const datess = user.startDate;
    if (datess && datess.year) {
      this.param.startDate = datess ? (datess.year) + '-' + ('0' + datess.month).slice(-2) + '-' + ('0' + datess.day).slice(-2) : null;
    }
    const dates = user.endDate;
    if (dates && dates.year) {
      this.param.endDate = dates ? (dates.year) + '-' + ('0' + dates.month).slice(-2) + '-' + ('0' + dates.day).slice(-2) : null;
    }
    this.param.maxUserPerCoupon = user.usageLimit;
    this.param.noOfTimeCouponValidPerUser = user.userCount;
    if (user.couponQualified === true) {
      this.param.allQualifyingItemsApply = 1;
    } else {
      this.param.allQualifyingItemsApply = 0;
    }

    this.param.appliedCartItemsCount = user.cartItems ? user.cartItems : 1;
    this.param.productType = productsArray;
    this.param.status = user.status;

    if (this.CouponEditdata !== undefined && this.CouponEditdata !== ' ') {
      this.param.couponId = this.vendorCouponId;
      this.sandbox.updateCoupon(this.param);
    } else {
      this.sandbox.addCoupon(this.param);
    }
    this.subscribe();
  }

  public subscribe() {
    this.sandbox.getAddCoupon$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/marketing/manage-promotions/coupon'], { queryParams: this.queryDetails });
      }
    });

    this.sandbox.getUpdateCouponData$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/marketing/manage-promotions/coupon'], { queryParams: this.queryDetails });
      }
    });

  }

  editCouponList() {
    if (this.CouponEditdata.applicableProduct.length > 0) {
      this.selectedProduct = this.CouponEditdata.applicableProduct;
    }
    const dateVal = this.datePipe.transform(this.CouponEditdata.startDate, 'dd-MM-yyyy').split('-');
    this.editStartDate = { day: +dateVal[0], month: +dateVal[1], year: +dateVal[2] };
    this.user.controls['startDate'].setValue(
      this.editStartDate
    );

    const dateVals = this.datePipe.transform(this.CouponEditdata.endDate, 'dd-MM-yyyy').split('-');
    this.editEndDate = { day: +dateVals[0], month: +dateVals[1], year: +dateVals[2] };
    this.user.controls['endDate'].setValue(
      this.editEndDate
    );
    this.minDate = this.todayDate;
    this.user.controls['couponCode'].setValue(this.CouponEditdata.couponCode);
    this.user.controls['couponName'].setValue(
      this.CouponEditdata.couponName
    );
    this.user.controls['couponType'].setValue(
      this.CouponEditdata.couponType
    );
    this.user.controls['couponValue'].setValue(
      this.CouponEditdata.discount
    );


    this.user.controls['minimumAmount'].setValue(
      this.CouponEditdata.minimumPurchaseAmount
    );
    this.user.controls['maximumAmount'].setValue(
      this.CouponEditdata.maximumPurchaseAmount
    );

    this.status.setValue(this.CouponEditdata.isActive);
    this.user.controls['emailRestriction'].setValue(
      this.CouponEditdata.emailRestrictions
    );
    this.user.controls['usageLimit'].setValue(
      this.CouponEditdata.maxUserPerCoupon
    );
    this.user.controls['userCount'].setValue(
      this.CouponEditdata.noOfTimeCouponValidUser
    );
    this.user.controls['cartItems'].setValue(
      this.CouponEditdata.appliedCartItemsCount
    );
    const qualified = this.CouponEditdata.allQualifyingItemsApply === 1 ? true : false;
    this.user.controls['couponQualified'].setValue(
      qualified
    );
    this.enteredUsageLimit = Number(this.user.value.usageLimit);
    this.enteredUserCount = Number(this.user.value.userCount);
    this.enteredCouponValue =Number(this.user.value.couponValue);
    this.enteredCouponType =Number(this.user.value.couponType);
  }


  getProductList() {
    const params: any = {};
    params.offset = this.productOffset;
    params.limit = this.limit;
    params.keyword = '';
    params.sku = '';
    params.status = '';
    params.price = 0;
    this.Service.getProductList(params).subscribe(data=>{
      this.objList=data.data
    })

  }

  onScroll() {
    this.productOffset += this.limit;
    this.getProductList();
  }

  onProductScrollDown() {
    this.productOffset += this.limit;
    this.getProductList();
  }


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

  changeFromDate(event) {
    this.isValid();
    this.minDate = event.value;
  }
  changeType() {
    this.enteredUsageLimit = Number(this.user.value.usageLimit);
    this.enteredUserCount = Number(this.user.value.userCount);
    this.enteredCouponValue = Number(this.user.value.couponValue);
    this.enteredCouponType=Number(this.user.value.couponType);
  }



  get f() {
    return this.user.controls;
  }

  isValid(){

    const Startdate: NgbDate = new NgbDate(this.user.value.startDate?.year, this.user.value.startDate?.month, this.user.value.startDate?.day);              
    let isValidStartdate = (Startdate.after(this.currentDate)) || (Startdate.equals(NgbDate.from({ year: this.currentDate.year, month: this.currentDate.month, day: this.currentDate.day })))
  
     const Enddate: NgbDate = new NgbDate(this.user.value.endDate?.year, this.user.value.endDate?.month, this.user.value.endDate?.day);      
     let isValidenddate = (Enddate.after(this.currentDate)) || (Enddate.equals(NgbDate.from({ year: this.currentDate.year, month: this.currentDate.month, day: this.currentDate.day })))
     if((isValidStartdate==true)){
      this.startdateerror=false;
     }else{
       this.startdateerror=true;
     }
  
      if(isValidenddate==true){
       this.enddateerror=false;
      }else{ 
        this.enddateerror=true;
      }
      return [this.startdateerror,this.enddateerror];
  
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
    this.sandbox.clearStateVar({});
  }
}

