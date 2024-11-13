import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalPopupComponent } from '../../catalog/manage-product/modalpopup/modalpopup.component';
import { AbstractControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { businessAddressFormObj, businessSegment, businessType, companyDetailsFormObj, industryDomain, shippingMethod } from './company-details.contant';
import { sellerOnBoardingSandbox } from '../../../../../../../src/app/core/seller-onBoarding/sellerOnBoarding.sandbox';
import { CommonSandbox } from '../../../../../../../src/app/core/common/common.sandbox';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getFormControlsFieldsObj } from '../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';
import { getTypes } from '../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';
import { BankAddressFormObj, bankAccountInfoFormObj } from './bank-account.constant';
import { addDocumentsFormObj, fields, removeEmptyKeys, uploadDocumentTable } from './upload-documents.constant';
import { limitForFilterDisable } from '../../../../../../../src/app/default/shared/common/config.constant';
import { MediaSandbox } from '../../../../../../../src/app/core/media/media.sandbox';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from '../../../../../../../src/environments/environment';
import { saveAs } from 'file-saver';
import { UploadedtimlineComponent } from '../uploadedtimline/uploadedtimline.component';
import { Title } from "@angular/platform-browser";
import { MatPaginator } from '@angular/material/paginator';
import { CustomValidators } from '../../../../../../../src/app/default/shared/validation/custom-password-validation';
import { CommonService } from '../../../../../../../src/app/core/common/common.service';
interface FormGroupValue {
  [key: string]: any;
}
interface DateObject {
  year: number;
  month: number;
  day: number;
}
@Component({
  selector: 'app-tab-layout',
  templateUrl: './tab-layout.component.html',
  styleUrls: ['./tab-layout.component.scss']
})
export class TabLayoutComponent implements OnInit {
  active: Number = 1;
  errorsize: any;

  documentMessage = environment.documentMessage;


  // Subscriptions
  private subscriptions: Subscription = new Subscription();


  sellerId = JSON.parse(localStorage.getItem('vendorUserDetails')).sellerId;
  verificationStatus = JSON.parse(localStorage.getItem('vendorUser'))?.verificationStatus
  @ViewChild('displayname') displayname: ElementRef;
  companyDetailsForm: UntypedFormGroup;
  companyDetailsFormFields: any = {};
  businessAddressForm: UntypedFormGroup;
  businessAddressFormFields: any = {};
  _object = Object;
  submitted: boolean;
  documentSubmitted: boolean = false;
  displayName: string;
  uniqueBusinessDisplayName: any;
  profile: any;
  newCompanyDetailsForm: UntypedFormGroup;
  shipingData = shippingMethod;
  segment = businessSegment;
  type = businessType
  domain = industryDomain;
  sellerIndustryData: any = [];
  countryListData: any = [];
  stateListData: any = [];
  selelcteZoneList: any = []
  bankselelcteZoneList: any = [];

  //
  bankAccountInfoForm: UntypedFormGroup;
  bankAccountInfoFormFields: any = {};
  bankAddressForm: UntypedFormGroup;
  bankAddressFormFields: any = {};
  bankJSON: any;
  companyJson: any;
  newBankDetailsForm: UntypedFormGroup
  customerId = JSON.parse(localStorage.getItem('vendorUserDetails')).id;
  sellerBankDetails = {};
  zoneListData: any = [];



  @ViewChild("dropdownContent", { static: false }) dropdownContent!: ElementRef;
  @ViewChild("dropdownContentFilter", { static: false }) dropdownContentFilter!: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('dropdownContentDynamicColumn', { static: false }) dropdownContentDynamicColumn!: ElementRef;
  @ViewChild('closeAddDocumentsModal', { static: false }) closeAddDocumentsModal!: ElementRef;
  



  // common
  _Object = Object;
  displayNameSubmitted: Boolean = false;



  totalCount = 0;
  vendorId = JSON.parse(localStorage.getItem('vendorUserDetails')).vendorId;
  public vendorDetails: any

 

  //submitStatus
  submitStatus: boolean = false
  companyCancelDisable: boolean = false


  displayavalibestatus: any;
  checkstatus: boolean = false;
  submitloader: boolean = false;


  // verification details
  verificationDetails: any = '';

  kycStatusMond: boolean = false;

  stylebaseddisable: boolean = false;


  optionalFields: string[] = ['addressLine1', 'area', 'city', 'country', 'state', 'pincode'];
  constructor(
    public fb: UntypedFormBuilder,
    public sandbox: sellerOnBoardingSandbox,
    public commonSandbox: CommonSandbox,
    // public settingsSandbox: SettingsSandbox,
    public toastr: ToastrService,
    public ref: ChangeDetectorRef,
    public modal: NgbModal,
    public route: ActivatedRoute,
    public router: Router,
    public toaster: ToastrService,
    public mediaSandbox: MediaSandbox,

    private modalService: NgbModal,
    private http: HttpClient,
    public titleService: Title,
    public commonServices: CommonService

  ) {
    this.errorsize = Math.round(environment.documentSize / 1024)
    this.titleService.setTitle("Seller Onboarding")
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(val => {
      this.active = +val.currentTab ? +val.currentTab : 1;
    })

    this.commonSandbox.doGetProfile();
    this.subscriptions.add(this.commonSandbox.getProfile$.subscribe((val: any) => {
      if (val) {


  
        if (['verified', 'submitted', 'in-review'].includes(val?.kycStatus)) {
          this.kycStatusMond = true
        } else {
          this.kycStatusMond = false
        }
        this.verificationDetails = val
      }
    }));

    this.initCompanyDetailsForm();
    this.initBusinessAddressForm();
    this.getDropdownList();
    this.intializeForm();
    this.valueChange();
    this.bankValueChange();
    this.intializeForm_bank();
    this.getSellerBankDetails();
    this.initBankAccountInfoForm();
    this.initBankAddressForm()
  }







  convertedDate(dateObject): string {
    const { day, month, year } = dateObject;
    return `${day}/${month}/${year}`;
  }


  timeLineDocument(data: any) {

    const modelRef = this.modalService.open(UploadedtimlineComponent, {
      size: 'xl', modalDialogClass: 'timeline-chart', backdrop: 'static', backdropClass: 'createcr', centered: true
    });
    modelRef.componentInstance.documentId = data?.id;
  }


  intializeForm_bank() {
    this.newBankDetailsForm = this.fb.group({
      bankName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      accountHolderName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      branch: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      accountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      IFSCCode: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      BICorSWIFTCode: ['', Validators.pattern(/^[a-zA-Z0-9]*$/)],
      accountSince: [''],

      addressLine1: [''],
      addressLine2: [''],
      area: [''],
      city: [''],
      country: [null],
      state: [null],
      pincode: [''],
    });
    // , [Validators.required, Validators.pattern(/^[a-zA-Z0-9@#$%^&*]+$/)]

  }


  intializeForm() {
    const roleExpression = '^[a-zA-Z0-9]+$';
    this.newCompanyDetailsForm = this.fb.group({
      companyRegisteredCountry: [null, [Validators.required]],
      businessName: ['', [Validators.required, CustomValidators.patternValidator(/^[a-zA-Z0-9 $,'&-]*$/, { invalidCharacters: true })
      ]],
      businessType: [null, [Validators.required]],
      businessSegment: [null, [Validators.required]],
      businessDomain: [null, [Validators.required]],
      sellerLegalName: [''],
      businessDisplayName: ['', [Validators.required,
      Validators.pattern(roleExpression), Validators.maxLength(30)
      ]],
      pincode: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9@#$%^&*]+$/)]],
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      area: [''],
      city: [''],
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      contactNumber: ['', [Validators.maxLength(15)]],
      preferredShippingMethod: [null, [Validators.required]],
      taxNumber: [''],
      businessIdentificationNumber: [''],
    });
  }





  private initBankAccountInfoForm(): void {
    const formGroupField = getFormControlsFieldsObj(bankAccountInfoFormObj);
    this.bankAccountInfoForm = this.fb.group(formGroupField);
    Object.keys(bankAccountInfoFormObj).forEach((element: any) => {
      this.bankAccountInfoFormFields[element] = getTypes(bankAccountInfoFormObj[element], this.bankAccountInfoForm);
    });
  }

  private initBankAddressForm(): void {
    const formGroupField = getFormControlsFieldsObj(BankAddressFormObj);
    this.bankAddressForm = this.fb.group(formGroupField);
    Object.keys(BankAddressFormObj).forEach((element: any) => {
      this.bankAddressFormFields[element] = getTypes(BankAddressFormObj[element], this.bankAddressForm);
    });
  }


  private initCompanyDetailsForm(): void {
    const formGroupField = getFormControlsFieldsObj(companyDetailsFormObj);
    formGroupField['displayName'] = ['', [Validators.required]];
    this.companyDetailsForm = this.fb.group(formGroupField);
    Object.keys(companyDetailsFormObj).forEach((element: any) => {
      this.companyDetailsFormFields[element] = getTypes(companyDetailsFormObj[element], this.companyDetailsForm);
    });
  }

  private initBusinessAddressForm(): void {
    const formGroupField = getFormControlsFieldsObj(businessAddressFormObj);
    this.businessAddressForm = this.fb.group(formGroupField);
    Object.keys(businessAddressFormObj).forEach((element: any) => {
      this.businessAddressFormFields[element] = getTypes(businessAddressFormObj[element], this.businessAddressForm);
    });
  }

  getDropdownList() {
    this.sandbox.getSellerIndustryList({});
    this.commonSandbox.getCountryList({});
    this.subscriptions.add(this.sandbox.sellerIndustry$.subscribe(sellerIndustry => {
      if (sellerIndustry?.length > 0) {
        // sellerIndustry.push({ name: 'Retail', id: '2' })
        this.sellerIndustryData = sellerIndustry;
      }
    }));
    this.subscriptions.add(this.commonSandbox.getCountryList$.subscribe(countryList => {
      if (countryList?.length > 0) {
        this.countryListData = countryList;
        this.getStateList();
      }
    }));

  }

  getSellerBankDetails() {
    this.sandbox.doGetProfile({});
    this.subscriptions.add(this.sandbox.getProfile$.subscribe(bankDetails => {
      if (bankDetails) {

        this.sellerBankDetails = bankDetails;
        this.vendorDetails = bankDetails
        this.bankSetValue(this.sellerBankDetails)
      }
    }));
  }

  valueChange() {
    this.newCompanyDetailsForm?.controls['country'].valueChanges.subscribe(selectedValue => {
      this.newCompanyDetailsForm?.controls['state'].reset();
      this.selelcteZoneList = this.stateListData.filter(val => val.country.countryId == selectedValue);
      this.selelcteZoneList = [...this.selelcteZoneList];
      this.ref.detectChanges();
    })

  }

  bankValueChange() {
    this.newBankDetailsForm?.controls['country'].valueChanges.subscribe(selectedValue => {
      this.newBankDetailsForm?.controls['state'].reset();
      this.bankselelcteZoneList = this.stateListData.filter(val => val.country.countryId == selectedValue);
      this.bankselelcteZoneList = [...this.bankselelcteZoneList]
      this.ref.detectChanges();
    })

  }

  getStateList() {
    this.commonSandbox.getZoneList({});
    this.subscriptions.add(this.commonSandbox.zoneList$.subscribe(stateList => {
      if (stateList) {
        this.stateListData = stateList
        this.setValue();
        this.valueChange();
        this.bankValueChange();
      }
    }));

  }
  setValue() {
    this.sandbox.doGetProfile({});
    this.subscriptions.add(this.sandbox.getProfile$.subscribe((profile: any) => {
      this.profile = profile;
      this.vendorDetails = profile
      if (profile) {
        this.companySetValue(this.profile)
      }
    }))
  }

  displayNamechange() {
    this.displayavalibestatus = 0
  }

  checkAvailability() {
    this.displayNameSubmitted = true
    const params: any = {}
    params.displayNameURL = this.displayName;
    params.vendorId = this.profile.vendorId;
    if (this.newCompanyDetailsForm.controls['businessDisplayName'].invalid) {
      return
    }
    this.sandbox.displayAvailability(params);

    this.sandbox.displayAvailabilityLoading$.subscribe((val) => {
      this.submitloader
    })

    this.subscriptions.add(this.sandbox.displayAvailability$.subscribe(res => {
      this.sandbox.displayAvailabilityFailed$.subscribe((val) => {
        this.checkstatus = val
        this.displayNameSubmitted = false;
      })

      if (res?.status == 1) {

        this.uniqueBusinessDisplayName = this.displayName;
        this.displayavalibestatus = 1
      }
      if (['', null, undefined].includes(res?.status)) {
        this.displayavalibestatus = 2
      }
    }));
  }

  // ChangeDisplay() {
  //   this.displayavalibestatus = 0
  // }

  updateCompanyDetails() {
    // this.submitted = true;
    // if (this.newCompanyDetailsForm.invalid) {
    //   return
    // }

    // if (!this.displayName) {
    //   this.toastr.error('Business Name Not Available.');
    //   return
    // }
    const params: any = {
      id: this.profile.customerId,
      companyRegisteredCountry: this.newCompanyDetailsForm.value['companyRegisteredCountry'],
      companyName: this.newCompanyDetailsForm.value['businessName'],
      businessType: this.newCompanyDetailsForm.value['businessType'],
      businessSegment: this.newCompanyDetailsForm.value['businessSegment'],
      businessIndustry: this.newCompanyDetailsForm.value['businessDomain'],
      // productCategoryId: this.newCompanyDetailsForm.value['Product Category'],
      firstName: this.newCompanyDetailsForm.value['sellerLegalName'] || '',
      displayName: this.newCompanyDetailsForm.value['businessDisplayName'],
      pincode: this.newCompanyDetailsForm.value['pincode'] || '',
      companyAddress1: this.newCompanyDetailsForm.value['addressLine1'],
      companyAddress2: this.newCompanyDetailsForm.value['addressLine2'],
      companyLocation: this.newCompanyDetailsForm.value['area'] || '',
      companyCity: this.newCompanyDetailsForm.value['city'] || '',
      zoneId: this.newCompanyDetailsForm.value['state'],
      companyCountryId: this.newCompanyDetailsForm.value['country'],
      companyMobileNumber: this.newCompanyDetailsForm.value['contactNumber'] || '',
      preferredShippingMethod: this.newCompanyDetailsForm.value['preferredShippingMethod'] || '',
      companyBusinessNumber: this.newCompanyDetailsForm.value['businessIdentificationNumber'] || '',
      companyTaxNumber: this.newCompanyDetailsForm.value['taxNumber'] || '',
      vendorMedia: []
    };

    this.removeEmptyKeys(params);
    this.sandbox.updateProfileDetails(params);
    this.subscriptions.add(this.sandbox.updateProfileDetails$.subscribe(res => {
      if (res) {
        this.submitted = false;
        this.sandbox.doGetProfile({});

        if (this.submitStatus == true) {
          this.router.navigate(['/dashboard'])
        }
      }
    }))
  }
  removeEmptyKeys(obj: any): any {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
          delete obj[key];
        }
      }
    }
    return obj;
  }

  companyFormCancel() {
    const modelRef = this.modal.open(ModalPopupComponent, {
      size: 'md', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories delete-modal",
    })
    modelRef.componentInstance.deleteMessage = "new changes"
    modelRef.componentInstance.cancel = "cancel"
    modelRef.result.then(result => {
      if (result == "deleted") {
        this.newCompanyDetailsForm.reset();
        this.companySetValue(this.profile)
        // this.sandbox.doGetProfile({});
      }
    })

  }



  companySetValue(data: any) {
    this.newCompanyDetailsForm?.controls['companyRegisteredCountry'].setValue(data?.companyCountryId);
    this.newCompanyDetailsForm?.controls['businessName'].setValue(data?.companyName);
    this.newCompanyDetailsForm?.controls['businessType'].setValue(data?.businessType);
    this.newCompanyDetailsForm?.controls['businessSegment'].setValue(data?.businessSegment);
    this.newCompanyDetailsForm?.controls['businessDomain'].setValue(data?.industryId);
    // this.newCompanyDetailsForm?.controls['Product Category'].setValue(data?.productCategoryId);
    this.newCompanyDetailsForm?.controls['sellerLegalName'].setValue(data?.customerDetail.firstName);
    this.newCompanyDetailsForm?.controls['pincode'].setValue(data?.pincode);
    this.newCompanyDetailsForm?.controls['addressLine1'].setValue(data?.companyAddress1);
    this.newCompanyDetailsForm?.controls['addressLine2'].setValue(data?.companyAddress2);
    this.newCompanyDetailsForm?.controls['area'].setValue(data?.companyLocation);
    this.newCompanyDetailsForm?.controls['city'].setValue(data?.companyCity);
    this.newCompanyDetailsForm?.controls['country'].setValue(data?.companyCountryId);
    this.newCompanyDetailsForm?.controls['state'].setValue(data?.zoneId);
    this.newCompanyDetailsForm?.controls['contactNumber'].setValue(data?.companyMobileNumber);
    this.newCompanyDetailsForm?.controls['preferredShippingMethod'].setValue(data?.preferredShippingMethod);
    this.newCompanyDetailsForm?.controls['businessIdentificationNumber'].setValue(data?.businessNumber);
    this.newCompanyDetailsForm?.controls['taxNumber'].setValue(data?.companyTaxNumber);
    this.newCompanyDetailsForm?.controls['businessDisplayName'].setValue(data.displayNameUrl);
    this.displayName = data?.displayNameUrl;
    this.companyJson = this.newCompanyDetailsForm?.value;
  }



  goToCompany() {
    const modelRef = this.modal.open(ModalPopupComponent, {
      size: 'md', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories delete-modal",
    })
    modelRef.componentInstance.deleteMessage = "new changes"
    modelRef.componentInstance.cancel = "cancel"
    modelRef.result.then(result => {
      if (result == "deleted") {
        this.businessAddressForm.reset();
        this.bankSetValue(this.sellerBankDetails);
        // this.sandbox.doGetProfile({});
      }
    })
    // this.router.navigate(['/seller-onboarding/seller-onboarding-Details'], { queryParams: { currentTab: 1 } })
  }


  bankSetValue(data: any) {
    // Bank Account Information
    this.newBankDetailsForm.controls['bankName']?.setValue(data?.bankAccount?.bankName);
    this.newBankDetailsForm.controls['accountHolderName'].setValue(data?.bankAccount?.accountHolderName);
    this.newBankDetailsForm.controls['branch'].setValue(data?.bankAccount?.branch);
    this.newBankDetailsForm.controls['accountNumber'].setValue(data?.bankAccount?.accountNumber);
    this.newBankDetailsForm.controls['IFSCCode'].setValue(data?.bankAccount?.ifsc);
    this.newBankDetailsForm.controls['BICorSWIFTCode'].setValue(data?.bankAccount?.bic);
    this.newBankDetailsForm.controls['accountSince'].setValue(data?.bankAccount?.accountCreatedOn);

    // Bank Address
    this.newBankDetailsForm.controls['addressLine1'].setValue(data?.bankAccount?.bankAddress1);
    this.newBankDetailsForm.controls['addressLine2'].setValue(data?.bankAccount?.bankAddress2);
    this.newBankDetailsForm.controls['area'].setValue(data?.bankAccount?.bankArea);
    this.newBankDetailsForm.controls['city'].setValue(data?.bankAccount?.bankCity);
    this.newBankDetailsForm.controls['country'].setValue(data?.bankAccount?.bankCountryId);
    this.newBankDetailsForm.controls['state'].setValue(data?.bankAccount?.bankStateId);
    this.newBankDetailsForm.controls['pincode'].setValue(data?.bankAccount?.bankPincode);
    this.bankJSON = this.newBankDetailsForm.value;
  }



  objectsAreEqual(obj1, obj2) {
    // Check if both objects are defined
    if (!obj1 || !obj2) {
      return false;
    }

    // Get the keys of both objects
    let obj1Keys = Object.keys(obj1);
    let obj2Keys = Object.keys(obj2);

    // Check if number of keys are the same
    if (obj1Keys.length !== obj2Keys.length) {
      return false;
    }

    // Check if all key-value pairs are the same
    for (let key of obj1Keys) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    // If all checks passed, objects are equal
    return true;
  }


  ngAfterViewChecked() {

    if (this.objectsAreEqual(this.companyJson, this.newCompanyDetailsForm.value) && this.objectsAreEqual(this.bankJSON, this.newBankDetailsForm.value)) {
      this.stylebaseddisable = true
    } else {
      this.stylebaseddisable = false
    }
  }


  combinationApi() {
    this.submitted = true;
    if (this.newCompanyDetailsForm.invalid) {
      return
    }

    if (!this.displayName) {
      this.toastr.error('Business Name Not Available.');
      return
    }
    const params: any = {
      id: this.profile.customerId,
      companyRegisteredCountry: this.newCompanyDetailsForm.value['companyRegisteredCountry'],
      companyName: this.newCompanyDetailsForm.value['businessName'],
      businessType: this.newCompanyDetailsForm.value['businessType'],
      businessSegment: this.newCompanyDetailsForm.value['businessSegment'],
      businessIndustry: this.newCompanyDetailsForm.value['businessDomain'],
      // productCategoryId: this.newCompanyDetailsForm.value['Product Category'],
      firstName: this.newCompanyDetailsForm.value['sellerLegalName'] || '',
      displayName: this.newCompanyDetailsForm.value['businessDisplayName'],
      pincode: this.newCompanyDetailsForm.value['pincode'] || '',
      companyAddress1: this.newCompanyDetailsForm.value['addressLine1'],
      companyAddress2: this.newCompanyDetailsForm.value['addressLine2'],
      companyLocation: this.newCompanyDetailsForm.value['area'] || '',
      companyCity: this.newCompanyDetailsForm.value['city'] || '',
      zoneId: this.newCompanyDetailsForm.value['state'],
      companyCountryId: this.newCompanyDetailsForm.value['country'],
      companyMobileNumber: this.newCompanyDetailsForm.value['contactNumber'] || '',
      preferredShippingMethod: this.newCompanyDetailsForm.value['preferredShippingMethod'] || '',
      companyBusinessNumber: this.newCompanyDetailsForm.value['businessIdentificationNumber'] || '',
      companyTaxNumber: this.newCompanyDetailsForm.value['taxNumber'] || '',
      vendorMedia: []
    };
    this.removeEmptyKeys(params);
    this.sandbox.updateProfileDetails(params);
    this.subscriptions.add(this.sandbox.updateProfileDetails$.subscribe(res => {
      if (res) {
        this.submitted = false;
        // this.sandbox.doGetProfile({});
        if (this.newBankDetailsForm.invalid) {
          return
        }
        // bankPayload
        const params: any = {

          companyAccountBankName: this.newBankDetailsForm.value['bankName'],
          companyAccountNumber: this.newBankDetailsForm.value['accountNumber'],
          companyAccountHolderName: this.newBankDetailsForm.value['accountHolderName'],
          companyAccountBranch: this.newBankDetailsForm.value['branch'],
          companyIFSC: this.newBankDetailsForm.value['IFSCCode'],
          companyAccountBic: this.newBankDetailsForm.value['BICorSWIFTCode'],
          companyAccountCreatedOn: this.newBankDetailsForm.value['accountSince'],
          bankAddress1: this.newBankDetailsForm.value['addressLine1'],
          bankAddress2: this.newBankDetailsForm.value['addressLine2'],
          bankArea: this.newBankDetailsForm.value['area'],
          bankCity: this.newBankDetailsForm.value['city'],
          bankStateId: this.newBankDetailsForm.value['state'],
          bankCountryId: this.newBankDetailsForm.value['country'],
          bankPincode: this.newBankDetailsForm.value['pincode'],

        };
        const bankPayload: any = {
          bankPayload: this.removeEmptyKeys(params),
          vendorMedia: [],
          id: Object.keys(this.sellerBankDetails).length > 0 ? this.customerId : '',
        }
        this.sandbox.updateProfileDetails(bankPayload);
        this.subscriptions.add(this.sandbox.updateProfileDetails$.subscribe(res => {
          if (res?.status == 1) {
            this.submitted = false;

            const downloadFile = `${environment.baseUrl}` + `/vendor/pending-status/update/${this.vendorId}`;
            this.http.put(downloadFile, {}).subscribe((response: any) => {
              if (response && response?.status == 1) {
                this.sandbox.doGetProfile({});
                this.router.navigate(['/dashboard'])
              }

            })

          }
        }));
      }
    }))

  }

  //CompanySubmit
  CompanySubmit() {
    // window.location.href='/seller-onboarding/seller-onboarding-Details?currentTab=1'

    this.submitted = true;
    this.submitStatus = true;



    

    if (this.newCompanyDetailsForm.invalid == false && this.newBankDetailsForm.invalid == false  &&['',null,undefined,1,0].includes(this.displayavalibestatus)) {
      this.apiCallSubmitted();
    } else {
      if (this.newCompanyDetailsForm.invalid == true || this.displayavalibestatus == 2) {
        this.active = 1
        this.scrollToFirstErrorField();
      } else if (this.newBankDetailsForm.invalid == true) {
   
        this.active = 2
        this.scrollToFirstErrorField();
      }
      this.updateQueryParam()

    }

  }

  scrollToFirstErrorField() {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');

    this.scrollTo(firstElementWithError);
  }


  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  //BankSubmit
  BankSubmit() {
    this.submitted = true;
    this.submitStatus = true;
    const anyOptionalFilled = this.optionalFields.some(field => this.newBankDetailsForm.get(field)?.value);
    if (anyOptionalFilled) {
      this.optionalFields.forEach(val => {
        this.newBankDetailsForm.controls[val].setValidators([Validators.required]);
        this.newBankDetailsForm.controls[val].updateValueAndValidity({ emitEvent: false });
        this.scrollToFirstErrorField();
      });
      if (this.newBankDetailsForm.invalid) {
        return;
      }
    } else {
      this.optionalFields.forEach(val => {
        this.newBankDetailsForm.controls[val].setValidators([]);
        this.newBankDetailsForm.controls[val].updateValueAndValidity({ emitEvent: false });

      });
    }

    if (this.newBankDetailsForm.invalid == false && this.newCompanyDetailsForm.invalid == false) {


    
      // if (this.objectsAreEqual(this.bankJSON, this.newBankDetailsForm.value)) {
      //   if (this.vendorDetails?.approvalFlag == 1) {
      //     this.saveBankAccountInfo()

      //   }
      //   // const downloadFile = `${environment.baseUrl}` + `/vendor/pending-status/update/${this.vendorId}`;
      //   // this.http.put(downloadFile, {}).subscribe((response: any) => {

      //   // })

      // } else {
      //   this.apiCallSubmitted()

      // }



      this.apiCallSubmitted()
    } else {
      if (this.newCompanyDetailsForm.invalid == true) {
        this.active = 1
        this.scrollToFirstErrorField();
      } else if (this.newBankDetailsForm.invalid == true) {
        this.active = 2
        this.scrollToFirstErrorField();
      } 
      this.updateQueryParam()
    }


  }




  //file upload submit

  uploadSubmit() {
    this.submitted = true;
    if (this.newBankDetailsForm.invalid == false && this.newCompanyDetailsForm.invalid == false) {
      this.apiCallSubmitted()
      // this.http.put(downloadFile, {}).subscribe((response: any) => {
      //   if (response && response.status == 1) {
      //     this.router.navigate(['/dashboard'])
      //   }
      // })
    } else {
      if (this.newCompanyDetailsForm.invalid == true) {
        this.active = 1
        this.scrollToFirstErrorField();
      } else if (this.newBankDetailsForm.invalid == true) {
        this.active = 2
        this.scrollToFirstErrorField();
      } 
      this.updateQueryParam()
    }
  }
  saveBankAccountInfo() {
    // this.submitted = true;
    // if (this.newBankDetailsForm.invalid) {
    //   return
    // }
    // bankPayload
    const params: any = {

      companyAccountBankName: this.newBankDetailsForm.value['bankName'],
      companyAccountNumber: this.newBankDetailsForm.value['accountNumber'],
      companyAccountHolderName: this.newBankDetailsForm.value['accountHolderName'],
      companyAccountBranch: this.newBankDetailsForm.value['branch'],
      companyIFSC: this.newBankDetailsForm.value['IFSCCode'],
      companyAccountBic: this.newBankDetailsForm.value['BICorSWIFTCode'],
      companyAccountCreatedOn: this.newBankDetailsForm.value['accountSince'],
      bankAddress1: this.newBankDetailsForm.value['addressLine1'],
      bankAddress2: this.newBankDetailsForm.value['addressLine2'],
      bankArea: this.newBankDetailsForm.value['area'],
      bankCity: this.newBankDetailsForm.value['city'],
      bankStateId: this.newBankDetailsForm.value['state'],
      bankCountryId: this.newBankDetailsForm.value['country'],
      bankPincode: this.newBankDetailsForm.value['pincode'],

    };
    const bankPayload: any = {
      bankPayload: this.removeEmptyKeys(params),
      vendorMedia: [],
      id: Object.keys(this.sellerBankDetails).length > 0 ? this.customerId : '',
    }
    this.sandbox.updateProfileDetails(bankPayload);
    this.subscriptions.add(this.sandbox.updateProfileDetails$.subscribe(res => {
      if (res?.status == 1) {
        this.submitted = false;
        this.sandbox.doGetProfile({});
        if (this.submitStatus == true) {

          // this.subscription.unsubscribe();
          this.router.navigate(['/seller-onboarding/seller-onboarding-Details'], { queryParams: { currentTab: 1 } })
        }




      }
    }))
  }



  goToBank() {
    this.router.navigate(['/seller-onboarding/seller-onboarding-Details'], { queryParams: { currentTab: 2 } })
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();

    // this.subscription.forEach(each => each.unsubscribe());
  }



  apiCallSubmitted() {


    const params: any = {

      companyAccountBankName: this.newBankDetailsForm.value['bankName'],
      companyAccountNumber: this.newBankDetailsForm.value['accountNumber'],
      companyAccountHolderName: this.newBankDetailsForm.value['accountHolderName'],
      companyAccountBranch: this.newBankDetailsForm.value['branch'],
      companyIFSC: this.newBankDetailsForm.value['IFSCCode'],
      companyAccountBic: this.newBankDetailsForm.value['BICorSWIFTCode'],
      companyAccountCreatedOn: this.newBankDetailsForm.value['accountSince'],
      bankAddress1: this.newBankDetailsForm.value['addressLine1'],
      bankAddress2: this.newBankDetailsForm.value['addressLine2'],
      bankArea: this.newBankDetailsForm.value['area'],
      bankCity: this.newBankDetailsForm.value['city'],
      bankStateId: this.newBankDetailsForm.value['state'],
      bankCountryId: this.newBankDetailsForm.value['country'],
      bankPincode: this.newBankDetailsForm.value['pincode'],

    };


    const param: any = {
      id: this.profile.customerId,
      companyRegisteredCountry: this.newCompanyDetailsForm.value['companyRegisteredCountry'],
      companyName: this.newCompanyDetailsForm.value['businessName'],
      businessType: this.newCompanyDetailsForm.value['businessType'],
      businessSegment: this.newCompanyDetailsForm.value['businessSegment'],
      businessIndustry: this.newCompanyDetailsForm.value['businessDomain'],
      // productCategoryId: this.newCompanyDetailsForm.value['Product Category'],
      firstName: this.newCompanyDetailsForm.value['sellerLegalName'] || '',
      displayName: this.newCompanyDetailsForm.value['businessDisplayName'],
      pincode: this.newCompanyDetailsForm.value['pincode'] || '',
      companyAddress1: this.newCompanyDetailsForm.value['addressLine1'],
      companyAddress2: this.newCompanyDetailsForm.value['addressLine2'],
      companyLocation: this.newCompanyDetailsForm.value['area'] || '',
      companyCity: this.newCompanyDetailsForm.value['city'] || '',
      zoneId: this.newCompanyDetailsForm.value['state'],
      companyCountryId: this.newCompanyDetailsForm.value['country'],
      companyMobileNumber: this.newCompanyDetailsForm.value['contactNumber'] || '',
      preferredShippingMethod: this.newCompanyDetailsForm.value['preferredShippingMethod'] || '',
      companyBusinessNumber: this.newCompanyDetailsForm.value['businessIdentificationNumber'] || '',
      companyTaxNumber: this.newCompanyDetailsForm.value['taxNumber'] || '',
      vendorMedia: [],
      bankPayload: this.removeEmptyKeys(params)
    };
    this.removeEmptyKeys(param);



    this.sandbox.updateProfileDetails(param);
    this.subscriptions.add(this.sandbox.updateProfileDetails$.subscribe(res => {
      if (res?.status == 1) {
        this.submitted = false;
       
        this.commonServices.profileAPi({}).subscribe((val) => {
          if (val && val.status == 1) {

            if (['verified', 'submitted', 'in-review'].includes(val?.data?.kycStatus)) {
              this.kycStatusMond = true

            } else {
              this.kycStatusMond = false
            }
            this.verificationDetails = val
          }
        })
        this.router.navigate(['/seller-onboarding/seller-onboarding-Details'], { queryParams: { currentTab: 1 } })
      }
    }))


  }


  // ,{ queryParams:{currentTab:2} }
  // value update in queryparams and pagination//
  updateQueryParam(): void {
    this.router.navigate([], { queryParams: { currentTab: this.active }, queryParamsHandling: 'merge' });
  }

}
