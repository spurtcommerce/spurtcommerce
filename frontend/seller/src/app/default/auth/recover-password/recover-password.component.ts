import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { AuthSandbox } from '../../../core/auth/auth.sandbox';
import { emailValidator } from '../../theme/utils/app-validators';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverpasswordComponent implements OnInit {

  logoPath = environment.logo;
  public recoveryForm: UntypedFormGroup;
  public isFormOpen = false;
  isSubmitted: boolean = false;
  private subscriptions: Subscription = new Subscription();
  recoverPasswordSuccess: Boolean = false;
  recoverPasswordFailed: Boolean = false;
  emailInvalidShow: boolean = false;
  constructor(private fb: UntypedFormBuilder, public authSandbox: AuthSandbox, private titleService: Title,) { }

  ngOnInit() {
    this.initForm();
    this.titleService.setTitle("Forgot Password");
  }
  changeemail() {
    this.emailInvalidShow = false;
  }
  focusouterrorShow() {
    if (!['', null, undefined].includes(this.recoveryForm.value.emailId) && !/([a-zA-Z0-9_.-]+)@([a-zA-Z]+)([\.])([a-zA-Z]+)/.test(this.recoveryForm.value.emailId)) {
      this.emailInvalidShow = true
    } else {
      this.emailInvalidShow = false;
    }
  }
  public initForm(): void {
    this.recoveryForm = this.fb.group({
      emailId: ['', Validators.compose([Validators.required, emailValidator])]
    });
  }

  public recoverPassword(form) {
    this.isSubmitted = true;
    if (!form.valid) {
      this.validateAllFormFields(form);
      return;
    }
    this.authSandbox.doForgetPassword(form.value);
    this.subscriptions.add(this.authSandbox.forgotPassword$.subscribe(success => {
      if (success && success.status === 1) {
        this.isSubmitted = false;
        this.recoverPasswordSuccess = true
        this.isFormOpen = true;
        this.recoveryForm.reset();
      }
    }));

    this.authSandbox.forgetPasswordFailed$.subscribe(val => {
      if (val?.error?.message) {
        this.recoverPasswordFailed = true
      }
    })
  }
  recoverdEmailChange() {
    this.recoverPasswordFailed = false;
    this.recoverPasswordSuccess = false
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

