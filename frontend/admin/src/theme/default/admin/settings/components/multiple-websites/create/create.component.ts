import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import { CategoriesSandbox } from '../../../../../../../../src/core/admin/catalog/category/categories.sandbox';
import { CurrencySandbox } from '../../../../../../../../src/core/admin/settings/localizations/currency/currency.sandbox';
import { LanguagesSandbox } from '../../../../../../../../src/core/admin/settings/localizations/languages/languages.sandbox';
import { MultipleWebsitesSandbox } from '../../../../../../../../src/core/admin/settings/multiple-websites/multiple-websites.sandbox';
import { MultipleWebsitesService } from '../../../../../../../../src/core/admin/settings/multiple-websites/multiple-websites.service';
import { SellerSandbox } from '../../../../../../../../src/core/admin/vendor/pages/seller/seller.sandbox';
import { ConfigService } from '../../../../../../../../src/core/admin/service/config.service';
@Component({
  selector: "app-create",
  host: {
    class: "multi-web",
  },
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {

  multipleWebsitesForm: UntypedFormGroup;
  accessKey: any;
  actives = 1;
  countryId: number;
  activeStatus: any;
  public selectedCategories: any = [];
  public selectedCountryList: any = [];
  public filteredArray: any[];
  public show: boolean;
  filterSearch;
  filterCountrySearch;
  filterSearchCountries;
  categoryList;
  tempCategoryData: any = [];
  tempCountryData: any = [];
  filterSearchCategories;
  settingId: any;
  logoArray: any;
  logotypeError: boolean;
  logoimageSizeError: boolean;
  public ImageUrl: any;
  public imageUrls: any;
  imageUrl: any;
  countryList: any = [];
  loading: boolean = false;
  imageChangedEvent: any;
  countryLists: any = []
  public defaultInvoiceImageUrl: any;
  isGenerating = false;
  detailsData;
  siteName: any;
  searchText: any;
  searchAssignCategory: any
  countryListSearch: any;
  assignedCountryList: any;
  mailImg: any
  time: any;
  mailimagetypeError: boolean;
  public postEmailImageUrl: any = '';
  public defaultMailImageUrl: any;
  mailimageSizeError: boolean;
  invoiceImg: any;
  invoiceimagetypeError: boolean;
  invoiceimageSizeError: boolean;
  websiteimagetypeError: boolean;
  websiteimageSizeError: boolean;
  public postInvoiceImageUrl: any = '';

  // Admin logo
  adminImageTypeError: boolean;
  adminImageSizeError: boolean;
  postAdminImageUrl: any = ''
  defaultAdminImageUrl: any

  // seller logo
  sellerImageTypeError: boolean;
  sellerImageSizeError: boolean;
  postSellerImageUrl: any = ''
  defaultSellerImageUrl: any

  // seller mini logo
  miniSellerImageTypeError: boolean;
  miniSellerImageSizeError: boolean;
  miniPostSellerImageUrl: any = ''
  miniDefaultSellerImageUrl: any


  timeDropdown = [
    { id: 1, name: '12 hrs' },
    { id: 2, name: '24 hrs' },

  ];
  dateFormats = [
    { value: 'M/d/yy', name: 'M/d/yy' },
    { value: 'dd/MM/yyyy', name: 'dd/MM/yyyy' },
    { value: 'MMM dd, yyyy', name: 'MMM dd, yyyy' },
    { value: 'dd MMM yyyy', name: 'dd MMM yyyy' },
    { value: 'yyyy-MM-dd', name: 'yyyy-MM-dd' },
  ];
  selectedDateFormat: any = 'YYYY-MM-DD'; // Default date format

  currentDate = new Date();
  imageType: any;
  imageSize: number;
  imageTypeSupport: string;
  imageSizeSupport: string;
  ListofCountries: any;
  support: string;

  // Function to update date format
  updateDateFormat(selectedFormat: string): void {
    this.selectedDateFormat = selectedFormat;
  }

  // Function to format date using Moment.js
  formatDate(date: Date): string {
    return moment(date).format(this.selectedDateFormat);
  }


  // new key: 

  websitekey: any;

  @ViewChild("filePath") filePath: ElementRef;
  submitted: boolean;
  imageLogo: any;
  postImageUrl: any;
  defaultWebsiteStatus: any;
  systemstatus: any;
  maintainence: any;
  pending: any;
  stateList: any = [];
  constructor(
    private fb: UntypedFormBuilder,
    public multipleWebsitesSandbox: MultipleWebsitesSandbox,
    public sellerSandbox: SellerSandbox,
    public service: MultipleWebsitesService,
    private changeDetectRef: ChangeDetectorRef,
    public currencysandbox: CurrencySandbox,
    public languageSandbox: LanguagesSandbox,
    public categoriessandbox: CategoriesSandbox,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    public modal: NgbModal,
    public changeDetector: ChangeDetectorRef,
    private datePipe: DatePipe,
    public titleService: Title,
    private configService: ConfigService
  ) {
    this.titleService.setTitle('Settings | Store Settings');
  }

  removeDuplicates(array, key) {
    return array.filter((item, index, self) =>
      index === self.findIndex(obj =>
        obj[key] === item[key]
      )
    );
  }

  ngOnInit() {
    this.imageUrl = this.configService.getImageUrl();
    this.imageType = this.configService.getImageType();
    this.imageSize = this.configService.getFileSize();
    this.imageTypeSupport = this.configService.getimageTypeSupport();
    this.imageSizeSupport = this.configService.getimageSizeSupport();
    this.support = this.configService.getFileSupport();
    this.inItForm();
    this.getCountryList();
    this.settingId = this.route.snapshot.paramMap.get("id");
    if (this.settingId) {
      this.getSettings();
    }
    
    this.currencyList();
    this.languageList();
    this.getCategoryList();
  }
  getSettings() {
    const params = {
      id: this.settingId,
    };
    this.multipleWebsitesSandbox.GetSettingsMultipleWebsites(params);
    this.multipleWebsitesSandbox.GetSettingsMultipleWebsites$.subscribe((data: any) => {
      if (data) {
        this.detailsData = data;
        this.siteName = data?.siteName;
        this.multipleWebsitesForm.controls['siteName'].setValue(data?.siteName ? data?.siteName : '');
        this.multipleWebsitesForm.controls['siteURL'].setValue(data?.siteUrl ? data?.siteUrl : '');
        this.multipleWebsitesForm.controls['shortDescription'].setValue(data?.storeDescription ? data?.storeDescription : '');
        this.multipleWebsitesForm.controls['active'].setValue(data?.isActive ? data?.isActive : 0);
        this.multipleWebsitesForm.controls['businessName'].setValue(data?.businessName ? data?.businessName : '');
        this.multipleWebsitesForm.controls['email'].setValue(data?.storeEmail ? data?.storeEmail : '');
        this.multipleWebsitesForm.controls['mobile'].setValue(data?.storeTelephone ? data?.storeTelephone : '');
        this.multipleWebsitesForm.controls['businessOwnerName'].setValue(data?.storeOwner ? data?.storeOwner : '');
        this.multipleWebsitesForm.controls['address1'].setValue(data?.storeAddress1 ? data?.storeAddress1 : '');
        this.multipleWebsitesForm.controls['address2'].setValue(data?.storeAddress2 ? data?.storeAddress2 : '');
        this.multipleWebsitesForm.controls['city'].setValue(data?.storeCity ? data?.storeCity : '');
        if (data.countryId) {
          this.sellerSandbox.getCountryList$.subscribe((resp: any) => {
            resp?.filter((res: any) => {
              if (res?.countryId == data?.countryId) {
                this.multipleWebsitesForm.controls['country'].setValue(Number(res?.countryId));
              }
            })
          })
          this.getZoneList(data?.countryId);
          this.stateList.filter((res: any) => {
          
              if (res?.zoneId == data?.zoneId) {
                this.multipleWebsitesForm.controls['state'].setValue(res?.zoneId);
              }
            })
            // this.multipleWebsitesForm.controls['state'].setValue(Number(data?.zoneId));
       
        } if (data?.currencyCode) {
          this.currencysandbox.currencyList$.subscribe((resp: any) => {
            resp?.filter((res: any) => {
              if (res.code == data?.currencyCode) {
                this.multipleWebsitesForm.controls['currency'].setValue(res.title);
              }
            })
          })
        }
        this.multipleWebsitesForm.controls['postcode'].setValue(data?.storePostalCode ? data?.storePostalCode : '');
        this.multipleWebsitesForm.controls['format'].setValue(data?.currencyFormat ? data?.currencyFormat : '');
        this.multipleWebsitesForm.controls['symbol'].setValue(data?.currencySymbol ? data?.currencySymbol : data?.symbolLeft ? data.symbolLeft : '');
        this.multipleWebsitesForm.controls['defaultLanguage'].setValue(data?.storeLanguageName ? data?.storeLanguageName : '');
        this.multipleWebsitesForm.controls['secondaryLanguage'].setValue(data?.storeSecondaryLanguageName ? data?.storeSecondaryLanguageName : '');
        if (data?.defaultCountry) {
          this.sellerSandbox.getCountryList$.subscribe((resp: any) => {
            resp?.filter((res: any) => {
              if (res?.countryId == data?.defaultCountry) {
                this.multipleWebsitesForm.controls['defaultCountry'].setValue((res?.countryId));
              }
            })
          })
        }
        // this.multipleWebsitesForm.controls['defaultCountry'].setValue((data?.defaultCountry));
        this.multipleWebsitesForm?.controls['metatitle'].setValue(data?.metaTagTitle ? data?.metaTagTitle : '');
        this.multipleWebsitesForm.controls['metaDescription'].setValue(data?.metaTagDescription ? data?.metaTagDescription : '');
        this.multipleWebsitesForm.controls['keywords'].setValue(data?.metaTagKeyword ? data?.metaTagKeyword : '');
        this.multipleWebsitesForm.controls['facebook'].setValue(data?.facebook ? data?.facebook : '');
        this.multipleWebsitesForm.controls['instagram'].setValue(data?.instagram ? data?.instagram : '');
        this.multipleWebsitesForm.controls['youtube'].setValue(data?.youtube ? data?.youtube : '');

        this.multipleWebsitesForm.controls['twitter'].setValue(data?.twitter ? data?.twitter : '');
        this.multipleWebsitesForm.controls['linkedIn'].setValue(data?.linkedin ? data?.linkedin : '')
        this.multipleWebsitesForm.controls['invoice'].setValue(data?.invoicePrefix ? data?.invoicePrefix : '');
        this.multipleWebsitesForm.controls['defaultWebsite'].setValue(data?.defaultWebsite ?? false);
        this.multipleWebsitesForm.controls['maintainence'].setValue(data?.maintenanceMode ?? false);
        this.multipleWebsitesForm.controls['pending'].setValue(data?.pendingStatus ?? false);
        this.multipleWebsitesForm.controls['active'].setValue(data?.isActive ?? false);
        if (data?.storeLogo) {
          this.postImageUrl = this.imageUrl + '?path=' + data?.storeLogoPath + '&name=' + data?.storeLogo + '&width=160&height=150';

        }
        if (data.invoiceLogo) {
          this.postInvoiceImageUrl =
            this.imageUrl + '?path=' +
            `${data.invoiceLogoPath}` + '&name=' +
            `${data.invoiceLogo}` +
            '&width=160&height=150';
          this.changeDetectRef.detectChanges();
        }
        if (data.emailLogo) {
          this.postEmailImageUrl =
            this.imageUrl + '?path=' +
            `${data.emailLogoPath}` + '&name=' +
            `${data.emailLogo}` +
            '&width=160&height=150';
          this.changeDetectRef.detectChanges();
        }

        if (data.adminLogo) {
          this.postAdminImageUrl =
            this.imageUrl + '?path=' +
            `${data.adminLogoPath}` + '&name=' +
            `${data.adminLogo}` +
            '&width=160&height=150';
          this.changeDetectRef.detectChanges();
        }
        this.postSellerImageUrl
        this.defaultSellerImageUrl

        if (data.sellerLogo) {
          this.postSellerImageUrl =
            this.imageUrl + '?path=' +
            `${data.sellerLogoPath}` + '&name=' +
            `${data.sellerLogo}` +
            '&width=160&height=150';
          this.changeDetectRef.detectChanges();
        }


        if (data.sellerLogo2) {
          this.miniPostSellerImageUrl =
            this.imageUrl + '?path=' +
            `${data.sellerLogo2Path}` + '&name=' +
            `${data.sellerLogo2}` +
            '&width=160&height=150';
          this.changeDetectRef.detectChanges();
        }

        if (data?.accessKey) {
          this.isGenerating = true;
          this.websitekey = data?.accessKey;
        }
        if (data?.siteCategory) {

          this.categoriessandbox.getCategoriesList$.subscribe((res: any) => {

            if (res) {

              data?.siteCategory?.split(',').forEach(element => {

                res.forEach(data => {
                  if (data.categorySlug == element) {

                    this.selectedCategories.push(data)
                    const uniqueArray = this.removeDuplicates(this.selectedCategories, 'name');
                    this.selectedCategories = uniqueArray
                    this.tempCategoryData = this.selectedCategories
                  }
                });
              });

            }

          })
          this.categoriessandbox.getCategoriesList$.subscribe(element => {
            if (element) {
              this.categoryList = element.filter(category =>
                !this.selectedCategories.some(selectedCategory =>
                  selectedCategory.categoryId === category.categoryId
                )
              );
            }
          });
        }

        if (data?.countryIds) {
          data?.countryIds.forEach(element => {

            this.ListofCountries?.forEach((val) => {

              if (val?.countryId == element) {
                if (![val?.countryId].includes(this.selectedCountryList)) {
                  this.selectedCountryList.push(val)
                }
              }
            })

          })


        }


        // let countryDetails =this.ListofCountries.filter(val=>val.countryId ==element )

        // if (countryDetails?.length > 0) {
        //     this.selectedCountryList.push(countryDetails)
        //     this.selectedCountryList = [...this.selectedCountryList]
        // }
        // this.countryLists = this.countryLists.filter(elem=>elem.countryId != element);
        // this.countryLists = [...this.countryLists]
        // const dateVals = this.datePipe.transform(data?.dateFormat, "dd-MM-yyyy")
        // .split("-");
        this.multipleWebsitesForm.controls['dateFormat'].setValue(data?.dateFormat);

        this.multipleWebsitesForm.controls['timeFormat'].setValue((data?.timeFormat ? data?.timeFormat : ''));
      }
    }
    );

  }

  onDateSelect(event) {
  }
  copyToClipboard() {
    this.toastr.success("Copied to Clipboard");
  }

  inItForm() {
    const urlValidation = /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.multipleWebsitesForm = this.fb.group({
      siteName: [null, [Validators.required, Validators.compose([
        Validators.maxLength(255)
      ])]],
      // siteName: ["", Validators.required,Validators.maxLength(255)],
      siteURL: [null, [Validators.required, Validators.pattern(urlValidation)]],
      // siteURL: ["", Validators.required],
      shortDescription: ["", [Validators.required, Validators.maxLength(250)]],
      businessName: ["", [Validators.required,Validators.pattern(/^[a-zA-Z0-9 $,'&-]*$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      // email: ["", Validators.required],
      mobile: [null, [Validators.required]],
      // mobile: ["", Validators.required],
      businessOwnerName: ["", [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]],
      address1: ["", [Validators.required]],
      address2: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: [null, [Validators.required]],
      postcode: ["", [Validators.required]],
      country: [null, [Validators.required]],
      availabeCategories: [""],
      selectedCategories: ["", []],
      selectedCountries: [""],
      currency: [null, [Validators.required]],
      format: [null, []],
      symbol: ["",[Validators.required]],
      defaultLanguage: [null, [Validators.required]],
      secondaryLanguage: [null, [Validators.required]],
      dateFormat: [null, [Validators.required]],
      timeFormat: [null, [Validators.required]],
      defaultCountry: [null, [Validators.required]],
      metatitle: ["", [Validators.required, Validators.maxLength(70)]],
      metaDescription: ["", [Validators.required, Validators.maxLength(160)]],
      keywords: ["", [Validators.required]],
      facebook: ["", [this.urlValidator('facebook')]],
      instagram: ["", [this.urlValidator('instagram')]],
      youtube: ["", [this.urlValidator('youtube')]],
      twitter: ["", [this.urlValidator('twitter')]],
      linkedIn: ["", [this.urlValidator('linkedIn')]],
      invoice: ["", [Validators.required, Validators.maxLength(70)]],
      defaultWebsite: [true],
      maintainence: [false],
      pending: [false],
      active: [true],
      countryList: [""],
    });
  }

  getCountryList() {
    const param: any = {};
    param.status = 1;
    this.sellerSandbox.getCountriesList(param);
    this.sellerSandbox.getCountryList$.subscribe(val => {
      this.countryList = val
      this.ListofCountries = structuredClone(this.countryList);
      this.countryLists = val
      this.sellerSandbox.zoneList({})
    })
  }

  selectCountry(event) {
    this.multipleWebsitesForm.controls['state'].setValue(null);
    this.countryId = +event;
    this.getZoneList(this.countryId);
  }

  getZoneList(id) {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.count = 0;
    params.keyword = "";
    params.countryId = id;
    this.sellerSandbox.zoneList(params);
    this.sellerSandbox.zoneList$.subscribe(val => {
      if (val) {
        this.stateList = val
      }
    })
    this.multipleWebsitesForm.controls['state'].setValue(null);
  }

  currencyList() {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.keyword = "";
    params.count = 0;
    params.status = 1;
    this.currencysandbox.getCurrencyList(params);
  }

  currencySymbol(event) {
    this.currencysandbox.currencyList$.subscribe(val => {
      val.forEach(element => {
        if (element.currencyId == event) {
          this.multipleWebsitesForm.controls['symbol'].setValue(element.symbolLeft ? element.symbolLeft : element.symbolRight ? element.symbolRight : '');

        }
      })

    })
  }

  languageList() {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.keyword = "";
    params.status = 1;
    this.languageSandbox.languageList(params);

  }

  getCategoryList() {
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.keyword = "";
    param.sortOrder = 0;
    param.status = 1;
    this.categoriessandbox.categoryList(param);
    this.categoriessandbox.getCategoriesList$.subscribe((data: any) => {
      this.categoryList = data;
    });
  }

  selectCategory(data, i) {
    this.selectedCategories.push(data);
    this.filteredArray = this.selectedCategories;
    this.categoriessandbox.productRemove(i);
    this.show = false;
    this.categoryList.forEach((val, index) => {
      if (val.categoryId === data.categoryId) {
        this.categoryList.splice(index, 1);
      }
    });
    this.categoryList = [...this.categoryList]

  }
  removeCategory(data, i) {
    this.categoriessandbox.productAdd(data);
    this.selectedCategories.splice(i, 1);
    this.filteredArray = this.selectedCategories;

    this.categoryList.push(data)
    this.categoryList = this.categoryList
  }
  selectCountryList(data, i) {
    this.selectedCountryList.push(data);
    this.tempCountryData = [...this.selectedCountryList];
    this.show = false;

    this.countryLists.forEach((val, index) => {
      if (val.countryId === data.countryId) {
        this.countryLists.splice(index, 1);
      }
    });

    this.countryLists = [... this.countryLists]
  }
  removeCountryList(data, i) {
    this.sellerSandbox.countryAdd(data);
    if (this.selectedCountryList.length != 1) {
      this.selectedCountryList.forEach(val=>{
        if(val.countryId === data.countryId){

          this.selectedCountryList.splice(i, 1);
        }
      })
     
    }

    this.tempCountryData = [...this.selectedCountryList];

    this.countryLists.push(data);
    this.countryLists = [...this.countryLists]
  }
  getActive(event) {
    this.activeStatus = event === true ? 1 : 0;
  }
  getDefaultWebsite(event: any) {
    this.defaultWebsiteStatus = event === true ? 1 : 0;
    if (this.defaultWebsiteStatus == 1) {
      this.multipleWebsitesForm.controls['active'].setValue(true);
      this.getActive(true);
    }
  }

  getMaintainence(event) {
    this.maintainence = event === true ? 1 : 0;
  }
  getPending(event) {
    this.pending = event === true ? 1 : 0;
  }
  generateKey() {

    function generateRandom16DigitNumber() {
      let randomNumber = '';
      for (let i = 0; i < 16; i++) {
        randomNumber += Math.floor(Math.random() * 10);
      }
      return randomNumber;
    }
    this.isGenerating = true;
    this.websitekey = generateRandom16DigitNumber()

  }
  resend(): void {


    if (['', null, undefined].includes(this.settingId)) {
      this.websitekey = '';
      this.isGenerating = false;

      setTimeout(() => {

        this.isGenerating = true
        this.generateKey();
      }, 1000)
    } else {

    }


  }



  searchCategoryData(searchValue: string) {
    if (searchValue && searchValue !== "") {
      this.selectedCategories = this.tempCategoryData.filter((item) => {
        return item.levels.toLowerCase().includes(searchValue.toLowerCase());
      });
    } else {
      this.selectedCategories = this.tempCategoryData;
    }
  }
  searchCountryData(searchValue: string) {
    if (searchValue && searchValue !== "") {
      this.selectedCountryList = this.tempCountryData.filter((item) => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase());
      });
    } else {
      this.selectedCountryList = this.tempCountryData;
    }
  }
  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


  scrollToError(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');

    this.scrollTo(firstElementWithError);
  }

  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  uploadButtonClickForUser() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }


  createWebsites() {
    this.submitted = true;
    const fields = [
      this.multipleWebsitesForm.controls.businessName.status,
      this.multipleWebsitesForm.controls.businessOwnerName.status,
      this.multipleWebsitesForm.controls.siteURL.status,
      this.multipleWebsitesForm.controls.address1.status,
      this.multipleWebsitesForm.controls.address2.status,
      this.multipleWebsitesForm.controls.shortDescription.status,
      this.multipleWebsitesForm.controls.state.status,
      this.multipleWebsitesForm.controls.city.status,
      this.multipleWebsitesForm.controls.email.status,
      this.multipleWebsitesForm.controls.mobile.status,
      this.multipleWebsitesForm.controls.postcode.status,
      this.multipleWebsitesForm.controls.siteName.status,
    ];
    if (fields.some(val => val == 'INVALID') && ['', null, undefined].includes(this.postImageUrl)) {


      this.actives = 1;
      return;
    }


    if (!this.postEmailImageUrl) {
      return
    }
    if (!this.postInvoiceImageUrl) {
      return
    }
    if (!this.postAdminImageUrl) {
      return
    }
    if (!this.postSellerImageUrl) {
      return
    }

    if (!this.miniPostSellerImageUrl) {
      return
    }


    // if (this.tempCategoryData?.length == 0) {
    //   this.actives = 2;
    //   return;
    // }


    const fieldstab3 = [
      this.multipleWebsitesForm.controls.defaultLanguage.status,
      this.multipleWebsitesForm.controls.format.status,
      this.multipleWebsitesForm.controls.currency.status,
      this.multipleWebsitesForm.controls.secondaryLanguage.status,
      this.multipleWebsitesForm.controls.dateFormat.status,
      this.multipleWebsitesForm.controls.timeFormat.status,
      this.multipleWebsitesForm.controls.defaultCountry.status,
    ];

    if (fieldstab3.some(val => val == 'INVALID')) {

      this.actives = 3;
      return;
    }
    const fieldstab4 = [
      this.multipleWebsitesForm.controls.metatitle.status,
      this.multipleWebsitesForm.controls.metaDescription.status,
      this.multipleWebsitesForm.controls.keywords.status,
    ];
    if (fieldstab4.some(val => val == 'INVALID')) {
      this.actives = 4;
      return;
    }


    const fieldstab5 = [
      this.multipleWebsitesForm.controls.invoice.status,
    ];
    if (fieldstab5.some(val => val == 'INVALID')) {
      this.actives = 5;
      return;
    }
    if (['', null, undefined].includes(this.websitekey)) {
      this.actives = 6;
      return;
    }
    if (this.multipleWebsitesForm.invalid) {
      this.scrollToError();
      return;
    }
    const categoryIds = this.tempCategoryData.map((val) => {
      return val.categorySlug;
    });
    const contryId = this.tempCountryData.map((val) => {
      return val.countryId;
    });
    
    const params: any = {};
    params.metaTagTitle = this.multipleWebsitesForm.value.metatitle,
      params.metaTagDescription =
      this.multipleWebsitesForm.value.metaDescription,
      params.metaTagKeywords = this.multipleWebsitesForm.value.keywords,
      params.businessName = this.multipleWebsitesForm.value.businessName,
      params.siteUrl = this.multipleWebsitesForm.value.siteURL,
      params.storeOwner = this.multipleWebsitesForm.value.businessOwnerName,
      params.storeAddress1 = this.multipleWebsitesForm.value.address1,
      params.storeAddress2 = this.multipleWebsitesForm.value.address2,
      params.storeDescription =
      this.multipleWebsitesForm.value.shortDescription,

      params.storeEmail = this.multipleWebsitesForm.value.email,
      params.storeTelephone = this.multipleWebsitesForm.value.mobile,
      params.storeCity = this.multipleWebsitesForm.value.city,
      params.storePostalCode = this.multipleWebsitesForm.value.postcode,
      params.storeLogo = this.imageLogo,
      params.siteCategory = categoryIds.join(","),
      params.maintenanceMode = this.multipleWebsitesForm.value.maintainence ? 1 : 0;
    params.storeLanguageName =
      this.multipleWebsitesForm.value.defaultLanguage,
      params.storeSecondaryLanguageName =
      this.multipleWebsitesForm.value.secondaryLanguage,
      params.storeCurrencyId = typeof this.multipleWebsitesForm.value.currency === 'string' && this.settingId ? Number(this.detailsData?.storeCurrencyId) : this.multipleWebsitesForm.value.currency,

      params.twitter = this.multipleWebsitesForm.value.twitter,
      params.linkedIn = this.multipleWebsitesForm.value.linkedIn,
      params.instagram = this.multipleWebsitesForm.value.instagram,
      params.youtube = this.multipleWebsitesForm.value.youtube,
      params.facebook = this.multipleWebsitesForm.value.facebook,
      params.status = this.multipleWebsitesForm.value.active ? 1 : 0;
    params.invoicePrefix = this.multipleWebsitesForm.value.invoice,
      params.orderStatus = 1,
      params.categoryProductCount = 0,
      params.itemsPerPage = 0,
      params.settingId = this.settingId ? this.detailsData.settingsId : "",
      params.accessKey = this.websitekey;
    params.siteName = this.multipleWebsitesForm.value.siteName;
    params.dateFormat = this.selectedDateFormat.value;
    params.timeFormat = this.multipleWebsitesForm.value.timeFormat;
    params.currencySymbol = this.multipleWebsitesForm.value.symbol;
    if (this.defaultMailImageUrl) {
      params.mailImage = this.postEmailImageUrl;
    }
    if (this.defaultInvoiceImageUrl) {
      params.invoiceLogo = this.postInvoiceImageUrl;
    }
    if (this.defaultAdminImageUrl) {
      params.adminLogo = this.postAdminImageUrl;
    }
    if (this.defaultSellerImageUrl) {
      params.sellerLogo = this.postSellerImageUrl;
    }

    if (this.miniDefaultSellerImageUrl) {
      params.sellerLogo2 = this.miniPostSellerImageUrl;
    }

    params.defaultCountry = Number(this.multipleWebsitesForm.value.defaultCountry);
    params.zoneId = +this.multipleWebsitesForm.value.state;
    params.countryId = Number(this.multipleWebsitesForm.value.country);
    params.country = contryId.join(",");
    params.defaultWebsite = this.multipleWebsitesForm.value.defaultWebsite ? 1 : 0;
    params.pendingStatus = this.pending,

      this.multipleWebsitesSandbox.CreateMultipleWebsites(params);
    if (!['',null,undefined].includes(this.selectedDateFormat.value)) {
      localStorage.setItem('dateFormat', this.selectedDateFormat.value);
      localStorage.setItem('timeFormat', this.multipleWebsitesForm.value.timeFormat);
    }
    if (this.settingId) {
      this.multipleWebsitesSandbox.UpdateMultipleWebsites(params);
      if (!['',null,undefined].includes(this.selectedDateFormat.value)) {
      localStorage.setItem('dateFormat', this.selectedDateFormat.value);
      localStorage.setItem('timeFormat', this.multipleWebsitesForm.value.timeFormat);
      }
    }

  }

  uploadStoreLogo(inputValue): void {
    const file: File = inputValue.target.files[0];
    const myReader: FileReader = new FileReader();
    if (!this.imageType.exec(inputValue?.target.files[0].name)) {
      this.websiteimagetypeError = true;
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageTypeSupport);
      return;
    }
    this.websiteimagetypeError = false;

    const size = Math.round(inputValue?.target.files[0].size / 1024);
    if (size > this.imageSize) {
      this.websiteimageSizeError = true;
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageSizeSupport);
      return;
    }
    this.websiteimageSizeError = false;
    myReader.onloadend = e => {
      this.postImageUrl = myReader.result;
      this.imageLogo = myReader.result
      this.changeDetectRef.detectChanges();
    };
    myReader.readAsDataURL(file);
  }

  uploadChange(event): void {
    const file: File = event.target.files[0];
    const myReader: FileReader = new FileReader();

    if (!this.imageType.exec(event.files[0].name)) {
      this.logotypeError = true;
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageTypeSupport);
      return;
    }
    this.logotypeError = false;

    const size = Math.round(event.files[0].size / 1024);
    if (size > this.imageSize) {
      this.logoimageSizeError = true;
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageSizeSupport);
      return;
    }
    this.logoimageSizeError = false;
  }

  uploadMailImage(event) {
    this.convertMailImageBase64(event.target);
    this.mailImg = event.target.files[0].name;
  }

  convertMailImageBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    if (!this.imageType.exec(inputValue.files[0].name)) {
      this.mailimagetypeError = true;
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageTypeSupport);
      return;
    }
    this.mailimagetypeError = false;

    const size = Math.round(inputValue.files[0].size / 1024);
    if (size > this.imageSize) {
      this.mailimageSizeError = true;
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageSizeSupport);
      return;
    }
    this.mailimageSizeError = false;

    myReader.onloadend = e => {
      this.postEmailImageUrl = myReader.result;
      this.defaultMailImageUrl = myReader.result;
      this.changeDetectRef.detectChanges();
    };
    myReader.readAsDataURL(file);
  }




  // admin logo

  uploadAdminImage(event) {
    this.convertAdminImageBase64(event.target);
    this.mailImg = event.target.files[0].name;
  }

  convertAdminImageBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    if (!this.imageType.exec(inputValue.files[0].name)) {
      this.adminImageTypeError = true;
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageTypeSupport);
      return;
    }
    this.adminImageTypeError = false;

    const size = Math.round(inputValue.files[0].size / 1024);
    if (size > this.imageSize) {
      this.adminImageSizeError = true;
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageSizeSupport);
      return;
    }
    this.adminImageSizeError = false;

    myReader.onloadend = e => {
      this.postAdminImageUrl = myReader.result;
      this.defaultAdminImageUrl = myReader.result;
      this.changeDetectRef.detectChanges();
    };
    myReader.readAsDataURL(file);
  }

  // seller logo

  uploadSellerImage(event) {
    this.convertSellerImageBase64(event.target);
    this.mailImg = event.target.files[0].name;
  }

  convertSellerImageBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    if (!this.imageType.exec(inputValue.files[0].name)) {
      this.sellerImageTypeError = true;
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageTypeSupport);
      return;
    }
    this.sellerImageTypeError = false;

    const size = Math.round(inputValue.files[0].size / 1024);
    if (size > this.imageSize) {
      this.sellerImageSizeError = true;
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageSizeSupport);
      return;
    }
    this.sellerImageSizeError = false;

    myReader.onloadend = e => {
      this.postSellerImageUrl = myReader.result;
      this.defaultSellerImageUrl = myReader.result;
      this.changeDetectRef.detectChanges();
    };
    myReader.readAsDataURL(file);
  }

  // seller mini logo

  uploadSellerImageMini(event) {
    this.convertSellerMiniImageBase64(event.target);
    this.mailImg = event.target.files[0].name;
  }

  convertSellerMiniImageBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    if (!this.imageType.exec(inputValue.files[0].name)) {
      this.miniSellerImageTypeError = true;
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageTypeSupport);
      return;
    }
    this.miniSellerImageTypeError = false;

    const size = Math.round(inputValue.files[0].size / 1024);
    if (size > this.imageSize) {
      this.miniSellerImageSizeError = true;
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageSizeSupport);
      return;
    }
    this.miniSellerImageSizeError = false;

    myReader.onloadend = e => {
      this.miniPostSellerImageUrl = myReader.result;
      this.miniDefaultSellerImageUrl = myReader.result;
      this.changeDetectRef.detectChanges();
    };
    myReader.readAsDataURL(file);
  }



  uploadInvoiceImage(event) {
    this.convertInvoiceImageBase64(event.target);
    this.invoiceImg = event.target.files[0].name
  }

  convertInvoiceImageBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    if (!this.imageType.exec(inputValue.files[0].name)) {
      this.invoiceimagetypeError = true;
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageTypeSupport);
      return;
    }
    this.invoiceimagetypeError = false;

    const size = Math.round(inputValue.files[0].size / 1024);
    if (size > this.imageSize) {
      this.invoiceimageSizeError = true;
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageSizeSupport);
      return;
    }
    this.invoiceimageSizeError = false;

    myReader.onloadend = e => {
      this.defaultInvoiceImageUrl = myReader.result;
      this.postInvoiceImageUrl = myReader.result;
      this.changeDetectRef.detectChanges();
    };
    myReader.readAsDataURL(file);
  }

  // Inline method for URL validation
  private urlValidator(platform: 'instagram' | 'youtube' | 'twitter' | 'facebook' | 'linkedIn') {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const url = control.value;

      if (!url) {
        return null;
      }

      const regexMap = {
        instagram: /^(https?:\/\/)?(www\.)?instagram\.com(\/[A-Za-z0-9_./?=&-]*)?\/?$/,
        youtube: /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed|v|watch|.+\?v=|(?:.+\/)?)([^&]{11}|[a-zA-Z0-9_-]{11}|[a-zA-Z0-9_-]{11}\/?)(\S+)?|youtu\.be\/([^&]{11}|[a-zA-Z0-9_-]{11})$)/,
        twitter: /^(https?:\/\/)?(www\.)?(twitter\.com\/(#!\/)?([A-Za-z0-9_]+)\/?$|twitter\.com\/status\/(\d+)\/?$|t\.co\/([A-Za-z0-9]+)$)/,
        facebook: /^(https?:\/\/)?(www\.)?facebook\.com\/?[A-Za-z0-9_./?=&-]*\/?$/,
        linkedIn: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/
      };

      const isValid = regexMap[platform].test(url);

      return isValid ? null : { invalidUrl: true };
    };
  }


}