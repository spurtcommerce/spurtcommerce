/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { ToggleDirective } from './password-show.directive';

@NgModule({
  declarations: [ToggleDirective],
  exports: [ToggleDirective]
})
export class PasswordShowModule {}
