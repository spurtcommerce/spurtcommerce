import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageContentRoutingModule } from './manage-content.routing';
import { ComponentsModule } from '../../../shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ManageContentRoutingModule,
    ComponentsModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NumberAcceptModule,
    InfiniteScrollModule
  ]

})
export class ManageContentModule { }
