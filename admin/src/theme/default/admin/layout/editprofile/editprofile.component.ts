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
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal
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
  // variables
  @ViewChild('filePath') filePath: ElementRef;

  editProfileForm: FormGroup;
  Name: FormControl;
  Phone: FormControl;
  Address: FormControl;
  Email: FormControl;
  public emailPattern: any;
  public mobnumPattern: any;
  public selecetdFile: any;
  public ifSubmitted: boolean;
  public profileData: any;
  // style purpose
  public closeResult: string;
  // showing profile image
  public Image: any;
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
    private modalService: NgbModal,
    private modalService2: NgbModal,
    private router: Router,
    private editProfilesandbox: EditprofileSandbox,
    public editProfileService: EditprofileService,
    public configService: ConfigService
  ) {}

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
    this.ifSubmitted = false;
    this.emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
    this.mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
    this.imageUrls = this.configService.getImageUrl();
    this.Image = './assets/img/avatar-img1.png';

    // FORM GROUP
    this.Name = new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern)
    ]);
    this.Phone = new FormControl('', [
      Validators.required,
      Validators.pattern(this.mobnumPattern)
    ]);
    this.Email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern)
    ]);
    this.Address = new FormControl('', [Validators.required]);

    this.editProfileForm = this.fb.group({
      Name: this.Name,
      Phone: this.Phone,
      Email: this.Email,
      Address: this.Address
    });

    // Data from local storage
    const token = localStorage.getItem('editProfile')
      ? JSON.parse(localStorage.getItem('editProfile'))
      : {};
    this.profileData = token.userdetails;
    if (this.profileData) {
      this.EditProfilelist();
    }
  }

  editprofileCancel() {
    this.router.navigate(['/catalog/product']);
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
    param.username = this.editProfileForm.value.Name;
    param.phoneNumber = this.editProfileForm.value.Phone;
    param.email = this.editProfileForm.value.Email;
    param.address = this.editProfileForm.value.Address;
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
            this.editProfileService.setemit(params);
            localStorage.setItem('editProfile', JSON.stringify(params));
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
    this.editProfileForm.controls['Name'].setValue(this.profileData.username);
    this.editProfileForm.controls['Phone'].setValue(
      this.profileData.phoneNumber
    );
    this.editProfileForm.controls['Email'].setValue(this.profileData.email);
    this.editProfileForm.controls['Address'].setValue(this.profileData.address);
    if (this.profileData.avatarPath && this.profileData.avatar) {
    this.Image =
      this.imageUrls + '?path=' +
      `${this.profileData.avatarPath}` + '&name=' +
      `${this.profileData.avatar}` +
      '&width=160&height=150';
    }
  }

  docufile(event) {
    this.selecetdFile = event.target;
    this.convertBase64(this.selecetdFile);
  }

  // converting into base64
  convertBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = e => {
      this.Image = myReader.result;
      this.postImageUrl = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

  // image upload and base64 convert section
  uploadButtonClick() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }
}
