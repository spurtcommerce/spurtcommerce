/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { AuthSandbox } from '../../../../../core/admin/auth/auth.sandbox';

@Component({
  selector: 'app-spurt-forgot-password',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  // VARIABLES
  public forgotPasswordForm: FormGroup;
  public email: FormControl;
  public emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  public ifSubmitted = false;

  constructor(public fb: FormBuilder, public authSandbox: AuthSandbox) {}

  // FORM VALIDATION
  ngOnInit() {
    // FORGET PASSWORD
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
    this.authSandbox.authforget(param);
  }

  // validation for forget password
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
}
