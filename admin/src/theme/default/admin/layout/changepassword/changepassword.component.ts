/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { ChangepasswordSandbox } from '../../../../../core/admin/profile/changepassword/changepassword.sandbox';

@Component({
  selector: 'app-spurt-changepassword',
  templateUrl: './changepassword.component.html'
})
export class ChangePasswordComponent implements OnInit {
  // Variables
  changePassword: FormGroup;
  public submitted = false;
  oldPSW: FormControl;
  newPSW: FormControl;
  confirmPSW: FormControl;

  constructor(public fb: FormBuilder, public sandbox: ChangepasswordSandbox) {}

  ngOnInit() {
    this.initChangePswForm();
  }

  // InitFormGroup
  initChangePswForm() {
    this.changePassword = this.fb.group(
      {
        oldPSW: ['', Validators.required],
        newPSW: ['', Validators.required],
        confirmPSW: ['', Validators.required]
      },
      { validator: this.matchingPasswords('newPSW', 'confirmPSW') }
    );
  }

  /**
   * Handles form 'matchingPasswords' event. for conformation password.
   * @param passwordKey for password value
   * @param passwordConfirmationKey for Repassword value
   */
  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const passwordConfirmation = group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
        return passwordConfirmation.setErrors({ mismatchedPasswords: true });
      }
    };
  }

  /**
   * Handles form 'submit' event. Calls sandbox change password function if form is valid.
   *
   * @param event form event
   * @param form entire form value
   */
  onSubmit(form) {
    this.submitted = true;
    if (this.changePassword.invalid) {
      return;
    }
    const para: any = {};
    para.oldpsw = this.changePassword.value.oldPSW;
    para.newpsw = this.changePassword.value.newPSW;
    this.sandbox.changePSW(para);
  }

  // form Validation
  get f() {
    return this.changePassword.controls;
  }
}
