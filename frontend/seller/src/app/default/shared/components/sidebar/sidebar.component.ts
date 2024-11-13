import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
import { AuthSandbox } from '../../../../core/auth/auth.sandbox';
import { CommonSandbox } from '../../../../core/common/common.sandbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { chatAction, chatConversationComponents } from '../../../../../../add-ons/add-ons.constant';
import { LanguageChangeService } from '../../../../../../src/app/default/pages/component/my-account/personalised-setting/language-change.service';
import { Subscription } from 'rxjs';
import { ApprovalFlagService } from '../approvalServices/approval-flag.service';
import { CommonService } from '../../../../../../src/app/core/common/common.service';

export const menu = [
  {
    path: '/dashboard',
    title: 'Dashboard.dashboard',
    image: 'assets/imgs/header-icons/dashboard.svg',
    activeImage: 'assets/imgs/header-icons/dashboard-on.svg',
    darkImage: 'assets/imgs/header-icons/dashboard-lite.svg',
    activedarkImage: 'assets/imgs/header-icons/dashboard-lite-on.svg',
    submenu: [],
    extralink: false,
    class: ''
  },
  {
    path: '/sales',
    title: 'Dashboard.sales',
    image: 'assets/imgs/header-icons/MainSales.svg',
    activeImage: 'assets/imgs/header-icons/MainSales-on.svg',
    darkImage: 'assets/imgs/header-icons/MainSales-lite.svg',
    activedarkImage: 'assets/imgs/header-icons/MainSales-lite-on.svg',
    submenu: [],
    class: '',
    extralink: false
  },

  {
    path: '/catalog',
    title: 'Dashboard.catalog',
    image: 'assets/imgs/header-icons/MainCatelog.svg',
    activeImage: 'assets/imgs/header-icons/MainCatelog-on.svg',
    darkImage: 'assets/imgs/header-icons/MainCatelog-lite.svg',
    activedarkImage: 'assets/imgs/header-icons/MainCatelog-lite-on.svg',
    submenu: [],
    class: '',
    extralink: false
  },

  {
    path: '/crm',
    title: 'Dashboard.crm',
    image: 'assets/imgs/header-icons/MainCustomers.svg',
    activeImage: 'assets/imgs/header-icons/MainCustomers-on.svg',
    darkImage: 'assets/imgs/header-icons/MainCustomers-lite.svg',
    activedarkImage: 'assets/imgs/header-icons/MainCustomers-lite-on.svg',
    submenu: [],
    class: '',
    extralink: false
  },

  // {
  //   path: '/cms',
  //   title: 'Dashboard.cms',
  //   image: 'assets/imgs/header-icons/MainCMS.svg',
  //   activeImage: 'assets/imgs/header-icons/MainCMS-on.svg',
  //   darkImage:  'assets/imgs/header-icons/MainCMS-lite.svg',
  //   activedarkImage: 'assets/imgs/header-icons/MainCMS-lite-on.svg',
  //   submenu: [],
  //   class: '',
  //   extralink: false
  // },
  {
    path: '/marketing',
    title: 'Dashboard.marketing',
    image: 'assets/imgs/header-icons/MainMarketing.svg',
    activeImage: 'assets/imgs/header-icons/MainMarketing-on.svg',
    darkImage: 'assets/imgs/header-icons/MainMarketing-lite.svg',
    activedarkImage: 'assets/imgs/header-icons/MainMarketing-lite-on.svg',
    submenu: [],
    class: '',
    extralink: false
  },
  {
    path: '/reports',
    title: 'Dashboard.reports',
    image: 'assets/imgs/header-icons/MainAuditlog.svg',
    activeImage: 'assets/imgs/header-icons/MainAuditlog-on.svg',
    darkImage: 'assets/imgs/header-icons/MainAuditlog-lite.svg',
    activedarkImage: 'assets/imgs/header-icons/MainAuditlog-lite-on.svg',

    submenu: [],
    class: '',
    extralink: false
  },
  {
    path: '/support',
    title: 'Support',
    image: 'assets/imgs/header-icons/earnings.svg',
    activeImage: 'assets/imgs/header-icons/earnings-on.svg',
    darkImage: 'assets/imgs/header-icons/earnings-lite.svg',
    activedarkImage: 'assets/imgs/header-icons/earnings-lite-on.svg',
    submenu: [],
    class: '',
    extralink: false
  },
  // {
  //   path: '/earnings',
  //   title: 'Dashboard.earnings',
  //   image: 'assets/imgs/header-icons/earnings.svg',
  //   activeImage: 'assets/imgs/header-icons/earnings-on.svg',
  //   darkImage:  'assets/imgs/header-icons/earnings-lite.svg',
  //   activedarkImage: 'assets/imgs/header-icons/earnings-lite-on.svg',
  //   submenu: [],
  //   class: '',
  //   extralink: false
  // },
  {
    path: '/settlements',
    title: 'Supplier Management',
    image: 'assets/imgs/header-icons/earnings.svg',
    activeImage: 'assets/imgs/header-icons/earnings-on.svg',
    darkImage: 'assets/imgs/header-icons/earnings-lite.svg',
    activedarkImage: 'assets/imgs/header-icons/earnings-lite-on.svg',
    submenu: [],
    class: '',
    extralink: false
  },


];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  // Subscriptions
  private subscriptions: Subscription = new Subscription();
  showLanguage: any;
  menuItem: any;
  showMenu = 'Dashboard';
  public approvalFlag: any;
  showSubMenu = '';
  themes: any = '';
  public userDetails = JSON.parse(localStorage.getItem('vendorUserDetails'));
  public userProfileDetails: any;
  public imageUrl: any = '';
  selectedLanguge: string;
  languageListResponse: any;
  imagePath = environment.imageUrl;
  selectedImage: any;
  languageList: any;
  status: any = '';
  languageArray: any = [];
  addonData = chatConversationComponents;
  public ProfileImage: any;
  miniPostSellerImageUrl: any;
  maxPostSellerImageUrl: any
  getSettingsDetails: any = [];
  sellerData: any = {};
  vendorDetails: any;
  image: any
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public commonSandbox: CommonSandbox,
    public sandbox: AuthSandbox,
    public router: Router,
    private translate: TranslateService,
    public modal: NgbModal,
    private changeDetector: ChangeDetectorRef,
    public activeroute: ActivatedRoute,
    private languageService: LanguageChangeService,
    private approvalService: ApprovalFlagService,
    private CommonService: CommonService
  ) {
    JSON.stringify(localStorage.setItem('themes', 'light'));
  }

  ngOnInit() {
    this.sellerData = JSON.parse(localStorage.getItem('vendorUser'));
    this.addOnConfig();
    this.imageUrl = environment.imageUrl;
    this.menuItem = menu;
    this.getTheameMode();
    this.getLanguageList();
    this.getSettings();


    this.subscriptions.add(this.languageService.actionObservable$.subscribe((data) => {
      this.showLanguage = data;
    }));




    this.CommonService.profileAPi({}).subscribe((profile) => {
      if (profile && profile?.status == 1) {
        localStorage.setItem('vendorUser', JSON.stringify(profile?.data));
        if (JSON.parse(localStorage.getItem('vendor-settings'))?.kycMandate == 1) {
          this.approvalFlag = [0, 2, 3].includes(profile?.data?.approvalFlag) ? true : false;
          this.changeDetector.detectChanges();
        } else {
          this.approvalFlag = false;
          this.changeDetector.detectChanges();
        }





        if (!['', null, undefined].includes(profile.data)) {

          this.userProfileDetails = profile?.data?.customerDetail;
          if (profile?.data?.customerDetail?.avatarPath && profile?.data?.customerDetail.avatar) {
            // this.image = this.imageUrl + '?path=' + profile?.data?.customerDetail?.avatarPath + '&name=' + profile?.data?.customerDetail.avatar + '&width=300&height=300';
            this.changeDetector.detectChanges();
          }
        } else {
          // let userData = localStorage.getItem('vendorUser');
          // this.userProfileDetails = JSON.parse(userData)?.customerDetail
          // if (JSON.parse(userData)?.customerDetail.avatarPath && JSON.parse(userData)?.customerDetail.avatar) {
          //   this.image = this.imageUrl + '?path=' + JSON.parse(userData)?.customerDetail.avatarPath + '&name=' + JSON.parse(userData)?.customerDetail.avatar + '&width=300&height=300';
          //   this.changeDetector.detectChanges();
          // }
        }

      }
    })

  }

  getTheameMode() {
    if (localStorage.getItem('themes')) {
      this.themes = localStorage.getItem('themes');
      if (this.themes == 'dark') {
        this.document.body.classList.replace('light', 'dark');
      }
      if (this.themes == 'light') {
        this.document.body.classList.replace('dark', 'light');
      }


    }
  }
  openDropdown(event) {
    event.stopPropagation();
  }

  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  logorouter() {
    this.router.navigate(['/dashboard']);
  }

  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  searchMenu(keyword) {
    this.menuItem = menu;
    this.menuItem = this.menuItem.filter(item => {
      return item.title.toLowerCase().includes(keyword);
    });
  }

  getColor(color) {
    if (localStorage.getItem('colorPalette') === color) {
      return true;
    } else {
      return false;
    }
  }

  darkMode(e) {
    if (e == true) {
      this.document.body.classList.replace('light', 'dark');
      JSON.stringify(localStorage.setItem('themes', 'dark'));
      this.getTheameMode()
    } else {
      this.document.body.classList.replace('dark', 'light');
      JSON.stringify(localStorage.setItem('themes', 'light'));
      this.getTheameMode()
    }
    this.changeDetector.detectChanges();
  }

  logout() {
    this.sandbox.doLogout({});
    localStorage.removeItem('vendorUserDetails');
    localStorage.removeItem('vendorUser');
    localStorage.removeItem('vendor-settings');
    localStorage.removeItem('vendorToken');
    localStorage.removeItem('language');
    this.router.navigate(['/auth/login']);
  }

  getSettings() {
    this.commonSandbox.doSettings();
    this.subscriptions.add(this.commonSandbox.getSetting$.subscribe(val => {
      if (val) {
        // this.approvalFlag = [0,2,3].includes(this.vendorDetails?.approvalFlag) && val[0]?.allowUnapprovedSeller == 0 ? true : false;
        this.getSettingsDetails = val;
        let userData = localStorage.getItem('vendorUser');
        this.userProfileDetails = JSON.parse(userData)?.customerDetail
        if (JSON.parse(userData)?.customerDetail.avatarPath && JSON.parse(userData)?.customerDetail.avatar) {
          this.image = this.imageUrl + '?path=' + JSON.parse(userData)?.customerDetail.avatarPath + '&name=' + JSON.parse(userData)?.customerDetail.avatar + '&width=300&height=300';
          this.changeDetector.detectChanges();
        }
        // this.sellerData
        val?.forEach(element => {

          this.maxPostSellerImageUrl = this.imageUrl + '?path=' + element?.sellerLogoPath + '&name=' + element.sellerLogo + '&width=500&height=500';
          this.miniPostSellerImageUrl = this.imageUrl + '?path=' + element?.sellerLogo2Path + '&name=' + element.sellerLogo2 + '&width=500&height=500';

          localStorage.setItem('dateTimeFormate', JSON.stringify(this.sellerData?.personalizedSettings?.dateFormat != '' ? this.sellerData?.personalizedSettings?.dateFormat : element.dateFormat));
          localStorage.setItem('timeFormate', JSON.stringify(this.sellerData?.personalizedSettings?.timeFormat != '' ? this.sellerData?.personalizedSettings?.timeFormat : element.timeFormat));

          if (!['', null, undefined].includes(this.sellerData?.personalizedSettings?.defaultLanguage) && this.sellerData?.personalizedSettings?.defaultLanguage != 0) {
            let selectLang = this.languageArray?.find(vals => vals.languageId == this.sellerData.personalizedSettings?.defaultLanguage);
            if (!['', null, undefined].includes(selectLang)) {
              localStorage.setItem('language', JSON.stringify(selectLang?.code));
              this.translate.setDefaultLang(selectLang?.code);
              this.translate.use(selectLang?.code);
              this.showLanguage = selectLang?.name;
            }

          } else {
            if (this.languageArray.length > 0) {
              let selectLang = this.languageArray?.find(vals => vals.languageId == element?.defaultLanguageId);
              localStorage.setItem('language', JSON.stringify(selectLang?.code));
              this.translate.setDefaultLang(selectLang?.code);
              this.translate.use(selectLang?.code);
              this.showLanguage = selectLang?.name;
            }

          }

        })
      }
    }))


  }

  addOnConfig() {
    this.commonSandbox.addOnConfig({});
    this.commonSandbox.addOnConfig$.subscribe((val) => {
      localStorage.setItem("addons", JSON.stringify(val))
    })
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


      }
    }))
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
  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}
