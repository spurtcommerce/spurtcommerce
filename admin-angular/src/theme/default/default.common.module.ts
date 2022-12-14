/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [NgbModule, SelectDropDownModule, NgxChartsModule,ChartsModule],
  exports: [NgbModule, SelectDropDownModule, NgxChartsModule,ChartsModule],
  providers: []
})


export class DefaultCommonModule {
  static forRoot(): ModuleWithProviders<DefaultCommonModule> {
    return {
      ngModule: DefaultCommonModule
    };
  }
}
