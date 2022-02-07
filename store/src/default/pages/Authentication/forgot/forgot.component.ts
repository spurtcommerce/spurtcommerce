/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator } from '../../../theme/utils/app-validators';
import {AuthSandbox} from '../../../../core/auth/auth.sandbox';


@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
    // reactive form
    public forgotForm: FormGroup;
    // validation
    public submitted = false;

    constructor(public formBuilder: FormBuilder,
                public router: Router,
                public snackBar: MatSnackBar,
                public authSandbox: AuthSandbox) { }

    // Initially initialize reactive form
    ngOnInit() {
        this.forgotForm = this.formBuilder.group({
            'emailId': ['', Validators.compose([Validators.required, emailValidator])]
        });
    }
/**  calls authSandbox doRecover with values from forgotForm.
 * Then calls resetAllFormFields to reset all fields.
 *
 * */
    public onForgotFormSubmit(values: Object): void {
        if (this.forgotForm.valid) {
            this.authSandbox.doRecover(this.forgotForm.value);
            this.submitted = false;
            this.forgotForm.reset();
            this.forgotForm.clearValidators();
        } else {
            this.submitted = true;
        }
    }
    // reset reactive form fields
    resetAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.reset();
                control.clearValidators();
                control.updateValueAndValidity();
            } else if (control instanceof FormGroup) {
                this.resetAllFormFields(control);
            }
        });
    }
    // validate reactive form fields
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

}
