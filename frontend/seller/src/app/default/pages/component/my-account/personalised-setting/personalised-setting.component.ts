import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../../src/environments/environment';
import { CommonSandbox } from '../../../../../../../src/app/core/common/common.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { MyShopSandbox } from '../../../../../../../src/app/core/myShop/myShop.sandbox';
import { car, dateArray, timeArray, timeZoneArray } from './personalized-settings.constant';
import { ModalPopupComponent } from '../../catalog/manage-product/modalpopup/modalpopup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LanguageChangeService } from './language-change.service';
@Component({
  selector: 'app-personalised-setting',
  templateUrl: './personalised-setting.component.html',
  styleUrls: ['./personalised-setting.component.scss']
})
export class PersonalisedSettingComponent implements OnInit {
// Subscriptions
private subscriptions: Subscription = new Subscription();
  //langauge list
  public LanguageArray: any = [];
  // image url
  public imageUrl: any;

  // selected Languge
  public selectedLanguage: any
  selectedImage: any;
  public imagePath: any;
  dataSet: any;
  cars = car;
  date = dateArray;
  time = timeArray;
  zone = timeZoneArray;
  dateFormatChange: any 
  timeFormatChange: any
  timeZone: any
  sellerId: any;
  checkNg = 'en'
  vendorSettings: any = {};
  constructor(
    public commonSandbox: CommonSandbox,
    private translate: TranslateService,
    private changeDetector: ChangeDetectorRef,
    private title: Title,
    public myShopSandbox: MyShopSandbox,
    public modal: NgbModal,
    private languageService:LanguageChangeService
  ) {
    this.title.setTitle('Personalised Setting')
  }

  ngOnInit(): void {
    this.languageList();

    this.imageUrl = environment.imageUrl;
    this.vendorSettings = JSON.parse(localStorage.getItem('vendor-settings'));
    this.selectedLanguage = JSON.parse(localStorage.getItem('language'));
  }

  languageList() {
    const params = {
      limit: 0,
      offset: 0,
      keyword: '',
      count: 0
    }
    this.commonSandbox.languageList1(params);
  this.subscriptions.add(this.subscriptions.add(this.commonSandbox.languageList1$.subscribe(val => {
      if (val) {
        this.LanguageArray = val;
        this.getLanguageImage();
        this.getPersonalise();

      }
    })));
  }

  // change event 

  Languagechange(event: any) {
    this.selectedLanguage = event.languageId;
    this.getLanguageImage();
  }
  getLanguageImage() {
    this.selectedImage = this.LanguageArray?.find(vals => vals.languageId == this.selectedLanguage);
    // this.dataSet = this.selectedImage?.languageId
    this.changeDetector.markForCheck();
  }

  getPersonalise() {
    let token = localStorage.getItem('vendorToken');
    if(token){
      this.dateFormatChange  = '',
      this.timeFormatChange = '',
      this.timeZone = ''
      this.myShopSandbox.getPersonalizedSettings({});
      this.subscriptions.add(this.myShopSandbox.getPersonalizedSettings$.subscribe(val => {
        if (val.data) {
          this.sellerId = val.data.customerId;
          this.dateFormatChange =val?.data?.personalizedSettings?.dateFormat ?val?.data?.personalizedSettings?.dateFormat :JSON.parse(localStorage.getItem('dateTimeFormate'));
          this.timeFormatChange = val?.data?.personalizedSettings?.timeFormat ? val?.data?.personalizedSettings?.timeFormat: JSON.parse(localStorage.getItem('timeFormate'));
          this.timeZone = val?.data?.personalizedSettings?.timeZone ?? null;
  
          if (!['', null, undefined].includes(val.data?.personalizedSettings?.defaultLanguage) && val.data?.personalizedSettings?.defaultLanguage != 0) {
            let selectLang = this.LanguageArray?.find(vals => vals.languageId == val.data?.personalizedSettings?.defaultLanguage);
            this.translate.setDefaultLang(selectLang?.code);
            this.translate.use(selectLang?.code);
            this.languageService.triggerAction(selectLang?.name)
            localStorage.setItem('languageName', JSON.stringify(selectLang?.name));
            localStorage.setItem('language', JSON.stringify(selectLang?.code));
            this.dataSet = selectLang?.languageId;
            this.changeDetector.detectChanges();
          } else {
            
            let langSet = JSON.parse(localStorage.getItem('language'));
            let language = this.LanguageArray?.find(vals => vals.code == langSet);
            this.translate.setDefaultLang(language.code);
            this.translate.use(language.code);
            localStorage.setItem('languageName', JSON.stringify(language?.name));
            localStorage.setItem('language', JSON.stringify(language?.code));
            this.dataSet = language?.languageId;
            this.changeDetector.detectChanges();
          }
          
  
        }
      }))
    }

  }

  submit() {
    const params: any = {};
    params.defaultLanguage = this.dataSet,
      params.timeFormat = this.timeFormatChange,
      params.dateFormat = this.dateFormatChange,
      params.timeZone = this.timeZone
    params.id = this.sellerId
    let personalizedSetting: any = {
      personalizedSetting: params,
      vendorMedia: []

    };
    localStorage.setItem('timeZone', JSON.stringify(this.timeZone));
    localStorage.setItem('dateTimeFormate', JSON.stringify(this.dateFormatChange));
   localStorage.setItem('timeFormate', JSON.stringify(this.timeFormatChange));
    this.myShopSandbox.updatePersonalizedSettings(personalizedSetting);
  this.subscriptions.add(this.myShopSandbox.updatePersonalizedSettings$.subscribe(val => {
      if (val) {
     
        this.getPersonalise();
      }
    }))
    this.getLanguageImage();
  }

  cancel() {
    const modelRef = this.modal.open(ModalPopupComponent, {
      size: 'md', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories delete-modal",
    })
    modelRef.componentInstance.deleteMessage = "new changes"
    modelRef.result.then(result => {
      if (result == "deleted") {
        let langCode = JSON.parse(localStorage.getItem('language'));
        let language = this.LanguageArray?.find(vals => vals.code == langCode);
        this.dataSet = language.languageId
        this.dateFormatChange = JSON.parse(localStorage.getItem('dateTimeFormate'));
        this.timeFormatChange = JSON.parse(localStorage.getItem('timeFormate'));
        this.timeZone = JSON.parse(localStorage.getItem('timeZone'));
      }
    })

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
