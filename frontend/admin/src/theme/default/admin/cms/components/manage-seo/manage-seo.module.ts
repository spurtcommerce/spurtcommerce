import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageSeoRoutingModule } from './manage-seo.routing';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { ComponentsModule } from '../../../shared/components';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NumberAcceptModule,
    ManageSeoRoutingModule,
    TranslateModule,
    SharedModule,
    ComponentsModule
  ]
})
export class ManageSeoModule { }
