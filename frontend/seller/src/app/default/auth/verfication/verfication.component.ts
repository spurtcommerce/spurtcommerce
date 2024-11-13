import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthSandbox } from '../../../../../src/app/core/auth/auth.sandbox';
import { emailValidator } from '../../theme/utils/app-validators';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verfication',
  templateUrl: './verfication.component.html',
  styleUrls: ['./verfication.component.scss']
})
export class VerficationComponent implements OnInit {

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  public loginForm: UntypedFormGroup;
  public submitted = false;
  token: string;
  passwordFieldType: string = 'password';
  showPassword: boolean = false;
  emailValidationVerification: Boolean = false;
  passwordValidationVerification: Boolean = false;
  emailInvalidShow: boolean = false;
  constructor(public formBuilder: UntypedFormBuilder, public authSandbox: AuthSandbox, private router: Router, private route: ActivatedRoute, private titleService: Title,) { }
  ngOnInit(): void {
    this.initLoginForm();
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];

    });
    this.titleService.setTitle("Verification");
  }
  focusouterrorShow() {
    if (!['', null, undefined].includes(this.loginForm.value.username) && !/([a-zA-Z0-9_.-]+)@([a-zA-Z]+)([\.])([a-zA-Z]+)/.test(this.loginForm.value.username)) {
      this.emailInvalidShow = true
    } else {
      this.emailInvalidShow = false;
    }
  }
  changeemail() {
    this.emailInvalidShow = false;
  }

  public initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required]
    });
  }

  public onLoginFormSubmit(values: Object): void {
    if (!this.loginForm.valid) {
      this.validateAllFormFields(this.loginForm);
      return;
    }

    let params: any = {};

    params.username = this.loginForm.value.username
    params.password = this.loginForm.value.password
    params.key = this.token ?? '';

    this.authSandbox.sellerVerification(params);
    this.subscriptions.add(this.authSandbox.sellerVerification$.subscribe(data => {
      this.submitted == true
      if (data && data?.status == 1) {
        this.loginForm.reset();
        this.submitted == false
        this.router.navigate(['/auth/login'])
      }
    }));

  this.subscriptions.add(this.authSandbox.sellerVerificationFailed$.subscribe(val => {

      if (val?.error?.message == 'Invalid seller username') {
        this.emailValidationVerification = true;
      }
      if (val?.error?.message == 'Invalid seller password') {
        this.passwordValidationVerification = true;
      }
    }));
  }
  emailValidationChange() {
    this.emailValidationVerification = false;
  }
  passwordValidationChange() {
    this.passwordValidationVerification = false;
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
