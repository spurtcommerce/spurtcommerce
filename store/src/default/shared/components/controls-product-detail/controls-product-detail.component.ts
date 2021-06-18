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
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { ProductControlSandbox } from '../../../../core/product-control/product-control.sandbox';
import { Router } from '@angular/router';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { WishlistSandbox } from '../../../../core/wishlist/wishlist.sandbox';

@Component({
  selector: 'app-controls-product-detail',
  templateUrl: './controls-product-detail.component.html',
  styleUrls: ['./controls-product-detail.component.scss']
})
export class ControlsProductDetailComponent implements OnInit {
  // decorator
  @Input() product: any;
  @Input() type: string;
  @Input() optionNameSelected: any;
  @Input() totalPrice = 0;
  @Output() OpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Output() QuantityChange: EventEmitter<any> = new EventEmitter<any>();
  // pagination count
  public count = 1;
  public align = 'center center';
  // whislist
  public quantity: any = 1;
  public isWish = [];
  public products: any;

  constructor(
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object,
    public controlSandbox: ProductControlSandbox,
    public listSandbox: ListsSandbox,
    private router: Router,
    public wishlistSandbox: WishlistSandbox,

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
      this.products = product;
      const param: any = {};
      param.totalOptions = this.totalPrice;
      product.productCount = this.quantity;
      product._totalOptions = param.totalOptions;
      this.controlSandbox.addItemsToCart(product, param);
  }
  // emit the data from open product dialoug component
  public openProductDialog(event) {
    this.OpenProductDialog.emit(event);
  }

  // emit quantity while changing
  public changeQuantity(value) {
    this.QuantityChange.emit(value);
  }

  public addToWishList(product) {
    if (this.isWish[this.product] && this.isWish[this.product] === 'warn') {
      this.isWish[product] = '';
      const params: any = {};
      params.wishlistProductId = product.productId;
      this.wishlistSandbox.deleteWishlist(params);
    } else {
      this.isWish[product] = 'warn';
      let currentUser: any;
      if (isPlatformBrowser(this.platformId)) {
        currentUser = JSON.parse(localStorage.getItem('user'));
      }
      if (currentUser) {
        const params: any = {};
        params.productId = product.productId;
        params.productOptionValueId	= '';
        this.controlSandbox.addToWishlist(params);
      } else {
        this.router.navigate(['/auth']);
      }
    }
  }
}
