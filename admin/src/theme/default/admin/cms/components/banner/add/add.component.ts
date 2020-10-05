/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  OnInit
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
    `
  ]
})
export class BannerAddComponent implements OnInit {
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
  public submitted = false;
  public postImageUrl: any;
  public editBannerId: any;
  id = '';
  public imageUrl: string;
  // Image
  @ViewChild('filePath') filePath: ElementRef;

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
    private service: BannerService
  ) {}

  ngOnInit() {
    this.imageUrl = this.configService.getImageUrl();
    this.postImageUrl = './assets/upload-banner/upload.png';
    this.initForm();
    this.editBannerData();
    this.editBannerId = this.route.snapshot.paramMap.get('id');
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

  //  cancel it  navigate  to - add page to  list page
  bannerCancel() {
    this.service.setBannerListData('');
    this.router.navigate(['/cms/banners/list']);
  }

  // Form  Initialization
  initForm() {
    this.bannerForm = this.fb.group({
      bannerTitle: [null, [Validators.required]],
      bannerContent: [''],
      active: ['', Validators.required],
      bannerLink: [null],
      position: [null],
      imageInput: ['', [Validators.required]]
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
      params.title = this.bannerForm.value.bannerTitle;
      params.content = this.bannerForm.value.bannerContent;
      params.position = +this.bannerForm.value.position;
      params.link = this.bannerForm.value.bannerLink;
      params.image = this.ImageUrl;
      // tslint:disable-next-line: radix
      const tempActive = parseInt(this.bannerForm.value.active);
      params.status = tempActive;
      if (this.bannerInfo[0] && this.bannerInfo[0].bannerId) {
        params.bannerId = this.bannerInfo[0].bannerId;
        this.sandbox.UpdateBanner(params);
      } else {
        console.log('params', params);
        this.sandbox.addBanner(params);
      }
    }
  }

  // editBanner Data
  editBannerData() {
    this.bannerInfo = [];
    this.serviceData = this.service.getbannerListdata();
    if (this.serviceData) {
      this.bannerInfo.push(this.serviceData);
    }
    if (this.bannerInfo && this.bannerInfo[0]) {
      for (let i = 0; i < this.bannerInfo.length; i++) {
        this.bannerTitle = this.bannerInfo[0].title;
        this.bannerForm.controls['bannerContent'].setValue(
          this.serviceData.content
        );
        this.bannerLink = this.bannerInfo[0].link;
        this.bannerForm.controls['imageInput'].setValue(this.serviceData.image); // <-- Set Value for Validation
        this.position = this.bannerInfo[0].position;
        this.bannerForm.controls['active'].setValue(this.serviceData.active);
        this.postImageUrl =
          this.imageUrl + '?path=' +
          `${this.bannerInfo[0].imagePath}` + '&name=' +
          `${this.bannerInfo[0].image}` +
          '&width=160&height=150';
        this.changeDetectRef.detectChanges();
      }
    } else {
      this.bannerInfo = ' ';
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
  }

  convertBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    this.bannerForm.controls['imageInput'].setValue(file ? file.name : ''); // <-- Set Value for Validation
    const myReader: FileReader = new FileReader();

    myReader.onloadend = e => {
      this.postImageUrl = myReader.result;
      this.ImageUrl = myReader.result;
      this.changeDetectRef.detectChanges();
    };
    myReader.readAsDataURL(file);
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
}
