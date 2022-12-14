/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
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
import { ChangepasswordSandbox } from '../../../../../core/admin/profile/changepassword/changepassword.sandbox';
import { CustomValidators } from '../../shared/components/interface/custom-password-validation';

@Component({
  selector: 'app-spurt-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']

})
export class ChangePasswordComponent implements OnInit {

  public changePassword: FormGroup;
  public submitted = false;
  public oldPSW: FormControl;
  public newPSW: FormControl;
  public confirmPSW: FormControl;

  constructor(public fb: FormBuilder, public sandbox: ChangepasswordSandbox) {}

  ngOnInit() {
    this.initChangePswForm();
  }

  // InitFormGroup
  initChangePswForm() {
    this.changePassword = this.fb.group(
      {
        oldPSW: ['', Validators.required],
        newPSW: ['',
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          CustomValidators.patternValidator(/((?=.*\d)|(?=.*[#$^+=!*()@%&]))/, { hasNumber: true }),
           // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
           // check whether the entered password has a lower-case letter
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
           // Has a minimum length of 8 characters
          Validators.minLength(8)
        ])
      ],
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
