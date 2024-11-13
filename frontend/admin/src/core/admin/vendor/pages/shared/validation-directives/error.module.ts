/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { ScrollToDirective } from './error.directive';

@NgModule({
  declarations: [ScrollToDirective],
  exports: [ScrollToDirective]
})
export class ScrollToModule { }
