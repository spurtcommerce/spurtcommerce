import { AfterViewInit, EventEmitter, Output } from '@angular/core';
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
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ConfigService } from '../../../../core/service/config.service';
import { Router } from '@angular/router';
import { ListsService } from '../../../../core/lists/lists.service';

@Component({
  selector: 'app-brands-carousel',
  templateUrl: './brands-carousel.component.html',
  styleUrls: ['./brands-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandsCarouselComponent implements OnInit, AfterViewInit {
  // decorator
  @Input() brands: Array<any> = [];

  // configuration
  public config: SwiperConfigInterface = {};
  // path of image
  public imagePath: string;
  // brands
  public brandId = '';
  // public priceFrom = '0';
  // public priceTo: any = 1000;
  public priceFrom = '';
  public priceTo: any = '';

  constructor(
    private configService: ConfigService,
    private router: Router,
    private listService: ListsService
  ) {}

  // intially get data from configService
  ngOnInit() {
    // this.imagePath = this.configService.get('resize').imageUrl;
    this.imagePath = this.configService.getImageUrl();
  }

  /**
   *  selecting brand in the brand list.
   *  Then calls getProducts to refresh the product list,
   *  set ,get,remove local storage for brandId.
   *  remove brandSelectionKey local storage.
   *  **/
  public selectBrand(brandId) {
    this.brandId = brandId;
    this.router.navigate(['/products'], { queryParams: { brand: brandId } });
  }

  /**
   * Emit param to product component
   * @param manufacturerId to product component
   * */
  getProduct() {
    const params: any = {};
    params.manufacturerId = this.brandId;
    params.priceFrom = this.priceFrom;
    params.priceTo = this.priceTo;
    this.listService.getBrand(params);
    this.router.navigate(['/products']);
  }

  // function calls at finally
  ngAfterViewInit() {
    this.config = {
      slidesPerView: 7,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: true,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: 'slide',
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3
        },
        960: {
          slidesPerView: 4
        },
        1280: {
          slidesPerView: 5
        },
        1500: {
          slidesPerView: 6
        }
      }
    };
  }
}
