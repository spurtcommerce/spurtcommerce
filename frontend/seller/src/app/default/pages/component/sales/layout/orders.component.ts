import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { OrderSandbox } from '../../../../../core/order/order.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotationComponentRoutes, VariantInventoriesRoutes } from '../../../../../../../add-ons/add-ons.constant';
import { CommonSandbox } from '../../../../../../../src/app/core/common/common.sandbox';
import { Subscription } from 'rxjs';
import { ApprovalFlagService } from '../../../../../../../src/app/default/shared/components/approvalServices/approval-flag.service';

@Component({
    selector: 'app-order-layout',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {

    // public config: SwiperConfigInterface = {};
    // Subscriptions
    private subscriptions: Subscription = new Subscription();
    config: any;
    public sideMenuOpen = true;
    public val = true;
    public id: any;
    public status: any;
    public vendorDetails: any;
    arr: any = ['back-orders-details']
    allowUnapprovedSeller: any;
    QuotationAddonRoute = QuotationComponentRoutes.length > 0;
    VariantInventoriesAddon = VariantInventoriesRoutes.length > 0;
    constructor(public orderSandbox: OrderSandbox, public router: Router, public route: ActivatedRoute, public commonSandbox: CommonSandbox, public approvalService:ApprovalFlagService) {
        this.router.events.subscribe((url: any) => {
            this.id = +this.router.url.split('?')[0].split('/').pop()
        });
    }

    ngOnInit() {
        this.getOrderCount();
        this.getVendorProfile();

        // Approval Status from services
        let setting = JSON.parse(localStorage.getItem('vendor-settings'))
        // Approval Status from services
        this.approvalService.mySubject$.subscribe((value: any) => {
          if (setting?.kycMandate == 1) {
            this.allowUnapprovedSeller = value?.approvalStatus;
          } else {
            this.allowUnapprovedSeller = false;
          }
        });

        // let settingData = JSON.parse(localStorage.getItem('vendor-settings'))
        // let VendorData = JSON.parse(localStorage.getItem('vendorUser'))
   
    }

    // get Vendor Profile
    private getVendorProfile() {
        this.subscriptions.add(this.commonSandbox.getProfile$.subscribe((profile: any) => {
            if (profile) {
                this.vendorDetails = profile;
            }

        }));


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
        this.sideMenuOpen = !this.sideMenuOpen;
    }

    openOrder() {
        this.sideMenuOpen = false;
    }

    getOrderCount() {
        const params: any = {};
        this.orderSandbox.getOrderCount(params);
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }
}
