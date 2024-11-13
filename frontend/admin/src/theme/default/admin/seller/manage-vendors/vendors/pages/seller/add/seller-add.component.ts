/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// Angular Imports
import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';

// Third Party Imports
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import * as _ from 'lodash';


// Components
import { ImagecropComponent } from '../imagecrop/imagecrop.component';
import { BannerimagecropComponent } from '../bannerimagecrop/bannerimagecrop.component';

// Sandox
import { SellerSandbox } from '../../../../../../../../../../src/core/admin/vendor/pages/seller/seller.sandbox';
import { VendorGroupSandbox } from '../../../../../../../../../../src/core/admin/vendor/pages/vendor-group/vendor-group.sandbox';
import { LayoutSandbox } from '../../../../../../../../../../src/core/admin/layout/layout.sandbox';
import { DocumentSandbox } from '../../../../../../../../../../src/core/admin/vendor/pages/documents/document.sandbox';

// Service
import { SellerService } from '../../../../../../../../../../src/core/admin/vendor/pages/seller/seller.service';
import { ConfigService } from '../../../../../../../../../../src/core/admin/service/config.service';
import { CkeConfiqService } from '../../../../../../../../../../src/core/admin/shared/ckeconfiq/ckeconfiq.service';

// Validation
import { MustMatch } from '../../../../../../../../../../src/core/admin/vendor/pages/shared/validation/must-match.validator';
import { CustomValidators } from '../../../../../../../../../../src/theme/default/admin/shared/components/interface/custom-password-validation';
import { AlertMessageSellerComponent } from '../alert-message-seller/alert-message-seller.component';
import { environment } from 'src/environments/environment';
import { addDocumentsFormObj, removeEmptyKeys } from './seller-constant';
import { getFormControlsFieldsObj, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
import { SellerServices } from './seller-service';
import * as moment from 'moment';
import { ValidationError } from 'webpack';
@Component({
  selector: 'app-seller-add',
  templateUrl: 'seller-add.component.html',
  styleUrls: ['seller-add.component.scss'],
  providers: [SellerServices]
})
export class SellerAddComponent implements OnInit, OnDestroy {

  @ViewChild('closebutton') closebutton;
  @ViewChild('filePath') filePath: ElementRef;
  @ViewChild('filePathCover') filePathCover: ElementRef;
  @ViewChild('filePathCompany') filePathCompany: ElementRef;

  // upload file
  @ViewChild('closeAddDocumentsModal', { static: false }) closeAddDocumentsModal!: ElementRef;


  // form
  public sellerAddForm: UntypedFormGroup;
  public firstName: UntypedFormControl;
  public lastName: UntypedFormControl;
  public email: UntypedFormControl;
  public avatar: UntypedFormControl;
  public coverLogo: UntypedFormControl;
  public avatarPath: UntypedFormControl;
  public companyName: UntypedFormControl;
  public companyLogo: UntypedFormControl;
  public companyDescription: UntypedFormControl;
  public companyAddress1: UntypedFormControl;
  public companyAddress2: UntypedFormControl;
  public companyCity: UntypedFormControl;
  public companyState: UntypedFormControl;
  public accountHolderName: UntypedFormControl;
  public companyCountryId: UntypedFormControl;
  public pincode: UntypedFormControl;
  public mailStatus: UntypedFormControl;
  public companyWebsite: UntypedFormControl;
  public status: UntypedFormControl;
  public commission: UntypedFormControl;
  public password: UntypedFormControl;
  public confirmPassword: UntypedFormControl;
  public mobileNumber: UntypedFormControl;
  public taxNumber: UntypedFormControl;
  public instagram: UntypedFormControl;
  public whatsApp: UntypedFormControl;
  public youtube: UntypedFormControl;
  public facebook: UntypedFormControl;
  public taxname: UntypedFormControl;
  public vendorGroup: UntypedFormControl;
  public bankName: UntypedFormControl;
  public displayName: UntypedFormControl;
  public bankDetails: UntypedFormControl;
  public stateName: string

  // Variable
  public submitted = false;
  public selectedPaymentMethod = '';
  public value: any;
  public sellerInfo: any = [];
  public id: any;
  public myValue: boolean;
  public myValues: boolean;
  public details: any;
  public datas: any;
  public ImageUrl: any;
  public postImageUrl: any;
  public postImageUrls: any;
  public coverPostImageUrl: any;
  public CoverImageUrl: any;
  public imageUrls: any;
  public getBaseImageUrl: any;
  public countryId: any;
  toggleDisable: number;

  public name = '';
  public options: any[];
  public ckeConfig: any;
  public showBackToTop = false;
  public passwordField = '';
  public queryDetails: any = {};
  public config: any;
  array: any;
  vendorGroupName: any;

  public checkAvail = '';
  activeStatus: number;
  displaySuccess: any = false;
  displayFailed: any = false;
  zoneListLength: any;

  public vendorDocuments = [];
  public rejectData: any;
  public rejectReason: any = "";
  public reasonSubmitted = false;
  myvendorDocument = [];

  public industry: UntypedFormControl
  industryName: any;
  industryListData: any[] = [];
  businessNumber: UntypedFormControl;

  // cke5 
  editor = ClassicEditor;
  approvalFlag: boolean = false;
  checkstatus: any;

  // image validation
  coverArray: any;
  logoArray: any;
  profileimg: any;
  coverimg: any;
  logoimg: any;
  imageType: any;
  imageTypeSupport: string;
  imageSizeSupport: string;
  imageSize: number;
  profileimageSizeError = false;
  profileimagetypeError: boolean;
  coverimagetypeError: boolean;
  coverimageSizeError: boolean;
  logotypeError: boolean;
  logoimageSizeError: boolean;
  private subscription = new Subscription();


  // subscription
  private subscriptions: Array<Subscription> = [];

  // file upload
  documentMessage = environment.documentMessage;
  imageSupportSize = environment.imageSupportSize;
  documentSubmitted: boolean = false;
  uploadFileLocation: any = {};
  sellerDocumentList = [];
  documentForm: UntypedFormGroup;
  addDocumentForm: UntypedFormGroup;
  addDocumentFormFields: any = {};
  doumentTypeValid: Boolean = false;
  documentFileSize: Boolean = false;
  documentFileType: Boolean = false;
  _object = Object;
  // Reusable Pagination//
  currentPage = 1; //page number
  limit: any = 10;
  offset = 0;
  queryData: any = {};
  keyword: any;
  //filter show
  filter: any = []
  list: any = [];
  timeLine: any;
  documentId: any;
  documentList: any = [];
  vendorId = JSON.parse(sessionStorage.getItem('vendorUserDetails'))?.vendorId;
  fileParam: any = [];
  disabaleState: boolean = false;
  // kycMandate = 0;
  kycMandate: number;
  documentValidationMessage: any = [];
  validtionError:boolean = false;
  isInputDisabled: boolean = true;


  constructor(
    public titleService: Title,
    public modalService: NgbModal,
    public modal: NgbModal,
    public layoutSandbox: LayoutSandbox,
    public router: Router,
    private route: ActivatedRoute,
    public fb: UntypedFormBuilder,
    public sellerSandbox: SellerSandbox,
    private service: SellerService,
    private changeDetectRef: ChangeDetectorRef,
    private configService: ConfigService,
    public DocumentSandBox: DocumentSandbox,
    private viewportScroller: ViewportScroller,
    private ckeconfiqservice: CkeConfiqService,
    public vendorGroupList: VendorGroupSandbox,
    private toastr: ToastrService,
    public sellerService: SellerServices
  ) {
    this.titleService.setTitle('Seller');
    this.config = this.ckeconfiqservice.getEditorConfig();
    const offset = this.route.snapshot.queryParamMap.get('offset');
    const index = this.route.snapshot.queryParamMap.get('index');
    // this.queryDetails.offset = offset || 0;
    // this.queryDetails.index = index || 0;
  }


  ngOnInit() {
    this.getSettings();
    this.sellerForm();
    this.getVendorGroupList();
    this.getIndustryList();
    this.initDocumentForm();
    this.initAddDocumetForm();
    this.getUploadSellerDocuments();

   

    if (!['', null, undefined].includes(this.route.snapshot.data.name)) {
      this.disabaleState = true
    }else{
      this.disabaleState = false
    }
    $('#final').on('click', function () {
      $('html, body').animate({
      });
    });
    this.getCountryList();
    this.postImageUrl = './assets/images/user.svg';
    this.getBaseImageUrl = this.configService.getImageUrl();
    this.imageType = this.configService.getImageType();
    this.imageSize = this.configService.getFileSize();
    this.imageTypeSupport = this.configService.getimageTypeSupport();
    this.imageSizeSupport = this.configService.getimageSizeSupport();
    const mobileValidationPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    this.myValue = true;
    this.myValues = false;
    this.id = this.route.snapshot.params.id;
    this.submitted = false;
   


    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      height: '100%'
    };

    this.routeSubscribe();
  }

  // settings api
  getSettings(): void {
    this.layoutSandbox.getSettings();
    this.subscriptions.push(this.layoutSandbox.settingDetails$.subscribe(ele => {
      if(ele) {
        this.kycMandate = ele.kycMandate;
        if (this.id) {
          this.pageDetails();
        }
        if (!this.id) {
          this.sellerForm();
        } else {
          this.sellerUpdateForm();
        }
      }
    }))
  }



  // seller group
  getVendorGroupList() {
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.keyword = '';
    param.status = '';
    param.count = 0;
    this.vendorGroupList.vendorGroupList(param);
  }

  // Industry
  getIndustryList(): void {
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.keyword = '';
    param.status = '';
    param.count = 0;
    this.vendorGroupList.industryList(param);
    this.vendorGroupList.industryList$.subscribe(val => {
      if (val) {
        this.industryListData = val;

      }
    })
  }

  // Country List
  getCountryList(): void {
    const param: any = {};
    param.status = 1;
    this.sellerSandbox.getCountriesList(param);
    this.subscriptions.push(this.sellerSandbox.getCountryList$.subscribe(data => {
      if (data) {
        this.options = data;
        this.getCountryId(data);
      }
    }));
  }

  getCountryId(list): void {
    list.forEach(data => {
      if (data.isoCode3 === 'IND') {
        this.countryId = data.countryId;
        // this.sellerAddForm.controls.companyCountryId.setValue(
        //   this.countryId
        // );
      }
    });
    this.getZoneList(this.countryId)
  }

  // Select Country
  selectCountry(event): void {
    this.countryId = +event;
    this.sellerAddForm.controls.companyState.setValue('');
    this.getZoneList(this.countryId);
  }

  // Select Zone
  getZoneList(id): void {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.count = 0;
    params.keyword = '';
    params.countryId = id;
    this.sellerSandbox.zoneList(params);
    this.subscriptions.push(this.sellerSandbox.zoneList$.subscribe((res: any) => {
      if (res) {
        this.zoneListLength = res.length;
        const applyValidators = (validators: any[]) => {
          return this.kycMandate == 1
            ? validators 
            : validators.filter(validator => validator !== Validators.required); 
        };
      
        if (this.zoneListLength > 0) {
          let inputState = {
            companyState: applyValidators([Validators.required])
          };
          this.dynamicValidationAddRemoveObject(inputState);
        } else {
          let inputState = {
            companyState: []
          };
          this.dynamicValidationAddRemoveObject(inputState);
        }
      }
    }))
  }

  // detail 
  pageDetails(): void {
    const params: any = {};
    params.id = this.id;
    this.sellerSandbox.pageDetails(params);

    this.subscriptions.push(this.sellerSandbox.pageDetails$.subscribe(data => {
      if (data) {
        this.vendorDocuments = data.vendorDocuments
        this.details = data;
        this.toggleDisable = this.details?.approvalFlag;
        this.profileimg = data?.customerDetail?.avatar;
        this.coverimg = data?.companyCoverImage;
        this.logoimg = data?.companyLogo;
        if (this.id) {
          if (this.details?.companyCountryId) {
            this.countryId = this.details?.companyCountryId;
          }
          this.sellerAddForm.controls.firstName.setValue(
            this.details?.customerDetail?.firstName
          );
          this.sellerAddForm.controls.lastName.setValue(
            this.details?.customerDetail?.lastName
          );
          this.sellerAddForm.controls.mobileNumber.setValue(
            this.details?.customerDetail?.mobileNumber
          );
          this.sellerAddForm.controls.email.setValue(this.details?.customerDetail?.email);
          this.sellerAddForm.controls.companyName.setValue(this.details?.companyName);
          this.sellerAddForm.controls.bankName.setValue(this.details?.bankAccount?.bankName);
          this.sellerAddForm.controls.accountHolderName.setValue(this.details?.bankAccount?.accountHolderName);
          this.sellerAddForm.controls.branch.setValue(this.details?.bankAccount?.branch);
          this.sellerAddForm.controls.accountNumber.setValue(this.details?.bankAccount?.accountNumber);
          this.sellerAddForm.controls.accountSince.setValue(this.details?.bankAccount?.accountCreatedOn);
          this.sellerAddForm.controls.swiftCodeBic.setValue(this.details?.bankAccount?.bic);
          this.sellerAddForm.controls.ifscCode.setValue(this.details?.bankAccount?.ifsc)
          this.sellerAddForm.controls.businessNumber.setValue(this.details?.businessNumber);
          this.sellerAddForm.controls.taxNumber.setValue(
            this.details?.companyTaxNumber
          );
          if (this.details?.companyDescription !== null) {
            this.sellerAddForm.controls.companyDescription.setValue(
              this.htmlTagConversion(this.details?.companyDescription)
            );
          } else {
            this.sellerAddForm.controls.companyDescription.setValue(this.details?.companyDescription);
          }
          this.sellerAddForm.controls.commission.setValue(
            this.details?.commission
          );
          // this.activeStatus = this.details.customerDetail.isActive;
          this.sellerAddForm.controls.status.setValue(
            this.details?.isActive == 0 ? false : true
          );
          this.checkstatus = this.details?.approvalFlag;

          if (this.details?.approvalFlag == 1) {
            this.approvalFlag = true
            this.changeDetectRef.detectChanges();

          } else {
            this.approvalFlag = false;
            this.changeDetectRef.detectChanges();
          }
          this.sellerAddForm.controls.whatsApp.setValue(this.details?.whatsapp);
          this.sellerAddForm.controls.instagram.setValue(this.details?.instagram);
          this.sellerAddForm.controls.facebook.setValue(this.details?.facebook);
          this.sellerAddForm.controls.youtube.setValue(this.details?.youtube);
          this.checkAvail = this.details?.displayNameUrl ? this.details?.displayNameUrl : '';
          this.sellerAddForm.controls.companyAddress1.setValue(this.details?.companyAddress1);
          this.sellerAddForm.controls.companyAddress2.setValue(
            this.details?.companyAddress2
          );
          this.sellerAddForm.controls.companyCity.setValue(
            this.details?.companyCity
          );
          this.sellerAddForm.controls.companyCountryId.setValue(
            this.details?.companyCountryId
          );
          if (data?.zoneId) {
            this.sellerAddForm.controls.companyState.setValue(data.zoneId);
          }
          else {
            this.sellerAddForm.controls.companyState.setValue(data.state);
          }
          this.vendorGroupName = this.details?.vendorGroup?.groupId == 0 ? '' : this.details?.vendorGroup?.groupId;
          this.industryName = this.details?.industryId == 0 ? '' : this.details?.industryId;

          this.sellerAddForm.controls.pincode.setValue(
            this.details?.pincode == 0 ? '' : this.details?.pincode
          );
          this.sellerAddForm.controls.gst.setValue(
            this.details?.companyGstNumber
          );
          if (this.details?.customerDetail.avatar !== null) {
            this.postImageUrl =
              this.getBaseImageUrl +
              '?path=' +
              this.details?.customerDetail.avatarPath +
              '&name=' +
              this.details?.customerDetail.avatar +
              '&width=160&height=150';
          }
          if (!['', null, undefined].includes(this.details?.companyLogo) && !['', null, undefined].includes(this.details?.companyLogoPath)) {
            this.postImageUrls =
              this.getBaseImageUrl +
              '?path=' +
              this.details?.companyLogoPath +
              '&name=' +
              this.details?.companyLogo +
              '&width=160&height=150';
          }
          if (this.details?.companyCoverImage) {
            this.coverPostImageUrl =
              this.getBaseImageUrl +
              '?path=' +
              this.details?.companyCoverImagePath +
              '&name=' +
              this.details?.companyCoverImage +
              '&width=1920&height=525';
          }
        }
      }
    }));
  }



  public onClick(elementId: string): void {
    this.viewportScroller.setOffset([0, 85]);
    this.viewportScroller.scrollToAnchor(elementId);
  }

  // Upload log
  onDragOver(event: DragEvent) {
    event.preventDefault(); // Prevent the browser from opening the file
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.handleFileUpload(file);
    }
  }

  handleFileUpload(file: File) {
    const event = { target: { files: [file] } };
    this.logoChange(event);
  }

  logoButtonClick() {
    const els: HTMLElement = this.filePathCompany.nativeElement as HTMLElement;
    els.click();
  }

  logoChange(event): void {
    this.convertsBase64(event.target, event);
    this.logoArray = event.target.files[0].name
  }

  convertsBase64(inputValues: any, event): void {
    const files: File = inputValues.files[0];
    const myReaders: FileReader = new FileReader();

    if (!this.imageType.exec(inputValues.files[0].name)) {
      this.logotypeError = true;
      this.ImageUrl = '';
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageTypeSupport);
      return;
    }
    this.logotypeError = false;

    const size = Math.round(inputValues.files[0].size / 1024);
    if (size > this.imageSize) {
      this.imageUrls = '';
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageSizeSupport);
      return;
    }
    else {
      this.logoimageSizeError = false;
      let modelRef = this.modal.open(ImagecropComponent, {
        windowClass: 'crop-local', keyboard: false, backdrop: 'static', animation: false, modalDialogClass: 'modal-dialog-centered',
        size: 'xl'
      })
      modelRef.componentInstance.imageChangedEvent = event;
      modelRef.result.then((result) => {
        if (result?.isChoosed) {
          this.postImageUrls = result?.croppedImage?.changingThisBreaksApplicationSecurity
          this.filePath.nativeElement.value = '';
          this.imageUrls = result.croppedImage.changingThisBreaksApplicationSecurity
        }
      });
    }
    myReaders.readAsDataURL(files);
  }


  // Upload Profile image
  profileButtonClick() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }

  profileChange($event): void {
    this.convertBase64($event.target);
    this.array = $event.target.files[0]?.name;
  }

  convertBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    if (!this.imageType.exec(inputValue.files[0].name)) {
      this.profileimagetypeError = true;
      this.ImageUrl = '';
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageTypeSupport);
      return;
    }
    this.profileimagetypeError = false;

    const size = Math.round(inputValue.files[0].size / 1024);
    if (size > this.imageSize) {
      this.profileimageSizeError = true;
      this.imageUrls = '';
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageSizeSupport);
      return;
    }
    this.profileimagetypeError = false;

    myReader.onloadend = e => {
      this.postImageUrl = myReader.result;
      this.ImageUrl = myReader.result;
      this.changeDetectRef.detectChanges();
    };
    myReader.readAsDataURL(file);
    this.profileimageSizeError = false;
  }

  // Banner image upload 
  onDragOverBanner(event: DragEvent): void {
    event.preventDefault(); // Prevent the browser from opening the file
  }

  onDropBanner(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.handleFileUploadBanner(file);
    }
  }

  handleFileUploadBanner(file: File): void {
    const event = { target: { files: [file] } };
    this.coverChange(event);
  }

  coverButtonClick() {
    const el: HTMLElement = this.filePathCover.nativeElement as HTMLElement;
    el.click();
  }

  coverChange($event): void {
    this.convertBase64ForCover($event.target, $event);
    this.coverArray = $event.target.files[0].name
  }

  convertBase64ForCover(inputValue: any, event): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    if (!this.imageType.exec(inputValue.files[0].name)) {
      this.coverimagetypeError = true;
      this.ImageUrl = '';
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageTypeSupport);
      return;
    }
    this.coverimagetypeError = false;

    const size = Math.round(inputValue.files[0].size / 1024);
    if (size > this.imageSize) {
      this.coverimageSizeError = true;
      this.imageUrls = '';
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageSizeSupport);
      return;
    }
    this.coverimageSizeError = false;

    let modelRef = this.modal.open(BannerimagecropComponent, {
      windowClass: 'crop-local', keyboard: false, backdrop: 'static', animation: false, modalDialogClass: 'modal-dialog-centered',
      size: 'xl'
    })

    modelRef.componentInstance.imageChangedEvent = event;
    modelRef.result.then((result) => {
      if (result?.isChoosed) {
        this.coverPostImageUrl = result?.croppedImage?.changingThisBreaksApplicationSecurity
        this.filePath.nativeElement.value = '';
        this.CoverImageUrl = result.croppedImage.changingThisBreaksApplicationSecurity
      }
      myReader.readAsDataURL(file);
      this.coverimageSizeError = false;
    })
  }

  // Seller create form
  sellerForm(): void {
    const emailPattern = '[a-zA-Z0-9.-_\-\._]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
    const nameValidationPattern = /^[a-zA-Z\s]*$/;
    const roleExpression = '^[a-zA-Z0-9]+$';
    const whatsappPattern = /^https:\/\/(wa\.me\/\d+|api\.whatsapp\.com\/send\?phone=\d+|chat\.whatsapp\.com\/[A-Za-z0-9]{22})$/;
    const instagramPattern = /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/;
    const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed|v|watch|.+\?v=|(?:.+\/)?)([^&]{11}|[a-zA-Z0-9_-]{11}|[a-zA-Z0-9_-]{11}\/?)(\S+)?|youtu\.be\/([^&]{11}|[a-zA-Z0-9_-]{11})$)/;
    const facebookPattern = /^(https?:\/\/)?(www\.)?facebook\.com\/?[A-Za-z0-9_./?=&-]*\/?$/;
    const applyValidators = (validators: any[]) => {
      return this.kycMandate == 1
        ? validators 
        : validators.filter(validator => validator !== Validators.required); 
    };
  
    this.sellerAddForm = this.fb.group({
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(nameValidationPattern),
      ])],

      lastName: ['', [Validators.pattern(nameValidationPattern),]],

      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(emailPattern),
        Validators.email,
        Validators.maxLength(96)
      ])
      ],
      mobileNumber: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(15)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        CustomValidators.patternValidator(/((?=.*\d)|(?=.*[#$^+=!*()@%&]))/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[!@#$%^&*()_+\-=~\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacter: true }),
        Validators.minLength(8),
        Validators.maxLength(128)
      ])],
      confirmPassword: ['', Validators.required],
      commission: [''],
      status: [false],
      approveVendor: [1],
      avatar: [''],
      mailStatus: [''],
      companyLogo: [''],
      businessNumber: [''],
      taxNumber: [''],
      bankName: ['', applyValidators([Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)])],
      branch: ['', applyValidators([Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)])],
      accountNumber: ['', applyValidators([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      ifscCode: ['', applyValidators([Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)])],
      accountHolderName: ['', applyValidators([Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)])],
      swiftCodeBic: ['', Validators.pattern(/^[a-zA-Z0-9]*$/)],
      accountSince: [''],
      companyName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9 $,'&-]*$/)])],
      companyDescription: ['', Validators.compose([
        Validators.maxLength(255)
      ])],
      companyAddress1: ['',Validators.compose(applyValidators([Validators.required,
      Validators.maxLength(128)
      ]))],
      companyAddress2: ['',Validators.compose(applyValidators([Validators.required,
      Validators.maxLength(128)
      ]))],
      companyCity: ['', Validators.compose([
        Validators.maxLength(128)
      ])],
      companyState: [null, Validators.compose(applyValidators([
        Validators.required, Validators.maxLength(128)
      ]))],
      companyCountryId: [null, applyValidators([Validators.required])],
      pincode: ['', Validators.compose(applyValidators([
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(4)

      ]))],
      companyWebsite: [null],
      coverLogo: [null],
      gst: [''],
      whatsApp: ['', [Validators.maxLength(255), Validators.pattern(whatsappPattern)]],
      instagram: ['', [Validators.maxLength(255), Validators.pattern(instagramPattern)]],
      youtube: ['', [Validators.maxLength(255), Validators.pattern(youtubePattern)]],
      facebook: ['', [Validators.maxLength(255), Validators.pattern(facebookPattern)]],
      taxname: [''],
      vendorGroup: ['', Validators.required],
      industry: ['', Validators.required],
      displayName: ['', [Validators.required, Validators.compose([
        Validators.pattern(roleExpression), Validators.maxLength(30)
      ])]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  // seller update form
  sellerUpdateForm(): void {
    const emailPattern = '[a-zA-Z0-9.-_\-\._]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
    const nameValidationPattern = '[a-zA-Z \'-,;.]*';
    const roleExpression = '^[a-zA-Z0-9]+$';
    const whatsappPattern = /^https:\/\/(wa\.me\/\d+|api\.whatsapp\.com\/send\?phone=\d+|chat\.whatsapp\.com\/[A-Za-z0-9]{22})$/;
    const instagramPattern = /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/;
    const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed|v|watch|.+\?v=|(?:.+\/)?)([^&]{11}|[a-zA-Z0-9_-]{11}|[a-zA-Z0-9_-]{11}\/?)(\S+)?|youtu\.be\/([^&]{11}|[a-zA-Z0-9_-]{11})$)/;
    const facebookPattern = /^(https?:\/\/)?(www\.)?facebook\.com\/?[A-Za-z0-9_./?=&-]*\/?$/;
    const applyValidators = (validators: any[]) => {
      return this.kycMandate == 1
        ? validators 
        : validators.filter(validator => validator !== Validators.required); 
    };
    this.sellerAddForm = this.fb.group({
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(nameValidationPattern),
      ])],

      lastName: ['', [Validators.pattern(nameValidationPattern),]],

      mobileNumber: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(15)
      ])],
      commission: [''],
      status: [false],
      approveVendor: [1],
      avatar: [''],
      mailStatus: [''],
      companyLogo: [''],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(emailPattern),
        Validators.email,
        Validators.maxLength(96)
      ])
      ],
      businessNumber: [''],
      taxNumber: [''],
      bankName: ['', applyValidators([Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)])],
      branch: ['', applyValidators([Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)])],
      accountNumber: ['', applyValidators([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      ifscCode: ['', applyValidators([Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)])],
      accountHolderName: ['', applyValidators([Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)])],
      swiftCodeBic: ['', Validators.pattern(/^[a-zA-Z0-9]*$/)],
      accountSince: [''],
      companyName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9 $,'&-]*$/)])],
      companyDescription: ['', Validators.compose([
        Validators.maxLength(255)
      ])],
      companyAddress1: ['',Validators.compose(applyValidators([Validators.required,
        Validators.maxLength(128)
        ]))],
        companyAddress2: ['',Validators.compose(applyValidators([Validators.required,
        Validators.maxLength(128)
        ]))],
        companyCity: ['', Validators.compose([
          Validators.maxLength(128)
        ])],
        companyState: [null, Validators.compose(applyValidators([
          Validators.required, Validators.maxLength(128)
        ]))],
        companyCountryId: [null, applyValidators([Validators.required])],
        pincode: ['', Validators.compose(applyValidators([
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(4)
  
        ]))],
      companyWebsite: [''],
      gst: [''],
      coverLogo: [''],
      password: [''],
      confirmPassword: [''],
      whatsApp: ['', [Validators.maxLength(255), Validators.pattern(whatsappPattern)]],
      instagram: ['', [Validators.maxLength(255), Validators.pattern(instagramPattern)]],
      youtube: ['', [Validators.maxLength(255), Validators.pattern(youtubePattern)]],
      facebook: ['', [Validators.maxLength(255), Validators.pattern(facebookPattern)]],
      taxname: [''],
      vendorGroup: ['', Validators.required],
      industry: ['', Validators.required],
      displayName: ['', Validators.compose([
        Validators.pattern(roleExpression), Validators.maxLength(30)
      ])]
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
  }

  // Form Control for validation
  get f() {
    return this.sellerAddForm.controls;
  }

  keyPress(event: any) {
    const pattern = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // On Submit
  onSubmit(): void {
    this.submitted = true;
    this.validtionError = true;
    this.documentMandatoryMessage();
    if (this.sellerAddForm.invalid || this.checkAvail === '' || this.checkAvail.length > 32) {
      this.scrollToError();
      return;
    }
    if((this.documentValidationMessage?.length > 0) && this.kycMandate == 1) {

return;
    }
    const params: any = {};
    params.firstName = this.sellerAddForm.value.firstName;
    params.lastName = this.sellerAddForm.value.lastName;
    params.mobileNumber = this.sellerAddForm.value.mobileNumber;
    params.email = this.sellerAddForm.value.email;
    if (this.ImageUrl) {
      params.avatar = this.ImageUrl;
    }
    params.commission = this.sellerAddForm.value.commission;
    params.status = this.sellerAddForm.value.status == false ? 0 : 1;
    params.approvalFlag = this.checkstatus;
    params.companyAccountBankName = this.sellerAddForm.value.bankName;
    params.companyAccountHolderName = this.sellerAddForm.value.accountHolderName;
    params.companyAccountBranch = this.sellerAddForm.value.branch;
    params.companyAccountNumber = this.sellerAddForm.value.accountNumber;
    params.companyAccountCreatedOn = this.sellerAddForm.value.accountSince;
    params.companyAccountBic = this.sellerAddForm.value.swiftCodeBic;
    params.companyTaxNumber = this.sellerAddForm.value.taxNumber;
    params.businessNumber = this.sellerAddForm.value.businessNumber;
    params.ifscCode = this.sellerAddForm.value.ifscCode
    params.companyName = this.sellerAddForm.value.companyName;
    if (this.imageUrls) {
      params.companyLogo = this.imageUrls;
    }
    if (this.CoverImageUrl) {
      params.companyCoverImage = this.CoverImageUrl;
    }
    params.companyDescription = this.sellerAddForm.value.companyDescription;
    params.companyAddress1 = this.sellerAddForm.value.companyAddress1;
    params.companyAddress2 = this.sellerAddForm.value.companyAddress2;
    params.companyCity = this.sellerAddForm.value.companyCity;

    this.sellerSandbox.zoneList$.subscribe(res => {
      if (res?.some(val => (val.zoneId == this.sellerAddForm.value.companyState))) {
        params.zoneId = this.sellerAddForm.value.companyState;
        params.state = '';
      }
      else {
        params.state = this.sellerAddForm.value.companyState;
        params.zoneId = 0;
      }
    })
    params.companyState = this.sellerAddForm.value.companyState;
    params.companyCountryId = this.sellerAddForm.value.companyCountryId ? this.sellerAddForm.value.companyCountryId : null;
    params.pincode = this.sellerAddForm.value.pincode;
    params.companyWebsite = this.sellerAddForm.value.companyWebsite;
    params.mailStatus = this.sellerAddForm.value.mailStatus;
    params.companyGstNumber = this.sellerAddForm.value.gst;
    params.password = this.sellerAddForm.value.password;
    params.confirmPassword = this.sellerAddForm.value.confirmPassword;
    params.instagram = this.sellerAddForm.value.instagram;
    params.whatsApp = this.sellerAddForm.value.whatsApp;
    params.youtube = this.sellerAddForm.value.youtube;
    params.facebook = this.sellerAddForm.value.facebook;
    params.taxname = this.sellerAddForm.value.taxname;
    params.vendorGroupId = this.sellerAddForm.value.vendorGroup;
    params.industryId = this.sellerAddForm.value.industry;
    // this.vendorDocuments?.map(resp => {
    //   const param1: any = {}
    //   param1.documentId = resp.customerDocumentId;
    //   param1.statusId = resp.documentStatus == 4 ? 1 : resp.documentStatus == 5 ? 0 : resp.documentStatus;
    //   if (resp.reason) {
    //     param1.reason = resp.reason
    //   }
    //   this.myvendorDocument.push(param1)
    // })
    let documentValue: any = [];
    this.vendorDocuments.forEach((ele: any) => {
      const obj = {
        "documentId": ele.documentId,
        "fileName": ele.fileName,
        "filePath": ele.filePath,
        "status": ele.isVerified,
      }
      documentValue.push(obj);
    })

    params.vendorDocuments = documentValue;
    params.displayNameUrl = this.checkAvail;
    if (['', null, undefined].includes(this.id)) {
      params.mailStatus = 1;
    } else {
      params.mailStatus = 0;
    }
    if (this.id) {
      params.customerId = this.details?.customerId;
      this.sellerSandbox.sellerUpdate(params);
      this.subscriptions.push(
        this.sellerSandbox.doSellerUpdate$.subscribe((data: any) => {
          if (data && data.status === 1) {
            this.cancel()
          }
        })
      );
      this.myvendorDocument = []
    } else {
      this.sellerSandbox.sellerAdd(params);
      this.subscriptions.push(
        this.sellerSandbox.doSellerAdd$.subscribe(data => {
          if (data && data.status === 1) {
            this.cancel()
          }
        })
      );
      this.myvendorDocument = []
    }
  }

  // Go back to list
  cancel(): void {
    this.router.navigate(['/seller/manage-seller/seller/seller'], { queryParams: this.queryDetails });
  }

  // password and confirm password validation 
  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: UntypedFormGroup) => {
      const password = group.controls[passwordKey];
      const passwordConfirmation = group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
        return passwordConfirmation.setErrors({ mismatchedPasswords: true });
      }
    };
  }

  enterPassword(value): void {
    if (value) {
      this.passwordField = value;
    } else {
      this.passwordField = '';
    }
  }

  // Check if Display Name is Available
  checkAvailability(): void {
    const params: any = {};
    if (this.checkAvail.length > 32) {
      return
    }
    if (this.checkAvail !== '') {
      params.displayNameURL = this.checkAvail;
      params.vendorId = this.id;
      this.service.checkAvailability(params).subscribe(data => {
        if (data.message == "Display name available") {
          this.displaySuccess = true;
          setTimeout(() => {
            this.displaySuccess = false;

          }, 3000);
        }
      }, err => {
        if (err.error.message == "Display name already exists" || "Display name already Exists") {
          this.displayFailed = true;
          setTimeout(() => {
            this.displayFailed = false;
          }, 3000);
        }
      });
    }
  }

  // Change Status Active In-Active
  statusChange(e): void {
    // if (e == true) {
    //   this.activeStatus = 1;
    // }
    // else {
    //   this.activeStatus = 0;
    // }
  }

  // Approve Seller 
  
  // Approve Seller 
  approveSeller(e, ev): void {

    if (this.kycMandate == 1) {
      if (this.details?.createdBy == null && ev.target.checked == true) {
        ev.preventDefault();
        ev.stopPropagation();

        if(this.details?.kycStatus=='verified'){
          if (e == true) {
            this.checkstatus = 1;
            this.approvalFlag = true
          }
          else {
            this.checkstatus = 0;
            this.approvalFlag = false
          }
        }else{
          const modelRef = this.modalService.open(AlertMessageSellerComponent, {
            size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
          });  
         
          if (['pending', 'submitted'].includes(this.details?.kycStatus)) {
            modelRef.componentInstance.content = 'fullfillment.SellerApprovalModelpopuppending'
            modelRef.componentInstance.content1 = 'fullfillment.Areyousureyouneedtooverwritekycprocessbythisapproval?'
          }
  
          if (this.details?.kycStatus == 'rejected') {
            modelRef.componentInstance.content = 'fullfillment.Youaretryingtoapprovetheprofilewhosekycisrejected.'
            modelRef.componentInstance.content1 = 'fullfillment.ThisActionWillAutoverifytheirKyc,?'
          }
          modelRef.result.then((result) => {
            if (result?.message == 'success') {
              this.checkstatus = 1;
              this.approvalFlag = true
            } else {
              this.checkstatus = 0;
              this.approvalFlag = false
            }
          })
        }
      } else {
        if (e == true) {
          this.checkstatus = 1;
          this.approvalFlag = true
        }
        else {
          this.checkstatus = 0;
          this.approvalFlag = false
        }
      }
    } else {
      if (e == true) {
        this.checkstatus = 1;
        this.approvalFlag = true
      }
      else {
        this.checkstatus = 0;
        this.approvalFlag = false
      }
    }

  }


  // Scroll To Error
  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  scrollToError(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');
    this.scrollTo(firstElementWithError);
  }

  // Downdload Seller Document
  downloadDoc(documents): void {
    const params: any = {}
    params.key = documents.filePath + documents.fileName;
    this.DocumentSandBox.downloadDocument(params);
  }

  // Html coversion for special characters
  private htmlTagConversion(data) {
    const val = data
      .replaceAll('&amp;', '&')
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&quot;', '"')
      .replaceAll('&#39;', "'")
      .replaceAll('&sbquo;', '‚')
      .replaceAll('&#61;', '=')
      .replaceAll('&#45;', '-')
      .replaceAll('&hellip;', '…')
      .replaceAll('&commat;', '@')
      .replaceAll('&copy;', '©')
      .replaceAll('&#35;', '#')
      .replaceAll('&ldquo;', '“')
      .replaceAll('&rsquo;', '’')
      .replaceAll('&lsquo;', '‘')
      .replaceAll('&trade;', '™')
      .replaceAll('&reg;', '®')
      .replaceAll('&ndash;', '–')
      .replaceAll('&eacute;', 'é')
      .replaceAll('&euro;', '€')
      .replaceAll('&pound;', '£');
    return val;
  }

  private dynamicValidationAddRemoveObject(fields: any): void {
    Object.keys(fields).forEach((sg: any) => {
      this.sellerAddForm.get(sg).setValidators(fields[sg]);
      this.sellerAddForm.get(sg).updateValueAndValidity();
    });
  }
  private routeSubscribe() {
    this.route.queryParams.subscribe(val => {
      this.queryDetails = val
    })
  }

  // file upload
  getUploadSellerDocuments() {
    this.DocumentSandBox.getDocumentListData({});
    this.DocumentSandBox.getDocumentListData$.subscribe(list => {
      if (list) {
        // const filteredList = list.filter(item => item.isMandatory === 1);
        // const filteredList = list;
        const filteredList = list.filter(item => item.name !== "Certificate");
        this.sellerDocumentList = filteredList;
      }
    });
  }

  // ismandatory field validation message showing 
  private documentMandatoryMessage(): void {
   this.documentValidationMessage = structuredClone(this.sellerDocumentList).filter(item => item.isMandatory === 1 && !structuredClone(this.vendorDocuments).some(val => val.documentId == item.id))  
   this.documentValidationMessage = [...this.documentValidationMessage];
   this.changeDetectRef.detectChanges();    
  }

  // Fe memeory document save 
  createDocument(): void {
    this.documentSubmitted = true;
    if (this.documentForm.invalid || Object.keys(this.uploadFileLocation).length == 0) {
      return
    }
    const name = this.sellerDocumentList.find(val => val.id == this.documentForm.value['documentType'])?.name;
    const localData = {
      document: { name: name },
      createdDate: new Date().toISOString(),
      documentId: this.documentForm.value['documentType'],
      fileName: this.uploadFileLocation.file,
      filePath: this.uploadFileLocation.path,
      isVerified: 1
    }
    const val = this.vendorDocuments.map(val => val.documentId)
    if(val.includes(this.documentForm.value['documentType'])) {
      this.toastr.error('Document type already uploaded')
      this.closeAddDocumentsModal.nativeElement.click();
      this.validtionError = false;
      this.changeDetectRef.detectChanges();
      this.cancelUpload(); 
      return;
    }
    this.vendorDocuments.push(localData);
    this.documentMandatoryMessage()
    this.closeAddDocumentsModal.nativeElement.click();
    this.validtionError = false;
    this.changeDetectRef.detectChanges();
    this.cancelUpload();
  }

  private initDocumentForm(): void {
    this.documentForm = this.fb.group({
      documentType: [null, [Validators.required]],
    })
  }
  private initAddDocumetForm(): void {
    const formGroupField = getFormControlsFieldsObj(addDocumentsFormObj);
    this.addDocumentForm = this.fb.group(formGroupField);
    Object.keys(addDocumentsFormObj).forEach((element: any) => {
      this.addDocumentFormFields[element] = getTypes(addDocumentsFormObj[element], this.addDocumentForm);
    });
  }

  addDocuments() {
    this.documentForm.controls['documentType'].setValue('')
  }
  addDocumentFile(event) {
    if (['', null, undefined].includes(this.documentForm.value.documentType)) {
      this.doumentTypeValid = true;
      // this.toastr.error('Please select a Document type.');
      return;
    } else {
      this.doumentTypeValid = false;
      this.convertingBase64(event.target.files, event);
    }
  }

  convertingBase64(inputValue: any, event) {
    if (inputValue && inputValue[0].type) {
      if (!this.isValidFile(inputValue[0].name)) {
        this.documentFileType = true;
        return false;
      }
      else if (Math.round(inputValue[0].size / 1024) > environment.documentSize) {
        this.documentFileSize = true;
        return
      }

      const file: File = inputValue[0];
      const myReader: FileReader = new FileReader();
      myReader.onloadend = e => {
        const params: any = {
          fileName: event.target.files[0].name,
          fileType: 1,
          path: '/vendor/document/',
          image: myReader.result,
          documentId: this.documentForm.value['documentType']
        }
        this.sellerService.uploadFile(params).subscribe(res => {
          if (res?.status == 1) {
            this.uploadFileLocation = res.data;
          }
        })
      };
      myReader.readAsDataURL(file);
    }
  }

  isValidFile(file) {
    return environment.documentType.test(file);
  }
  removeDocument() {
    this.uploadFileLocation = {}
  }

  documentValidation() {
    if (!['', null, undefined].includes(this.documentForm.value['documentType'])) {
      this.documentSubmitted = false;
      this.doumentTypeValid = false;
    }
  }
  cancelUpload() {
    this.documentSubmitted = false;
    this.doumentTypeValid = false;
    this.documentFileType = false;
    this.documentForm.reset();
    this.uploadFileLocation = '';
  }

  private getQueryParam() {
    const params = {
      limit: this.limit,
      offset: this.offset,
      currentPage: this.currentPage,
      keyword: this.keyword ?? '',
    };
    return params;
  }


  updateQueryParam(): void {
    this.router.navigate([], { queryParams: { queryParamsHandling: 'merge' }, });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}

