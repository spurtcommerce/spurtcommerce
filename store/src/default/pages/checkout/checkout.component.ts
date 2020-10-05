/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatSnackBar, MatStepper } from '@angular/material';
import { emailValidator } from '../../theme/utils/app-validators';
import { ProductControlSandbox } from '../../../core/product-control/product-control.sandbox';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { ConfigService } from '../../../core/service/config.service';
import { AccountSandbox } from '../../../core/account/account.sandbox';
import { CommonSandbox } from '../../../core/common/common.sandbox';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthSandbox } from '../../../core/auth/auth.sandbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  // decorator
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('verticalStepper') verticalStepper: MatStepper;
  // reactive form
  public checkoutForm: FormGroup;
  public firstName: FormControl;
  public lastName: FormControl;
  public company: FormControl;
  public email: FormControl;
  public phone: FormControl;
  public setPassword: FormControl;
  public country: FormControl;
  public city: FormControl;
  public state: FormControl;
  public zip: FormControl;
  public zipCodes: any;
  public address: FormControl;
  public addressLine: FormControl;
  public checked: boolean;
  // validation
  public submitted = false;
  public newAddress = true;
  public dataOptions: any;
  // image
  public imagePath: any;
  // checkout list name
  public semiColon = ':';
  seasons = ['a', 'b', 'c'];
  // subscriptions for unsuscribe the api respone
  private subscriptions: Array<Subscription> = [];

  constructor(
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public productControlSandbox: ProductControlSandbox,
    public listsSandbox: ListsSandbox,
    public router: Router,
    public accountSandbox: AccountSandbox,
    public commonSandbox: CommonSandbox,
    public authSandbox: AuthSandbox,
    public configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetectRef: ChangeDetectorRef
  ) {}

  // Initially calls initCheckoutForm function
  ngOnInit() {
    this.initCheckoutForm();
    this.getSessionData();
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userToken')) {
        this.commonSandbox.doGetProfile();
        this.setProfileDetails();
      }
    }
    this.imagePath = environment.imageUrl;
  }
  getSessionData() {
    if (isPlatformBrowser(this.platformId)) {
      const params: any = {};
      params.totalPrice = JSON.parse(sessionStorage.getItem('productTotal'));
      params.products = JSON.parse(sessionStorage.getItem('selectedProducts'));
      params.productTotal = JSON.parse(
        sessionStorage.getItem('selectedProductsCount')
      );
      this.productControlSandbox.HandleCart(params);
    }
  }

  // create form group for checkout
  initCheckoutForm() {
    const mobileValidationPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('');
    this.country = new FormControl('', Validators.required);
    this.email = new FormControl(
      '',
      Validators.compose([Validators.required, emailValidator])
    );
    this.phone = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(mobileValidationPattern)
      ])
    );
    this.city = new FormControl('', Validators.required);
    this.state = new FormControl('', Validators.required);
    this.zip = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.required);
    this.addressLine = new FormControl('');
    this.checkoutForm = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      company: this.company,
      email: this.email,
      phone: this.phone,
      setPassword: this.setPassword,
      country: this.country,
      city: this.city,
      state: this.state,
      zip: this.zip,
      address: this.address,
      addressLine: this.addressLine,
    });
  }

  // editing billing form
  editAddressList(param) {
    this.checkoutForm.controls['company'].setValue(param.company);
    this.checkoutForm.controls['city'].setValue(param.city);
    this.checkoutForm.controls['state'].setValue(param.state);
    if (typeof param.postcode === 'number') {
      this.zipCodes = parseInt(param.postcode, 10);
      this.checkoutForm.controls['zip'].setValue(this.zipCodes);
    } else {
      this.checkoutForm.controls['zip'].setValue(param.postcode);
    }
    this.checkoutForm.controls['address'].setValue(param.address1);
    this.checkoutForm.controls['addressLine'].setValue(param.address2);
  }

  // editing billing form(from get profile api)
  setProfileDetails() {
    this.subscriptions.push(
      this.commonSandbox.getProfile$.subscribe(profile => {
        if (profile) {
          this.checkoutForm.controls['firstName'].setValue(profile.firstName);
          this.checkoutForm.controls['lastName'].setValue(profile.lastName);
          this.checkoutForm.controls['email'].setValue(profile.email);
          this.checkoutForm.controls['phone'].setValue(profile.mobileNumber);
        }
      })
    );
  }

  /**
   * place order with product detail, if the form is valid
   *
   * remove checkout local storage.
   * @param productDetails detail of the product for checkout
   */
  public placeOrder(productDetails) {
      if (!localStorage.getItem('userToken')) {
        this.snackBar.open('Login or Create Account to continue', '×', {
          panelClass: 'error',
          verticalPosition: 'top',
          horizontalPosition: 'right',
          duration: 3000
        });
        this.router.navigate(['/auth']);
        return;
      }
        this.submitted = true;
        if (productDetails.length === 0) {
          this.snackBar.open('Add items to place order', '×', {
            panelClass: 'error',
            verticalPosition: 'top',
            horizontalPosition: 'right',
            duration: 3000
          });
          return;
        }
        if (!this.checkoutForm.valid) {
          return;
        }
        const params = this.checkoutForm.value;
        params.productDetail = productDetails;
        if (isPlatformBrowser(this.platformId)) {
          if (localStorage.getItem('userToken')) {
            localStorage.removeItem('checkout');
          }
        }
        this.productControlSandbox.PlaceOrder(params);
  }

  /**
   * increase or decrease product count
   *
   * @param product added product details
   * @param operation differentiate the operation is increament operation or decrement operation
   */
  changeCount(product, operation) {
    this.productControlSandbox.ChangeCount(product, operation);
  }

  // remove product from the cart, calling removeItemFromCart function from sandbox
  removeProduct(product) {
    this.productControlSandbox.removeItemFromCart(product);
  }

  // clear cart, for remove all products in the cart
  public clear() {
    this.productControlSandbox.clearCart();
  }

  // destroy the subscribed events while page destroy
  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
}
