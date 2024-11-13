import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PromotionWidgetRoutingModule } from './promotion-widget-routing.module';
import { promotionWidgetComponents } from '../../../../../../../../add-ons/add-ons.constant';
import { ComponentsModule } from '../../../../shared/components';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';

@NgModule({
  declarations: [...promotionWidgetComponents],
  imports: [
    CommonModule,
    PromotionWidgetRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NumberAcceptModule,
    InfiniteScrollModule,
     TranslateModule.forChild(),
  ]
})
export class PromotionWidgetModule { }
