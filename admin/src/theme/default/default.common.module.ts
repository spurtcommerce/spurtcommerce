/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [NgbModule, SelectDropDownModule, NgxChartsModule],
  exports: [NgbModule, SelectDropDownModule, NgxChartsModule],
  providers: []
})
export class DefaultCommonModule {}
