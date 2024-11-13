/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [NgbModule, NgxChartsModule,NgChartsModule],
  exports: [NgbModule, NgxChartsModule,NgChartsModule],
  providers: []
})


export class DefaultCommonModule {
  static forRoot(): ModuleWithProviders<DefaultCommonModule> {
    return {
      ngModule: DefaultCommonModule
    };
  }
}
