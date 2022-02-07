/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ProductControlSandbox} from '../../../core/product-control/product-control.sandbox';
import {WishlistSandbox} from '../../../core/wishlist/wishlist.sandbox';
import {ConfigService} from '../../../core/service/config.service';
import {ListsSandbox} from '../../../core/lists/lists.sandbox';
import {Subscription} from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss'],
    providers: [ProductControlSandbox]
})
export class WishlistComponent implements OnInit, OnDestroy {
    // items added
    public quantity = 1;
    // image
    public imagePath: string;
    public semiColon = ':';
    // add to cart
    private productImage: any = [];
    private productOption: any;
    // subscriptions
    private subscriptions: Array<Subscription> = [];
    public currency: any = {};

    constructor(public snackBar: MatSnackBar, public wishlistSandbox: WishlistSandbox,
                public productControl: ProductControlSandbox,
                public router: Router,
                public listSandbox: ListsSandbox,
                private  configService: ConfigService) {
    }

    // Initially calls wishlistSandbox getWishlist with default param
    ngOnInit() {
        this.currency  = JSON.parse(localStorage.getItem('currency'));
        // this.imagePath = this.configService.get('resize').imageUrl;
        this.imagePath = this.configService.getImageUrl();
        const params: any = {};
        params.limit = 10;
        params.offset = '';
        this.wishlistSandbox.getWishlist(params);
        //  this.wishlistSandbox.wishlist$ .subscribe((data) =>)
    }

    // remove product from wishlist
    public remove(productId) {
        const params: any = {};
        params.wishlistProductId = productId;
        this.wishlistSandbox.deleteWishlist(params);
    }


    /** add product from wishlist to cart with options if mandatory.
     * @param products from wishlist.
     * @param param to ProductControlSandbox,to add items to cart.
     * **/
    public addToCart(products) {
        console.log('products', products);
        this.router.navigate(['/products/productdetails', products.productId]);
        // this.productImage = [];
        // const params: any = {};
        // let subscribeOneTime = 1;
        // params.id = products.productId;
        // this.listSandbox.getProductDetails(params);
        // this.subscriptions.push(this.listSandbox.productDetails$.subscribe(detail => {
        //     if (detail && detail.productOption) {
        //         this.productOption = detail.productOption;
        //         // if (this.productOption.length > 0) {
        //         if (products.product.optionRequired === 1 && subscribeOneTime === 1) {
        //             const param: any = {};
        //             param.totalOptions = products.mandatoryOption;
        //             param._optionValueArray = products.mandatoryOptionValueName;
        //             products.product.productCount = 1;
        //             this.productImage.push(products.productImage);
        //             products.product.productImage = this.productImage;
        //             products.product.productOption = this.productOption;
        //             products.product._optionValueArray = products.mandatoryOptionValueName;
        //             this.productControl.selectedOptions(param);
        //             products.product._totalOptions = param.totalOptions;
        //             this.productControl.addItemsToCart(products.product, param);
        //             subscribeOneTime++;
        //         } else {
        //             if (subscribeOneTime === 1 && products.product.optionRequired !== 1) {
        //                 this.productImage = [];
        //                 const param: any = {};
        //                 param.totalOptions = products.mandatoryOption;
        //                 param._optionValueArray = products.mandatoryOptionValueName;
        //                 products.product.productCount = 1;
        //                 this.productImage.push(products.productImage);
        //                 products.product.productImage = this.productImage;
        //                 products.product.productOption = this.productOption;
        //                 products.product._optionValueArray = products.mandatoryOptionValueName;
        //                 this.productControl.selectedOptions(param);
        //                 products.product._totalOptions = param.totalOptions;
        //                 this.productControl.addItemsToCart(products.product, param);
        //                 subscribeOneTime++;
        //             }
        //         }
        //         // }
        //     }
        // }));
        // params.id = '';
    }

    // unsubscribe subscribed events while destroy the page
    ngOnDestroy() {
        this.subscriptions.forEach(each => {
            each.unsubscribe();
        });
    }
}
