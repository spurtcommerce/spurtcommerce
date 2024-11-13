import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from '../../shared/components/interface/custom-password-validation';
import { AuthSandbox } from '../../../../../core/admin/auth/auth.sandbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  public setPasswordForm: UntypedFormGroup;
  public newPassword: AbstractControl;
  public confirmPassword: AbstractControl;
  submitted = false;
  key: any;
  constructor(private fb: UntypedFormBuilder,
              private route: ActivatedRoute,
              public snackBar: MatSnackBar,
              public authSandbox: AuthSandbox,
            ) { }

  ngOnInit() {
    this.initForm();
    this.route.queryParams.subscribe(token => {
      const params: any = {};
      // params.userIdToken = token.token;
      params.key = token.token;
      this.key = token.token;
      this.authSandbox.gettoken(params);
    });
  }
  public initForm(): void {
    this.setPasswordForm = this.fb.group({
      'password':['', Validators.compose([
        Validators.required,
        CustomValidators.patternValidator(/[0-9 ]*\.?[0-9]/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8),
        Validators.maxLength(50),
        CustomValidators.patternValidator(/[!@#$%^&*()_+\-=~\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacter: true })
        
      ])],
      'confirmPassword': ['',  Validators.compose([Validators.required])],
    },  {validator:this.matchingPasswords('password', 'confirmPassword')});
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
    this.authSandbox.setpassword(params);
    this.authSandbox.setpasswordLoaded$.subscribe(data =>{
      if(data == true  || data == false){
        this.submitted = false;
        this.setPasswordForm.reset();
        this.setPasswordForm.clearValidators();
      }

      })
  }

  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({onlySelf: true});
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

}


