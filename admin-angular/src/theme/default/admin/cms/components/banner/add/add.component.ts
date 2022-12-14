/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  OnInit, OnDestroy
} from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
// Routing Module
import { ActivatedRoute, Router } from '@angular/router';
// Store Module
import { BannerSandbox } from '../../../../../../../core/admin/cms/banners/banner.sandbox';
import { BannerService } from '../../../../../../../core/admin/cms/banners/banner.service';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';

@Component({
  selector: 'app-cms-banner-add',
  templateUrl: 'add.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #009efb;
        color: white;
      }

      .dark-modal .close {
        color: white;
      }

      .light-blue-backdrop {
        background-color: #5cb3fd;
      }

      .image-manager .modal-dialog {
        max-width: 70%;
      }

      .radio-buttons{
        display: flex;
        padding: 37px 19px;
        justify-content: center;
      }

      .mat-radio-button ~ .mat-radio-button {
  margin-left: 43px;
      }
    `
  ]
})
export class BannerAddComponent implements OnInit, OnDestroy {

  // VARIABLES
  private closeResult: string;
  public bannerInfo: any;
  public serviceData: any;
  public ImageUrl: any = '';
  public bannerForm: FormGroup;
  public bannerTitle: FormControl;
  public bannerContent: FormControl;
  public bannerLink: FormControl;
  public position: FormControl;
  public active: FormControl;
  public type:FormControl;
  public submitted = false;
  public postImageUrl: any;
  public editBannerId: any;
  public id = '';
  public imageUrl: string;
  private subscriptions: Array<Subscription> = [];
  @ViewChild('filePath') filePath: ElementRef;
  public imageTypeError = false;
  public imageSizeError = false;

  public queryDetails: any = {};
  public config: any;
  public customproduct:any=1;
  new: any = {}
  image: any;
  productslugvalue: any;
  categoryslugvalue:any;
  public checkedval=1;

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  constructor(
    private modalService: NgbModal,
    private modalService2: NgbModal,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private changeDetectRef: ChangeDetectorRef,
    private configService: ConfigService,
    public sandbox: BannerSandbox,
    private service: BannerService,
    private ckeconfiqservice: CkeConfiqService,
  ) {
    this.config = this.ckeconfiqservice.getckeconfig();

    const pageOffset = this.route.snapshot.queryParamMap.get('offset');
    const index = this.route.snapshot.queryParamMap.get('index');

    this.queryDetails.offset = pageOffset || 0;
    this.queryDetails.index = index || 0;
  }

  ngOnInit() {
    this.imageUrl = this.configService.getImageUrl();
    this.postImageUrl = './assets/upload-banner/upload.png';
    this.initForm();
    this.categoryList();
    this.getProductList()
    this.editBannerId = this.route.snapshot.paramMap.get('id');
    if (this.editBannerId) {
      const params: any = {};
      params.bannerId = this.editBannerId;
      this.sandbox.getBannerDetails(params);
      this.editBannerData();
    }

    const pageOffset = this.route.snapshot.queryParamMap.get('offset');
    const index = this.route.snapshot.queryParamMap.get('index');

    this.queryDetails.offset = pageOffset || 0;
    this.queryDetails.index = index || 0;

    this.bannerForm.controls['type'].valueChanges.subscribe(
      (selectedValue) => {
        this.checkedval = selectedValue;
      })

  }

  open2(content) {
    this.modalService
      .open(content, { windowClass: 'image-manager' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  open(content) {
    this.modalService2.open(content, {
      windowClass: 'dark-modal,image-manager'
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  bannerCancel() {
    this.service.setBannerListData('');
    this.router.navigate(['/cms/banners/list'], { queryParams: this.queryDetails });
  }

  initForm() {
    this.bannerForm = this.fb.group({
      bannerTitle: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ])],
      bannerContent: [''],
      active: [null, Validators.required],
      bannerLink: [''],
      position: [null],
      type:[1],
      imageInput: ['', Validators.required]
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox banner  function if form is valid.
   *
   * @param event form event
   * @param form entire form value
   */
  public onSubmit() {
    this.submitted = true;
    if (!this.bannerForm.valid) {
      this.validateAllFormFields(this.bannerForm);
      return;
    } else {
      const params: any = {};
      params.title = this.bannerForm.value.bannerTitle || '';
      params.content = this.bannerForm.value.bannerContent || '';
      params.position = this.bannerForm.value.position || 0;
      params.image = this.ImageUrl;
      const tempActive = parseInt(this.bannerForm.value.active);
      params.status = tempActive;
      if(this.checkedval==1){
        console.log('custom',this.checkedval)
        params.link =this.bannerForm.value.bannerLink || '';
        params.linkType = 1;
      }
      if(this.checkedval==2){
        console.log('this.productslugvalue',this.productslugvalue)
        params.link = this.productslugvalue || ''
        params.linkType = 2;

      }
      if(this.checkedval==3){
        params.link =this.categoryslugvalue || '';
        params.linkType = 3;

      }
      params.linkType=params.link ==''?'':params.linkType;
      if (this.editBannerId) {
        params.bannerId = this.editBannerId;
        this.sandbox.UpdateBanner(params);
      } else {
        this.sandbox.addBanner(params);
      }
    }
    this.subscribe();
  }

  subscribe() {
    this.subscriptions.push(
      this.sandbox.getAddNewBanner$.subscribe(data => {
        if (data) {
          if (data.message) {
            this.router.navigate(['/cms/banners/list'], { queryParams: this.queryDetails });
          }
        }
      })
    );

    this.subscriptions.push(
      this.sandbox.getUpdatebanner$.subscribe(data => {
        if (data) {
          if (data.message) {
            this.router.navigate(['/cms/banners/list'], { queryParams: this.queryDetails });
          }
        }
      })
    );
  }

  editBannerData() {
    this.subscriptions.push(this.sandbox.getBannerDetails$.subscribe(data => {
      if (data && Object.keys(data).length) {
        this.new = data;
        this.setBanner(data);
      }
    }));
  }

  categoryList() {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.count = 0;
    params.keyword = '';
    params.sortOrder = 0;
    params.status = 1;
    this.sandbox.categoryLists(params);
  }

  getProductList() {
    const params: any = {};
    params.offset = 0;
    params.limit = 0;
    params.keyword = '';
    params.sku = '';
    params.status = 1;
    params.price = 0;
    this.sandbox.ProductLists(params);
  }

  setBanner(details) {
    this.reset()
    if (details.image) {
      this.bannerForm.controls['imageInput'].setValue(details.image); // <-- Set Value for Validation
      this.postImageUrl =
        this.imageUrl + '?path=' +
        `${details.imagePath}` + '&name=' +
        `${details.image}` +
        '&width=160&height=150';
    }
    this.bannerForm.controls['bannerTitle'].setValue(details.title);
    this.bannerForm.controls['bannerContent'].setValue(this.htmlTagConversion(details.content));
    this.bannerForm.controls['active'].setValue(details.isActive);
    this.bannerForm.controls['position'].setValue(details.position);
    if(details.linkType==1){
      // this.bannerForm.controls['bannerLink'].setValue(details.link);
      this.bannerLink=details.link;
      this.checkedval =1;
      this.customproduct=1;
    }
    if(details.linkType==2){
      this.productslugvalue=details.link;
      this.checkedval =2;
      this.customproduct=2;
    }
    if(details.linkType==3){
      this.categoryslugvalue=details.link;
      this.checkedval =3;
      this.customproduct=3;
    }
    if(details.linkType==''){
      // this.bannerForm.controls['bannerLink'].setValue(details.link);
      this.checkedval =1;
      this.customproduct=1;
    }
    
  }

  // Upload Image
  uploadButtonClick() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }

  uploadChange($event): void {
    this.submitted = false;
    this.convertBase64($event.target);
    this.image = $event.target.files[0].name;
  }

  convertBase64(inputValue: any) {
    this.imageTypeError = false;
    this.imageSizeError = false;

    if (inputValue.files && inputValue.files[0]) {
      const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];

      if (!_.includes(allowed_types, inputValue.files[0].type)) {
        this.imageTypeError = true;
        this.ImageUrl = '';
        this.postImageUrl = './assets/upload-banner/upload.png';
        this.filePath.nativeElement.value = '';
        this.bannerForm.controls['imageInput'].setValue('');
        return false;
      }
      const size = Math.round(inputValue.files[0].size / 1024);
      if (size > 2048) {
        this.imageSizeError = true;
        this.ImageUrl = '';
        this.postImageUrl = './assets/upload-banner/upload.png';
        this.filePath.nativeElement.value = '';
        this.bannerForm.controls['imageInput'].setValue('');
        return;
      }
      this.imageTypeError = false;
      this.imageSizeError = false;
      const file: File = inputValue.files[0];
      this.bannerForm.controls['imageInput'].setValue(file ? file.name : '');
      const myReader: FileReader = new FileReader();
      myReader.onloadend = e => {
        this.postImageUrl = myReader.result;
        this.ImageUrl = myReader.result;
        this.changeDetectRef.detectChanges();
      };
      myReader.readAsDataURL(file);
    }
  }

  //  validation controls  -  function (f) is using in banner add html
  get f() {
    return this.bannerForm.controls;
  }

  // show all validation at when invalid form
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  htmlTagConversion(data){
    const val = data
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;','"')
    .replaceAll('&#39;',"'")
    .replaceAll('&sbquo;','‚')
    .replaceAll('&#61;','=')
    .replaceAll('&#45;','-')
    .replaceAll('&hellip;','…')
    .replaceAll('&commat;','@')
    .replaceAll('&copy;','©')
    .replaceAll('&#35;','#')
    .replaceAll('&ldquo;','“')
    .replaceAll('&rsquo;','’')
    .replaceAll('&lsquo;','‘')
    .replaceAll('&trade;','™')
    .replaceAll('&reg;','®')
    .replaceAll('&ndash;','–')
    .replaceAll('&eacute;','é')
    .replaceAll('&euro;','€')
    .replaceAll('&pound;','£');
     return  val ;
  }

  productevent(e){
  this.customproduct=e;
  }

  productslug(e){
    this.productslugvalue=e;
  }
  categoryslug(e){
    this.categoryslugvalue=e;
  }

  reset(){
    this.bannerLink=null;
    this.categoryslugvalue=null;
    this.productslugvalue=null;

  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
