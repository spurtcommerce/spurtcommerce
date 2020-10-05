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
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { ProductControlSandbox } from '../../../../core/product-control/product-control.sandbox';
import { Router } from '@angular/router';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit, OnDestroy {
  // decorator
  @Input() product: any;
  @Input() type: string;
  @Input() cartOptionValueArray: any;
  optionValueArray: any = [];
  optionNameSelected: any;
  totalPrice = 0;
  @Output() OpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Output() QuantityChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();
  // pagination count
  public count = 1;
  public align = 'center center';
  // whislist
  public quantity: any = 1;
  public isWish: any = {};
  public isAdd = [];
  public products: any;
  // subscriptions
  private subscriptions: Array<Subscription> = [];

  constructor(
    public snackBar: MatSnackBar,
    public controlSandbox: ProductControlSandbox,
    public listSandbox: ListsSandbox,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // intially get the cart data and calls layoutAlign
  ngOnInit() {
    if (this.product) {
      if (this.product.wishListStatus && this.product.wishListStatus === 1) {
        this.isWish[this.product] = 'warn';
      }
      if (this.product.cartCount > 0) {
        this.count = this.product.cartCount;
      }
    }
    this.layoutAlign();
  }

  // align layout based on condition type
  public layoutAlign() {
    if (this.type === 'all') {
      this.align = 'space-between center';
    } else if (this.type === 'wish') {
      this.align = 'start center';
    } else if (this.type === 'detail') {
      this.align = 'start center';
    } else if (this.type === 'home') {
      this.align = 'start center';
    } else {
      this.align = 'center center';
    }
  }

  // change quantity of the product
  public changeCount(operation) {
    const product: any = {};
    if (operation === 'remove' && this.quantity > 1) {
      this.quantity -= 1;
    } else if (operation === 'add') {
      this.quantity += 1;
    }
  }

  // add product to cart

  public addToCart(product) {
    if (this.type === 'popup') {
      this.closePopup.emit('close');
    }
    this.router.navigate(['/products/productdetails/', product.productId]);
  }

  // emit the data from open product dialoug component
  public openProductDialog(event) {
    this.OpenProductDialog.emit(event);
  }

  // emit quantity while changing
  public changeQuantity(value) {
    this.QuantityChange.emit(value);
  }

  // unsubscribe subscribed events while destroy the page
  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
}
