import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { matchingPasswords, emailValidator } from '../../theme/utils/app-validators';
import { AuthSandbox } from '../../../core/auth/auth.sandbox';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { param } from 'jquery';
import { environment } from '../../../../../src/environments/environment';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CustomValidators } from '../../shared/validation/custom-password-validation';

@Component({
  selector: 'app-vendor-reg',
  templateUrl: './vendor-reg.component.html',
  styleUrls: ['./vendor-reg.component.scss']
})
export class VendorRegComponent implements OnInit {

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  logoPath = environment.logo;
  lowerCaseError: any = 'Password must contain at least one lowercase letter.';
  upperCaseError: any = 'Password must contain at least one uppercase letter.';
  numberError = 'Password must contain at least one number.';
  specialCharError = 'Password must contain at least one special character.';
  signupForm: UntypedFormGroup;
  passwordFieldType: string = 'password';
  showPassword: boolean = false;
  submitted: Boolean = false
  submit: boolean = false
  checkOtp: boolean = false
  industryArray: any = [];
  resendOtp: Boolean = false
  saveButtonDisabled: Boolean = true
  selectedIndustry: any;
  emailValidation: Boolean = false;
  otpValidation: Boolean = false;
  emailInvalidShow: boolean = false;
  constructor(public formBuilder: UntypedFormBuilder
    , private change: ChangeDetectorRef, public authSandbox: AuthSandbox,
    private toaster: ToastrService, private router: Router, private titleService: Title,) { }

  ngOnInit(): void {
    this.initLoginForm();
    this.industryData();
    this.titleService.setTitle("Sign Up");
  }
  industryData() {
    this.authSandbox.industryList({})
    this.subscriptions.add(this.authSandbox.industryList$.subscribe(val => {
      if (val && val.length > 0) {
        this.industryArray = val
      }

    }));
  }

  public initLoginForm(): void {
    const mobileValidationPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    const nameValidationPattern = '[a-zA-Z \'-,;.]*';
    this.signupForm = this.formBuilder.group({
      emailId: ['', Validators.compose([Validators.required, emailValidator])],
      otp: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      industry: [null, Validators.compose([Validators.required])],
      companyName: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9 $,'&-]*$/)])],
      fullName: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)])],
      lastName: ['', Validators.compose([Validators.pattern(/^[a-zA-Z\s]*$/)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), this.upperCase(), this.lowerCase(),
      this.numberValidator(),
      this.specialCharValidator()])],
      termsAndConditions: [false, Validators.requiredTrue]
    });
  }

  changeemail() {
    this.emailInvalidShow = false;
  }

  focusouterrorShow() {
    if (!['', null, undefined].includes(this.signupForm.value.emailId) && !/([a-zA-Z0-9_.-]+)@([a-zA-Z]+)([\.])([a-zA-Z]+)/.test(this.signupForm.value.emailId)) {
      this.emailInvalidShow = true
    } else {
      this.emailInvalidShow = false;
    }
  }



  // loginForm.value
  onSubmit(): void {


    if (this.signupForm.valid) {
      this.saveButtonDisabled = false
    }

    if (this.signupForm.invalid) {

      return
    }


    let params: any = {
      emailId: this.signupForm.value.emailId,
      lastName: this.signupForm.value.lastName,
      companyName: this.signupForm.value.companyName,
      firstName: this.signupForm.value.fullName,
      industryId: this.signupForm.value.industry,
      password: this.signupForm.value.password,
      otp: this.signupForm.value.otp,
      tsc: this.signupForm.value.termsAndConditions
    }
    this.authSandbox.doRegister(params);

    this.subscriptions.add(this.authSandbox.doRegister$.subscribe(val => {

      this.change.detectChanges()
      if (val?.status == 1) {
        this.router.navigate(['/auth/login'])
      }

      if (val?.message === "Please enter a valid OTP") {
        this.otpValidation = true;
      }
    }))
    this.subscriptions.add(this.authSandbox.registerFailed$.subscribe(val => {
      if (val?.message === "Please enter a valid OTP") {
        this.otpValidation = true;
      }
    }))
  }

  otpValidationChange() {
    this.otpValidation = false
  }

  sendOtp(): void {
    // this.submit = true
    if (this.signupForm.controls['emailId'].invalid || !this.signupForm.value.emailId) {
      return
    }
    let param: any = {
      emailId: this.signupForm.value.emailId
    }

    this.authSandbox.generateOtp(param)
    this.subscriptions.add(this.authSandbox.generateOtp$.subscribe(val => {
      if (val?.status == 1) {
        this.resendOtp = true
      }
    }))
    this.subscriptions.add(this.authSandbox.generateOtpFailed$.subscribe(val => {

      if (val?.error?.message === "Email Id Already Exist.") {
        this.emailValidation = true;
      }
    }))

  }

  emailValidationChange() {
    this.emailValidation = false
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

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }

  upperCase(): ValidatorFn {
    const camelCaseRegex = /[A-Z]/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = camelCaseRegex.test(control.value);
      return valid ? null : { upperCase: true };
    };
  }
  lowerCase(): ValidatorFn {
    const lowerCaseRegex = /[a-z]/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = lowerCaseRegex.test(control.value);
      return valid ? null : { lowerCase: true };
    };
  }


  numberValidator(): ValidatorFn {
    const numberRegex = /\d/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = numberRegex.test(control.value);
      return valid ? null : { number: true };
    };
  }

  specialCharValidator(): ValidatorFn {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = specialCharRegex.test(control.value);
      return valid ? null : { specialChar: true };
    };
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}

