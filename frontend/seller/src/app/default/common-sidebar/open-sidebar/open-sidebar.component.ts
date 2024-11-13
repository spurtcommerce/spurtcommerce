import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSandbox } from '../../../../../src/app/core/auth/auth.sandbox';
import { CommonSandbox } from '../../../../../src/app/core/common/common.sandbox';
import { environment } from '../../../../../src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { chatAction, chatConversationComponents } from '../../../../../add-ons/add-ons.constant';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ApprovalFlagService } from '../../shared/components/approvalServices/approval-flag.service';
import { CommonService } from '../../../../../src/app/core/common/common.service';

@Component({
  selector: 'app-open-sidebar',
  templateUrl: './open-sidebar.component.html',
  styleUrls: ['./open-sidebar.component.scss']
})
export class OpenSidebarComponent implements OnInit, OnDestroy {
  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  private subscription: Array<Subscription> = [];

  languageArray: any = [];
  showLanguage: any;
  public userProfileDetails: any;
  public approvalFlag: boolean = false;
  public imageUrl: string = environment.imageUrl;
  public ProfileImage: any;
  vendorDetails: any;
  // public vendorDetails = JSON.parse(localStorage.getItem('vendorUser'));
  addonData = chatConversationComponents
  getSettingsDetails: any = [];
  sellerData: any = {};
  maxPostSellerImageUrl:any;
  miniPostSellerImageUrl:any
  constructor(
    private sandbox: AuthSandbox,
    public router: Router,
    public commonSandbox: CommonSandbox,
    public modal: NgbModal,
    private translate: TranslateService,
    private changeDetectorRef: ChangeDetectorRef,
    private approvalService: ApprovalFlagService,
    private CommonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getVendorProfile();
    this.getLanguageList();
    this.getSettings();
  }

  getVendorProfile() {


    this.CommonService.profileAPi({}).subscribe((val) => {
      if (val && val.status == 1) {

        if (val && val) {
          

          if (JSON.parse(localStorage.getItem('vendor-settings'))?.kycMandate == 1) {
            this.approvalFlag = [0, 2, 3].includes(val?.data?.approvalFlag) ? true : false;
            this.changeDetectorRef.detectChanges();
          } else {
            this.approvalFlag = false;
          this.changeDetectorRef.detectChanges();
            }


          this.userProfileDetails = val?.data?.customerDetail;
        
          if (val.data?.customerDetail?.avatarPath && val?.data?.customerDetail?.avatar) {
            this.ProfileImage = this.imageUrl + '?path=' + val?.data?.customerDetail.avatarPath + '&name=' + val?.data?.customerDetail.avatar + '&width=300&height=300';
          }
        }
        localStorage.setItem('vendorUser', JSON.stringify(val.data));
        if (!['', null, undefined].includes(val.data)) {
          
          this.userProfileDetails = val?.data?.customerDetail;
          if (val?.data?.customerDetail?.avatarPath && val?.data?.customerDetail.avatar) {
            this.ProfileImage = this.imageUrl + '?path=' + val?.data?.customerDetail?.avatarPath + '&name=' + val?.data?.customerDetail.avatar + '&width=300&height=300';
          }
        } else {
          let userData = localStorage.getItem('vendorUser');
          this.userProfileDetails = JSON.parse(userData)?.customerDetail
          if (JSON.parse(userData)?.customerDetail.avatarPath && JSON.parse(userData)?.customerDetail.avatar) {
            this.ProfileImage = this.imageUrl + '?path=' + JSON.parse(userData)?.customerDetail.avatarPath + '&name=' + JSON.parse(userData)?.customerDetail.avatar + '&width=300&height=300';

          }
        }
      }
    })




  }

  logout() {
    this.sandbox.doLogout({});

    localStorage.removeItem('vendorUserDetails');
    localStorage.removeItem('vendorUser');
    localStorage.removeItem('vendor-settings');
    localStorage.removeItem('vendorToken');
    localStorage.removeItem('language');
    localStorage.removeItem('dateTimeFormate');
    localStorage.removeItem('timeFormate');
    localStorage.removeItem('timeZone');
    localStorage.clear();
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.commonSandbox.clearSetting()
    this.changeDetectorRef.detectChanges();
    this.router.navigate(['/auth/login']);
  }

  getLanguageList() {
    const params = {
      limit: 0,
      offset: 0,
      keyword: '',
      count: 0
    }
    this.commonSandbox.languageList1(params);
    this.subscriptions.add(this.commonSandbox.languageList1$.subscribe(val => {
      if (val) {
        this.languageArray = val;
        // this.showLanguage = val;

      }
    }));
  }

  logorouter() {
    this.router.navigate(['/dashboard']);
  }


  getCount() {
    let val = JSON.parse(localStorage.getItem('chatBackups'))
    val = val ?? []
    let count = 0;

    count = count + val.filter(valsss => valsss.isRead == 0).length

    return count;
  }


  chatconversation() {

    
    let chatActions: string = chatAction;
    if (chatActions == 'Components') {
      const modelRef = this.modal.open(this.addonData[0], {
        size: 'sm', windowClass: 'Quotation-request-model chatmodal right ', backdrop: 'static', backdropClass: 'createcr'
      });
    } else {
      this.router.navigate(['/chatconversation'])
    }
  }

  getSettings() {
    this.commonSandbox.doSettings();
    this.subscriptions.add(this.commonSandbox.getSetting$.subscribe(val => {
      if (val?.length > 0) {

        // this.approvalFlag = val[0]?.allowUnapprovedSeller
        this.sellerData = JSON.parse(localStorage.getItem('vendorUser'));
        val?.forEach(element => {
          this.maxPostSellerImageUrl =  this.imageUrl + '?path=' +element?.sellerLogoPath + '&name=' +element.sellerLogo + '&width=500&height=500';
          this.miniPostSellerImageUrl =  this.imageUrl + '?path=' +element?.sellerLogo2Path + '&name=' +element.sellerLogo2 + '&width=500&height=500';
          // localStorage.setItem('language', JSON.stringify('eng'));
          localStorage.setItem('dateTimeFormate', JSON.stringify(this.sellerData?.personalizedSettings?.dateFormat != '' ? this.sellerData?.personalizedSettings?.dateFormat : element.dateFormat));
          localStorage.setItem('timeFormate', JSON.stringify(this.sellerData?.personalizedSettings?.timeFormat != '' ? this.sellerData?.personalizedSettings?.timeFormat : element.timeFormat));
          if (!['', null, undefined].includes(this.sellerData?.personalizedSettings?.defaultLanguage) && this.sellerData?.personalizedSettings?.defaultLanguage != 0) {

            let selectLang = this.languageArray?.find(vals => vals.languageId == this.sellerData.personalizedSettings?.defaultLanguage);
            if (!['', null, undefined].includes(selectLang)) {
              localStorage.setItem('language', JSON.stringify(selectLang?.code));
              this.translate.setDefaultLang(selectLang.code);
              this.translate.use(selectLang.code);
              this.showLanguage = selectLang.name;
            }

          } else {
            if (this.languageArray.length > 0) {
              let selectLang = this.languageArray?.find(vals => vals.languageId == element?.defaultLanguageId);
              this.translate.setDefaultLang(selectLang.code);
              this.translate.use(selectLang.code);
              localStorage.setItem('language', JSON.stringify(selectLang?.code));
              this.showLanguage = selectLang.name;

            }

          }
        })

      }
    }))
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }


}
