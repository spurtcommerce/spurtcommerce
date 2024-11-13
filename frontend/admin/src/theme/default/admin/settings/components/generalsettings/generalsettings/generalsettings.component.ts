/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/index';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { CountrySandbox } from '../../../../../../../core/admin/settings/localizations/country/country.sandbox';
import { CurrencySandbox } from '../../../../../../../core/admin/settings/localizations/currency/currency.sandbox';
import { ZoneSandbox } from '../../../../../../../core/admin/settings/localizations/zone/zone.sandbox';
import { LanguagesSandbox } from '../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { GeneralSettingSandbox } from '../../../../../../../core/admin/settings/generalsetting/generalsetting.sandbox';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-spurt-genearlsettingsadd',
  templateUrl: './generalsettings.component.html',
  styleUrls: ['./generalsettings.component.css'],
})
export class GeneralSettingComponent implements OnInit, OnDestroy {

  @ViewChild('filePath') filePath: ElementRef;
  @ViewChild('filePath2') filePath2: ElementRef;
  @ViewChild('filePath3') filePath3: ElementRef;


  public postImageUrl: any = '';
  public postEmailImageUrl: any = '';
  public defaultMailImageUrl: any;
  public defaultImageUrl: any;
  public postInvoiceImageUrl: any = '';
  public defaultInvoiceImageUrl: any;
  public imageUrl: any;
  private keyword = '';
  public pageSize = '10';
  private offset = 0;
  // Form Group
  public generalSettings: UntypedFormGroup;
  public storeName: UntypedFormControl;
  public storeOwner: UntypedFormControl;
  public companySite: UntypedFormControl;
  public address: UntypedFormControl;
  public email: UntypedFormControl;
  public phonenumber: UntypedFormControl;
  public country: UntypedFormControl;
  public zone: UntypedFormControl;
  public language: UntypedFormControl;
  public currency: UntypedFormControl;
  public maintenanceMode: UntypedFormControl;
  public submitted: any;
  public countryRegion = [];
  public selectCountryId: any;
  public select: number;
  public countryListData: any = [];
  public selectCountry: any;
  logo: any;
  invoiceImg: any;
  mailImg: any;
  sitelogoimagetypeError: boolean;
  sitelogoimageSizeError: boolean;
  invoiceimagetypeError: boolean;
  invoiceimageSizeError: boolean;
  mailimagetypeError: boolean;
  mailimageSizeError: boolean;
  settingId: any;
  constructor(
    private changeDetectRef: ChangeDetectorRef,
    private router: Router,
    public fb: UntypedFormBuilder,
    public countrysandbox: CountrySandbox,
    public currencysandbox: CurrencySandbox,
    public zonesandbox: ZoneSandbox,
    public languageSandbox: LanguagesSandbox,
    public generalsettingsandbox: GeneralSettingSandbox,
    private configService: ConfigService,
    public translate: TranslateService
  ) { }

  private subscriptions: Array<Subscription> = [];

  // initially calls initForm,dropdownlist,getGeneralSetting
  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage')
      ? sessionStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.defaultImageUrl = '';
    this.defaultMailImageUrl = '';
    this.defaultInvoiceImageUrl = '';
    this.imageUrl = this.configService.getImageUrl();
    // this.postImageUrl = './assets/upload-banner/upload.png';
    // this.postEmailImageUrl = './assets/upload-banner/upload.png';
    // this.postInvoiceImageUrl = './assets/upload-banner/upload.png';
    this.initForm();
    this.dropdownlist();
    this.getGeneralSetting();
  }


  SelectCountry() {
    this.countryRegion = [];
    this.selectCountryId = this.generalSettings.value.country;

    this.zonesandbox.zoneList$.subscribe(data => {
      if (data) {
        data.forEach(element => {
          if (element) {
            if (element.country.countryId === this.selectCountryId) {
              this.countryRegion.push(element);
            }
          }
        });
      }

    });
    // this.countryRegion = [];  
    // this.selectCountryId = this.generalSettings.value.country;
    // this.countryListData.forEach((element,index) => {


    // });



  }
  changeCountry() {
    this.generalSettings.controls['zone'].reset()
    this.countryRegion = [];
    this.selectCountryId = this.generalSettings.value.country;

    this.zonesandbox.zoneList$.subscribe(data => {
      if (data) {
        data.forEach(element => {
          if (element) {
            if (element.country.countryId === this.selectCountryId) {
              this.countryRegion.push(element);
            }
          }
        });
      }

    });
  }



  /**
   * Handles form 'list' event. Calls sandbox GeneralSetting  generalsetting get data function .
   */
  getGeneralSetting() {
    this.generalsettingsandbox.getGeneralSetting();
  }

  dropdownlist() {
    this.countryList(this.offset, this.keyword);
    this.currencyList(this.offset);
    this.zonesList(this.offset);
    this.languageList(this.offset);
    this.zonesandbox.zoneList$.subscribe(data => {
      if (data) {
        this.subscribe();
      }
    });

  }

  /**
   * Handles form 'submit' event. Calls sandbox GeneralSetting createGeneralSetting  function if form is valid.
   *
   * @param params storing entire value
   */
  onSubmit() {
    this.submitted = true;
    if (this.generalSettings.invalid) {
      return;
    }
    this.resetimagerrors();
    const params: any = {};
    params.storename = this.generalSettings.value.storeName;
    params.storeowner = this.generalSettings.value.storeOwner;
    params.siteUrl = this.generalSettings.value.companySite;
    params.address = this.generalSettings.value.address;
    params.email = this.generalSettings.value.email;
    params.phonenumber = this.generalSettings.value.phonenumber;
    params.country = this.generalSettings.value.country;
    params.zone = this.generalSettings.value.zone;
    params.language = this.generalSettings.value.language;
    params.currency = this.generalSettings.value.currency;
    params.settingId = this.settingId || '';
    if (this.generalSettings.value.maintenanceMode === 'Yes') {
      params.maintenanceMode = 1;
    } else {
      params.maintenanceMode = 0;
    }
    if (this.defaultImageUrl) {
      params.image = this.postImageUrl;
    }
    if (this.defaultMailImageUrl !== '') {
      params.mailImage = this.postEmailImageUrl;
    }
    if (this.defaultInvoiceImageUrl !== '') {
      params.invoiceLogo = this.postInvoiceImageUrl;
    }
    this.generalsettingsandbox.createGeneralSetting(params);
    this.subscriptions.push(this.generalsettingsandbox.getNewGeneralSettings$.subscribe(data => {
      if (data && data.status === 1) {
        this.defaultImageUrl = '';
        this.defaultInvoiceImageUrl = '';
        this.defaultMailImageUrl = '';
      }
    }));
  }

  // VALIDATION
  get f() {
    return this.generalSettings.controls;
  }

  resetimagerrors()
  { 
    this.sitelogoimagetypeError = false;
    this.sitelogoimageSizeError = false;
    this.mailimageSizeError = false;
    this.mailimagetypeError = false;
    this.invoiceimagetypeError = false;
    this.invoiceimageSizeError = false;
  }

  // Form Group
  initForm() {
    const urlValidation = /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/ ;
    this.generalSettings = this.fb.group({
      storeName: [null, Validators.compose([
        Validators.maxLength(255)
      ])],
      storeOwner: [null],
      companySite: [null, [ Validators.required, Validators.pattern(urlValidation)]],
      address: [null, Validators.compose([
        Validators.maxLength(128)
      ])],
      email: [null, Validators.compose([
        Validators.maxLength(96)
      ])],
      phonenumber: [null, Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(4)
      ])],
      country: [null],
      zone: [''],
      language: [null],
      currency: [null],
      maintenanceMode: [null]
    });
  }

  /**
   * Handles form 'list' event. Calls sandbox country countryList function .
   *
   * @param params storing entire value
   */
  countryList(offset: number = 0, keyword) {
    const params: any = {};
    params.limit = 0;
    params.offset = offset;
    params.keyword = this.keyword;
    params.status = 1;
    this.countrysandbox.getCountriesList(params);
  }

  /**
   * Handles form 'list' event. Calls sandbox Currency getCurrencyList function .
   *
   * @param params storing entire value
   */
  currencyList(offset: any = 0) {
    const params: any = {};
    params.limit = 0;
    params.offset = offset;
    params.keyword = '';
    params.count = 0;
    params.status = 1;
    this.currencysandbox.getCurrencyList(params);
  }

  /**
   * Handles form 'list' event. Calls sandbox Zone getZoneList function .
   *
   * @param params storing entire value
   */
  zonesList(offset: number = 0) {
    const params: any = {};
    params.limit = 0;
    params.offset = offset;
    params.keyword = this.keyword;
    params.status = 1;
    this.zonesandbox.getZoneList(params);
  }

  /**
   * Handles form 'list' event. Calls sandbox Lanuage languageList function .
   *
   * @param params storing entire value
   */
  languageList(offset: number = 0) {
    const params: any = {};
    params.limit = 0;
    params.offset = offset;
    params.keyword = this.keyword;
    params.status = 1;
    this.languageSandbox.languageList(params);
  }

  // Image Upload

  uploadButtonClick() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }

  /**
   * Handles  'uploadChange' event. calls convertBase64 function
   *
   * @param $event .
   */
  uploadChange($event): void {
    this.convertBase64($event.target);
    this.logo = $event.target.files[0].name;
  }

  /**
   * Handles  'convertBase64' event. finally store the data in postImageUrl
   *
   * @param inputValue .
   */
  convertBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!_.includes(allowed_types, inputValue.files[0].type)) {
      this.sitelogoimagetypeError = true;
      // this.ImageUrl = '';
      this.filePath.nativeElement.value = '';
      return;
    }
    this.sitelogoimagetypeError = false;
    myReader.onloadend = e => {
      this.postImageUrl = myReader.result;
      this.defaultImageUrl = myReader.result;
      this.changeDetectRef.detectChanges();
    };
    const size = Math.round(inputValue.files[0].size / 1024);
    if (size > 2048) {
      this.sitelogoimageSizeError = true;
      // this.imageUrls = '';

      this.filePath.nativeElement.value = '';
       return;
    }
    this.sitelogoimageSizeError = false;
    myReader.readAsDataURL(file);
  }

  uploadMailImage(event) {
    this.convertMailImageBase64(event.target);
    this.mailImg = event.target.files[0].name;
  }

  uploadMailButtonClick() {
    const el: HTMLElement = this.filePath2.nativeElement as HTMLElement;
    el.click();
  }

  convertMailImageBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!_.includes(allowed_types, inputValue.files[0].type)) {
      this.mailimagetypeError = true;
      // this.ImageUrl = '';
      this.filePath.nativeElement.value = '';
      return;
    }
    this.mailimagetypeError = false;
    myReader.onloadend = e => {
      this.postEmailImageUrl = myReader.result;
      this.defaultMailImageUrl = myReader.result;
      this.changeDetectRef.detectChanges();
    };
    const size = Math.round(inputValue.files[0].size / 1024);
    if (size > 2048) {
      this.mailimageSizeError = true;
      // this.imageUrls = '';

      this.filePath.nativeElement.value = '';
       return;
    }
    this.mailimageSizeError = false;
    myReader.readAsDataURL(file);
  }

  uploadInvoiceImage(event) {
    this.convertInvoiceImageBase64(event.target);
    this.invoiceImg = event.target.files[0].name
  }

  uploadInvoiceButtonClick() {
    const el: HTMLElement = this.filePath3.nativeElement as HTMLElement;
    el.click();
  }

  convertInvoiceImageBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!_.includes(allowed_types, inputValue.files[0].type)) {
      this.invoiceimagetypeError = true;
      // this.ImageUrl = '';
      this.filePath.nativeElement.value = '';
      return;
    }
    this.invoiceimagetypeError = false;
    myReader.onloadend = e => {
      this.defaultInvoiceImageUrl = myReader.result;
      this.postInvoiceImageUrl = myReader.result;
      this.changeDetectRef.detectChanges();
    };
    const size = Math.round(inputValue.files[0].size / 1024);
    if (size > 2048) {
      this.invoiceimageSizeError = true;
      // this.imageUrls = '';

      this.filePath.nativeElement.value = '';
       return;
    }
        this.invoiceimageSizeError = false;
    myReader.readAsDataURL(file);
  }

  subscribe() {
    this.subscriptions.push(
      this.generalsettingsandbox.getGeneralSettings$.subscribe(data => {
        if (data && data[0]) {
          this.settingId = data[0].settingId
          this.generalSettings.controls['storeName'].setValue(
            data[0].storeName
          );
          this.generalSettings.controls['storeOwner'].setValue(
            data[0].storeOwner
          );
          this.generalSettings.controls['companySite'].setValue(
            data[0].siteUrl
          );
          this.generalSettings.controls['address'].setValue(
            data[0].storeAddress
          );
          this.generalSettings.controls['country'].setValue(data[0].countryId);
          this.generalSettings.controls['zone'].setValue(data[0].zoneId);
          // this.selectCountry = data[0].countryId;
          // this.select = data[0].zoneId;
          this.selectCountryId = data[0].countryId;
          // this.zonesandbox.zoneList$.subscribe(data => {
          // if (data) {
          this.SelectCountry();
          // }
          // });
          this.generalSettings.controls['email'].setValue(data[0].storeEmail);
          this.generalSettings.controls['phonenumber'].setValue(
            data[0].storeTelephone
          );
          this.generalSettings.controls['language'].setValue(
            data[0].storeLanguageName
          );
          if (data[0].maintenanceMode === 1) {
            this.generalSettings.patchValue({
              maintenanceMode: 'Yes',
              tc: true
            });
          } else if (data[0].maintenanceMode === 0) {
            this.generalSettings.patchValue({
              maintenanceMode: 'No',
              tc: true
            });
          }
          this.generalSettings.controls['currency'].setValue(
            data[0].storeCurrencyId
          );
          if (data[0].storeLogoPath && data[0].storeLogo) {
            this.postImageUrl =
              this.imageUrl + '?path=' +
              `${data[0].storeLogoPath}` + '&name=' +
              `${data[0].storeLogo}` +
              '&width=160&height=150';
            this.changeDetectRef.detectChanges();
          }

          if (data[0].emailLogoPath && data[0].emailLogo) {
            this.postEmailImageUrl =
              this.imageUrl + '?path=' +
              `${data[0].emailLogoPath}` + '&name=' +
              `${data[0].emailLogo}` +
              '&width=160&height=150';
            this.changeDetectRef.detectChanges();
          }

          if (data[0].invoiceLogoPath && data[0].invoiceLogo) {
            this.postInvoiceImageUrl =
              this.imageUrl + '?path=' +
              `${data[0].invoiceLogoPath}` + '&name=' +
              `${data[0].invoiceLogo}` +
              '&width=160&height=150';
            this.changeDetectRef.detectChanges();
          }
        }
      })
    );
  }

  generalsettingcancel() {
    this.router.navigate(['/settings']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
