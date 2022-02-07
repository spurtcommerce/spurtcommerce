/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable()
export class ValidationService {
  /**
   * Validates email address
   *
   * @params formControl
   */
  public validateEmail(formControl: FormControl): { [error: string]: any } {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEXP.test(formControl.value)
      ? null
      : { validateEmail: { valid: false } };
  }

  /**
   * Validates required numeric values
   *
   * @params formControl
   */
  public numericRequired(formControl: FormControl): { [error: string]: any } {
    return formControl.value && formControl.value > 0
      ? null
      : { numericRequired: { valid: false } };
  }

  /**
   * Validates matching string values
   *
   * @params controlKey
   * @params matchingControlKey
   */
  public matchingPasswords(
    controlKey: string,
    matchingControlKey: string
  ): { [error: string]: any } {
    return (group: FormGroup): { [key: string]: any } => {
      if (
        group.controls[controlKey].value !==
        group.controls[matchingControlKey].value
      ) {
        return { mismatch: { valid: false } };
      }
    };
  }
}
