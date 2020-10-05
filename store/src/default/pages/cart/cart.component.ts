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
  OnInit,
  Inject,
  PLATFORM_ID,
  OnDestroy
} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ProductControlSandbox } from '../../../core/product-control/product-control.sandbox';
import { ConfigService } from '../../../core/service/config.service';
import { Router } from '@angular/router';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  // image
  public imagePath: string;
  public semiColon = ':';
  private subscription: Array<Subscription> = [];
  constructor(
    public productControl: ProductControlSandbox,
    private configService: ConfigService,
    public listSandbox: ListsSandbox,
    public router: Router,
    private changeDetectRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // initially get configService data and subscribe cartlist response
  ngOnInit() {
    this.imagePath = this.configService.getImageUrl();
    this.changeDetectRef.detectChanges();
    this.subscription.push(
      this.productControl.cartlist$.subscribe(data => {
        this.changeDetectRef.detectChanges();
      })
    );
  }

  // increase or decrease product count
  changeCount(product, operation) {
    this.productControl.ChangeCount(product, operation);
  }

  // remove product from cart
  removeProduct(product) {
    this.productControl.removeItemFromCart(product);
  }

  // clear cart
  public clear() {
    this.productControl.clearCart();
  }

  // navigation to checkout component.And set local storage
  public checkoutPage() {
    const checkoutToken = '1';
    this.router.navigate(['/checkout']);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('checkout', checkoutToken);
    }
  }
  ngOnDestroy() {
    this.subscription.forEach(each => {
      each.unsubscribe();
    });
  }
}
