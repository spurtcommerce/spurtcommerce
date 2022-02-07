/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ConfigService } from '../../../../core/service/config.service';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsCarouselComponent implements OnInit, AfterViewInit {
  // decorator
  @Input() products: any;
  // configration
  public config: SwiperConfigInterface = {};
  // path of the image
  public imagePath: string;
  currentRate = 2;
  // discount price
  public discountPrice = 20;
  public fiftyPercent = 50;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public listSandbox: ListsSandbox,
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object,
    private configService: ConfigService
  ) {}

  // initially get data from config service
  ngOnInit() {
    this.imagePath = this.configService.getImageUrl();
  }

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 6,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      autoplay: false,
      speed: 900,
      effect: 'slide',
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2
        },
        960: {
          slidesPerView: 3
        },
        1280: {
          slidesPerView: 4
        },
        1500: {
          slidesPerView: 5
        }
      }
    };
  }

  /**
   * open quick view of the product
   *
   * @param data passing selected product detail to dialog
   */
  public openProductDialog(product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(products => {
      if (products) {
        this.router.navigate(['/products/productdetails', products.id]);
      }
    });
  }
}
