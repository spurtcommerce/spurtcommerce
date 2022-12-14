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
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { EditprofileSandbox } from '../../../../../core/admin/profile/editprofile/editprofile.sandbox';
import { ConfigService } from '../../../../../core/admin/service/config.service';
import { EditprofileService } from '../../../../../core/admin/profile/editprofile/editprofile.service';
import { LayoutSandbox } from '../../../../../core/admin/layout/layout.sandbox';

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
    `
  ]
})
export class EditprofileComponent implements OnInit {

  @ViewChild('filePath') filePath: ElementRef;
  public editProfileForm: FormGroup;
  public name: FormControl;
  public phone: FormControl;
  public address: FormControl;
  public email: FormControl;
  public emailPattern: any;
  public mobnumPattern: any;
  public selecetdFile: any;
  public ifSubmitted: boolean;
  public profileData: any;
  // style purpose
  public closeResult: string;
  // showing profile image
  public image: any;
  public postImageUrl: any;
  public imageUrls: string;

  // event emitter

  message = 'Hola Mundo!';

  // STYLE PURPOSE
  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  constructor(
    public fb: FormBuilder,
    public layoutSandbox: LayoutSandbox,
    private modalService: NgbModal,
    private modalService2: NgbModal,
    private router: Router,
    private editProfilesandbox: EditprofileSandbox,
    public editProfileService: EditprofileService,
    public configService: ConfigService
  ) { }

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
    this.imageUrls = this.configService.getImageUrl();

    // FORM GROUP
    this.name = new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern)
    ]);
    this.phone = new FormControl('', [
      Validators.required,
      Validators.pattern(this.mobnumPattern)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern)
    ]);
    this.address = new FormControl('', [Validators.required]);

    this.editProfileForm = this.fb.group({
      name: this.name,
      phone: this.phone,
      email: this.email,
      address: this.address
    });

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
    const param: any = {};
    param.username = this.editProfileForm.value.name;
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
            this.layoutSandbox.getUserDetail(data.user.data);
          }
        }
      }
    });
  }

  // validation for Edit profile
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

  // editing profile list
  EditProfilelist() {
    this.editProfilesandbox.getProfile$.subscribe(data => {
      if (data && Object.keys(data).length > 0) {        
        this.editProfileForm.controls['name'].setValue(data.data.firstName);
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
    this.image = '';
    this.selecetdFile = event.target;
    this.convertBase64(this.selecetdFile);
  }

  // converting into base64
  convertBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
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
