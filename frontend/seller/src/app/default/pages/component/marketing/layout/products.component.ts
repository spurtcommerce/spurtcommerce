import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ProductSandbox } from '../../../../../core/product/product.sandbox';
import { CouponsComponents } from '../../../../../../../add-ons/add-ons.constant';
import { CommonSandbox } from '../../../../../../../src/app/core/common/common.sandbox';
import { Subscription } from 'rxjs';
import { ApprovalFlagService } from '../../../../../../../src/app/default/shared/components/approvalServices/approval-flag.service';

@Component({
    selector: 'app-product-layout',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class MarketingComponent implements OnInit, AfterViewInit {
    // public config: SwiperConfigInterface = {};
    // Subscriptions
    private subscriptions: Subscription = new Subscription();
    config: any;
    public sideMenuOpen = true;
    addonData = CouponsComponents.length > 0
    allowUnapprovedSeller: any;
    public val = true;
    constructor(public route: ActivatedRoute, public commonSandbox: CommonSandbox, public approvalService: ApprovalFlagService) {
    }

    ngOnInit() {


        let setting = JSON.parse(localStorage.getItem('vendor-settings'))
        // Approval Status from services
        this.approvalService.mySubject$.subscribe((value: any) => {
            if (setting?.kycMandate == 1) {
                this.allowUnapprovedSeller = value?.approvalStatus;
            } else {
                this.allowUnapprovedSeller = false;
            }
        });

        // let settingData =JSON.parse(localStorage.getItem('vendor-settings'))
        // let VendorData=JSON.parse(localStorage.getItem('vendorUser'))
        // this.allowUnapprovedSeller = [0,2,3].includes(VendorData.approvalFlag) &&settingData.allowUnapprovedSeller == 0 ? true : false;
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
            loop: true,
            preloadImages: false,
            lazy: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false
            },
            speed: 500,
            breakpoints: {
                480: {
                    slidesPerView: 1
                },
                740: {
                    slidesPerView: 2,
                },
                960: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                },
                1500: {
                    slidesPerView: 5,
                }
            }
        };
    }

    closeSideMenu() {
        this.val = !this.val;
        this.sideMenuOpen = this.val;
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

}
