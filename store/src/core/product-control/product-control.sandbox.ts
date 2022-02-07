/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as authAction from './action/product-control.action';
import * as store from '../state.interface';
import { MatSnackBar } from '@angular/material';
import {
  getCartList,
  getCartListCount,
  getCheckedOutData,
  getCheckoutFailed,
  getCheckoutLoaded,
  getCheckoutLoading,
  getTotalCartPrice,
  wishListLoading
} from './reducer/product-control.selector';
import { CheckoutModel } from './models/checkout.model';

@Injectable()
export class ProductControlSandbox {
  public cartlist$ = this.appState$.select(getCartList);
  public cartlistCount$ = this.appState$.select(getCartListCount);
  public totalCartPrice$ = this.appState$.select(getTotalCartPrice);
  public checkedOutData$ = this.appState$.select(getCheckedOutData);

  public checkoutLoading$ = this.appState$.select(getCheckoutLoading);
  public checkoutLoaded$ = this.appState$.select(getCheckoutLoaded);
  public checkoutFailed$ = this.appState$.select(getCheckoutFailed);
  public wishlistLoading$ = this.appState$.select(wishListLoading);

  selectedProducts: any[] = [];
  cartTotal = 0;
  productTotal: any;
  changeCountTotalPrice = 0;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private router: Router,
    protected appState$: Store<store.AppState>,
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.productTotal = 0;
    this.completeOrder();
    if (isPlatformBrowser(this.platformId)) {
      const cartParams: any = {};
      cartParams.products = sessionStorage.getItem('selectedProducts')
        ? JSON.parse(sessionStorage.getItem('selectedProducts'))
        : [];
      cartParams.productTotal = sessionStorage.getItem('selectedProductsCount')
        ? +JSON.parse(sessionStorage.getItem('selectedProductsCount'))
        : 0;
      cartParams.totalPrice = sessionStorage.getItem('productTotal')
        ? +JSON.parse(sessionStorage.getItem('productTotal'))
        : 0;
      this.HandleCart(cartParams);
    }
    if (isPlatformServer(this.platformId)) {
    }
  }

  /**
   * add selected item to cart
   *
   * @param item product detail to be added to cart
   */
  addItemsToCart(item, param) {


    const id: any = item.productId;
    const id_totalOptions: any = param.totalOptions;
    this.productTotal = 0;
    for (let i = 0; i < this.selectedProducts.length; i++) {
      if (
        this.selectedProducts[i].productId === id &&
        this.selectedProducts[i]._totalOptions !== id_totalOptions
      ) {
          if (this.selectedProducts[i].productCount === 1) {
            const tempPrice = +this.selectedProducts[i].price;
            this.productTotal = (this.productTotal + tempPrice).toFixed(2);
        }
      }
    }
    let exists = false;
    this.getSessionData();

    this.selectedProducts = this.selectedProducts.map(_items => {
      if (
        _items.productId === item.productId &&
        _items._totalOptions === id_totalOptions
      ) {
        exists = true;
        if (item.productCount) {
          _items.productCount += item.productCount;
          this.cartTotal += item.productCount;
        } else {
          _items.productCount += 1;
          this.cartTotal += 1;
        }
      }
      return _items;
    });

    if (!exists) {
      this.selectedProducts.push(item);
      if (!item.productCount) {
        item.productCount = 1;
      }
      this.cartTotal += item.productCount;
    }
    this.selectedProducts.forEach(_price => {
      if (
        _price.productId === item.productId &&
        _price._totalOptions === id_totalOptions
      ) {
          const numberPrice: any = +(_price.price);
          let tempPrice = numberPrice + _price._totalOptions;

          tempPrice = tempPrice;
          this.productTotal = (tempPrice * item.productCount) +  this.productTotal;
          this.productTotal = +this.productTotal.toFixed(2);
      }
    });
    const cartParams: any = {};
    cartParams.products = this.selectedProducts;
    cartParams.productTotal = this.cartTotal;
    const availableData: any = {};
    availableData.options = param.totalOptions;
    cartParams.totalPrice = this.productTotal;
    this.snackBar.open(
      'Product ' + item.name + ' is successfully added to cart',
      '×',
      {
        panelClass: 'success',
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 3000
      }
    );
    this.changeCountTotalPrice = cartParams.totalPrice;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(
        'changeCountTotalPrice',
        JSON.stringify(this.changeCountTotalPrice)
      );
    }
    this.HandleCart(cartParams);
  }

  /**
   * remove selected item to cart
   *
   * @param item product detail to be remove to cart
   */
  removeItemFromCart(item) {
    this.getSessionData();
    let deletedCount: any = 0;
    this.selectedProducts = this.selectedProducts.filter(_items => {
      if (_items.productId === item.productId) {
        deletedCount = _items.productCount;
        return false;
      }
      return true;
    });
    this.cartTotal -= deletedCount;
    this.productTotal = 0;
    this.selectedProducts.forEach(_price => {
        const tempPrice = Number(_price.price);
        this.productTotal += tempPrice * _price.productCount;
    });
    const cartParams: any = {};
    cartParams.products = this.selectedProducts;
    cartParams.productTotal = this.cartTotal;
    cartParams.totalPrice = this.productTotal;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(
        'changeCountTotalPrice',
        JSON.stringify(this.productTotal)
      );
    }
    this.HandleCart(cartParams);
  }

  /**
   * increase or decrease product count from cart
   *
   * @param product product detail to be remove to cart
   * @param operation increase or decrease
   */
  ChangeCount(product, operation) {
    this.getSessionData();
    if (operation) {
      this.selectedProducts = this.selectedProducts.map(_items => {
        if (
          _items.productId === product.productId &&
          _items._totalOptions === product._totalOptions
        ) {
          _items.productCount += 1;
          this.cartTotal += 1;
        }
        return _items;
      });
      this.addItems(product);
    } else if (!operation) {
      if (product.productCount > 1) {
        this.selectedProducts = this.selectedProducts.map(_items => {
          if (
            _items.productId === product.productId &&
            _items._totalOptions === product._totalOptions
          ) {
            _items.productCount -= 1;
            this.cartTotal -= 1;
          }
          return _items;
        });
          const totalValue: any = product._totalOptions + product.price;
          const halfValue: any = totalValue;
          this.productTotal -= halfValue;

          this.productTotal = +this.productTotal.toFixed(2);

      } else if (product.productCount === 1) {
        this.cartTotal -= 1;
        this.selectedProducts = this.selectedProducts.filter(_items => {
          if (
            _items.productId === product.productId &&
            _items._totalOptions === product._totalOptions
          ) {
            return false;
          } else {
            return true;
          }
        });
          const totalValue: any = +(product._totalOptions + product.price).toFixed(2);
          const halfValue: any = totalValue;
          this.productTotal -= halfValue;
          this.productTotal = +this.productTotal.toFixed(2);
      }
    }
    const cartParams: any = {};
    cartParams.products = this.selectedProducts;
    cartParams.productTotal = this.cartTotal;
    cartParams.totalPrice = this.productTotal;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(
        'changeCountTotalPrice',
        JSON.stringify(cartParams.totalPrice)
      );
      this.HandleCart(cartParams);
    }
  }

  // increase product count from cart
  public addItems(product) {
    this.productTotal = 0;
      const numberPrice: any = +(parseFloat(product.price)).toFixed(2);

      let calculation: any = numberPrice + product._totalOptions;

      if (calculation < 0) {
        calculation = calculation / -1;
      }
      if (isPlatformBrowser(this.platformId)) {
        const _changeTotalPrice: any = sessionStorage.getItem(
          'changeCountTotalPrice'
        )
          ? +JSON.parse(sessionStorage.getItem('changeCountTotalPrice'))
          : 0;
        this.productTotal = +(_changeTotalPrice + calculation).toFixed(2);

    }
  }

  /**
   * clear all products from cart
   */
  clearCart() {
    const cartParams: any = {};
    cartParams.products = [];
    cartParams.productTotal = 0;
    cartParams.totalPrice = 0;
    cartParams.changeCountTotalPrice = 0;
    this.HandleCart(cartParams);
  }

  /**
   * handle cart cart
   * @param params product detail
   */
  HandleCart(params) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('productTotal', JSON.stringify(params.totalPrice));
      sessionStorage.setItem(
        'selectedProducts',
        JSON.stringify(params.products)
      );
      sessionStorage.setItem(
        'selectedProductsCount',
        JSON.stringify(params.productTotal)
      );
    }
    this.appState$.dispatch(new authAction.CartHandleAction(params));
  }

  /**
   * do checkout products
   */
  PlaceOrder(params) {
    this.appState$.dispatch(
      new authAction.DoCheckoutAction(new CheckoutModel(params))
    );
  }

    /*  addToWishlist  */
    public addToWishlist(params): void {
      this.appState$.dispatch(new authAction.AddtoWishlist(params));
    }

  /**
   * get session data from session storage
   */
  public getSessionData() {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedProducts = sessionStorage.getItem('selectedProducts')
        ? JSON.parse(sessionStorage.getItem('selectedProducts'))
        : [];
      const cartTotal = sessionStorage.getItem('selectedProducts')
        ? +(sessionStorage.getItem('selectedProductsCount'))
        : 0;
      this.cartTotal = cartTotal;
      const productTotal = sessionStorage.getItem('productTotal')
        ? +parseFloat(sessionStorage.getItem('productTotal')).toFixed(2)
        : 0;
      this.productTotal = productTotal;
    }
  }

  /**
   * subscribe checkout status events
   */
  completeOrder() {
    this.checkedOutData$.subscribe(data => {
      if (data) {
        if (data.orderId) {
          this.router.navigate(['/checkout/success', data.orderPrefixId]);
          const params: any = {};
          params.products = [];
          params.productTotal = 0;
          params.totalPrice = 0;
          this.HandleCart(params);
        }
      }
    });
  }
}
