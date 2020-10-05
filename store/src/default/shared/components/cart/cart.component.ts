/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SidenavMenuService } from '../sidenav-menu/sidenav-menu.service';
import { ProductControlSandbox } from '../../../../core/product-control/product-control.sandbox';
import { ProductControlService } from '../../../../core/product-control/product-control.service';
import { ConfigService } from '../../../../core/service/config.service';
import { Router } from '@angular/router';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';

@Component({
  selector: 'app-spurt-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [ProductControlService, ProductControlSandbox]
})
export class CartNavComponent implements OnInit {
  // path of image
  public imagePath: string;
  // product flag value
  public flagValue = '0';
  @Input()
  ngSwitch: any;

  constructor(
    public sidenavMenuService: SidenavMenuService,
    public cartSandbox: ProductControlSandbox,
    public router: Router,
    public listSandbox: ListsSandbox,
    @Inject(PLATFORM_ID) private platformId: Object,
    private configService: ConfigService
  ) {}

  // data from configService
  ngOnInit() {
    // this.imagePath = this.configService.get('resize').imageUrl;
    this.imagePath = this.configService.getImageUrl();
  }

  // remove product from cart
  remove(product) {
    this.cartSandbox.removeItemFromCart(product);
  }

  // clear cart
  clear() {
    this.cartSandbox.clearCart();
  }

  // navigation to checkout component.And set local storage
  public checkoutPage() {
    const checkoutToken = '1';
    this.router.navigate(['/checkout']);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('checkout', checkoutToken);
    }
  }
}
