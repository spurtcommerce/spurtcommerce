/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { EditprofileSandbox } from '../../../../../core/admin/profile/editprofile/editprofile.sandbox';
import { ConfigService } from '../../../../../core/admin/service/config.service';
import { EditprofileService } from '../../../../../core/admin/profile/editprofile/editprofile.service';
import { LayoutSandbox } from '../../../../../core/admin/layout/layout.sandbox';
import * as _ from 'lodash';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-editprofile',
  templateUrl: 'editprofile.component.html',
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

      .validationcolor {
        border-color: red;
      }

      .error {
        color: red;
      }
      .form-group textarea{
        height: 6.9375rem !important;
      }
    `
  ]
})
export class EditprofileComponent implements OnInit {

  @ViewChild('filePath') filePath: ElementRef;
  public editProfileForm: UntypedFormGroup;
  public name: UntypedFormControl;
  public phone: UntypedFormControl;
  public address: UntypedFormControl;
  public email: UntypedFormControl;
  public emailPattern: any;
  public mobnumPattern: any;
  public userNamePattern:any;
  public selecetdFile: any;
  public ifSubmitted: boolean;
  public profileData: any;
  // style purpose
  public closeResult: string;
  // showing profile image
  public image: any;
  public postImageUrl: any;
  public imageUrls: string;
  imagetypeError: boolean;
  imageSizeError: boolean;
  // event emitter

  message = 'Hola Mundo!';
  imageType: any;
  imageSize: number;
  imageTypeSupport: string;
  imageSizeSupport: string;
  support: string;



  constructor(
    public fb: UntypedFormBuilder,
    public layoutSandbox: LayoutSandbox,
    private modalService: NgbModal,
    private modalService2: NgbModal,
    private router: Router,
    private editProfilesandbox: EditprofileSandbox,
    public editProfileService: EditprofileService,
    public configService: ConfigService,
    private title: Title
  ) { 
    this.title.setTitle('My profile')
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

  ngOnInit() {
    this.editProfilesandbox.getProfile({});
    this.ifSubmitted = false;
    this.emailPattern = '[a-zA-Z0-9.-_\-\._]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
    this.mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
    this.userNamePattern = '^[a-zA-Z0-9_]{3,20}$'
    this.imageUrls = this.configService.getImageUrl();
    this.imageType = this.configService.getImageType();
    this.imageSize = this.configService.getFileSize();
    this.imageTypeSupport = this.configService.getimageTypeSupport();
    this.imageSizeSupport = this.configService.getimageSizeSupport();
    this.support = this.configService.getFileSupport();


    // FORM GROUP
    this.name = new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern),

    ]);
    this.phone = new UntypedFormControl('', [
      Validators.required
    ]);
    this.email = new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern),
     
    ]);
    this.address = new UntypedFormControl('', [Validators.required]);

    this.editProfileForm = this.fb.group({
      name: this.name,
      phone: this.phone,
      email: this.email,
      address: this.address
    });

    this.editProfileForm.get('email')?.valueChanges.subscribe((val) => {
      this.editProfileForm.controls.name.setValue(
        val
      );
      this.editProfileForm.get('name')?.disable();
    })

    // Data from local storage
    const token = sessionStorage.getItem('adminUser')
      ? JSON.parse(sessionStorage.getItem('adminUser'))
      : {};
    this.profileData = token;
    if (this.profileData) {
      this.EditProfilelist();
    }
  }

  editprofileCancel() {
    this.router.navigate(['/dashboard']);
  }

  getProfileDetail() {
    this.editProfilesandbox.getProfile({});
    this.editProfilesandbox.getProfileLoaded$.subscribe(data => {
      if (data === true) {
        this.EditProfilelist();
      }
    })
  }

  /**
   * Handles form 'submit' event. Calls sandbox edit function if form is valid.
   *
   * @param event form event
   * @param form entire form value
   */
  save(user) {
    this.ifSubmitted = true;
    if (!this.editProfileForm.valid) {
      this.validateAllFormFields(this.editProfileForm);
      return;
    }
    this.imageSizeError = false;
    this.imagetypeError = false;
    const param: any = {};
    param.username = this.editProfileForm.value.email;
    param.phoneNumber = this.editProfileForm.value.phone;
    param.email = this.editProfileForm.value.email;
    param.address = this.editProfileForm.value.address;
    if (this.postImageUrl !== '' && this.postImageUrl !== undefined) {
      param.avatar = this.postImageUrl;
    }
    this.editProfilesandbox.Editprofile(param);
    this.editProfilesandbox.getEditProfile$.subscribe(data => {
      if (data) {
        if (data.user) {
          if (data.user.status === 1) {
            const params: any = {};
            params.userdetails = data.user.data;
            sessionStorage.setItem('adminUser', JSON.stringify(data.user.data));
            localStorage.setItem('adminUser', JSON.stringify(data.user.data));
            this.layoutSandbox.getUserDetail(data.user.data);
          }
        }
      }
    });
  }

  // validation for Edit profile
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

  // editing profile list
  EditProfilelist() {
    this.editProfilesandbox.getProfile$.subscribe(data => {
      if (data && Object.keys(data).length > 0) {        
        this.editProfileForm.controls['email'].setValue(data.data.email);
        this.editProfileForm.controls['phone'].setValue(
          data.data.phoneNumber
        );
        this.editProfileForm.controls['email'].setValue(data.data.email);
        this.editProfileForm.controls['address'].setValue(data.data.address);
        this.image =
          this.imageUrls + '?path=' +
          `${data.data.avatarPath}` + '&name=' +
          `${data.data.avatar}` +
          '&width=160&height=150';
      }
    })
  }

  docufile(event) {
    // this.image = '';
    this.selecetdFile = event.target;
    this.convertBase64(this.selecetdFile);
  }

  // converting into base64
  convertBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    if (!this.imageType.exec(inputValue.files[0].name)) {
      this.imagetypeError = true;
      this.imageUrls = '';
      this.filePath.nativeElement.value = '';
      return;
    }
    this.imagetypeError = false;

    const size = Math.round(inputValue.files[0].size / 1024);
    if (size > this.imageSize) {
      this.imageSizeError = true;
      this.imageUrls = '';
      this.filePath.nativeElement.value = '';
      return;
    }
    this.imageSizeError = false;

    myReader.onloadend = e => {
      this.postImageUrl = myReader.result;
      this.image = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

  // image upload and base64 convert section
  uploadButtonClick() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }
}
