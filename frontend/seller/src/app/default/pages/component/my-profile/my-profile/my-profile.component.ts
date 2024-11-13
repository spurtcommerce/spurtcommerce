// Angular Imports
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// Third Party Imports
import { ToastrService } from "ngx-toastr";
import { filter, Subscription, take } from "rxjs";
import * as _ from "lodash";
import * as moment from "moment";
// Components
import { OtpVerificationComponent } from "../otp-verification/otp-verification.component";
import { ModalPopupComponent } from "../../catalog/manage-product/modalpopup/modalpopup.component";
// Sandbox
import { MyProfileSandbox } from "../../../../../../../src/app/core/myProfile/myProfile.sandbox";
// Constants
import { getFormControlsFieldsObj } from "../../../../../../../src/app/default/shared/components/reusable-forms/form-constant";
import { myProfileFormObj, myEmailFormObj, myPasswordFormObj } from "./myProfile.constant";
import { getTypes } from "../../../../../../../src/app/default/shared/components/reusable-forms/form-constant";
// Services
import { environment } from "../../../../../../../src/environments/environment";
import { ActivatedRoute, Router } from "@angular/router";
import { MyProfileService } from "../../../../../../../src/app/core/myProfile/myProfile.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  @ViewChild('filePath') filePath: ElementRef;
  @ViewChild('closeChangeEmailModal') closeChangeEmailModal: ElementRef;
  @ViewChild('closeChangePasswordModal') closeChangePasswordModal: ElementRef;
  // Form Group
  profileForm: UntypedFormGroup;
  currentPasswordForm: UntypedFormGroup;
  emailForm: UntypedFormGroup;
  // Dynamic Form Fields
  profileFormFields: any = {};
  emailFormFields: any = {};
  passwordFormFields: any = {};
  // Common object
  _Object = Object;
  // Submit
  submitted: boolean;
  passwordSubmitted: boolean;
  emailSubmitted: boolean;
  // Upload 
  uploadProfileImage: any;
  userDetails: any;
  uploadFileLocation: any;
  imageUrl = environment.imageUrl;
  // image Validation
  imageType = environment.imageType;
  imageSize = environment.filesize;
  imageTypeSupport = environment.imageTypeSupport;
  imageSizeSupport = environment.imageTypeSupport;
  imagedimension =environment.imageSupportFile
  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  constructor(
    public fb: UntypedFormBuilder,
    public myProfileSandbox: MyProfileSandbox,
    public ref: ChangeDetectorRef,
    public fbs: UntypedFormBuilder,
    public modal: NgbModal,
    private titleService: Title,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public router: Router,
    public route:ActivatedRoute,
    public MyProfileService:MyProfileService
  ) {
    this.titleService.setTitle("My Profile");
  }

  ngOnInit(): void {
    // Form
    this.initProfileForm();
    this.initEmailForm();
    this.initPasswordForm();
    // Detail 
    this.getSettings();
  }

  // Detail Value
  private getSettings(): void {
    this.myProfileSandbox.getProfile({});
    this.subscriptions.add(this.myProfileSandbox.getProfile$.subscribe(settings => {
      if (!['',null,undefined].includes(settings) && Object?.keys(settings)?.length > 0) {
        this.userDetails = settings;
        if (settings) {
          this.profileForm.controls['First Name'].setValue(settings?.customerDetail?.firstName || "");
          this.profileForm.controls['Last Name'].setValue(settings?.customerDetail?.lastName || "");
          this.profileForm.controls['Gender'].setValue(settings?.customerDetail?.gender || null);
          this.profileForm.controls['Date Of Birth'].setValue(settings?.customerDetail?.dob || "");
          this.profileForm.controls['Mobile Number'].setValue(settings?.customerDetail?.mobileNumber || "");
          // this.profileForm.controls['Role'].setValue(settings?.sellerRole?.customerDetail?.roleName || "");
          if (settings?.customerDetail.avatarPath && settings?.customerDetail?.avatar) {
            this.uploadProfileImage = this.imageUrl + '?path=' + settings?.customerDetail.avatarPath + '&name=' + settings?.customerDetail.avatar + '&width=300&height=300';
          }

          //Login Info
          this.profileForm.controls['Email Address'].setValue(settings?.customerDetail.email);
          this.profileForm.controls['Password'].setValue("*********");
        }

      }
    }));
  }

  // Profile Form 
  private initProfileForm(): void {
    const formGroupField = getFormControlsFieldsObj(myProfileFormObj);
    this.profileForm = this.fb.group(formGroupField);
    Object.keys(myProfileFormObj).forEach((element: any) => {
      this.profileFormFields[element] = getTypes(myProfileFormObj[element], this.profileForm);
    });
  }

  // Email Form 
  private initEmailForm(): void {
    const formGroupField = getFormControlsFieldsObj(myEmailFormObj);
    this.emailForm = this.fb.group(formGroupField);
    Object.keys(myEmailFormObj).forEach((element: any) => {
      this.emailFormFields[element] = getTypes(myEmailFormObj[element], this.emailForm);
    });
  }

  // Current Password Form 
  private initPasswordForm(): void {
    const formGroupField = getFormControlsFieldsObj(myPasswordFormObj);
    this.currentPasswordForm = this.fb.group(formGroupField);
    Object.keys(myPasswordFormObj).forEach((element: any) => {
      this.passwordFormFields[element] = getTypes(myPasswordFormObj[element], this.currentPasswordForm);
    });
  }


  private dateFormatChange(dateVal: string) {
    const dateString = dateVal;
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return { day: day, month: month, year: year };
  }

  // Upload change
  logoChange(event): void {
    this.convertsBase64(event.target, event);
  }

  // Base 64
  convertsBase64(inputValues: any, event): void {
    const allowed_types = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    const input = event.target as HTMLInputElement;

    if (!this.imageType.exec(inputValues.files[0].name)) {
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageTypeSupport);
      return;
    }
    const size = Math.round(inputValues.files[0].size / 1024);
    if (size > this.imageSize) {
      this.filePath.nativeElement.value = '';
      this.toastr.error(this.imageSizeSupport);
      return;
    }

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const myReader = new FileReader();

      myReader.onloadend = () => {
        const uploadedImage = myReader.result;
        const params = {
          fileName: file.name,
          fileType: file.type,
          path: '/seller',
          image: uploadedImage
        };

        // Clear file input value
        this.filePath.nativeElement.value = '';

        // Trigger the image upload
        this.myProfileSandbox.imageUpload(params);
        this.subscriptions.add(this.myProfileSandbox.imageUpload$.subscribe(res => {
          if (res) {
            this.uploadProfileImage = uploadedImage;
            this.uploadFileLocation = res;
            this.ref.detectChanges();
          }
        }));
      };

      myReader.readAsDataURL(file);
    }
  }

  // Remove Image
  removeImage(){
  this.uploadProfileImage = '';
  }

  // Save and Update
  update(): void {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return
    }
    let reset = this.uploadProfileImage == '' ? 1 : 0
    const DOB = this.dateFormatChange(this.profileForm.value['Date Of Birth'])
    const params: any = {
      avatar: this.uploadProfileImage?.includes("https://image.spurtcart.com") ? "" : this.uploadProfileImage,
      dob:!['',null,undefined].includes(this.profileForm.value['Date Of Birth'])? moment(this.profileForm.value['Date Of Birth']).format('YYYY-MM-DD'):null,
      email: this.userDetails?.customerDetail.email,
      firstName: this.profileForm.value['First Name'],
      gender: this.profileForm.value['Gender'],
      lastName: this.profileForm.value['Last Name'],
      mobileNumber: this.profileForm.value['Mobile Number'],
      username: this.userDetails?.customerDetail.email,
      vendorMedia: [],
      password: '',
      reset : reset
    }
    this.myProfileSandbox.editProfile({ params: params, customerId: this.userDetails.customerId });
    this.subscriptions.add(this.myProfileSandbox.editProfileLoaded$.subscribe(res => {
      if (res) {
        this.submitted = false;
        this.myProfileSandbox.getProfile({});
        this.router.navigate(['/dashboard'])
      }
    }));
  }

  // Cancel
  cancelCompanyDetail(): void {
    const modelRef = this.modal.open(ModalPopupComponent, {
      size: 'md', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories",
    })
    modelRef.componentInstance.deleteMessage = "new changes"
    modelRef.result.then(result => {
      if (result == "deleted") {
        this.getSettings();
      }
    })
  }

  // Change Email
  changeEmail(): void {
    this.emailSubmitted = true;
    if (this.emailForm.invalid || (this.emailForm.value['Enter new account email'] !== this.emailForm.value['Confirm new account email'])) {
      return;
    }
    const params: any = {
      emailId: this.emailForm.value['Confirm new account email'],
      password: this.emailForm.value['Password']
    };
    this.MyProfileService.changeEmail(params).subscribe((res)=>{
      if (res &&  res?.status == 1) {
        this.emailSubmitted = false;
        this.emailForm.reset();
        this.closeChangeEmailModal.nativeElement.click();
        setTimeout(() => {
          const modalRef = this.modalService.open(OtpVerificationComponent, {
            size: 'ms', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories",
          });
          modalRef.componentInstance.changeMailDetails = params;
          modalRef.result.then(result => {
            if (result) {
              this.myProfileSandbox.getProfile({});
            }
          });
        }, 500);
      }
    })
    // this.myProfileSandbox.changeEmail(params);
    // this.myProfileSandbox.changeEmail$.pipe(filter(res=> res),take(1)).subscribe((res: any) => {
    //     if (res &&  res?.status == 1) {
    //       this.emailSubmitted = false;
    //       this.emailForm.reset();
    //       this.closeChangeEmailModal.nativeElement.click();
    //       setTimeout(() => {
    //         const modalRef = this.modalService.open(OtpVerificationComponent, {
    //           size: 'ms', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories",
    //         });
    //         modalRef.componentInstance.changeMailDetails = params;
    //         modalRef.result.then(result => {
    //           if (result) {
    //             this.myProfileSandbox.getProfile({});
    //           }
    //         });
    //       }, 500);
    //     }
    //   });
  }

  // Cancel
  emailCancel(): void {
    this.emailSubmitted = false;
    this.emailForm.reset();
  }


  // Change Password
  changePassword(): void {
    this.passwordSubmitted = true;
    if (this.currentPasswordForm.invalid || (this.currentPasswordForm.value['New Password'] !== this.currentPasswordForm.value['Confirm New Password'])) {
      return
    }
    const params: any = {
      newPassword: this.currentPasswordForm.value['Confirm New Password'],
      oldPassword: this.currentPasswordForm.value['Current Password']
    }
    this.myProfileSandbox.changePassword(params);
    this.subscriptions.add(this.myProfileSandbox.changePassword$.subscribe(res => {
      if (res) {
        this.passwordSubmitted = false;
        this.currentPasswordForm.reset();
        this.closeChangePasswordModal.nativeElement.click();
      }
    }));
  }

  // Cancel
  passwordCancel(): void {
    this.passwordSubmitted = false;
    this.currentPasswordForm.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}


