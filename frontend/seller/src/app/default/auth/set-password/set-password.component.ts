import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '../../../default/shared/validation/custom-password-validation';
import { AuthSandbox } from '../../../core/auth/auth.sandbox';
import { environment } from '../../../../../src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  logoPath = environment.logo;
  public setPasswordForm: UntypedFormGroup;
  public newPassword: AbstractControl;
  public confirmPassword: AbstractControl;
  submitted = false;
  key: any;
  constructor(private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    public authSandbox: AuthSandbox,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Reset password");
    this.initForm();
    this.route.queryParams.subscribe(token => {
      const params: any = {};

      params.key = token.token;
      this.key = token.token;
      this.authSandbox.getTokenStatus(params);

    });
  }
  public initForm(): void {
    this.setPasswordForm = this.fb.group({
      'password': ['', Validators.compose([
        Validators.required,
        CustomValidators.patternValidator(/[0-9 ]*\.?[0-9]/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8),
        Validators.maxLength(50),
        CustomValidators.patternValidator(/[!@#$%^&*()_+\-=~\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacter: true })

      ])],
      'confirmPassword': ['', Validators.compose([Validators.required])],
    }, { validator: this.matchingPasswords('password', 'confirmPassword') });
    this.newPassword = this.setPasswordForm.controls['password'];
    this.confirmPassword = this.setPasswordForm.controls['confirmPassword'];
  }

  public recoverPassword(form) {
    this.submitted = true;
    if (!form.valid) {
      this.validateAllFormFields(form);
      return;
    }
    const params: any = {};
    params.key = this.key;
    params.newPassword = form.value.password;

    this.authSandbox.resetPassword(params);
    this.subscriptions.add(this.authSandbox.setPassword$.subscribe(data => {
      if (Object.keys(data)?.length > 0) {
        this.submitted = false;
        this.setPasswordForm.reset();
        this.setPasswordForm.clearValidators();
        this.router.navigate(['/auth/login']);
      }

    }));
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

  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: UntypedFormGroup) => {
      const password = group.controls[passwordKey];
      const passwordConfirmation = group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
        return passwordConfirmation.setErrors({ mismatchedPasswords: true });
      }
    };
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}


