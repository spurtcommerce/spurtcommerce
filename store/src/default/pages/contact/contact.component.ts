/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import {ListsSandbox} from '../../../core/lists/lists.sandbox';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    // reactive form
    public contactForm: FormGroup;
    // validation
    public submitted = false;
    constructor(public formBuilder: FormBuilder,
                public listSandbox: ListsSandbox) { }

    // Initially calls initContactForm
    ngOnInit() {
        this.initContactForm();
    }
    // create form group for the contact form
    initContactForm() {
        this.contactForm = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required, Validators.nullValidator])],
            email: ['', Validators.compose([Validators.required, emailValidator])],
            phone: ['', Validators.required],
            message: ['', Validators.required]
        });
    }
    // call contact us function from sand box if the contact form is valid
    public onContactFormSubmit(values: Object): void {
        this.submitted = true;
        if (this.contactForm.valid) {
            this.submitted = false;
            this.listSandbox.contactUs(this.contactForm.value);
        }
    }
    onKeyPress(e, field) {
        const val = this.contactForm.controls[field].value;
        const string = val.replace(/  +/g, ' ');
        this.contactForm.controls[field].setValue(string);
    }

}
