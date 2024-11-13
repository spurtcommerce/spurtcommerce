/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder
} from '@angular/forms';
import { AuthSandbox } from '../../../../../core/admin/auth/auth.sandbox';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-spurt-forgot-password',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: UntypedFormGroup;
  public email: UntypedFormControl;
  public emailPattern = '[a-zA-Z0-9.-_\-\._]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  public ifSubmitted = false;

  constructor(public fb: UntypedFormBuilder, public authSandbox: AuthSandbox, private title: Title) {
    this.title.setTitle('Forgot Password')
  }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox forget password function if form is valid.
   *
   * @param event form event
   * @param form entire form value
   */
  onSubmits(event: Event, form: any) {
    this.ifSubmitted = true;
    if (!this.forgotPasswordForm.valid) {
      this.validateAllFormFields(this.forgotPasswordForm);
      return;
    }
    const param: any = {};
    param.email = this.forgotPasswordForm.value.email;
    this.authSandbox.authForget(param);
    this.authSandbox.forgorPasswordResponse$.subscribe(data=>{
      if(data && data === true || data === false){
        this.ifSubmitted = false;
        this.forgotPasswordForm.reset();
        this.forgotPasswordForm.clearValidators();
      }
    })
  }

  // validation for forget password
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
}
