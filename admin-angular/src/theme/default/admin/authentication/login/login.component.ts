/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthSandbox } from '../../../../../core/admin/auth/auth.sandbox';
import { LayoutSandbox } from '../../../../../core/admin/layout/layout.sandbox';

@Component({
  selector: 'app-spurt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public userName: FormControl;
  public password: FormControl;
  public emailPattern = '[a-zA-Z0-9.-_\-\._]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  public ifSubmitted = false;
  public badResponse = false;
  public subscriptions: Array<Subscription> = [];

  constructor(public fb: FormBuilder, public authSandbox: AuthSandbox, public layoutSandbox: LayoutSandbox) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: [
        '',
        [Validators.required, Validators.pattern(this.emailPattern)]
      ],
      password: ['', Validators.required]
    });
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

  /**
   * Handles form 'submit' event. Calls sandbox login function if form is valid.
   *
   * @param event form event
   * @param form entire form value
   */
  onSubmit(form: any) {
    this.ifSubmitted = true;
    if (!this.loginForm.valid) {
      this.validateAllFormFields(this.loginForm);
      return;
    }
    const param: any = {};
    param.userName = this.loginForm.value.userName;
    param.password = this.loginForm.value.password;
    this.authSandbox.authLogin(param);
    this.subscriptions.push(this.authSandbox.loginLoaded$.subscribe(data => {
      if (data === true) {
        const user = JSON.parse(sessionStorage.getItem('adminUser'));
        this.layoutSandbox.getUserDetail(user);
      } else {
        this.loginForm.reset();
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
