import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { AuthSandbox } from './core/auth/auth.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonSandbox } from './core/common/common.sandbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ApprovalFlagService } from './default/shared/components/approvalServices/approval-flag.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'spurtcommerce-multi-vendor';
  public isConnected = true;
  public noInternetConnection: boolean;
  public mylanguage: string;
  languageArray: any = [];
  sellerData: any = {};

  // Subscriptions
  private subscriptions: Subscription = new Subscription();
  constructor(
    private sandbox: AuthSandbox,
    public commonSandbox: CommonSandbox,
    public modal: NgbModal,
    private route: Router,
    private router: ActivatedRoute,
    private translate: TranslateService,
    private location: Location,
    private approvalService: ApprovalFlagService,

    @Inject(PLATFORM_ID) private platformId: Object,) { }

  ngOnInit() {

    if (!['', null, undefined].includes(localStorage.getItem('vendorToken'))) {
      this.commonSandbox.doGetProfile();
      this.subscriptions.add(this.commonSandbox.getProfile$.subscribe((profile: any) => {
        if (profile) {
          this.approvalService.updateValue(profile);
  
          let arr = ['/my-profile', '/seller-onboarding/seller-onboarding-Details', '/my-account/myshop', '/my-account/personalised-setting', '/seller-onboarding/seller-onboarding-Details?currentTab=1', '/seller-onboarding/seller-onboarding-Details?currentTab=2', '/seller-onboarding/seller-onboarding-Details?currentTab=3', '/my-account/myshop?currentTab=1', '/my-account/myshop?currentTab=2', '/my-account/myshop?currentTab=3', '/my-account/myshop?currentTab=4']
  
          if (profile?.approvalFlag != 1) {
            if (profile?.approvalFlag != 1 && arr.includes(this.location.path()) == false) {
              this.route.navigate(['/dashboard']);
            }
          }
        }
      }));
    }

 

    if (isPlatformBrowser(this.platformId)) {
      this.mylanguage = localStorage.getItem('defaultlanguage');
    };
    if (!this.mylanguage) {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    } else {
      if (this.mylanguage === 'en') {
        this.translate.use('en');
      } else {
        this.translate.use('hi');
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
