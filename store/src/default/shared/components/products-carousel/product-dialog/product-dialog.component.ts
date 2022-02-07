/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { ListsSandbox } from './../../../../../core/lists/lists.sandbox';
import { Component, ViewEncapsulation, OnInit, Inject, AfterViewInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {ConfigService} from '../../../../../core/service/config.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-dialog',
    templateUrl: './product-dialog.component.html',
    styleUrls: ['./product-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductDialogComponent implements OnInit , AfterViewInit {
    // configrations
    public config: SwiperConfigInterface = {};
    // path of the image
    public imagePath: string;

    constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,
                public productDetail: ListsSandbox,
                @Inject(MAT_DIALOG_DATA)
                public product: any,
                public router: Router,
                public listSandbox: ListsSandbox,
                private configService: ConfigService) {

    }
            // initially get data from config service
    ngOnInit() {
       // this.imagePath = this.configService.get('resize').imageUrl;
       this.imagePath = this.configService.getImageUrl();
    }
        // calls the function finally
    ngAfterViewInit() {
        this.config = {
            slidesPerView: 1,
            spaceBetween: 0,
            keyboard: true,
            navigation: true,
            pagination: false,
            grabCursor: true,
            loop: false,
            preloadImages: false,
            lazy: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            }
        };
    }
    // close the popup window
    public close(): void {
        this.dialogRef.close();
    }
    closePopup(event) {
        this.close();
    }
    redirect() {
        this.close();
        this.router.navigate(['/products/productdetails', this.product.productId]);
    }
}

