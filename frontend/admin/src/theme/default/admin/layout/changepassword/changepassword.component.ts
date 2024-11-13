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
import { ChangepasswordSandbox } from '../../../../../core/admin/profile/changepassword/changepassword.sandbox';
import { CustomValidators } from '../../shared/components/interface/custom-password-validation';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-spurt-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']

})
export class ChangePasswordComponent implements OnInit {

  public changePassword: UntypedFormGroup;
  public submitted = false;
  public oldPSW: UntypedFormControl;
  public newPSW: UntypedFormControl;
  public confirmPSW: UntypedFormControl;


  constructor(public fb: UntypedFormBuilder, public sandbox: ChangepasswordSandbox, private title: Title) {
    this.title.setTitle('Change Password')
  }

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
    return (group: UntypedFormGroup) => {
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
